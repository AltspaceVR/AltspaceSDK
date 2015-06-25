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
	if (THREE.AltSceneExporter) {
		var exporter = new THREE.AltSceneExporter();
	}

	Object.defineProperty(this, "domElement", {
		get : function(){
			console.log("AltRenderer.domElement not yet implemented");
			return null;
		}
	});

	function serializeScene(scene){
		var serializedObjects = '';

		function serializeObjects(object3d){
			if('src' in object3d.userData){//Only pack objects that have src properties (for now, .obj files loaded by AltOBJMTLLoader)
				serializedObjects += object3d.uuid + '|' +
				object3d.userData.src + '|' +
				serializeTransformToBase64(object3d) +
				serializeColorToBase64(object3d.userData.tintColor) +
				'\n';
			}
			for(var i = 0, max = object3d.children.length; i < max; i++){
				serializeObjects(object3d.children[i]);
			}
		}

		serializeObjects(scene);

		return serializedObjects;
	}

	function serializeColorToBase64(color){
		var colorString = '';
		if(color)
		{
			var buffer = new ArrayBuffer(12);

			var floatArray = new Float32Array(buffer);

			floatArray[0] = color.r;
			floatArray[1] = color.g;
			floatArray[2] = color.b;

			colorString = arrayBufferToBase64(buffer);
		}
		return colorString;
	}

	function serializeTransformToBase64(object3d){
		var transform = '';

		var worldPosition = new THREE.Vector3();
		var worldRotation = new THREE.Quaternion();
		var worldScale = new THREE.Vector3();

		object3d.matrixWorld.decompose( worldPosition, worldRotation, worldScale );

		var buffer = new ArrayBuffer(40);

		var floatArray = new Float32Array(buffer);

		floatArray[0] = worldPosition.x;
		floatArray[1] = worldPosition.y;
		floatArray[2] = worldPosition.z;
		floatArray[3] = worldRotation.x;
		floatArray[4] = worldRotation.y;
		floatArray[5] = worldRotation.z;
		floatArray[6] = worldRotation.w;
		floatArray[7] = worldScale.x;
		floatArray[8] = worldScale.y;
		floatArray[9] = worldScale.z;

		transform += arrayBufferToBase64(buffer);

		return transform;
	}

	function arrayBufferToBase64( buffer ) {
		var binary = '';
		var bytes = new Uint8Array( buffer );
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode( bytes[ i ] );
		}
		return window.btoa( binary );
	}

	function sendToAltspace(serializedScene){
		var options = {};
		options.__Type = "JSTypeString";
		options.String0 = serializedScene;

		window.engine.call("RenderThreeJSScene", options);
	}

	this.render = throttle(function ( scene ) {
		if(this.inAltspace ){
			scene.updateMatrixWorld();
			var serializedScene;
			if (exporter) {
				// TODO: Either diff the scene or avoid exporting the entire
				// thing on each render call.
				serializedScene = JSON.stringify(exporter.parse(scene));
			}
			else {
				serializedScene = serializeScene(scene);
			}

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
