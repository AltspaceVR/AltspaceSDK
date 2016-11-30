/**
 * @module altspace/utilities/behaviors
 */
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The TrackJoints behavior dispatches a 'jointcolliding' event if
 * joints collide with an object
 *
 * @class JointCollisionEvents
 * @param {String} [config.joints=[['Thumb', 'Left', 3],['Index', 'Left', 3],['Middle', 'Left', 3],['Ring', 'Left', 3],['Pinky', 'Left', 3],['Thumb', 'Right', 3],['Index', 'Right', 3],['Middle', 'Right', 3],['Ring', 'Right', 3],['Pinky', 'Right', 3],['Hand', 'Left', 0]['Hand', 'Right', 0]]] Body part names [bodyPart, side, subIndex] of joints to track
 * @param {Number} [config.jointCubeSize=15] Size of dummy cube used to track each joint
 * @memberof module:altspace/utilities/behaviors
 **/
 // TODO: Add scale option?
altspace.utilities.behaviors.JointCollisionEvents = function (config) {
	var object3d;

	config = config || {};

	if (config.jointCubeSize === undefined) config.jointCubeSize = 15;
	if (config.joints === undefined) config.joints = [
		['Thumb', 'Left', 3],
		['Index', 'Left', 3],
		['Middle', 'Left', 3],
		['Ring', 'Left', 3],
		['Pinky', 'Left', 3],
		['Thumb', 'Right', 3],
		['Index', 'Right', 3],
		['Middle', 'Right', 3],
		['Ring', 'Right', 3],
		['Pinky', 'Right', 3],
		['Hand', 'Left', 0],
		['Hand', 'Right', 0]
	];

	var skeleton;
	var jointCube;

	// Get the tracking skeleton and the enclosure
	var promises = [altspace.getThreeJSTrackingSkeleton(), altspace.getEnclosure()];
	Promise.all(promises).then(function (array) {
		// Attach skeleton
		skeleton = array[0];
		sim.scene.add(skeleton);
		enclosure = array[1]; // TODO: Use enclosure for scale?
	}).catch(function (err) {
		console.log('Failed to get Altspace browser properties', err);
	});

	function awake(o) {
		object3d = o;
		// TODO: Scale jointCubeSize?
		jointCube = new THREE.Vector3(
			config.jointCubeSize,
			config.jointCubeSize,
			config.jointCubeSize
		);
	}

	function update(deltaTime) {
		if(!skeleton) { return; }

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
		var hasCollided = false;
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
				}
			}
		}

		// Dispatch collision event
		if(hasCollided) {
			var event = new CustomEvent(
				'jointcollision', 
				{
					detail: {
						intersect: jointIntersectUnion
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