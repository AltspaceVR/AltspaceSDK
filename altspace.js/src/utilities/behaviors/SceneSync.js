window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

window.altspace.utilities.behaviors.SceneSync = function (instanceBase, config) {
    var sceneBase = instanceBase.child('scene');
    var factories = config.factories || {};

    var autoSendRateMS = 100;

    var syncBehaviors = [];

    var objectForKey = {};
    var keyForObject = {};
    var factoryForUuid = {};

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

        var factory = factories[data.factoryName];

        if (!factory) {
            console.warn('No factory found for factoryName: ' + data.factoryName);
            return;
        }
        if (!factory.create) {
            console.warn('No factory.create() found for factoryName: ' + data.factoryName);
            return;
        }

        var object3d = factory.create(data.initData);
        if (!object3d) {
            console.error(data.factoryName + '.create must return an Object3D');
            return;
        }
        objectForKey[key] = object3d;
        keyForObject[object3d] = key;
        factoryForUuid[object3d.uuid] = factory;

        var syncBehavior = object3d.getBehaviorByType('Object3DSync');
        if (!syncBehavior) {
            console.error(data.factoryName + ' factory must return an Object3D with an Object3DSync behavior');
            return;
        }

        syncBehaviors.push(syncBehavior);
        syncBehavior.link(snapshot.ref());
    });

    sceneBase.on('child_removed', function (snapshot) {
        var key = snapshot.key();
        var object3d = objectForKey[key];
        if (!object3d){
            console.warn('Failed to find object matching deleted key', key);
            return;
        }
        //call the factory.destroy, which will typically remove from scene
        //TODO: iterate through object's behaviors and call destroy on each one
        var factory = factoryForUuid[object3d.uuid];
        if (!factory) {
            console.warn('No factory found for object being destroyed', object3d);
            return;
        }
        if (factory.destroy) {//implementing destroy is optional
            factory.destroy(object3d);
        }
        //remove from our local bookkeeping
        delete objectForKey[key];
        delete keyForObject[object3d];
        delete factoryForUuid[object3d.uuid];
    });


    function autoSendAll() {
        for (var i = 0, max = syncBehaviors.length; i < max; i++) {
            syncBehaviors[i].autoSend();
        }
    }

    function awake(o) {
        setInterval(autoSendAll, autoSendRateMS);
    }

    function instantiate(factoryName, initData) {
        var objectBase = sceneBase.push({factoryName: factoryName, initData: initData},
            function(error){if (error) throw Error('Failed to save to Firebase', error)}
        );
        //instantiation done, local child_added callback happens syncronously with push
        return objectForKey[objectBase.key()];
    }

    function destroy(object3d) {
        var key = keyForObject[object3d]
        sceneBase.child(key).off();//detach all callbacks
        sceneBase.child(key).remove(function(error){
            if (error) console.warn('Failed to remove from Firebase', error);
        });
    }

    var exports = {
        awake: awake,
        instantiate: instantiate,
        destroy: destroy,
        type: 'SceneSync'
    };
    Object.defineProperty(exports, 'autoSendRateMS', {
        get: function() { return autoSendRateMS; }
    });
    return exports;
};
