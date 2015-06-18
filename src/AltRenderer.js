/*
 * AltRenderer renders a Three.js scene in the Altspace web browser.
 *
 * Author: Gavan Wilhite
 * Copyright (c) 2015 AltspaceVR
 */

THREE.AltRenderer = function ( parameters ) {

	console.log( 'THREE.AltRenderer', THREE.REVISION );

	this.SDK_VERSION = "0.3.1";
	console.log( 'AltspaceSDK version ' + this.SDK_VERSION );

	this.inAltspace = !!window.engine;

	var lastSerializedScene;
	var exporter = new THREE.AltSceneExporter();

	Object.defineProperty(this, "domElement", {
		get : function(){
			console.log("AltRenderer.domElement not yet implemented");
			return null;
		}
	});

	function sendToAltspace(serializedScene){
		var options = {};
		options.__Type = "JSTypeString";
		options.String0 = serializedScene;

		window.engine.call("RenderThreeJSScene", options);
	}

	this.render = throttle(function ( scene ) {
		if(this.inAltspace){
			scene.updateMatrixWorld();
			var serializedScene = JSON.stringify(exporter.parse(scene));

			if(serializedScene != lastSerializedScene)//Would be nice if we could find this out prior to serialization
				sendToAltspace( serializedScene );

			lastSerializedScene = serializedScene;
		}
	}, 33);

	function throttle(func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function() {
			previous = options.leading === false ? 0 : Date.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function() {
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
	}

};
