/*
location.href = "http://localhost:8000/examples/party-games";
*/
window.party = window.party || {};
var wordIsAttached = false;

(function () {
    var SceneSync = altspace.utilities.behaviors.SceneSync;
    var Sync = altspace.utilities.SceneSync;

    party.cubes = [];
    party.BoardWidth = 300;
    party.BoardDepth = 300;
    party.syncInstance = altspace.utilities.sync.getInstance();

    function init() {
        if (!window.altspace || !window.altspace.inClient) {
          document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
        }

        var sim = altspace.utilities.Simulation();
        var promises = [altspace.getThreeJSTrackingSkeleton(), altspace.getEnclosure(), altspace.getUser()];
        Promise.all(promises).then(function (array) {
            var skeleton = array[0];
            var enclosure = array[1];
            var user = array[2];
            console.log(user.userId);
            console.log(user.displayName);
            //console.log(party.syncInstance.child("users"));

            
            party.syncInstance.once("value", function(snapshot){
                var hasUsers = snapshot.hasChild("my/users");
                if (hasUsers){
                    console.log('A');
                    console.log(party.syncInstance.child("my/users"));
                } 
                else {
                    console.log('B');
                    usersRef = party.syncInstance.child("my/users");
                    usersRef.set({id: user.userId});
                }
            });

            sim.scene.add(skeleton);

            var sceneSync = SceneSync(party.syncInstance, {
                instantiators: {
                    'Cube': party.createCube,
                    'InstantiationSphere': party.createInstantiationSphere,
                    'DestructionSphere': party.createDestructionSphere,
                    'Card': party.createCard,
                },
                destroyers: {
                    'Cube': party.destroyCube
                },
                ready: ready
            });
            sim.scene.addBehavior(sceneSync);

            party.skeleton = skeleton;
            party.sim = sim;
            party.sceneSync = sceneSync;
            party.enclosure = enclosure;

        }).catch(function (err) {
            console.error('Failed to get Altspace browser properties');
            console.dir(err);
        });
    }

    function ready(firstInInstance) {
        if (firstInInstance) {
            party.sceneSync.instantiate('InstantiationSphere', { radius: 50 });
            party.sceneSync.instantiate('DestructionSphere', { radius: 50 });
        }
        else {
        }
    }

    init();
})();
