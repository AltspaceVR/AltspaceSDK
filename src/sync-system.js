/**
* Connect to a remote Firebase server, and facilitate synchronization. These
* options correspond exactly with the configuration options for
* [altspace.utilities.sync.connect]{@link http://altspacevr.github.io/AltspaceSDK/doc/module-altspace_utilities_sync.html#.connect}.
* This component must be present on `a-scene` for any other sync components to work.
* @memberof sync
* @mixin sync-system
* @prop {string} author - A unique identifier for you or your organization.
* @prop {string} app - The name of the app.
* @prop {string} refUrl - Override the base reference. Set this to use your own Firebase.
* @prop {string} instance - Override the instance ID. Can also be overridden with
* a URL parameter.
*/
AFRAME.registerSystem('sync-system', {
	schema: {
		author: { type: 'string', default: null },
		app: { type: 'string', default: null },
		instance: { type: 'string', default: null },
		refUrl: { type: 'string', default: null }
	},
	init: function() {
		var system = this;

		if(!this.data || !this.data.app){
			console.warn('The sync-system must be present on the scene and configured with required data.');
			return;
		}

		system.isConnected = false;
		system.queuedInstantiations = [];
		Promise.all([
			altspace.utilities.sync.connect({
				authorId: this.data.author,
				appId: this.data.app,
				instanceId: this.data.instance,
				baseRefUrl: this.data.refUrl
			}),
			altspace.getUser()
		]).then(function(results) {
			this.connection = results.shift();
			this.userInfo = results.shift();

			this.sceneRef = this.connection.instance.child('scene');
			this.clientsRef = this.connection.instance.child('clients');

			// temporary way of having unique identifiers for each client
			this.clientId = this.sceneEl.object3D.uuid;
			var masterClientId;
			this.clientsRef.on("value", function (snapshot) {
				var clientIds = snapshot.val();

				var masterClientKey = Object.keys(clientIds)[0];
				masterClientId = clientIds[masterClientKey];
			});

			this.clientsRef.on('child_added', function(childSnapshot) {
				var joinedClientId = childSnapshot.val();
				//let the master client flag get set first
				setTimeout(function(){
					system.sceneEl.emit('clientjoined', {id: joinedClientId}, false);
				}, 0);
			});

			this.clientsRef.on('child_removed', function(childSnapshot) {
				var leftClientId = childSnapshot.val();
				//let the master client flag get set first
				setTimeout(function(){
					system.sceneEl.emit('clientleft', {id: leftClientId}, false);
				}, 0);
			});

			// add our client ID to the list of connected clients,
			// but have it be automatically removed by firebase if we disconnect for any reason
			this.clientsRef.push(this.clientId).onDisconnect().remove();

			this.connection.instance.child('initialized').once('value', function (snapshot) {
				var shouldInitialize = !snapshot.val();
				snapshot.ref().set(true);

				system.initializeInstantiationRef();

				system.sceneEl.emit('connected', { shouldInitialize: shouldInitialize }, false);
				system.isConnected = true;
			}.bind(this));


			Object.defineProperty(this, 'isMasterClient', {
				get: function () { return masterClientId === this.clientId; }.bind(this)
			});
		}.bind(this));
	},
	initializeInstantiationRef: function () {
		this.instantiatedElementsRef = this.sceneRef.child('instantiatedElements')
		this.instantiatedElementsRef.on('child_added', this.listenToInstantiationGroup.bind(this));
		this.instantiatedElementsRef.on('child_removed', this.stopListeningToInstantiationGroup.bind(this));
		this.processQueuedInstantiations();
	},
	listenToInstantiationGroup: function (snapshot) {
		snapshot.ref().on('child_added', this.createElement.bind(this));
		snapshot.ref().on('child_removed', this.removeElement.bind(this));
	},
	stopListeningToInstantiationGroup: function (snapshot) {
		snapshot.ref().off('child_added');
		snapshot.ref().off('child_removed');
	},
	processQueuedInstantiations: function () {
		this.queuedInstantiations.forEach(function (instantiationProps) {
			instantiationProps.creatorUserId = this.userInfo.userId;
			instantiationProps.clientId = this.clientId;
			this.instantiatedElementsRef.child(instantiationProps.groupName).
				push(instantiationProps).
				onDisconnect().remove();
		}.bind(this));
		this.queuedInstantiations.length = 0;
	},
	instantiate: function (instantiatorId, groupName, mixin, parent) {
		// Bit of a hack since we need to store a string to in firebase and parent.stringify doesn't
		// return a proper selector for a-scene.
		var parentSelector = parent.nodeName === 'A-SCENE' ? 'a-scene' : '#' + parent.id;
		var instantiationProps = {
			instantiatorId: instantiatorId,
			groupName: groupName,
			mixin: mixin,
			parent: parentSelector
		};
		this.queuedInstantiations.push(instantiationProps);
		if (this.isConnected) {
			this.processQueuedInstantiations();
		}
	},
	removeLast: function (groupName) {
		return new Promise(function (resolve) {
			this.instantiatedElementsRef.child(groupName).orderByKey().limitToLast(1).once(
				'value',
				function (snapshot) {
					if (!snapshot.hasChildren()) { resolve(); return; }
					var val = snapshot.val();
					var key = Object.keys(val)[0];
					resolve(val[key].instantiatorId);
					snapshot.ref().child(key).remove();
				});
		}.bind(this));
	},
	createElement: function (snapshot) {
		var val = snapshot.val();
		var key = snapshot.key();
		var entityEl = document.createElement('a-entity');
		entityEl.id = val.groupName + '-instance-' + key;
		entityEl.dataset.instantiatorId = val.instantiatorId;
		document.querySelector(val.parent).appendChild(entityEl);
		entityEl.setAttribute('mixin', val.mixin);
		entityEl.dataset.creatorUserId = val.creatorUserId;
	},
	removeElement: function (snapshot) {
		var val = snapshot.val();
		var key = snapshot.key();
		var id = val.groupName + '-instance-' + key;
		var el = document.querySelector('#' + id);
		el.parentNode.removeChild(el);
	}
});
