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
	  schema: { 
	    autoscale: { type: 'boolean', default: 'true' }
	  },

	  /**
	   * Called once when component is attached. Generally for initial setup.
	   */
	  init: function () {},

	  /**
	   * Called when component is attached and when component data changes.
	   * Generally modifies the entity based on the data.
	   */
	  update: function (oldData) {
	    if (!(this.el.object3D instanceof THREE.Scene)) {
	      console.warn('aframe-altspace-component can only be attached to a-scene');
	      return;
	    }
	    if (window.altspace && window.altspace.inClient) {
	      var scene = this.el.object3D;
	      if (this.data.autoscale) {
	        altspace.getEnclosure().then(function(e) {
	          console.log('aframe-altspace-component autoscaling scene by', e.pixelsPerMeter);
	          scene.scale.multiplyScalar(e.pixelsPerMeter);
	        });
	      }
	      var renderer = this.el.renderer =  altspace.getThreeJSRenderer({version: '0.2.0'});
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
	    }
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
	});


/***/ }
/******/ ]);