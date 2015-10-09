var
	containerMax = Symbol('containerMax'),
	containerMin = Symbol('containerMin'),
	object3D = Symbol('object3D'),
	origMatrix = Symbol('origMatrix'),
	origMatrixAutoUpdate = Symbol('origMatrixAutoUpdate'),
	parent = Symbol('parent');

class Layout {

	constructor ({ my = {}, at }) {
		this.my = my;
		this.at = at;
	}

	getAxisSettings (axis, axisValue, min, max) {
		axisValue = axisValue || 'center';
		axisValue = /(\w+)([-+].+)?/.exec(axisValue);
		var position = axisValue[1];
		var offsetSetting = axisValue[2];
		var offset = parseFloat(offsetSetting) || 0;
		if (offsetSetting && offsetSetting.endsWith('%')) {
			offset = offset / 100 * (max[axis] - min[axis]);
		}
		return {
			position,
			offset
		}
	}

	getAnchorOffset (axis, axisValue) {
		var boundingBox = new THREE.Box3().setFromObject(this[object3D]);
		var max = boundingBox.max;
		var min = boundingBox.min;
		var {position, offset} = this.getAxisSettings(
			axis, axisValue, min, max);
		if (position === 'max') {
			return -max[axis] + offset
		}
		else if (position === 'min') {
			return -min[axis] + offset
		}
		else if (position === 'center') {
			return offset;
		}
		else {
			throw new Error(
				`${axisValue} is an invalid layout position for ${axis}`
			);
		}
	};
	doLayout () {
		Array.from('xyz').forEach((axis) => {
			var {position, offset} = this.getAxisSettings(
				axis, this.at[axis], this[containerMin], this[containerMax]);
			var anchorOffset = this.getAnchorOffset(axis, this.my[axis]);
			if (position === 'max') {
				this[object3D].position[axis] = this[containerMax][axis] + offset + anchorOffset;
			}
			else if (position === 'min') {
				this[object3D].position[axis] = this[containerMin][axis] + offset + anchorOffset;
			}
			else if (position === 'center') {
				this[object3D].position[axis] = offset;
			}
			else {
				throw new Error(
					`${this.at[axis]} is an invalid layout position for ${axis}`
				);
			}
		});

		if (this[parent]) {
			// Restore the original parent transform
			this[parent].matrix = this[origMatrix];
			this[parent].updateMatrixWorld(true);
			this[parent].matrixAutoUpdate = this[origMatrixAutoUpdate];
		}
	}

	awake (_object3D) {
		this[object3D] = _object3D;

		if (this[object3D].parent instanceof THREE.Scene) {
			altspace.getEnclosure().then((enclosure) => {
				var 
					hw = enclosure.innerWidth / 2,
					hh = enclosure.innerHeight / 2,
					hd = enclosure.innerDepth / 2;
				this[containerMax] = new THREE.Vector3(hw, hh, hd);
				this[containerMin] = this[containerMax].clone().multiplyScalar(-1);
				this.doLayout();
			});
		}
		else {
			this[parent] = this[object3D].parent;

			this[origMatrix] = this[parent].matrix.clone();
			this[origMatrixAutoUpdate] = this[parent].matrixAutoUpdate;

			// We want to use the un-transormed anchor of the parent.
			// Reset the parent matrix so that we can get the original bounding box.
			this[parent].matrixAutoUpdate = false;
			this[parent].matrix.identity();
			var parentBoundingBox = new THREE.Box3().setFromObject(this[parent]);
			this[containerMax] = this[parent].worldToLocal(parentBoundingBox.max);
			this[containerMin] = this[parent].worldToLocal(parentBoundingBox.min);
			this.doLayout();
		}
	}
}

window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};
window.altspace.utilities.behaviors.Layout = Layout;
