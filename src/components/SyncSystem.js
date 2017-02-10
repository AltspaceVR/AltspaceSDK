'use strict';

import {AFrameSystem} from './AFrameComponent';

/**
* Connect to a remote Firebase server, and facilitate synchronization. These
* options correspond exactly with the configuration options for
* [altspace.utilities.sync.connect]{@link module:altspace/utilities/sync.connect}.
* This component must be present on `a-scene` for any other sync components to work.
* @extends module:altspace/components.AFrameSystem
* @memberof module:altspace/components
*/
class SyncSystem extends AFrameSystem
{
	/**
	* @prop {string} author - A unique identifier for you or your organization.
	* @prop {string} app - The name of the app.
	* @prop {string} refUrl - Override the base reference. Set this to use your own Firebase.
	* @prop {string} instance - Override the instance ID. Can also be overridden with
	* a URL parameter.
	*/
	get schema(){
		return {
			author: { type: 'string', default: null },
			app: { type: 'string', default: null },
			instance: { type: 'string', default: null },
			refUrl: { type: 'string', default: null }
		};
	}

	init()
	{
		if(!this.data || !this.data.app){
			console.warn('The sync-system must be present on the scene and configured with required data.');
			return;
		}
		console.log(this.data);

		this.isConnected = false;
		altspace.utilities.sync.connect({
			authorId: this.data.author,
			appId: this.data.app,
			instanceId: this.data.instance,
			baseRefUrl: this.data.refUrl
		}).then(this.connected.bind(this));
	}

	connected(connection)
	{
		this.connection = connection;

		this.sceneRef = this.connection.instance.child('scene');
		this.clientsRef = this.connection.instance.child('clients');

		// temporary way of having unique identifiers for each client
		this.clientId = this.sceneEl.object3D.uuid;
		this.masterClientId = null;

		let self = this;

		// local client connected
		this.clientsRef.on("value", snapshot => {
			let clientIds = snapshot.val();
			let masterClientKey = Object.keys(clientIds)[0];
			self.masterClientId = clientIds[masterClientKey];
		});

		// remote client connected
		this.clientsRef.on('child_added', childSnapshot => {
			let joinedClientId = childSnapshot.val();
			//let the master client flag get set first
			setTimeout(() => {
				self.sceneEl.emit('clientjoined', {id: joinedClientId}, false);
			}, 0);
		});

		// remote client disconnected
		this.clientsRef.on('child_removed', childSnapshot => {
			let leftClientId = childSnapshot.val();
			//let the master client flag get set first
			setTimeout(() => {
				self.sceneEl.emit('clientleft', {id: leftClientId}, false);
			}, 0);
		});

		// add our client ID to the list of connected clients,
		// but have it be automatically removed by firebase if we disconnect for any reason
		this.clientsRef.push(this.clientId).onDisconnect().remove();

		this.connection.instance.child('initialized').once('value', snapshot => {
			let shouldInitialize = !snapshot.val();
			snapshot.ref().set(true);

			self.sceneEl.emit('connected', { shouldInitialize: shouldInitialize }, false);
			self.isConnected = true;
		});
	}

	/**
	* Returns true if the local client is the master client.
	*/
	isMasterClient()
	{
		return this.masterClientId === this.clientId;
	}
}

export default SyncSystem;
