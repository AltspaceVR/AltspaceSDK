'use strict';

// Returns a Promise that resovles static when a steamvr controller is found
function getController(hand, config) {
	const findGamepad = (resolve, reject) => {
		const gamepad = altspace.getGamepads().find((g) => g.mapping === 'steamvr' && g.hand === hand);
		if (gamepad) {
			if(config.logging) console.log("SteamVR input device found", gamepad);
			resolve(gamepad);
		} else {
			if(config.logging) console.log("SteamVR input device not found trying again in 500ms...");
			setTimeout(findGamepad, 500, resolve, reject);
		}
	};

	return new Promise(findGamepad);
}

/**
 * The SteamVRInput behavior manages SteamVR input devices. It should be added
 * to the ThreeJS scene and is required to use [SteamVRTrackedObject]{@link module:altspace/utilities/behaviors.SteamVRTrackedObject}
 *
 * @class SteamVRInput
 * @param {Object} [config]
 * @param {Boolean} [config.logging=false] Display console log output during SteamVR input device detection
 * @memberof module:altspace/utilities/behaviors
 *
 * @prop {Gamepad} leftController the left SteamVR [Gamepad]{@link module:altspace~Gamepad} or undefined if one has not yet been found
 * @prop {Gamepad} rightController the right SteamVR [Gamepad]{@link module:altspace~Gamepad} or undefined if one has not yet been found
 * @prop {Gamepad} firstController the first SteamVR [Gamepad]{@link module:altspace~Gamepad}  or undefined if none have yet been found
 *
 * @prop {Promise} leftControllerPromise a promise that resolves once the left SteamVR input device is found
 * @prop {Promise} rightControllerPromise a promise that resolves once the right SteamVR input device is found
 * @prop {Promise} firstControllerPromise a promise that resolves once any SteamVR input device is found
 */
class SteamVRInputBehavior {
	constructor(config) {
		this.type = 'SteamVRInput';
		this.config = config || {};
		this.config.logging = this.config.logging || false;
	}

	awake() {
		this.leftControllerPromise = getController(SteamVRInputBehavior.LEFT_CONTROLLER, this.config);
		this.rightControllerPromise = getController(SteamVRInputBehavior.RIGHT_CONTROLLER, this.config);
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
