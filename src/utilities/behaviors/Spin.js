window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The Spin behavior adds a spinning animation to an object.
 *
 * @class Spin
 * @param {Object} [config]
 * @param {Number} [config.speed=0.0001] Rotation speed in radians per
 *  millisecond
 * @memberof module:altspace/utilities/behaviors
 **/
altspace.utilities.behaviors.Spin = function (config) {

	config = config || {};

	if (config.speed === undefined) config.speed = 0.0001;

	var object3d;

	function awake(o) {
		object3d = o;
	}

	function update(deltaTime) {
		object3d.rotation.y += config.speed * deltaTime;
	}

	return { awake: awake, update: update, type: 'Spin' };
};
