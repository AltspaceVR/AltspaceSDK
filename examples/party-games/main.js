/*
location.href = "http://localhost:8002/examples/party-games";
*/
window.party = window.party || {};
var wordIsAttached = false;

(function () {
    var SceneSync = altspace.utilities.behaviors.SceneSync;
    var Sync = altspace.utilities.SceneSync;

    party.syncInstance = altspace.utilities.sync.getInstance();
//    var partyGamesRef = party.syncInstance.child("partygames");
//    var allClients = partyGamesRef.child("clients");
//    allClients.on("value", function(snapshot){
//      var clientIds = snapshot.val();
//      if (!clientIds) return;
//      updateTheViewOfAllTheClientsInThisRound(clientIds);
//    });


    function init() {
        if (!window.altspace || !window.altspace.inClient) {
          document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');
        }

        party.sim = altspace.utilities.Simulation();

        var promises = [altspace.getThreeJSTrackingSkeleton(), altspace.getEnclosure(), altspace.getUser()];
        Promise.all(promises).then(function (array) {
          addSkeleton(array[0]);

          party.enclosure = array[1];

          var user = array[2];
          logUser(array[2]);

          setupSceneSync();
        }).catch(function (err) {
          console.error('Failed to get Altspace browser properties');
          console.dir(err);
        });
    }

    //    clientId = scene.uuid;
    //    clientsRef.on("value", function (snapshot) {
    //        var clientIds = snapshot.val();

    //        if (!clientIds) return;

    //        masterClientId = clientIds[0];
    //    });
    //    // add our client ID to the list of connected clients, 
    //    // but have it be automatically removed by firebase if we disconnect for any reason
    //    clientsRef.push(clientId).onDisconnect().remove();

    function addSkeleton(skeleton){
      party.sim.scene.add(skeleton);
      party.skeleton = skeleton;
    }

    function logUser(user){
      console.log(user.userId);
      console.log(user.displayName);
    }

    function setupSceneSync(){
      var sceneSync = SceneSync(party.syncInstance, {
        instantiators: {
          'Cube': party.createCube,
          'SphereThatStartsGame': party.createSphereThatStartsGame,
          'SphereThatEndsGame': party.createSphereThatEndsGame,
//          'Round': party.createRound,
          'Card': party.createCard
        },
        destroyers: {
          'Cube': party.destroyCube
        },
        ready: ready
      });
      party.sim.scene.addBehavior(sceneSync);
      party.sceneSync = sceneSync;
    }

//    function createRound(){
//      var round = new THREE.Object3d();
//      round.addBehavior(roundBehavior());
//      return round;
//    }
//    party.createRound = createRound;
//
//    function roundBehavior(){
//      var object3d;
//      var users;
//
//      function awake(o){
//        object3d = o;
//      }
//
//      function update(deltaTime){
//        if (!_.isEqual(users, object3d.userData.syncData.users)){
//          users = object3d.userData.syncData.users;
//          console.log("users updated to:");
//          console.log(users);
//        }
//      }
//
//      return {awake: awake, update: update};
//    }


    function ready(firstInInstance) {
      if (firstInInstance) {
        party.sceneSync.instantiate('SphereThatStartsGame', { radius: 30 });
        party.sceneSync.instantiate('SphereThatEndsGame', { radius: 30 });
//        party.round = party.sceneSync.instantiate('Round', {});
      }
      else {
      }
    }

    init();
})();
