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
	if (config.position === undefined) config.position = false;
	if (config.rotation === undefined) config.rotation = false;
	if (config.scale === undefined) config.scale = false;
	if (config.syncData === undefined) config.syncData = false;
	if (config.auto === undefined) config.auto = false;
	if (config.tolerance === undefined) config.tolerance = {
		position: 1, rotation: 1, scale: 1
	};

	var object3d;
	var ref;
	var key;

	var sendEnqueued = false;

	var dataRef;

	var lastData;//most recent data sent for this object

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
		if (!object3d) return;

		var data = {}
		//Round so comparisions work as expected, 4 decimal places seems sufficient. 
		data.senderUuid = object3d.uuid;
		if (config.position) {
			data.position = {
				x: object3d.position.x.toFixed(4),
				y: object3d.position.y.toFixed(4),
				z: object3d.position.z.toFixed(4)
			};
		}
		if (config.rotation) {
			data.rotation = {
				x: object3d.quaternion.x.toFixed(4),
				y: object3d.quaternion.y.toFixed(4),
				z: object3d.quaternion.z.toFixed(4),
				w: object3d.quaternion.w.toFixed(4)
			};
		}
		if (config.scale) {
			data.scale = {
				x: object3d.scale.x.toFixed(4),
				y: object3d.scale.y.toFixed(4),
				z: object3d.scale.z.toFixed(4)
			};
		}
		if (config.syncData) {
			data.syncData = object3d.userData.syncData;//TODO: see if this needs to be parsed and stringified
		}

		//If auto-send enabled, only send if values differ from last time.
		if (!config.auto || lastData === undefined || needsUpdate(data)) {
			dataRef.set(data);
			if (config.TRACE) {
				console.log('SEND data for object '+object3d.name, data);
			}
		}

		lastData = {};
		if (config.position) lastData.position = data.position;
		if (config.rotation) lastData.rotation = data.rotation;
		if (config.scale) lastData.scale = data.scale;
		if (config.position) lastData.syncData = data.syncData;
	}

	function needsUpdate(newData) {

		var diff = function(triple1, triple2, tolerance) {
			//Use greater-than-or-equal-to so setting tolerance to 0 always sends.
			var result =
				Math.abs(triple1.x - triple2.x) >= tolerance ||
				Math.abs(triple1.y - triple2.y) >= tolerance ||
				Math.abs(triple1.z - triple2.z) >= tolerance;

			return result;
		};

		if (config.position) {
			if (diff(newData.position, lastData.position, config.tolerance.position)) {
				return true;
			}
		}

		if (config.rotation) {
			if (diff(newData.rotation, lastData.rotation, config.tolerance.rotation)) {
				return true;
			}
		}

		if (config.scale) {
			if (diff(newData.scale, lastData.scale, config.tolerance.scale)) {
				return true;
			}
		}

		if (config.syncData) {
			var keys = Object.keys(lastData);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (lastData[key] !== newData[key]) return true;
			}
		}

		return false;
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

