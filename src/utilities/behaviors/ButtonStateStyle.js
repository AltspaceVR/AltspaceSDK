window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * A behavior that changes the color of an object when the cursor interacts with it.
 * @class ButtonStateStyle
 * @param {Object} [config] Optional parameters.
 * @param {THREE.Color} [config.originalColor] Base material color.
 * @param {Number} [config.overBrightness=1.5] Material brightness when cursor
 *	is over button.
 * @param {Number} [config.downBrightness=0.5] Material brightness when cursor
 *	is clicked.
 * @memberof module:altspace/utilities/behaviors
 */
altspace.utilities.behaviors.ButtonStateStyle = function (config) {
	var object3d;
	var scene;
	var originalColor;
	var modifiedColor = new THREE.Color();

	config = config || {};
	var overBrightness = config.overBrightness || 1.5;
	var downBrightness = config.downBrightness || 0.5;

	function changeBrightness(brightness) {
		modifiedColor.set(originalColor);
		modifiedColor.multiplyScalar(brightness);
		modifiedColor.r = THREE.Math.clamp(modifiedColor.r, 0, 1);
		modifiedColor.g = THREE.Math.clamp(modifiedColor.g, 0, 1);
		modifiedColor.b = THREE.Math.clamp(modifiedColor.b, 0, 1);
		object3d.material.color = modifiedColor;
	}

	function cursorLeave() {
		object3d.removeEventListener('cursorleave', cursorLeave);
		changeBrightness(1.0);
	}

	function cursorEnter() {
		changeBrightness(overBrightness);
		object3d.addEventListener('cursorleave', cursorLeave);
	}

	function cursorUp(event) {
		scene.removeEventListener('cursorup', cursorUp);
		object3d.addEventListener('cursorenter', cursorEnter);
		if (event.target === object3d) {
			changeBrightness(overBrightness);
			object3d.addEventListener('cursorleave', cursorLeave);
		} else {
			changeBrightness(1.0);
		}
	}
	function cursorDown() {
		scene.addEventListener('cursorup', cursorUp);
		object3d.removeEventListener('cursorleave', cursorLeave);
		object3d.removeEventListener('cursorenter', cursorEnter);
		changeBrightness(downBrightness);
	}

	function awake(o, s) {
		object3d = o;
		scene = s;
		originalColor = config.originalColor || object3d.material.color;
		object3d.addEventListener('cursorenter', cursorEnter);
		object3d.addEventListener('cursordown', cursorDown);
	}

	function dispose() {
		object3d.removeEventListener('cursorenter', cursorEnter);
		object3d.removeEventListener('cursorleave', cursorLeave);
		object3d.removeEventListener('cursorup', cursorUp);
		object3d.removeEventListener('cursordown', cursorDown);
	}

	return { awake: awake, dispose: dispose, type: 'ButtonStateStyle' };
};
