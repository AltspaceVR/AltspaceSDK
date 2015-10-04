window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

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

    return { awake: awake, update: update };
};