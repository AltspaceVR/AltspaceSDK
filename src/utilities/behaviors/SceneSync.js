'use strict';

import Behavior from './Behavior';

// common maps between identifiers and objects
var syncBehaviors = [];
var objectForKey = {};
var keyForUuid = {};

function autoSendAll() {
	syncBehaviors.forEach(s => s.autoSend());
}

/**
* The SceneSync behavior manages the synchronization of an entire scene.
* @param {Firebase} syncInstance - Obtain this by calling [altspace.utilities.sync.connect]{@link module:altspace/utilities/sync.connect}
* @param {Object} [config]
* @param {Object} [config.instantiators] A dictionary of instantiation
* callbacks by syncType. Instantiators are called on every client whenever an
* instantiation call is made. Instantiators are passed an initialization
* data object and the syncType. They should return an Object3D with an
* Object3DSync behavior.
* @param {Object} [config.destroyers] (Optional) A dictionary of destroy
* callbacks by syncType. Destroyers are called on every client whenever a
* destroy call is made. If no destroyer is provided, a default one will be use
* which will remove the object from its parent and dispose its geometry, material, and texture.
* If you return true from a custom destroyer, the default destroyer will also be called.
* @param {Function} [config.ready] A callback that is called after
* checking to see if the instance has already been initialized. The callback is passed a boolean that
* is true if this is the first callback that has been called for this sync instance.
* This is primarily useful for setting up any objects that should only be created
* once for an instance, and is not necessary otherwise.
* @param {integer} [config.autoSendRateMS=100] - The rate updates are published
* to other clients, in milliseconds. This can usually be left default.
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
**/
class SceneSync extends Behavior
{
	get type(){ return 'SceneSync'; }

	constructor(instanceRef, config)
	{
		this.config = Object.assign(
			{instantiators: {}, destroyers: {}, ready: null, autoSendRateMS: 100},
			config
		);

		this.instanceRef = instanceRef;
		this.sceneRef = instanceRef.child('scene');
		this.clientsRef = instanceRef.child('clients');

		this.clientId = null;
		// there should always be one master client in the room. For now it will be the longest person online.
		this.masterClientId = null;

	}

	awake(o, s)
	{
		setInterval(autoSendAll, this.config.autoSendRateMS);

		let scene = s;

		// temporary way of having unique identifiers for each client
		this.clientId = scene.uuid;
		this.clientsRef.on("value", (snapshot => {
			let clientIds = snapshot.val();
			if (!clientIds) return;

			let masterClientKey = Object.keys(clientIds)[0];
			this.masterClientId = clientIds[masterClientKey];
		}).bind(this));

		// add our client ID to the list of connected clients,
		// but have it be automatically removed by firebase if we disconnect for any reason
		this.clientsRef.push(clientId).onDisconnect().remove();

		this.instanceRef.child('initialized').once('value', (snapshot => {
			let shouldInitialize = !snapshot.val();
			snapshot.ref().set(true);
			if (this.config.ready) {
				this.config.ready(shouldInitialize);
			}
		}).bind(this));

		this.sceneRef.on('child_added', this.onInstantiate.bind(this));
		this.sceneRef.on('child_removed', this.onDestroy.bind(this));
	}

	/**
	* Instantiate an object by syncType.
	* @param {String} syncType Type of object to instantiate.
	* @param {Object} initData An object containing initialization data, passed
	* to the instantiator.
	* @param {Boolean} destroyOnDisconnect If the object should be destroyed
	* across all synced instance when the instantiating instance disconnects.
	* @returns {Object3DSync}
	*/
	instantiate(syncType, initData = {}, destroyOnDisconnect)
	{
		let objectRef = this.sceneRef.push({ syncType: syncType, initData: initData },
			error => { if (error) throw Error('Failed to save to Firebase', error); }
		);

		if(destroyOnDisconnect){
			objectRef.onDisconnect().remove();//send remvoe_child to remote clients
		}

		//instantiation done, local child_added callback happens syncronously with push
		let object = objectForKey[objectRef.key()];
		object.getBehaviorByType('Object3DSync').takeOwnership();
		return object;
	}

	onInstantiate(snapshot)
	{
		let data = snapshot.val();
		let key = snapshot.key();
		let instantiator = this.instantiators[data.syncType];

		if (!instantiator) {
			console.warn('No instantiator found for syncType: ' + data.syncType);
			return;
		}

		let object3d = instantiator(data.initData, data.syncType);
		if (!object3d) {
			console.error(data.syncType + '.create must return an Object3D');
			return;
		}
		objectForKey[key] = object3d;
		keyForUuid[object3d.uuid] = key;

		let syncBehavior = object3d.getBehaviorByType('Object3DSync');
		if (!syncBehavior) {
			console.error(data.syncType + ' instantiator must return an Object3D with an Object3DSync behavior');
			return;
		}

		syncBehaviors.push(syncBehavior);
		syncBehavior.link(snapshot.ref(), this);
	}

	/**
	* Destroy a synced object across instances.
	* @param {Object} object3d The object to destroy.
	*/
	destroy(object3d)
	{
		let key = keyForUuid[object3d.uuid];
		if (!key) {
			console.warn('Failed to find key for object3d to be destroyed', object3d);
			return;
		}
		this.sceneRef.child(key).remove( error => {
			if (error) console.warn('Failed to remove from Firebase', error);
		});
		this.sceneRef.child(key).off();//detach all callbacks
	}

	onDestroy(snapshot)
	{
		let data = snapshot.val();
		let key = snapshot.key();
		let object3d = objectForKey[key];
		if (!object3d) {
			console.warn('Failed to find object matching deleted key', key);
			return;
		}
		let syncType = data.syncType;
		if (!syncType) {
			console.warn('No syncType found for object being destroyed', object3d);
			return;
		}

		function defaultDestroyer(object3d)
		{
			// remove all behaviors including this one
			object3d.removeAllBehaviors();

			// remove from scene or parent
			if (object3d.parent) {
				object3d.parent.remove(object3d);
			}

			if (object3d.geometry) {
				object3d.geometry.dispose();
			}

			if (object3d.material) {
				if (object3d.material.map) {
					object3d.material.map.dispose();
				}
				object3d.material.dispose();
			}
		}

		let customDestroyer = this.config.destroyers[syncType]
		let shouldDefaultDestroy = !customDestroyer;

		if (customDestroyer){
			// returning true from a destroyer will additionally invoke the default destroyer
			shouldDefaultDestroy = customDestroyer(object3d);
		}

		if (shouldDefaultDestroy)
			defaultDestroyer(object3d);

		//remove from our local bookkeeping
		delete objectForKey[key];
		delete keyForUuid[object3d.uuid];
	}

	/**
	* True if this client is the master, false otherwise. Master is generally the client that
	* has been in the room the longest.
	* @instance
	* @member {boolean} isMasterClient
	* @memberof module:altspace/utilities/behaviors.SceneSync
	*/
	get isMasterClient(){ return this.masterClientId === this.clientId; }
}

export default SceneSync;
