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

    function awake(o) {
        object3d = o;
    }

    function update(deltaTime) {
        var nowInt = Math.floor(performance.now());

        if (config.shouldMove) {
            object3d.position.y = Math.sin(nowInt / 800) * 3;
            object3d.position.x = Math.sin(nowInt / 500) * 5;
        }

        if (config.shouldRotate) {
            object3d.rotation.x = Math.sin(nowInt / 500) / 15;
        }
    }

    return { awake: awake, update: update };
};
