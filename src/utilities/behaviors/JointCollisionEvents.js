'use strict';

import Behavior from './Behavior';

/**
* An array in the form of `[bodyPart, side, subIndex]` identifying a joint in the tracking skeleton.
* E.g. `['Index', 'Left', 0]` identifies the first joint on the index finger of the left hand.
* See [TrackingSkeleton#getJoint]{@link module:altspace~TrackingSkeleton#getJoint} for available
* joint names.
* @typedef {Array.<String, String, Number>} module:altspace/utilities/behaviors.JointCollisionEvents~JointId
**/

// helper function to guarantee skeleton presence, and fetch if available
function initSkeleton(scene) {
	return new Promise((resolve, reject) => {
		let skel = null;

		// Attempt to use existing skeleton when available
		scene.traverse(child => {
			if(child.type === 'TrackingSkeleton') {
				skel = child;
				return;
			}
		});

		if(skel)
			return resolve(skel);

		// Skeleton has not been assigned to scene yet
		altspace.getThreeJSTrackingSkeleton().then(function(trackingSkeleton) {
			skel = trackingSkeleton;
			scene.add(skel);
			return resolve(skel);
		});
	});
}

/**
* The JointCollisionEvents behavior dispatches collision events which have been triggered by
* [TrackingJoints]{@link module:altspace~TrackingJoint} intersecting with the object that has this behavior.
*
* @param {Object} [config] Optional parameters.
* @param {Array.<JointId>} [config.joints=HAND_JOINTS] Array of
* [JointIds]{@link module:altspace/utilities/behaviors.JointCollisionEvents~JointId} to track.
* @param {Number} [config.jointCubeSize=15] Size of dummy cube used to track each joint.
* For optimal results, it is recommended that the value
* provided is scaled according to your enclosure scaling factor.
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
*/
class JointCollisionEvents extends Behavior
{
	get type(){ return 'JointCollisionEvents'; }

	constructor(config)
	{
		super();
		this.config = Object.assign(
			{jointCubeSize: 15, joints: JointCollisionEvents.HAND_JOINTS},
			config
		);

		this.object3d = null;
		this.skeleton = null;
		this.jointCube = null;
		this.hasCollided = false;
		this.collidedJoints = [];
		this.jointIntersectUnion = null;
	}

	awake(o, s) {
		this.object3d = o;
		let self = this;
		// Get the tracking skeleton
		initSkeleton(s).then(_skeleton => {
			// Attach skeleton
			self.skeleton = _skeleton;

			self.jointCube = new THREE.Vector3(
				self.config.jointCubeSize,
				self.config.jointCubeSize,
				self.config.jointCubeSize
			);
		}).catch(err => {
			console.log('Failed to get tracking skeleton', err);
		});
	}

	update(deltaTime)
	{
		if(!this.skeleton)
			return;

		// Collect joints based on joints config option
		let joints = [];
		for(let i = 0; i < this.config.joints.length; i++) {
			joints[i] = this.skeleton.getJoint(
				this.config.joints[i][0],
				this.config.joints[i][1],
				this.config.joints[i][2] || 0
			);
		}

		// Get bounding box of owner object
		let objectBB = new THREE.Box3().setFromObject(this.object3d);

		// Add up all colliding joint intersects
		let prevJointIntersectUnion = this.jointIntersectUnion;
		this.jointIntersectUnion = null;

		let prevCollidedJoints = this.collidedJoints;
		this.collidedJoints = [];

		let hasPrevCollided = this.hasCollided;
		this.hasCollided = false;

		if(
			this.object3d.visible &&
			this.object3d.scale.x > Number.EPSILON &&
			this.object3d.scale.y > Number.EPSILON &&
			this.object3d.scale.z > Number.EPSILON
		) {
			for(let i = 0; i < this.config.joints.length; i++)
			{
				let joint = joints[i];
				if(joint && joint.confidence !== 0) {
					let jointBB = new THREE.Box3().setFromCenterAndSize(joint.position, this.jointCube);
					let collision = objectBB.intersectsBox(jointBB);

					if(collision) {
						let intersectBB = objectBB.intersect(jointBB);
						if(this.jointIntersectUnion) {
							this.jointIntersectUnion.union(intersectBB);
						} else {
							this.jointIntersectUnion = intersectBB;
						}
						this.hasCollided = true;
						this.collidedJoints.push(joint);
					}
				}
			}
		}

		// Dispatch collision event
		if(!hasPrevCollided && this.hasCollided)
		{
			this.object3d.dispatchEvent(new EnterEvent(
				this.jointIntersectUnion,
				this.collidedJoints,
				this.object3d
			));
		}
		else if(hasPrevCollided && !this.hasCollided)
		{
			this.object3d.dispatchEvent(new LeaveEvent(
				this.prevJointIntersectUnion || new THREE.Box3(),
				this.prevCollidedJoints,
				this.object3d
			));
		}

		// Dispatch collision event
		if(this.hasCollided)
		{
			this.object3d.dispatchEvent(new CollisionEvent(
				this.jointIntersectUnion,
				this.collidedJoints,
				this.object3d
			));
		}
	}
}

class JointCollisionEvent {
	constructor(type, union, joints, target)
	{
		this.type = type;
		this.detail = {
			intersect: union,
			joints: joints
		};
		this.bubbles = true;
		this.target = target;
	}
}

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
class EnterEvent extends JointCollisionEvent {
	constructor(...args){
		super('jointcollisionenter', ...args);
	}
}

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
class LeaveEvent extends JointCollisionEvent {
	constructor(...args){
		super('jointcollisionleave', ...args);
	}
}

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
class CollisionEvent extends JointCollisionEvent {
	constructor(...args){
		super('jointcollision', ...args);
	}
}

/**
* An array of JointIds describing the tip of every finger on both hands.
* @constant {Array.<JointId>} HAND_JOINTS
* @memberof module:altspace/utilities/behaviors.JointCollisionEvents
*/
JointCollisionEvents.HAND_JOINTS = [
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
	['Pinky', 'Right', 3]
];

export default JointCollisionEvents;
