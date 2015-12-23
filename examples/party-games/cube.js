window.party = window.party || {};

(function () {

    var Bob = altspace.utilities.behaviors.Bob;
    var Spin = altspace.utilities.behaviors.Spin;
    var ButtonStateStyle = altspace.utilities.behaviors.ButtonStateStyle;
    var Object3DSync = altspace.utilities.behaviors.Object3DSync;
    var Drag = altspace.utilities.behaviors.Drag;
    var Grab = party.Grab;
    var PushPull = party.PushPull;

    function destroyCube(cube) {
        var i = party.cubes.indexOf(cube);
        if (i !== -1) {
            party.cubes.splice(i, 1);
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
        var BoardWidth = party.BoardWidth;

        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshBasicMaterial({ color: new THREE.Color(initData.color) })
        );
        cube.addBehaviors(
            Bob({ shouldMove: false }),
            ButtonStateStyle(),
            Grab(),
            PushPull(),
            Object3DSync({
                position: true,
                world: true
            })
        );
        cube.position.set(x, y, z);
        party.sim.scene.add(cube);

        party.cubes.push(cube);

        return cube;
    }

    party.destroyCube = destroyCube;
    party.createCube = createCube;
})();
