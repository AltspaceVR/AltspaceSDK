/**
 * AltOBJMTLLoader imports models into Three.js and also into Altspace.
 * Based on the THREE.OBJMTLLoader (and requires it and MTLLoader to run).
 * 
 * @author Gavan Wilhite
 * Copyright (c) 2015 AltspaceVR
 */

THREE.AltOBJMTLLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

	this.inAltspace = !!window.engine;
};

THREE.AltOBJMTLLoader.prototype = {

	constructor: THREE.AltOBJMTLLoader,

	load: function ( objUrl, onLoad, onProgress, onError ) {

		function relativeToAbsolutePath(href) {
			var link = document.createElement("a");
			link.href = href;
			return (link.protocol+"//"+link.host+link.pathname+link.search+link.hash);
		}

		function loadInAltspace(){
			var options = {};
			options.__Type = "JSTypeLoadObj";
			options.Url = objUrl;

			window.engine.call("LoadObj", options);
		}

		function innerOnLoad(object){
			object.userData.src = objUrl;
			onLoad(object);
		}

		objUrl = relativeToAbsolutePath(objUrl);

		var mtlUrl = objUrl.slice(0, objUrl.length - 3) + 'mtl';

		var loader = new THREE.OBJMTLLoader( this.manager ); //It's important that we have the manager call it's callbacks if this is ever disabled 
		loader.load(objUrl, mtlUrl, innerOnLoad, onProgress, onError);

		if(this.inAltspace)
			loadInAltspace();
	},
};
