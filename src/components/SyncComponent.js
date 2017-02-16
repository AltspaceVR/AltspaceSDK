'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* Enables the synchronization of properties of the entity. Must be used in
* conjuction with the [sync-system]{@link module:altspace/components.sync-system} component and a component for a
* specific property (e.g. [sync-transform]{@link module:altspace/components.sync-transform}). @aframe
* @alias sync
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
*/
class SyncComponent extends AFrameComponent
{
	constructor(isComponent = false)
	{
		this._isComponent = isComponent;

		this.scene = undefined;
		this.syncSys = undefined;
		this.ref = undefined;
		this.key = undefined;
		this.dataRef = undefined;
		this.ownerRef = undefined;
		this.ownerId = undefined;

		this.isConnected = false;

		/**
		* Indicates whether the sync ownership is yours.
		* @instance
		* @member {boolean} isMine
		* @memberof module:altspace/components.sync
		* @readonly
		*/
		this.isMine = false;
	}

	get schema(){
		return {
			mode: { default: 'link' },

			/**
			* The name of the event, or a list of events, that
			* will cause the local client to take ownership of this object. This field
			* cannot be updated after initialization.
			* @instance
			* @member {string} ownOn
			* @memberof module:altspace/components.sync
			*/
			ownOn: { type: 'string' } //cannot be changed after creation
		};
	}

	init()
	{
		this.scene = this.el.sceneEl;
		this.syncSys = this.scene.systems['sync-system'];

		if(this.syncSys.isConnected)
			start();
		else
			this.scene.addEventListener('connected', this.start.bind(this));

		if(this.data.ownOn)
		{
			let ownershipEvents = this.data.ownOn.split(/[ ,]+/);
			ownershipEvents.forEach((e => {
				this.el.addEventListener(e, (() => {
					if(this.isConnected){
						this.takeOwnership();
					}
				}).bind(this));
			}).bind(this));
		}
	}

	/**
	* Tell sync to start pushing local property values instead of updating
	* local from remote values.
	* @instance
	* @method takeOwnership
	* @memberof module:altspace/components.sync
	*/
	takeOwnership()
	{
		this.ownerRef.set(this.syncSys.clientId);

		//clear our ownership if we disconnect
		//this is needed if we are the last user in the room, but we expect people to join later
		this.ownerRef.onDisconnect().set(null);
	}

	start()
	{
		//Make sure someone always owns an object. If the owner leaves and we are the master client, we will take it.
		//This ensures, for example, that synced animations keep playing
		this.scene.addEventListener('clientleft', (event => {
			let shouldTakeOwnership = (!ownerId || ownerId === event.detail.id) && this.syncSys.isMasterClient;
			if(shouldTakeOwnership)
				this.takeOwnership();
		}).bind(this));

		if (this.data.mode === 'link') {
			let id = this.el.id;
			if (!id) {
				console.error('Entities cannot be synced using link mode without an id.');
				return;
			}

			console.log('syncSys: ' + this.syncSys);
			console.log('syncSys.sceneRef: ' + this.syncSys.sceneRef);

			this.link(this.syncSys.sceneRef.child(id));
			this.setupReceive();

		} else {
			console.error('Unsupported sync mode: ' + this.data.mode);
			return;
		}

		this.isConnected = true;
		this.el.emit('connected', null, false);
	}

	link(entityRef)
	{
		this.ref = entityRef;
		this.key = this.ref.key();
		this.dataRef = this.ref.child('data');
		this.ownerRef = this.ref.child('owner');
	}

	setupReceive()
	{
		//if nobody has owned the object yet, we will.
		this.ownerRef.transaction((owner => {
			if (owner) return undefined;
			this.ownerRef.onDisconnect().set(null);
			return this.syncSys.clientId;
		}).bind(this));

		this.ownerRef.on('value', (snapshot =>
		{
			let newOwnerId = snapshot.val();
			let gained = newOwnerId === this.syncSys.clientId && !this.isMine;
			if (gained)
				this.el.emit('ownershipgained', null, false);

			//note this also fires when we start up without ownership
			let lost = newOwnerId !== this.syncSys.clientId && this.isMine;
			if (lost){
				this.el.emit('ownershiplost', null, false);

				//we no longer have to clear our ownership when we disconnect
				this.ownerRef.onDisconnect().cancel();
			}

			this.ownerId = newOwnerId;

			this.isMine = newOwnerId === this.syncSys.clientId;
		}).bind(this));
	}
}

export default SyncComponent;
