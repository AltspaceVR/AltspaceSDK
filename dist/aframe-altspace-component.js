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

	/**
	 * aframe-altspace-component component for A-Frame.
	 */
	AFRAME.registerComponent('altspace', {

	  /**
	   * usePixelScale will allow you to use A-Frame units as CSS pixels. This is the default behavior for three.js apps, but not for A-Frame apps.  verticalAlign puts the origin at the bottom, middle (default), or top of the Altspace enclosure.
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
	      this.initRenderer();
	      this.initCursorEvents();
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
	    var renderer = this.el.renderer = altspace.getThreeJSRenderer();
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
	      if (targetEl) targetEl.emit(eventName, {target: targetEl});
	      if (cursorEl) cursorEl.emit(eventName, {target: targetEl});
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
	      event.target.el.addState('hovered');
	      if (cursorEl) cursorEl.addState('hovering');
	      emit('mouseenter', event.target.el);
	    });

	    scene.addEventListener('cursorleave', function(event) {
	      event.target.el.removeState('hovered');
	      if (cursorEl) cursorEl.removeState('hovering');
	      emit('mouseleave', event.target.el);
	    });

	  },

	});


/***/ }
/******/ ]);