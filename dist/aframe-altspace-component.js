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
	
			meshInit.call(this, mesh);
	
			//to pass defaults
			this.update(this.data);
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
			update: function (oldData) {
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
				rolloff: { type: 'string', default: 'logarithmic' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQ0MDlkNTgzMjI0ZjYwZTdhMzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hbHRzcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWx0c3BhY2UtY3Vyc29yLWNvbGxpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hbHRzcGFjZS10cmFja2VkLWNvbnRyb2xzLmpzIiwid2VicGFjazovLy8uL3NyYy9uYXRpdmUtY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmF0aXZlLXJlc291cmNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3luYy1zeXN0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N5bmMtdHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9zeW5jLWNvbG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9zeW5jLW4tc291bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLG1DQUFtQztBQUNwRCxrQkFBaUIsb0NBQW9DO0FBQ3JELGtCQUFpQixrQ0FBa0M7QUFDbkQsa0JBQWlCO0FBQ2pCLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF1QyxlQUFlO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixFQUFFOztBQUV6QjtBQUNBO0FBQ0E7QUFDQSwwQkFBeUIsRUFBRTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IsRUFBRTs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsRUFBRTs7O0FBR3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQyx1REFBdUQ7QUFDakcsMkNBQTBDLHVEQUF1RDtBQUNqRyxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0EsMkJBQTBCLFFBQVE7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBLDJCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUYsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLEdBQUU7O0FBRUY7O0FBRUEsRUFBQzs7Ozs7OztBQzVPRDs7QUFFQTtBQUNBLDRCQUEyQixXQUFXO0FBQ3RDO0FBQ0E7QUFDQSw4QkFBNkIsV0FBVztBQUN4QztBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVUsUUFBUTtBQUNsQjtBQUNBO0FBQ0EsWUFBVyxXQUFXLGdCQUFnQixFQUFFO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGLEVBQUM7Ozs7Ozs7QUM5QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7O0FDcENEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseURBQXdELGtCQUFrQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVUsT0FBTztBQUNqQixXQUFVLE9BQU87QUFDakIsV0FBVSxPQUFPO0FBQ2pCO0FBQ0EsV0FBVSxPQUFPO0FBQ2pCO0FBQ0EsV0FBVSxPQUFPO0FBQ2pCO0FBQ0EsV0FBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVSw4QkFBOEI7QUFDeEMsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU07QUFDTixlQUFjLDZCQUE2QjtBQUMzQyxZQUFXLGdDQUFnQztBQUMzQyxhQUFZLCtCQUErQjtBQUMzQyxzQkFBcUIsbUJBQW1CO0FBQ3hDLG9CQUFtQjtBQUNuQjtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTRCLDBCQUEwQixHQUFHLHVCQUF1QjtBQUNoRixLQUFJLDJCQUEyQixPQUFPLHdCQUF3QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVSxLQUFLO0FBQ2YsV0FBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVUsT0FBTztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxrQ0FBa0M7QUFDakQsYUFBWSxlQUFlO0FBQzNCLGFBQVksK0JBQStCO0FBQzNDLFdBQVU7QUFDVjtBQUNBLEdBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVLEtBQUs7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxrQ0FBa0M7QUFDakQsYUFBWSxlQUFlO0FBQzNCLFdBQVUsZUFBZTtBQUN6QixXQUFVO0FBQ1Y7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVUsT0FBTztBQUNqQixXQUFVLE9BQU87QUFDakIsV0FBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsa0NBQWtDO0FBQ2pELGFBQVksZUFBZTtBQUMzQixhQUFZLCtCQUErQjtBQUMzQyxhQUFZLCtCQUErQjtBQUMzQyxnQkFBZSxlQUFlO0FBQzlCLFdBQVU7QUFDVjtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVLEtBQUs7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0EsZ0JBQWUsa0NBQWtDO0FBQ2pELGFBQVksaUNBQWlDO0FBQzdDLFdBQVU7QUFDVjtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVUsT0FBTztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGVBQWMsNkJBQTZCO0FBQzNDO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVSxPQUFPO0FBQ2pCLFdBQVUsT0FBTztBQUNqQjtBQUNBLFdBQVUsT0FBTztBQUNqQixXQUFVLFFBQVE7QUFDbEI7QUFDQSxXQUFVLFFBQVE7QUFDbEI7QUFDQSxXQUFVLFFBQVE7QUFDbEI7QUFDQSxXQUFVLE9BQU87QUFDakIsV0FBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFdBQVUsT0FBTztBQUNqQjtBQUNBLFdBQVUsT0FBTztBQUNqQjtBQUNBLFdBQVUsT0FBTztBQUNqQjtBQUNBLFdBQVUsT0FBTztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBLHNDQUFxQyxXQUFXO0FBQ2hELElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLFNBQVEsaUJBQWlCO0FBQ3pCLFVBQVMsaUJBQWlCO0FBQzFCLFVBQVMsaUJBQWlCO0FBQzFCLFdBQVUsa0JBQWtCO0FBQzVCLGFBQVksNkJBQTZCO0FBQ3pDLGVBQWMsa0JBQWtCO0FBQ2hDLGNBQWEsa0JBQWtCO0FBQy9CLG1CQUFrQiw0QkFBNEI7QUFDOUMsWUFBVyw0QkFBNEI7QUFDdkMsa0JBQWlCLDRCQUE0QjtBQUM3QyxrQkFBaUIsNkJBQTZCO0FBQzlDLGNBQWEseUNBQXlDO0FBQ3REO0FBQ0EsR0FBRTs7QUFFRixFQUFDOzs7Ozs7O0FDaGJEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUcsa0JBQWtCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hNQTtBQUNBO0FBQ0EsbUJBQWtCLHVCQUF1QixzQkFBc0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEM7QUFDMUM7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLHdCQUF1Qix1QkFBdUI7QUFDOUMsNEJBQTJCLDBCQUEwQjtBQUNyRDtBQUNBO0FBQ0EsVUFBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVMsa0JBQWtCO0FBQzNCLFdBQVUsaUJBQWlCO0FBQzNCLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG1DQUFrQzs7O0FBR2xDO0FBQ0E7QUFDQTtBQUNBLGdEQUErQyxTQUFTO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFrQjtBQUNsQjtBQUNBLElBQUc7QUFDSDtBQUNBLEVBQUM7Ozs7Ozs7QUM1SkQ7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLCtGQUErRjtBQUNuSTtBQUNBO0FBQ0E7QUFDQSxVQUFTLE9BQU87QUFDaEIsVUFBUyxPQUFPO0FBQ2hCLFVBQVMsT0FBTztBQUNoQixVQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsZ0NBQWdDO0FBQzNDLFNBQVEsZ0NBQWdDO0FBQ3hDLGNBQWEsZ0NBQWdDO0FBQzdDLFlBQVc7QUFDWCxHQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsbUJBQW1CO0FBQ2hFLE1BQUs7QUFDTCxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDLGlCQUFpQjtBQUM1RCxNQUFLO0FBQ0wsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBeUMscUNBQXFDO0FBQzlFO0FBQ0EsS0FBSTs7O0FBR0o7QUFDQSx1QkFBc0IseUNBQXlDLEVBQUU7QUFDakUsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBLEVBQUM7Ozs7Ozs7QUN2RkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW1CLHVCQUF1QjtBQUMxQyxJQUFHLGdCQUFnQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0I7O0FBRS9COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0Esb0JBQW1CLDhCQUE4QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQ2pKRDtBQUNBO0FBQ0Esb0JBQW1CLHVCQUF1QjtBQUMxQyxJQUFHLGdCQUFnQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0I7O0FBRS9CO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQTZCO0FBQzdCO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7QUNyREQ7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELG9CQUFtQix1QkFBdUI7QUFDMUMsSUFBRyxnQkFBZ0I7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVSxFQUFFO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQjs7QUFFL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O0FDdEVEO0FBQ0E7QUFDQTtBQUNBLGVBQWMsT0FBTztBQUNyQixlQUFjLE9BQU87QUFDckIsZUFBYyxPQUFPO0FBQ3JCLGVBQWMsT0FBTztBQUNyQixlQUFjLE9BQU87QUFDckIsZUFBYyxPQUFPO0FBQ3JCLGVBQWMsU0FBUztBQUN2QixlQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU8sZUFBZTtBQUN0QixVQUFTLGVBQWU7QUFDeEIsWUFBVyxlQUFlO0FBQzFCLFVBQVMsZUFBZTtBQUN4QixVQUFTLGVBQWU7QUFDeEIsVUFBUyxlQUFlO0FBQ3hCLGFBQVksb0JBQW9CO0FBQ2hDLFlBQVc7QUFDWCxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDIiwiZmlsZSI6ImFmcmFtZS1hbHRzcGFjZS1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDRkNDA5ZDU4MzIyNGY2MGU3YTM0XG4gKiovIiwiaWYgKHR5cGVvZiBBRlJBTUUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnQgYXR0ZW1wdGVkIHRvIHJlZ2lzdGVyIGJlZm9yZSBBRlJBTUUgd2FzIGF2YWlsYWJsZS4nKTtcclxufVxyXG5cclxucmVxdWlyZSgnLi9hbHRzcGFjZScpO1xyXG5yZXF1aXJlKCcuL2FsdHNwYWNlLWN1cnNvci1jb2xsaWRlcicpO1xyXG5yZXF1aXJlKCcuL2FsdHNwYWNlLXRyYWNrZWQtY29udHJvbHMnKTtcclxucmVxdWlyZSgnLi9uYXRpdmUtY29tcG9uZW50cycpO1xyXG5yZXF1aXJlKCcuL25hdGl2ZS1yZXNvdXJjZXMnKTtcclxucmVxdWlyZSgnLi9zeW5jJyk7XHJcbnJlcXVpcmUoJy4vc3luYy1zeXN0ZW0nKTtcclxucmVxdWlyZSgnLi9zeW5jLXRyYW5zZm9ybScpO1xyXG5yZXF1aXJlKCcuL3N5bmMtY29sb3InKTtcclxucmVxdWlyZSgnLi9zeW5jLW4tc291bmQnKTtcclxucmVxdWlyZSgnLi93aXJlJyk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuKiBAbmFtZXNwYWNlIGFsdHNwYWNlXHJcbiovXHJcblxyXG4vKipcclxuKiBUaGUgYWx0c3BhY2UgY29tcG9uZW50IG1ha2VzIEEtRnJhbWUgYXBwcyBjb21wYXRpYmxlIHdpdGggQWx0c3BhY2VWUi5cclxuKlxyXG4qICoqTm90ZSoqOiBJZiB5b3UgdXNlIHRoZSBgZW1iZWRkZWRgIEEtRnJhbWUgY29tcG9uZW50IG9uIHlvdXIgc2NlbmUsIHlvdSBtdXN0IGluY2x1ZGUgaXQgKmJlZm9yZSogdGhlIGBhbHRzcGFjZWAgY29tcG9uZW50LCBvciB5b3VyIGFwcCB3aWxsIHNpbGVudGx5IGZhaWwuXHJcbiogQG1peGluIGFsdHNwYWNlXHJcbiogQG1lbWJlcm9mIGFsdHNwYWNlXHJcbiogQHByb3BlcnR5IHtib29sZWFufSB1c2VQaXhlbFNjYWxlPWBmYWxzZWAgLSBBbGxvd3MgeW91IHRvIHVzZSBBLUZyYW1lIHVuaXRzIGFzIENTUyBwaXhlbHMuXHJcbiogVGhpcyBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBmb3IgdGhyZWUuanMgYXBwcywgYnV0IG5vdCBmb3IgQS1GcmFtZSBhcHBzLlxyXG4qIEBwcm9wZXJ0eSB7c3RyaW5nfSB2ZXJ0aWNhbEFsaWduPWBtaWRkbGVgIC0gUHV0cyB0aGUgb3JpZ2luIGF0IHRoZSBgYm90dG9tYCwgYG1pZGRsZWAgKGRlZmF1bHQpLFxyXG4qIG9yIGB0b3BgIG9mIHRoZSBBbHRzcGFjZSBlbmNsb3N1cmUuXHJcbiogQHByb3BlcnR5IHtib29sZWFufSBlbmNsb3N1cmVzT25seT1gdHJ1ZWAgLSBQcmV2ZW50cyB0aGUgc2NlbmUgZnJvbSBiZWluZyBjcmVhdGVkIGlmXHJcbiogZW5jbG9zdXJlIGlzIGZsYXQuXHJcbiogQHByb3BlcnR5IHtib29sZWFufSBmdWxsc3BhY2U9YGZhbHNlYCAtIFB1dHMgdGhlIGFwcCBpbnRvIGZ1bGxzcGFjZSBtb2RlLlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiA8aGVhZD5cclxuKiAgIDx0aXRsZT5NeSBBLUZyYW1lIFNjZW5lPC90aXRsZT5cclxuKiAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hZnJhbWUuaW8vcmVsZWFzZXMvMC4zLjAvYWZyYW1lLm1pbi5qc1wiPjwvc2NyaXB0PlxyXG4qICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2Nkbi5yYXdnaXQuY29tL0FsdHNwYWNlVlIvYWZyYW1lLWFsdHNwYWNlLWNvbXBvbmVudC92QUZSQU1FX0FMVFNQQUNFX1ZFUlNJT04vZGlzdC9hZnJhbWUtYWx0c3BhY2UtY29tcG9uZW50Lm1pbi5qc1wiPjwvc2NyaXB0PlxyXG4qIDwvaGVhZD5cclxuKiA8Ym9keT5cclxuKiAgIDxhLXNjZW5lIGFsdHNwYWNlPlxyXG4qICAgICA8YS1lbnRpdHkgZ2VvbWV0cnk9XCJwcmltaXRpdmU6IGJveFwiIG1hdGVyaWFsPVwiY29sb3I6ICNDMDM1NDZcIj48L2EtZW50aXR5PlxyXG4qICAgPC9hLXNjZW5lPlxyXG4qIDwvYm9keT5cclxuKi9cclxuQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdhbHRzcGFjZScsIHtcclxuICB2ZXJzaW9uOiAnQUZSQU1FX0FMVFNQQUNFX1ZFUlNJT04nLFxyXG4gIHNjaGVtYToge1xyXG5cdHVzZVBpeGVsU2NhbGU6IHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiAnZmFsc2UnfSxcclxuXHR2ZXJ0aWNhbEFsaWduOiB7IHR5cGU6ICdzdHJpbmcnLCAgZGVmYXVsdDogJ21pZGRsZSd9LFxyXG5cdGVuY2xvc3VyZXNPbmx5OnsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiAndHJ1ZSd9LFxyXG5cdGZ1bGxzcGFjZTogICAgIHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiAnZmFsc2UnfVxyXG4gIH0sXHJcblxyXG4gIC8qXHJcbiAgICogQ2FsbGVkIG9uY2Ugd2hlbiBjb21wb25lbnQgaXMgYXR0YWNoZWQuIEdlbmVyYWxseSBmb3IgaW5pdGlhbCBzZXR1cC5cclxuICAgKi9cclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCEodGhpcy5lbC5vYmplY3QzRCBpbnN0YW5jZW9mIFRIUkVFLlNjZW5lKSkge1xyXG5cdCAgY29uc29sZS53YXJuKCdhZnJhbWUtYWx0c3BhY2UtY29tcG9uZW50IGNhbiBvbmx5IGJlIGF0dGFjaGVkIHRvIGEtc2NlbmUnKTtcclxuXHQgIHJldHVybjtcclxuXHR9XHJcblxyXG5cdGlmICh3aW5kb3cuYWx0c3BhY2UgJiYgd2luZG93LmFsdHNwYWNlLmluQ2xpZW50KSB7XHJcblx0ICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgndnItbW9kZS11aScsIHtlbmFibGVkOiBmYWxzZX0pO1xyXG5cdCAgdGhpcy5pbml0UmVuZGVyZXIoKTtcclxuXHQgIHRoaXMuaW5pdEN1cnNvckV2ZW50cygpO1xyXG5cdCAgdGhpcy5pbml0Q29sbGlzaW9uRXZlbnRzKCk7XHJcblx0fSBlbHNlIHtcclxuXHQgIGNvbnNvbGUud2FybignYWZyYW1lLWFsdHNwYWNlLWNvbXBvbmVudCBvbmx5IHdvcmtzIGluc2lkZSBvZiBBbHRzcGFjZVZSJyk7XHJcblx0fVxyXG5cclxuICB9LFxyXG5cclxuICAvKlxyXG4gICAqIENhbGxlZCBvbiBldmVyeSBzaW5nbGUgdGljayBvciByZW5kZXIgbG9vcCBvZiB0aGUgc2NlbmUuXHJcbiAgICovXHJcbiAgdGljazogZnVuY3Rpb24gKHQsIGR0KSB7XHJcbiAgICAgIGlmKHRoaXMuZWwub2JqZWN0M0QudXBkYXRlQWxsQmVoYXZpb3JzKVxyXG4gICAgICAgIHRoaXMuZWwub2JqZWN0M0QudXBkYXRlQWxsQmVoYXZpb3JzKCk7XHJcbiAgfSxcclxuXHJcbiAgLypcclxuICAgKiBDYWxsZWQgd2hlbiBhIGNvbXBvbmVudCBpcyByZW1vdmVkIChlLmcuLCB2aWEgcmVtb3ZlQXR0cmlidXRlKS5cclxuICAgKiBHZW5lcmFsbHkgdW5kb2VzIGFsbCBtb2RpZmljYXRpb25zIHRvIHRoZSBlbnRpdHkuXHJcbiAgICovXHJcbiAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7IH0sXHJcblxyXG4gIC8qXHJcbiAgICogQ2FsbGVkIG9uIGVhY2ggc2NlbmUgdGljay5cclxuICAgKi9cclxuICAvLyB0aWNrOiBmdW5jdGlvbiAodCkgeyB9LFxyXG5cclxuICAvKlxyXG4gICAqIENhbGxlZCB3aGVuIGVudGl0eSBwYXVzZXMuXHJcbiAgICogVXNlIHRvIHN0b3Agb3IgcmVtb3ZlIGFueSBkeW5hbWljIG9yIGJhY2tncm91bmQgYmVoYXZpb3Igc3VjaCBhcyBldmVudHMuXHJcbiAgICovXHJcbiAgcGF1c2U6IGZ1bmN0aW9uICgpIHsgfSxcclxuXHJcbiAgLypcclxuICAgKiBDYWxsZWQgd2hlbiBlbnRpdHkgcmVzdW1lcy5cclxuICAgKiBVc2UgdG8gY29udGludWUgb3IgYWRkIGFueSBkeW5hbWljIG9yIGJhY2tncm91bmQgYmVoYXZpb3Igc3VjaCBhcyBldmVudHMuXHJcbiAgICovXHJcbiAgcGxheTogZnVuY3Rpb24gKCkgeyB9LFxyXG5cclxuXHJcbiAgLyoqKioqKioqKiogSGVscGVyIE1ldGhvZHMgKioqKioqKioqKi9cclxuXHJcbiAgLypcclxuICAgKiBTd2FwIGluIEFsdHNwYWNlIHJlbmRlcmVyIHdoZW4gcnVubmluZyBpbiBBbHRzcGFjZVZSLlxyXG4gICAqL1xyXG4gIGluaXRSZW5kZXJlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuXHR2YXIgc2NlbmUgPSB0aGlzLmVsLm9iamVjdDNEO1xyXG5cdGFsdHNwYWNlLmdldEVuY2xvc3VyZSgpLnRoZW4oZnVuY3Rpb24oZSlcclxuXHR7XHJcblx0XHRpZih0aGlzLmRhdGEuZnVsbHNwYWNlKXtcclxuXHRcdFx0ZS5yZXF1ZXN0RnVsbHNwYWNlKCk7XHJcblx0XHRcdGUuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNwYWNlY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRzY2VuZS5zY2FsZS5zZXRTY2FsYXIoZS5waXhlbHNQZXJNZXRlcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5kYXRhLnVzZVBpeGVsU2NhbGUgfHwgdGhpcy5kYXRhLmZ1bGxzcGFjZSl7XHJcblx0XHRcdHNjZW5lLnNjYWxlLnNldFNjYWxhcihlLnBpeGVsc1Blck1ldGVyKTtcclxuXHRcdH1cclxuXHJcblx0ICBzd2l0Y2ggKHRoaXMuZGF0YS52ZXJ0aWNhbEFsaWduKSB7XHJcblx0XHRjYXNlICdib3R0b20nOlxyXG5cdFx0ICBzY2VuZS5wb3NpdGlvbi55IC09IGUuaW5uZXJIZWlnaHQgLyAyO1xyXG5cdFx0ICBicmVhaztcclxuXHRcdGNhc2UgJ3RvcCc6XHJcblx0XHQgIHNjZW5lLnBvc2l0aW9uLnkgKz0gZS5pbm5lckhlaWdodCAvIDI7XHJcblx0XHQgIGJyZWFrO1xyXG5cdFx0Y2FzZSAnbWlkZGxlJzpcclxuXHRcdCAgYnJlYWs7XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0ICBjb25zb2xlLndhcm4oJ1VuZXhwZWN0ZWQgdmFsdWUgZm9yIHZlcnRpY2FsQWxpZ246ICcsIHRoaXMuZGF0YS52ZXJ0aWNhbEFsaWduKTtcclxuXHQgIH1cclxuXHJcblx0ICBpZih0aGlzLmRhdGEuZW5jbG9zdXJlc09ubHkgJiYgZS5pbm5lckRlcHRoID09PSAxKXtcclxuXHRcdHRoaXMuZWwucmVuZGVyZXIucmVuZGVyKG5ldyBUSFJFRS5TY2VuZSgpKTtcclxuXHRcdHRoaXMuZWwucmVuZGVyZXIgPSB0aGlzLmVsLmVmZmVjdCA9IG9sZFJlbmRlcmVyO1xyXG5cclxuXHQgIH1cclxuXHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHR2YXIgb2xkUmVuZGVyZXIgPSB0aGlzLmVsLnJlbmRlcmVyO1xyXG5cdHZhciByZW5kZXJlciA9IHRoaXMuZWwucmVuZGVyZXIgPSB0aGlzLmVsLmVmZmVjdCA9IGFsdHNwYWNlLmdldFRocmVlSlNSZW5kZXJlcih7XHJcblx0ICBhZnJhbWVDb21wb25lbnRWZXJzaW9uOiB0aGlzLnZlcnNpb25cclxuXHR9KTtcclxuXHR2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XHJcblx0cmVuZGVyZXIuc2V0U2l6ZSA9IG5vb3A7XHJcblx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyA9IG5vb3A7XHJcblx0cmVuZGVyZXIuc2V0Q2xlYXJDb2xvciA9IG5vb3A7XHJcblx0cmVuZGVyZXIuY2xlYXIgPSBub29wO1xyXG5cdHJlbmRlcmVyLmVuYWJsZVNjaXNzb3JUZXN0ID0gbm9vcDtcclxuXHRyZW5kZXJlci5zZXRTY2lzc29yID0gbm9vcDtcclxuXHRyZW5kZXJlci5zZXRWaWV3cG9ydCA9IG5vb3A7XHJcblx0cmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbyA9IG5vb3A7XHJcblx0cmVuZGVyZXIuZ2V0TWF4QW5pc290cm9weSA9IG5vb3A7XHJcblx0cmVuZGVyZXIuc2V0RmFjZUN1bGxpbmcgPSBub29wO1xyXG5cdHJlbmRlcmVyLmNvbnRleHQgPSB7Y2FudmFzOiB7fX07XHJcblx0cmVuZGVyZXIuc2hhZG93TWFwID0ge307XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qXHJcbiAgICogRW11bGF0ZSBBLUZyYW1lIGN1cnNvciBldmVudHMgd2hlbiBydW5uaW5nIGluIGFsdHNwYWNlVlIuXHJcbiAgICovXHJcbiAgaW5pdEN1cnNvckV2ZW50czogZnVuY3Rpb24oKSB7XHJcblxyXG5cdHZhciBzY2VuZSA9IHRoaXMuZWwub2JqZWN0M0Q7XHJcblx0dmFyIGN1cnNvckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS1jdXJzb3InKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhLWVudGl0eVtjdXJzb3JdJyk7XHJcblx0aWYgKGN1cnNvckVsKSB7XHJcblx0ICAvLyBIaWRlIEEtRnJhbWUgY3Vyc29yIG1lc2guXHJcblx0ICBjdXJzb3JFbC5zZXRBdHRyaWJ1dGUoJ21hdGVyaWFsJywgJ3RyYW5zcGFyZW50JywgdHJ1ZSk7XHJcblx0ICBjdXJzb3JFbC5zZXRBdHRyaWJ1dGUoJ21hdGVyaWFsJywgJ29wYWNpdHknLCAwLjApO1xyXG5cdH1cclxuXHJcblx0dmFyIGVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudCkge1xyXG5cdFx0Ly8gRmlyZSBldmVudHMgb24gaW50ZXJzZWN0ZWQgb2JqZWN0IGFuZCBBLUZyYW1lIGN1cnNvci5cclxuXHRcdHZhciB0YXJnZXRFbCA9IGV2ZW50LnRhcmdldC5lbDtcclxuXHRcdGlmIChjdXJzb3JFbCkgY3Vyc29yRWwuZW1pdChldmVudE5hbWUsIHsgdGFyZ2V0OiB0YXJnZXRFbCwgcmF5OiBldmVudC5yYXksIHBvaW50OiBldmVudC5wb2ludCB9KTtcclxuXHRcdGlmICh0YXJnZXRFbCkgdGFyZ2V0RWwuZW1pdChldmVudE5hbWUsIHsgdGFyZ2V0OiB0YXJnZXRFbCwgcmF5OiBldmVudC5yYXksIHBvaW50OiBldmVudC5wb2ludCB9KTtcclxuXHR9IDtcclxuXHJcblx0dmFyIGN1cnNvcmRvd25PYmogPSBudWxsO1xyXG5cdHNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoJ2N1cnNvcmRvd24nLCBmdW5jdGlvbihldmVudCkge1xyXG5cdCAgY3Vyc29yZG93bk9iaiA9IGV2ZW50LnRhcmdldDtcclxuXHQgIGVtaXQoJ21vdXNlZG93bicsIGV2ZW50KTtcclxuXHR9KTtcclxuXHJcblx0c2NlbmUuYWRkRXZlbnRMaXN0ZW5lcignY3Vyc29ydXAnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdCAgZW1pdCgnbW91c2V1cCcsIGV2ZW50KTtcclxuXHQgIGlmIChldmVudC50YXJnZXQudXVpZCA9PT0gY3Vyc29yZG93bk9iai51dWlkKSB7XHJcblx0XHRlbWl0KCdjbGljaycsIGV2ZW50KTtcclxuXHQgIH1cclxuXHQgIGN1cnNvcmRvd25PYmogPSBudWxsO1xyXG5cdH0pO1xyXG5cclxuXHRzY2VuZS5hZGRFdmVudExpc3RlbmVyKCdjdXJzb3JlbnRlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0ICBpZiAoIWV2ZW50LnRhcmdldC5lbCkgeyByZXR1cm47IH1cclxuXHQgIGV2ZW50LnRhcmdldC5lbC5hZGRTdGF0ZSgnaG92ZXJlZCcpO1xyXG5cdCAgaWYgKGN1cnNvckVsKSBjdXJzb3JFbC5hZGRTdGF0ZSgnaG92ZXJpbmcnKTtcclxuXHQgIGVtaXQoJ21vdXNlZW50ZXInLCBldmVudCk7XHJcblx0fSk7XHJcblxyXG5cdHNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoJ2N1cnNvcmxlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHQgIGlmICghZXZlbnQudGFyZ2V0LmVsKSB7IHJldHVybjsgfVxyXG5cdCAgZXZlbnQudGFyZ2V0LmVsLnJlbW92ZVN0YXRlKCdob3ZlcmVkJyk7XHJcblx0ICBpZiAoY3Vyc29yRWwpIGN1cnNvckVsLnJlbW92ZVN0YXRlKCdob3ZlcmluZycpO1xyXG5cdCAgZW1pdCgnbW91c2VsZWF2ZScsIGV2ZW50KTtcclxuXHR9KTtcclxuXHJcbiAgfSxcclxuXHJcbiAgaW5pdENvbGxpc2lvbkV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cclxuXHR2YXIgc2NlbmUgPSB0aGlzLmVsLm9iamVjdDNEO1xyXG5cclxuXHR2YXIgZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50KSB7XHJcblx0XHR2YXIgdGFyZ2V0RWwgPSBldmVudC50YXJnZXQuZWw7XHJcblx0XHRpZiAoIXRhcmdldEVsKSByZXR1cm47XHJcblxyXG5cdFx0Ly9yZW1hcCB0YXJnZXQgYW5kIG90aGVyIGZyb20gb2JqZWN0M0RzIHRvIGFmcmFtZSBlbGVtZW50XHJcblx0XHRldmVudC50YXJnZXQgPSB0YXJnZXRFbDtcclxuXHRcdGlmIChldmVudC5vdGhlciAmJiBldmVudC5vdGhlci5lbCkge1xyXG5cdFx0XHRldmVudC5vdGhlciA9IGV2ZW50Lm90aGVyLmVsO1xyXG5cdFx0fVxyXG5cdFx0dGFyZ2V0RWwuZW1pdChldmVudE5hbWUsIGV2ZW50KTtcclxuXHR9O1xyXG5cclxuXHRzY2VuZS5hZGRFdmVudExpc3RlbmVyKCdjb2xsaXNpb25lbnRlcicsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0ZW1pdCgnY29sbGlzaW9uZW50ZXInLCBldmVudCk7XHJcblx0fSk7XHJcblxyXG5cdHNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbGxpc2lvbmV4aXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdGVtaXQoJ2NvbGxpc2lvbmV4aXQnLCBldmVudCk7XHJcblx0fSk7XHJcblxyXG5cdHNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoJ3RyaWdnZXJlbnRlcicsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0ZW1pdCgndHJpZ2dlcmVudGVyJywgZXZlbnQpO1xyXG5cdH0pO1xyXG5cclxuXHRzY2VuZS5hZGRFdmVudExpc3RlbmVyKCd0cmlnZ2VyZXhpdCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0ZW1pdCgndHJpZ2dlcmV4aXQnLCBldmVudCk7XHJcblx0fSk7XHJcblxyXG4gIH1cclxuXHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2FsdHNwYWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiKGZ1bmN0aW9uKCl7XHJcblxyXG5cdGZ1bmN0aW9uIHNldENvbGxpZGVyRmxhZyhvYmosIHN0YXRlKSB7XHJcblx0XHRvYmoudXNlckRhdGEuYWx0c3BhY2UgPSB7Y29sbGlkZXI6IHtlbmFibGVkOiBzdGF0ZX19O1xyXG5cdFx0b2JqLnRyYXZlcnNlKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0aWYgKG9iaiBpbnN0YW5jZW9mIFRIUkVFLk1lc2gpIHtcclxuXHRcdFx0XHRvYmoudXNlckRhdGEuYWx0c3BhY2UgPSB7Y29sbGlkZXI6IHtlbmFibGVkOiBzdGF0ZX19O1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBFbmFibGUgb3IgZGlzYWJsZSBjdXJzb3IgY29sbGlzaW9uIG9uIHRoZSBvYmplY3QuXHJcblx0KiBAbWl4aW4gYWx0c3BhY2UtY3Vyc29yLWNvbGxpZGVyXHJcblx0KiBAbWVtYmVyb2YgYWx0c3BhY2VcclxuXHQqIEBwcm9wIHtib29sZWFufSBlbmFibGVkPXRydWUgLSBUaGUgc3RhdGUgb2YgdGhlIGN1cnNvciBjb2xsaWRlci5cclxuXHQqL1xyXG5cdEFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnYWx0c3BhY2UtY3Vyc29yLWNvbGxpZGVyJywge1xyXG5cdFx0c2NoZW1hOiB7IGVuYWJsZWQ6IHsgZGVmYXVsdDogdHJ1ZSB9IH0sXHJcblx0XHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNldENvbGxpZGVyRmxhZyh0aGlzLmVsLm9iamVjdDNELCB0aGlzLmRhdGEuZW5hYmxlZCk7XHJcblx0XHRcdHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW9kZWwtbG9hZGVkJywgKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2V0Q29sbGlkZXJGbGFnKHRoaXMuZWwub2JqZWN0M0QsIHRoaXMuZGF0YS5lbmFibGVkKTtcclxuXHRcdFx0fSkuYmluZCh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNldENvbGxpZGVyRmxhZyh0aGlzLmVsLm9iamVjdDNELCB0aGlzLmRhdGEuZW5hYmxlZCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2FsdHNwYWNlLWN1cnNvci1jb2xsaWRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4qIEVuYWJsZXMgdHJhY2tlZCBjb250cm9sIHN1cHBvcnQgZm9yIEEtRnJhbWUgYXBwbGljYXRpb25zIHRoYXQgdXNlIHRoZSBidWlsdC1pblxyXG4qIGB0cmFja2VkLWNvbnRyb2xzYCwgYHZpdmUtY29udHJvbHNgIG9yIGBoYW5kLWNvbnRyb2xzYCBjb21wb25lbnRzLlxyXG4qIEBtaXhpbiBhbHRzcGFjZS10cmFja2VkLWNvbnRyb2xzXHJcbiogQG1lbWJlcm9mIGFsdHNwYWNlXHJcbiovXHJcbkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnYWx0c3BhY2UtdHJhY2tlZC1jb250cm9scycsIHtcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0dGhpcy5nYW1lcGFkSW5kZXggPSBudWxsO1xyXG5cdHRoaXMudHJhY2tlZENvbnRyb2xzU3lzdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS1zY2VuZScpLnN5c3RlbXNbJ3RyYWNrZWQtY29udHJvbHMnXTtcclxuXHR0aGlzLnN5c3RlbUdhbWVwYWRzID0gMDtcclxuXHRhbHRzcGFjZS5nZXRHYW1lcGFkcygpO1xyXG4gIH0sXHJcbiAgdGljazogZnVuY3Rpb24gKCkge1xyXG5cdCAgaWYgKFxyXG5cdFx0dGhpcy50cmFja2VkQ29udHJvbHNTeXN0ZW0gJiZcclxuXHRcdHRoaXMuc3lzdGVtR2FtZXBhZHMgIT09IHRoaXMudHJhY2tlZENvbnRyb2xzU3lzdGVtLmNvbnRyb2xsZXJzLmxlbmd0aCAmJlxyXG5cdFx0d2luZG93LmFsdHNwYWNlICYmIGFsdHNwYWNlLmdldEdhbWVwYWRzICYmIGFsdHNwYWNlLmdldEdhbWVwYWRzKCkubGVuZ3RoXHJcblx0ICApIHtcclxuXHRcdHZhciBjb21wb25lbnRzID0gdGhpcy5lbC5jb21wb25lbnRzO1xyXG5cdFx0aWYgKGNvbXBvbmVudHNbJ3BhaW50LWNvbnRyb2xzJ10pIHtcclxuXHRcdCAgdGhpcy5nYW1lcGFkSW5kZXggPSBjb21wb25lbnRzWydwYWludC1jb250cm9scyddLmRhdGEuaGFuZCA9PT0gJ2xlZnQnID8gMiA6IDE7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5nYW1lcGFkSW5kZXggPT09IG51bGwgJiYgY29tcG9uZW50c1snaGFuZC1jb250cm9scyddKSB7XHJcblx0XHQgIHRoaXMuZ2FtZXBhZEluZGV4ID0gY29tcG9uZW50c1snaGFuZC1jb250cm9scyddLmRhdGEgPT09ICdsZWZ0JyA/IDIgOiAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZ2FtZXBhZEluZGV4ID09PSBudWxsICYmIGNvbXBvbmVudHNbJ3ZpdmUtY29udHJvbHMnXSkge1xyXG5cdFx0ICB0aGlzLmdhbWVwYWRJbmRleCA9IGNvbXBvbmVudHNbJ3ZpdmUtY29udHJvbHMnXS5kYXRhLmhhbmQgPT09ICdsZWZ0JyA/IDIgOiAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZ2FtZXBhZEluZGV4ID09PSBudWxsICYmIGNvbXBvbmVudHNbJ3RyYWNrZWQtY29udHJvbHMnXSkge1xyXG5cdFx0ICB0aGlzLmdhbWVwYWRJbmRleCA9IGNvbXBvbmVudHNbJ3RyYWNrZWQtY29udHJvbHMnXS5kYXRhLmNvbnRyb2xsZXI7XHJcblx0XHR9XHJcblx0XHR0aGlzLmVsLnNldEF0dHJpYnV0ZSgndHJhY2tlZC1jb250cm9scycsICdpZCcsIGFsdHNwYWNlLmdldEdhbWVwYWRzKClbdGhpcy5nYW1lcGFkSW5kZXhdLmlkKTtcclxuXHRcdHRoaXMuZWwuc2V0QXR0cmlidXRlKCd0cmFja2VkLWNvbnRyb2xzJywgJ2NvbnRyb2xsZXInLCAwKTtcclxuXHRcdHRoaXMuc3lzdGVtR2FtZXBhZHMgPSB0aGlzLnRyYWNrZWRDb250cm9sc1N5c3RlbS5jb250cm9sbGVycy5sZW5ndGg7XHJcblx0ICB9XHJcbiAgfVxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9hbHRzcGFjZS10cmFja2VkLWNvbnRyb2xzLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXHJcbi8qKlxyXG4qIFRoaXMgc2V0IG9mIGNvbXBvbmVudHMgbWFwIHRvIHZhcmlvdXMgb2JqZWN0cyBhbmQgZWZmZWN0cyB0aGF0IGFyZSBwcm92aWRlZFxyXG4qIG5hdGl2ZWx5IGJ5IEFsdHNwYWNlVlIuIFlvdXIgbWFuYWdlbWVudCBvZiB0aGVzZSBvYmplY3RzIG1heSBiZSBsaW1pdGVkIHRvXHJcbiogc29tZSBkZWdyZWUsIGJ1dCB0aGV5IHdpbGwgdGVuZCB0byBiZSBtb3JlIHBlcmZvcm1hbnQgdGhhbiBTREsgZXF1aXZhbGVudHMsXHJcbiogb3IgbWF5IHByb3ZpZGUgc29tZSBmdW5jdGlvbmFsaXR5IG5vdCBvdGhlcndpc2UgYXZhaWxhYmxlIHRvIHRoZSBTREsuXHJcbiogQG5hbWVzcGFjZSBuYXRpdmVcclxuKi9cclxuKGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoIXdpbmRvdy5hbHRzcGFjZSB8fCAhYWx0c3BhY2UuaW5DbGllbnQpIHtcclxuXHRcdHZhciBub29wID0gZnVuY3Rpb24gKCkge307XHJcblx0XHR3aW5kb3cuYWx0c3BhY2UgPSB7XHJcblx0XHRcdGFkZE5hdGl2ZUNvbXBvbmVudDogbm9vcCxcclxuXHRcdFx0dXBkYXRlTmF0aXZlQ29tcG9uZW50OiBub29wLFxyXG5cdFx0XHRyZW1vdmVOYXRpdmVDb21wb25lbnQ6IG5vb3BcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR2YXIgcGxhY2Vob2xkZXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjAwMSwgMC4wMDEsIDAuMDAxKTtcclxuXHR2YXIgcGxhY2Vob2xkZXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDAwMCB9KTtcclxuXHRwbGFjZWhvbGRlck1hdGVyaWFsLnZpc2libGUgPSBmYWxzZTtcclxuXHR2YXIgUGxhY2Vob2xkZXJNZXNoID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0VEhSRUUuTWVzaC5jYWxsKCB0aGlzLCBwbGFjZWhvbGRlckdlb21ldHJ5LCBwbGFjZWhvbGRlck1hdGVyaWFsICk7XHJcblx0fTtcclxuXHRQbGFjZWhvbGRlck1lc2gucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuTWVzaC5wcm90b3R5cGUgKTtcclxuXHRQbGFjZWhvbGRlck1lc2gucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVEhSRUUuUGxhY2Vob2xkZXJNZXNoO1xyXG5cclxuXHRmdW5jdGlvbiBtZXNoSW5pdChtZXNoKSB7XHJcblx0XHQvL0lmIHlvdSBhdHRhY2ggbmF0aXZlIGNvbXBvbmVudHMgdG8gYW4gZW50aXR5LCBpdCB3aWxsIG5vdCB1c2UgYSBkZWZhdWx0IGNvbGxpZGVyXHJcblx0XHRtZXNoLnVzZXJEYXRhLmFsdHNwYWNlID0gbWVzaC51c2VyRGF0YS5hbHRzcGFjZSB8fCB7fTtcclxuXHRcdG1lc2gudXNlckRhdGEuYWx0c3BhY2UuY29sbGlkZXIgPSBtZXNoLnVzZXJEYXRhLmFsdHNwYWNlLmNvbGxpZGVyIHx8IHt9O1xyXG5cdFx0bWVzaC51c2VyRGF0YS5hbHRzcGFjZS5jb2xsaWRlci5lbmFibGVkID0gZmFsc2U7XHJcblxyXG5cdFx0YWx0c3BhY2UuYWRkTmF0aXZlQ29tcG9uZW50KG1lc2gsIHRoaXMubmFtZSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBuYXRpdmVDb21wb25lbnRJbml0KCkge1xyXG5cdFx0dmFyIG1lc2ggPSB0aGlzLmVsLmdldE9yQ3JlYXRlT2JqZWN0M0QoJ21lc2gnLCBQbGFjZWhvbGRlck1lc2gpO1xyXG5cclxuXHRcdG1lc2hJbml0LmNhbGwodGhpcywgbWVzaCk7XHJcblxyXG5cdFx0Ly90byBwYXNzIGRlZmF1bHRzXHJcblx0XHR0aGlzLnVwZGF0ZSh0aGlzLmRhdGEpO1xyXG5cdH1cclxuXHRmdW5jdGlvbiBuYXRpdmVDb21wb25lbnRSZW1vdmUoKSB7XHJcblx0XHR2YXIgbWVzaCA9IHRoaXMuZWwuZ2V0T2JqZWN0M0QoJ21lc2gnKTtcclxuXHRcdGFsdHNwYWNlLnJlbW92ZU5hdGl2ZUNvbXBvbmVudChtZXNoLCB0aGlzLm5hbWUpO1xyXG5cdH1cclxuXHRmdW5jdGlvbiBuYXRpdmVDb21wb25lbnRVcGRhdGUob2xkRGF0YSkge1xyXG5cdFx0YWx0c3BhY2UudXBkYXRlTmF0aXZlQ29tcG9uZW50KHRoaXMuZWwub2JqZWN0M0RNYXAubWVzaCwgdGhpcy5uYW1lLCB0aGlzLmRhdGEpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY2FsbENvbXBvbmVudChmdW5jdGlvbk5hbWUsIGZ1bmN0aW9uQXJndW1lbnRzKSB7XHJcblx0XHRhbHRzcGFjZS5jYWxsTmF0aXZlQ29tcG9uZW50KHRoaXMuZWwub2JqZWN0M0RNYXAubWVzaCwgdGhpcy5uYW1lLCBmdW5jdGlvbk5hbWUsIGZ1bmN0aW9uQXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBBdHRhY2ggYSBnaXZlbiBuYXRpdmUgb2JqZWN0IHRvIHRoaXMgZW50aXR5LlxyXG5cdCogQG1peGluIG4tb2JqZWN0XHJcblx0KiBAbWVtYmVyb2YgbmF0aXZlXHJcblx0KiBAcHJvcCB7c3RyaW5nfSByZXMgLSBUaGUgaWRlbnRpZmllciBmb3IgdGhlIHJlc291cmNlIHlvdSB3YW50LiBUaGlzIGNvbXBvbmVudFxyXG5cdCogY2FuIGFjY2VwdCBhbGwgcmVzb3VyY2VzIGV4Y2VwdCBmb3IgYGludGVyYWN0YWJsZXNgLlxyXG5cdCogQGV4YW1wbGUgPGEtZW50aXR5IG4tb2JqZWN0PSdyZXM6YXJjaGl0ZWN0dXJlL3dhbGwtNHctNGgnPjwvYS1lbnRpdHk+XHJcblx0Ki9cclxuXHRBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ24tb2JqZWN0Jywge1xyXG5cdFx0c2NoZW1hOiB7XHJcblx0XHRcdHJlczoge3R5cGU6ICdzdHJpbmcnfVxyXG5cdFx0fSxcclxuXHRcdGluaXQ6IG5hdGl2ZUNvbXBvbmVudEluaXQsXHJcblx0XHR1cGRhdGU6IG5hdGl2ZUNvbXBvbmVudFVwZGF0ZSxcclxuXHRcdHJlbW92ZTogbmF0aXZlQ29tcG9uZW50UmVtb3ZlXHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGFuIG9iamVjdCB0aGF0IHNwYXducyBhZGRpdGlvbmFsIGNvcGllcyBvZiBpdHNlbGYgd2hlbiBncmFiYmVkIGJ5IGEgdXNlciAodGhlIGNvcGllcyBhcmUgbm90IHNwYXduZXJzIHRoZW1zZWx2ZXMpLlxyXG5cdCogVGhlc2UgY29waWVzIHdpbGwgYmUgcGh5c2ljYWxseSBpbnRlcmFjdGl2ZSBhbmQgYXV0b21hdGljYWxseSBzeW5jaHJvbml6ZWRcclxuXHQqIGJldHdlZW4gdXNlcnMuXHJcblx0KiBAbWl4aW4gbi1zcGF3bmVyXHJcblx0KiBAbWVtYmVyb2YgbmF0aXZlXHJcblx0KiBAcHJvcCB7c3RyaW5nfSByZXMgLSBUaGUgaWRlbnRpZmllciBmb3IgdGhlIHJlc291cmNlIHlvdSB3YW50LiBUaGlzIGNvbXBvbmVudFxyXG5cdCogY2FuIG9ubHkgYWNjZXB0IHJlc291cmNlcyBvZiB0eXBlIGBpbnRlcmFjdGFibGVzYC5cclxuXHQqIEBleGFtcGxlIDxhLWVudGl0eSBuLXNwYXduZXI9J3JlczogaW50ZXJhY3RhYmxlcy9iYXNrZXRiYWxsJz48L2EtZW50aXR5PlxyXG5cdCovXHJcblx0QUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCduLXNwYXduZXInLCB7XHJcblx0XHRzY2hlbWE6IHtcclxuXHRcdFx0cmVzOiB7dHlwZTogJ3N0cmluZyd9XHJcblx0XHR9LFxyXG5cdFx0aW5pdDogbmF0aXZlQ29tcG9uZW50SW5pdCxcclxuXHRcdHVwZGF0ZTogbmF0aXZlQ29tcG9uZW50VXBkYXRlLFxyXG5cdFx0cmVtb3ZlOiBuYXRpdmVDb21wb25lbnRSZW1vdmVcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KiBDcmVhdGVzIGR5bmFtaWMgMkQgdGV4dCBvbiB0aGUgZW50aXR5LiBUaGUgdGV4dCB3aWxsIHdyYXAgYXV0b21hdGljYWxseSBiYXNlZCBvbiB0aGUgd2lkdGggYW5kIGhlaWdodCBwcm92aWRlZC5cclxuXHQqIFRoaXMgdGV4dCB3aWxsIGJlIGNsZWFyZXIgdGhhbiB0ZXh0dXJlLWJhc2VkIHRleHQgYW5kIG1vcmUgcGVyZm9ybWFudCB0aGFuIGdlb21ldHJ5LWJhc2VkIHRlc3QuXHJcblx0KiBAbWl4aW4gbi10ZXh0XHJcblx0KiBAbWVtYmVyb2YgbmF0aXZlXHJcblx0KiBAcHJvcCB7c3RyaW5nfSB0ZXh0IC0gVGhlIHRleHQgdG8gYmUgZHJhd24uXHJcblx0KiBAcHJvcCB7bnVtYmVyfSBmb250U2l6ZT0xMCAtIFRoZSBoZWlnaHQgb2YgdGhlIGxldHRlcnMuIDEwcHQgfj0gMW1cclxuXHQqIEBwcm9wIHtudW1iZXJ9IHdpZHRoPTEwIC0gVGhlIHdpZHRoIG9mIHRoZSB0ZXh0IGFyZWEgaW4gbWV0ZXJzLiBJZiB0aGVcclxuXHQqIHRleHQgaXMgd2lkZXIgdGhhbiB0aGlzIHZhbHVlLCB0aGUgb3ZlcmZsb3cgd2lsbCBiZSB3cmFwcGVkIHRvIHRoZSBuZXh0IGxpbmUuXHJcblx0KiBAcHJvcCB7bnVtYmVyfSBoZWlnaHQ9MSAtIFRoZSBoZWlnaHQgb2YgdGhlIHRleHQgYXJlYSBpbiBtZXRlcnMuIElmIHRoZVxyXG5cdCogdGV4dCBpcyB0YWxsZXIgdGhhbiB0aGlzIHZhbHVlLCB0aGUgb3ZlcmZsb3cgd2lsbCBiZSBjdXQgb2ZmLlxyXG5cdCogQHByb3Age3N0cmluZ30gaG9yaXpvbnRhbEFsaWduPW1pZGRsZSAtIFRoZSBob3Jpem9udGFsIGFuY2hvciBwb2ludCBmb3JcclxuXHQqIHRoZSB0ZXh0LiBDYW4gYmUgYGxlZnRgLCBgbWlkZGxlYCwgb3IgYHJpZ2h0YC5cclxuXHQqIEBwcm9wIHtzdHJpbmd9IHZlcnRpY2FsQWxpZ249bWlkZGxlIC0gVGhlIHZlcnRpY2FsIGFuY2hvciBwb2ludCBmb3IgdGhlXHJcblx0KiB0ZXh0LiBDYW4gYmUgYHRvcGAsIGBtaWRkbGVgLCBvciBgYm90dG9tYC5cclxuXHQqL1xyXG5cdEFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnbi10ZXh0Jywge1xyXG5cdFx0aW5pdDogbmF0aXZlQ29tcG9uZW50SW5pdCxcclxuXHRcdHVwZGF0ZTogbmF0aXZlQ29tcG9uZW50VXBkYXRlLFxyXG5cdFx0cmVtb3ZlOiBuYXRpdmVDb21wb25lbnRSZW1vdmUsXHJcblx0XHRzY2hlbWE6IHtcclxuXHRcdFx0dGV4dDogeyBkZWZhdWx0OiAnJywgdHlwZTogJ3N0cmluZycgfSxcclxuXHRcdFx0Lypjb2xvcjogeyBkZWZhdWx0OiAnd2hpdGUnLFxyXG5cdFx0XHRcdHBhcnNlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlRmxvYXQodmFsdWUsIDEwKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN0cmluZ2lmeTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xyXG5cdFx0XHRcdH19LCovXHJcblx0XHRcdGZvbnRTaXplOiB7IGRlZmF1bHQ6ICcxMCcsIHR5cGU6ICdpbnQnIH0sLy9yb3VnaGx5IGEgbWV0ZXIgdGFsbFxyXG5cdFx0XHR3aWR0aDogeyBkZWZhdWx0OiAnMTAnLCB0eXBlOiAnbnVtYmVyJyB9LC8vaW4gbWV0ZXJzXHJcblx0XHRcdGhlaWdodDogeyBkZWZhdWx0OiAnMScsIHR5cGU6ICdudW1iZXInIH0sLy9pbiBtZXRlcnNcclxuXHRcdFx0aG9yaXpvbnRhbEFsaWduOiB7IGRlZmF1bHQ6ICdtaWRkbGUnfSxcclxuXHRcdFx0dmVydGljYWxBbGlnbjogeyBkZWZhdWx0OiAnbWlkZGxlJ31cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly9vYmplY3Q6IGNvbGxpZGVzIGFnYWluc3Q6IG9iamVjdHMgLyBlbnZpcm9tZW50IC8gY3Vyc29yXHJcblx0Ly9lbnZpcm9ubWVudDogY2FuIGJlIHRlbGVwb3J0ZWQgb250bywgYW5kIGNvbGxpZGVzIGFnYWluc3Q6IG9iamVjdHMgLyBlbnZpcm9ubWVudCAvIGN1cnNvclxyXG5cdC8vaG9sb2dyYW06IGNvbGxpZGVzIGFnYWluc3Q6IGN1cnNvciAvIGhvbG9ncmFtc1xyXG5cclxuXHQvKipcclxuXHQqIEFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIHtAbGluayBuLm4tc3BoZXJlLWNvbGxpZGVyfSwge0BsaW5rIG4ubi1ib3gtY29sbGlkZXJ9LFxyXG5cdCoge0BsaW5rIG4ubi1jYXBzdWxlLWNvbGxpZGVyfSwgYW5kIHtAbGluayBuLm4tbWVzaC1jb2xsaWRlcn0uIFlvdSBjYW5ub3QgdXNlXHJcblx0KiB0aGlzIGNsYXNzIGRpcmVjdGx5LCBidXQgaW5zdGVhZCB5b3Ugc2hvdWxkIGFkZCBvbmUgb2YgdGhvc2UgY29tcG9uZW50c1xyXG5cdCogdG8geW91ciBvYmplY3RzLlxyXG5cdCogQG5hbWUgbi1jb2xsaWRlclxyXG5cdCogQG1peGluIG4tY29sbGlkZXJcclxuXHQqIEBtZW1iZXJvZiBuYXRpdmVcclxuXHQqIEBwcm9wIHt2ZWMzfSBjZW50ZXI9MCwwLDAgLSBUaGUgb2Zmc2V0IG9mIHRoZSBjb2xsaWRlciBpbiBsb2NhbCBzcGFjZS5cclxuXHQqIEBwcm9wIHtzdHJpbmd9IHR5cGU9aG9sb2dyYW0gLSBUaGUgdHlwZSBvZiBjb2xsaWRlciwgb25lIG9mOiBgb2JqZWN0YCB8IGBlbnZpcm9ubWVudGAgfCBgaG9sb2dyYW1gLlxyXG5cdCogT2JqZWN0IGNvbGxpZGVycyBjb2xsaWRlIHdpdGggb3RoZXIgb2JqZWN0cywgdGhlIGVudmlyb25tZW50LCBhbmQgdGhlIGN1cnNvci5cclxuXHQqIEVudmlyb25tZW50IGNvbGxpZGVycyBjb2xsaWRlIHdpdGggZXZlcnl0aGluZyBvYmplY3RzIGRvLCBidXQgeW91IGNhbiBhbHNvXHJcblx0KiB0ZWxlcG9ydCBvbnRvIHRoZW0uIEhvbG9ncmFtIGNvbGxpZGVycyBvbmx5IGNvbGxpZGUgd2l0aCBvdGhlciBob2xvZ3JhbXMgYW5kXHJcblx0KiB0aGUgY3Vyc29yLlxyXG5cdCovXHJcblxyXG5cdC8qKlxyXG5cdCogQ3JlYXRlIGEgc3BoZXJpY2FsIGNvbGxpZGVyIG9uIHRoaXMgZW50aXR5LlxyXG5cdCogQG1peGluIG4tc3BoZXJlLWNvbGxpZGVyXHJcblx0KiBAbWVtYmVyb2YgbmF0aXZlXHJcblx0KiBAZXh0ZW5kcyBuYXRpdmUubi1jb2xsaWRlclxyXG5cdCogQHByb3Age251bWJlcn0gcmFkaXVzPTEgLSBUaGUgc2l6ZSBvZiB0aGUgY29sbGlkZXIgaW4gbWV0ZXJzLlxyXG5cdCovXHJcblx0QUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCduLXNwaGVyZS1jb2xsaWRlcicsIHtcclxuXHRcdGluaXQ6bmF0aXZlQ29tcG9uZW50SW5pdCxcclxuXHRcdHJlbW92ZTogbmF0aXZlQ29tcG9uZW50UmVtb3ZlLFxyXG5cdFx0dXBkYXRlOiBuYXRpdmVDb21wb25lbnRVcGRhdGUsXHJcblx0XHRzY2hlbWE6IHtcclxuXHRcdFx0aXNUcmlnZ2VyOiB7IGRlZmF1bHQ6IGZhbHNlLCB0eXBlOiAnYm9vbGVhbicgfSxcclxuXHRcdFx0Y2VudGVyOiB7IHR5cGU6ICd2ZWMzJyB9LFxyXG5cdFx0XHRyYWRpdXM6IHsgZGVmYXVsdDogJzAnLCB0eXBlOiAnbnVtYmVyJyB9LFxyXG5cdFx0XHR0eXBlOiB7ZGVmYXVsdDogJ29iamVjdCd9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIGJveC1zaGFwZWQgY29sbGlkZXIgb24gdGhpcyBlbnRpdHkuXHJcblx0KiBAbWl4aW4gbi1ib3gtY29sbGlkZXJcclxuXHQqIEBtZW1iZXJvZiBuYXRpdmVcclxuXHQqIEBleHRlbmRzIG5hdGl2ZS5uLWNvbGxpZGVyXHJcblx0KiBAcHJvcCB7dmVjM30gc2l6ZT0xLDEsMSAtIFRoZSBkaW1lbnNpb25zIG9mIHRoZSBjb2xsaWRlci5cclxuXHQqL1xyXG5cdEFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnbi1ib3gtY29sbGlkZXInLCB7XHJcblx0XHRpbml0Om5hdGl2ZUNvbXBvbmVudEluaXQsXHJcblx0XHRyZW1vdmU6IG5hdGl2ZUNvbXBvbmVudFJlbW92ZSxcclxuXHRcdHVwZGF0ZTogbmF0aXZlQ29tcG9uZW50VXBkYXRlLFxyXG5cdFx0c2NoZW1hOiB7XHJcblx0XHRcdGlzVHJpZ2dlcjogeyBkZWZhdWx0OiBmYWxzZSwgdHlwZTogJ2Jvb2xlYW4nIH0sXHJcblx0XHRcdGNlbnRlcjogeyB0eXBlOiAndmVjMycgfSxcclxuXHRcdFx0c2l6ZTogeyB0eXBlOiAndmVjMycgfSxcclxuXHRcdFx0dHlwZToge2RlZmF1bHQ6ICdvYmplY3QnfVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIGNhcHN1bGUtc2hhcGVkIGNvbGxpZGVyIG9uIHRoaXMgZW50aXR5LiBDYXBzdWxlc1xyXG5cdCogYXJlIGEgdW5pb24gb2YgYSBjeWxpbmRlciBhbmQgdHdvIHNwaGVyZXMgb24gdG9wIGFuZCBib3R0b20uXHJcblx0KiBAbWl4aW4gbi1jYXBzdWxlLWNvbGxpZGVyXHJcblx0KiBAbWVtYmVyb2YgbmF0aXZlXHJcblx0KiBAZXh0ZW5kcyBuYXRpdmUubi1jb2xsaWRlclxyXG5cdCogQHByb3Age251bWJlcn0gcmFkaXVzPTEgLSBUaGUgcmFkaXVzIG9mIHRoZSBjYXBzdWxlIGluIG1ldGVycy5cclxuXHQqIEBwcm9wIHtudW1iZXJ9IGhlaWdodD0xIC0gVGhlIGhlaWdodCBvZiB0aGUgc2hhZnQgb2YgdGhlIGNhcHN1bGUgaW4gbWV0ZXJzLlxyXG5cdCogQHByb3Age3N0cmluZ30gZGlyZWN0aW9uPXkgLSBUaGUgYXhpcyB3aXRoIHdoaWNoIHRoZSBjYXBzdWxlIGlzIGFsaWduZWQuXHJcblx0KiBPbmUgb2YgYHhgLCBgeWAsIG9yIGB6YC5cclxuXHQqL1xyXG5cdEFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnbi1jYXBzdWxlLWNvbGxpZGVyJywge1xyXG5cdFx0aW5pdDpuYXRpdmVDb21wb25lbnRJbml0LFxyXG5cdFx0cmVtb3ZlOiBuYXRpdmVDb21wb25lbnRSZW1vdmUsXHJcblx0XHR1cGRhdGU6IG5hdGl2ZUNvbXBvbmVudFVwZGF0ZSxcclxuXHRcdHNjaGVtYToge1xyXG5cdFx0XHRpc1RyaWdnZXI6IHsgZGVmYXVsdDogZmFsc2UsIHR5cGU6ICdib29sZWFuJyB9LFxyXG5cdFx0XHRjZW50ZXI6IHsgdHlwZTogJ3ZlYzMnIH0sXHJcblx0XHRcdHJhZGl1czogeyBkZWZhdWx0OiAnMCcsIHR5cGU6ICdudW1iZXInIH0sXHJcblx0XHRcdGhlaWdodDogeyBkZWZhdWx0OiAnMCcsIHR5cGU6ICdudW1iZXInIH0sXHJcblx0XHRcdGRpcmVjdGlvbjogeyBkZWZhdWx0OiAneScgfSxcclxuXHRcdFx0dHlwZToge2RlZmF1bHQ6ICdvYmplY3QnfVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQqIEVuYWJsZSBjb2xsaXNpb24gZm9yIHRoZSBlbnRpcmUgYXR0YWNoZWQgbWVzaC4gVGhpcyBpcyBleHBlbnNpdmUgdG8gZXZhbHVhdGUsIHNvIHNob3VsZCBvbmx5IGJlIHVzZWQgb25cclxuXHQqIGxvdy1wb2x5IG1lc2hlcy5cclxuXHQqIEBtaXhpbiBuLW1lc2gtY29sbGlkZXJcclxuXHQqIEBtZW1iZXJvZiBuYXRpdmVcclxuXHQqIEBleHRlbmRzIG5hdGl2ZS5uLWNvbGxpZGVyXHJcblx0KiBAZXhhbXBsZSA8YS1ib3ggbi1tZXNoLWNvbGxpZGVyPjwvYS1ib3g+XHJcblx0KiBAcHJvcCB7Ym9vbH0gY29udmV4PXRydWUgLSBXaGV0aGVyIHRoZSBjb2xsaWRlciBzaG91bGQgYmUgY29udmV4IG9yIGNvbmNhdmUuIFNldCB0aGlzIHRvIGZhbHNlIGlmIHlvdSBoYXZlIGhvbGVzXHJcblx0KiBpbiB5b3VyIG1lc2guIENvbnZleCBjb2xsaWRlcnMgYXJlIGxpbWl0ZWQgdG8gMjU1IHRyaWFuZ2xlcy4gTm90ZTogY29uY2F2ZSBjb2xsaWRlcnMgY2FuIGJlIHNpZ25pZmljYW50bHkgbW9yZVxyXG5cdCogZXhwZW5zaXZlIGNvbXBhcmV0IHRvIGNvbnZlcyBjb2xsaWRlcnMuXHJcblx0Ki9cclxuXHRBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ24tbWVzaC1jb2xsaWRlcicsIHtcclxuXHRcdF9mb3JFYWNoTWVzaDogZnVuY3Rpb24gKGZ1bmMpIHtcclxuXHRcdFx0dmFyIG9iaiA9IHRoaXMuZWwub2JqZWN0M0RNYXAubWVzaDtcclxuXHRcdFx0aWYgKCFvYmopIHsgcmV0dXJuOyB9XHJcblx0XHRcdGlmIChvYmogaW5zdGFuY2VvZiBUSFJFRS5NZXNoKSB7XHJcblx0XHRcdFx0ZnVuYyhvYmopO1xyXG5cdFx0XHR9XHJcblx0XHRcdG9iai50cmF2ZXJzZShmdW5jdGlvbiAoY2hpbGRPYmopIHtcclxuXHRcdFx0XHRpZiAoY2hpbGRPYmogaW5zdGFuY2VvZiBUSFJFRS5NZXNoKSB7XHJcblx0XHRcdFx0XHRmdW5jKGNoaWxkT2JqKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0X2luaXRPYmo6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy5fZm9yRWFjaE1lc2goZnVuY3Rpb24gKG1lc2gpIHtcclxuXHRcdFx0XHRtZXNoSW5pdC5jYWxsKHRoaXMsIG1lc2gpO1xyXG5cclxuXHRcdFx0XHQvL3RvIHBhc3MgZGVmYXVsdHNcclxuXHRcdFx0XHRhbHRzcGFjZS51cGRhdGVOYXRpdmVDb21wb25lbnQobWVzaCwgdGhpcy5uYW1lLCB0aGlzLmRhdGEpO1xyXG5cdFx0XHR9LmJpbmQodGhpcykpO1xyXG5cdFx0fSxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gQWxsb3cgYS1mcmFtZSB0byBjcmVhdGUgYSBQbGFjZWhvbGRlck1lc2ggaWYgdGhlcmUgaXNuJ3QgYWxyZWFkeSBvbmUsIHNvIHRoYXQgdGhlIG5hdGl2ZSBjb2xsaWRlciBpc1xyXG5cdFx0XHQvLyByZWdpc3RlcmVkLlxyXG5cdFx0XHR0aGlzLmVsLmdldE9yQ3JlYXRlT2JqZWN0M0QoJ21lc2gnLCBQbGFjZWhvbGRlck1lc2gpO1xyXG5cclxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgZXhpc3RpbmcgbWVzaFxyXG5cdFx0XHR0aGlzLl9pbml0T2JqKCk7XHJcblxyXG5cdFx0XHR0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vZGVsLWxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQvLyBSZS1pbml0aWFsaXplIHRoZSBjb2xsaWRlciBpZiBhIG5ldyBtb2RlbCBpcyBsb2FkZWRcclxuXHRcdFx0XHR0aGlzLl9pbml0T2JqKCk7XHJcblx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuX2ZvckVhY2hNZXNoKGZ1bmN0aW9uIChtZXNoKSB7XHJcblx0XHRcdFx0YWx0c3BhY2UucmVtb3ZlTmF0aXZlQ29tcG9uZW50KG1lc2gsIHRoaXMubmFtZSk7XHJcblx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlOiBmdW5jdGlvbiAob2xkRGF0YSkge1xyXG5cdFx0XHR0aGlzLl9mb3JFYWNoTWVzaChmdW5jdGlvbiAobWVzaCkge1xyXG5cdFx0XHRcdGFsdHNwYWNlLnVwZGF0ZU5hdGl2ZUNvbXBvbmVudChtZXNoLCB0aGlzLm5hbWUsIHRoaXMuZGF0YSk7XHJcblx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0c2NoZW1hOiB7XHJcblx0XHRcdGlzVHJpZ2dlcjogeyBkZWZhdWx0OiBmYWxzZSwgdHlwZTogJ2Jvb2xlYW4nIH0sXHJcblx0XHRcdGNvbnZleDogeyBkZWZhdWx0OiB0cnVlLCB0eXBlOiAnYm9vbGVhbicgfSxcclxuXHRcdFx0dHlwZToge2RlZmF1bHQ6ICdvYmplY3QnfVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQqIE1ha2UgdGhlIG9iamVjdCdzICtaIGFsd2F5cyBmYWNlIHRoZSB2aWV3ZXIuIEN1cnJlbnRseSB3aWxsIG9ubHkgZGlyZWN0bHkgYXBwbHkgdG8gbWFpbiBtZXNoIG9yIG5hdGl2ZSBjb21wb25lbnQgb24gdGhlIGF0dGFjaGVkIGVudGl0eSwgbm90IGFueSBjaGlsZHJlbiBvciBzdWJtZXNoZXMuXHJcblx0KiBAbWl4aW4gbi1iaWxsYm9hcmRcclxuXHQqIEBtZW1iZXJvZiBuYXRpdmVcclxuXHQqIEBleGFtcGxlIDxhLXBsYW5lIG4tYmlsbGJvYXJkPjwvYS1wbGFuZT5cclxuXHQqL1xyXG5cdEFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnbi1iaWxsYm9hcmQnLCB7XHJcblx0XHRpbml0Om5hdGl2ZUNvbXBvbmVudEluaXQsXHJcblx0XHRyZW1vdmU6IG5hdGl2ZUNvbXBvbmVudFJlbW92ZSxcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KiBBIGNvbnRhaW5lciBrZWVwcyBhIHJ1bm5pbmcgdGFsbHkgb2YgaG93IG1hbnkgb2JqZWN0cyBhcmUgd2l0aGluXHJcblx0KiBpdHMgYm91bmRzLCBhbmQgYWRkcyBhbmQgcmVtb3ZlcyB0aGUgc3RhdGVzIGBjb250YWluZXItZnVsbGAgYW5kXHJcblx0KiBgY29udGFpbmVyLWVtcHR5YCBiYXNlZCBvbiB0aGUgY3VycmVudCBjb3VudCBvZiBvYmplY3RzLiBDYW4gZmlyZSB0aHJlZVxyXG5cdCogc3BlY2lhbCBldmVudHM6IGBjb250YWluZXItZnVsbGAsIGBjb250YWluZXItZW1wdHlgLCBhbmQgYGNvbnRhaW5lci1jb3VudC1jaGFuZ2VkYC5cclxuXHQqIEBtaXhpbiBuLWNvbnRhaW5lclxyXG5cdCogQG1lbWJlcm9mIG5hdGl2ZVxyXG5cdCogQHByb3Age251bWJlcn0gY2FwYWNpdHk9NCAtIFRoZSB2YWx1ZSBhdCB3aGljaCB0aGUgY29udGFpbmVyIHdpbGwgZmlyZSB0aGVcclxuXHQqIGBjb250YWluZXItZnVsbGAgZXZlbnQuXHJcblx0Ki9cclxuXHRBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ24tY29udGFpbmVyJywge1xyXG5cdFx0aW5pdDogZnVuY3Rpb24oKXtcclxuXHRcdFx0bmF0aXZlQ29tcG9uZW50SW5pdC5jYWxsKHRoaXMpO1xyXG5cclxuXHRcdFx0dmFyIGVsID0gdGhpcy5lbDtcclxuXHRcdFx0dmFyIGNvbXBvbmVudCA9IHRoaXM7XHJcblxyXG5cdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdzdGF0ZWFkZGVkJywgZnVuY3Rpb24oZXZlbnQpe1xyXG5cdFx0XHRcdGlmKGV2ZW50LmRldGFpbC5zdGF0ZSA9PT0gJ2NvbnRhaW5lci1mdWxsJyl7XHJcblx0XHRcdFx0XHRlbC5lbWl0KCdjb250YWluZXItZnVsbCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZihldmVudC5kZXRhaWwuc3RhdGUgPT09ICdjb250YWluZXItZW1wdHknKXtcclxuXHRcdFx0XHRcdGVsLmVtaXQoJ2NvbnRhaW5lci1lbXB0eScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjb250YWluZXItY291bnQtY2hhbmdlZCcsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHRcdFx0XHRjb21wb25lbnQuY291bnQgPSBldmVudC5kZXRhaWwuY291bnQ7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZTogbmF0aXZlQ29tcG9uZW50UmVtb3ZlLFxyXG5cdFx0dXBkYXRlOiBuYXRpdmVDb21wb25lbnRVcGRhdGUsXHJcblx0XHRzY2hlbWE6IHtcclxuXHRcdFx0Y2FwYWNpdHk6IHsgZGVmYXVsdDogNCwgdHlwZTogJ251bWJlcicgfSxcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KiBQbGF5IHRoZSBzb3VuZCBnaXZlbiBieSB0aGUgYHNyY2Agb3IgYHJlc2AgcHJvcGVydHkgZnJvbSB0aGUgbG9jYXRpb25cclxuXHQqIG9mIHRoZSBlbnRpdHkuXHJcblx0KiBAbWl4aW4gbi1zb3VuZFxyXG5cdCogQG1lbWJlcm9mIG5hdGl2ZVxyXG5cdCogQHByb3Age3N0cmluZ30gcmVzIC0gVGhlIHJlc291cmNlIGlkZW50aWZpZXIgZm9yIGEgYnVpbHQtaW4gc291bmQgY2xpcC5cclxuXHQqIEBwcm9wIHtzdHJpbmd9IHNyYyAtIEEgVVJMIHRvIGFuIGV4dGVybmFsIHNvdW5kIGNsaXAuIFRoZSBzb3VuZCBjYW4gYmUgaW4gV0FWLCBPR0cgb3IgTVAzIGZvcm1hdC4gSG93ZXZlci4gb25seVxyXG5cdCogV0FWIGlzIHN1cHBvcnRlZCBvbiBhbGwgcGxhdGZvcm1zLiBNUDMgaXMgc3VwcG9ydGVkIG9uIEdlYXIgVlIgYW5kIE9HRyBpcyBzdXBwb3J0ZWQgb24gZGVza3RvcC5cclxuXHQqIEBwcm9wIHtzdHJpbmd9IG9uIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRoYXQgd2lsbCBwbGF5IHRoaXMgc291bmQgY2xpcC5cclxuXHQqIEBwcm9wIHtib29sZWFufSBsb29wPWZhbHNlIC0gVGVsbHMgdGhlIGNsaXAgdG8gbG9vcCBiYWNrIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGNsaXBcclxuXHQqIG9uY2UgaXQncyBmaW5pc2hlZC5cclxuXHQqIEBwcm9wIHtib29sZWFufSBhdXRvcGxheT1mYWxzZSAtIFRlbGxzIHRoZSBjbGlwIHRvIHN0YXJ0IGF1dG9tYXRpY2FsbHkgd2hlblxyXG5cdCogdGhlIHNjZW5lIGxvYWRzLCBpbnN0ZWFkIG9mIHdhaXRpbmcgZm9yIGBwbGF5U291bmQoKWAuXHJcblx0KiBAcHJvcCB7Ym9vbGVhbn0gb25lc2hvdD1mYWxzZSAtIFRlbGxzIHRoZSBjbGlwIHRvIGNsZWFuIGl0c2VsZiB1cCB3aGVuIGl0XHJcblx0KiBmaW5pc2hlcyBwbGF5aW5nLiBBbGxvd3MgZm9yIG92ZXJsYXBwaW5nIGluc3RhbmNlcyBvZiB0aGUgc291bmQuXHJcblx0KiBAcHJvcCB7bnVtYmVyfSB2b2x1bWU9MSAtIFRoZSB2b2x1bWUgb2YgdGhlIGNsaXAsIGZyb20gWzAsMV0uXHJcblx0KiBAcHJvcCB7bnVtYmVyfSBzcGF0aWFsQmxlbmQ9MSAtIEhvdyBzcGF0aWFsaXplZCBhIHNvdW5kIGlzLCBmcm9tIFswLDFdLlxyXG5cdCogQSB2YWx1ZSBvZiAxIHdpbGwgYmUgZnVsbHkgbG9jYWxpemVkLCBhbmQgdGhlIHNvdW5kIHdpbGwgcGFuIGxlZnQgYW5kXHJcblx0KiByaWdodCBhcyB5b3UgdHVybiB5b3VyIGhlYWQuIEEgdmFsdWUgb2YgMCBtYWtlcyBpdCBub24tc3BhdGlhbGl6ZWQsIGFuZFxyXG5cdCogaXQgd2lsbCBhbHdheXMgYmUgaGVhcmQgaW4gYm90aCBlYXJzLlxyXG5cdCogQHByb3Age251bWJlcn0gcGl0Y2g9MSAtIFRoZSBzcGVlZCBtdWx0aXBsaWVyIGZvciB0aGUgc291bmQuIDAuNSBpcyBvbmVcclxuXHQqIG9jdGF2ZSBkb3duLCBhbmQgMiBpcyBvbmUgb2N0YXZlIHVwLlxyXG5cdCogQHByb3Age251bWJlcn0gbWluRGlzdGFuY2U9MSAtIEluc2lkZSB0aGlzIGRpc3RhbmNlIGluIG1ldGVycyxcclxuXHQqIHRoZSBzb3VuZCB2b2x1bWUgaXMgYXQgZnVsbCB2b2x1bWUuXHJcblx0KiBAcHJvcCB7bnVtYmVyfSBtYXhEaXN0YW5jZT0xMiAtIElmIHJvbGxvZmYgaXMgJ2xvZ2FyaXRobWljJywgdGhlIHNvdW5kIHdpbGwgc3RvcCBhdHRlbnVhdGluZyBhdCB0aGlzIGRpc3RhbmNlLlxyXG5cdCogSWYgcm9sbG9mZiBpcyAnbGluZWFyJyBvciAnY29zaW5lJywgdGhlIHNvdW5kIHdpbGwgYmUgc2lsZW50IGF0IHRoaXMgZGlzdGFuY2UuXHJcblx0KiBAcHJvcCB7c3RyaW5nfSByb2xsb2ZmPSdsb2dhcml0aG1pYycgLSBTZXQgdGhpcyB0byAnbGluZWFyJyBvciAnY29zaW5lJyBpZiB5b3Ugd2FudCB0byBjdXQgc291bmRzIG9mZiBhdCBhXHJcblx0KiBtYXhEaXN0YW5jZS5cclxuXHQqL1xyXG5cdC8qKlxyXG5cdCogRmlyZWQgd2hlbiBhIHNvdW5kIGhhcyBsb2FkZWQgYW5kIGlzIHJlYWR5IHRvIGJlIHBsYXllZFxyXG5cdCogQGV2ZW50IG5hdGl2ZS5uLXNvdW5kI24tc291bmQtbG9hZGVkXHJcblx0Ki9cclxuXHRBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ24tc291bmQnLCB7XHJcblx0XHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBzcmMgPSB0aGlzLmRhdGEuc3JjO1xyXG5cdFx0XHRpZiAoc3JjICYmICFzcmMuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XHJcblx0XHRcdFx0aWYgKHNyYy5zdGFydHNXaXRoKCcvJykpIHtcclxuXHRcdFx0XHRcdHRoaXMuZGF0YS5zcmMgPSBsb2NhdGlvbi5vcmlnaW4gKyBzcmM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFyIGN1cnJQYXRoID0gbG9jYXRpb24ucGF0aG5hbWU7XHJcblx0XHRcdFx0XHRpZiAoIWN1cnJQYXRoLmVuZHNXaXRoKCcvJykpIHtcclxuXHRcdFx0XHRcdFx0Y3VyclBhdGggPSBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5qb2luKCcvJykgKyAnLyc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLmRhdGEuc3JjID0gbG9jYXRpb24ub3JpZ2luICsgY3VyclBhdGggKyBzcmM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdG5hdGl2ZUNvbXBvbmVudEluaXQuY2FsbCh0aGlzKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQqIFN0b3AgdGhlIHBsYXlpbmcgc291bmQsIGFuZCBwcmVzZXJ2ZSBwb3NpdGlvbiBpbiBjbGlwLlxyXG5cdFx0KiBAbWV0aG9kIG5hdGl2ZS5uLXNvdW5kI3BhdXNlU291bmRcclxuXHRcdCovXHJcblx0XHRwYXVzZVNvdW5kOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGNhbGxDb21wb25lbnQuY2FsbCh0aGlzLCAncGF1c2UnKTtcclxuXHRcdFx0dGhpcy5lbC5lbWl0KCdzb3VuZC1wYXVzZWQnKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQqIFN0YXJ0IHRoZSBzb3VuZCBwbGF5aW5nLlxyXG5cdFx0KiBAbWV0aG9kIG5hdGl2ZS5uLXNvdW5kI3BsYXlTb3VuZFxyXG5cdFx0Ki9cclxuXHRcdHBsYXlTb3VuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRjYWxsQ29tcG9uZW50LmNhbGwodGhpcywgJ3BsYXknKTtcclxuXHRcdFx0dGhpcy5lbC5lbWl0KCdzb3VuZC1wbGF5ZWQnKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQqIEp1bXAgdG8gYSBwb3NpdGlvbiBpbiB0aGUgY2xpcC5cclxuXHRcdCogQG1ldGhvZCBuYXRpdmUubi1zb3VuZCNzZWVrXHJcblx0XHQqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIGp1bXAgdG8uXHJcblx0XHQqL1xyXG5cdFx0c2VlazogZnVuY3Rpb24gKHRpbWUpIHtcclxuXHRcdFx0Y2FsbENvbXBvbmVudC5jYWxsKHRoaXMsICdzZWVrJywge3RpbWU6IHRpbWV9KTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0bmF0aXZlQ29tcG9uZW50UmVtb3ZlLmNhbGwodGhpcyk7XHJcblx0XHRcdGlmICh0aGlzLnBsYXlIYW5kbGVyKSB7XHJcblx0XHRcdCAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKG9sZERhdGEub24sIHRoaXMucGxheUhhbmRsZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlOiBmdW5jdGlvbiAob2xkRGF0YSkge1xyXG5cdFx0XHRuYXRpdmVDb21wb25lbnRVcGRhdGUuY2FsbCh0aGlzLCBvbGREYXRhKTtcclxuXHRcdFx0aWYgKHRoaXMucGxheUhhbmRsZXIpIHtcclxuXHRcdFx0ICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIob2xkRGF0YS5vbiwgdGhpcy5wbGF5SGFuZGxlcik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuZGF0YS5vbikge1xyXG5cdFx0XHQgIHRoaXMucGxheUhhbmRsZXIgPSB0aGlzLnBsYXlTb3VuZC5iaW5kKHRoaXMpO1xyXG5cdFx0XHQgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEub24sIHRoaXMucGxheUhhbmRsZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c2NoZW1hOiB7XHJcblx0XHRcdG9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXHJcblx0XHRcdHJlczogeyB0eXBlOiAnc3RyaW5nJyB9LFxyXG5cdFx0XHRzcmM6IHsgdHlwZTogJ3N0cmluZycgfSxcclxuXHRcdFx0bG9vcDogeyB0eXBlOiAnYm9vbGVhbicgfSxcclxuXHRcdFx0dm9sdW1lOiB7IHR5cGU6ICdudW1iZXInLCBkZWZhdWx0OiAxIH0sXHJcblx0XHRcdGF1dG9wbGF5OiB7IHR5cGU6ICdib29sZWFuJyB9LFxyXG5cdFx0XHRvbmVzaG90OiB7IHR5cGU6ICdib29sZWFuJyB9LFxyXG5cdFx0XHRzcGF0aWFsQmxlbmQ6IHsgdHlwZTogJ2Zsb2F0JywgZGVmYXVsdDogMSB9LFxyXG5cdFx0XHRwaXRjaDogeyB0eXBlOiAnZmxvYXQnLCBkZWZhdWx0OiAxIH0sXHJcblx0XHRcdG1pbkRpc3RhbmNlOiB7IHR5cGU6ICdmbG9hdCcsIGRlZmF1bHQ6IDEgfSxcclxuXHRcdFx0bWF4RGlzdGFuY2U6IHsgdHlwZTogJ2Zsb2F0JywgZGVmYXVsdDogMTIgfSxcclxuXHRcdFx0cm9sbG9mZjogeyB0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ2xvZ2FyaXRobWljJyB9LFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxufSkoKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9uYXRpdmUtY29tcG9uZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHRoaXMgZmlsZSBpcyBqdXN0IGZvciBnb29kIG1lYXN1cmUuIGRpZG4ndCB3YW50IG5hdGl2ZS1jb21wb25lbnRzIGdldHRpbmcgdG9vIGNsdXR0ZXJlZC5cclxuXHJcbi8qKlxyXG4qIFRoaXMgbmFtZXNwYWNlIGRlc2NyaWJlcyBzdHJpbmdzIHRoYXQgYXJlIHZhbGlkIGlucHV0cyB0byB0aGUgdmFyaW91cyBuYXRpdmVcclxuKiBjb21wb25lbnRzLiBTb21lIGNvbXBvbmVudHMgY2FuIG9ubHkgdGFrZSBjZXJ0YWluIHR5cGVzIG9mIHJlc291cmNlcywgaS5lLlxyXG4qIHtAbGluayBuLm4tc3Bhd25lcn0gY2FuIG9ubHkgYWNjZXB0IGBpbnRlcmFjdGFibGVzYC5cclxuKiBAbmFtZXNwYWNlIHJlc291cmNlc1xyXG4qIEBleGFtcGxlIDxhLWVudGl0eSBuLW9iamVjdD0ncmVzOiBhcmNoaXRlY3R1cmUvY2VpbGluZy0ydy0ybCc+PC9hLWVudGl0eT5cclxuKi9cclxuXHJcbi8qKlxyXG4qIEdlbmVyaWMgbW9kdWxhciBidWlsZGluZyBwaWVjZXMuIEFsbCBwaWVjZXMgYXJlIGFsaWduZWQgdG8gb25lIGNvcm5lciwgc3VjaCB0aGF0XHJcbiogdGhlIHBpZWNlIGV4dGVuZHMgb3V0IHRvd2FyZCAtWCBhbmQgK1ouXHJcbiogQG5hbWUgYXJjaGl0ZWN0dXJlXHJcbiogQGVudW0gYXJjaGl0ZWN0dXJlXHJcbiogQG1lbWJlcm9mIHJlc291cmNlc1xyXG4qXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL2NlaWxpbmctMnctMmxcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvY2VpbGluZy00dy00bFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS9jZWlsaW5nLTR3LTRsXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL2NlaWxpbmctc2t5bGlnaHQtNHctNGxcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvY2VpbGluZy1za3lsaWdodC1jb3JuZXItMnctMmxcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvY2VpbGluZy1za3lsaWdodC1lZGdlLTJ3XHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL2NlaWxpbmctc2t5bGlnaHQtZWRnZS00d1xyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS9jZWlsaW5nLXNreWxpZ2h0LWZpbGxlci00dy00bC0yXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL2NlaWxpbmctc2t5bGlnaHQtZmlsbGVyLTR3LTRsXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL2NlaWxpbmctc2xpY2UtY29uY2F2ZS0yclxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS9jZWlsaW5nLXNsaWNlLWNvbmNhdmUtNHJcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvY2VpbGluZy1zbGljZS1jb252ZXgtMnJcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvY2VpbGluZy1zbGljZS1jb252ZXgtNHJcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvZG9vci00dy00aFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS9mbG9vci0ydy0ybFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS9mbG9vci0ydy00bFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS9mbG9vci00dy0ybFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS9mbG9vci00dy00bFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS9mbG9vci1zbGljZS1jb25jYXZlLTJyXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL2Zsb29yLXNsaWNlLWNvbmNhdmUtNHJcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvZmxvb3Itc2xpY2UtY29udmV4LTJyXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL2Zsb29yLXNsaWNlLWNvbnZleC00clxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS9yYWlsaW5nLTJsXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3JhaWxpbmctNGxcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvcmFpbGluZy1jdXJ2ZS1jb25jYXZlLTJyXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtMnctNGhcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC00dy00aFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS93YWxsLWJhc2UtMndcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC1iYXNlLTR3XHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtYmFzZS1jdXJ2ZS1jb25jYXZlLTJyXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtYmFzZS1jdXJ2ZS1jb25jYXZlLTRyXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtYmFzZS1jdXJ2ZS1jb252ZXgtMnJcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC1iYXNlLWN1cnZlLWNvbnZleC00clxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS93YWxsLWJ1bGtoZWFkLTJ3XHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtYnVsa2hlYWQtNHdcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC1idWxraGVhZC1jdXJ2ZS1jb25jYXZlLTJyXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtYnVsa2hlYWQtY3VydmUtY29uY2F2ZS00clxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS93YWxsLWJ1bGtoZWFkLWN1cnZlLWNvbnZleC0yclxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS93YWxsLWJ1bGtoZWFkLWN1cnZlLWNvbnZleC00clxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS93YWxsLWN1cnZlLWNvbmNhdmUtMnItNGhcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC1jdXJ2ZS1jb25jYXZlLTRyLTRoXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtY3VydmUtY29udmV4LTJyLTRoXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtY3VydmUtY29udmV4LTRyLTRoXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtY3VydmUtd2luZG93LWNvbmNhdmUtNHItNGhcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC1jdXJ2ZS13aW5kb3ctY29uY2F2ZS1maWxsZXItNHItNGhcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC1jdXJ2ZS13aW5kb3ctZ2FwLWNvbmNhdmUtNHItNGhcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC1jdXJ2ZS13aW5kb3ctZ2FwLWVuZC1sLWNvbmNhdmUtNHItNGhcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC1jdXJ2ZS13aW5kb3ctZ2FwLWVuZC1yLWNvbmNhdmUtNHItNGhcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC1maWxsZXItY29ybmVyLWlubmVyLTRoXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtZmlsbGVyLWNvcm5lci1vdXRlci00aFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS93YWxsLXdpbmRvdy00dy00aFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS93YWxsLXdpbmRvdy1maWxsZXItMlxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS93YWxsLXdpbmRvdy1nYXAtMnctNGhcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC13aW5kb3ctZ2FwLTR3LTRoXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtd2luZG93LWdhcC1lbmQtbC0ydy00aFxyXG4qIEBwcm9wIGFyY2hpdGVjdHVyZS93YWxsLXdpbmRvdy1nYXAtZW5kLWwtNHctNGhcclxuKiBAcHJvcCBhcmNoaXRlY3R1cmUvd2FsbC13aW5kb3ctZ2FwLWVuZC1yLTJ3LTRoXHJcbiogQHByb3AgYXJjaGl0ZWN0dXJlL3dhbGwtd2luZG93LWdhcC1lbmQtci00dy00aFxyXG4qL1xyXG5cclxuLyoqXHJcbiogUGFydGljbGUgc3lzdGVtcyBhbmQgb3RoZXIgbmF0aXZlIGVmZmVjdHNcclxuKiBAbmFtZSBlZmZlY3RzXHJcbiogQGVudW0gZWZmZWN0c1xyXG4qIEBtZW1iZXJvZiByZXNvdXJjZXNcclxuKlxyXG4qIEBwcm9wIGVmZmVjdHMvZXhwbG9zaW9uIC0gQSBwYXJ0aWNsZSBzeXN0ZW0gd2l0aCBhIGNlbnRyYWwgZmxhc2gsIHRoZW4gZGVicmlzIGZseWluZyBvdXR3YXJkLlxyXG4qIFRoaXMgaXMgYSBub24tbG9vcGluZyBlZmZlY3QuXHJcbiogQHByb3AgZWZmZWN0cy9maXJlIC0gQW4gYW5pbWF0ZWQgZmlyZSBwYXJ0aWNsZSwgc3VpdGFibGUgZm9yIGEgdG9yY2guXHJcbiogQHByb3AgZWZmZWN0cy9maXJlLXRyYWlsIC0gRmlyZSB0aGF0IHRyYWlscyB0aGUgZW50aXR5IHRocm91Z2ggc3BhY2UgYXMgaXQgbW92ZXMuIE9ubHkgaXMgdmlzaWJsZSB3aGlsZSBhbiBvYmplY3QgaXMgaW4gbW90aW9uXHJcbiogQHByb3AgZWZmZWN0cy9maXJld29ya3MgLSBBIGNvbXBvdW5kIHBhcnRpY2xlIHN5c3RlbSB0aGF0IHNob290cyB1cCBmcm9tIHRoZSBlbnRpdHksXHJcbiogZXhwbG9kZXMgaW50byBjb2xvcmVkIHNwYXJrcywgdGhlbiB0cmFuc2l0aW9ucyB0byBnb2xkIHN0cmVhbWVycy5cclxuKiBAcHJvcCBlZmZlY3RzL3Ntb2tlIC0gQmlsbG93aW5nIHNtb2tlIHBhcnRpY2xlIHN5c3RlbS5cclxuKiBAcHJvcCBlZmZlY3RzL3NwYXJrbGVyIC0gRW1pdHMgc3BhcmtzIGluIGFsbCBkaXJlY3Rpb25zXHJcbiogQHByb3AgZWZmZWN0cy9zdGVhbSAtIFNtYWxsIHdoaXRlIHN0ZWFtIHJpc2luZyB1cHdhcmRzXHJcbiovXHJcblxyXG4vKipcclxuKiBPYmplY3RzIHRoYXQgY2FuIGJlIHBpY2tlZCB1cCwgdGhyb3duLCBhbmQgb3RoZXJ3aXNlIGludGVyYWN0ZWQgd2l0aC5cclxuKiBAbmFtZSBpbnRlcmFjdGFibGVzXHJcbiogQGVudW0gaW50ZXJhY3RhYmxlc1xyXG4qIEBtZW1iZXJvZiByZXNvdXJjZXNcclxuKlxyXG4qIEBwcm9wIGludGVyYWN0YWJsZXMvYmFza2V0YmFsbFxyXG4qIEBwcm9wIGludGVyYWN0YWJsZXMvYm93bGluZ2JhbGxcclxuKiBAcHJvcCBpbnRlcmFjdGFibGVzL2Jvd2xpbmctcGluXHJcbiogQHByb3AgaW50ZXJhY3RhYmxlcy9ib3hcclxuKiBAcHJvcCBpbnRlcmFjdGFibGVzL2NvaW5cclxuKiBAcHJvcCBpbnRlcmFjdGFibGVzL2dlbVxyXG4qIEBwcm9wIGludGVyYWN0YWJsZXMvcmluZ1xyXG4qIEBwcm9wIGludGVyYWN0YWJsZXMvc29jY2VyYmFsbFxyXG4qL1xyXG5cclxuLyoqXHJcbiogU3RhdGljIG1vZGVscyB0aGF0IHlvdSBjYW4gcGxhY2UgaW4geW91ciBzY2VuZS5cclxuKiBAbmFtZSBvYmplY3RzXHJcbiogQGVudW0gb2JqZWN0c1xyXG4qIEBtZW1iZXJvZiByZXNvdXJjZXNcclxuKlxyXG4qIEBwcm9wIG9iamVjdHMvYmFza2V0YmFsbC1ob29wXHJcbiogQHByb3Agb2JqZWN0cy9jb2luXHJcbiogQHByb3Agb2JqZWN0cy9jdXBcclxuKiBAcHJvcCBvYmplY3RzL2dlbVxyXG4qIEBwcm9wIG9iamVjdHMvaG9vcFxyXG4qIEBwcm9wIG9iamVjdHMvcmluZ1xyXG4qIEBwcm9wIG9iamVjdHMvdGFyZ2V0LWFyY2hlcnlcclxuKi9cclxuXHJcbi8qKlxyXG4qIEEgc2VsZWN0aW9uIG9mIHBpcGVzL2NodXRlcy9ldGMuXHJcbiogQG5hbWUgcGlwZXNcclxuKiBAZW51bSBwaXBlc1xyXG4qIEBtZW1iZXJvZiByZXNvdXJjZXNcclxuKlxyXG4qIEBwcm9wIHBpcGVzL3BpcGUtZnVsbC1jYXAtMWRcclxuKiBAcHJvcCBwaXBlcy9waXBlLWZ1bGwtY3Jvc3MtMWRcclxuKiBAcHJvcCBwaXBlcy9waXBlLWZ1bGwtZWxib3ctMWRcclxuKiBAcHJvcCBwaXBlcy9waXBlLWZ1bGwtZm9yay0xZFxyXG4qIEBwcm9wIHBpcGVzL3BpcGUtZnVsbC1zdHJhaWdodC0xZC0xbFxyXG4qIEBwcm9wIHBpcGVzL3BpcGUtZnVsbC1zdHJhaWdodC0xZC0ybFxyXG4qIEBwcm9wIHBpcGVzL3BpcGUtZnVsbC1zdHJhaWdodC0xZC00bFxyXG4qIEBwcm9wIHBpcGVzL3BpcGUtZnVsbC10ZWUtMWRcclxuKiBAcHJvcCBwaXBlcy9waXBlLWhhbGYtY2FwLTFkXHJcbiogQHByb3AgcGlwZXMvcGlwZS1oYWxmLWNyb3NzLTFkXHJcbiogQHByb3AgcGlwZXMvcGlwZS1oYWxmLWVsYm93LTFkXHJcbiogQHByb3AgcGlwZXMvcGlwZS1oYWxmLWZvcmstMWRcclxuKiBAcHJvcCBwaXBlcy9waXBlLWhhbGYtc3RyYWlnaHQtMWQtMWxcclxuKiBAcHJvcCBwaXBlcy9waXBlLWhhbGYtc3RyYWlnaHQtMWQtMmxcclxuKiBAcHJvcCBwaXBlcy9waXBlLWhhbGYtc3RyYWlnaHQtMWQtNGxcclxuKiBAcHJvcCBwaXBlcy9waXBlLWhhbGYtdGVlLTFkXHJcbiovXHJcblxyXG4vKipcclxuKiBDb21tb24gVUkgc291bmRzIGNhbiBiZSB1c2VkIGZvciBhIGNvbnNpc3RlbnQgVUkgZXhwZXJpZW5jZS5cclxuKiBAbmFtZSBzb3VuZHMtdWlcclxuKiBAZW51bSBzb3VuZHMtdWlcclxuKiBAbWVtYmVyb2YgcmVzb3VyY2VzXHJcbipcclxuKiBAcHJvcCB1aS9zZWxlY3RcclxuKiBAcHJvcCB1aS90b2dnbGVcclxuKiBAcHJvcCB1aS9ub3RpZnlcclxuKiBAcHJvcCB1aS9lcnJvclxyXG4qIEBwcm9wIHVpL2NvbXBsZXRlXHJcbiogQHByb3AgdWkvc3VjY2VlZFxyXG4qIEBwcm9wIHVpL292ZXJcclxuKiBAcHJvcCB1aS9qb2luXHJcbiogQHByb3AgdWkvY2xpY2tcclxuKi9cclxuXHJcbi8qKlxyXG4qIEZvbGV5IHNvdW5kcyBhcmUgcmVhbCBzb3VuZHMgZGVzaWduZWQgZm9yIHRhbmdpYmxlLCB0b3VjaGFibGUgb2JqZWN0cyBhcyB0aGV5IGFyZSBoZWFyZCBpbiB0aGUgcmVhbCB3b3JsZC5cclxuKiBAbmFtZSBzb3VuZHMtZm9sZXlcclxuKiBAZW51bSBzb3VuZHMtZm9sZXlcclxuKiBAbWVtYmVyb2YgcmVzb3VyY2VzXHJcbipcclxuKiBAcHJvcCBmb2xleS9tZXRhbC1zY3JhcGVcclxuKiBAcHJvcCBmb2xleS9tZXRhbC1jbGFja1xyXG4qIEBwcm9wIGZvbGV5L21ldGFsLXJhdHRsZVxyXG4qIEBwcm9wIGZvbGV5L2NvaW4tamluZ2xlXHJcbiogQHByb3AgZm9sZXkvcGFwZXItc2h1ZmZsZVxyXG4qIEBwcm9wIGZvbGV5L2V4cGxvZGVcclxuKi9cclxuXHJcbi8qKlxyXG4qIEVmZmVjdCBzb3VuZHMgZm9yIGEgdmFyaWV0eSBvZiB1c2UgY2FzZXMuXHJcbiogQG5hbWUgc291bmRzLWVmZmVjdHNcclxuKiBAZW51bSBzb3VuZHMtZWZmZWN0c1xyXG4qIEBtZW1iZXJvZiByZXNvdXJjZXNcclxuKlxyXG4qIEBwcm9wIGVmZmVjdHMvZmFuZmFyZS1zdWNjZWVkIC0gVGhlIFwic3VjY2VzcyFcIiBzb3VuZCBmcm9tIEhvbG9ncmFtcyBBZ2FpbnN0IEh1bWFuaXR5LlxyXG4qIEBwcm9wIGVmZmVjdHMvZmFuZmFyZS1zdGFydCAtIFRoZSBcIkdhbWUgaGFzIHN0YXJ0ZWQhXCIgc291bmQgZnJvbSBIYUguXHJcbiogQHByb3AgZWZmZWN0cy9mYW5mYXJlLWZhaWxcclxuKiBAcHJvcCBlZmZlY3RzL3RpbWVyLTEwcyAtIGEgMTAgc2Vjb25kIHRpbWVyIHRoYXQgdHJpZ2dlcnMgYSBiZWxsIGF0IGV4YWN0bHkgMTAgc2Vjb25kcy5cclxuKiBUaGUgYmVsbCBsYXN0cyBmb3IgMiBzZWNvbmRzLiBUaGlzIGFsbG93cyBmb3IgdGltZXIgbGVuZ3RoIGNoYW5nZXMuXHJcbiogQHByb3AgZWZmZWN0cy9nYWluLWNvaW5cclxuKi9cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9uYXRpdmUtcmVzb3VyY2VzLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiogRW5hYmxlcyB0aGUgc3luY2hyb25pemF0aW9uIG9mIHByb3BlcnRpZXMgb2YgZW50aXRpZXMuIEFsbCBwcm9wZXJ0eSBzeW5jIGNvbXBvbmVudHNcclxuKiByZXF1aXJlIGJvdGggYSB7QGxpbmsgc3luYy5zeW5jLXN5c3RlbX0gb24gYGEtc2NlbmVgLCBhbmQgYSB7QGxpbmsgc3luYy5zeW5jfVxyXG4qIG9uIHRoZSBlbnRpdHkgdG8gYmUgc3luY2VkLlxyXG4qIEBuYW1lIHN5bmNcclxuKiBAbmFtZXNwYWNlIHN5bmNcclxuKiBAZXhhbXBsZVxyXG4qIDxhLXNjZW5lIHN5bmMtc3lzdGVtPSdhcHA6IGV4YW1wbGUgc3luYzsgYXV0aG9yOiBhbHRzcGFjZXZyJz5cclxuKiAgIDxhLWVudGl0eSBzeW5jPSdvd25PbjogY3Vyc29yZG93bicgc3luYy1jb2xvcj48L2EtZW50aXR5PlxyXG4qIDwvYS1zY2VuZT5cclxuKi9cclxuXHJcblxyXG5cclxuLyoqXHJcbiogRW5hYmxlcyB0aGUgc3luY2hyb25pemF0aW9uIG9mIHByb3BlcnRpZXMgb2YgdGhlIGVudGl0eS4gTXVzdCBiZSB1c2VkIGluXHJcbiogY29uanVjdGlvbiB3aXRoIHRoZSB7QGxpbmsgc3luYy5zeW5jLXN5c3RlbX0gY29tcG9uZW50IGFuZCBhIGNvbXBvbmVudCBmb3IgYVxyXG4qIHNwZWNpZmljIHByb3BlcnR5IChlLmcuIHtAbGluayBzeW5jLnN5bmMtdHJhbnNmb3JtfSkuXHJcbiogQG1lbWJlcm9mIHN5bmNcclxuKiBAbWl4aW4gc3luY1xyXG4qIEBwcm9wIHtzdHJpbmd9IG93bk9uIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50LCBvciBhIGxpc3Qgb2YgZXZlbnRzLCB0aGF0XHJcbiogd2lsbCBjYXVzZSB0aGUgbG9jYWwgY2xpZW50IHRvIHRha2Ugb3duZXJzaGlwIG9mIHRoaXMgb2JqZWN0LiBUaGlzIGZpZWxkXHJcbiogY2Fubm90IGJlIHVwZGF0ZWQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXHJcbiovXHJcbkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnc3luYycsXHJcbntcclxuXHRzY2hlbWE6IHtcclxuXHRcdG1vZGU6IHsgZGVmYXVsdDogJ2xpbmsnIH0sXHJcblx0XHRvd25PbjogeyB0eXBlOiAnc3RyaW5nJyB9IC8vY2Fubm90IGJlIGNoYW5nZWQgYWZ0ZXIgY3JlYXRpb25cclxuXHR9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBzY2VuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Etc2NlbmUnKTtcclxuXHRcdHZhciBzeW5jU3lzID0gc2NlbmUuc3lzdGVtc1snc3luYy1zeXN0ZW0nXTtcclxuXHJcblx0XHR2YXIgcmVmO1xyXG5cdFx0dmFyIGtleTtcclxuXHRcdHZhciBkYXRhUmVmO1xyXG5cdFx0dmFyIG93bmVyUmVmO1xyXG5cdFx0dmFyIG93bmVySWQ7XHJcblx0XHR2YXIgaXNNaW5lID0gZmFsc2U7XHJcblxyXG5cdFx0dmFyIGNvbXBvbmVudCA9IHRoaXM7XHJcblxyXG5cdFx0Y29tcG9uZW50LmlzQ29ubmVjdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0aWYoc3luY1N5cy5pc0Nvbm5lY3RlZCkgc3RhcnQoKTsgZWxzZSBzY2VuZS5hZGRFdmVudExpc3RlbmVyKCdjb25uZWN0ZWQnLCBzdGFydCk7XHJcblxyXG5cclxuXHRcdGlmKGNvbXBvbmVudC5kYXRhLm93bk9uKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgb3duZXJzaGlwRXZlbnRzID0gY29tcG9uZW50LmRhdGEub3duT24uc3BsaXQoL1sgLF0rLyk7XHJcblx0XHRcdGZvcih2YXIgaSA9IDAsIG1heCA9IG93bmVyc2hpcEV2ZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkrKyl7XHJcblx0XHRcdFx0Y29tcG9uZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIob3duZXJzaGlwRXZlbnRzW2ldLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0aWYoY29tcG9uZW50LmlzQ29ubmVjdGVkKXtcclxuXHRcdFx0XHRcdFx0Y29tcG9uZW50LnRha2VPd25lcnNoaXAoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHN0YXJ0KCl7XHJcblx0XHRcdC8vTWFrZSBzdXJlIHNvbWVvbmUgYWx3YXlzIG93bnMgYW4gb2JqZWN0LiBJZiB0aGUgb3duZXIgbGVhdmVzIGFuZCB3ZSBhcmUgdGhlIG1hc3RlciBjbGllbnQsIHdlIHdpbGwgdGFrZSBpdC5cclxuXHRcdFx0Ly9UaGlzIGVuc3VyZXMsIGZvciBleGFtcGxlLCB0aGF0IHN5bmNlZCBhbmltYXRpb25zIGtlZXAgcGxheWluZ1xyXG5cdFx0XHRzY2VuZS5hZGRFdmVudExpc3RlbmVyKCdjbGllbnRsZWZ0JywgZnVuY3Rpb24oZXZlbnQpe1xyXG5cdFx0XHRcdHZhciBzaG91bGRUYWtlT3duZXJzaGlwID0gKCFvd25lcklkIHx8IG93bmVySWQgPT09IGV2ZW50LmRldGFpbC5pZCkgJiYgc3luY1N5cy5pc01hc3RlckNsaWVudDtcclxuXHJcblx0XHRcdFx0aWYoc2hvdWxkVGFrZU93bmVyc2hpcCkgY29tcG9uZW50LnRha2VPd25lcnNoaXAoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50LmRhdGEubW9kZSA9PT0gJ2xpbmsnKSB7XHJcblx0XHRcdFx0dmFyIGlkID0gY29tcG9uZW50LmVsLmlkO1xyXG5cdFx0XHRcdGlmICghaWQpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VudGl0aWVzIGNhbm5vdCBiZSBzeW5jZWQgdXNpbmcgbGluayBtb2RlIHdpdGhvdXQgYW4gaWQuJyk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRjb25zb2xlLmxvZygnc3luY1N5czogJyArIHN5bmNTeXMpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdzeW5jU3lzLnNjZW5lUmVmOiAnICsgc3luY1N5cy5zY2VuZVJlZik7XHJcblxyXG5cdFx0XHRcdGxpbmsoc3luY1N5cy5zY2VuZVJlZi5jaGlsZChpZCkpO1xyXG5cdFx0XHRcdHNldHVwUmVjZWl2ZSgpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdVbnN1cHBvcnRlZCBzeW5jIG1vZGU6ICcgKyBjb21wb25lbnQuZGF0YS5tb2RlKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbXBvbmVudC5pc0Nvbm5lY3RlZCA9IHRydWU7XHJcblx0XHRcdGNvbXBvbmVudC5lbC5lbWl0KCdjb25uZWN0ZWQnLCBudWxsLCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gbGluayhlbnRpdHlSZWYpIHtcclxuXHRcdFx0cmVmID0gZW50aXR5UmVmO1xyXG5cdFx0XHRrZXkgPSByZWYua2V5KCk7XHJcblx0XHRcdGRhdGFSZWYgPSByZWYuY2hpbGQoJ2RhdGEnKTtcclxuXHRcdFx0Y29tcG9uZW50LmRhdGFSZWYgPSBkYXRhUmVmO1xyXG5cdFx0XHRvd25lclJlZiA9IHJlZi5jaGlsZCgnb3duZXInKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXR1cFJlY2VpdmUoKSB7XHJcblxyXG5cdFx0XHQvL2lmIG5vYm9keSBoYXMgb3duZWQgdGhlIG9iamVjdCB5ZXQsIHdlIHdpbGwuXHJcblx0XHRcdG93bmVyUmVmLnRyYW5zYWN0aW9uKGZ1bmN0aW9uIChvd25lcikge1xyXG5cdFx0XHRcdGlmIChvd25lcikgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcblx0XHRcdFx0b3duZXJSZWYub25EaXNjb25uZWN0KCkuc2V0KG51bGwpO1xyXG5cdFx0XHRcdHJldHVybiBzeW5jU3lzLmNsaWVudElkO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdG93bmVyUmVmLm9uKCd2YWx1ZScsXHJcblx0XHRcdFx0ZnVuY3Rpb24oc25hcHNob3QpIHtcclxuXHRcdFx0XHRcdHZhciBuZXdPd25lcklkID0gc25hcHNob3QudmFsKCk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGdhaW5lZCA9IG5ld093bmVySWQgPT09IHN5bmNTeXMuY2xpZW50SWQgJiYgIWlzTWluZTtcclxuXHRcdFx0XHRcdGlmIChnYWluZWQpIGNvbXBvbmVudC5lbC5lbWl0KCdvd25lcnNoaXBnYWluZWQnLCBudWxsLCBmYWxzZSk7XHJcblxyXG5cclxuXHRcdFx0XHRcdC8vbm90ZSB0aGlzIGFsc28gZmlyZXMgd2hlbiB3ZSBzdGFydCB1cCB3aXRob3V0IG93bmVyc2hpcFxyXG5cdFx0XHRcdFx0dmFyIGxvc3QgPSBuZXdPd25lcklkICE9PSBzeW5jU3lzLmNsaWVudElkICYmIGlzTWluZTtcclxuXHRcdFx0XHRcdGlmIChsb3N0KXtcclxuXHRcdFx0XHRcdFx0Y29tcG9uZW50LmVsLmVtaXQoJ293bmVyc2hpcGxvc3QnLCBudWxsLCBmYWxzZSk7XHJcblxyXG5cdFx0XHRcdFx0XHQvL3dlIG5vIGxvbmdlciBoYXZlIHRvIGNsZWFyIG91ciBvd25lcnNoaXAgd2hlbiB3ZSBkaXNjb25uZWN0XHJcblx0XHRcdFx0XHRcdG93bmVyUmVmLm9uRGlzY29ubmVjdCgpLmNhbmNlbCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG93bmVySWQgPSBuZXdPd25lcklkO1xyXG5cclxuXHRcdFx0XHRcdGlzTWluZSA9IG5ld093bmVySWQgPT09IHN5bmNTeXMuY2xpZW50SWQ7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQqIFRlbGwgc3luYyB0byBzdGFydCBwdXNoaW5nIGxvY2FsIHByb3BlcnR5IHZhbHVlcyBpbnN0ZWFkIG9mIHVwZGF0aW5nXHJcblx0XHQqIGxvY2FsIGZyb20gcmVtb3RlIHZhbHVlcy5cclxuXHRcdCogQG1ldGhvZCBzeW5jLnN5bmMjdGFrZU93bmVyc2hpcFxyXG5cdFx0Ki9cclxuXHRcdGNvbXBvbmVudC50YWtlT3duZXJzaGlwID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdG93bmVyUmVmLnNldChzeW5jU3lzLmNsaWVudElkKTtcclxuXHJcblx0XHRcdC8vY2xlYXIgb3VyIG93bmVyc2hpcCBpZiB3ZSBkaXNjb25uZWN0XHJcblx0XHRcdC8vdGhpcyBpcyBuZWVkZWQgaWYgd2UgYXJlIHRoZSBsYXN0IHVzZXIgaW4gdGhlIHJvb20sIGJ1dCB3ZSBleHBlY3QgcGVvcGxlIHRvIGpvaW4gbGF0ZXJcclxuXHRcdFx0b3duZXJSZWYub25EaXNjb25uZWN0KCkuc2V0KG51bGwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0KiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3luYyBvd25lcnNoaXAgaXMgeW91cnMuXHJcblx0XHQqIEBtZW1iZXIgc3luYy5zeW5jI2lzTWluZVxyXG5cdFx0KiBAcmVhZG9ubHlcclxuXHRcdCovXHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcG9uZW50LCAnaXNNaW5lJywge1xyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gaXNNaW5lOy8vVE9ETzogU2hvdWxkIHRoaXMgYmUgc3RhdGUgaW5zdGVhZD9cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zeW5jLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiogQ29ubmVjdCB0byBhIHJlbW90ZSBGaXJlYmFzZSBzZXJ2ZXIsIGFuZCBmYWNpbGl0YXRlIHN5bmNocm9uaXphdGlvbi4gVGhlc2VcclxuKiBvcHRpb25zIGNvcnJlc3BvbmQgZXhhY3RseSB3aXRoIHRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yXHJcbiogW2FsdHNwYWNlLnV0aWxpdGllcy5zeW5jLmNvbm5lY3Rde0BsaW5rIGh0dHA6Ly9hbHRzcGFjZXZyLmdpdGh1Yi5pby9BbHRzcGFjZVNESy9kb2MvbW9kdWxlLWFsdHNwYWNlX3V0aWxpdGllc19zeW5jLmh0bWwjLmNvbm5lY3R9LlxyXG4qIFRoaXMgY29tcG9uZW50IG11c3QgYmUgcHJlc2VudCBvbiBgYS1zY2VuZWAgZm9yIGFueSBvdGhlciBzeW5jIGNvbXBvbmVudHMgdG8gd29yay5cclxuKiBAbWVtYmVyb2Ygc3luY1xyXG4qIEBtaXhpbiBzeW5jLXN5c3RlbVxyXG4qIEBwcm9wIHtzdHJpbmd9IGF1dGhvciAtIEEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHlvdSBvciB5b3VyIG9yZ2FuaXphdGlvbi5cclxuKiBAcHJvcCB7c3RyaW5nfSBhcHAgLSBUaGUgbmFtZSBvZiB0aGUgYXBwLlxyXG4qIEBwcm9wIHtzdHJpbmd9IHJlZlVybCAtIE92ZXJyaWRlIHRoZSBiYXNlIHJlZmVyZW5jZS4gU2V0IHRoaXMgdG8gdXNlIHlvdXIgb3duIEZpcmViYXNlLlxyXG4qIEBwcm9wIHtzdHJpbmd9IGluc3RhbmNlIC0gT3ZlcnJpZGUgdGhlIGluc3RhbmNlIElELiBDYW4gYWxzbyBiZSBvdmVycmlkZGVuIHdpdGhcclxuKiBhIFVSTCBwYXJhbWV0ZXIuXHJcbiovXHJcbkFGUkFNRS5yZWdpc3RlclN5c3RlbSgnc3luYy1zeXN0ZW0nLFxyXG57XHJcblx0c2NoZW1hOiB7XHJcblx0XHRhdXRob3I6IHsgdHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6IG51bGwgfSxcclxuXHRcdGFwcDogeyB0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogbnVsbCB9LFxyXG5cdFx0aW5zdGFuY2U6IHsgdHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6IG51bGwgfSxcclxuXHRcdHJlZlVybDogeyB0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogbnVsbCB9XHJcblx0fSxcclxuXHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjb21wb25lbnQgPSB0aGlzO1xyXG5cclxuXHRcdGlmKCF0aGlzLmRhdGEgfHwgIXRoaXMuZGF0YS5hcHApe1xyXG5cdFx0XHRjb25zb2xlLndhcm4oJ1RoZSBzeW5jLXN5c3RlbSBtdXN0IGJlIHByZXNlbnQgb24gdGhlIHNjZW5lIGFuZCBjb25maWd1cmVkIHdpdGggcmVxdWlyZWQgZGF0YS4nKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbXBvbmVudC5pc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5kYXRhKTtcclxuXHRcdGFsdHNwYWNlLnV0aWxpdGllcy5zeW5jLmNvbm5lY3Qoe1xyXG5cdFx0XHRhdXRob3JJZDogdGhpcy5kYXRhLmF1dGhvcixcclxuXHRcdFx0YXBwSWQ6IHRoaXMuZGF0YS5hcHAsXHJcblx0XHRcdGluc3RhbmNlSWQ6IHRoaXMuZGF0YS5pbnN0YW5jZSxcclxuXHRcdFx0YmFzZVJlZlVybDogdGhpcy5kYXRhLnJlZlVybFxyXG5cdFx0fSkudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcblx0XHRcdHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XHJcblxyXG5cdFx0XHR0aGlzLnNjZW5lUmVmID0gdGhpcy5jb25uZWN0aW9uLmluc3RhbmNlLmNoaWxkKCdzY2VuZScpO1xyXG5cdFx0XHR0aGlzLmNsaWVudHNSZWYgPSB0aGlzLmNvbm5lY3Rpb24uaW5zdGFuY2UuY2hpbGQoJ2NsaWVudHMnKTtcclxuXHJcblx0XHRcdC8vIHRlbXBvcmFyeSB3YXkgb2YgaGF2aW5nIHVuaXF1ZSBpZGVudGlmaWVycyBmb3IgZWFjaCBjbGllbnRcclxuXHRcdFx0dGhpcy5jbGllbnRJZCA9IHRoaXMuc2NlbmVFbC5vYmplY3QzRC51dWlkO1xyXG5cdFx0XHR2YXIgbWFzdGVyQ2xpZW50SWQ7XHJcblx0XHRcdHRoaXMuY2xpZW50c1JlZi5vbihcInZhbHVlXCIsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG5cdFx0XHRcdHZhciBjbGllbnRJZHMgPSBzbmFwc2hvdC52YWwoKTtcclxuXHJcblx0XHRcdFx0dmFyIG1hc3RlckNsaWVudEtleSA9IE9iamVjdC5rZXlzKGNsaWVudElkcylbMF07XHJcblx0XHRcdFx0bWFzdGVyQ2xpZW50SWQgPSBjbGllbnRJZHNbbWFzdGVyQ2xpZW50S2V5XTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmNsaWVudHNSZWYub24oJ2NoaWxkX2FkZGVkJywgZnVuY3Rpb24oY2hpbGRTbmFwc2hvdCkge1xyXG5cdFx0XHRcdHZhciBqb2luZWRDbGllbnRJZCA9IGNoaWxkU25hcHNob3QudmFsKCk7XHJcblx0XHRcdFx0Ly9sZXQgdGhlIG1hc3RlciBjbGllbnQgZmxhZyBnZXQgc2V0IGZpcnN0XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50LnNjZW5lRWwuZW1pdCgnY2xpZW50am9pbmVkJywge2lkOiBqb2luZWRDbGllbnRJZH0sIGZhbHNlKTtcclxuXHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmNsaWVudHNSZWYub24oJ2NoaWxkX3JlbW92ZWQnLCBmdW5jdGlvbihjaGlsZFNuYXBzaG90KSB7XHJcblx0XHRcdFx0dmFyIGxlZnRDbGllbnRJZCA9IGNoaWxkU25hcHNob3QudmFsKCk7XHJcblx0XHRcdFx0Ly9sZXQgdGhlIG1hc3RlciBjbGllbnQgZmxhZyBnZXQgc2V0IGZpcnN0XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50LnNjZW5lRWwuZW1pdCgnY2xpZW50bGVmdCcsIHtpZDogbGVmdENsaWVudElkfSwgZmFsc2UpO1xyXG5cdFx0XHRcdH0sIDApO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBvdXIgY2xpZW50IElEIHRvIHRoZSBsaXN0IG9mIGNvbm5lY3RlZCBjbGllbnRzLFxyXG5cdFx0XHQvLyBidXQgaGF2ZSBpdCBiZSBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgYnkgZmlyZWJhc2UgaWYgd2UgZGlzY29ubmVjdCBmb3IgYW55IHJlYXNvblxyXG5cdFx0XHR0aGlzLmNsaWVudHNSZWYucHVzaCh0aGlzLmNsaWVudElkKS5vbkRpc2Nvbm5lY3QoKS5yZW1vdmUoKTtcclxuXHJcblxyXG5cdFx0XHR0aGlzLmNvbm5lY3Rpb24uaW5zdGFuY2UuY2hpbGQoJ2luaXRpYWxpemVkJykub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuXHRcdFx0XHR2YXIgc2hvdWxkSW5pdGlhbGl6ZSA9ICFzbmFwc2hvdC52YWwoKTtcclxuXHRcdFx0XHRzbmFwc2hvdC5yZWYoKS5zZXQodHJ1ZSk7XHJcblxyXG5cdFx0XHRcdGNvbXBvbmVudC5zY2VuZUVsLmVtaXQoJ2Nvbm5lY3RlZCcsIHsgc2hvdWxkSW5pdGlhbGl6ZTogc2hvdWxkSW5pdGlhbGl6ZSB9LCBmYWxzZSk7XHJcblx0XHRcdFx0Y29tcG9uZW50LmlzQ29ubmVjdGVkID0gdHJ1ZTtcclxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblxyXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2lzTWFzdGVyQ2xpZW50Jywge1xyXG5cdFx0XHRcdGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWFzdGVyQ2xpZW50SWQgPT09IHRoaXMuY2xpZW50SWQ7IH0uYmluZCh0aGlzKVxyXG5cdFx0XHR9KTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zeW5jLXN5c3RlbS5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vVE9ETzogV2UgbmVlZCB0byBmaWd1cmUgb3V0IGEgd2F5IHRvIHJlY2lldmUgb3VyIGZpcnN0IHVwZGF0ZSB3aXRob3V0IGNhcmluZyBhYm91dCBvd25lcnNoaXAuXHJcbi8vIGZpcnN0VmFsdWUgaXMgcHJvYmFibHkgbm90IHRoZSByaWdodCB3YXkgdG8gZ28sIHByb2JhYmx5IHNvbWV0aGluZyBhYm91dCBoYXZpbmcgc2VudCB5ZXQuIE5lZWQgdG8gY2hhbmdlIGZvciBib3RoXHJcblxyXG4vKipcclxuKiBTeW5jaHJvbml6ZSB0aGUgcG9zaXRpb24sIHJvdGF0aW9uLCBhbmQgc2NhbGUgb2YgdGhpcyBvYmplY3Qgd2l0aCBhbGwgY2xpZW50cy5cclxuKiBSZXF1aXJlcyBib3RoIGEge0BsaW5rIHN5bmMuc3luYy1zeXN0ZW19IGNvbXBvbmVudCBvbiB0aGUgYGEtc2NlbmVgLCBhbmQgYVxyXG4qIHtAbGluayBzeW5jLnN5bmN9IGNvbXBvbmVudCBvbiB0aGUgdGFyZ2V0IGVudGl0eS5cclxuKiBAbWl4aW4gc3luYy10cmFuc2Zvcm1cclxuKiBAbWVtYmVyb2Ygc3luY1xyXG4qL1xyXG5BRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ3N5bmMtdHJhbnNmb3JtJyxcclxue1xyXG5cdGRlcGVuZGVuY2llczogWydzeW5jJ10sXHJcblx0c2NoZW1hOiB7XHJcblx0fSxcclxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY29tcG9uZW50ID0gdGhpcztcclxuXHRcdHZhciBzeW5jID0gY29tcG9uZW50LmVsLmNvbXBvbmVudHMuc3luYztcclxuXHRcdGlmKHN5bmMuaXNDb25uZWN0ZWQpIHN0YXJ0KCk7IGVsc2UgY29tcG9uZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Nvbm5lY3RlZCcsIHN0YXJ0KTtcclxuXHJcblx0XHRmdW5jdGlvbiBzdGFydCgpe1xyXG5cclxuXHRcdFx0dmFyIHBvc2l0aW9uUmVmID0gc3luYy5kYXRhUmVmLmNoaWxkKCdwb3NpdGlvbicpO1xyXG5cdFx0XHR2YXIgcm90YXRpb25SZWYgPSBzeW5jLmRhdGFSZWYuY2hpbGQoJ3JvdGF0aW9uJyk7XHJcblx0XHRcdHZhciBzY2FsZVJlZiA9IHN5bmMuZGF0YVJlZi5jaGlsZCgnc2NhbGUnKTtcclxuXHJcblx0XHRcdGNvbXBvbmVudC51cGRhdGVSYXRlID0gMTAwO1xyXG5cclxuXHRcdFx0dmFyIHN0b3BwZWRBbmltYXRpb25zID0gW107XHJcblx0XHRcdC8vcGF1c2UgYWxsIGFuaW1hdGlvbnMgb24gb3duZXJzaGlwIGxvc3NcclxuXHRcdFx0Y29tcG9uZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ293bmVyc2hpcGxvc3QnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgY2hpbGRyZW4gPSBjb21wb25lbnQuZWwuY2hpbGRyZW47XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0dmFyIHRhZ05hbWUgPSBjaGlsZHJlbltpXS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHRpZiAodGFnTmFtZSA9PT0gXCJhLWFuaW1hdGlvblwiKSB7XHJcblx0XHRcdFx0XHRcdHN0b3BwZWRBbmltYXRpb25zLnB1c2goY2hpbGRyZW5baV0pO1xyXG5cdFx0XHRcdFx0XHRjaGlsZHJlbltpXS5zdG9wKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0Y29tcG9uZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ293bmVyc2hpcGdhaW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0b3BwZWRBbmltYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHR2YXIgYW5pbWF0aW9uID0gc3RvcHBlZEFuaW1hdGlvbnNbaV07XHJcblx0XHRcdFx0XHRhbmltYXRpb24uc3RhcnQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c3RvcHBlZEFuaW1hdGlvbnMgPSBbXTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBvblRyYW5zZm9ybShzbmFwc2hvdCwgY29tcG9uZW50TmFtZSkge1xyXG5cdFx0XHRcdGlmIChzeW5jLmlzTWluZSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHR2YXIgdmFsdWUgPSBzbmFwc2hvdC52YWwoKTtcclxuXHRcdFx0XHRpZiAoIXZhbHVlKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdGNvbXBvbmVudC5lbC5zZXRBdHRyaWJ1dGUoY29tcG9uZW50TmFtZSwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwb3NpdGlvblJlZi5vbigndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuXHRcdFx0XHRvblRyYW5zZm9ybShzbmFwc2hvdCwgJ3Bvc2l0aW9uJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cm90YXRpb25SZWYub24oJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcblx0XHRcdFx0b25UcmFuc2Zvcm0oc25hcHNob3QsICdyb3RhdGlvbicpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjYWxlUmVmLm9uKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG5cdFx0XHRcdG9uVHJhbnNmb3JtKHNuYXBzaG90LCAnc2NhbGUnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR2YXIgc2VuZFBvc2l0aW9uID0gdGhyb3R0bGUoZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0XHRcdHBvc2l0aW9uUmVmLnNldCh2YWx1ZSk7XHJcblx0XHRcdH0sIGNvbXBvbmVudC51cGRhdGVSYXRlKTtcclxuXHJcblx0XHRcdHZhciBzZW5kUm90YXRpb24gPSB0aHJvdHRsZShmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHRcdFx0cm90YXRpb25SZWYuc2V0KHZhbHVlKTtcclxuXHRcdFx0fSwgY29tcG9uZW50LnVwZGF0ZVJhdGUpO1xyXG5cclxuXHRcdFx0dmFyIHNlbmRTY2FsZSA9IHRocm90dGxlKGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdFx0XHRzY2FsZVJlZi5zZXQodmFsdWUpO1xyXG5cdFx0XHR9LCBjb21wb25lbnQudXBkYXRlUmF0ZSk7XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBvbkNvbXBvbmVudENoYW5nZWQoZXZlbnQpe1xyXG5cdFx0XHRcdGlmICghc3luYy5pc01pbmUpIHJldHVybjtcclxuXHJcblx0XHRcdFx0dmFyIG5hbWUgPSBldmVudC5kZXRhaWwubmFtZTtcclxuXHRcdFx0XHR2YXIgbmV3RGF0YSA9IGV2ZW50LmRldGFpbC5uZXdEYXRhO1xyXG5cclxuXHRcdFx0XHRpZiAobmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG5cdFx0XHRcdFx0c2VuZFBvc2l0aW9uKG5ld0RhdGEpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobmFtZSA9PT0gJ3JvdGF0aW9uJykge1xyXG5cdFx0XHRcdFx0c2VuZFJvdGF0aW9uKG5ld0RhdGEpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobmFtZSA9PT0gJ3NjYWxlJykge1xyXG5cdFx0XHRcdFx0c2VuZFNjYWxlKG5ld0RhdGEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly9mcm9tIHVuZGVyc2NvcmUuanNcclxuXHRcdFx0ZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xyXG5cdFx0XHRcdHZhciB0aW1lb3V0LCBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XHJcblx0XHRcdFx0dmFyIHByZXZpb3VzID0gMDtcclxuXHRcdFx0XHRpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcclxuXHJcblx0XHRcdFx0dmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0ICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogRGF0ZS5ub3coKTtcclxuXHRcdFx0XHQgIHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0XHRcdCAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuXHRcdFx0XHQgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciB0aHJvdHRsZWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQgIHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG5cdFx0XHRcdCAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IG5vdztcclxuXHRcdFx0XHQgIHZhciByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcclxuXHRcdFx0XHQgIGNvbnRleHQgPSB0aGlzO1xyXG5cdFx0XHRcdCAgYXJncyA9IGFyZ3VtZW50cztcclxuXHRcdFx0XHQgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XHJcblx0XHRcdFx0XHRpZiAodGltZW91dCkge1xyXG5cdFx0XHRcdFx0ICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdFx0XHQgIHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cHJldmlvdXMgPSBub3c7XHJcblx0XHRcdFx0XHRyZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdFx0aWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcblx0XHRcdFx0ICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcclxuXHRcdFx0XHQgIH1cclxuXHRcdFx0XHQgIHJldHVybiByZXN1bHQ7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dGhyb3R0bGVkLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRcdCAgcHJldmlvdXMgPSAwO1xyXG5cdFx0XHRcdCAgdGltZW91dCA9IGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhyb3R0bGVkO1xyXG5cdFx0XHQgIH07XHJcblxyXG5cclxuXHRcdFx0Y29tcG9uZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvbmVudGNoYW5nZWQnLCBvbkNvbXBvbmVudENoYW5nZWQpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc3luYy10cmFuc2Zvcm0uanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuKiBTeW5jIHRoZSBjb2xvciBwcm9wZXJ0eSBvZiB0aGUgb2JqZWN0IGJldHdlZW4gY2xpZW50cy5cclxuKiBSZXF1aXJlcyBib3RoIGEge0BsaW5rIHN5bmMuc3luYy1zeXN0ZW19IGNvbXBvbmVudCBvbiB0aGUgYGEtc2NlbmVgLCBhbmQgYVxyXG4qIHtAbGluayBzeW5jLnN5bmN9IGNvbXBvbmVudCBvbiB0aGUgdGFyZ2V0IGVudGl0eS5cclxuKiBAbWl4aW4gc3luYy1jb2xvclxyXG4qIEBtZW1iZXJvZiBzeW5jXHJcbiovXHJcbkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnc3luYy1jb2xvcicsXHJcbntcclxuXHRkZXBlbmRlbmNpZXM6IFsnc3luYyddLFxyXG5cdHNjaGVtYToge1xyXG5cdH0sXHJcblx0aW5pdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGNvbXBvbmVudCA9IHRoaXM7XHJcblx0XHR2YXIgc3luYyA9IGNvbXBvbmVudC5lbC5jb21wb25lbnRzLnN5bmM7XHJcblx0XHRpZihzeW5jLmlzQ29ubmVjdGVkKSBzdGFydCgpOyBlbHNlIGNvbXBvbmVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdjb25uZWN0ZWQnLCBzdGFydCk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gc3RhcnQoKXtcclxuXHRcdFx0dmFyIGNvbG9yUmVmID0gc3luYy5kYXRhUmVmLmNoaWxkKCdtYXRlcmlhbC9jb2xvcicpO1xyXG5cclxuXHRcdFx0dmFyIHJlZkNoYW5nZWRMb2NrZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdHZhciBmaXJzdFZhbHVlID0gdHJ1ZTtcclxuXHJcblx0XHRcdGNvbXBvbmVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdjb21wb25lbnRjaGFuZ2VkJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdFx0dmFyIG5hbWUgPSBldmVudC5kZXRhaWwubmFtZTtcclxuXHRcdFx0XHR2YXIgb2xkRGF0YSA9IGV2ZW50LmRldGFpbC5vbGREYXRhO1xyXG5cdFx0XHRcdHZhciBuZXdEYXRhID0gZXZlbnQuZGV0YWlsLm5ld0RhdGE7XHJcblxyXG5cdFx0XHRcdGlmIChuYW1lICE9PSAnbWF0ZXJpYWwnKSByZXR1cm47XHJcblx0XHRcdFx0aWYgKHJlZkNoYW5nZWRMb2NrZWQpIHJldHVybjtcclxuXHJcblx0XHRcdFx0aWYgKG9sZERhdGEuY29sb3IgIT09IG5ld0RhdGEuY29sb3IpIHtcclxuXHRcdFx0XHRcdGlmKHN5bmMuaXNNaW5lKXtcclxuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHsvL0ZvciBzb21lIHJlYXNvbiBBLUZyYW1lIGhhcyBhIG1pc2NvbmZpZ3VyZWQgbWF0ZXJpYWwgcmVmZXJlbmNlIGlmIHdlIGRvIHRoaXMgdG9vIGVhcmx5XHJcblx0XHRcdFx0XHRcdFx0Y29sb3JSZWYuc2V0KG5ld0RhdGEuY29sb3IpO1xyXG5cdFx0XHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Y29sb3JSZWYub24oJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcblx0XHRcdFx0aWYgKHN5bmMuaXNNaW5lICYmICFmaXJzdFZhbHVlKSByZXR1cm47XHJcblx0XHRcdFx0dmFyIGNvbG9yID0gc25hcHNob3QudmFsKCk7XHJcblxyXG5cdFx0XHRcdHJlZkNoYW5nZWRMb2NrZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGNvbXBvbmVudC5lbC5zZXRBdHRyaWJ1dGUoJ21hdGVyaWFsJywgJ2NvbG9yJywgY29sb3IpO1xyXG5cdFx0XHRcdHJlZkNoYW5nZWRMb2NrZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0Zmlyc3RWYWx1ZSA9IGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3N5bmMtY29sb3IuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuKiBTeW5jaHJvbml6ZSB0aGUgcGxheWJhY2sgc3RhdGUgb2YgYW4ge0BsaW5rIG4ubi1zb3VuZH0gY29tcG9uZW50IGJldHdlZW4gY2xpZW50cy5cclxuKiBSZXF1aXJlcyBib3RoIGEge0BsaW5rIHN5bmMuc3luYy1zeXN0ZW19IGNvbXBvbmVudCBvbiB0aGUgYGEtc2NlbmVgLCBhbmQgYVxyXG4qIHtAbGluayBzeW5jLnN5bmN9IGNvbXBvbmVudCBvbiB0aGUgdGFyZ2V0IGVudGl0eS5cclxuKiBAbWl4aW4gc3luYy1uLXNvdW5kXHJcbiogQG1lbWJlcm9mIHN5bmNcclxuKi9cclxuQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdzeW5jLW4tc291bmQnLFxyXG57XHJcblx0ZGVwZW5kZW5jaWVzOiBbJ3N5bmMnXSxcclxuXHRzY2hlbWE6IHsgfSxcclxuXHRpbml0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY29tcG9uZW50ID0gdGhpcztcclxuXHRcdHZhciBzeW5jID0gY29tcG9uZW50LmVsLmNvbXBvbmVudHMuc3luYztcclxuXHRcdHZhciBzY2VuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Etc2NlbmUnKTtcclxuXHRcdHZhciBzeW5jU3lzID0gc2NlbmUuc3lzdGVtc1snc3luYy1zeXN0ZW0nXTtcclxuXHRcdGlmKHN5bmMuaXNDb25uZWN0ZWQpIHN0YXJ0KCk7IGVsc2UgY29tcG9uZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Nvbm5lY3RlZCcsIHN0YXJ0KTtcclxuXHJcblx0XHRmdW5jdGlvbiBzdGFydCgpe1xyXG5cdFx0XHRjb21wb25lbnQuc291bmRTdGF0ZVJlZiA9IHN5bmMuZGF0YVJlZi5jaGlsZCgnc291bmQvc3RhdGUnKTtcclxuXHRcdFx0Y29tcG9uZW50LnNvdW5kRXZlbnRSZWYgPSBzeW5jLmRhdGFSZWYuY2hpbGQoJ3NvdW5kL2V2ZW50Jyk7XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBzZW5kRXZlbnQoZXZlbnQpIHtcclxuXHRcdFx0XHRpZiAoIXN5bmMuaXNNaW5lKSByZXR1cm47XHJcblx0XHRcdFx0dmFyIGV2ZW50ID0ge1xyXG5cdFx0XHRcdFx0dHlwZTogZXZlbnQudHlwZSxcclxuXHRcdFx0XHRcdHNlbmRlcjogc3luY1N5cy5jbGllbnRJZCxcclxuXHRcdFx0XHRcdGVsOiBjb21wb25lbnQuZWwuaWQsXHJcblx0XHRcdFx0XHR0aW1lOiBEYXRlLm5vdygpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRjb21wb25lbnQuc291bmRFdmVudFJlZi5zZXQoZXZlbnQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb21wb25lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignc291bmQtcGxheWVkJywgc2VuZEV2ZW50KTtcclxuXHRcdFx0Y29tcG9uZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdW5kLXBhdXNlZCcsIHNlbmRFdmVudCk7XHJcblxyXG5cdFx0XHRjb21wb25lbnQuc291bmRFdmVudFJlZi5vbigndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuXHRcdFx0XHRpZiAoc3luYy5pc01pbmUpIHJldHVybjtcclxuXHRcdFx0XHR2YXIgZXZlbnQgPSBzbmFwc2hvdC52YWwoKTtcclxuXHRcdFx0XHRpZiAoIWV2ZW50KSByZXR1cm47XHJcblx0XHRcdFx0aWYgKGV2ZW50LmVsID09PSBjb21wb25lbnQuZWwuaWQpIHtcclxuXHRcdFx0XHRcdHZhciBzb3VuZCA9IGNvbXBvbmVudC5lbC5jb21wb25lbnRzWyduLXNvdW5kJ107XHJcblx0XHRcdFx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ3NvdW5kLXBsYXllZCcpIHtcclxuXHRcdFx0XHRcdFx0c291bmQucGxheVNvdW5kKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0c291bmQucGF1c2VTb3VuZCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRjb21wb25lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignY29tcG9uZW50Y2hhbmdlZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdGlmICghc3luYy5pc01pbmUpIHJldHVybjtcclxuXHRcdFx0XHR2YXIgbmFtZSA9IGV2ZW50LmRldGFpbC5uYW1lO1xyXG5cdFx0XHRcdGlmIChuYW1lICE9PSAnbi1zb3VuZCcpIHJldHVybjtcclxuXHRcdFx0XHRjb21wb25lbnQuc291bmRTdGF0ZVJlZi5zZXQoZXZlbnQuZGV0YWlsLm5ld0RhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGNvbXBvbmVudC5zb3VuZFN0YXRlUmVmLm9uKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG5cdFx0XHRcdGlmIChzeW5jLmlzTWluZSkgcmV0dXJuO1xyXG5cdFx0XHRcdHZhciBzdGF0ZSA9IHNuYXBzaG90LnZhbCgpO1xyXG5cdFx0XHRcdGlmICghc3RhdGUpIHJldHVybjtcclxuXHRcdFx0XHRjb21wb25lbnQuZWwuc2V0QXR0cmlidXRlKCduLXNvdW5kJywgc3RhdGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5zb3VuZFN0YXRlUmVmLm9mZigndmFsdWUnKTtcclxuXHRcdHRoaXMuc291bmRFdmVudFJlZi5vZmYoJ3ZhbHVlJyk7XHJcblx0fVxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zeW5jLW4tc291bmQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiAqIFRoZSB3aXJlIGNvbXBvbmVudCBhbGxvd3MgeW91IHRvIHRyaWdnZXIgYW4gZXZlbnQgb24gYW5vdGhlciBlbnRpdHkgd2hlbiBhbiBldmVudCBvY2N1cnMgb24gYW4gZW50aXR5XHJcbiAqIEBtaXhpbiB3aXJlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvbiBOYW1lIG9mIGFuIGV2ZW50IHRvIGxpc3RlbiB0b1xyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZ2FpbmVkIE5hbWUgb2YgYSBzdGF0ZSB0byB3YXRjaCBmb3JcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxvc3QgTmFtZSBvZiBhIHN0YXRlIHRvIHdhdGNoIGZvclxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW1pdCBOYW1lIG9mIGFuIGV2ZW50IHRvIHRyaWdnZXIgb24gdGhlIHRhcmdldHNcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGdhaW4gTmFtZSBvZiBhIHN0YXRlIHRvIGFkZCBvbiB0aGUgdGFyZ2V0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsb3NlIE5hbWUgb2YgYSBzdGF0ZSB0byByZW1vdmUgb24gdGhlIHRhcmdldFxyXG4gKiBAcHJvcGVydHkge3NlbGVjdG9yfSB0YXJnZXRzIEEgc2VsZWN0b3IgdG8gcGljayB3aGljaCBvYmplY3RzIHRvIHdpcmUgdG9cclxuICogQHByb3BlcnR5IHtzZWxlY3Rvcn0gdGFyZ2V0IC0gQSBzZWxlY3RvciB0byBwaWNrIGEgc2luZ2xlIG9iamVjdCB0byB3aXJlIHRvXHJcbiAqKi9cclxuQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCd3aXJlJyxcclxue1xyXG5cdG11bHRpcGxlOiB0cnVlLFxyXG5cdHNjaGVtYToge1xyXG5cdFx0b246IHt0eXBlOiAnc3RyaW5nJ30sXHJcblx0XHRlbWl0OiB7dHlwZTogJ3N0cmluZyd9LFxyXG5cdFx0Z2FpbmVkOiB7dHlwZTogJ3N0cmluZyd9LFxyXG5cdFx0bG9zdDoge3R5cGU6ICdzdHJpbmcnfSxcclxuXHRcdGdhaW46IHt0eXBlOiAnc3RyaW5nJ30sXHJcblx0XHRsb3NlOiB7dHlwZTogJ3N0cmluZyd9LFxyXG5cdFx0dGFyZ2V0czoge3R5cGU6ICdzZWxlY3RvckFsbCd9LFxyXG5cdFx0dGFyZ2V0OiB7dHlwZTogJ3NlbGVjdG9yJ31cclxuXHR9LFxyXG5cdHVwZGF0ZTogZnVuY3Rpb24gKG9sZERhdGEpIHtcclxuXHRcdGlmIChvbGREYXRhLm9uKSB7XHJcblx0XHRcdHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihvbGREYXRhLm9uLCB0aGlzLmFjdE9uVGFyZ2V0cyk7XHJcblx0XHR9XHJcblx0XHRpZiAob2xkRGF0YS5nYWluZWQpIHtcclxuXHRcdFx0dGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdGF0ZWFkZGVkJywgdGhpcy5hY3RPblRhcmdldHNJZlN0YXRlTWF0Y2hlcyk7XHJcblx0XHR9XHJcblx0XHRpZiAob2xkRGF0YS5sb3N0KSB7XHJcblx0XHRcdHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3RhdGVyZW1vdmVkJywgdGhpcy5hY3RPblRhcmdldHNJZlN0YXRlTWF0Y2hlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hY3RPblRhcmdldHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGZ1bmN0aW9uIGFjdChlbCkge1xyXG5cdFx0XHRcdGlmICh0aGlzLmRhdGEuZW1pdCkge1xyXG5cdFx0XHRcdFx0ZWwuZW1pdCh0aGlzLmRhdGEuZW1pdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLmRhdGEuZ2Fpbikge1xyXG5cdFx0XHRcdFx0ZWwuYWRkU3RhdGUodGhpcy5kYXRhLmdhaW4pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGhpcy5kYXRhLmxvc2UpIHtcclxuXHRcdFx0XHRcdGVsLnJlbW92ZVN0YXRlKHRoaXMuZGF0YS5sb3NlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYodGhpcy5kYXRhLnRhcmdldHMpIHRoaXMuZGF0YS50YXJnZXRzLmZvckVhY2goYWN0LmJpbmQodGhpcykpO1xyXG5cdFx0XHRpZih0aGlzLmRhdGEudGFyZ2V0KSBhY3QuY2FsbCh0aGlzLCB0aGlzLmRhdGEudGFyZ2V0KTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLmFjdE9uVGFyZ2V0c0lmU3RhdGVNYXRjaGVzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdHZhciBzdGF0ZSA9IGV2ZW50LmRldGFpbC5zdGF0ZTtcclxuXHRcdFx0aWYgKHN0YXRlID09PSB0aGlzLmRhdGEuZ2FpbmVkIHx8IHN0YXRlID09PSB0aGlzLmRhdGEubG9zdCkge1xyXG5cdFx0XHRcdHRoaXMuYWN0T25UYXJnZXRzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHRpZiAodGhpcy5kYXRhLm9uKSB7XHJcblx0XHRcdHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEub24sIHRoaXMuYWN0T25UYXJnZXRzKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmRhdGEuZ2FpbmVkKSB7XHJcblx0XHRcdHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignc3RhdGVhZGRlZCcsIHRoaXMuYWN0T25UYXJnZXRzSWZTdGF0ZU1hdGNoZXMpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZGF0YS5sb3N0KSB7XHJcblx0XHRcdHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignc3RhdGVyZW1vdmVkJywgdGhpcy5hY3RPblRhcmdldHNJZlN0YXRlTWF0Y2hlcyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRyZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEub24sIHRoaXMuYWN0T25UYXJnZXRzKTtcclxuXHRcdHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3RhdGVhZGRlZCcsIHRoaXMuYWN0T25UYXJnZXRzSWZTdGF0ZU1hdGNoZXMpO1xyXG5cdFx0dGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdGF0ZXJlbW92ZWQnLCB0aGlzLmFjdE9uVGFyZ2V0c0lmU3RhdGVNYXRjaGVzKTtcclxuXHR9XHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3dpcmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==