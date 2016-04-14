export const BUTTON_TRIGGER = 0;
export const BUTTON_GRIP = 1;
export const BUTTON_TOUCHPAD = 2;
export const BUTTON_DPAD_UP = 3;
export const BUTTON_DPAD_RIGHT = 4;
export const BUTTON_DPAD_DOWN = 5;
export const BUTTON_DPAD_LEFT = 6;

export const AXIS_TOUCHPAD_X = 0;
export const AXIS_TOUCHPAD_Y = 1;

export const FIRST_CONTROLLER = 'first';
export const LEFT_CONTROLLER = 'left';
export const RIGHT_CONTROLLER = 'right';

// Returns a Promise that resovles when a steamvr controller is found
function getController(hand) {
  const findGamepad = (resolve, reject) => {
    const gamepad = altspace.getGamepads().find((g) => g.mapping === 'steamvr' && g.hand === hand);
    if (gamepad) {
      console.log("SteamVR input device found", gamepad);
      resolve(gamepad);
    } else {
      console.log("SteamVR input device not found trying again in 500ms...");
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
    this.leftControllerPromise = getController(LEFT_CONTROLLER);
    this.rightControllerPromise = getController(RIGHT_CONTROLLER);
    this.firstControllerPromise = Promise.race([
      this.leftControllerPromise,
      this.rightControllerPromise,
    ]);

    this.leftControllerPromise.then((controller) => {
      this.leftController = controller;
    });
    this.rightControllerPromise.then((controller) => {
      this.rightController = controller;
    });
    this.firstControllerPromise.then((controller) => {
      this.firstController = controller;

      const blockedAxes = controller.axes.map(() => false);
      const blockedButtons = controller.buttons.map(() => false);

      blockedButtons[BUTTON_TRIGGER] = true;
      blockedButtons[BUTTON_TOUCHPAD] = true;

      controller.preventDefault(blockedAxes, blockedButtons);
    });
  }
}
