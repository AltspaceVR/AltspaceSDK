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
    var ref;
    var key;

    var sendEnqueued = false;

    var positionRef;
    var rotationRef;
    var scaleRef;
    var syncDataRef;

    function link(objectRef) {
        ref = objectRef;
        key = ref.key();
        positionRef = ref.child('position');
        rotationRef = ref.child('rotation');
        scaleRef = ref.child('scale');
        syncDataRef = ref.child('syncData');
    }

    //TODO: lerp
    function setupReceive() {
        if (config.position) {
            positionRef.on('value', function (snapshot) {
                var value = snapshot.val();
                if(!value) return;
                object3d.position.set(value.x, value.y, value.z);
            });
        }
        if (config.rotation) {
            rotationRef.on('value', function (snapshot) {
                var value = snapshot.val();
                if (!value) return;
                object3d.quaternion.set(value.x, value.y, value.z, value.w);
            });
        }
        if (config.scale) {
            scaleRef.on('value', function (snapshot) {
                var value = snapshot.val();
                if (!value) return;
                object3d.scale.set(value.x, value.y, value.z);
            });
        }
        if (config.syncData) {
            if (!object3d.userData.syncData) {//init here so app can assume it exists
                object3d.userData.syncData = {};
            }
            syncDataRef.on('value', function (snapshot) {
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
     * @instance
     * @method enqueueSend
     * @memberof module:altspace/utilities/behaviors.Object3DSync
     */
    function enqueueSend() {
        sendEnqueued = true;
    }

    function send() {

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
            positionRef.set({
                x: position.x,
                y: position.y,
                z: position.z
            });
        }
        if (config.rotation) {
            rotationRef.set({
                x: quaternion.x,
                y: quaternion.y,
                z: quaternion.z,
                w: quaternion.w
            });
        }
        if (config.scale) {
            scaleRef.set({
                x: scale.x,
                y: scale.y,
                z: scale.z
            });
        }
        if (config.syncData) {
            syncDataRef.set(object3d.userData.syncData);//TODO: see if this needs to be parsed and stringified
        }
    }

    function autoSend() {
        if (config.auto || sendEnqueued) send();
        sendEnqueued = false;
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

