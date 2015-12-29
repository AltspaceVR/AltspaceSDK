window.party = window.party || {};

(function () {

    var Bob = altspace.utilities.behaviors.Bob;
    var ButtonStateStyle = altspace.utilities.behaviors.ButtonStateStyle;
    var Object3DSync = altspace.utilities.behaviors.Object3DSync;

    var myColor = Please.make_color()[0];

    function createInstantiationSphere(initData) {
        var sphere = createSphere(initData);
        sphere.material.color = new THREE.Color('#00EE00');
        sphere.position.x = 100;
        sphere.position.y = -450;

        //sphere.addEventListener('cursordown', spawnCube); 
        sphere.addEventListener('cursordown', changeWord);

        return sphere;
    }


    function changeWord(){
        if (typeof(party.card) !== 'undefined'){
            party.detachCardFromEye();
            party.sceneSync.destroy(party.card);
        }

        var text = party.nextWord();
        var card = party.sceneSync.instantiate('Card', { 
            text: text, 
            backColor: party.colors.blue.dark, 
            textColor: party.colors.blue.light 
        });
        party.card = card;

        party.attachCardToEye();
    }

    function spawnCube(){
      var enclosure = party.enclosure;
      //clicking on sphere creates block of random size nearby
      function randInt(min, max) { return Math.random() * (max - min) + min; }
      var initData = {
        width: randInt(20, 100),
        height: randInt(20, 100),
        depth: randInt(20, 100),
        x: randInt(-enclosure.innerWidth / 2, enclosure.innerWidth / 2),
        y: randInt(-enclosure.innerHeight / 2, enclosure.innerHeight / 2),
        z: randInt(-enclosure.innerDepth / 2, enclosure.innerDepth / 2),
        color: myColor
      };
      party.sceneSync.instantiate('Cube', initData, true);
    }
    

    function createDestructionSphere(initData) {
        var sphere = createSphere(initData);
        sphere.material.color = new THREE.Color('#EE0000');
        sphere.position.x = -100;
        sphere.position.y = -450;

        sphere.addEventListener('cursordown', function () {
            var cubes = party.cubes;
            if (cubes.length) party.sceneSync.destroy(cubes[cubes.length - 1]);
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

    party.createInstantiationSphere = createInstantiationSphere;
    party.createDestructionSphere = createDestructionSphere;
    party.createSphere = createSphere;
})();
