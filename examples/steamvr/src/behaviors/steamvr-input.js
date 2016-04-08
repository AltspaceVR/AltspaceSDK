// Returns a Promise that resovles when a steamvr controller is found
function getController(deviceIndex) {
    const findGamepad = (resolve, reject) => {
      const gamepad = altspace.getGamepads().find((g) => g.mapping === 'steamvr' && g.steamDeviceIndex === deviceIndex)
      if(gamepad) {
        console.log("Controller found", gamepad);
        resolve(gamepad)
      } else {
        console.log("Controller not found trying again");
        setTimeout(findGamepad, 500, resolve, reject);
      }
    }

    return new Promise(findGamepad);
}

export default class SteamVRInputBehavior {
  static LEFT_CONTROLLER = "left";
  static RIGHT_CONTROLLER = "right";

  constructor({device}) {
    this._deviceIndex = device;
  }

  awake(object3d, scene) {
    this._object3d = object3d;
    this._scene = scene;
    getController(this._deviceIndex).then((controller) => {
      controller.preventDefault([],[true])
      this._controller = controller;
    })
  }

  update(deltaTime) {
    let controller = this._controller;
    let object3d = this._object3d;

    if(controller) {
      var {x,y,z} = controller.position;
      object3d.position.set(x,y,z);

      var {x,y,z,w} = controller.rotation;
      object3d.quaternion.set(x,y,z,w);

      object3d.scale.z = 1 + controller.axes[1];

      let triggerDown = controller.buttons[0].pressed;
      if(!triggerDown && this._prevTriggerDown) {  // trigger was pressed
        var sceneSync = this._scene.getBehaviorByType('SceneSync');
        try {
          sceneSync.instantiate('cube', {
            color: this._deviceIndex === SteamVRInputBehavior.LEFT_CONTROLLER ? '#ff0000' : '#0000ff',
            position: controller.position,
            rotation: controller.rotation,
            size: 1 + controller.axes[1]
          }, true);
        } catch(e) {}
      }
      this._prevTriggerDown = triggerDown;

    }
  }
}
