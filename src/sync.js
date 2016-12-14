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
* @prop {string} ownOn - The name of the event that will cause the local client
* to take ownership of this object.
*/
AFRAME.registerComponent('sync',
{
	schema: {
		mode: { default: 'link' },
		ownOn: { type: 'string' } //cannot be changed after creation
	},
	init: function () {
		var scene = document.querySelector('a-scene');
		var syncSys = scene.systems['sync-system'];

		var ref;
		var key;
		var dataRef;
		var ownerRef;
		var ownerId;
		var isMine = false;

		var component = this;

		component.isConnected = false;

		if(syncSys.isConnected) start(); else scene.addEventListener('connected', start);


		if(component.data.ownOn){
			var ownershipEvents = component.data.ownOn.split(/[ ,]+/);
			for(var i = 0, max = ownershipEvents.length; i < max; i++){
				component.el.addEventListener(ownershipEvents[i], function(){
					if(component.isConnected){
						component.takeOwnership();
					}
				});
			}
		}

		function start(){
			//Make sure someone always owns an object. If the owner leaves and we are the master client, we will take it.
			//This ensures, for example, that synced animations keep playing
			scene.addEventListener('clientleft', function(event){
				var shouldTakeOwnership = (!ownerId || ownerId === event.detail.id) && syncSys.isMasterClient;

				if(shouldTakeOwnership) component.takeOwnership();
			});

			if (component.data.mode === 'link') {
				var id = component.el.id;
				if (!id) {
					console.error('Entities cannot be synced using link mode without an id.');
					return;
				}

				console.log('syncSys: ' + syncSys);
				console.log('syncSys.sceneRef: ' + syncSys.sceneRef);

				link(syncSys.sceneRef.child(id));
				setupReceive();

			} else {
				console.error('Unsupported sync mode: ' + component.data.mode);
				return;
			}

			component.isConnected = true;
			component.el.emit('connected', null, false);
		}

		function link(entityRef) {
			ref = entityRef;
			key = ref.key();
			dataRef = ref.child('data');
			component.dataRef = dataRef;
			ownerRef = ref.child('owner');
		}

		function setupReceive() {

			//if nobody has owned the object yet, we will.
			ownerRef.transaction(function (owner) {
				if (owner) return undefined;

				ownerRef.onDisconnect().set(null);
				return syncSys.clientId;
			});

			ownerRef.on('value',
				function(snapshot) {
					var newOwnerId = snapshot.val();

					var gained = newOwnerId === syncSys.clientId && !isMine;
					if (gained) component.el.emit('ownershipgained', null, false);


					//note this also fires when we start up without ownership
					var lost = newOwnerId !== syncSys.clientId && isMine;
					if (lost){
						component.el.emit('ownershiplost', null, false);

						//we no longer have to clear our ownership when we disconnect
						ownerRef.onDisconnect().cancel();
					}

					ownerId = newOwnerId;

					isMine = newOwnerId === syncSys.clientId;
				});
		}

		/**
		* Tell sync to start pushing local property values instead of updating
		* local from remote values.
		* @method sync.sync#takeOwnership
		*/
		component.takeOwnership = function() {
			ownerRef.set(syncSys.clientId);

			//clear our ownership if we disconnect
			//this is needed if we are the last user in the room, but we expect people to join later
			ownerRef.onDisconnect().set(null);
		}

		Object.defineProperty(component, 'isMine', {
			get: function () {
				return isMine;//TODO: Should this be state instead?
			}
		});
	}
});
