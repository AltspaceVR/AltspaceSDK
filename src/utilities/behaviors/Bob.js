/**
 * @module altspace/utilities/behaviors
 */
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The Bob behavior adds a bobbing animation to an object
 *
 * @class Bob
 * @param {Object} [config]
 * @param {Boolean} [config.shouldRotate=true] Whether the animation should include
 *  rotation.
 * @param {Boolean} [config.shouldMove=true] Whether the animation should
 *  include movement.
 * @memberof module:altspace/utilities/behaviors
 **/
altspace.utilities.behaviors.Bob = function (config) {
    var object3d;

    config = config || {};

    if (config.shouldRotate === undefined) config.shouldRotate = true;
    if (config.shouldMove === undefined) config.shouldMove = true;

    var offsetPosition;
    var lastBobPosition = new THREE.Vector3();
    //TODO: Rotation

    var nowOffset = Math.random() * 10000;

    function awake(o) {
        object3d = o;
        offsetPosition = object3d.position.clone();
    }

    function update(deltaTime) {
        var nowInt = Math.floor(performance.now()) + nowOffset;

        if (config.shouldMove) {
            if (!lastBobPosition.equals(object3d.position)) offsetPosition.copy(object3d.position);

            object3d.position.y = offsetPosition.y + Math.sin(nowInt / 800) * 3;
            object3d.position.x = offsetPosition.x + Math.sin(nowInt / 500) * 5;
            lastBobPosition.copy(object3d.position);
        }

        if (config.shouldRotate) {
            object3d.rotation.x = Math.sin(nowInt / 500) / 15;
        }
    }

    return { awake: awake, update: update };
};
