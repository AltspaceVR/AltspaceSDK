/**
* Enables the synchronization of properties of entities. All property sync components
* require both a {@link sync.sync-system} on `a-scene`, and a {@link sync.sync}
* on the entity to be synced.
* @name sync
* @namespace sync
* @example
* <a-scene sync-system='app: example sync; author: altspacevr'>
*   <a-entity sync='ownOn: cursordown' sync-color></a-entity>
* </a-scene>
*/

/**
* Enables the synchronization of properties of the entity. Must be used in
* conjuction with the {@link sync.sync-system} component and a component for a
* specific property (e.g. {@link sync.sync-transform}).
* @memberof sync
* @mixin sync
* @prop {string} ownOn - The name of the event, or a list of events, that
* will cause the local client to take ownership of this object. This field
* cannot be updated after initialization.
*/

import AFrameComponent from './AFrameComponent';

export default class SyncComponent
{
	constructor(isComponent = false)
	{
		this._isComponent = isComponent;
		this.scene = document.querySelector('a-scene');
		this.syncSys = scene.systems['sync-system'];

		this.ref = undefined;
		this.key = undefined;
		this.dataRef = undefined;
		this.ownerRef = undefined;
		this.ownerId = undefined;

		this.isConnected = false;

		/**
		* Indicates whether the sync ownership is yours.
		* @member sync.sync#isMine
		* @readonly
		*/
		this.isMine = false;
	}

	get schema(){
		return {
			mode: { default: 'link' },
			ownOn: { type: 'string' } //cannot be changed after creation
		};
	}

	init()
	{
		// shim in the ability to directly instantiate this class
		if(this._isComponent)
			SyncComponent.prototype.constructor.call(this, this._isComponent);

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
	* @method sync.sync#takeOwnership
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
			ownerRef.onDisconnect().set(null);
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
