if (!window.altspace) { window.altspace = {}; }
if (!window.altspace.utilities) { window.altspace.utilities = {}; }
if (!window.altspace.utilities.behaviors) { window.altspace.utilities.behaviors = {}; }

require('babel/polyfill');
let
	containerMax = Symbol('containerMax'),
	containerMin = Symbol('containerMin'),
	object3D = Symbol('object3D'),
	boundingBox = Symbol('boundingBox'),
	origMatrix = Symbol('origMatrix'),
	origMatrixAutoUpdate = Symbol('origMatrixAutoUpdate'),
	parent = Symbol('parent'),
	enclosure = Symbol('enclosure'),
	origParentBoundingBoxes = new Map();

/**
 * The Layout behavior allows you to position objects easily. You can 
 * position an object relative to its parent (either the Scene or a 
 * another object) by using a position specifier for each of the axes.
 * The position specifier can be one of 'min', 'center' or 'max'. The default
 * specifier is 'center'. You can also add a modifier to the position in pixels
 * ('min+5'), a percentage ('min+10%') or meters ('min+1m'). Finally, you can 
 * choose the location of the anchor on the object you are trying to position 
 * by using the 'my' parameter.
 * You must specify at least one axis on the 'at' parameter.
 *
 * @example
 * // Position the top of the cube at 1.5 meters above the bottom of its parent.
 * cube.addBehavior(new altpsace.utilities.behaviors.Layout({
 *	   my: {y: 'max'}, 
 *	   at: {y: 'min+1.5m'}
 * });
 *
 * @class Layout
 * @memberof module:altspace/utilities/behaviors
 * @param {Object} config
 * @param {Object} config.at An object containing the axes and position 
 *  specifiers. At least one axis must be specificed. E.g. `{x: 'min', y: 'max-5%'}`
 * @param {Object} [config.my] An object containing the axes and position
 *  specifiers for the layout anchor.
 **/
class Layout {

	constructor ({ my = {}, at }) {
		this.my = my;
		this.at = at;
		this.type = 'Layout';
	}

	// TODO-BP Ideally these would be private methods.
	getAxisSettings (axis, axisValue, min, max) {
		axisValue = axisValue || 'center';
		axisValue = /(\w+)([-+].+)?/.exec(axisValue);
		let position = axisValue[1];
		let offsetSetting = axisValue[2];
		let offset = parseFloat(offsetSetting) || 0;
		if (offsetSetting && offsetSetting.endsWith('%')) {
			offset = offset / 100 * (max[axis] - min[axis]);
		}
		else if (offsetSetting && offsetSetting.endsWith('m')) {
			console.log(offset, this[enclosure]);
			offset = offset * this[enclosure].pixelsPerMeter;
			console.log(offset);
		}
		return {
			position,
			offset
		}
	}

	getAnchorOffset (axis, axisValue) {
		let max = this[boundingBox].max;
		let min = this[boundingBox].min;
		let {position, offset} = this.getAxisSettings(
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
	}

	doLayout () {
		Array.from('xyz').forEach((axis) => {
			let {position, offset} = this.getAxisSettings(
				axis, this.at[axis], this[containerMin], this[containerMax]);
			let anchorOffset = this.getAnchorOffset(axis, this.my[axis]);
			if (position === 'max') {
				this[object3D].position[axis] = this[containerMax][axis] + offset + anchorOffset;
			}
			else if (position === 'min') {
				this[object3D].position[axis] = this[containerMin][axis] + offset + anchorOffset;
			}
			else if (position === 'center') {
				this[object3D].position[axis] = offset + anchorOffset;
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
		this[boundingBox] = new THREE.Box3().setFromObject(this[object3D]);

		// TODO Listen for resize events on the enclosure
		altspace.getEnclosure().then((_enclosure) => {
			this[enclosure] = _enclosure;
			if (this[object3D].parent instanceof THREE.Scene) {
				let 
					hw = this[enclosure].innerWidth / 2,
					hh = this[enclosure].innerHeight / 2,
					hd = this[enclosure].innerDepth / 2;
				this[containerMax] = new THREE.Vector3(hw, hh, hd);
				this[containerMin] = new THREE.Vector3(-hw, -hh, -hd);
				this.doLayout();
			}
			else {
				let objWorldScale = this[object3D].getWorldScale();
				this[boundingBox].min.divide(objWorldScale);
				this[boundingBox].max.divide(objWorldScale);

				this[parent] = this[object3D].parent;

				this[origMatrix] = this[parent].matrix.clone();
				this[origMatrixAutoUpdate] = this[parent].matrixAutoUpdate;

				// We want to use the un-transormed anchor of the parent.
				// Reset the parent matrix so that we can get the original bounding box.
				this[parent].matrixAutoUpdate = false;
				this[parent].matrix.identity();

				let parentBoundingBox;
				if (origParentBoundingBoxes.has(this[parent].uuid)) {
					parentBoundingBox = origParentBoundingBoxes.get(this[parent].uuid);
				}
				else {
					this[parent].remove(this[object3D]);
					parentBoundingBox = new THREE.Box3().setFromObject(this[parent]);
					this[parent].add(this[object3D]);
					origParentBoundingBoxes.set(this[parent].uuid, parentBoundingBox);
				}

				this[containerMax] = parentBoundingBox.max;
				this[containerMin] = parentBoundingBox.min;
				this.doLayout();
			}
		});
	}
}
window.altspace.utilities.behaviors.Layout = Layout;
