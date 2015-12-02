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
 * @param {Boolean} [config.world=false] Whether world coordiantes should
 *  be sent when synchronizing position and rotation, instead of the
 *  transformation relative to the object's parent.  Use if synced object
 *  is a child (e.g. of the tracking skeleton) only in the sender scene.
 * @memberof module:altspace/utilities/behaviors
 **/
window.altspace.utilities.behaviors.Object3DSync = function (config){
    config = config || {};
    /*if (config.position === undefined) config.position = true;
    if (config.rotation === undefined) config.rotation = true;
    if (config.scale === undefined) config.scale = true;
    if (config.syncData === undefined) config.syncData = true;*/
    var object3d;
    var scene;
    var ref;
    var key;

    var sendEnqueued = false;

    var batchRef;

    function link(objectRef) {
        ref = objectRef;
        key = ref.key();
        batchRef = ref.child('batch');
    }

    //TODO: lerp
    function setupReceive() {
        batchRef.on('value', function (snapshot) {
            var value = snapshot.val();
            if(!value) return;
            if (value.senderId === scene.uuid) return;//We sent this batch, ignore it.
            if (config.position) {
                var position = value.position;
                object3d.position.set(position.x, position.y, position.z);
            }
            if (config.rotation) {
                var quaternion = value.quaternion;
                object3d.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
            }
            if (config.scale) {
                var scale = value.scale;
                object3d.scale.set(scale.x, scale.y, scale.z);
            }
            if (config.syncData) {
                if (!object3d.userData.syncData) {//init here so app can assume it exists
                    object3d.userData.syncData = {};
                }
                object3d.userData.syncData = value.syncData;
            }
        });
    }


    /**
     * Enqueue a sync for the next SceneSync update.
     * 
     * This is to be used whenever you update a property and are not using auto. If multiple users could potentially move an object, this is preferred vs using auto.
     * @instance
     * @method enqueueSend
     * @memberof module:altspace/utilities/behaviors.Object3DSync
     */
    function enqueueSend() {
        sendEnqueued = true;
    }

    function send() {

        var batch = {};
        var position, quaternion, scale;
        if (config.world) {
            position = new THREE.Vector3();
            quaternion = new THREE.Quaternion(); 
            scale = new THREE.Vector3();
            object3d.matrixWorld.decompose(position, quaternion, scale); 
        } else {
            position = object3d.position;
            quaternion = object3d.quaternion;
            scale = object3d.scale;
        }
        if (config.position) {
            batch.position = {
                x: position.x,
                y: position.y,
                z: position.z
            };
        }
        if (config.rotation) {
            batch.quaternion = {
                x: quaternion.x,
                y: quaternion.y,
                z: quaternion.z,
                w: quaternion.w
            };
        }
        if (config.scale) {
            batch.scale = {
                x: scale.x,
                y: scale.y,
                z: scale.z
            };
        }
        if (config.syncData) {
            batch.syncData = object3d.userData.syncData;//TODO: see if this needs to be parsed and stringified
        }
        if (Object.keys(batch).length > 0) {
            batch.senderId = scene.uuid;//Use uuid of the THREE.Scene as senderId.
            batchRef.set(batch);
        }
    }

    function autoSend() {
        if (config.auto || sendEnqueued) send();
        sendEnqueued = false;
    }

    function awake(o, s) {
        object3d = o;
        scene = s;

        setupReceive();
    }

    function update(deltaTime) {
        
    }

    var exports = { awake: awake, update: update, type: 'Object3DSync', link: link, send: send, enqueueSend: enqueueSend, autoSend: autoSend};

    return exports;
};

