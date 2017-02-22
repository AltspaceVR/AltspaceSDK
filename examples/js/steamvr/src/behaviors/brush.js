import altspace from 'altspace';
const SteamVRInputBehavior = altspace.utilities.behaviors.SteamVRInput;

const BRUSH_SIZE = 0.3; // in meters

// Returns a function that returns true only if the value passed in is true, and was previously false
const createPressHelper = () => {
	var prevVal = false;
	return (val) => {
		const ret = val && !prevVal;
		prevVal = !!val;
		return ret;
	}
}

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

		this._triggerPressed = createPressHelper();
		this._gripPressed = createPressHelper();
	}

	spawnObject(position, rotation, scale) {
		this._sceneSync.instantiate('clone', {
			position: position,
			rotation: rotation,
			scale: {
				x: scale.x,
				y: scale.y,
				z: scale.z,
			},
		}, true);
	}

	clearAllMyObjects() {
		const myObjects = [];
		this._scene.traverse((obj) => {
			const o = obj.getBehaviorByType('Object3DSync');
			if(o && o.isMine){
				myObjects.push(obj)
			}
		});
		myObjects.forEach((obj) => this._sceneSync.destroy(obj));
	}

	update() {
		const controller = this._steamVRInput[this._hand + "Controller"];
		const object3d = this._object3d;

		if (controller) {
			// these will be true only on the first frame the button is pressed down.
			const triggerPressed = this._triggerPressed(controller.buttons[SteamVRInputBehavior.BUTTON_TRIGGER].pressed);
			const gripPressed = this._gripPressed(controller.buttons[SteamVRInputBehavior.BUTTON_GRIP].pressed);

			const s = BRUSH_SIZE/10 * this._pixelsPerMeter + controller.axes[SteamVRInputBehavior.AXIS_TOUCHPAD_Y];
			object3d.scale.set(s, s, s);

			if (triggerPressed) {
				this.spawnObject(controller.position, controller.rotation, object3d.scale);
			}

			if (gripPressed) {
				this.clearAllMyObjects()
			}
		}
	}
}
