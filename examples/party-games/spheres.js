window.party = window.party || {};

(function () {

    var Bob = altspace.utilities.behaviors.Bob;
    var ButtonStateStyle = altspace.utilities.behaviors.ButtonStateStyle;
    var Object3DSync = altspace.utilities.behaviors.Object3DSync;

    function createSphereThatStartsGame(initData) {
        var sphere = createSphere(initData);
        sphere.material.color = new THREE.Color('#00EE00');
        sphere.position.x = 100;
        sphere.position.y = -450;

        sphere.addEventListener('cursordown', party.changeWord);

        return sphere;
    }

    //TODO: Move
    function destroyCard(){
      if (typeof(party.card) !== 'undefined'){
        party.detachCardFromEye();
        party.sceneSync.destroy(party.card);
      }
    }

    //TODO: Move
    function changeWord(){
      destroyCard();

      var text = party.nextWord();
      var card = party.sceneSync.instantiate('Card', { 
        text: text, 
        cardColor: party.colors.blue.dark, 
        textColor: party.colors.blue.light 
      });
      party.card = card;

      party.attachCardToEye();
    }

    function createSphereThatEndsGame(initData) {
        var sphere = createSphere(initData);
        sphere.material.color = new THREE.Color('#EE0000');
        sphere.position.x = -100;
        sphere.position.y = -450;

        sphere.addEventListener('cursordown', function () {
          destroyCard();
        });

        return sphere;
    }

    function createSphere(initData) {
        var radius = initData.radius;
        var sphere = new THREE.Mesh(
          new THREE.SphereGeometry(radius, 20, 20),
          new THREE.MeshBasicMaterial({ color: '#EB5B40' })
        );
        sphere.addBehaviors(
          Bob({ shouldMove: true }),
          ButtonStateStyle(),
          Object3DSync({
              position: true
          })
        );
        party.sim.scene.add(sphere);
        return sphere;
    }

    party.createSphereThatStartsGame = createSphereThatStartsGame;
    party.createSphereThatEndsGame = createSphereThatEndsGame;
    party.createSphere = createSphere;
    party.changeWord = changeWord;
})();
