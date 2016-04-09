import * as SteamVR from './steamvr-input.js';

export default class BrushBehavior {
  constructor({ device }) {
    this._deviceIndex = device;
  }

  awake(object3d, scene) {
    this._object3d = object3d;
    this._scene = scene;

    this._steamVRInput = this._scene.getBehaviorByType('SteamVRInput');
    this._sceneSync = this._scene.getBehaviorByType('SceneSync');
  }

  update() {
    const controller = this._steamVRInput[this._deviceIndex + "Controller"];
    const object3d = this._object3d;

    if (controller) {
      object3d.scale.z = 1 + controller.axes[SteamVR.AXIS_TOUCHPAD_Y];

      const triggerDown = controller.buttons[SteamVR.BUTTON_TRIGGER].pressed;
      if (!triggerDown && this._prevTriggerDown) {  // trigger was pressed
        try {
          this._sceneSync.instantiate('cube', {
            color: this._deviceIndex === SteamVR.LEFT_CONTROLLER ? '#ff0000' : '#0000ff',
            position: controller.position,
            rotation: controller.rotation,
            size: 1 + controller.axes[1],
          }, true);
        } catch (e) {
          console.error(e);
        }
      }
      this._prevTriggerDown = triggerDown;
    }
  }
}
