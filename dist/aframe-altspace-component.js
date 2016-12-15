/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	* @namespace altspace
	*/

	/**
	* The altspace component makes A-Frame apps compatible with AltspaceVR.
	*
	* **Note**: If you use the `embedded` A-Frame component on your scene, you must include it *before* the `altspace` component, or your app will silently fail.
	* @mixin altspace
	* @memberof altspace
	* @property {boolean} usePixelScale=`false` - Allows you to use A-Frame units as CSS pixels.
	* This is the default behavior for three.js apps, but not for A-Frame apps.
	* @property {string} verticalAlign=`middle` - Puts the origin at the `bottom`, `middle` (default),
	* or `top` of the Altspace enclosure.
	* @property {boolean} enclosuresOnly=`true` - Prevents the scene from being created if
	* enclosure is flat.
	* @property {boolean} fullspace=`false` - Puts the app into fullspace mode.
	*
	* @example
	* <head>
	*   <title>My A-Frame Scene</title>
	*   <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
	*   <script src="https://cdn.rawgit.com/AltspaceVR/aframe-altspace-component/v1.1.1/dist/aframe-altspace-component.min.js"></script>
	* </head>
	* <body>
	*   <a-scene altspace>
	*     <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
	*   </a-scene>
	* </body>
	*/
	AFRAME.registerComponent('altspace', {
	  version: '1.1.1',
	  schema: {
		usePixelScale: { type: 'boolean', default: 'false'},
		verticalAlign: { type: 'string',  default: 'middle'},
		enclosuresOnly:{ type: 'boolean', default: 'true'},
		fullspace:     { type: 'boolean', default: 'false'}
	  },

	  /*
	   * Called once when component is attached. Generally for initial setup.
	   */
	  init: function () {
		if (!(this.el.object3D instanceof THREE.Scene)) {
		  console.warn('aframe-altspace-component can only be attached to a-scene');
		  return;
		}

		if (window.altspace && window.altspace.inClient) {
		  this.el.setAttribute('vr-mode-ui', {enabled: false});
		  this.initRenderer();
		  this.initCursorEvents();
		  this.initCollisionEvents();
		} else {
		  console.warn('aframe-altspace-component only works inside of AltspaceVR');
		}

	  },

	  /*
	   * Called when component is attached and when component data changes.
	   * Generally modifies the entity based on the data.
	   */
	  update: function (oldData) {
	      if(this.el.object3D.updateAllBehaviors)
	        this.el.object3D.updateAllBehaviors();
	  },

	  /*
	   * Called when a component is removed (e.g., via removeAttribute).
	   * Generally undoes all modifications to the entity.
	   */
	  remove: function () { },

	  /*
	   * Called on each scene tick.
	   */
	  // tick: function (t) { },

	  /*
	   * Called when entity pauses.
	   * Use to stop or remove any dynamic or background behavior such as events.
	   */
	  pause: function () { },

	  /*
	   * Called when entity resumes.
	   * Use to continue or add any dynamic or background behavior such as events.
	   */
	  play: function () { },


	  /********** Helper Methods **********/

	  /*
	   * Swap in Altspace renderer when running in AltspaceVR.
	   */
	  initRenderer: function () {

		var scene = this.el.object3D;
		altspace.getEnclosure().then(function(e)
		{
			if(this.data.fullspace){
				e.requestFullspace();
				e.addEventListener('fullspacechange', function(){
					scene.scale.setScalar(e.pixelsPerMeter);
				});
			}

			if (!this.data.usePixelScale || this.data.fullspace){
				scene.scale.setScalar(e.pixelsPerMeter);
			}

		  switch (this.data.verticalAlign) {
			case 'bottom':
			  scene.position.y -= e.innerHeight / 2;
			  break;
			case 'top':
			  scene.position.y += e.innerHeight / 2;
			  break;
			case 'middle':
			  break;
			default:
			  console.warn('Unexpected value for verticalAlign: ', this.data.verticalAlign);
		  }

		  if(this.data.enclosuresOnly && e.innerDepth === 1){
			this.el.renderer.render(new THREE.Scene());
			this.el.renderer = this.el.effect = oldRenderer;

		  }
		}.bind(this));

		var oldRenderer = this.el.renderer;
		var renderer = this.el.renderer = this.el.effect = altspace.getThreeJSRenderer({
		  aframeComponentVersion: this.version
		});
		var noop = function() {};
		renderer.setSize = noop;
		renderer.setPixelRatio = noop;
		renderer.setClearColor = noop;
		renderer.clear = noop;
		renderer.enableScissorTest = noop;
		renderer.setScissor = noop;
		renderer.setViewport = noop;
		renderer.getPixelRatio = noop;
		renderer.getMaxAnisotropy = noop;
		renderer.setFaceCulling = noop;
		renderer.context = {canvas: {}};
		renderer.shadowMap = {};

	  },

	  /*
	   * Emulate A-Frame cursor events when running in altspaceVR.
	   */
	  initCursorEvents: function() {

		var scene = this.el.object3D;
		var cursorEl = document.querySelector('a-cursor') || document.querySelector('a-entity[cursor]');
		if (cursorEl) {
		  // Hide A-Frame cursor mesh.
		  cursorEl.setAttribute('material', 'transparent', true);
		  cursorEl.setAttribute('material', 'opacity', 0.0);
		}

		var emit = function (eventName, event) {
			// Fire events on intersected object and A-Frame cursor.
			var targetEl = event.target.el;
			if (cursorEl) cursorEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
			if (targetEl) targetEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
		} ;

		var cursordownObj = null;
		scene.addEventListener('cursordown', function(event) {
		  cursordownObj = event.target;
		  emit('mousedown', event);
		});

		scene.addEventListener('cursorup', function(event) {
		  emit('mouseup', event);
		  if (event.target.uuid === cursordownObj.uuid) {
			emit('click', event);
		  }
		  cursordownObj = null;
		});

		scene.addEventListener('cursorenter', function(event) {
		  if (!event.target.el) { return; }
		  event.target.el.addState('hovered');
		  if (cursorEl) cursorEl.addState('hovering');
		  emit('mouseenter', event);
		});

		scene.addEventListener('cursorleave', function(event) {
		  if (!event.target.el) { return; }
		  event.target.el.removeState('hovered');
		  if (cursorEl) cursorEl.removeState('hovering');
		  emit('mouseleave', event);
		});

	  },

	  initCollisionEvents: function () {

		var scene = this.el.object3D;

		var emit = function (eventName, event) {
			var targetEl = event.target.el;
			if (!targetEl) return;

			//remap target and other from object3Ds to aframe element
			event.target = targetEl;
			if (event.other && event.other.el) {
				event.other = event.other.el;
			}
			targetEl.emit(eventName, event);
		};

		scene.addEventListener('collisionenter', function (event) {
			emit('collisionenter', event);
		});

		scene.addEventListener('collisionexit', function (event) {
			emit('collisionexit', event);
		});

		scene.addEventListener('triggerenter', function (event) {
			emit('triggerenter', event);
		});

		scene.addEventListener('triggerexit', function (event) {
			emit('triggerexit', event);
		});

	  }

	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	(function(){

		function setColliderFlag(obj, state) {
			obj.userData.altspace = {collider: {enabled: state}};
			obj.traverse(function (obj) {
				if (obj instanceof THREE.Mesh) {
					obj.userData.altspace = {collider: {enabled: state}};
				}
			})
		}

		/**
		* Enable or disable cursor collision on the object.
		* @mixin altspace-cursor-collider
		* @memberof altspace
		* @prop {boolean} enabled=true - The state of the cursor collider.
		*/
		AFRAME.registerComponent('altspace-cursor-collider', {
			schema: { enabled: { default: true } },
			init: function () {
				setColliderFlag(this.el.object3D, this.data.enabled);
				this.el.addEventListener('model-loaded', (function(){
					setColliderFlag(this.el.object3D, this.data.enabled);
				}).bind(this));
			},
			update: function () {
				setColliderFlag(this.el.object3D, this.data.enabled);
			}
		});

	})();


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	* Enables tracked control support for A-Frame applications that use the built-in
	* `tracked-controls`, `vive-controls` or `hand-controls` components.
	* @mixin altspace-tracked-controls
	* @memberof altspace
	*/
	AFRAME.registerComponent('altspace-tracked-controls', {
	  init: function () {
		this.gamepadIndex = null;
		this.trackedControlsSystem = document.querySelector('a-scene').systems['tracked-controls'];
		this.systemGamepads = 0;
		altspace.getGamepads();
	  },
	  tick: function () {
		  if (
			this.trackedControlsSystem &&
			this.systemGamepads !== this.trackedControlsSystem.controllers.length &&
			window.altspace && altspace.getGamepads && altspace.getGamepads().length
		  ) {
			var components = this.el.components;
			if (components['paint-controls']) {
			  this.gamepadIndex = components['paint-controls'].data.hand === 'left' ? 2 : 1;
			}
			if (this.gamepadIndex === null && components['hand-controls']) {
			  this.gamepadIndex = components['hand-controls'].data === 'left' ? 2 : 1;
			}
			if (this.gamepadIndex === null && components['vive-controls']) {
			  this.gamepadIndex = components['vive-controls'].data.hand === 'left' ? 2 : 1;
			}
			if (this.gamepadIndex === null && components['tracked-controls']) {
			  this.gamepadIndex = components['tracked-controls'].data.controller;
			}
			this.el.setAttribute('tracked-controls', 'id', altspace.getGamepads()[this.gamepadIndex].id);
			this.el.setAttribute('tracked-controls', 'controller', 0);
			this.systemGamepads = this.trackedControlsSystem.controllers.length;
		  }
	  }
	});


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	/**
	* This set of components map to various objects and effects that are provided
	* natively by AltspaceVR. Your management of these objects may be limited to
	* some degree, but they will tend to be more performant than SDK equivalents,
	* or may provide some functionality not otherwise available to the SDK.
	* @namespace native
	*/
	(function () {

		var placeholderGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
		var placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
		placeholderMaterial.visible = false;
		var PlaceholderMesh = function () {
			THREE.Mesh.call( this, placeholderGeometry, placeholderMaterial );
		};
		PlaceholderMesh.prototype = Object.create( THREE.Mesh.prototype );
		PlaceholderMesh.prototype.constructor = THREE.PlaceholderMesh;

		function nativeComponentInit() {
			var mesh = this.el.getOrCreateObject3D('mesh', PlaceholderMesh);

			//If you attach native components to an entity, it will not use a default collider
			mesh.userData.altspace = mesh.userData.altspace || {};
			mesh.userData.altspace.collider = mesh.userData.altspace.collider || {};
			mesh.userData.altspace.collider.enabled = false;

			altspace.addNativeComponent(mesh, this.name);
			this.update(this.data);//to pass defaults
		}
		function nativeComponentRemove() {
			var mesh = this.el.getObject3D('mesh');
			altspace.removeNativeComponent(mesh, this.name);
		}
		function nativeComponentUpdate(oldData) {
			altspace.updateNativeComponent(this.el.object3DMap.mesh, this.name, this.data);
		}

		function callComponent(functionName, functionArguments) {
			altspace.callNativeComponent(this.el.object3DMap.mesh, this.name, functionName, functionArguments)
		}

		/**
	    * Attach a given native object to this entity.
	    * @mixin n-object
		* @memberof native
	    * @prop {string} res - The identifier for the resource you want. This component
		* can accept all resources except for `interactables`.
	    * @example <a-entity n-object='res:architecture/wall-4w-4h'></a-entity>
	    */
		AFRAME.registerComponent('n-object', {
			schema: {
				res: {type: 'string'}
			},
			init: nativeComponentInit,
			update: nativeComponentUpdate,
			remove: nativeComponentRemove
		});

		/**
	    * Create an object that spawns additional copies of itself when grabbed by a user (the copies are not spawners themselves).
		* These copies will be physically interactive and automatically synchronized
		* between users.
	    * @mixin n-spawner
		* @memberof native
	    * @prop {string} res - The identifier for the resource you want. This component
		* can only accept resources of type `interactables`.
	    * @example <a-entity n-spawner='res: interactables/basketball'></a-entity>
	    */
		AFRAME.registerComponent('n-spawner', {
			schema: {
				res: {type: 'string'}
			},
			init: nativeComponentInit,
			update: nativeComponentUpdate,
			remove: nativeComponentRemove
		});

		/**
	    * Creates dynamic 2D text on the entity. The text will wrap automatically based on the width and height provided.
	    * This text will be clearer than texture-based text and more performant than geometry-based test.
	    * @mixin n-text
		* @memberof native
	    * @prop {string} text - The text to be drawn.
	    * @prop {number} fontSize=10 - The height of the letters. 10pt ~= 1m
	    * @prop {number} width=10 - The width of the text area in meters. If the
	    * text is wider than this value, the overflow will be wrapped to the next line.
	    * @prop {number} height=1 - The height of the text area in meters. If the
	    * text is taller than this value, the overflow will be cut off.
	    * @prop {string} horizontalAlign=middle - The horizontal anchor point for
	    * the text. Can be `left`, `middle`, or `right`.
	    * @prop {string} verticalAlign=middle - The vertical anchor point for the
	    * text. Can be `top`, `middle`, or `bottom`.
	    */
		AFRAME.registerComponent('n-text', {
			init: nativeComponentInit,
			update: nativeComponentUpdate,
			remove: nativeComponentRemove,
			schema: {
				text: { default: '', type: 'string' },
				/*color: { default: 'white',
					parse: function(value) {
						return parseFloat(value, 10);
					},
					stringify: function(value) {
						return value.toString();
					}},*/
				fontSize: { default: '10', type: 'int' },//roughly a meter tall
				width: { default: '10', type: 'number' },//in meters
				height: { default: '1', type: 'number' },//in meters
				horizontalAlign: { default: 'middle'},
				verticalAlign: { default: 'middle'}
			}
		});

		//object: collides against: objects / enviroment / cursor
		//environment: can be teleported onto, and collides against: objects / environment / cursor
		//hologram: collides against: cursor / holograms

		/**
		* Abstract base class for {@link n.n-sphere-collider}, {@link n.n-box-collider},
		* {@link n.n-capsule-collider}, and {@link n.n-mesh-collider}. You cannot use
		* this class directly, but instead you should add one of those components
		* to your objects.
		* @name n-collider
		* @mixin n-collider
		* @memberof native
	    * @prop {vec3} center=0,0,0 - The offset of the collider in local space.
		* @prop {string} type=hologram - The type of collider, one of: `object` | `environment` | `hologram`.
		* Object colliders collide with other objects, the environment, and the cursor.
		* Environment colliders collide with everything objects do, but you can also
		* teleport onto them. Hologram colliders only collide with other holograms and
		* the cursor.
		*/

	    /**
	    * Create a spherical collider on this entity.
	    * @mixin n-sphere-collider
		* @memberof native
		* @extends native.n-collider
	    * @prop {number} radius=1 - The size of the collider in meters.
	    */
		AFRAME.registerComponent('n-sphere-collider', {
			init:nativeComponentInit,
			remove: nativeComponentRemove,
			update: nativeComponentUpdate,
			schema: {
				isTrigger: { default: false, type: 'boolean' },
				center: { type: 'vec3' },
				radius: { default: '0', type: 'number' },
				type: {default: 'object'}
			}
		});


		/**
	    * Create a box-shaped collider on this entity.
	    * @mixin n-box-collider
		* @memberof native
		* @extends native.n-collider
	    * @prop {vec3} size=1,1,1 - The dimensions of the collider.
	    */
		AFRAME.registerComponent('n-box-collider', {
			init:nativeComponentInit,
			remove: nativeComponentRemove,
			update: nativeComponentUpdate,
			schema: {
				isTrigger: { default: false, type: 'boolean' },
				center: { type: 'vec3' },
				size: { type: 'vec3' },
				type: {default: 'object'}
			}
		});

		/**
	    * Create a capsule-shaped collider on this entity. Capsules
	    * are a union of a cylinder and two spheres on top and bottom.
	    * @mixin n-capsule-collider
		* @memberof native
		* @extends native.n-collider
	    * @prop {number} radius=1 - The radius of the capsule in meters.
	    * @prop {number} height=1 - The height of the shaft of the capsule in meters.
	    * @prop {string} direction=y - The axis with which the capsule is aligned.
	    * One of `x`, `y`, or `z`.
	    */
		AFRAME.registerComponent('n-capsule-collider', {
			init:nativeComponentInit,
			remove: nativeComponentRemove,
			update: nativeComponentUpdate,
			schema: {
				isTrigger: { default: false, type: 'boolean' },
				center: { type: 'vec3' },
				radius: { default: '0', type: 'number' },
				height: { default: '0', type: 'number' },
				direction: { default: 'y' },
				type: {default: 'object'}
			}
		});

		/**
	    * Enable collision for the entire attached mesh. This is expensive to evaluate, so should only be used on
	    * low-poly meshes.
	    * @mixin n-mesh-collider
		* @memberof native
		* @extends native.n-collider
	    * @example <a-box n-mesh-collider></a-box>
	    */
		AFRAME.registerComponent('n-mesh-collider', {
			init:nativeComponentInit,
			remove: nativeComponentRemove,
			update: nativeComponentUpdate,
			schema: {
				isTrigger: { default: false, type: 'boolean' },
				convex: { default: true, type: 'boolean' },
				type: {default: 'object'}
			}
		});

		/**
	    * Make the object's +Z always face the viewer. Currently will only directly apply to main mesh or native component on the attached entity, not any children or submeshes.
	    * @mixin n-billboard
		* @memberof native
	    * @example <a-plane n-billboard></a-plane>
	    */
		AFRAME.registerComponent('n-billboard', {
			init:nativeComponentInit,
			remove: nativeComponentRemove,
		});

		/**
	    * A container keeps a running tally of how many objects are within
	    * its bounds, and adds and removes the states `container-full` and
		* `container-empty` based on the current count of objects. Can fire three
		* special events: `container-full`, `container-empty`, and `container-count-changed`.
	    * @mixin n-container
		* @memberof native
	    * @prop {number} capacity=4 - The value at which the container will fire the
	    * `container-full` event.
	    */
		AFRAME.registerComponent('n-container', {
			init: function(){
				nativeComponentInit.call(this);

				var el = this.el;
				var component = this;

				el.addEventListener('stateadded', function(event){
					if(event.detail.state === 'container-full'){
						el.emit('container-full');
					}
					if(event.detail.state === 'container-empty'){
						el.emit('container-empty');
					}
				});

				el.addEventListener('container-count-changed', function(event){
					component.count = event.detail.count;
				});
			},
			remove: nativeComponentRemove,
			update: nativeComponentUpdate,
			schema: {
				capacity: { default: 4, type: 'number' },
			}
		});

	    /**
	    * Play the sound given by the `src` or `res` property from the location
		* of the entity.
	    * @mixin n-sound
		* @memberof native
	    * @prop {string} res - The resource identifier for a built-in sound clip.
		* @prop {string} src - A URL to an external sound clip.
		* @prop {string} on - The name of the event that will play this sound clip.
		* @prop {boolean} loop=false - Tells the clip to loop back to the beginning of the clip
		* once it's finished.
		* @prop {boolean} autoplay=false - Tells the clip to start automatically when
		* the scene loads, instead of waiting for `playSound()`.
		* @prop {boolean} oneshot=false - Tells the clip to clean itself up when it
		* finishes playing. Allows for overlapping instances of the sound.
		* @prop {number} volume=1 - The volume of the clip, from [0,1].
		* @prop {number} spatialBlend=1 - How spatialized a sound is, from [0,1].
		* A value of 1 will be fully localized, and the sound will pan left and
		* right as you turn your head. A value of 0 makes it non-spatialized, and
		* it will always be heard in both ears.
		* @prop {number} pitch=1 - The speed multiplier for the sound. 0.5 is one
		* octave down, and 2 is one octave up.
		* @prop {number} minDistance=1 - Inside this distance in meters,
		* the sound volume is at full volume.
		* @prop {number} maxDistance=12 - Beyond this distance in meters, the sound
		* will rapidly fall off to silence.

	    */
		AFRAME.registerComponent('n-sound', {
			init: function () {
				var src = this.data.src;
				if (src && !src.startsWith('http')) {
					if (src.startsWith('/')) {
						this.data.src = location.origin + src;
					}
					else {
						var currPath = location.pathname;
						if (!currPath.endsWith('/')) {
							currPath = location.pathname.split('/').slice(0, -1).join('/') + '/';
						}
						this.data.src = location.origin + currPath + src;
					}
				}
				nativeComponentInit.call(this);
			},

			/**
			* Stop the playing sound, and preserve position in clip.
			* @method native.n-sound#pauseSound
			*/
			pauseSound: function () {
				callComponent.call(this, 'pause');
				this.el.emit('sound-paused');
			},

			/**
			* Start the sound playing.
			* @method native.n-sound#playSound
			*/
			playSound: function () {
				callComponent.call(this, 'play');
				this.el.emit('sound-played');
			},

			/**
			* Jump to a position in the clip.
			* @method native.n-sound#seek
			* @param {number} time - The time in milliseconds to jump to.
			*/
			seek: function (time) {
				callComponent.call(this, 'seek', {time: time});
			},
			remove: function () {
				nativeComponentRemove.call(this);
				if (this.playHandler) {
				  this.el.removeEventListener(oldData.on, this.playHandler);
				}
			},
			update: function (oldData) {
				nativeComponentUpdate.call(this, oldData);
				if (this.playHandler) {
				  this.el.removeEventListener(oldData.on, this.playHandler);
				}
				if (this.data.on) {
				  this.playHandler = this.playSound.bind(this);
				  this.el.addEventListener(this.data.on, this.playHandler);
				}
			},
			schema: {
				on: { type: 'string' },
				res: { type: 'string' },
				src: { type: 'string' },
				loop: { type: 'boolean' },
				volume: { type: 'number', default: 1 },
				autoplay: { type: 'boolean' },
				oneshot: { type: 'boolean' },
				spatialBlend: { type: 'float', default: 1 },
				pitch: { type: 'float', default: 1 },
				minDistance: { type: 'float', default: 1 },
				maxDistance: { type: 'float', default: 12 },
			}
		});

	})();


/***/ },
/* 5 */
/***/ function(module, exports) {

	// this file is just for good measure. didn't want native-components getting too cluttered.

	/**
	* This namespace describes strings that are valid inputs to the various native
	* components. Some components can only take certain types of resources, i.e.
	* {@link n.n-spawner} can only accept `interactables`.
	* @namespace resources
	* @example <a-entity n-object='res: architecture/ceiling-2w-2l'></a-entity>
	*/

	/**
	* Generic modular building pieces. All pieces are aligned to one corner, such that
	* the piece extends out toward -X and +Z.
	* @name architecture
	* @enum architecture
	* @memberof resources
	*
	* @prop ceiling-2w-2l
	* @prop ceiling-4w-4l
	* @prop ceiling-4w-4l
	* @prop ceiling-skylight-4w-4l
	* @prop ceiling-skylight-corner-2w-2l
	* @prop ceiling-skylight-edge-2w
	* @prop ceiling-skylight-edge-4w
	* @prop ceiling-skylight-filler-4w-4l-2
	* @prop ceiling-skylight-filler-4w-4l
	* @prop ceiling-slice-concave-2r
	* @prop ceiling-slice-concave-4r
	* @prop ceiling-slice-convex-2r
	* @prop ceiling-slice-convex-4r
	* @prop door-4w-4h
	* @prop floor-2w-2l
	* @prop floor-2w-4l
	* @prop floor-4w-2l
	* @prop floor-4w-4l
	* @prop floor-slice-concave-2r
	* @prop floor-slice-concave-4r
	* @prop floor-slice-convex-2r
	* @prop floor-slice-convex-4r
	* @prop railing-2l
	* @prop railing-4l
	* @prop railing-curve-concave-2r
	* @prop wall-2w-4h
	* @prop wall-4w-4h
	* @prop wall-base-2w
	* @prop wall-base-4w
	* @prop wall-base-curve-concave-2r
	* @prop wall-base-curve-concave-4r
	* @prop wall-base-curve-convex-2r
	* @prop wall-base-curve-convex-4r
	* @prop wall-bulkhead-2w
	* @prop wall-bulkhead-4w
	* @prop wall-bulkhead-curve-concave-2r
	* @prop wall-bulkhead-curve-concave-4r
	* @prop wall-bulkhead-curve-convex-2r
	* @prop wall-bulkhead-curve-convex-4r
	* @prop wall-curve-concave-2r-4h
	* @prop wall-curve-concave-4r-4h
	* @prop wall-curve-convex-2r-4h
	* @prop wall-curve-convex-4r-4h
	* @prop wall-curve-window-concave-4r-4h
	* @prop wall-curve-window-concave-filler-4r-4h
	* @prop wall-curve-window-gap-concave-4r-4h
	* @prop wall-curve-window-gap-end-l-concave-4r-4h
	* @prop wall-curve-window-gap-end-r-concave-4r-4h
	* @prop wall-filler-corner-inner-4h
	* @prop wall-filler-corner-outer-4h
	* @prop wall-window-4w-4h
	* @prop wall-window-filler-2
	* @prop wall-window-gap-2w-4h
	* @prop wall-window-gap-4w-4h
	* @prop wall-window-gap-end-l-2w-4h
	* @prop wall-window-gap-end-l-4w-4h
	* @prop wall-window-gap-end-r-2w-4h
	* @prop wall-window-gap-end-r-4w-4h
	*/

	/**
	* Particle systems and other native effects
	* @name effects
	* @enum effects
	* @memberof resources
	*
	* @prop explosion - A particle system with a central flash, then debris flying outward.
	* This is a non-looping effect.
	* @prop fire - An animated fire particle, suitable for a torch.
	* @prop fire-trail - Fire that trails the entity through space as it moves. Only is visible while an object is in motion
	* @prop fireworks - A compound particle system that shoots up from the entity,
	* explodes into colored sparks, then transitions to gold streamers.
	* @prop smoke - Billowing smoke particle system.
	* @prop sparkler - Emits sparks in all directions
	* @prop steam - Small white steam rising upwards
	*/

	/**
	* Objects that can be picked up, thrown, and otherwise interacted with.
	* @name interactables
	* @enum interactables
	* @memberof resources
	*
	* @prop basketball
	* @prop bowlingball
	* @prop bowling-pin
	* @prop box
	* @prop coin
	* @prop gem
	* @prop ring
	* @prop soccerball
	*/

	/**
	* Static models that you can place in your scene.
	* @name objects
	* @enum objects
	* @memberof resources
	*
	* @prop basketball-hoop
	* @prop coin
	* @prop cup
	* @prop gem
	* @prop hoop
	* @prop ring
	* @prop target-archery
	*/

	/**
	* A selection of pipes/chutes/etc.
	* @name pipes
	* @enum pipes
	* @memberof resources
	*
	* @prop pipe-full-cap-1d
	* @prop pipe-full-cross-1d
	* @prop pipe-full-elbow-1d
	* @prop pipe-full-fork-1d
	* @prop pipe-full-straight-1d-1l
	* @prop pipe-full-straight-1d-2l
	* @prop pipe-full-straight-1d-4l
	* @prop pipe-full-tee-1d
	* @prop pipe-half-cap-1d
	* @prop pipe-half-cross-1d
	* @prop pipe-half-elbow-1d
	* @prop pipe-half-fork-1d
	* @prop pipe-half-straight-1d-1l
	* @prop pipe-half-straight-1d-2l
	* @prop pipe-half-straight-1d-4l
	* @prop pipe-half-tee-1d
	*/

	/**
	* Stock UI elements you can use in your apps.
	* @name ui
	* @enum ui
	* @memberof resources
	*
	* @prop altspacevr-logo - An image with the AltspaceVR logo
	* @prop error - A sound clip indicating an error occurred.
	* @prop select - A sound clip indicating a select action.
	* @prop toggle - A sound clip indicating a toggle action.
	* @prop click - A sound clip indicating a click action.
	* @prop complete - A sound clip indicating completion.
	* @prop notify - A sound clip indicating a notification.
	* @prop success - A sound clip indicating success.
	* @prop over - A sound clip indicating the experience is over.
	*/

	/*
	* Stock sound files for your apps, including UI, foley, and effects.
	* @name sfx
	* @enum sfx
	* @memberof resources
	*
	* UI
	* This universal UI pack can be used for a general UI.
	* @prop sfx/ui/UI_Back.wav - A simple beep for navigating a menu in reverse.
	* @prop sfx/ui/UI_Cant_Do.wav - Designed to notify that a user cannot do something.
	* @prop sfx/ui/UI_Click_1.wav - A simple sound for clicking or selecting.
	* @prop sfx/ui/UI_Click_2.wav - Another simple sound for clicking or selecting.
	* @prop sfx/ui/UI_Confirm.wav - A cheerful confirm sound for menu's or game actions.
	* @prop sfx/ui/UI_Confirm.wav - Another cheerful confirm sound for menu's or game actions.
	*
	* Tech UI is designed for more modern or futuristic games
	* @prop sfx/ui/Tech_UI_Cant_Do.wav - Notify a user that they cannot do something.
	* @prop sfx/ui/Tech_UI_Click.wav - A modern click sound.
	* @prop sfx/ui/Tech_UI_Confirm.wav - A modern confirm sound.
	* @prop sfx/ui/Tech_UI_Confirm_2.wav - A more cheerful modern confirm sound
	* @prop sfx/ui/Tech_UI_Low_Notify.wav - A bass-heavy tone, designed with a notification in mind.
	* @prop sfx/ui/Tech_UI_Low_Success.wav - A bass-heavy success tone, to be used for items or user-completion.
	* @prop sfx/ui/Tech_UI_Notify.wav- A third notify sound for in game or UI.
	* @prop sfx/ui/Tech_UI_CoinPickup.wav- A sound used for when a user picks up a coin, or wins something.
	*
	* Foley
	* Foley sounds are real sounds designed for tangible, touchable objects as they are heard in the real world.
	* @prop sfx/foley/realFX_Box_Clank.wav - A sound for a box place-down.
	* @prop sfx/foley/realFX_Box_Shuffle.wav A sound for a box slide.
	* @prop sfx/foley/realFX_Box_Shuffle_2.wav A second sound for a box slide.
	* @prop sfx/foley/realFX_Coin_Box.wav - A sound for a coin box or metal pickup.
	* @prop sfx/foley/realFX_Metal_Shuffle.wav - A sound for a metal box slide.
	* @prop sfx/foley/realFX_Paper_Shuffle.wav - A sound for the shuffling of paper.
	* @prop sfx/foley/realFX_Plastic_Shuffle.wav - A plastic scuttle sound, could also be used for a reload sound.
	* @prop sfx/foley/tactile_Click.wav - A sound for a realistic button.
	* @prop sfx/foley/tactile_Click_2.wav - A sound for a second realistic button.
	*
	* Effects
	* Various sound effects for a variety of use cases.
	* @prop sfx/effects/HaH_Fanfare.wav - The "success!" sound from Holograms Against Humanity.
	* @prop sfx/effects/HaH_Game_Start.wav - The "Game has started!" sound from HaH.
	* @prop sfx/effects/HaH_Kick.wav - The "Player has been kicked" sound from HaH.
	* @prop sfx/effects/HaH_New_Player.wav - The sound used in HaH when a player joins the game.
	* @prop sfx/effects/Sad_Crowd.wav - A fun sound used in HaH for when a player wins, used ironically.
	* @prop sfx/effects/SFX/Explosion.wav - An explosion sound to be used for large artillery or weapons.
	* @prop sfx/Timer_10Sec.wav - a 10 second timer that triggers a bell at exactly 10 seconds. The bell lasts for 2 seconds. This allows for timer length changes.
	*/


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	* Enables the synchronization of properties of entities. All property sync components
	* require both a {@link sync.sync-system} on `a-scene`, and a {@link sync.sync}
	* on the entity to be synced.
	* @name sync
	* @namespace sync
	* @example
	* <a-scene sync-system='app: example sync; author: altspacevr'>
	*   <a-entity sync='ownOn: cursordown' sync-color></a-entity>
	* </a-scene>
	*/



	/**
	* Enables the synchronization of properties of the entity. Must be used in
	* conjuction with the {@link sync.sync-system} component and a component for a
	* specific property (e.g. {@link sync.sync-transform}).
	* @memberof sync
	* @mixin sync
	* @prop {string} ownOn - The name of the event, or a list of events, that
	* will cause the local client to take ownership of this object. This field
	* cannot be updated after initialization.
	*/
	AFRAME.registerComponent('sync',
	{
		schema: {
			mode: { default: 'link' },
			ownOn: { type: 'string' } //cannot be changed after creation
		},
		init: function () {
			var scene = document.querySelector('a-scene');
			var syncSys = scene.systems['sync-system'];

			var ref;
			var key;
			var dataRef;
			var ownerRef;
			var ownerId;
			var isMine = false;

			var component = this;

			component.isConnected = false;

			if(syncSys.isConnected) start(); else scene.addEventListener('connected', start);


			if(component.data.ownOn)
			{
				var ownershipEvents = component.data.ownOn.split(/[ ,]+/);
				for(var i = 0, max = ownershipEvents.length; i < max; i++){
					component.el.addEventListener(ownershipEvents[i], function(){
						if(component.isConnected){
							component.takeOwnership();
						}
					});
				}
			}

			function start(){
				//Make sure someone always owns an object. If the owner leaves and we are the master client, we will take it.
				//This ensures, for example, that synced animations keep playing
				scene.addEventListener('clientleft', function(event){
					var shouldTakeOwnership = (!ownerId || ownerId === event.detail.id) && syncSys.isMasterClient;

					if(shouldTakeOwnership) component.takeOwnership();
				});

				if (component.data.mode === 'link') {
					var id = component.el.id;
					if (!id) {
						console.error('Entities cannot be synced using link mode without an id.');
						return;
					}

					console.log('syncSys: ' + syncSys);
					console.log('syncSys.sceneRef: ' + syncSys.sceneRef);

					link(syncSys.sceneRef.child(id));
					setupReceive();

				} else {
					console.error('Unsupported sync mode: ' + component.data.mode);
					return;
				}

				component.isConnected = true;
				component.el.emit('connected', null, false);
			}

			function link(entityRef) {
				ref = entityRef;
				key = ref.key();
				dataRef = ref.child('data');
				component.dataRef = dataRef;
				ownerRef = ref.child('owner');
			}

			function setupReceive() {

				//if nobody has owned the object yet, we will.
				ownerRef.transaction(function (owner) {
					if (owner) return undefined;

					ownerRef.onDisconnect().set(null);
					return syncSys.clientId;
				});

				ownerRef.on('value',
					function(snapshot) {
						var newOwnerId = snapshot.val();

						var gained = newOwnerId === syncSys.clientId && !isMine;
						if (gained) component.el.emit('ownershipgained', null, false);


						//note this also fires when we start up without ownership
						var lost = newOwnerId !== syncSys.clientId && isMine;
						if (lost){
							component.el.emit('ownershiplost', null, false);

							//we no longer have to clear our ownership when we disconnect
							ownerRef.onDisconnect().cancel();
						}

						ownerId = newOwnerId;

						isMine = newOwnerId === syncSys.clientId;
					});
			}

			/**
			* Tell sync to start pushing local property values instead of updating
			* local from remote values.
			* @method sync.sync#takeOwnership
			*/
			component.takeOwnership = function() {
				ownerRef.set(syncSys.clientId);

				//clear our ownership if we disconnect
				//this is needed if we are the last user in the room, but we expect people to join later
				ownerRef.onDisconnect().set(null);
			}

			/**
			* Indicates whether the sync ownership is yours.
			* @member sync.sync#isMine
			* @readonly
			*/
			Object.defineProperty(component, 'isMine', {
				get: function () {
					return isMine;//TODO: Should this be state instead?
				}
			});
		}
	});


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	* Connect to a remote Firebase server, and facilitate synchronization. These
	* options correspond exactly with the configuration options for
	* [altspace.utilities.sync.connect]{@link http://altspacevr.github.io/AltspaceSDK/doc/module-altspace_utilities_sync.html#.connect}.
	* This component must be present on `a-scene` for any other sync components to work.
	* @memberof sync
	* @mixin sync-system
	* @prop {string} author - A unique identifier for you or your organization.
	* @prop {string} app - The name of the app.
	* @prop {string} refUrl - Override the base reference. Set this to use your own Firebase.
	* @prop {string} instance - Override the instance ID. Can also be overridden with
	* a URL parameter.
	*/
	AFRAME.registerSystem('sync-system',
	{
		schema: {
			author: { type: 'string', default: null },
			app: { type: 'string', default: null },
			instance: { type: 'string', default: null },
			refUrl: { type: 'string', default: null }
		},
		init: function() {
			var component = this;

			if(!this.data || !this.data.app){
				console.warn('The sync-system must be present on the scene and configured with required data.');
				return;
			}

			component.isConnected = false;
			console.log(this.data);
			altspace.utilities.sync.connect({
				authorId: this.data.author,
				appId: this.data.app,
				instanceId: this.data.instance,
				baseRefUrl: this.data.refUrl
			}).then(function(connection) {
				this.connection = connection;

				this.sceneRef = this.connection.instance.child('scene');
				this.clientsRef = this.connection.instance.child('clients');

				// temporary way of having unique identifiers for each client
				this.clientId = this.sceneEl.object3D.uuid;
				var masterClientId;
				this.clientsRef.on("value", function (snapshot) {
					var clientIds = snapshot.val();

					var masterClientKey = Object.keys(clientIds)[0];
					masterClientId = clientIds[masterClientKey];
				});

				this.clientsRef.on('child_added', function(childSnapshot) {
					var joinedClientId = childSnapshot.val();
					//let the master client flag get set first
					setTimeout(function(){
						component.sceneEl.emit('clientjoined', {id: joinedClientId}, false);
					}, 0);
				});

				this.clientsRef.on('child_removed', function(childSnapshot) {
					var leftClientId = childSnapshot.val();
					//let the master client flag get set first
					setTimeout(function(){
						component.sceneEl.emit('clientleft', {id: leftClientId}, false);
					}, 0);
				});

				// add our client ID to the list of connected clients,
				// but have it be automatically removed by firebase if we disconnect for any reason
				this.clientsRef.push(this.clientId).onDisconnect().remove();


				this.connection.instance.child('initialized').once('value', function (snapshot) {
					var shouldInitialize = !snapshot.val();
					snapshot.ref().set(true);

					component.sceneEl.emit('connected', { shouldInitialize: shouldInitialize }, false);
					component.isConnected = true;
				}.bind(this));


				Object.defineProperty(this, 'isMasterClient', {
					get: function () { return masterClientId === this.clientId; }.bind(this)
				});
			}.bind(this));
		}
	});


/***/ },
/* 8 */
/***/ function(module, exports) {

	//TODO: We need to figure out a way to recieve our first update without caring about ownership.
	// firstValue is probably not the right way to go, probably something about having sent yet. Need to change for both

	/**
	* Synchronize the position, rotation, and scale of this object with all clients.
	* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
	* {@link sync.sync} component on the target entity.
	* @mixin sync-transform
	* @memberof sync
	*/
	AFRAME.registerComponent('sync-transform',
	{
		dependencies: ['sync'],
		schema: {
		},
		init: function () {
			var component = this;
			var sync = component.el.components.sync;
			if(sync.isConnected) start(); else component.el.addEventListener('connected', start);

			function start(){

				var positionRef = sync.dataRef.child('position');
				var rotationRef = sync.dataRef.child('rotation');
				var scaleRef = sync.dataRef.child('scale');

				component.updateRate = 100;

				var stoppedAnimations = [];
				//pause all animations on ownership loss
				component.el.addEventListener('ownershiplost', function() {
					var children = component.el.children;
					for (var i = 0; i < children.length; i++) {
						var tagName = children[i].tagName.toLowerCase();
						if (tagName === "a-animation") {
							stoppedAnimations.push(children[i]);
							children[i].stop();
						}
					}
				});
				component.el.addEventListener('ownershipgained', function () {
					for (var i = 0; i < stoppedAnimations.length; i++) {
						var animation = stoppedAnimations[i];
						animation.start();
					}
					stoppedAnimations = [];
				});

				function onTransform(snapshot, componentName) {
					if (sync.isMine) return;

					var value = snapshot.val();
					if (!value) return;

					component.el.setAttribute(componentName, value);
				}

				positionRef.on('value', function (snapshot) {
					onTransform(snapshot, 'position');
				});

				rotationRef.on('value', function (snapshot) {
					onTransform(snapshot, 'rotation');
				});

				scaleRef.on('value', function (snapshot) {
					onTransform(snapshot, 'scale');
				});

				var sendPosition = throttle(function(value){
					positionRef.set(value);
				}, component.updateRate);

				var sendRotation = throttle(function(value){
					rotationRef.set(value);
				}, component.updateRate);

				var sendScale = throttle(function(value){
					scaleRef.set(value);
				}, component.updateRate);

				function onComponentChanged(event){
					if (!sync.isMine) return;

					var name = event.detail.name;
					var newData = event.detail.newData;

					if (name === 'position') {
						sendPosition(newData);
					} else if (name === 'rotation') {
						sendRotation(newData);
					} else if (name === 'scale') {
						sendScale(newData);
					} else {
						return;
					}

				}

				//from underscore.js
				function throttle(func, wait, options) {
					var timeout, context, args, result;
					var previous = 0;
					if (!options) options = {};

					var later = function() {
					  previous = options.leading === false ? 0 : Date.now();
					  timeout = null;
					  result = func.apply(context, args);
					  if (!timeout) context = args = null;
					};

					var throttled = function() {
					  var now = Date.now();
					  if (!previous && options.leading === false) previous = now;
					  var remaining = wait - (now - previous);
					  context = this;
					  args = arguments;
					  if (remaining <= 0 || remaining > wait) {
						if (timeout) {
						  clearTimeout(timeout);
						  timeout = null;
						}
						previous = now;
						result = func.apply(context, args);
						if (!timeout) context = args = null;
					  } else if (!timeout && options.trailing !== false) {
						timeout = setTimeout(later, remaining);
					  }
					  return result;
					};

					throttled.cancel = function() {
					  clearTimeout(timeout);
					  previous = 0;
					  timeout = context = args = null;
					};

					return throttled;
				  };


				component.el.addEventListener('componentchanged', onComponentChanged);
			}
		}
	});


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	* Sync the color property of the object between clients.
	* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
	* {@link sync.sync} component on the target entity.
	* @mixin sync-color
	* @memberof sync
	*/
	AFRAME.registerComponent('sync-color',
	{
		dependencies: ['sync'],
		schema: {
		},
		init: function () {
			var component = this;
			var sync = component.el.components.sync;
			if(sync.isConnected) start(); else component.el.addEventListener('connected', start);

			function start(){
				var colorRef = sync.dataRef.child('material/color');

				var refChangedLocked = false;

				var firstValue = true;

				component.el.addEventListener('componentchanged', function (event) {
					var name = event.detail.name;
					var oldData = event.detail.oldData;
					var newData = event.detail.newData;

					if (name !== 'material') return;
					if (refChangedLocked) return;

					if (oldData.color !== newData.color) {
						if(sync.isMine){
							setTimeout(function() {//For some reason A-Frame has a misconfigured material reference if we do this too early
								colorRef.set(newData.color);
							}, 0);
						}
					}
				});

				colorRef.on('value', function (snapshot) {
					if (sync.isMine && !firstValue) return;
					var color = snapshot.val();

					refChangedLocked = true;
					component.el.setAttribute('material', 'color', color);
					refChangedLocked = false;

					firstValue = false;
				});
			}
		}
	});


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	* Synchronize the playback state of an {@link n.n-sound} component between clients.
	* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
	* {@link sync.sync} component on the target entity.
	* @mixin sync-n-sound
	* @memberof sync
	*/
	AFRAME.registerComponent('sync-n-sound',
	{
		dependencies: ['sync'],
		schema: { },
		init: function () {
			var component = this;
			var sync = component.el.components.sync;
			var scene = document.querySelector('a-scene');
			var syncSys = scene.systems['sync-system'];
			if(sync.isConnected) start(); else component.el.addEventListener('connected', start);

			function start(){
				component.soundStateRef = sync.dataRef.child('sound/state');
				component.soundEventRef = sync.dataRef.child('sound/event');

				function sendEvent(event) {
					if (!sync.isMine) return;
					var event = {
						type: event.type,
						sender: syncSys.clientId,
						el: component.el.id,
						time: Date.now()
					};
					component.soundEventRef.set(event);
				}

				component.el.addEventListener('sound-played', sendEvent);
				component.el.addEventListener('sound-paused', sendEvent);

				component.soundEventRef.on('value', function (snapshot) {
					if (sync.isMine) return;
					var event = snapshot.val();
					if (!event) return;
					if (event.el === component.el.id) {
						var sound = component.el.components['n-sound'];
						if (event.type === 'sound-played') {
							sound.playSound();
						}
						else {
							sound.pauseSound();
						}
					}
				});

				component.el.addEventListener('componentchanged', function (event) {
					if (!sync.isMine) return;
					var name = event.detail.name;
					if (name !== 'n-sound') return;
					component.soundStateRef.set(event.detail.newData);
				});

				component.soundStateRef.on('value', function (snapshot) {
					if (sync.isMine) return;
					var state = snapshot.val();
					if (!state) return;
					component.el.setAttribute('n-sound', state);
				});
			}
		},
		remove: function () {
			this.soundStateRef.off('value');
			this.soundEventRef.off('value');
		}
	});


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * The wire component allows you to trigger an event on another entity when an event occurs on an entity
	 * @mixin wire
	 * @property {string} on Name of an event to listen to
	 * @property {string} gained Name of a state to watch for
	 * @property {string} lost Name of a state to watch for
	 * @property {string} emit Name of an event to trigger on the targets
	 * @property {string} gain Name of a state to add on the target
	 * @property {string} lose Name of a state to remove on the target
	 * @property {selector} targets A selector to pick which objects to wire to
	 **/
	AFRAME.registerComponent('wire',
	{
		multiple: true,
		schema: {
			on: {type: 'string'},
			emit: {type: 'string'},
			gained: {type: 'string'},
			lost: {type: 'string'},
			gain: {type: 'string'},
			lose: {type: 'string'},
			targets: {type: 'selectorAll'}
		},
		update: function (oldData) {
			if (oldData.on) {
				this.el.removeEventListener(oldData.on, this.actOnTargets);
			}
			if (oldData.gained) {
				this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
			}
			if (oldData.lost) {
				this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
			}

			this.actOnTargets = function () {
				this.data.targets.forEach(function (el) {
					if (this.data.emit) {
						el.emit(this.data.emit);
					}
					if (this.data.gain) {
						el.addState(this.data.gain);
					}
					if (this.data.lose) {
						el.removeState(this.data.lose);
					}
				}.bind(this));
			}.bind(this);

			this.actOnTargetsIfStateMatches = function (event) {
				var state = event.detail.state;
				if (state === this.data.gained || state === this.data.lost) {
					this.actOnTargets();
				}
			}.bind(this);

			if (this.data.on) {
				this.el.addEventListener(this.data.on, this.actOnTargets);
			}
			if (this.data.gained) {
				this.el.addEventListener('stateadded', this.actOnTargetsIfStateMatches);
			}
			if (this.data.lost) {
				this.el.addEventListener('stateremoved', this.actOnTargetsIfStateMatches);
			}
		},
		remove: function () {
			this.el.removeEventListener(this.data.on, this.actOnTargets);
			this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
			this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
		}
	});


/***/ }
/******/ ]);