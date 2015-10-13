'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Symbol = require('babel-runtime/core-js/symbol')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

require('babel/polyfill');
var containerMax = _Symbol('containerMax'),
    containerMin = _Symbol('containerMin'),
    object3D = _Symbol('object3D'),
    boundingBox = _Symbol('boundingBox'),
    origMatrix = _Symbol('origMatrix'),
    origMatrixAutoUpdate = _Symbol('origMatrixAutoUpdate'),
    parent = _Symbol('parent');

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

			if (this[object3D].parent instanceof THREE.Scene) {
				// TODO Listen for resize events on the enclosure
				altspace.getEnclosure().then(function (enclosure) {
					var hw = enclosure.innerWidth / 2,
					    hh = enclosure.innerHeight / 2,
					    hd = enclosure.innerDepth / 2;
					_this2[containerMax] = new THREE.Vector3(hw, hh, hd);
					_this2[containerMin] = new THREE.Vector3(-hw, -hh, -hd);
					_this2.doLayout();
				});
			} else {
				this[parent] = this[object3D].parent;

				this[origMatrix] = this[parent].matrix.clone();
				this[origMatrixAutoUpdate] = this[parent].matrixAutoUpdate;

				// We want to use the un-transormed anchor of the parent.
				// Reset the parent matrix so that we can get the original bounding box.
				this[parent].matrixAutoUpdate = false;
				this[parent].matrix.identity();
				var parentGeo = this[parent].geometry;
				if (!parentGeo) {
					throw new Error('Parent must have geometry.');
				}
				parentGeo.computeBoundingBox();
				var parentBoundingBox = parentGeo.boundingBox;
				this[containerMax] = parentBoundingBox.max;
				this[containerMin] = parentBoundingBox.min;
				this.doLayout();
			}
		}
	}]);

	return Layout;
})();

if (!window.altspace) {
	window.altspace = {};
}
if (!window.altspace.utilities) {
	window.altspace.utilities = {};
}
if (!window.altspace.utilities.behaviors) {
	window.altspace.utilities.behaviors = {};
}
window.altspace.utilities.behaviors.Layout = Layout;