window.telekinetic = window.telekinetic || {};

(function () {

	var Bob = altspace.utilities.behaviors.Bob;
	var ButtonStateStyle = altspace.utilities.behaviors.ButtonStateStyle;
	var Object3DSync = altspace.utilities.behaviors.Object3DSync;

	var myColor = Please.make_color()[0];

	function createInstantiationSphere(initData) {
		var sphere = createSphere(initData);
		sphere.material.color = new THREE.Color("#00EE00");
		sphere.position.x = 100;

		sphere.addEventListener('cursordown', function () {
			var enclosure = telekinetic.enclosure;
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
			telekinetic.sceneSync.instantiate('Cube', initData, true);
		});

		return sphere;
	}

	function createDestructionSphere(initData) {
		var sphere = createSphere(initData);
		sphere.material.color = new THREE.Color("#EE0000");
		sphere.position.x = -100;

		sphere.addEventListener('cursordown', function () {
			var cubes = telekinetic.cubes;
			if (cubes.length) telekinetic.sceneSync.destroy(cubes[cubes.length - 1]);
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
			new Bob({ shouldMove: true }),
			new ButtonStateStyle(),
			new Object3DSync({
				position: true
			})
		);
		telekinetic.sim.scene.add(sphere);
		return sphere;
	}

	telekinetic.createInstantiationSphere = createInstantiationSphere;
	telekinetic.createDestructionSphere = createDestructionSphere;
	telekinetic.createSphere = createSphere;
})();
