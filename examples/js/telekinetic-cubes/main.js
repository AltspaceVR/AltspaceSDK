window.telekinetic = window.telekinetic || {};

(function () {
	var SceneSync = altspace.utilities.behaviors.SceneSync;
	var Sync = altspace.utilities.SceneSync;

	telekinetic.cubes = [];
	telekinetic.BoardWidth = 300;
	telekinetic.BoardDepth = 300;
	telekinetic.syncInstance = null;

	function init() {
		if (!window.altspace || !window.altspace.inClient) document.write('<h3>To view this example, please open this page in <a href="http://altvr.com"> AltspaceVR </a></h3>');

		var sim = new altspace.utilities.Simulation();
		var promises = [
			altspace.getThreeJSTrackingSkeleton(),
			altspace.getEnclosure(),
			altspace.utilities.sync.connect({appId: 'telekinetic-cubes', authorId: 'altspacevr'})
		];
		Promise.all(promises).then(function (array) {
			var skeleton = array[0];
			var enclosure = array[1];
			var connection = array[2];
			telekinetic.syncInstance = connection.instance;

			sim.scene.add(skeleton);

			var sceneSync = new SceneSync(telekinetic.syncInstance, {
				instantiators: {
					'Cube': telekinetic.createCube,
					'InstantiationSphere': telekinetic.createInstantiationSphere,
					'DestructionSphere': telekinetic.createDestructionSphere
				},
				destroyers: {
					'Cube': telekinetic.destroyCube
				},
				ready: ready
			});
			sim.scene.addBehavior(sceneSync);

			telekinetic.skeleton = skeleton;
			telekinetic.sim = sim;
			telekinetic.sceneSync = sceneSync;
			telekinetic.enclosure = enclosure;

		}).catch(function (err) {
			console.error('Failed to get Altspace browser properties');
			console.dir(err);
		});
	}

	function ready(firstInInstance) {
		if (firstInInstance) {
			telekinetic.sceneSync.instantiate('InstantiationSphere', { radius: 50 });
			telekinetic.sceneSync.instantiate('DestructionSphere', { radius: 50 });
		}
	}

	init();
})();
