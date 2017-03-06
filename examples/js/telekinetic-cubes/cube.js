window.telekinetic = window.telekinetic || {};

(function () {

	var Bob = altspace.utilities.behaviors.Bob;
	var Spin = altspace.utilities.behaviors.Spin;
	var ButtonStateStyle = altspace.utilities.behaviors.ButtonStateStyle;
	var Object3DSync = altspace.utilities.behaviors.Object3DSync;
	var Drag = altspace.utilities.behaviors.Drag;
	var Grab = telekinetic.Grab;
	var PushPull = telekinetic.PushPull;

	function destroyCube(cube) {
		var i = telekinetic.cubes.indexOf(cube);
		if (i !== -1) {
			telekinetic.cubes.splice(i, 1);
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
		var BoardWidth = telekinetic.BoardWidth;

		var cube = new THREE.Mesh(
			new THREE.BoxGeometry(width, height, depth),
			new THREE.MeshBasicMaterial({ color: new THREE.Color(initData.color) })
		);
		cube.addBehaviors(
			new Bob({ shouldMove: false }),
			new ButtonStateStyle(),
			Grab(),
			PushPull(),
			new Object3DSync({
				position: true,
				world: true
			})
		);
		cube.position.set(x, y, z);
		telekinetic.sim.scene.add(cube);

		telekinetic.cubes.push(cube);

		return cube;
	}

	telekinetic.destroyCube = destroyCube;
	telekinetic.createCube = createCube;
})();
