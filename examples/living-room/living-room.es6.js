let 
	behaviors = altspace.utilities.behaviors,
	simulation = new altspace.utilities.Simulation(),
	scene = window.scene = simulation.scene,
	loader = new THREE.ColladaLoader(),
	models = window.models = new Map();

if (!altspace.getEnclosure) {
	altspace.getEnclosure = function () {return {
		then: function (callback) {
			callback({
				innerWidth: 24,
				innerHeight: 24,
				innerDepth: 24,
				pixelsPerMeter: 4,
			})
		}
	}};
}

altspace.getEnclosure().then((enclosure) => {
	scene.add(new THREE.AxisHelper());

	let loadingComplete = function () {
		let modelScale;
		if (enclosure.innerWidth / enclosure.pixelsPerMeter > 2) {
			modelScale = enclosure.pixelsPerMeter * 0.8;
		}
		else {
			modelScale = 100;
		}
		window.modelScale = modelScale;
		window.enclosure = enclosure;
		let table = models.get('table');
		table.scale.multiplyScalar(modelScale);
		scene.add(table);
		table.addBehavior(new behaviors.Layout(
			{my: {x: 'max', z: 'max'}, at: {y: 'min', x: 'max', z: 'max'}}
		));

		let chair = models.get('chair');
		table.add(chair);
		chair.addBehavior(new behaviors.Layout(
			{at: {x: 'center+0.6', z: 'min'}}
		));

		chair = chair.clone();
		table.add(chair);
		chair.addBehavior(new behaviors.Layout(
			{at: {x: 'center-0.6', z: 'min'}}
		));

		let shelves = models.get('shelves');
		shelves.scale.multiplyScalar(modelScale);
		shelves.rotation.y = Math.PI / 2;
		scene.add(shelves);
		shelves.addBehavior(new behaviors.Layout(
			{my: {x: 'min'}, at: {x: 'min', y: 'min'}}
		));

		let stool = models.get('stool');
		shelves.add(stool);
		stool.addBehavior(new behaviors.Layout(
			{my: {x: 'max-0.1', z: 'min'}, at: {x: 'min', z: 'min'}}
		));

		let bench = models.get('bench');
		bench.scale.multiplyScalar(modelScale);
		scene.add(bench);
		bench.addBehavior(new behaviors.Layout(
			{my: {x: 'min', z: 'min'}, at: {x: 'min', y: 'min', z: 'min'}}
		));

		let plaque = models.get('plaque');
		plaque.scale.multiplyScalar(modelScale);
		plaque.rotation.y = Math.PI;
		scene.add(plaque);
		plaque.addBehavior(new behaviors.Layout(
			{at: {y: 'min+2m', z: 'max'}}
		));
	};

	let modelNames = [
		'table', 'shelves', 'bench', 'chair', 'stool', 'plaque'
	];
	let totalLoaded = 0;
	modelNames.forEach((modelName) => {
		loader.load(`../models/living-room/${modelName}.dae`, (collada) => {
			models.set(modelName, collada.scene);
			totalLoaded++;
			if (totalLoaded === modelNames.length) {
				loadingComplete();
			}
		});
	});
});

if (simulation.camera) {
	simulation.camera.position.z = 20;
	simulation.camera.position.y = 20;
	let controls = new THREE.OrbitControls(simulation.camera);
}
