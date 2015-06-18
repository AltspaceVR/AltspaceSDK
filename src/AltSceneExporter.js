THREE.AltSceneExporter = function () {
	var getGeometries = function (obj, geometries) {
		if (obj.geometry) {
			geometries[obj.geometry.uuid] = obj.geometry;
		}
		for (var i = 0, l = obj.children.length; i < l; i ++) {
			getGeometries(obj.children[i], geometries);
		}
	};
	var serializeGeometries = function (output, geometries) {
		for (var j = 0, l = output.geometries.length; j < l; j++) {
			output.geometries[j].data = THREE.Geometry.prototype.toJSON.call(
				geometries[output.geometries[j].uuid].clone()).data;
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

	var serializeTransforms = function (output, obj) {
		output.transform = {
			position: {
				x: obj.position.x,
				y: obj.position.y,
				z: obj.position.z
			},
			rotation: {
				x: obj.quaternion.x,
				y: obj.quaternion.y,
				z: obj.quaternion.z,
				w: obj.quaternion.w
			},
			scale: {
				x: obj.scale.x,
				y: obj.scale.y,
				z: obj.scale.z
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
		var geometries = {};
		getGeometries(scene, geometries);
		serializeGeometries(output, geometries);
		serializeTransforms(output.object, scene);
		return output;
	};
};
