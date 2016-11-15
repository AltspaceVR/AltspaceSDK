//Change scale of an object when cursor hovers over it.
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * Changes the scale of an object when the cursor hovers over it, and restores the original scale when the cursor is no longer hovering over the object.
 * @class HoverScale
 * @param {Object} [config] Optional parameters.
 * @param {Number} [config.scale=1.15] A scaling factor that will be applied to the object's initial scale when the cursor hovers over it.
 * @param {Number} [config.duration=75] Duration the scaling effect is intended to take to complete, in milliseconds.
 * @param {Boolean} [config.revertOnDispose=true] Specifies whether the object's original scale should be restored when the behavior has been destroyed.
 * @memberof module:altspace/utilities/behaviors
 */
altspace.utilities.behaviors.HoverScale = function(config) {
    config = config || {};
    var scale = config.scale || 1.15;
    var duration = config.duration || 75; // Milliseconds
    var revertOnDispose = ((config.revertOnDispose !== undefined) ? config.revertOnDispose : true);

    var object3d;
    var originalScale;
    var elapsedTime;
    var progress;
    var srcScale;
    var destScale;

    function awake(o, s) {
        object3d = o;
        originalScale = object3d.scale.clone();

        srcScale = object3d.scale.clone();
        srcScale.multiplyScalar(scale);

        destScale = new THREE.Vector3();
        destScale.copy(originalScale);

        progress = 1;
        elapsedTime = duration;

        object3d.addEventListener('cursorenter', onHoverStateChange);
        object3d.addEventListener('cursorleave', onHoverStateChange);
    }

    function update(deltaTime) {
        if(progress < 1) {
            elapsedTime += deltaTime;
            elapsedTime = THREE.Math.clamp(elapsedTime, 0, duration);

            progress = THREE.Math.clamp(elapsedTime / duration, 0, 1);
            object3d.scale.lerpVectors(srcScale, destScale, progress);
        }
    }

    function dispose() {
        object3d.removeEventListener('cursorenter', onHoverStateChange);
        object3d.removeEventListener('cursorleave', onHoverStateChange);

        // Restore Original Object Scale Before Behavior Was Applied
        if(revertOnDispose) object3d.scale.copy(originalScale);

        originalScale = null;
        srcScale = null;
        destScale = null;
        object3d = null;
    }

    function onHoverStateChange() {
        var temp = srcScale;
        srcScale = destScale;
        destScale = temp;

        progress = 1 - progress;
        elapsedTime = duration - elapsedTime;
    }

    return { awake: awake, update: update, dispose: dispose, type: 'HoverScale' };
};
