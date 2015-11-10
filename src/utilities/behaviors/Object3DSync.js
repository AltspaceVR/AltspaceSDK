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
 *  automatically.
 * @param {Boolean} [config.tolerance={position: 1, rotation: 1, scale: 1}] When auto is enabled, only changes above this threshold will be sent.
 * @memberof module:altspace/utilities/behaviors
 **/
window.altspace.utilities.behaviors.Object3DSync = function (config){
	config = config || {};
	if (config.tolerance === undefined) config.tolerance = {
		position: 1, rotation: 1, scale: 1
	};

	var object3d;
	var dataRef;

	var sendEnqueued = false;
	var lastData;//most recent data for this object

	function link(objectRef) {
		//Need child 'data' to encapsulate synced data, since SyncSync already added
		//'initData' and 'syncType' as top-level properties on the object ref.
		dataRef = objectRef.child('data');
	}

	//TODO: lerp
	function setupReceive() {
		dataRef.on('value', function (snapshot) {
			var value = snapshot.val();
			if(!value) return;//When we first add an object, we get an empty callback.
			if (!value.senderUuid) console.warn('Missing value.senderUuid', value);
			if (value.senderUuid === object3d.uuid) return;//We just sent this, ignore.

			if (config.TRACE) {
				console.log('RECV value for object '+object3d.name, value);
			}
			if (config.position) {
				var position = value.position;
				toNumber(value.position);
				object3d.position.set(position.x, position.y, position.z);
			}
			//NOTE: rotation is expressed in quaternions, might want to rename.
			if (config.rotation) {
				var rotation = value.rotation;
				toNumber(value.rotation);
				object3d.rotation.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
			}
			if (config.scale) {
				var scale = value.scale;
				toNumber(value.scale);
				object3d.scale.set(scale.x, scale.y, scale.z);
			}
			if (config.syncData) {
				var syncData = value.syncData;
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
		if (!object3d) return;//This can happen just after we start auto-sending but before object awake.

		var data = {}
		data.senderUuid = object3d.uuid;
		if (config.position) {
			data.position = {
				x: object3d.position.x,
				y: object3d.position.y,
				z: object3d.position.z
			};
			toFixed(data.position);
		}
		if (config.rotation) {
			data.rotation = {
				x: object3d.quaternion.x,
				y: object3d.quaternion.y,
				z: object3d.quaternion.z,
				w: object3d.quaternion.w
			};
			toFixed(data.rotation);
		}
		if (config.scale) {
			data.scale = {
				x: object3d.scale.x,
				y: object3d.scale.y,
				z: object3d.scale.z
			};
			toFixed(data.scale);
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

	//TODO: change this to more robust comparison
	// http://floating-point-gui.de/errors/comparison/
	// https://github.com/scijs/almost-equal
	function toFixed(triple) {
		//Round so comparisions work as expected, 4 decimal places seems sufficient. 
		if (triple.x) triple.x = triple.x.toFixed(4);
		if (triple.y) triple.y = triple.y.toFixed(4);
		if (triple.z) triple.z = triple.z.toFixed(4);
		if (triple.w) triple.w = triple.w.toFixed(4);//for quaternion
	}

	function toNumber(triple) {
		//Values storted in Firebase as strings, convert to numbers.
		if (triple.x) triple.x = parseFloat(triple.x);
		if (triple.y) triple.y = parseFloat(triple.y);
		if (triple.z) triple.z = parseFloat(triple.z);
		if (triple.w) triple.w = parseFloat(triple.w);//for quaternion
	}

	function needsUpdate(newData) {

		var diff = function(triple1, triple2, tolerance) {
			//Use greater-than-or-equal-to so setting tolerance to 0 always sends.
			var result =
				Math.abs(triple1.x - triple2.x) >= tolerance ||
				Math.abs(triple1.y - triple2.y) >= tolerance ||
				Math.abs(triple1.z - triple2.z) >= tolerance ||
				(triple1.w !== undefined && Math.abs(triple1.w - triple2.w) >= tolerance);
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
			//TODO: Is there a more efficient way to do this?
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
		//nohting here for now	
	}

	var exports = { awake: awake, update: update, type: 'Object3DSync', link: link, send: send, enqueueSend: enqueueSend, autoSend: autoSend};

	return exports;
};

