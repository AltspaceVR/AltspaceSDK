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

class SteamVRTrackedObjectBehavior {
	constructor({ hand = 'first' }) {
		this._hand = hand;
		this.type = 'SteamVRTrackedObject';
	}

	awake(object3d, scene) {
		this._object3d = object3d;
		this._scene = scene;

		this._steamVRInput = this._scene.getBehaviorByType('SteamVRInput');
	}

	update() {
		const controller = this._steamVRInput[this._hand + "Controller"];
		const object3d = this._object3d;

		if (controller) {
			var { x, y, z } = controller.position;
			object3d.position.set(x, y, z);

			var { x, y, z, w } = controller.rotation;
			object3d.quaternion.set(x, y, z, w);
		}
	}
}

window.altspace.utilities.behaviors.SteamVRTrackedObject = SteamVRTrackedObjectBehavior;
