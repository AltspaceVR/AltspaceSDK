/*
 * AltOBJMTLLoader imports models into Three.js and also into Altspace.
 * Based on the THREE.OBJMTLLoader (and requires it and MTLLoader to run).
 * 
 * Author: Gavan Wilhite
 * Copyright (c) 2015 AltspaceVR
 */

THREE.AltOBJMTLLoader = function (manager, options) {
	this.options = options || {};
	this.manager = (
		(manager !== undefined) ? manager : THREE.DefaultLoadingManager);

	this.inAltspace = !!window.engine;
};

THREE.AltOBJMTLLoader.prototype = {

	constructor: THREE.AltOBJMTLLoader,

	cache: {},

	load: function ( objUrl, onLoad, onProgress, onError) {

		var cache = this.cache;

		function relativeToAbsolutePath(href) {
			var link = document.createElement("a");
			link.href = href;
			return (
				link.protocol+"//"+link.host+link.pathname+
				link.search+link.hash);
		}

		function loadInAltspace(){
			var options = {};
			options.__Type = "JSTypeLoadObj";
			options.Url = objUrl;

			window.engine.call("LoadObj", options);
		}

		var innerOnLoad = function (object){
			object.userData.src = objUrl;
			if (!cache.hasOwnProperty(objUrl)){
				cache[objUrl] = object;
			}
			for (var i = 0; i < object.children.length; i++) {
				var child = object.children[i];
				if (child instanceof THREE.Mesh) {
					child.geometry.needsUpdate = true;
				}
			}
			onLoad(object);
		}.bind(this)

		objUrl = relativeToAbsolutePath(objUrl);

		var mtlUrl = objUrl.slice(0, objUrl.length - 3) + 'mtl';

		if (cache.hasOwnProperty(objUrl)){
			innerOnLoad(cache[objUrl].clone());
		} else {
			// It's important that we have the manager call it's callbacks 
			// if this is ever disabled 
			var loader = new THREE.OBJMTLLoader( this.manager ); 
			loader.load(objUrl, mtlUrl, innerOnLoad, onProgress, onError);
		}

		if(this.inAltspace && !this.options.bypassAltspace) {
			loadInAltspace();
		}
	},
};
