/**
* Represents a joint on a user's skeleton. TrackingJoint should
* not be instantiated directly, instead it should be retrieved
* via [TrackingSkeleton.getJoint]{@link module:altspace~TrackingSkeleton#getJoint}.
* @class module:altspace~TrackingJoint
* @memberof module:altspace
* @extends {THREE.Object3D}
*/

/**
* A number from 0 to 3 indicating the confidence of the tracking.
* Values can be either `0` (no confidence/tracking), `2` (low confidence
* Leap Motion), or `3` (high confidence Leap Motion, or tracked controllers).
* @instance
* @member {Number} confidence
* @memberof module:altspace~TrackingJoint
*/

/**
* The name of the joint comprised of its side, body part,
* and index. E.g. 'LeftPinky0'.
* @instance
* @member {String} name
* @memberof module:altspace~TrackingJoint
*/

/**
* Represents a user's body. TrackingSkeleton should not
* be instantiated directly, instead it should be retrieved via
* [altspace.getThreeJSTrackingSkeleton]{@link module:altspace.getThreeJSTrackingSkeleton}.
* @class module:altspace~TrackingSkeleton
* @memberof module:altspace
* @extends {THREE.Object3D}
*/

/**
* A dictionary of tracking joints by joint name.
* @instance
* @member {Object<String, module:altspace~TrackingJoint>} trackingJoints
* @memberof module:altspace~TrackingSkeleton
*/

/**
* Gets a joint on the skeleton.
* @instance
* @method getJoint
* @param {String} bodyPart One of 'Eye, 'Head', 'Neck',
*	'Spine', 'Hips', 'UpperLeg', 'LowerLeg', 'Foot', 'Toes',
*	'Shoulder', 'UpperArm', 'LowerArm', 'Hand', 'Thumb',
*	'Index', 'Middle', 'Ring' or 'Pinky'.
* @param {String} [side='Center'] One of 'Left', 'Center' or
*	'Right'.
* @param {Number} [subIndex=0] The index of a specific part of
*	the join.
* @return {module:altspace~TrackingJoint}
* @memberof module:altspace~TrackingSkeleton
*/

/**
* Get the tracking skeleton representing the body of the current
* user. The resulting promise resolves to a
* [TrackingSkeleton]{@link module:altspace~TrackingSkeleton}
* object.
* @method getThreeJSTrackingSkeleton
* @returns {Promise}
* @memberof module:altspace
*/
