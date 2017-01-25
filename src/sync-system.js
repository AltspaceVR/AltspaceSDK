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
AFRAME.registerSystem('sync-system',
{
	schema: {
		author: { type: 'string', default: null },
		app: { type: 'string', default: null },
		instance: { type: 'string', default: null },
		refUrl: { type: 'string', default: null }
	},
	init: function() {
		var component = this;

		if(!this.data || !this.data.app){
			console.warn('The sync-system must be present on the scene and configured with required data.');
			return;
		}

		component.isConnected = false;
		console.log(this.data);
		altspace.utilities.sync.connect({
			authorId: this.data.author,
			appId: this.data.app,
			instanceId: this.data.instance,
			baseRefUrl: this.data.refUrl
		}).then(function(connection) {
			this.connection = connection;

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
					component.sceneEl.emit('clientjoined', {id: joinedClientId}, false);
				}, 0);
			});

			this.clientsRef.on('child_removed', function(childSnapshot) {
				var leftClientId = childSnapshot.val();
				//let the master client flag get set first
				setTimeout(function(){
					component.sceneEl.emit('clientleft', {id: leftClientId}, false);
				}, 0);
			});

			// add our client ID to the list of connected clients,
			// but have it be automatically removed by firebase if we disconnect for any reason
			this.clientsRef.push(this.clientId).onDisconnect().remove();

			this.sceneRef.on('child_added', this.createElement.bind(this));
			this.sceneRef.on('child_removed', this.removeElement.bind(this));
			this.createdElements = new Map();

			this.connection.instance.child('initialized').once('value', function (snapshot) {
				var shouldInitialize = !snapshot.val();
				snapshot.ref().set(true);

				component.sceneEl.emit('connected', { shouldInitialize: shouldInitialize }, false);
				component.isConnected = true;
			}.bind(this));


			Object.defineProperty(this, 'isMasterClient', {
				get: function () { return masterClientId === this.clientId; }.bind(this)
			});
		}.bind(this));
	},
	instantiate: function (el, components) {
		this.sceneRef.push({clientId: this.clientId, type: el.nodeName, components: components}).onDisconnect().remove();
	},
	createElement: function (snapshot) {
		var elInfo = snapshot.val();
		// TODO Not sure why we sometimes get a snapshot value with {owner: <uuid>}
		if (!elInfo || !elInfo.type) { return; }
		if (elInfo.clientId === this.clientId) { return; }
		var el = document.createElement(elInfo.type);
		this.sceneEl.appendChild(el);
		elInfo.components.forEach(function (component) {
			el.setAttribute(component.type, component.data);
		});
		this.createdElements.set(snapshot.key(), el);
	},
	removeElement: function (snapshot) {
		var el = this.createdElements.get(snapshot.key());
		this.sceneEl.removeChild(el);
	},
});
