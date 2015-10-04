window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

window.altspace.utilities.behaviors.Object3DSync = function (config){
    config = config || {};
    if (config.position === undefined) config.position = true;
    var object3d;
    var base;
    var key;

    var lastPosition;

    function link(objectBase) {
        base = objectBase;
        key = base.key();
    }

    function awake(o) {
        object3d = o;

        setupReceive();
    }

    function setupReceive() {
        if (config.position) {//TODO, && we haven't sent out a position in the last 100 ms.
            base.child('position').on('value', function (snapshot) {//TODO: cache position child
                var value = snapshot.val();
                if(value === null) return;
                object3d.position.set(value.x, value.y, value.z);
                //lastPosition.set(value.x, value.y, value.z);
            });
        }
    }

    function send() {
        if (config.position) {
            //if(!lastPosition || lastPosition.distanceToSquared(object3d.position) > 0.01){ 
                base.child('position').set({
                    x: object3d.position.x,
                    y: object3d.position.y,
                    z: object3d.position.z
                });
                //lastPosition = object3d.position.clone();//TODO: Opt
            //}
        }
    }

    var exports = { awake: awake, type: 'Object3DSync', link: link, send: send};

    return exports;
};

