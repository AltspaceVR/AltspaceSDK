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
 * @class TrackJoints
 * @param {Object} [config]
 * @param // TODO: Add jointCube size option
 * @param // TODO: Add joint selection an option
 * @param // TODO: Add scale option?
 * @memberof module:altspace/utilities/behaviors
 **/
altspace.utilities.behaviors.TrackJoints = function (config) {
	var object3d;

	config = config || {};

	if (config.jointCubeSize === undefined) config.jointCubeSize = 15;
	//if (config.jointSelection === undefined) config.jointSelection = ###;
	//if (config.scale === undefined) config.scale = ???;

	var skeleton;
	var jointCube;
	var jointCubeSize = config.jointCubeSize;

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
		jointCube = new THREE.Vector3(jointCubeSize, jointCubeSize, jointCubeSize);
	}

	function update(deltaTime) {
		if(!skeleton) { return; }

		// Collect joints
		// TODO: Make jointSelection an option
		var joints = [];
		joints[0] = skeleton.getJoint('Pinky',  'Left', 3);
		joints[1] = skeleton.getJoint('Ring', 'Left', 3);
		joints[2] = skeleton.getJoint('Middle', 'Left', 3);
		joints[3] = skeleton.getJoint('Index',  'Left', 3);
		joints[4] = skeleton.getJoint('Thumb',  'Left', 3);
		joints[5] = skeleton.getJoint('Thumb',  'Right', 3);
		joints[6] = skeleton.getJoint('Index',  'Right', 3);
		joints[7] = skeleton.getJoint('Middle', 'Right', 3);
		joints[8] = skeleton.getJoint('Ring', 'Right', 3);
		joints[9] = skeleton.getJoint('Pinky',  'Right', 3);
		joints[10] = skeleton.getJoint('Hand', 'Left');
		joints[11] = skeleton.getJoint('Hand', 'Right');

		// TODO: Get object3d's current rotation?
		var objectBB = new THREE.Box3().setFromObject(object3d);
    
		// Add up all colliding joint intersects
		var jointIntersectUnion;
		var hasCollided = false;
		for(var i = 0; i < 12; i++) { // TODO: Use jointSelection quantity
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
				'jointcolliding', 
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

	return { awake: awake, update: update, type: 'TrackJoints' };
};