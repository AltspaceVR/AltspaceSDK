window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

altspace.utilities.behaviors.TouchpadRotate = function (config) {
	config = config || {};

	var object3d;
	var scene;

	var startingRotation;

	var activelyRotating = false;

	function awake(o, s) {
		object3d = o;
		scene = s;

		altspace.addEventListener('touchpadup', onTouchpadUp);
		altspace.addEventListener('touchpaddown', onTouchpadDown);
		altspace.addEventListener('touchpadmove', onTouchpadMove);
	}

	function onTouchpadUp(event) {
		activelyRotating = false;
	}

	function onTouchpadDown(event) {
		activelyRotating = true;
		startingRotation = object3d.rotation.clone();
	}

	var lastDisplacementX = 0;

	var runningCount = 5;
	var runningAverageVelocityX = 0;

	function onTouchpadMove(event) {
		var deltaX = event.displacementX - lastDisplacementX;
		object3d.rotation.set(startingRotation.x, startingRotation.y + event.displacementX / 300, startingRotation.z);

		runningAverageVelocityX = ((runningAverageVelocityX * runningCount) + deltaX / 300) / (runningCount + 1);
		lastDisplacementX = event.displacementX;
	}

	function update(deltaTime) {
		if (!activelyRotating && Math.abs(runningAverageVelocityX) > 0.01) {
			object3d.rotation.y += runningAverageVelocityX;
			runningAverageVelocityX *= 0.97;
		}
	}

	function start() {
	}

	return { awake: awake, start: start, update: update, type: 'TouchpadRotate' };
};
