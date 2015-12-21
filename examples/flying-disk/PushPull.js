window.telekenetic = window.telekenetic || {};

telekenetic.PushPull = function (config) {
    config = config || {};

    var object3d;
    var scene;
    var sync;

    if (config.minDistance === undefined) config.minDistance = 100;
    if (config.maxDistance === undefined) config.maxDistance = 800;

    (function () { Math.clamp = function (a, b, c) { return Math.max(b, Math.min(c, a)); } })();

    function awake(o, s) {
        object3d = o;
        scene = s;
        sync = object3d.getBehaviorByType('Object3DSync');

        object3d.addEventListener('grabbed', onGrabbed);
        object3d.addEventListener('released', onReleased);

        altspace.addEventListener('touchpadup', function() {
            lastDisplacementX = 0;
        });
    }

    function onGrabbed() {
        altspace.addEventListener('touchpadmove', pushPull);
    }

    function onReleased() {
        altspace.removeEventListener('touchpadmove', pushPull);
    }

    var lastDisplacementX = 0;
    function pushPull(event) {
        var deltaX = event.displacementX - lastDisplacementX;
        object3d.position.z -= deltaX;
        if (sync) sync.enqueueSend();
        lastDisplacementX = event.displacementX;
    }

    function update(deltaTime) {

    }

    function start() {
    }

    return { awake: awake, start: start, update: update};
};
