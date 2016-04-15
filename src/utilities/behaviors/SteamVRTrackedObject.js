'use strict';

class SteamVRTrackedObjectBehavior {
	constructor({ hand = 'first' }) {
		this._hand = hand;
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
