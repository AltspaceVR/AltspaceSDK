window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

window.altspace.utilities.behaviors.Sync = function (base, config) {
    config = config || {};
    if (config.position === undefined) config.position = true;
    config.interval = config.interval && config.interval > 10 && config.interval < 5000 || 100;//TODO Clamp instead

    var object3d;
    var syncInterval;
    var data;

    function awake(o) {
        object3d = o;
        syncInterval = setInterval(send, config.interval);

        var hasName = config.name || object3d.name;
        if (!hasName) throw Error('Object must have a name to be synced.')
        data = base.child('scene').child(config.name || object3d.name);

        if (config.position) {
            data.child('position').on('value', function (snapshot) {//TODO: cache position child
                var value = snapshot.val();
                object3d.position.set(value.x, value.y, value.z);
            });
        }

    }

    function send() {

        if (config.position) {
            data.child('position').set({
                x: object3d.position.x,
                y: object3d.position.y,
                z: object3d.position.z
            });
        }

    }

    return { awake: awake, type: 'Sync' };
};