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

  awake(object3d) {
    this._object3d = object3d;
    getController(this._deviceIndex).then((controller) => {
      this._controller = controller;
    })
  }

  update(deltaTime) {
    let controller = this._controller;
    let object3d = this._object3d;

    if(controller) {
      // console.log(this._deviceIndex, controller.steamDeviceIndex, controller.position)
      var {x,y,z} = controller.position;
      object3d.position.set(x,y,z);

      var {x,y,z,w} = controller.rotation;
      object3d.quaternion.set(x,y,z,w);

      object3d.scale.z = 1 + controller.axes[1];
    }
  }
}
