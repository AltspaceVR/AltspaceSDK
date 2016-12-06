/**
 * @module altspace/utilities/behaviors
 */
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * An array in the form of `[bodyPart, side, subIndex]` identifying a joint in the tracking skeleton.
 * E.g. `['Index', 'Left', 0]` identifies the first joint on the index finger of the left hand.
 * See [TrackingSkeleton#getJoint]{@link module:altspace~TrackingSkeleton#getJoint} for available
 * joint names.
 * @typedef {Array.<String, String, Number>} module:altspace/utilities/behaviors.JointCollisionEvents~JointId
 **/

/**
 * The JointCollisionEvents behavior dispatches collision events which have been triggered by
 * [TrackingJoints]{@link module:altspace~TrackingJoint} intersecting with the object that has this behavior.
 *
 * @class JointCollisionEvents
 * @param {Object} [config] Optional parameters.
 * @param {Array.<JointId>} [config.joints] Array of
 * [JointIds]{@link module:altspace/utilities/behaviors.JointCollisionEvents~JointId} to track.<br>
 * Defaults to:
 *
 *     [
 *         ['Hand', 'Left', 0],
 *         ['Thumb', 'Left', 3],
 *         ['Index', 'Left', 3],
 *         ['Middle', 'Left', 3],
 *         ['Ring', 'Left', 3],
 *         ['Pinky', 'Left', 3],
 *
 *         ['Hand', 'Right', 0],
 *         ['Thumb', 'Right', 3],
 *         ['Index', 'Right', 3],
 *         ['Middle', 'Right', 3],
 *         ['Ring', 'Right', 3],
 *         ['Pinky', 'Right', 3],
 *     ]
 * @param {Number} [config.jointCubeSize=15] Size of dummy cube used to track each joint.
 * For optimal results, it is recommended that the value
 * provided is scaled according to your enclosure scaling factor.
 * @memberof module:altspace/utilities/behaviors
 **/
altspace.utilities.behaviors.JointCollisionEvents = function(_config) {
	var object3d;
	var config = _config || {};

	config.jointCubeSize = config.jointCubeSize || 15;
	config.joints = config.joints || [
		['Hand', 'Left', 0],
		['Thumb', 'Left', 3],
		['Index', 'Left', 3],
		['Middle', 'Left', 3],
		['Ring', 'Left', 3],
		['Pinky', 'Left', 3],

		['Hand', 'Right', 0],
		['Thumb', 'Right', 3],
		['Index', 'Right', 3],
		['Middle', 'Right', 3],
		['Ring', 'Right', 3],
		['Pinky', 'Right', 3],
	];

	var skeleton;
	var jointCube;
	var hasCollided = false;
	var collidedJoints = [];
	var jointIntersectUnion = null;

	function initSkeleton(scene) {
		return new Promise(function(resolve, reject) {
			var skel = null;

			// Attempt to use existing skeleton when available
			scene.traverse(function(child) {
				if(child.type === 'TrackingSkeleton') {
					skel = child;
					return;
				}
			});

			if(skel) return resolve(skel);

			// Skeleton has not been assigned to scene yet
			altspace.getThreeJSTrackingSkeleton().then(function(trackingSkeleton) {
				skel = trackingSkeleton;
				scene.add(skel);
				return resolve(skel);
			});
		});
	}

	function awake(o, s) {
		object3d = o;

		// Get the tracking skeleton
		initSkeleton(s).then(function(_skeleton) {
			// Attach skeleton
			skeleton = _skeleton;

			jointCube = new THREE.Vector3(
				config.jointCubeSize,
				config.jointCubeSize,
				config.jointCubeSize
			);
		}).catch(function (err) {
			console.log('Failed to get tracking skeleton', err);
		});
	}

	function update(deltaTime) {
		if(!skeleton) return;

		// Collect joints based on joints config option
		var joints = [];
		for(var i = 0; i < config.joints.length; i++) {
			joints[i] = skeleton.getJoint(
				config.joints[i][0],
				config.joints[i][1],
				config.joints[i][2] ? config.joints[i][2] : 0
			);
		}

		// Get bounding box of owner object
		var objectBB = new THREE.Box3().setFromObject(object3d);

		// Add up all colliding joint intersects
		var prevJointIntersectUnion = jointIntersectUnion;
		jointIntersectUnion = null;

		var prevCollidedJoints = collidedJoints;
		collidedJoints = [];

		var hasPrevCollided = hasCollided;
		hasCollided = false;

		if(
			object3d.visible &&
			object3d.scale.x > Number.EPSILON &&
			object3d.scale.y > Number.EPSILON &&
			object3d.scale.z > Number.EPSILON
		) {
			for(var i = 0; i < config.joints.length; i++) {
				var joint = joints[i];
				if(joint && joint.confidence !== 0) {
					var jointBB = new THREE.Box3().setFromCenterAndSize(joint.position, jointCube);
					var collision = objectBB.intersectsBox(jointBB);
					if(collision) {
						var intersectBB = objectBB.intersect(jointBB);
						if(jointIntersectUnion) {
							jointIntersectUnion.union(intersectBB);
						} else {
							jointIntersectUnion = intersectBB;
						}

						hasCollided = true;
						collidedJoints.push(joint);
					}
				}
			}
		}

		// Dispatch collision event
		if(!hasPrevCollided && hasCollided) {
			/**
			* Fires a single event when any specified joints initially collide with the object.
			*
			* @event jointcollisionenter
			* @property {Object} detail Event details
			* @property {THREE.Box3} detail.intersect - A union of all joint bounding boxes which intersected with object.
			* @property {module:altspace~TrackingJoint[]} detail.joints - An array of joints which which were involved in the intersection union.
			* @property {THREE.Object3D} target - The object which was intersected.
			* @memberof module:altspace/utilities/behaviors.JointCollisionEvents
			*/
			object3d.dispatchEvent({
				type: 'jointcollisionenter',
				detail: {
					intersect: jointIntersectUnion,
					joints: collidedJoints
				},
				bubbles: true,
				target: object3d
			});
		}
		else if(hasPrevCollided && !hasCollided) {
			/**
			* Fires a single event when all joints are no longer colliding with the object.
			*
			* @event jointcollisionleave
			* @property {Object} detail Event details
			* @property {THREE.Box3} detail.intersect - A union of all joint bounding boxes which last intersected with the object.
			* @property {module:altspace~TrackingJoint[]} detail.joints - An array of joints which which were involved in the intersection union.
			* @property {THREE.Object3D} target - The object which was intersected.
			* @memberof module:altspace/utilities/behaviors.JointCollisionEvents
			*/
			object3d.dispatchEvent({
				type: 'jointcollisionleave',
				detail: {
					intersect: prevJointIntersectUnion || new THREE.Box3(),
					joints: prevCollidedJoints
				},
				bubbles: true,
				target: object3d
			});
		}

		// Dispatch collision event
		if(hasCollided) {
			/**
			* Fires a continuous event while any joints are colliding with the object.
			*
			* @event jointcollision
			* @property {Object} detail Event details
			* @property {THREE.Box3} detail.intersect - A union of all joint bounding boxes which intersected with the object.
			* @property {module:altspace~TrackingJoint[]} detail.joints - An array of joints which which were involved in the intersection union.
			* @property {THREE.Object3D} target - The object which was intersected.
			* @memberof module:altspace/utilities/behaviors.JointCollisionEvents
			*/
			object3d.dispatchEvent({
				type: 'jointcollision',
				detail: {
					intersect: jointIntersectUnion,
					joints: collidedJoints
				},
				bubbles: true,
				target: object3d
			});
		}
	}

	return { awake: awake, update: update, type: 'JointCollisionEvents' };
};
