window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

//TODO: grab and release callback
altspace.utilities.behaviors.Grab = function (config) {
    config = config || {};

    var object3d;
    var scene;
    var centerEye;

    if (config.defaultDistance === undefined) config.defaultDistance = 100;

    function awake(o, s) {
        object3d = o;
        scene = s;

        altspace.getThreeJSTrackingSkeleton().then(function(skeleton) {
            scene.add(skeleton); //if it is already in the scene, this shouldn't do anything
            centerEye = skeleton.getJoint('Eye');

            object3d.addEventListener('cursorup', grab);
        });

    }

    function grab() {
        centerEye.add(object3d);
        object3d.position.x = 0;
        object3d.position.y = 0;
        object3d.position.set(0, 0, config.defaultDistance);
    }

    function release() {
        scene.add(object3d);
        //TODO: change position
    }

    function update(deltaTime) {

    }

    function start() {
    }

    return { awake: awake, start: start, update: update};
};
