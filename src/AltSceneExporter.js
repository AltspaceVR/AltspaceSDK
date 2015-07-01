THREE.AltSceneExporter = function () {
	var getGeometries = function (obj, geometries) {
		if (obj.geometry) {
			geometries[obj.geometry.uuid] = obj.geometry;
		}
		for (var i = 0, l = obj.children.length; i < l; i ++) {
			getGeometries(obj.children[i], geometries);
		}
	};
	var serializeGeometries = function (scene, output) {
		if (!output.geometries) { return; }
		var geometries = {};
		getGeometries(scene, geometries);
		for (var j = 0, l = output.geometries.length; j < l; j++) {
			output.geometries[j].data = THREE.Geometry.prototype.toJSON.call(
				geometries[output.geometries[j].uuid]).data;
		}
	};

	var getMaterials = function (obj, materials) {
		if (obj.material) {
			materials[obj.material.uuid] = obj.material;
		}
		if (!obj.children) { return; }
		for (var i = 0, l = obj.children.length; i < l; i ++) {
			getMaterials(obj.children[i], materials);
		}
	};
	var getDataUri = function (image) {
		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
		var context = canvas.getContext('2d');
		context.drawImage(image, 0, 0, image.width, image.height);
		return canvas.toDataURL('image/png');
	};
	var serializeMaterials = function (scene, output) {
		if (!output.materials) { return; }
		var materials = {};
		getMaterials(scene, materials);
		for (var j = 0, l = output.materials.length; j < l; j++) {
			var material = materials[output.materials[j].uuid];
			if (material.map) {
				if (material.map.sourceFile && !material.map.image) {
					output.materials[j].loaded = false;
				}
				else {
					output.materials[j].loaded = true;
					output.materials[j].textureDataUri = getDataUri(material.map.image);
				}
			}
		}
	};

	var getChildByUuid = function (obj, uuid) {
		for (var i = 0, l = obj.children.length; i < l; i ++) {
			var child = obj.children[i];
			if (child.uuid === uuid) {
				return child;
			}
		}
	};

	var serializeTransforms = function (obj, output) {
		var objPos = obj.getWorldPosition();
		var objQuat = obj.getWorldQuaternion();
		var objScale = obj.getWorldScale();
		output.transform = {
			position: {
				x: objPos.x,
				y: objPos.y,
				z: objPos.z
			},
			rotation: {
				x: objQuat.x,
				y: objQuat.y,
				z: objQuat.z,
				w: objQuat.w
			},
			scale: {
				x: objScale.x,
				y: objScale.y,
				z: objScale.z
			}
		};
		if (output.children) {
			for (var i = 0; i < output.children.length; i++) {
				var child = output.children[i];
				var childObj = getChildByUuid(obj, child.uuid);
				serializeTransforms(child, childObj);
			}
		}
	};

	this.parse = function (scene) {
		var output = scene.toJSON();
		serializeGeometries(scene, output);
		serializeMaterials(scene, output);
		serializeTransforms(scene, output.object);
		return output;
	};
};
