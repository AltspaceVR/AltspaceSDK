'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Symbol = require('babel-runtime/core-js/symbol')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

if (!window.altspace) {
	window.altspace = {};
}
if (!window.altspace.utilities) {
	window.altspace.utilities = {};
}
if (!window.altspace.utilities.behaviors) {
	window.altspace.utilities.behaviors = {};
}

require('babel/polyfill');
var containerMax = _Symbol('containerMax'),
    containerMin = _Symbol('containerMin'),
    object3D = _Symbol('object3D'),
    boundingBox = _Symbol('boundingBox'),
    origMatrix = _Symbol('origMatrix'),
    origMatrixAutoUpdate = _Symbol('origMatrixAutoUpdate'),
    parent = _Symbol('parent'),
    enclosure = _Symbol('enclosure'),
    origParentBoundingBoxes = new _Map();

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
 *  specifiers. At least one axis must be specified. E.g. `{x: 'min', y: 'max-5%'}`
 * @param {Object} [config.my] An object containing the axes and position
 *  specifiers for the layout anchor.
 **/

var Layout = (function () {
	function Layout(_ref) {
		var _ref$my = _ref.my;
		var my = _ref$my === undefined ? {} : _ref$my;
		var at = _ref.at;

		_classCallCheck(this, Layout);

		this.my = my;
		this.at = at;
	}

	// TODO-BP Ideally these would be private methods.

	_createClass(Layout, [{
		key: 'getAxisSettings',
		value: function getAxisSettings(axis, axisValue, min, max) {
			axisValue = axisValue || 'center';
			axisValue = /(\w+)([-+].+)?/.exec(axisValue);
			var position = axisValue[1];
			var offsetSetting = axisValue[2];
			var offset = parseFloat(offsetSetting) || 0;
			if (offsetSetting && offsetSetting.endsWith('%')) {
				offset = offset / 100 * (max[axis] - min[axis]);
			} else if (offsetSetting && offsetSetting.endsWith('m')) {
				console.log(offset, this[enclosure]);
				offset = offset * this[enclosure].pixelsPerMeter;
				console.log(offset);
			}
			return {
				position: position,
				offset: offset
			};
		}
	}, {
		key: 'getAnchorOffset',
		value: function getAnchorOffset(axis, axisValue) {
			var max = this[boundingBox].max;
			var min = this[boundingBox].min;

			var _getAxisSettings = this.getAxisSettings(axis, axisValue, min, max);

			var position = _getAxisSettings.position;
			var offset = _getAxisSettings.offset;

			if (position === 'max') {
				return -max[axis] + offset;
			} else if (position === 'min') {
				return -min[axis] + offset;
			} else if (position === 'center') {
				return offset;
			} else {
				throw new Error(axisValue + ' is an invalid layout position for ' + axis);
			}
		}
	}, {
		key: 'doLayout',
		value: function doLayout() {
			var _this = this;

			_Array$from('xyz').forEach(function (axis) {
				var _getAxisSettings2 = _this.getAxisSettings(axis, _this.at[axis], _this[containerMin], _this[containerMax]);

				var position = _getAxisSettings2.position;
				var offset = _getAxisSettings2.offset;

				var anchorOffset = _this.getAnchorOffset(axis, _this.my[axis]);
				if (position === 'max') {
					_this[object3D].position[axis] = _this[containerMax][axis] + offset + anchorOffset;
				} else if (position === 'min') {
					_this[object3D].position[axis] = _this[containerMin][axis] + offset + anchorOffset;
				} else if (position === 'center') {
					_this[object3D].position[axis] = offset + anchorOffset;
				} else {
					throw new Error(_this.at[axis] + ' is an invalid layout position for ' + axis);
				}
			});

			if (this[parent]) {
				// Restore the original parent transform
				this[parent].matrix = this[origMatrix];
				this[parent].updateMatrixWorld(true);
				this[parent].matrixAutoUpdate = this[origMatrixAutoUpdate];
			}
		}
	}, {
		key: 'awake',
		value: function awake(_object3D) {
			var _this2 = this;

			this[object3D] = _object3D;
			this[boundingBox] = new THREE.Box3().setFromObject(this[object3D]);

			// TODO Listen for resize events on the enclosure
			altspace.getEnclosure().then(function (_enclosure) {
				_this2[enclosure] = _enclosure;
				if (_this2[object3D].parent instanceof THREE.Scene) {
					var hw = _this2[enclosure].innerWidth / 2,
					    hh = _this2[enclosure].innerHeight / 2,
					    hd = _this2[enclosure].innerDepth / 2;
					_this2[containerMax] = new THREE.Vector3(hw, hh, hd);
					_this2[containerMin] = new THREE.Vector3(-hw, -hh, -hd);
					_this2.doLayout();
				} else {
					var objWorldScale = _this2[object3D].getWorldScale();
					_this2[boundingBox].min.divide(objWorldScale);
					_this2[boundingBox].max.divide(objWorldScale);

					_this2[parent] = _this2[object3D].parent;

					_this2[origMatrix] = _this2[parent].matrix.clone();
					_this2[origMatrixAutoUpdate] = _this2[parent].matrixAutoUpdate;

					// We want to use the un-transormed anchor of the parent.
					// Reset the parent matrix so that we can get the original bounding box.
					_this2[parent].matrixAutoUpdate = false;
					_this2[parent].matrix.identity();

					var parentBoundingBox = undefined;
					if (origParentBoundingBoxes.has(_this2[parent].uuid)) {
						parentBoundingBox = origParentBoundingBoxes.get(_this2[parent].uuid);
					} else {
						_this2[parent].remove(_this2[object3D]);
						parentBoundingBox = new THREE.Box3().setFromObject(_this2[parent]);
						_this2[parent].add(_this2[object3D]);
						origParentBoundingBoxes.set(_this2[parent].uuid, parentBoundingBox);
					}

					_this2[containerMax] = parentBoundingBox.max;
					_this2[containerMin] = parentBoundingBox.min;
					_this2.doLayout();
				}
			});
		}
	}]);

	return Layout;
})();

window.altspace.utilities.behaviors.Layout = Layout;