window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The Object3DSync behavior syncs an object's transform and data
 *
 * @class Object3DSync
 * @param {Object} [config]
 * @param {Boolean} [config.position=false] Whether object's position should
 *  be synced
 * @param {Boolean} [config.rotation=false] Whether object's rotation should
 *  be synced
 * @param {Boolean} [config.scale=false] Whether object's scale should
 *  be synced
 * @param {Boolean} [config.syncData=false] Whether object's syncData should
 *  be synced
 * @param {Boolean} [config.auto=false] Whether the object should be synced 
 *  automatically. Not currently recommended.
 * @memberof module:altspace/utilities/behaviors
 **/
window.altspace.utilities.behaviors.Object3DSync = function (config){
	config = config || {};
	/*if (config.position === undefined) config.position = true;
	if (config.rotation === undefined) config.rotation = true;
	if (config.scale === undefined) config.scale = true;
	if (config.syncData === undefined) config.syncData = true;*/
	var object3d;
	var ref;
	var key;

	var sendEnqueued = false;

	var dataRef;

	function link(objectRef) {
		ref = objectRef;
		key = ref.key();
		dataRef = ref.child('data');
	}

	//TODO: lerp
	function setupReceive() {
		dataRef.on('value', function (snapshot) {
			var data = snapshot.val();
			if(!data) return;
			if (!data.senderUuid) console.warn('Missing data.senderUuid', data);
			if (data.senderUuid === object3d.uuid) return;//We just sent this, ignore.

			if (config.TRACE) {
				console.log('RECV data for object '+object3d.name, data);
			}
			if (config.position) {
				var position = data.position;
				if (!position) {
					console.warn('Missing position data for object '+object3d.name, data);
				}
				object3d.position.set(position.x, position.y, position.z);
			}
			if (config.rotation) {
				var rotation = data.rotation;
				if (!rotation) {
					console.warn('Missing rotation data for object '+object3d.name, data);
				}
				object3d.rotation.set(rotation.x, rotation.y, rotation.z);
			}
			if (config.scale) {
				var scale = data.scale;
				if (!scale) {
					console.warn('Missing scale data for object '+object3d.name, data);
				}
				object3d.scale.set(scale.x, scale.y, scale.z);
			}
			if (config.syncData) {
				var syncData = data.syncData;
				if (!syncData) {
					console.warn('Missing syncData data for object '+object3d.name, data);
				}
				if (syncData) {
					object3d.userData.syncData = syncData;
				}
			}
		});
		if (config.TRACE) {
			console.log('SETUP sync for object '+object3d.name+' syncing: '+
				(config.position ? 'position, ' : '') +
				(config.rotation ? 'rotation, ' : '') +
				(config.scale ? 'scale, ' : '') +
				(config.syncData ? 'syncData, ' : '') +
				'with autoSend='+!!config.auto, object3d); 
		}
	}


	/**
	 * Enqueue a sync for the next SceneSync update.
	 * 
	 * This is to be used whenever you update a property and are not using auto. If multiple users could potentially move an object, this is preferred vs using auto.
	 * @instance
	 * @method enqueueSend
	 * @memberof module:altspace/utilities/behaviors.Object3DSync
	 */
	function enqueueSend() {
		sendEnqueued = true;
	}

	function send() {

		var data = {}
		data.senderUuid = object3d.uuid;
		if (config.position) {
			data.position = {
				x: object3d.position.x,
				y: object3d.position.y,
				z: object3d.position.z
			};
		}
		if (config.rotation) {
			data.rotation = {
				x: object3d.quaternion.x,
				y: object3d.quaternion.y,
				z: object3d.quaternion.z,
				w: object3d.quaternion.w
			};
		}
		if (config.scale) {
			data.scale = {
				x: object3d.scale.x,
				y: object3d.scale.y,
				z: object3d.scale.z
			};
		}
		if (config.syncData) {
			data.syncData = object3d.userData.syncData;//TODO: see if this needs to be parsed and stringified
		}
		dataRef.set(data);
		if (config.TRACE) {
			console.log('SEND data for object '+object3d.name, data);
		}
	}

	function autoSend() {
		if (config.auto || sendEnqueued) send();
		sendEnqueued = false;
	}

	function awake(o) {
		object3d = o;
		if (config.syncData) {
			if (!object3d.userData.syncData) {//init here so app can assume it exists
				object3d.userData.syncData = {};
			}
		}

		setupReceive();
	}

	function update(deltaTime) {
		
	}

	var exports = { awake: awake, update: update, type: 'Object3DSync', link: link, send: send, enqueueSend: enqueueSend, autoSend: autoSend};

	return exports;
};

