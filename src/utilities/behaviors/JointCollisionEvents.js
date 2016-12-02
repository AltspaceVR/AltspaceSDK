/**
 * @module altspace/utilities/behaviors
 */
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The JointCollisionEvents behavior dispatches a 'jointcollision' event if
 * joints collide with an object
 *
 * @class JointCollisionEvents
 * @param {String} [config.joints] Array of body part names [bodyPart, side, subIndex] of joints to track.<br>
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
 * @param {Number} [config.jointCubeSize=15] Size of dummy cube used to track each joint
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

		// Get the tracking skeleton and the enclosure
		initSkeleton(s).then(function(_skeleton) {
			// Attach skeleton
			skeleton = _skeleton;

			jointCube = new THREE.Vector3(
				config.jointCubeSize,
				config.jointCubeSize,
				config.jointCubeSize
			);
		}).catch(function (err) {
			console.log('Failed to get Altspace browser properties', err);
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
		var jointIntersectUnion;
		var collidedJoints = [];
		var hasPrevCollided = hasCollided;
		hasCollided = false;
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

		// Dispatch collision event
		if(!hasPrevCollided && hasCollided) {
			var event = new CustomEvent(
				'jointcollisionenter',
				{
					detail: {
						intersect: jointIntersectUnion,
						joints: collidedJoints
					},
					bubbles: true,
					cancelable: true
				}
			);
			object3d.dispatchEvent(event);
		}
		else if(hasPrevCollided && !hasCollided) {
			var event = new CustomEvent(
				'jointcollisionleave',
				{
					bubbles: true,
					cancelable: true
				}
			);
			object3d.dispatchEvent(event);
		}

		// Dispatch collision event
		if(hasCollided) {
			var event = new CustomEvent(
				'jointcollision',
				{
					detail: {
						intersect: jointIntersectUnion,
						joints: collidedJoints
					},
					bubbles: true,
					cancelable: true
				}
			);
			object3d.dispatchEvent(event);
		}
	}

	return { awake: awake, update: update, type: 'JointCollisionEvents' };
};
