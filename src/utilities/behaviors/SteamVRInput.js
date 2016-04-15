'use strict';

// Returns a Promise that resovles static when a steamvr controller is found
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

class SteamVRInputBehavior {
	constructor() {
		this.type = 'SteamVRInput';
	}

	awake() {
		this.leftControllerPromise = getController(SteamVRInputBehavior.LEFT_CONTROLLER);
		this.rightControllerPromise = getController(SteamVRInputBehavior.RIGHT_CONTROLLER);
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

			blockedButtons[SteamVRInputBehavior.BUTTON_TRIGGER] = true;
			blockedButtons[SteamVRInputBehavior.BUTTON_TOUCHPAD] = true;

			controller.preventDefault(blockedAxes, blockedButtons);
		});
	}
}

SteamVRInputBehavior.BUTTON_TRIGGER = 0;
SteamVRInputBehavior.BUTTON_GRIP = 1;
SteamVRInputBehavior.BUTTON_TOUCHPAD = 2;
SteamVRInputBehavior.BUTTON_DPAD_UP = 3;
SteamVRInputBehavior.BUTTON_DPAD_RIGHT = 4;
SteamVRInputBehavior.BUTTON_DPAD_DOWN = 5;
SteamVRInputBehavior.BUTTON_DPAD_LEFT = 6;

SteamVRInputBehavior.AXIS_TOUCHPAD_X = 0;
SteamVRInputBehavior.AXIS_TOUCHPAD_Y = 1;

SteamVRInputBehavior.FIRST_CONTROLLER = 'first';
SteamVRInputBehavior.LEFT_CONTROLLER = 'left';
SteamVRInputBehavior.RIGHT_CONTROLLER = 'right';

window.altspace.utilities.behaviors.SteamVRInput = SteamVRInputBehavior;
