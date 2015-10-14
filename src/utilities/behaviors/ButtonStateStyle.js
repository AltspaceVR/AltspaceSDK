window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * A behavior that changes the color of an object when the cursor interacts with it.
 * @class altspace/utilities/behaviors.ButtonStateStyle
 * @param {Object} [config] Optional parameters.
 * @param {THREE.Color} [config.originalColor] Base material color.
 * @param {Number} [config.overBrightness=1.5] Material brightness when cursor
 *	is over button.
 * @param {Number} [config.downBrightness=0.5] Material brightness when cursor
 *	is clicked.
 */
altspace.utilities.behaviors.ButtonStateStyle = function (config) {
    var object3d;
    var scene;
    var originalColor;

    var config = config || {};
    var overBrightness = config.overBrightness || 1.5;
    var downBrightness = config.downBrightness || 0.5;

    function cursorEnter(event) {
        object3d.material.color = originalColor.clone().multiplyScalar(overBrightness);
    }
    function cursorLeave(event) {
        object3d.material.color = originalColor;//TODO: not while down
    }
    function cursorUp(event) {
        object3d.material.color = originalColor.clone().multiplyScalar(overBrightness);
    }
    function cursorDown(event) {
        object3d.material.color = originalColor.clone().multiplyScalar(downBrightness);
    }

    function awake(o) {
        object3d = o;
        originalColor = config.originalColor || object3d.material.color;
        object3d.addEventListener('cursorenter', cursorEnter);
        object3d.addEventListener('cursorleave', cursorLeave);
        object3d.addEventListener('cursorup', cursorUp);//TODO: also have a listener for scene
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
