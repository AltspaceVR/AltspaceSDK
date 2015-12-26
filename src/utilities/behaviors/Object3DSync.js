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
    var dataRef;
    var ownerRef;
    var transformRef;

    var clientId;
    var isOwner = false;

    var position = new THREE.Vector3();
    var quaternion = new THREE.Quaternion(); 
    var scale = new THREE.Vector3();


    function link(objectRef) {
        ref = objectRef;
        key = ref.key();
        transformRef = ref.child('batch');
        dataRef = ref.child('data');
        ownerRef = ref.child('owner');
    }

    //TODO: lerp
    function setupReceive() {
        transformRef.on('value', function (snapshot) {

            if (isOwner) return;

            var value = snapshot.val();
            if (!value) return;

            if (config.position) {
                object3d.position.set(value.position.x, value.position.y, value.position.z);
            }
            if (config.rotation) {
                object3d.quaternion.set(value.quaternion.x, value.quaternion.y, value.quaternion.z, value.quaternion.w);
            }
            if (config.scale) {
                object3d.scale.set(value.scale.x, value.scale.y, value.scale.z);
            }
        });

        ownerRef.on('value', function (snapshot) {
            isOwner = snapshot.val() === clientId;
        });
    }

    function send() {
        if (!isOwner) return;

        var batch = {};
        if (config.world) {
            object3d.updateMatrixWorld();//call before sending to avoid being a frame behind
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
        if (Object.keys(batch).length > 0) {
            transformRef.set(batch);
        }
    }

    function awake(o, s) {
        object3d = o;
        scene = s;

        clientId = scene.uuid;//temporary way of having unique identifiers for each client
        setupReceive();
    }

    function update(deltaTime) {
        
    }

    function takeOwnership() {
        ownerRef.set(clientId);
    }

    var exports = { awake: awake, update: update, type: 'Object3DSync', link: link, autoSend: send, takeOwnership: takeOwnership };

    Object.defineProperty(exports, 'dataRef', {
        get: function () {
            return dataRef;
        }
    });

    Object.defineProperty(exports, 'isOwner', {
        get: function () {
            return isOwner;
        }
    });

    return exports;
};

//manual modifications to the ref's will not obey ownership status.