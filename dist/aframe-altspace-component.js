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
/***/ function(module, exports) {

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}
	AFRAME.registerComponent('editor', {
	  _setSelectedObject: function (event) {
	      if(event.target.el.dataset.editorAsset) { return; }
	      if (this.placingObject) {
	        this.placingObject = null;
	      this.raycastFloor.userData.altspace.collider.enabled = false;
	      }
	      this.selectedObject = event.target;
	  },
	  _moveSelectedObject: function (event) {
	    if (!this.selectedObject) { return; }
	    var el = this.selectedObject.el
	    var pos = Object.assign({}, el.components.position.data);
	    switch (event.keyCode) {
	      case 'I'.charCodeAt(0): pos.z--; break;
	      case 'J'.charCodeAt(0): pos.x--; break;
	      case 'K'.charCodeAt(0): pos.z++; break;
	      case 'L'.charCodeAt(0): pos.x++; break;
	      case 'P'.charCodeAt(0): pos.y+=0.25; break;
	      case ';'.charCodeAt(0): pos.y-=0.25; break;
	    }
	    el.setAttribute('position', pos);
	  },
	  _placeObject: function (event) {
	    if (!this.placingObject) { return; }
	    this.raycastFloor.userData.altspace.collider.enabled = true;
	    this.raycaster.set(event.ray.origin, event.ray.direction);
	    var intersection = this.raycaster.intersectObject(this.raycastFloor)[0];
	    if (!intersection) { return; }
	    var pos = intersection.point.clone().multiplyScalar(1/this.scene.object3D.scale.x);
	    pos.x = Math.ceil(pos.x);
	    pos.z = Math.floor(pos.z);
	    pos.x += 0.5;
	    pos.z -= 0.5;
	    this.placingObject.setAttribute('position',  pos);
	  },
	  _assets: [
	    'Architecture/Ceiling_2Wx2L',
	    'Architecture/Ceiling_2Wx4L',
	    'Architecture/Ceiling_4Wx2L',
	    'Architecture/Ceiling_4Wx4L',
	    'Architecture/Ceiling_Skylight_4Wx4L',
	    'Architecture/Ceiling_Skylight_Corner_2Wx2L',
	    'Architecture/Ceiling_Skylight_Edge_2W',
	    'Architecture/Ceiling_Skylight_Edge_4W',
	    'Architecture/Ceiling_Skylight_Filled_4Wx4L',
	    'Architecture/Ceiling_Skylight_Filled2_4Wx4L',
	    'Architecture/Ceiling_Slice_Concave_2R',
	    'Architecture/Ceiling_Slice_Concave_4R',
	    'Architecture/Ceiling_Slice_Convex_2R',
	    'Architecture/Ceiling_Slice_Convex_4R',
	    'Architecture/Door_4Wx4H',
	    'Architecture/Floor_2Wx2L',
	    'Architecture/Floor_2Wx4L',
	    'Architecture/Floor_4Wx2L',
	    'Architecture/Floor_4Wx4L',
	    'Architecture/Floor_Slice_Concave_2R',
	    'Architecture/Floor_Slice_Concave_4R',
	    'Architecture/Floor_Slice_Convex_2R',
	    'Architecture/Floor_Slice_Convex_4R',
	    'Architecture/Railing_2L',
	    'Architecture/Railing_4L',
	    'Architecture/Railing_Curve_Concave_2R',
	    'Architecture/Wall_2Wx4H',
	    'Architecture/Wall_4Wx4H',
	    'Architecture/Wall_Base_2W',
	    'Architecture/Wall_Base_4W',
	    'Architecture/Wall_Base_Curve_Concave_2R',
	    'Architecture/Wall_Base_Curve_Concave_4R',
	    'Architecture/Wall_Base_Curve_Convex_2R',
	    'Architecture/Wall_Base_Curve_Convex_4R',
	    'Architecture/Wall_Bulkhead_2W',
	    'Architecture/Wall_Bulkhead_4W',
	    'Architecture/Wall_Bulkhead_Curve_Concave_2R',
	    'Architecture/Wall_Bulkhead_Curve_Concave_4R',
	    'Architecture/Wall_Bulkhead_Curve_Convex_2R',
	    'Architecture/Wall_Bulkhead_Curve_Convex_4R',
	    'Architecture/Wall_Curve_Concave_2Rx4H',
	    'Architecture/Wall_Curve_Concave_4Rx4H',
	    'Architecture/Wall_Curve_Convex_2Rx4H',
	    'Architecture/Wall_Curve_Convex_4Rx4H',
	    'Architecture/Wall_Curve_Window_Concave_4Rx4H',
	    'Architecture/Wall_Curve_Window_Gap_Concave_4Rx4H',
	    'Architecture/Wall_Curve_Window_Gap_End_L_Concave_4Rx4H',
	    'Architecture/Wall_Curve_Window_Gap_End_R_Concave_4Rx4H',
	    'Architecture/Wall_Filler_Corner_Inner_4H',
	    'Architecture/Wall_Filler_Corner_Outer_4H',
	    'Architecture/Wall_Window_4Wx4H',
	    'Architecture/Wall_Window_GapEnd_R_4Wx4H',
	    'Architecture/Wall_Window_Gap_2Wx4H',
	    'Architecture/Wall_Window_Gap_4Wx4H',
	    'Architecture/Wall_Window_Gap_End_L_2Wx4H',
	    'Architecture/Wall_Window_Gap_End_L_4Wx4H',
	    'Architecture/Wall_Window_Gap_End_R_2Wx4H',
	    'Architecture/Wall_Window2',
	    'Architecture/Window_Wall_Curve_Concave_4Rx4H'
	  ],
	  _setPlacingObject: function (event) {
	    var placingObject = document.createElement('a-entity');
	    placingObject.setAttribute('native-object', {asset: event.target.el.components['native-object'].data.asset});
	    this.placingObject = placingObject;
	    this.scene.appendChild(placingObject);
	  },
	  _addAssetToPalette: function (asset, i) {
	    var assetEntity = document.createElement('a-entity');
	    assetEntity.dataset.editorAsset = true;
	    assetEntity.setAttribute('native-object', {asset: asset});

	    // Hack to fix scaling issue
	    setTimeout(function (assetEntity) { return function () {
	      assetEntity.setAttribute('scale', '0.05 0.05 0.05');
	    }}(assetEntity), 500);

	    var cols = 3;
	    var scale = 1 / 5;
	    var spacing = 1 + 1 / 3;
	    var pos = {x: (i % cols) * (scale * spacing), y: -Math.floor(i / cols) * (scale * spacing)};

	    assetEntity.setAttribute('position', pos);
	    assetEntity.object3D.addEventListener('cursordown', this._setPlacingObject.bind(this));
	    this.palette.appendChild(assetEntity);
	  },
	  _createPalette: function () {
	    this.palette = document.createElement('a-entity');
	    this.palette.id = 'editorPalette';
	    this.palette.setAttribute('position', '0 1.5 5');
	    this._assets.forEach(this._addAssetToPalette.bind(this));
	    this.scene.appendChild(this.palette);
	  },
	  init: function () {
	    this.scene = document.querySelector('a-scene');
	    this.scene.object3D.addEventListener('cursordown', this._setSelectedObject.bind(this));
	    window.addEventListener('keydown', this._moveSelectedObject.bind(this));

	    this.raycastFloor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({color: 'white'}));
	    this.raycastFloor.material.visible = false;
	    this.raycastFloor.userData.altspace = {collider: {enabled: false}};

	    // Hack so that we avoid errors about this non-aframe object
	    var noop = function () {}
	    this.raycastFloor.el = { removeState: noop, addState: noop, emit: noop};

	    this.raycastFloor.rotation.x = -Math.PI / 2;
	    this.scene.object3D.add(this.raycastFloor);
	    this.raycaster = new THREE.Raycaster();
	    this.scene.object3D.addEventListener('cursormove', this._placeObject.bind(this));

	    this._createPalette();
	  }
	});

	AFRAME.registerComponent('native', {
	  schema: {
		asset: { type: 'string' },
	  	attributes: {
	  		type: 'string',
	  		/*parse: function (value) {
				var ret;
				  try {
					  ret = JSON.parse(value);
				  } catch (e) {}
				  return ret;
	  		},
	  		stringify: function (value) {
	  			var ret;
	  			try {
	  				ret = JSON.stringify(value);
	  			} catch (e) { }
	  			return ret;
	  		}*/
		  }
	  },
	  init: function () {
	    this.el.setObject3D('native', altspace.instantiateNativeObject(this.data.asset));
	  },
	  update: function (oldData) {
	  	if (this.data.attributes) {
	  		altspace._internal.callClientFunction('UpdateNativeAttributes', {
	  			MeshId: this.el.object3DMap.native.id,
	  			Attributes: this.data.attributes
	  		}, { argsType: 'JSTypeUpdateNativeAttributes' });
		}
	  },
	  remove: function () {
	    this.el.removeObject3D('native');
	  }
	});

	AFRAME.registerComponent('n-sphere-collider', {
		schema: {
			isTrigger: false
		},
		init: function () {
			//TODO: This is a placeholder to get the SDK to pick up the element if there isn't a mesh
			var placeholder = this.el.getOrCreateObject3D('n-sphere-collider-placeholder', THREE.Mesh);
			altspace._internal.callClientFunction('AddNativeComponent', {
				MeshId: placeholder.id,
				Type: 'n-sphere-collider'
			}, { argsType: 'JSTypeAddNativeComponent' });
		},
		update: function (oldData) {
			/*if (this.data.attributes) {
				altspace._internal.callClientFunction('UpdateNativeAttributes', {
					MeshId: this.el.object3DMap.native.id,
					Attributes: this.data.attributes
				}, { argsType: 'JSTypeUpdateNativeAttributes' });
			}*/
		},
		remove: function () {
			this.el.removeObject3D('n-sphere-collider-placeholder');
		}
	});

	//Use selector for teleporting
	//The attributes may just be better strongly typed. Hmm hard call.
	//Maybe some things are just only Primitives like browsers, and some can be used like components (if they are actually native components)
	//Primitives for native 
	//Demo by remaking D&D including the Tomes
	//Point Layout enclsure url at github repo

	//TODO: Bug in AFRAME 2.0
	//AFRAME.registerPrimitive('n-browser', {
	//	defaultComponents: {
	//		native: { asset: 'System/Browser' }
	//	},
	//	mappings: {
	//	}
	//});

	//AFRAME.registerPrimitive('n-browser', {
	//	defaultComponents: {
	//		native: { asset: 'System/Browser' }
	//	},
	//	mappings: {
	//	}
	//});

	AFRAME.registerPrimitive('n-entity', {
		defaultComponents: {
			native: {}
		},
		mappings: {
			asset: 'native.asset',
			attributes: 'native.attributes'
		}
	});

	/**
	 * The altspace component makes A-Frame apps compatible with AltspaceVR.
	 */
	AFRAME.registerComponent('altspace', {

	  /**
	   * usePixelScale will allow you to use A-Frame units as CSS pixels.
	   * This is the default behavior for three.js apps, but not for A-Frame apps.
	   * verticalAlign puts the origin at the bottom, middle (default), or top of the Altspace enclosure.
	   */
	  schema: {
	    usePixelScale: { type: 'boolean', default: 'false'},
	    verticalAlign: { type: 'string', default: 'middle'}
	  },

	  /**
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
	    } else {
	      console.warn('aframe-altspace-component only works inside of AltspaceVR');
	    }

	  },

	  /**
	   * Called when component is attached and when component data changes.
	   * Generally modifies the entity based on the data.
	   */
	  update: function (oldData) {
	  },

	  /**
	   * Called when a component is removed (e.g., via removeAttribute).
	   * Generally undoes all modifications to the entity.
	   */
	  remove: function () { },

	  /**
	   * Called on each scene tick.
	   */
	  // tick: function (t) { },

	  /**
	   * Called when entity pauses.
	   * Use to stop or remove any dynamic or background behavior such as events.
	   */
	  pause: function () { },

	  /**
	   * Called when entity resumes.
	   * Use to continue or add any dynamic or background behavior such as events.
	   */
	  play: function () { },


	  /********** Helper Methods **********/

	  /**
	   * Swap in Altspace renderer when running in AltspaceVR.
	   */
	  initRenderer: function () {

	    var scene = this.el.object3D;
	    if (!this.data.usePixelScale) {
	      altspace.getEnclosure().then(function(e) {
	        scene.scale.multiplyScalar(e.pixelsPerMeter);
	      });
	    }
	    var verticalAlign = this.data.verticalAlign;
	    if (verticalAlign !== 'center') {
	      altspace.getEnclosure().then(function(e) {
	        switch (verticalAlign) {
	          case 'bottom':
	            scene.position.y -= e.innerHeight / 2;
	            break;
	          case 'top':
	            scene.position.y += e.innerHeight / 2;
	            break;
	          default:
	            console.warn('Unexpected value for verticalAlign: ', this.data.verticalAlign);
	        }
	      });
	    }
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

	  /**
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

	    var emit = function(eventName, targetEl) {
	      // Fire events on intersected object and A-Frame cursor.
	      if (cursorEl) cursorEl.emit(eventName, {target: targetEl});
	      if (targetEl) targetEl.emit(eventName, {target: targetEl});
	    } ;

	    var cursordownObj = null;
	    scene.addEventListener('cursordown', function(event) {
	      cursordownObj = event.target;
	      emit('mousedown', event.target.el);
	    });

	    scene.addEventListener('cursorup', function(event) {
	      emit('mouseup', event.target.el);
	      if (event.target.uuid === cursordownObj.uuid) {
	        emit('click', event.target.el);
	      }
	      cursordownObj = null;
	    });

	    scene.addEventListener('cursorenter', function(event) {
	      if (!event.target.el) { return; }
	      event.target.el.addState('hovered');
	      if (cursorEl) cursorEl.addState('hovering');
	      emit('mouseenter', event.target.el);
	    });

	    scene.addEventListener('cursorleave', function(event) {
	      if (!event.target.el) { return; }
	      event.target.el.removeState('hovered');
	      if (cursorEl) cursorEl.removeState('hovering');
	      emit('mouseleave', event.target.el);
	    });

	  },

	});

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


/***/ }
/******/ ]);