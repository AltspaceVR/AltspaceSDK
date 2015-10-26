window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The SceneSync behavior manages the synchronization of an entire scene.
 *
 * @class SceneSync
 * @param {Firebase} syncInstance
 * @param {Object} [config]
 * @param {Object} [config.instantiators] A dictionary of instantiation 
 *  callbacks by syncType. Instantiators are called on every client whenever an instantiation call is made. Instantiators are passed an initialization
 *  data object and the syncType. They should return an Object3D with an 
 *  Object3DSync behavior.
 * @param {Object} [config.destroyers] (Optional) A dictionary of destroy 
 *  callbacks by syncType. Destroyers are called on every client whenever an destroy call is made. If no destroyer is provided, a default one will be use
 *  which will remove the object from its parent and dispose its geometry, material, and texture. 
 *  If you return true from a custom destroyer, the default destroyer will also be called.
 * @param {Function} [config.ready] A callback that is called after 
 *  checking to see if the instance has already been initialized. The callback is passed a boolean that 
 *  is true if this is the first callback that has been called for this sync instance.
 *  This is primarily useful for setting up any objects that should only be created once for an instance, and is not necessary otherwise.
 * @memberof module:altspace/utilities/behaviors
 **/
window.altspace.utilities.behaviors.SceneSync = function (instanceRef, config) {
    var sceneRef = instanceRef.child('scene');
    config = config || {};
    var instantiators = config.instantiators || {};
    var destroyers = config.destroyers || {};

    var autoSendRateMS = 100;

    var syncBehaviors = [];

    var objectForKey = {};
    var keyForUuid = {};

    instanceRef.child('initialized').once('value', function (snapshot) {
        var shouldInitialize = !snapshot.val();
        snapshot.ref().set(true);
        if (config.ready) {
            config.ready(shouldInitialize);
        }
    });

    sceneRef.on('child_added', function (snapshot) {

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

    sceneRef.on('child_removed', function (snapshot) {
        var data = snapshot.val();
        var key = snapshot.key();
        var object3d = objectForKey[key];
        if (!object3d) {
            console.warn('Failed to find object matching deleted key', key);
            return;
        }
        var syncType = data.syncType;
        if (!syncType) {
            console.warn('No syncType found for object being destroyed', object3d);
            return;
        }

        function defaultDestroyer(object3d) {

            // remove all behaviors including this one
            object3d.removeAllBehaviors();

            // remove from scene or parent
            if (object3d.parent) {
                object3d.parent.remove(object3d);
            }

            if (object3d.geometry) {
                object3d.geometry.dispose();
            }

            if (object3d.material) {
                if (object3d.material.map) {
                    object3d.material.map.dispose();
                }
                object3d.material.dispose();
            }
        }

        var customDestroyer = destroyers[syncType]
        var shouldDefaultDestroy = !customDestroyer;

        if (customDestroyer) {

            // returning true from a destroyer will additionally invoke the default destroyer
            shouldDefaultDestroy = customDestroyer(object3d);
        }

        if (shouldDefaultDestroy) defaultDestroyer(object3d);

        //remove from our local bookkeeping
        delete objectForKey[key];
        delete keyForUuid[object3d.uuid];
    });


    function autoSendAll() {
        for (var i = 0, max = syncBehaviors.length; i < max; i++) {
            syncBehaviors[i].autoSend();
        }
    }

    function awake(o) {
        setInterval(autoSendAll, autoSendRateMS);
    }

    /**
     * Instantiate an object by syncType.
     * @instance
     * @method instantiate
     * @param {String} syncType Type of object to instantiate.
     * @param {Object} initData An object containing initialization data, passed
     *  to the instantiator.
     * @param {Boolean} destroyOnDisconnect If the object should be destroyed
     *  across all synced instance when the instantiating instance disconnects.
     * @memberof module:altspace/utilities/behaviors.SceneSync
     */
    function instantiate(syncType, initData, destroyOnDisconnect) {
        initData = initData || {};
        var objectRef = sceneRef.push({ syncType: syncType, initData: initData },
            function (error) { if (error) throw Error('Failed to save to Firebase', error) }
        );
        if (destroyOnDisconnect) {
            objectRef.onDisconnect().remove();//send remvoe_child to remote clients
        }
        //instantiation done, local child_added callback happens syncronously with push
        return objectForKey[objectRef.key()];
    }


    /**
     * Destroy a synced object across instances.
     * @instance
     * @method destroy
     * @param {Object} object3d The object to destroy.
     * @memberof module:altspace/utilities/behaviors.SceneSync
     */
    function destroy(object3d) {
        var key = keyForUuid[object3d.uuid];
        if (!key) {
            console.warn('Failed to find key matching deleted object3d', object3d);
            return;
        }
        sceneRef.child(key).remove(function (error) {
            if (error) console.warn('Failed to remove from Firebase', error);
        });
        sceneRef.child(key).off();//detach all callbacks
    }

    var exports = {
        awake: awake,
        instantiate: instantiate,
        destroy: destroy,
        type: 'SceneSync'
    };
    Object.defineProperty(exports, 'autoSendRateMS', {
        get: function () { return autoSendRateMS; }
    });
    return exports;
};
