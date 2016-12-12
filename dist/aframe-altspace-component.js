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


/***/ },
/* 1 */
/***/ function(module, exports) {

	/*
	* The altspace component makes A-Frame apps compatible with AltspaceVR.
	*
	* **Note**: If you use the `embedded` A-Frame component on your scene, you must include it *before* the `altspace` component, or your app will silently fail.
	* @mixin altspace
	* @property {boolean} usePixelScale=`false` - Allows you to use A-Frame units as CSS pixels.
	* This is the default behavior for three.js apps, but not for A-Frame apps.
	* @property {string} verticalAlign=`middle` - Puts the origin at the `bottom`, `middle` (default),
	* or `top` of the Altspace enclosure.
	* @property {boolean} enclosuresOnly=`true` - Prevents the scene from being created if
	* enclosure is flat.
	*
	* @example
	* <head>
	*   <title>My A-Frame Scene</title>
	*   <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
	*   <script src="https://cdn.rawgit.com/AltspaceVR/aframe-altspace-component/v1.0.0/dist/aframe-altspace-component.min.js"></script>
	* </head>
	* <body>
	*   <a-scene altspace>
	*     <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
	*   </a-scene>
	* </body>
	*/
	AFRAME.registerComponent('altspace', {
	  schema: {
		usePixelScale: { type: 'boolean', default: 'false'},
		verticalAlign: { type: 'string',  default: 'middle'},
		enclosuresOnly:{ type: 'boolean', default: 'true'}
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
		  if (!this.data.usePixelScale){
			scene.scale.multiplyScalar(e.pixelsPerMeter);
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
		var renderer = this.el.renderer = this.el.effect = altspace.getThreeJSRenderer();
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
/* 3 */
/***/ function(module, exports) {

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
	    * Creates a native object on this
	    * entity. The nature of these objects vary.
	    * @mixin n-object
	    * @prop {string} query - The identifier for the resource you want. 
	    * @example <a-entity n-object='architecture/wall-4w-4h'></a-entity>
	    */
		AFRAME.registerComponent('n-object', {
			schema: {
				type: 'string'
			},
			init: nativeComponentInit,
			update: nativeComponentUpdate,
			remove: nativeComponentRemove
		});

		/**
	    * Create an object that spawns additional non-spawning copies of itself. These copies will be physically interactive and automatically syncronized between users.
	    * Only some native resources can be spawned.
	    * @mixin n-spawner
	    * @prop {string} res - The identifier for the resource you want.
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
	    * Create a spherical collider on this entity.
	    * @mixin n-sphere-collider
	    * @prop {vec3} center=0,0,0 - The offset of the collider in local space.
	    * @prop {number} radius=1 - The size of the collider in meters.
	    * @prop {string} type=object - The type of collider, one of: `object` | `environment` | `cursor`
	    */
		AFRAME.registerComponent('n-sphere-collider', {
			init:nativeComponentInit,
			remove: nativeComponentRemove,
			update: nativeComponentUpdate,
			schema: {
				isTrigger: { default: false, type: 'boolean' },
				center: { type: 'vec3' },
				radius: { default: '0', type: 'number' },
				type: {default: 'hologram'}
			}
		});


		/**
	    * Create a box-shaped collider on this entity.
	    * @mixin n-box-collider
	    * @prop {vec3} center=0,0,0 - The offset of the collider in local space.
	    * @prop {vec3} size=1,1,1 - The dimensions of the collider.
	    * @prop {string} type=object - The type of collider, one of: `object` | `environment` | `cursor`
	    */
		AFRAME.registerComponent('n-box-collider', {
			init:nativeComponentInit,
			remove: nativeComponentRemove,
			update: nativeComponentUpdate,
			schema: {
				isTrigger: { default: false, type: 'boolean' },
				center: { type: 'vec3' },
				size: { type: 'vec3' },
				type: {default: 'hologram'}
			}
		});

		/**
	    * Create a capsule-shaped collider on this entity. Capsules
	    * are a union of a cylinder and two spheres on top and bottom.
	    * @mixin n-capsule-collider
	    * @prop {vec3} center=0,0,0 - The offset of the collider in local space.
	    * @prop {number} radius=1 - The radius of the capsule in meters.
	    * @prop {number} height=1 - The height of the shaft of the capsule in meters.
	    * @prop {string} direction=y - The axis with which the capsule is aligned.
	    * One of `x`, `y`, or `z`.
	    * @prop {string} type=object - The type of collider, one of: `object` | `environment` | `cursor`
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
				type: {default: 'hologram'}
			}
		});

		/**
	    * Enable collision for the entire attached mesh. This is expensive to evaluate, so should only be used on
	    * low-poly meshes. 
	    * @mixin n-mesh-collider
	    * @prop {string} type=object - The type of collider, one of: `object` | `environment` | `cursor`
	    * @example <a-box n-mesh-collider></a-box>
	    */
		AFRAME.registerComponent('n-mesh-collider', {
			init:nativeComponentInit,
			remove: nativeComponentRemove,
			update: nativeComponentUpdate,
			schema: {
				isTrigger: { default: false, type: 'boolean' },
				convex: { default: true, type: 'boolean' },
				type: {default: 'hologram'}
			}
		});

		/**
	    * Make the object always face the viewer. 
	    * @mixin n-billboard
	    * @example <a-plane n-billboard></a-plane>
	    */
		AFRAME.registerComponent('n-billboard', {
			init:nativeComponentInit,
			remove: nativeComponentRemove,
		});

	    /**
	    * A container keeps a running tally of how many objects are within
	    * its bounds, and adds and removes the states `container-full` and `container-empty` based on the current count of objects. Can fire three special events: `container-full`, `container-empty`,
	    * and `container-count-changed`.
	    * @mixin n-container
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
	    * Play the sound given by the `src` or `res` property from the location of the entity.
	    * @mixin n-sound
	    *
	    */
		AFRAME.registerComponent('n-sound', {
			init: function () {
				nativeComponentInit.call(this);
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
			},
			pauseSound: function () {
				callComponent.call(this, 'pause');
				this.el.emit('sound-paused');
			},
			playSound: function () {
				callComponent.call(this, 'play');
				this.el.emit('sound-played');
			},
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
/* 4 */
/***/ function(module, exports) {

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


			if(component.data.ownOn){
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

			component.takeOwnership = function() {
				ownerRef.set(syncSys.clientId);

				//clear our ownership if we disconnect
				//this is needed if we are the last user in the room, but we expect people to join later
				ownerRef.onDisconnect().set(null);
			}

			Object.defineProperty(component, 'isMine', {
				get: function () {
					return isMine;//TODO: Should this be state instead?
				}
			});
		}
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	AFRAME.registerSystem('sync-system',
	{
		schema: {
			author: { type: 'string', default: null },
			app: { type: 'string', default: null },
			instance: { type: 'string', default: null },
			'ref-url': { type: 'string', default: null },
		},
		init: function() {
			var component = this;

			if(!this.data || !this.app){
				console.warn('The sync-system must be present on the scene and configured with required data.');
				return;
			}

			component.isConnected = false;

			altspace.utilities.sync.connect({
				authorId: this.data.author,
				appId: this.data.app,
				instanceId: this.data.instance,
				baseRefUrl: this.data['ref-url']
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
/* 6 */
/***/ function(module, exports) {

	//TODO: We need to figure out a way to recieve our first update without caring about ownership.
	// firstValue is probably not the right way to go, probably something about having sent yet. Need to change for both
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
/* 7 */
/***/ function(module, exports) {

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
/* 8 */
/***/ function(module, exports) {

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
/* 9 */
/***/ function(module, exports) {

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