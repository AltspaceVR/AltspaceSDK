window.telekenetic = window.telekenetic || {};

(function () {

    var Bob = altspace.utilities.behaviors.Bob;
    var Spin = altspace.utilities.behaviors.Spin;
    var ButtonStateStyle = altspace.utilities.behaviors.ButtonStateStyle;
    var Object3DSync = altspace.utilities.behaviors.Object3DSync;
    var Drag = altspace.utilities.behaviors.Drag;

    function destroyCubes(cube) {
        var i = telekenetic.cubes.indexOf(cube);
        if (i !== -1) {
            telekenetic.cubes.splice(i, 1);
        }

        // returning true invokes the default destructor (removes from scene and disposes references)
        return true;
    }

    function createCube(initData) {
        var width = initData.width;
        var height = initData.height;
        var depth = initData.depth;
        var x = initData.x || 0;
        var y = initData.y || 0;
        var z = initData.z || 0;
        var BoardWidth = telekenetic.BoardWidth;

        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshBasicMaterial({ color: new THREE.Color(initData.color) })
        );
        cube.addBehaviors(
            Bob({ shouldMove: false }),
            Spin({ speed: 0.002 }),
            ButtonStateStyle(),
            Object3DSync({
                position: true
            }),
            Drag({
                x: { min: -BoardWidth / 2, max: BoardWidth / 2 },
                z: { min: -BoardWidth / 2, max: BoardWidth / 2 }
            })
        );
        cube.position.set(x, y, z);
        cube.position.y = -100;
        telekenetic.sim.scene.add(cube);

        telekenetic.cubes.push(cube);

        return cube;
    }

    telekenetic.destroyCubes = destroyCubes;
    telekenetic.createCube = createCube;
})();