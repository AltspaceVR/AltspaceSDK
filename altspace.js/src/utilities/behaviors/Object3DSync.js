window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

window.altspace.utilities.behaviors.Object3DSync = function (template, config) {
    config = config || {};
    if (config.position === undefined) config.position = true;
    if (config.initData === undefined) config.initData = null;
    var sceneSync = config.sceneSync;//TODO auto aquire
    var sceneBase = sceneSync.sceneBase;
    var object3d;
    var objectBase;
    var key;

    function asNew() {
        sceneSync.skipNextAdd = true;
        objectBase = sceneBase.push({ template: template, initData: config.initData });
        key = objectBase.key();
        sceneSync.register(key, this);
    }

    function asExisting(objectBase) {
        objectBase = objectBase;
        key = objectBase.key();
    }

    function awake(o) {
        object3d = o;

        if (!objectBase) asNew();

        setupReceive();
    }

    function setupReceive() {
        if (config.position) {//TODO, && we haven't sent out a position in the last 100 ms.
            objectBase.child('position').on('value', function (snapshot) {//TODO: cache position child
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

    var exports = { awake: awake, type: 'Object3DSync', asExisting: asExisting };

    /* Object.defineProperty(exports, 'template', {
       get: function(){return template;}
     });
     Object.defineProperty(exports, 'initData', {
       get: function(){return config.initData;}
     });*/

    return exports;
}

var SceneSync = function (instanceBase, config) {
    var sceneBase = instanceBase.child('scene');
    var factories = config.factories || {};

    var syncBehaviors = [];
    var localSyncedObjects = [];

    var skipNextAdd = false;

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

        if (skipNextAdd) {//Workaround for firebase immediatly calling this function on local add
            skipNextAdd = false;
            return;
        }
        console.log('child_added key: ' + key);

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

        register(key, syncBehavior);
        syncBehavior.asExisting(snapshot.ref());

        //syncBehavior.receive(snapshot);//To prevent clobbering synced object with factory conditions. Will pull key for syncKey
    });

    function register(key, syncBehavior) {
        syncBehaviors[key] = syncBehavior;
    }

    function sendAll() {
        for (var i = 0, max = syncBehaviors.length; i < max; i++) {
            syncBehaviors[i].send();
        }
    }

    function awake(o) {
        setInterval(sendAll, 50);
    }



    var exports = { awake: awake, register: register, type: 'SceneSync' };
    Object.defineProperty(exports, 'sceneBase', {
        get: function () { return sceneBase }
    });
    Object.defineProperty(exports, 'skipNextAdd', {
        get: function () { return skipNextAdd },
        set: function (value) { skipNextAdd = value }
    });
    return exports;
}

function CreateCube(width, height, depth) {

    var cube = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshBasicMaterial({ color: '#EB5B40' })
    );
    cube.addBehaviors(
      alt.Bob({ shouldMove: false }),
      alt.Spin({ speed: 0.002 }),
      alt.ButtonStateStyle(),
      alt.Drag({ x: true, z: true }),
      Object3DSync('Cube', {
          sceneSync: sceneSync,
          initData: {
              width: width,
              height: height,
              depth: depth
          },
          position: false
      })
    );
    cube.position.y = -100;

    return cube;
}

function CreateSyncedCube(initData) {
    var c = CreateCube(initData.width, initData.height, initData.depth);
    sim.scene.add(c);
    return c;
}

//TODO: Do we only want to allow people to instantiate their objects using the factories (same on either side);
var syncFactories = {
    'Cube': CreateSyncedCube
};

function ready(shouldInitialize) {
    if (shouldInitialize) {
        console.log('should init')
        //sceneSync.instantiate('Cube', {width: 100, height: 50, depth: 100});
        var cube = CreateCube(100, 120, 100);
        sim.scene.add(cube);
    }
}

var sceneSync = SceneSync(instanceBase, {
    factories: syncFactories,
    ready: ready
});
sim.scene.addBehavior(sceneSync);




