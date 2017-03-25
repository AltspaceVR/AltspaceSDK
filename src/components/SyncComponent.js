'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* Enables the synchronization of properties of the entity. Must be used in
* conjuction with the [altspace-sync]{@link module:altspace/components.altspace-sync} element and a component for a
* specific property (e.g. [sync-transform]{@link module:altspace/components.sync-transform}). @aframe
* @alias sync
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
*/
class SyncComponent extends AFrameComponent
{
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
		/**
		* Indicates whether the sync ownership is yours.
		* @instance
		* @member {boolean} isMine
		* @memberof module:altspace/components.sync
		* @readonly
		*/
		this.isMine = false;

		this.scene = this.el.sceneEl;
		this.syncEl = document.querySelector('altspace-sync');
		this.connected = false;

		if(this.syncEl.connected)
			this.start();
		else
			this.scene.addEventListener('connected', this.start.bind(this));

		if(this.data.ownOn)
		{
			let ownershipEvents = this.data.ownOn.split(/[ ,]+/);
			ownershipEvents.forEach((e => {
				this.el.addEventListener(e, (() => {
					if(this.connected){
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
		this.ownerRef.set(this.syncEl.clientId);

		//clear our ownership if we disconnect
		//this is needed if we are the last user in the room, but we expect people to join later
		this.ownerRef.onDisconnect().set(null);
	}

	start()
	{
		//Make sure someone always owns an object. If the owner leaves and we are the master client, we will take it.
		//This ensures, for example, that synced animations keep playing
		this.scene.addEventListener('clientleft', (event => {
			let shouldTakeOwnership = (!this.ownerId || this.ownerId === event.detail.id) && this.syncEl.isMasterClient;
			if(shouldTakeOwnership)
				this.takeOwnership();
		}).bind(this));

		if (this.data.mode === 'link') {
			let id = this.el.id;
			if (!id) {
				console.error('Entities cannot be synced using link mode without an id.');
				return;
			}

			this.link(this.syncEl.sceneRef.child(id));
			this.setupReceive();

		} else {
			console.error('Unsupported sync mode: ' + this.data.mode);
			return;
		}

		this.connected = true;
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
		function onOwnerUpdate(snapshot)
		{
			let newOwnerId = snapshot.val();
			let gained = newOwnerId === this.syncEl.clientId && !this.isMine;
			if (gained) {
				this.el.emit('ownershipgained', null, false);
			}

			//note this also fires when we start up without ownership
			let lost = newOwnerId !== this.syncEl.clientId;
			if (lost) {
				this.el.emit('ownershiplost', null, false);

				//we no longer have to clear our ownership when we disconnect
				this.ownerRef.onDisconnect().cancel();
			}

			this.ownerId = newOwnerId;

			this.isMine = newOwnerId === this.syncEl.clientId;
		}

		this.ownerRef.transaction(
			(owner => {
				if (owner) return undefined;
				// try to take ownership
				return this.syncEl.clientId;
			}).bind(this),

			((error, committed) => {
				if(committed) {
					// Commit succeeded. We are the owner, so set to null if we disconnect.
					this.ownerRef.onDisconnect().set(null);
				}
				this.ownerRef.on('value', onOwnerUpdate.bind(this));
			}).bind(this)
		);
	}
}

export default SyncComponent;
