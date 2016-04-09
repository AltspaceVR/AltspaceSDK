export default class SteamVRTrackedObjectBehavior {
  constructor({ device = 'first' }) {
    this._deviceIndex = device;
  }

  awake(object3d, scene) {
    this._object3d = object3d;
    this._scene = scene;

    this._steamVRInput = this._scene.getBehaviorByType('SteamVRInput');
  }

  update() {
    const controller = this._steamVRInput[this._deviceIndex + "Controller"];
    const object3d = this._object3d;

    if (controller) {
      var { x, y, z } = controller.position;
      object3d.position.set(x, y, z);

      var { x, y, z, w } = controller.rotation;
      object3d.quaternion.set(x, y, z, w);
    }
  }
}
