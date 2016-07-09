window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};

/**
 * @module altspace/utilities
 */

/**
 * Simluation is a helper class that lets you quickly setup a three.js app with support for AltspaceVR. It creates a basic scene for you and starts the render and behavior loop.
 *
 * If all of your application logic is in behaviors, you do not need to create any additional requestAnimationFrame loops.
 *
 * It also automatically uses the WebGL renderer when running in a 
 * desktop browser and emulates cursor events with mouse clicks.
 * @class Simulation
 * @param {Object} [config] Optional parameters.
 * @param {Boolean} [config.auto=true] Automatically start the render loop.
 * @memberof module:altspace/utilities
 */
altspace.utilities.Simulation = function (config) {
	config = config || {};
	if (config.auto === undefined) config.auto = true;
	if (config.rendererOptions === undefined) config.rendererOptions = {};

	var exports = {};
	var scene = new THREE.Scene();
	var renderer;
	var camera;

	setup();

	function loop() {
		window.requestAnimationFrame(loop);

		if (scene.updateAllBehaviors)
			scene.updateAllBehaviors();

		renderer.render(scene, camera);
	}

	function setup() {
		function setupAltspace() {
			renderer = altspace.getThreeJSRenderer(config.rendererOptions);
			camera = new THREE.PerspectiveCamera(); // TODO: change from shim to symbolic
		}

		function setupWebGL() {
			renderer = new THREE.WebGLRenderer({antialias: true});
			camera = new THREE.PerspectiveCamera();
			camera.position.z = 500;

			var resizeRender = function () {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};
			document.addEventListener("DOMContentLoaded", function (event) {
				document.body.style.margin = '0px';
				document.body.style.overflow = 'hidden';
				renderer.setClearColor('#035F72');
				var container = document.createElement('div');
				document.body.appendChild(container);
				container.appendChild(renderer.domElement);
			});
			window.addEventListener('resize', resizeRender);
			resizeRender();
			camera.fov = 45;
			camera.near = 1;
			camera.far = 2000;
			scene.add(camera);
			scene.add(new THREE.AmbientLight('white'));

			var shouldShimCursor = altspace && altspace.utilities && altspace.utilities.shims && altspace.utilities.shims.cursor;
			if (shouldShimCursor) altspace.utilities.shims.cursor.init(scene, camera);
		}

		if (altspace && altspace.inClient) {
			setupAltspace();
		} else {
			setupWebGL();
		}
	}

	if (config.auto) window.requestAnimationFrame(loop);


	/**
	 * The simulation scene.
	 * @readonly
	 * @instance
	 * @member {THREE.Scene} scene
	 * @memberof module:altspace/utilities.Simulation
	 */
	Object.defineProperty(exports, 'scene', {
		get: function () {
			return scene;
		}
	})

	/**
	 * The renderer being used.
	 * @readonly
	 * @instance
	 * @member {(THREE.WebGLRenderer|AltRenderer)} renderer
	 * @memberof module:altspace/utilities.Simulation
	 */
	Object.defineProperty(exports, 'renderer', {
		get: function () {
			return renderer;
		}
	})

	/**
	 * The camera being used by the WebGL renderer.
	 * @readonly
	 * @instance
	 * @member {Three.Camera} camera
	 * @memberof module:altspace/utilities.Simulation
	 */
	Object.defineProperty(exports, 'camera', {
		get: function () {
			return camera;
		},
		set: function (value) {
			camera = value;
		}
	})
	return exports;
}
