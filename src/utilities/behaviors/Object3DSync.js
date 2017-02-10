window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The Object3DSync behavior syncs an object's transform and data.  
 * **Note:** Object3DSync must be used in conjunction with 
 * [SceneSync]{@link module:altspace/utilities/behaviors.SceneSync}
 *
 * @class Object3DSync
 * @param {Object} [config]
 * @param {Boolean} [config.position=false] Whether object's position should
 *  be synced.
 * @param {Boolean} [config.rotation=false] Whether object's rotation should
 *  be synced.
 * @param {Boolean} [config.scale=false] Whether object's scale should
 *  be synced.
 * @param {Boolean} [config.auto=false] Whether the object should be synced 
 *  automatically. Not currently recommended.
 * @param {Boolean} [config.world=false] Whether world coordiantes should
 *  be sent when synchronizing position and rotation, instead of the
 *  transformation relative to the object's parent.  Use if synced object
 *  is a child (e.g. of the tracking skeleton) only in the sender scene.
 * @param {Object} [config.lerp]
 * @param {Boolean} [config.lerp.position=true] Whether object's position should
 *  be linearly interpolated.
 * @param {Boolean} [config.lerp.rotation=true] Whether object's rotation should
 *  be spherically linearly interpolated.
 * @param {Boolean} [config.lerp.scale=true] Whether object's scale should
 *  be linearly interpolated.
 * @param {Number} [config.lerp.duration=155] Duration that interpolation
 *  should be applied over, in milliseconds.
 * @memberof module:altspace/utilities/behaviors
 **/
