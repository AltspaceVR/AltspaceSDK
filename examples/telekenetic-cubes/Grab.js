window.telekenetic = window.telekenetic || {};

telekenetic.Grab = function (config) {
    config = config || {};

    var object3d;
    var scene;
    var centerEye;
    var sync;

    if (config.defaultDistance === undefined) config.defaultDistance = 200;

    function awake(o, s) {
        object3d = o;
        scene = s;
        sync = object3d.getBehaviorByType('Object3DSync');

        altspace.getThreeJSTrackingSkeleton().then(function(skeleton) {
            scene.add(skeleton); //if it is already in the scene, this shouldn't do anything
            centerEye = skeleton.getJoint('Eye');

            object3d.addEventListener('cursordown', grab);
            scene.addEventListener('cursorup', release);
        });

    }

    function grab() {
        THREE.SceneUtils.attach(object3d, scene, centerEye);
        object3d.rotation.set(0, 0, 0);
        object3d.dispatchEvent({ type: 'grabbed' });
    }

    function release() {
        THREE.SceneUtils.detach(object3d, object3d.parent, scene);
        object3d.dispatchEvent({ type: 'released' });
    }

    function update(deltaTime) {
        if (object3d.parent == centerEye && sync) sync.enqueueSend();
    }

    function start() {
    }

    return { awake: awake, start: start, update: update};
};
