'use strict';

import {AFrameSystem} from './AFrameComponent';

/**
* Connect to a remote Firebase server, and facilitate synchronization. These
* options correspond exactly with the configuration options for
* [altspace.utilities.sync.connect]{@link module:altspace/utilities/sync.connect}.
* This component must be present on `a-scene` for any other sync components to work. @aframe
* @alias sync-system
* @extends module:altspace/components.AFrameSystem
* @memberof module:altspace/components
*/
class SyncSystem extends AFrameSystem
{
	get schema(){
		return {
			/**
			* A unique identifier for you or your organization.
			* @instance
			* @member {string} author
			* @memberof module:altspace/components.sync-system
			*/
			author: { type: 'string', default: null },

			/**
			* The name of the app.
			* @instance
			* @member {string} app
			* @memberof module:altspace/components.sync-system
			*/
			app: { type: 'string', default: null },

			/**
			* Override the instance ID. Can also be overridden with a URL parameter.
			* @instance
			* @member {string} instance
			* @memberof module:altspace/components.sync-system
			*/
			instance: { type: 'string', default: null },

			/**
			* Override the base reference. Set this to use your own Firebase.
			* @instance
			* @member {string} refUrl
			* @memberof module:altspace/components.sync-system
			*/
			refUrl: { type: 'string', default: null }
		};
	}

	/**
	* True if the sync system is connected and ready for syncing.
	* @member module:altspace/components.sync-system#isConnected
	* @readonly
	*/

	/**
	* Fired when a connection is established and the sync system is fully initialized.
	* @event module:altspace/components.sync-system#connected
	* @property {boolean} shouldInitialize - True if this is the first client to establish a connection.
	*/

	/**
	* Fired when a client joins.
	* @event module:altspace/components.sync-system#clientjoined
	* @property {string} id - Guid identifying the client.
	*/

	/**
	* Fired when a client leaves.
	* @event module:altspace/components.sync-system#clientleft
	* @property {string} id - Guid identifying the client.
	*/

	init()
	{
		if(!this.data || !this.data.app){
			console.warn('The sync-system must be present on the scene and configured with required data.');
			return;
		}
		console.log(this.data);

		this.isConnected = false;
		Promise.all([
			altspace.utilities.sync.connect({
				authorId: this.data.author,
				appId: this.data.app,
				instanceId: this.data.instance,
				baseRefUrl: this.data.refUrl
			}),
			altspace.getUser()
		]).then(this.connected.bind(this));
	}

	connected(results)
	{
		this.connection = results.shift();
		this.userInfo = results.shift();

		this.sceneRef = this.connection.instance.child('scene');
		this.clientsRef = this.connection.instance.child('clients');
		this.instantiatedElementsRef = this.connection.instance.child('instantiatedElements')

		this.instantiatedElementsRef.on('child_added', this.listenToInstantiationGroup.bind(this));
		this.instantiatedElementsRef.on('child_removed', this.stopListeningToInstantiationGroup.bind(this));

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

			self.processQueuedInstantiations();

			self.sceneEl.emit('connected', { shouldInitialize: shouldInitialize }, false);
			self.isConnected = true;
		});
	}

	/**
	* Returns true if the local client is the master client.
	* @instance
	* @method isMasterClient
	* @memberof module:altspace/components.sync-system
	* @returns {boolean}
	*/
	isMasterClient()
	{
		return this.masterClientId === this.clientId;
	}

	listenToInstantiationGroup(snapshot) {
		snapshot.ref().on('child_added', this.createElement.bind(this));
		snapshot.ref().on('child_removed', this.removeElement.bind(this));
	}

	stopListeningToInstantiationGroup(snapshot) {
		snapshot.ref().off('child_added');
		snapshot.ref().off('child_removed');
	}

	processQueuedInstantiations() {
		this.queuedInstantiations.forEach((instantiationProps => {
			instantiationProps.creatorUserId = this.userInfo.userId;
			instantiationProps.clientId = this.clientId;
			this.instantiatedElementsRef.child(instantiationProps.groupName).
				push(instantiationProps).
				onDisconnect().remove();
		}).bind(this));
		// Clear queue.
		this.queuedInstantiations.length = 0;
	}

	/**
	* Instantiate an entity with the given mixins.
	* @param {string} mixin - A comma-separated list of mixin ids which should be used to instantiate the entity.
	* @param {Element} [parent] - An element to which the entity should be added. Defaults to the scene.
	* @param {Element} [el] - The element responsible for instantiating this entity.
	* @param {string} [groupName] - A group that the entity should belong to. Used in conjunction with
	*	[removeLast]{@link module:altspace/components.sync-system#removeLast}.
	* @param {string} [instantiatorId] - Used by [removeLast]{@link module:altspace/components.sync-system#removeLast} to indicate who was
	*	responsible for the removed entity.
	*/
	instantiate(mixin, parent, el, groupName, instantiatorId) {
		// TODO Validation should throw an error instead of a console.error, but A-Frame 0.3.0 doesn't propagate those
		// correctly.
		if (!mixin) {
			console.error('AltspaceVR: Instantiation requires a mixin value.', el);
			return;
		}
		let parentWithId = parent && parent.id;
		let parentIsScene = parent.nodeName === 'A-SCENE';
		if (!parentWithId && !parentIsScene) {
			console.error('AltspaceVR: Instantiation requires a parent with an id.', el);
			return;
		}

		let parentSelector = parentWithId ? '#' + parent.id : 'a-scene';
		let instantiationProps = {
			instantiatorId: instantiatorId || '',
			groupName: groupName || 'main',
			mixin: mixin,
			parent: parentSelector
		};
		this.queuedInstantiations.push(instantiationProps);
		if (this.isConnected) {
			this.processQueuedInstantiations();
		}
	}

	/**
	* Remove the last entity instantiated in the given group.
	* Returns a Promise which resolves with the instantiatorId associated with the removed entity.
	* @param {string} groupName - Name of the group from which to remove the entity.
	* @returns {Promise}
	*/
	removeLast(groupName) {
		return new Promise((resolve => {
			this.instantiatedElementsRef.child(groupName).orderByKey().limitToLast(1).once(
				'value',
				snapshot => {
					if (!snapshot.hasChildren()) { resolve(); return; }
					let val = snapshot.val();
					let key = Object.keys(val)[0];
					resolve(val[key].instantiatorId);
					snapshot.ref().child(key).remove();
				}
			);
		}).bind(this));
	}

	createElement(snapshot) {
		let val = snapshot.val();
		let key = snapshot.key();
		let entityEl = document.createElement('a-entity');
		entityEl.id = val.groupName + '-instance-' + key;
		document.querySelector(val.parent).appendChild(entityEl);
		entityEl.setAttribute('mixin', val.mixin);
		entityEl.dataset.creatorUserId = val.creatorUserId;
	}

	removeElement(snapshot) {
		let val = snapshot.val();
		let key = snapshot.key();
		let id = val.groupName + '-instance-' + key;
		let el = document.querySelector('#' + id);
		el.parentNode.removeChild(el);
	}
}

export default SyncSystem;
