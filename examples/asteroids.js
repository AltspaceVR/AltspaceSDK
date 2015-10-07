(function () {

    (function () { var a = window.altspace; (function (ss, t) { for (var i in ss) { for (var j in ss[i]) { t[j] = ss[i][j]; } }; })([a, a.utilities, a.utilities.behaviors, a.utilities.shims], window.alt = {}) })();

    var sim = alt.Simulation();
    var inCodePen = alt.codePen.inCodePen;
    var instanceBase = alt.sync.getInstance({
        authorId: inCodePen ? alt.codePen.getAuthorId() : null,
        instanceId: inCodePen ? alt.codePen.getPenId() : null
    });

    function CreateShip(initData) {

        var ship = new THREE.Mesh(
          new THREE.TetrahedronGeometry(100),
          new THREE.MeshBasicMaterial({ color: initData.color })
        );
        ship.addBehaviors(
          alt.Bob({ shouldMove: false }),
          //alt.Spin({ speed: 0.002 }),
          alt.ButtonStateStyle(),
          alt.Drag({ x: true, z: true }),
          alt.Object3DSync({
              removeOnCreatorLeave: true,
              position: true
          })
        );
        ship.position.y = -100;

        sim.scene.add(ship);

        return ship;
    }
    alt.sync.authenticate(function(){

      function ready(shouldInitialize) {//TODO: firstInInstance ?
          if (shouldInitialize) {
          }
          sceneSync.instantiate('Ship', { color: Please.make_color({ format: 'hex' })[0] });
      }
      
      var sceneSync = alt.SceneSync(instanceBase, {
          factories: {
              'Ship': CreateShip
          },
          ready: ready
      });
      sim.scene.addBehavior(sceneSync);
    });

}());