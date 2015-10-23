window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The Object3DSync behavior syncs an object's transform and data
 *
 * @class Object3DSync
 * @param {Object} [config]
 * @param {Boolean} [config.position=false] Whether object's position should
 *  be synced
 * @param {Boolean} [config.rotation=false] Whether object's rotation should
 *  be synced
 * @param {Boolean} [config.scale=false] Whether object's scale should
 *  be synced
 * @param {Boolean} [config.syncData=false] Whether object's syncData should
 *  be synced
 * @param {Boolean} [config.auto=false] Whether the object should be synced 
 *  automatically. Not currently recommended.
 * @memberof module:altspace/utilities/behaviors
 **/
window.altspace.utilities.behaviors.Object3DSync = function (config){
    config = config || {};
    /*if (config.position === undefined) config.position = true;
    if (config.rotation === undefined) config.rotation = true;
    if (config.scale === undefined) config.scale = true;
    if (config.syncData === undefined) config.syncData = true;*/
    var object3d;
    var base;
    var key;

    var sendEnqueued = false;

    var positionBase;
    var rotationBase;
    var scaleBase;
    var syncDataBase;

    function link(objectBase) {
        base = objectBase;
        key = base.key();
        positionBase = base.child('position');
        rotationBase = base.child('rotation');
        scaleBase = base.child('scale');
        syncDataBase = base.child('syncData');
    }

    //TODO: lerp
    function setupReceive() {
        if (config.position) {
            positionBase.on('value', function (snapshot) {
                var value = snapshot.val();
                if(!value) return;
                object3d.position.set(value.x, value.y, value.z);
            });
        }
        if (config.rotation) {
            rotationBase.on('value', function (snapshot) {
                var value = snapshot.val();
                if (!value) return;
                object3d.quaternion.set(value.x, value.y, value.z, value.w);
            });
        }
        if (config.scale) {
            scaleBase.on('value', function (snapshot) {
                var value = snapshot.val();
                if (!value) return;
                object3d.scale.set(value.x, value.y, value.z);
            });
        }
        if (config.syncData) {
            if (!object3d.userData.syncData) {//init here so app can assume it exists
                object3d.userData.syncData = {};
            }
            syncDataBase.on('value', function (snapshot) {
                var value = snapshot.val();
                if (!value) return;
                object3d.userData.syncData = value;
            });
        }
    }


    /**
     * Enqueue a sync for the next SceneSync update.
     * 
     * This is to be used whenever you update a property and are not using auto. If multiple users could potentially move an object, this is preferred vs using auto.
     * @method enqueueSend
     * @memberof module:altspace/utilities/behaviors.Object3DSync
     */
    function enqueueSend() {
        sendEnqueued = true;
    }

    function autoSend() {
        if (config.auto || sendEnqueued) send();
        sendEnqueued = false;
    }

    function send() {
        if (config.position) {
            positionBase.set({
                x: object3d.position.x,
                y: object3d.position.y,
                z: object3d.position.z
            });
        }
        if (config.rotation) {
            rotationBase.set({
                x: object3d.quaternion.x,
                y: object3d.quaternion.y,
                z: object3d.quaternion.z,
                w: object3d.quaternion.w
            });
        }
        if (config.scale) {
            scaleBase.set({
                x: object3d.scale.x,
                y: object3d.scale.y,
                z: object3d.scale.z
            });
        }
        if (config.syncData) {
            syncDataBase.set(object3d.userData.syncData);//TODO: see if this needs to be parsed and stringified
        }
    }

    function awake(o) {
        object3d = o;

        setupReceive();
    }

    function update(deltaTime) {
        
    }

    var exports = { awake: awake, update: update, type: 'Object3DSync', link: link, send: send, enqueueSend: enqueueSend, autoSend: autoSend};

    return exports;
};

