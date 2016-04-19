import altspace from 'altspace';
const SteamVRInputBehavior = altspace.utilities.behaviors.SteamVRInput;

const BRUSH_SIZE = 0.3; // in meters

export default class BrushBehavior {
	constructor({ hand }) {
		this._hand = hand;
		this._pixelsPerMeter = 0;
		altspace.getEnclosure().then((enclosure) => {
			this._pixelsPerMeter = enclosure.pixelsPerMeter;
			const s = BRUSH_SIZE/10 * this._pixelsPerMeter;
			this._object3d.scale.set(s, s, s);
		});
	}

	awake(object3d, scene) {
		this._object3d = object3d;
		this._scene = scene;

		this._steamVRInput = this._scene.getBehaviorByType('SteamVRInput');
		this._sceneSync = this._scene.getBehaviorByType('SceneSync');
	}

	update() {
		const controller = this._steamVRInput[this._hand + "Controller"];
		const object3d = this._object3d;

		if (controller) {
			const s = BRUSH_SIZE/10 * this._pixelsPerMeter + controller.axes[SteamVRInputBehavior.AXIS_TOUCHPAD_Y];
			object3d.scale.set(s, s, s);

			const triggerDown = controller.buttons[SteamVRInputBehavior.BUTTON_TRIGGER].pressed;
			if (!triggerDown && this._prevTriggerDown) {	// trigger was pressed
				try {
					this._sceneSync.instantiate('clone', {
						position: controller.position,
						rotation: controller.rotation,
						scale: {
							x: object3d.scale.x,
							y: object3d.scale.y,
							z: object3d.scale.z,
						},
					}, true);
				} catch (e) {
					console.error(e);
				}
			}
			this._prevTriggerDown = triggerDown;
		}
	}
}
