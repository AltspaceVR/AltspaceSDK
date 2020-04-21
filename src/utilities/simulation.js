'use strict';

import * as CursorShim from './shims/cursor';

/**
* Simulation is a helper class that lets you quickly setup a three.js app with support for AltspaceVR. It creates a basic scene for you and starts the render and behavior loop.
*
* If all of your application logic is in behaviors, you do not need to create any additional requestAnimationFrame loops.
*
* It also automatically uses the WebGL renderer when running in a
* desktop browser and emulates cursor events with mouse clicks.
* @class Simulation
* @param {Object} [config] Optional parameters.
* @param {Boolean} [config.auto=true] Automatically start the render loop.
* @param {Boolean} [config.profile=false] Enable profiling of serialization buffer memory usage.
* @param {Number} [config.initialSerializationBufferSize=1024] Size in bytes to initially expand serialization buffer by to optimize performance. (Minimum: 1,024 bytes, Maximum: 67,108,864 bytes)
* @memberof module:altspace/utilities
*/
class Simulation
{
	constructor(config = {auto: true, profile: false, initialSerializationBufferSize: 1024})
	{
		this._scene = null;
		this._renderer = null;
		this._camera = null;

		let usingAFrame = window.AFRAME && document.querySelector('a-scene');

		if(usingAFrame)
		{
			let ascene = document.querySelector('a-scene');
			this._scene = ascene.object3D;
			this._renderer = ascene.renderer;

			let acamera = document.querySelector('a-camera');
			if(acamera)
				this._camera = acamera.object3D;
		}
		else if (window.altspace && altspace.inClient)
		{
			this._scene = new THREE.Scene();
			this._renderer = altspace.getThreeJSRenderer({profile: config.profile, initialSerializationBufferSize: config.initialSerializationBufferSize});
			this._camera = new THREE.PerspectiveCamera(); // TODO: change from shim to symbolic
		}
		else {
			this._setupWebGL();
		}

		if(config.auto && !usingAFrame)
			this.loop();
	}

	_setupWebGL()
	{
		let scene = this._scene = new THREE.Scene();
		let renderer = this._renderer = new THREE.WebGLRenderer({antialias: true});
		let camera = this._camera = new THREE.PerspectiveCamera();

		document.addEventListener("DOMContentLoaded", event => {
			document.body.style.margin = '0px';
			document.body.style.overflow = 'hidden';
			renderer.setClearColor('#035F72');
			let container = document.createElement('div');
			document.body.appendChild(container);
			container.appendChild(renderer.domElement);
		});

		function resizeRender(){
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		window.addEventListener('resize', resizeRender);
		resizeRender();

		camera.position.z = 500;
		camera.fov = 45;
		camera.near = 1;
		camera.far = 2000;
		scene.add(camera);
		scene.add(new THREE.AmbientLight('white'));

		// shim cursor
		this.cursor = CursorShim.init(scene, camera);
	}

	/**
	* Begin the simulation. This loop is begun automatically by default.
	*/
	loop()
	{
		window.requestAnimationFrame(this.loop.bind(this));

		if(this.scene.updateAllBehaviors)
			this.scene.updateAllBehaviors();

		this.renderer.render(this.scene, this.camera);
	}

	/**
	* The simulation scene.
	* @readonly
	* @instance
	* @member {THREE.Scene} scene
	* @memberof module:altspace/utilities.Simulation
	*/
	get scene(){ return this._scene; }

	/**
	* The renderer being used.
	* @readonly
	* @instance
	* @member {(THREE.WebGLRenderer|AltRenderer)} renderer
	* @memberof module:altspace/utilities.Simulation
	*/
	get renderer(){ return this._renderer; }

	/**
	* The camera being used by the WebGL renderer.
	* @readonly
	* @instance
	* @member {Three.Camera} camera
	* @memberof module:altspace/utilities.Simulation
	*/
	get camera(){ return this._camera; }

}

export default Simulation;