window.altspace.utilities.behaviors.Object3DSync = function (config){
	config = config || {};
	config.lerp = config.lerp || {};
	/*if (config.position === undefined) config.position = true;
	if (config.rotation === undefined) config.rotation = true;
	if (config.scale === undefined) config.scale = true; */
	var object3d;
	var scene;
	var ref;
	var key;
	var dataRef;
	var ownerRef;
	var transformRef;

	var sceneSync;
	var isMine = false;

	var position = new THREE.Vector3();
	var quaternion = new THREE.Quaternion(); 
	var scale = new THREE.Vector3();
	var isEqual = require('lodash.isequal');

	var lerp = {
		duration: config.lerp.duration || 155,
		position: (config.lerp.position === undefined || config.lerp.position) ? {
			src: new THREE.Vector3(),
			dest: new THREE.Vector3()
		} : null,
		quaternion: (config.lerp.rotation === undefined || config.lerp.rotation) ? {
			src: new THREE.Quaternion(),
			dest: new THREE.Quaternion()
		} : null,
		scale: (config.lerp.scale === undefined || config.lerp.scale) ? {
			src: new THREE.Vector3(),
			dest: new THREE.Vector3()
		} : null
	};

	function link(objectRef, sS) {
		ref = objectRef;
		key = ref.key();
		transformRef = ref.child('batch');
		dataRef = ref.child('data');
		ownerRef = ref.child('owner');
		sceneSync = sS;
	}

	function setupReceive() {
		transformRef.on('value', function (snapshot) {

			if (isMine) return;

			var value = snapshot.val();
			if (!value) return;

			if (config.position) {
				if (lerp.position) {
					var lerpPosition = lerp.position;

					lerpPosition.src.copy(object3d.position);
					lerpPosition.dest.set(value.position.x, value.position.y, value.position.z);

					if (lerpPosition.progress === undefined) {
						object3d.position.copy(lerpPosition.dest);
						lerpPosition.progress = 1;
						lerpPosition.elapsedTime = lerp.duration;
					}
					else {
						lerpPosition.progress = 0;
						lerpPosition.elapsedTime = 0;
					}
				}
				else {
					object3d.position.set(value.position.x, value.position.y, value.position.z);
				}
			}

			if (config.rotation) {
				if(lerp.quaternion) {
					var lerpQuaternion = lerp.quaternion;

					lerpQuaternion.src.copy(object3d.quaternion);
					lerpQuaternion.dest.set(value.quaternion.x, value.quaternion.y, value.quaternion.z, value.quaternion.w);

					if (lerpQuaternion.progress === undefined) {
						object3d.quaternion.copy(lerpQuaternion.dest);
						lerpQuaternion.progress = 1;
						lerpQuaternion.elapsedTime = lerp.duration;
					}
					else {
						lerpQuaternion.progress = 0;
						lerpQuaternion.elapsedTime = 0;
					}
				}
				else {
					object3d.quaternion.set(value.quaternion.x, value.quaternion.y, value.quaternion.z, value.quaternion.w);
				}
			}

			if (config.scale) {
				if(lerp.scale) {
					var lerpScale = lerp.scale;

					lerpScale.src.copy(object3d.scale);
					lerpScale.dest.set(value.scale.x, value.scale.y, value.scale.z);

					if (lerpScale.progress === undefined) {
						object3d.scale.copy(lerpScale.dest);
						lerpScale.progress = 1;
						lerpScale.elapsedTime = lerp.duration;
					}
					else {
						lerpScale.progress = 0;
						lerpScale.elapsedTime = 0;
					}
				}
				else {
					object3d.scale.set(value.scale.x, value.scale.y, value.scale.z);
				}
			}
		});

		ownerRef.on('value', function (snapshot) {
			var newOwnerId = snapshot.val();

			var gained = newOwnerId === sceneSync.clientId && !isMine;
			if (gained) object3d.dispatchEvent({ type: 'ownershipgained' });

			var lost = newOwnerId !== sceneSync.clientId && isMine;
			if (lost) object3d.dispatchEvent({ type: 'ownershiplost' });
			
			isMine = newOwnerId === sceneSync.clientId;
		});
	}

	function send() {
		if (!isMine) return;

		var transform = {};
		if (config.world) {
			object3d.updateMatrixWorld();//call before sending to avoid being a frame behind
			object3d.matrixWorld.decompose(position, quaternion, scale); 
		} else {
			position = object3d.position;
			quaternion = object3d.quaternion;
			scale = object3d.scale;
		}
		if (config.position) {
			transform.position = {
				x: position.x,
				y: position.y,
				z: position.z
			};
		}
		if (config.rotation) {
			transform.quaternion = {
				x: quaternion.x,
				y: quaternion.y,
				z: quaternion.z,
				w: quaternion.w
			};
		}
		if (config.scale) {
			transform.scale = {
				x: scale.x,
				y: scale.y,
				z: scale.z
			};
		}
		if (Object.keys(transform).length > 0) {
			if (isEqual(transform, this.lastTransform)) { return; }
			transformRef.set(transform);
			this.lastTransform = transform;
		}
	}

	function awake(o, s) {
		object3d = o;
		scene = s;

		setupReceive();
	}

	function update(deltaTime) {
		if (config.rotation && lerp.quaternion) {
			var lerpQuaternion = lerp.quaternion;

			if (lerpQuaternion.progress !== undefined && lerpQuaternion.progress < 1) {
				lerpQuaternion.elapsedTime = THREE.Math.clamp(lerpQuaternion.elapsedTime + deltaTime, 0, lerp.duration);
				lerpQuaternion.progress = THREE.Math.clamp(lerpQuaternion.elapsedTime / lerp.duration, 0, 1);

				THREE.Quaternion.slerp(lerpQuaternion.src, lerpQuaternion.dest, object3d.quaternion, lerpQuaternion.progress);
			}
		}

		if (config.position && lerp.position) {
			var lerpPosition = lerp.position;

			if (lerpPosition.progress !== undefined && lerpPosition.progress < 1) {
				lerpPosition.elapsedTime = THREE.Math.clamp(lerpPosition.elapsedTime + deltaTime, 0, lerp.duration);
				lerpPosition.progress = THREE.Math.clamp(lerpPosition.elapsedTime / lerp.duration, 0, 1);

				object3d.position.lerpVectors(lerpPosition.src, lerpPosition.dest, lerpPosition.progress);
			}
		}

		if (config.scale && lerp.scale) {
			var lerpScale = lerp.scale;

			if (lerpScale.progress !== undefined && lerpScale.progress < 1) {
				lerpScale.elapsedTime = THREE.Math.clamp(lerpScale.elapsedTime + deltaTime, 0, lerp.duration);
				lerpScale.progress = THREE.Math.clamp(lerpScale.elapsedTime / lerp.duration, 0, 1);

				object3d.scale.lerpVectors(lerpScale.src, lerpScale.dest, lerpScale.progress);
			}
		}
	}

	/**
	 * Take ownership of this object. The client that instantiates an object owns it,
	 * afterwards changes in ownership must be managed by the app. Manual modifications
	 * to the Firebase ref's will not obey ownership status.
	 * @instance
	 * @method takeOwnership
	 * @memberof module:altspace/utilities/behaviors.Object3DSync
	 */
	function takeOwnership() {
		ownerRef.set(sceneSync.clientId);
	}

	var exports = { awake: awake, update: update, type: 'Object3DSync', link: link, autoSend: send, takeOwnership: takeOwnership };

	/**
	 * Firebase reference for the 'data' child location, can be used to store data related to
	 * this object.
	 * @readonly
	 * @instance
	 * @member {Firebase} dataRef
	 * @memberof module:altspace/utilities/behaviors.Object3DSync
	 */
	Object.defineProperty(exports, 'dataRef', {
		get: function () {
			return dataRef;
		}
	});

	/**
	 * True if this object is currently owned by this client, false otherwise.
	 * @readonly
	 * @instance
	 * @member {boolean} isMine
	 * @memberof module:altspace/utilities/behaviors.Object3DSync
	 */
	Object.defineProperty(exports, 'isMine', {
		get: function () {
			return isMine;
		}
	});

	return exports;
};

//manual modifications to the ref's will not obey ownership status.
