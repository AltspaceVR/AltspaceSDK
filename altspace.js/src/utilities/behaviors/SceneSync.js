window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

window.altspace.utilities.behaviors.SceneSync = function (instanceBase, config) {
    var sceneBase = instanceBase.child('scene');
    var factories = config.factories || {};

    var autoSendRateMS = 100;

    var syncBehaviors = [];

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

        syncBehaviors.push(syncBehavior);
        syncBehavior.link(snapshot.ref());
    });

    function autoSendAll() {
        for (var i = 0, max = syncBehaviors.length; i < max; i++) {
            syncBehaviors[i].autoSend();
        }
    }

    function awake(o) {
        setInterval(autoSendAll, autoSendRateMS);
    }

    //TODO: see if we can return the instantiated object since I think the callback happens syncronously with push
    function instantiate(template, initData) {
        sceneBase.push({ template: template, initData: initData });
    }

    var exports = { awake: awake, instantiate: instantiate, type: 'SceneSync' };
    Object.defineProperty(exports, 'autoSendRateMS', {
        get: function() { return autoSendRateMS; }
    });
    return exports;
};
