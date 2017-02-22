window.telekenetic = window.telekenetic || {};

(function () {
	var SceneSync = altspace.utilities.behaviors.SceneSync;
	var Sync = altspace.utilities.SceneSync;

	telekenetic.cubes = [];
	telekenetic.BoardWidth = 300;
	telekenetic.BoardDepth = 300;
	telekenetic.syncInstance = altspace.utilities.sync.getInstance();

	function init() {
		if (!window.altspace || !window.altspace.inClient) document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');

		var sim = altspace.utilities.Simulation();
		var promises = [altspace.getThreeJSTrackingSkeleton(), altspace.getEnclosure()];
		Promise.all(promises).then(function (array) {
			var skeleton = array[0];
			var enclosure = array[1];

			sim.scene.add(skeleton);

			var sceneSync = SceneSync(telekenetic.syncInstance, {
				instantiators: {
					'Cube': telekenetic.createCube,
					'InstantiationSphere': telekenetic.createInstantiationSphere,
					'DestructionSphere': telekenetic.createDestructionSphere
				},
				destroyers: {
					'Cube': telekenetic.destroyCube
				},
				ready: ready
			});
			sim.scene.addBehavior(sceneSync);

			telekenetic.skeleton = skeleton;
			telekenetic.sim = sim;
			telekenetic.sceneSync = sceneSync;
			telekenetic.enclosure = enclosure;

		}).catch(function (err) {
			console.error('Failed to get Altspace browser properties');
			console.dir(err);
		});
	}

	function ready(firstInInstance) {
		if (firstInInstance) {
			telekenetic.sceneSync.instantiate('InstantiationSphere', { radius: 50 });
			telekenetic.sceneSync.instantiate('DestructionSphere', { radius: 50 });
		}
	}

	init();
})();
