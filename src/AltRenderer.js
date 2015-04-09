/**
 * AltRenderer renders a Three.js scene in the Altspace web browser.
 *
 * @author Gavan Wilhite
 * Copyright (c) 2015 AltspaceVR
 */

THREE.AltRenderer = function ( parameters ) {

	console.log( 'THREE.AltRenderer', THREE.REVISION );

	this.inAltspace = !!window.engine;

	var lastSerializedScene;

	Object.defineProperty(this, "domElement", {
		get : function(){console.log("AltRenderer.domElement not yet implemented"); return null}
	});

	function serializeSceneToCsv(scene){
		var serializedObjects = '';

		function serializeObjectsToCsv(object3d){
			if('src' in object3d.userData){//Only pack objects that have src properties (for now, .obj files loaded by AltOBJMTLLoader)
				serializedObjects += object3d.uuid + '|' + object3d.userData.src + serializeTransformToCsv(object3d) + serializeColorToCsv(object3d.userData.tintColor) + '\n';
			}
			for(var i = 0, max = object3d.children.length; i < max; i++){
				serializeObjectsToCsv (object3d.children[i])
			}
		}

		serializeObjectsToCsv(scene);

		return serializedObjects;
	}

	function serializeColorToCsv(color){
		var colorCsv = '';
		if(color)
			colorCsv += '|' + color.r + '|' + color.g + '|' + color.b;
		
		return colorCsv;
	}

	function serializeTransformToCsv(object3d){
		var transform = '';

		var worldPosition = new THREE.Vector3();
		var worldRotation = new THREE.Quaternion();
		var worldScale = new THREE.Vector3();

		object3d.matrixWorld.decompose( worldPosition, worldRotation, worldScale );

		worldPosition.x = -worldPosition.x; // convert positions from left handed coordinate system to right handed
		worldRotation.y = -worldRotation.y; // fix rotations over y axis
		worldRotation.z = -worldRotation.z; // fix rotations over z axis

		transform += '|' + worldPosition.x + '|' + worldPosition.y + '|' + worldPosition.z;
		transform += '|' + worldRotation.x + '|' + worldRotation.y + '|' + worldRotation.z + '|' + worldRotation.w;
		transform += '|' + worldScale.x + '|' + worldScale.y + '|' + worldScale.z;
		
	 	return transform;
	}

	function sendToAltspace(serializedScene){
		var options = {};
		options.__Type = "JSTypeString";
		options.String0 = serializedScene;

		window.engine.call("RenderThreeJSScene", options);
	}

	this.render = throttle(function ( scene ) {
		if(this.inAltspace){
			scene.updateMatrixWorld();
			var serializedScene = serializeSceneToCsv(scene);

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
