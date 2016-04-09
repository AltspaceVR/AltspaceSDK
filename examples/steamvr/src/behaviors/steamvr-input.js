export const BUTTON_TRIGGER = 0;
export const BUTTON_GRIP = 1;
export const BUTTON_TOUCHPAD = 2;
export const BUTTON_DPAD_UP = 3;
export const BUTTON_DPAD_RIGHT = 4;
export const BUTTON_DPAD_DOWN = 5;
export const BUTTON_DPAD_LEFT = 6;

export const AXIS_TOUCHPAD_X = 0;
export const AXIS_TOUCHPAD_Y = 1;

export const FIRST_CONTROLLER = 'left';
export const LEFT_CONTROLLER = 'left';
export const RIGHT_CONTROLLER = 'right';

// Returns a Promise that resovles when a steamvr controller is found
function getController(deviceIndex) {
  const findGamepad = (resolve, reject) => {
    const gamepad = altspace.getGamepads().find((g) => g.mapping === 'steamvr' && g.steamDeviceIndex === deviceIndex);
    if (gamepad) {
      console.log("Controller found", gamepad);
      resolve(gamepad);
    } else {
      console.log("Controller not found trying again");
      setTimeout(findGamepad, 500, resolve, reject);
    }
  };

  return new Promise(findGamepad);
}

export default class SteamVRInputBehavior {
  constructor() {
    this.type = 'SteamVRInput';
  }

  awake() {
    this.anyControllerAvailable = Promise.race([
      getController(LEFT_CONTROLLER).then((controller) => {
        this.leftController = controller;
      }),
      getController(RIGHT_CONTROLLER).then((controller) => {
        this.rightController = controller;
      }),
    ]).then((controller) => {
      this.firstController = controller;

      const blockedAxes = controller.axes.map(() => false);
      const blockedButtons = controller.buttons.map(() => false);

      blockedButtons[BUTTON_TRIGGER] = true;
      blockedButtons[BUTTON_TOUCHPAD] = true;

      controller.preventDefault(blockedAxes, blockedButtons);
    });
  }
}
