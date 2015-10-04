window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

window.altspace.utilities.behaviors.SceneSync = function (instanceBase, config) {
    var sceneBase = instanceBase.child('scene');
    var factories = config.factories || {};

    var syncBehaviors = [];
    var localSyncedObjects = [];

    var skipNextAdd = false;

    instanceBase.child('initialized').once('value', function (snapshot) {
        var shouldInitialize = !snapshot.val();
        snapshot.ref().set(true);
        if (config.ready) {
            config.ready(shouldInitialize);
        }
    });

    sceneBase.on('child_added', function (snapshot) {
        var data = snapshot.val();
        var key = snapshot.key();

        if (skipNextAdd) {//Workaround for firebase immediatly calling this function on local add
            skipNextAdd = false;
            return;
        }
        console.log('child_added key: ' + key);

        var factory = factories[data.template];//TODO: reevaluate template name

        if (!factory) {
            console.warn('No factory found for template: ' + data.template);
            return;
        }

        var object3d = factory(data.initData);
        if (!object3d) {
            console.error(data.template + ' factory must return an Object3D');
            return;
        }

        var syncBehavior = object3d.getBehaviorByType('Object3DSync');
        if (!syncBehavior) {
            console.error(data.template + ' factory must return an Object3D with an Object3DSync behavior');
            return;
        }

        register(key, syncBehavior);
        syncBehavior.asExisting(snapshot.ref());

        //syncBehavior.receive(snapshot);//To prevent clobbering synced object with factory conditions. Will pull key for syncKey
    });

    function register(key, syncBehavior) {
        syncBehaviors[key] = syncBehavior;
    }

    function sendAll() {
        for (var i = 0, max = syncBehaviors.length; i < max; i++) {
            syncBehaviors[i].send();
        }
    }

    function awake(o) {
        setInterval(sendAll, 50);
    }


    var exports = { awake: awake, register: register, type: 'SceneSync' };
    Object.defineProperty(exports, 'sceneBase', {
        get: function () { return sceneBase }
    });
    Object.defineProperty(exports, 'skipNextAdd', {
        get: function () { return skipNextAdd },
        set: function (value) { skipNextAdd = value }
    });
    return exports;
}
