import * as SteamVR from './steamvr-input.js';

export default class BrushBehavior {
  constructor({ hand }) {
    this._hand = hand;
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
      const s = 1 + controller.axes[SteamVR.AXIS_TOUCHPAD_Y];
      object3d.scale.set(s, s, s);

      const triggerDown = controller.buttons[SteamVR.BUTTON_TRIGGER].pressed;
      if (!triggerDown && this._prevTriggerDown) {  // trigger was pressed
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
