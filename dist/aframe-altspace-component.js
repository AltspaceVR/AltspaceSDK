/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);


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
	*   <script src="https://cdn.rawgit.com/AltspaceVR/aframe-altspace-component/v1.3.2/dist/aframe-altspace-component.min.js"></script>
	* </head>
	* <body>
	*   <a-scene altspace>
	*     <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
	*   </a-scene>
	* </body>
	*/
	AFRAME.registerComponent('altspace', {
	  version: '1.3.2',
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
	   * Called on every single tick or render loop of the scene.
	   */
	  tick: function (t, dt) {
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
		if (!window.altspace || !altspace.inClient) {
			var noop = function () {};
			window.altspace = {
				addNativeComponent: noop,
				updateNativeComponent: noop,
				removeNativeComponent: noop
			};
		}
	
		var placeholderGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
		var placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
		placeholderMaterial.visible = false;
		var PlaceholderMesh = function () {
			THREE.Mesh.call( this, placeholderGeometry, placeholderMaterial );
		};
		PlaceholderMesh.prototype = Object.create( THREE.Mesh.prototype );
		PlaceholderMesh.prototype.constructor = THREE.PlaceholderMesh;
	
		function meshInit(mesh) {
			//If you attach native components to an entity, it will not use a default collider
			mesh.userData.altspace = mesh.userData.altspace || {};
			mesh.userData.altspace.collider = mesh.userData.altspace.collider || {};
			mesh.userData.altspace.collider.enabled = false;
	
			altspace.addNativeComponent(mesh, this.name);
		}
	
		function nativeComponentInit() {
			var mesh = this.el.getOrCreateObject3D('mesh', PlaceholderMesh);
			this.currentMesh = mesh;
			meshInit.call(this, mesh);
			//to pass defaults
			this.update(this.data);
	
			this.el.addEventListener('object3dset', function (event) {
				if (event.detail.type !== 'mesh') { return; }
				altspace.removeNativeComponent(this.currentMesh, this.name);
	
				this.currentMesh = this.el.object3DMap.mesh;
				meshInit.call(this, this.currentMesh);
				//to pass defaults
				this.update(this.data);
			}.bind(this));
		}
		function nativeComponentRemove() {
			altspace.removeNativeComponent(this.el.object3DMap.mesh, this.name);
		}
		function nativeComponentUpdate() {
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
		* @prop {bool} convex=true - Whether the collider should be convex or concave. Set this to false if you have holes
		* in your mesh. Convex colliders are limited to 255 triangles. Note: concave colliders can be significantly more
		* expensive comparet to conves colliders.
		*/
		AFRAME.registerComponent('n-mesh-collider', {
			_forEachMesh: function (func) {
				var obj = this.el.object3DMap.mesh;
				if (!obj) { return; }
				if (obj instanceof THREE.Mesh) {
					func(obj);
				}
				obj.traverse(function (childObj) {
					if (childObj instanceof THREE.Mesh) {
						func(childObj);
					}
				}.bind(this));
			},
			_initObj: function () {
				this._forEachMesh(function (mesh) {
					meshInit.call(this, mesh);
	
					//to pass defaults
					altspace.updateNativeComponent(mesh, this.name, this.data);
				}.bind(this));
			},
			init: function () {
				// Allow a-frame to create a PlaceholderMesh if there isn't already one, so that the native collider is
				// registered.
				this.el.getOrCreateObject3D('mesh', PlaceholderMesh);
	
				// Initialize the existing mesh
				this._initObj();
	
				this.el.addEventListener('model-loaded', function () {
					// Re-initialize the collider if a new model is loaded
					this._initObj();
				}.bind(this));
			},
			remove: function () {
				this._forEachMesh(function (mesh) {
					altspace.removeNativeComponent(mesh, this.name);
				}.bind(this));
			},
			update: function () {
				this._forEachMesh(function (mesh) {
					altspace.updateNativeComponent(mesh, this.name, this.data);
				}.bind(this));
			},
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
		* @prop {string} src - A URL to an external sound clip. The sound can be in WAV, OGG or MP3 format. However. only
		* WAV is supported on all platforms. MP3 is supported on Gear VR and OGG is supported on desktop.
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
		* @prop {number} maxDistance=12 - If rolloff is 'logarithmic', the sound will stop attenuating at this distance.
		* If rolloff is 'linear' or 'cosine', the sound will be silent at this distance.
		* @prop {string} rolloff='logarithmic' - Set this to 'linear' or 'cosine' if you want to cut sounds off at a
		* maxDistance.
		*/
		/**
		* Fired when a sound has loaded and is ready to be played
		* @event native.n-sound#n-sound-loaded
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
					this.el.removeEventListener(this.data.on, this.playHandler);
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
				rolloff: { type: 'string', default: 'logarithmic' },
			}
		});
	
		/**
		* Parents an entity to a joint on the avatar skeleton.
		* @mixin n-skeleton-parent
		* @memberof native
		* @prop {string} part - One of 'eye, 'head', 'neck', 'spine', 'hips', 'upper-leg', 'lower-leg', 'foot', 'toes', 
		*	'shoulder', 'upper-arm', 'lower-arm', 'hand', 'thumb', 'index', 'middle', 'ring' or 'pinky'.
		* @prop {string} [side='center'] - Side of the body. Either 'left', 'center' or 'right'
		* @prop {int} [index=0] - Bone index. e.g. Which knuckle joint to attach to.
		* @prop {string} [userId] - Id of the user to which the entity should be attached. Defaults to the local user.
		*/
		AFRAME.registerComponent('n-skeleton-parent', {
			schema: {
				part: {type: 'string'},
				side: {type: 'string', default: 'center'},
				index: {type: 'int', default: 0},
				userId: {type: 'string'}
			},
			init: nativeComponentInit,
			update: nativeComponentUpdate,
			remove: nativeComponentRemove
		});
	
		/**
		* Parents an entity to the cockpit.
		* @mixin n-cockpit-parent
		* @memberof native
		*/
		AFRAME.registerComponent('n-cockpit-parent', {
			init: nativeComponentInit,
			remove: nativeComponentRemove
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
	* @prop architecture/ceiling-2w-2l
	* @prop architecture/ceiling-4w-4l
	* @prop architecture/ceiling-4w-4l
	* @prop architecture/ceiling-skylight-4w-4l
	* @prop architecture/ceiling-skylight-corner-2w-2l
	* @prop architecture/ceiling-skylight-edge-2w
	* @prop architecture/ceiling-skylight-edge-4w
	* @prop architecture/ceiling-skylight-filler-4w-4l-2
	* @prop architecture/ceiling-skylight-filler-4w-4l
	* @prop architecture/ceiling-slice-concave-2r
	* @prop architecture/ceiling-slice-concave-4r
	* @prop architecture/ceiling-slice-convex-2r
	* @prop architecture/ceiling-slice-convex-4r
	* @prop architecture/door-4w-4h
	* @prop architecture/floor-2w-2l
	* @prop architecture/floor-2w-4l
	* @prop architecture/floor-4w-2l
	* @prop architecture/floor-4w-4l
	* @prop architecture/floor-slice-concave-2r
	* @prop architecture/floor-slice-concave-4r
	* @prop architecture/floor-slice-convex-2r
	* @prop architecture/floor-slice-convex-4r
	* @prop architecture/railing-2l
	* @prop architecture/railing-4l
	* @prop architecture/railing-curve-concave-2r
	* @prop architecture/wall-2w-4h
	* @prop architecture/wall-4w-4h
	* @prop architecture/wall-base-2w
	* @prop architecture/wall-base-4w
	* @prop architecture/wall-base-curve-concave-2r
	* @prop architecture/wall-base-curve-concave-4r
	* @prop architecture/wall-base-curve-convex-2r
	* @prop architecture/wall-base-curve-convex-4r
	* @prop architecture/wall-bulkhead-2w
	* @prop architecture/wall-bulkhead-4w
	* @prop architecture/wall-bulkhead-curve-concave-2r
	* @prop architecture/wall-bulkhead-curve-concave-4r
	* @prop architecture/wall-bulkhead-curve-convex-2r
	* @prop architecture/wall-bulkhead-curve-convex-4r
	* @prop architecture/wall-curve-concave-2r-4h
	* @prop architecture/wall-curve-concave-4r-4h
	* @prop architecture/wall-curve-convex-2r-4h
	* @prop architecture/wall-curve-convex-4r-4h
	* @prop architecture/wall-curve-window-concave-4r-4h
	* @prop architecture/wall-curve-window-concave-filler-4r-4h
	* @prop architecture/wall-curve-window-gap-concave-4r-4h
	* @prop architecture/wall-curve-window-gap-end-l-concave-4r-4h
	* @prop architecture/wall-curve-window-gap-end-r-concave-4r-4h
	* @prop architecture/wall-filler-corner-inner-4h
	* @prop architecture/wall-filler-corner-outer-4h
	* @prop architecture/wall-window-4w-4h
	* @prop architecture/wall-window-filler-2
	* @prop architecture/wall-window-gap-2w-4h
	* @prop architecture/wall-window-gap-4w-4h
	* @prop architecture/wall-window-gap-end-l-2w-4h
	* @prop architecture/wall-window-gap-end-l-4w-4h
	* @prop architecture/wall-window-gap-end-r-2w-4h
	* @prop architecture/wall-window-gap-end-r-4w-4h
	*/
	
	/**
	* Particle systems and other native effects
	* @name effects
	* @enum effects
	* @memberof resources
	*
	* @prop effects/explosion - A particle system with a central flash, then debris flying outward.
	* This is a non-looping effect.
	* @prop effects/fire - An animated fire particle, suitable for a torch.
	* @prop effects/fire-trail - Fire that trails the entity through space as it moves. Only is visible while an object is in motion
	* @prop effects/fireworks - A compound particle system that shoots up from the entity,
	* explodes into colored sparks, then transitions to gold streamers.
	* @prop effects/smoke - Billowing smoke particle system.
	* @prop effects/sparkler - Emits sparks in all directions
	* @prop effects/steam - Small white steam rising upwards
	*/
	
	/**
	* Objects that can be picked up, thrown, and otherwise interacted with.
	* @name interactables
	* @enum interactables
	* @memberof resources
	*
	* @prop interactables/basketball
	* @prop interactables/bowlingball
	* @prop interactables/bowling-pin
	* @prop interactables/box
	* @prop interactables/coin
	* @prop interactables/gem
	* @prop interactables/ring
	* @prop interactables/soccerball
	*/
	
	/**
	* Static models that you can place in your scene.
	* @name objects
	* @enum objects
	* @memberof resources
	*
	* @prop objects/basketball-hoop
	* @prop objects/coin
	* @prop objects/cup
	* @prop objects/gem
	* @prop objects/hoop
	* @prop objects/ring
	* @prop objects/target-archery
	*/
	
	/**
	* A selection of pipes/chutes/etc.
	* @name pipes
	* @enum pipes
	* @memberof resources
	*
	* @prop pipes/pipe-full-cap-1d
	* @prop pipes/pipe-full-cross-1d
	* @prop pipes/pipe-full-elbow-1d
	* @prop pipes/pipe-full-fork-1d
	* @prop pipes/pipe-full-straight-1d-1l
	* @prop pipes/pipe-full-straight-1d-2l
	* @prop pipes/pipe-full-straight-1d-4l
	* @prop pipes/pipe-full-tee-1d
	* @prop pipes/pipe-half-cap-1d
	* @prop pipes/pipe-half-cross-1d
	* @prop pipes/pipe-half-elbow-1d
	* @prop pipes/pipe-half-fork-1d
	* @prop pipes/pipe-half-straight-1d-1l
	* @prop pipes/pipe-half-straight-1d-2l
	* @prop pipes/pipe-half-straight-1d-4l
	* @prop pipes/pipe-half-tee-1d
	*/
	
	/**
	* Common UI sounds can be used for a consistent UI experience.
	* @name sounds-ui
	* @enum sounds-ui
	* @memberof resources
	*
	* @prop ui/select
	* @prop ui/toggle
	* @prop ui/notify
	* @prop ui/error
	* @prop ui/complete
	* @prop ui/succeed
	* @prop ui/over
	* @prop ui/join
	* @prop ui/click
	*/
	
	/**
	* Foley sounds are real sounds designed for tangible, touchable objects as they are heard in the real world.
	* @name sounds-foley
	* @enum sounds-foley
	* @memberof resources
	*
	* @prop foley/metal-scrape
	* @prop foley/metal-clack
	* @prop foley/metal-rattle
	* @prop foley/coin-jingle
	* @prop foley/paper-shuffle
	* @prop foley/explode
	*/
	
	/**
	* Effect sounds for a variety of use cases.
	* @name sounds-effects
	* @enum sounds-effects
	* @memberof resources
	*
	* @prop effects/fanfare-succeed - The "success!" sound from Holograms Against Humanity.
	* @prop effects/fanfare-start - The "Game has started!" sound from HaH.
	* @prop effects/fanfare-fail
	* @prop effects/timer-10s - a 10 second timer that triggers a bell at exactly 10 seconds.
	* The bell lasts for 2 seconds. This allows for timer length changes.
	* @prop effects/gain-coin
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
	AFRAME.registerComponent('sync', {
		schema: {
			mode: { default: 'link' },
			ownOn: { type: 'string' } //cannot be changed after creation
		},
		init: function () {
			var scene = document.querySelector('a-scene');
			var syncSys = scene.systems['sync-system'];
	
			var ref;
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
				}, function (error, committed) {
					// Return since transaction will be called again
					if (!committed) { return; }
					ownerRef.on('value', function(snapshot) {
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
	
	/**
	* True if the sync system is connected and ready for syncing.
	* @member sync.sync-system#isConnected
	* @readonly
	*/
	
	/**
	* True if this client is currently the master client.
	* @member sync.sync-system#isMasterClient
	* @readonly
	*/
	
	/**
	* Fired when a connection is established and the sync system is fully initialized.
	* @event sync.sync-system#connected
	* @property {boolean} shouldInitialize - True if this is the first client to establish a connection.
	*/
	
	/**
	* Fired when a client joins.
	* @event sync.sync-system#clientjoined
	* @property {string} id - Guid identifying the client.
	*/
	
	/**
	* Fired when a client leaves.
	* @event sync.sync-system#clientleft
	* @property {string} id - Guid identifying the client.
	*/
	AFRAME.registerSystem('sync-system', {
		schema: {
			author: { type: 'string', default: null },
			app: { type: 'string', default: null },
			instance: { type: 'string', default: null },
			refUrl: { type: 'string', default: null }
		},
		init: function() {
			var system = this;
	
			if(!this.data || !this.data.app){
				console.warn('The sync-system must be present on the scene and configured with required data.');
				return;
			}
	
			system.isConnected = false;
			system.queuedInstantiations = [];
			Promise.all([
				altspace.utilities.sync.connect({
					authorId: this.data.author,
					appId: this.data.app,
					instanceId: this.data.instance,
					baseRefUrl: this.data.refUrl
				}),
				altspace.getUser()
			]).then(function(results) {
				this.connection = results.shift();
				this.userInfo = results.shift();
	
				this.sceneRef = this.connection.instance.child('scene');
				this.clientsRef = this.connection.instance.child('clients');
				this.instantiatedElementsRef = this.connection.instance.child('instantiatedElements')
	
				this.instantiatedElementsRef.on('child_added', this.listenToInstantiationGroup.bind(this));
				this.instantiatedElementsRef.on('child_removed', this.stopListeningToInstantiationGroup.bind(this));
	
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
						system.sceneEl.emit('clientjoined', {id: joinedClientId}, false);
					}, 0);
				});
	
				this.clientsRef.on('child_removed', function(childSnapshot) {
					var leftClientId = childSnapshot.val();
					//let the master client flag get set first
					setTimeout(function(){
						system.sceneEl.emit('clientleft', {id: leftClientId}, false);
					}, 0);
				});
	
				// add our client ID to the list of connected clients,
				// but have it be automatically removed by firebase if we disconnect for any reason
				this.clientsRef.push(this.clientId).onDisconnect().remove();
	
				this.connection.instance.child('initialized').once('value', function (snapshot) {
					var shouldInitialize = !snapshot.val();
					snapshot.ref().set(true);
	
					this.processQueuedInstantiations();
	
					system.sceneEl.emit('connected', { shouldInitialize: shouldInitialize }, false);
					system.isConnected = true;
				}.bind(this));
	
	
				Object.defineProperty(this, 'isMasterClient', {
					get: function () { return masterClientId === this.clientId; }.bind(this)
				});
			}.bind(this));
		},
		listenToInstantiationGroup: function (snapshot) {
			snapshot.ref().on('child_added', this.createElement.bind(this));
			snapshot.ref().on('child_removed', this.removeElement.bind(this));
		},
		stopListeningToInstantiationGroup: function (snapshot) {
			snapshot.ref().off('child_added');
			snapshot.ref().off('child_removed');
		},
		processQueuedInstantiations: function () {
			this.queuedInstantiations.forEach(function (instantiationProps) {
				instantiationProps.creatorUserId = this.userInfo.userId;
				instantiationProps.clientId = this.clientId;
				this.instantiatedElementsRef.child(instantiationProps.groupName).
					push(instantiationProps).
					onDisconnect().remove();
			}.bind(this));
			// Clear queue.
			this.queuedInstantiations.length = 0;
		},
		/**
		* Instantiate an entity with the given mixins.
		* @method sync.sync-system#instantiate
		* @param {string} mixin - A comma-separated list of mixin ids which should be used to instantiate the entity.
		* @param {Element} [parent] - An element to which the entity should be added. Defaults to the scene.
		* @param {Element} [el] - The element responsible for instantiating this entity.
		* @param {string} [groupName] - A group that the entity should belong to. Used in conjunction with 
		*	[removeLast]{@link sync.sync-system#removeLast}.
		* @param {string} [instantiatorId] - Used by [removeLast]{@link sync.sync-system#removeLast} to indicate who was 
		*	responsible for the removed entity.
		*/
		instantiate: function (mixin, parent, el, groupName, instantiatorId) {
			// TODO Validation should throw an error instead of a console.error, but A-Frame 0.3.0 doesn't propagate those 
			// correctly.
			if (!mixin) {
				console.error('AltspaceVR: Instantiation requires a mixin value.', el);
				return;
			}
			var parentWithId = parent && parent.id;
			var parentIsScene = parent.nodeName === 'A-SCENE';
			if (!parentWithId && !parentIsScene) {
				console.error('AltspaceVR: Instantiation requires a parent with an id.', el);
				return;
			}
	
			var parentSelector = parentWithId ? '#' + parent.id : 'a-scene';
			var instantiationProps = {
				instantiatorId: instantiatorId || '',
				groupName: groupName || 'main',
				mixin: mixin,
				parent: parentSelector
			};
			this.queuedInstantiations.push(instantiationProps);
			if (this.isConnected) {
				this.processQueuedInstantiations();
			}
		},
		/**
		* Remove the last entity instantiated in the given group.
		* Returns a Promise which resolves with the instantiatorId associated with the removed entity.
		* @method sync.sync-system#removeLast
		* @param {string} groupName - Name of the group from which to remove the entity.
		* @returns {Promise} 
		*/
		removeLast: function (groupName) {
			return new Promise(function (resolve) {
				this.instantiatedElementsRef.child(groupName).orderByKey().limitToLast(1).once(
					'value',
					function (snapshot) {
						if (!snapshot.hasChildren()) { resolve(); return; }
						var val = snapshot.val();
						var key = Object.keys(val)[0];
						resolve(val[key].instantiatorId);
						snapshot.ref().child(key).remove();
					});
			}.bind(this));
		},
		createElement: function (snapshot) {
			var val = snapshot.val();
			var key = snapshot.key();
			var entityEl = document.createElement('a-entity');
			entityEl.id = val.groupName + '-instance-' + key;
			document.querySelector(val.parent).appendChild(entityEl);
			entityEl.setAttribute('mixin', val.mixin);
			entityEl.dataset.creatorUserId = val.creatorUserId;
		},
		removeElement: function (snapshot) {
			var val = snapshot.val();
			var key = snapshot.key();
			var id = val.groupName + '-instance-' + key;
			var el = document.querySelector('#' + id);
			el.parentNode.removeChild(el);
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
	 * Syncs the attributes of an n-skeleton-parent component across clients
	 * @mixin sync-n-skeleton-parent
	 * @memberof sync
	 */
	AFRAME.registerComponent('sync-n-skeleton-parent', {
		dependencies: ['sync'],
		init: function () {
			var scene = document.querySelector('a-scene');
			this.syncSys = scene.systems['sync-system'];
			this.sync = this.el.components.sync;
			if(this.syncSys.isConnected) { this._start(); }
			else { scene.addEventListener('connected', this._start.bind(this)); }
		},
		getDataRef: function (propertyName) {
			return this.sync.dataRef.child('n-skeleton-parent/' + propertyName);
		},
		_start: function () {
			this.attributeRef = this.sync.dataRef.child('n-skeleton-parent');
			this.attributeRef.on('value', function (snapshot) {
				var val = snapshot.val();
				if (!val) { return; }
				this.el.setAttribute('n-skeleton-parent', val);
			}.bind(this));
	
			// dataset.creatorUserId is defined when the entity is instantiated via the sync system.
			if (this.el.dataset.creatorUserId) {
				this.attributeRef.set(Object.assign(
					{}, this.el.components['n-skeleton-parent'].data, {userId: this.el.dataset.creatorUserId}));
			}
	
			this.el.addEventListener('componentchanged', function (event) {
				if (!this.sync.isMine) return;
				var name = event.detail.name;
				if (name === 'n-skeleton-parent') {
					this.attributeRef.set(event.detail.newData);
				}
			}.bind(this));
		}
	});
	


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Instantiates an entity for each user using [sync-system]{@link native.sync-system}.
	 * @prop {string} mixin - A comma-separated list of mixin ids that are used to instantiate the object.
	 * @prop {string} [parent] - A selector specifying which element should be the parent of the instantiated entity.
	 *	Defaults to the parent node.
	 */
	AFRAME.registerComponent('one-per-user', {
		schema: {
			mixin: {type: 'string'},
			parent: {type: 'selector'}
		},
		init: function () {
			var scene = document.querySelector('a-scene');
			this.syncSys = scene.systems['sync-system'];
			this.syncSys.instantiate(this.data.mixin, this.data.parent || this.el.parentNode, this.el)
		}
	});


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	* Instantiates objects on an event trigger, adds them to the scene and syncs their creation across clients.
	* The instantiated objects are built using the specified mixins.
	* @mixin instantiator
	* @prop {string} on - An event that triggers the instantiation
	* @prop {string} mixin - A space-separated list of mixins that should be used to instantiate the object.
	* @prop {string} parent='a-scene' - A selector that determines which object the instantiated object will be added to.
	* @prop {string} group='main' - An identifier which can be used to group instantiated objects.
	* @prop {boolean} removeLast=true - Whether the last object instantiated in a group should be removed before
	*	instantiating a new object.
	*/
	AFRAME.registerComponent('instantiator', {
		schema: {
			on: {type: 'string'},
			mixin: {type: 'string'},
			parent: {type: 'selector', default: 'a-scene'},
			group: {type: 'string', default: 'main'},
			removeLast: {type: 'boolean', default: 'true'},
		},
		init: function () {
			this.onHandler = this.instantiateOrToggle.bind(this);
			this.el.addEventListener(this.data.on, this.onHandler);
			this.syncSys = this.el.sceneEl.systems['sync-system'];
		},
		instantiateOrToggle: function () {
			var userGroup = this.data.group + '-' + this.syncSys.userInfo.userId;
			if (this.data.removeLast) {
				this.syncSys.removeLast(userGroup).then(function (lastInstantiatorId) {
					if (lastInstantiatorId !== this.el.id) {
						this.syncSys.instantiate(this.data.mixin, this.data.parent, this.el, userGroup, this.el.id)
					}
				}.bind(this));
			}
			else {
				this.syncSys.instantiate(this.el.id, userGroup, this.data.mixin, this.data.parent)
			}
		},
		remove: function () {
			this.el.removeEventListener(this.data.on, this.onHandler);
		}
	});


/***/ },
/* 14 */
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
	 * @property {selector} target - A selector to pick a single object to wire to
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
			targets: {type: 'selectorAll'},
			target: {type: 'selector'}
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
				function act(el) {
					if (this.data.emit) {
						el.emit(this.data.emit);
					}
					if (this.data.gain) {
						el.addState(this.data.gain);
					}
					if (this.data.lose) {
						el.removeState(this.data.lose);
					}
				}
				if(this.data.targets) this.data.targets.forEach(act.bind(this));
				if(this.data.target) act.call(this, this.data.target);
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
//# sourceMappingURL=aframe-altspace-component.js.map