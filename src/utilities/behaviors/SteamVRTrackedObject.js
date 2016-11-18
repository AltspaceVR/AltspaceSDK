'use strict';

/**
 * The SteamVRTrackedObject behavior updates an objects position and rotation to
 * match the location of a SteamVR input device.
 *
 * A [SteamVRInput]{@link module:altspace/utilities/behaviors.SteamVRInput} behavior
 * must be on the scene containing this object for it to function properly.
 *
 * @class SteamVRTrackedObject
 *
 * @param {Object} [config]
 * @param {string} [config.hand="first"] the input device to track. Eitehr SteamVRInput.LEFT_CONTROLLER, SteamVRInput.RIGHT_CONTROLLER, or SteamVRInput.FIRST_CONTROLLER
 * @memberof module:altspace/utilities/behaviors
 */

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var SteamVRTrackedObjectBehavior = (function () {
	function SteamVRTrackedObjectBehavior(_ref) {
		var _ref$hand = _ref.hand;
		var hand = _ref$hand === undefined ? 'first' : _ref$hand;

		_classCallCheck(this, SteamVRTrackedObjectBehavior);

		this._hand = hand;
		this.type = 'SteamVRTrackedObject';
	}

	_createClass(SteamVRTrackedObjectBehavior, [{
		key: 'awake',
		value: function awake(object3d, scene) {
			this._object3d = object3d;
			this._scene = scene;

			this._steamVRInput = this._scene.getBehaviorByType('SteamVRInput');
		}
	}, {
		key: 'update',
		value: function update() {
			var controller = this._steamVRInput[this._hand + "Controller"];
			var object3d = this._object3d;

			if (controller) {
				var _controller$position = controller.position;
				var x = _controller$position.x;
				var y = _controller$position.y;
				var z = _controller$position.z;

				object3d.position.set(x, y, z);

				var _controller$rotation = controller.rotation;
				var x = _controller$rotation.x;
				var y = _controller$rotation.y;
				var z = _controller$rotation.z;
				var w = _controller$rotation.w;

				object3d.quaternion.set(x, y, z, w);
			}
		}
	}]);

	return SteamVRTrackedObjectBehavior;
})();

window.altspace.utilities.behaviors.SteamVRTrackedObject = SteamVRTrackedObjectBehavior;