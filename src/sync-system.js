AFRAME.registerSystem('sync-system',
{
	schema: {
		author: { type: 'string', default: null },
		app: { type: 'string', default: null },
		instance: { type: 'string', default: null },
		'ref-url': { type: 'string', default: null },
	},
	init: function() {
		var component = this;

		if(!this.data || !this.app){
			console.warn('The sync-system must be present on the scene and configured with required data.');
			return;
		}

		component.isConnected = false;

		altspace.utilities.sync.connect({
			authorId: this.data.author,
			appId: this.data.app,
			instanceId: this.data.instance,
			baseRefUrl: this.data['ref-url']
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
	}
});