window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

window.altspace.utilities.behaviors.SceneSync = function (instanceBase, config) {
    var sceneBase = instanceBase.child('scene');
    var instantiators = config.instantiators || {};
    var destructors = config.destructors || {};

    var autoSendRateMS = 100;

    var syncBehaviors = [];

    var objectForKey = {};
    var keyForUuid = {};

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

        var instantiator = instantiators[data.syncType];

        if (!instantiator) {
            console.warn('No instantiator found for syncType: ' + data.syncType);
            return;
        }

        var object3d = instantiator(data.initData, data.syncType);
        if (!object3d) {
            console.error(data.syncType + '.create must return an Object3D');
            return;
        }
        objectForKey[key] = object3d;
        keyForUuid[object3d.uuid] = key;

        var syncBehavior = object3d.getBehaviorByType('Object3DSync');
        if (!syncBehavior) {
            console.error(data.syncType + ' instantiator must return an Object3D with an Object3DSync behavior');
            return;
        }

        syncBehaviors.push(syncBehavior);
        syncBehavior.link(snapshot.ref());
    });

    sceneBase.on('child_removed', function (snapshot) {
        var data = snapshot.val();
        var key = snapshot.key();
        var object3d = objectForKey[key];
        if (!object3d){
            console.warn('Failed to find object matching deleted key', key);
            return;
        }
        var syncType = data.syncType;
        if (!syncType) {
            console.warn('No syncType found for object being destroyed', object3d);
            return;
        }
        if (destructors[syncType]){//implementing disposal is optional
            var disposal = destructors[syncType];
            disposal(object3d);
        }
        //remove from our local bookkeeping
        delete objectForKey[key];
        delete keyForUuid[object3d.uuid];

        object3d.removeAllBehaviors();//removes this SceneSync behavior too

        if (object3d.parent){
            object3d.parent.remove(object3d);
        }
    });


    function autoSendAll() {
        for (var i = 0, max = syncBehaviors.length; i < max; i++) {
            syncBehaviors[i].autoSend();
        }
    }

    function awake(o) {
        setInterval(autoSendAll, autoSendRateMS);
    }

    function instantiate(syncType, initData, destroyOnDisconnect) {
        var objectBase = sceneBase.push({syncType: syncType, initData: initData},
            function(error){if (error) throw Error('Failed to save to Firebase', error)}
        );
        if (destroyOnDisconnect){
            objectBase.onDisconnect().remove();//send remvoe_child to remote clients
        }
        //instantiation done, local child_added callback happens syncronously with push
        return objectForKey[objectBase.key()];
    }

    function destroy(object3d) {
        var key = keyForUuid[object3d.uuid]
        if (!key){
            console.warn('Failed to find key matching deleted object3d', object3d);
            return;
        }
        sceneBase.child(key).remove(function(error){
            if (error) console.warn('Failed to remove from Firebase', error);
        });
        sceneBase.child(key).off();//detach all callbacks
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
