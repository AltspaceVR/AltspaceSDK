'use strict';

var _Map = require('babel-runtime/core-js/map')['default'];

var behaviors = altspace.utilities.behaviors,
    simulation = new altspace.utilities.Simulation(),
    scene = window.scene = simulation.scene,
    loader = new THREE.ColladaLoader(),
    models = window.models = new _Map();

if (!altspace.getEnclosure) {
	altspace.getEnclosure = function () {
		return {
			then: function then(callback) {
				callback({
					innerWidth: 24,
					innerHeight: 24,
					innerDepth: 24,
					pixelsPerMeter: 4
				});
			}
		};
	};
}

altspace.getEnclosure().then(function (enclosure) {
	scene.add(new THREE.AxisHelper());

	var loadingComplete = function loadingComplete() {
		var modelScale = undefined;
		if (enclosure.innerWidth / enclosure.pixelsPerMeter > 2) {
			modelScale = enclosure.pixelsPerMeter * 0.8;
		} else {
			modelScale = 100;
		}
		window.modelScale = modelScale;
		window.enclosure = enclosure;
		var table = models.get('table');
		table.scale.multiplyScalar(modelScale);
		scene.add(table);
		table.addBehavior(new behaviors.Layout({ my: { x: 'max', z: 'max' }, at: { y: 'min', x: 'max', z: 'max' } }));

		var chair = models.get('chair');
		table.add(chair);
		chair.addBehavior(new behaviors.Layout({ at: { x: 'center+0.6', z: 'min' } }));

		chair = chair.clone();
		table.add(chair);
		chair.addBehavior(new behaviors.Layout({ at: { x: 'center-0.6', z: 'min' } }));

		var shelves = models.get('shelves');
		shelves.scale.multiplyScalar(modelScale);
		shelves.rotation.y = Math.PI / 2;
		scene.add(shelves);
		shelves.addBehavior(new behaviors.Layout({ my: { x: 'min' }, at: { x: 'min', y: 'min' } }));

		var stool = models.get('stool');
		shelves.add(stool);
		stool.addBehavior(new behaviors.Layout({ my: { x: 'max-0.1', z: 'min' }, at: { x: 'min', z: 'min' } }));

		var bench = models.get('bench');
		bench.scale.multiplyScalar(modelScale);
		scene.add(bench);
		bench.addBehavior(new behaviors.Layout({ my: { x: 'min', z: 'min' }, at: { x: 'min', y: 'min', z: 'min' } }));

		var plaque = models.get('plaque');
		plaque.scale.multiplyScalar(modelScale);
		plaque.rotation.y = Math.PI;
		scene.add(plaque);
		plaque.addBehavior(new behaviors.Layout({ at: { y: 'min+2m', z: 'max' } }));
	};

	var modelNames = ['table', 'shelves', 'bench', 'chair', 'stool', 'plaque'];
	var totalLoaded = 0;
	modelNames.forEach(function (modelName) {
		loader.load('../models/living-room/' + modelName + '.dae', function (collada) {
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
	var controls = new THREE.OrbitControls(simulation.camera);
}