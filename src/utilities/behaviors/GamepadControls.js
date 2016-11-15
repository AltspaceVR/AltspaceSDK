/**
 * @module altspace/utilities/behaviors
 */
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * Allows an object to be moved, rotated, and scaled using a gamepad controller.
 * Left stick left / right and up / down moves object in the X-Y plane.
 * Clicking left stick enters left alt mode, where movement is in X-Z plane.
 * Clicking left stick again exits left alt mode.
 * Right stick left / right rotates object clockwise / counterclockwise (y axis).
 * Right stick up / down rotates object away forwards / backwards (x axis).
 * Clicking right stick enters right alt mode, where left / right tumbles object (z axis).
 * Clicking right stick again exits right alt mode.
 * D-pad up / down scales object.
 * Back / reset button resets object to its original position and rotation.
 *
 * @param {Boolean} [config.position=true] Whether object's position can be changed.
 * @param {Boolean} [config.rotation=true] Whether object's rotation can be changed.
 * @param {Boolean} [config.scale=true] Whether object's scale can be changed.
 *
 * @class GamepadControls
 * @memberof module:altspace/utilities/behaviors
 **/
altspace.utilities.behaviors.GamepadControls = function (config) {
	var object3d;
	var gamepad;
	var scene;
	var sync;

	var isAltModeR= false;
	var isAltModeL= false;
	var prevAltButtonR = false;
	var prevAltButtonL = false;
	var isInitialized = false;

	var originalObj;//used to reset
	var tolerance = 0.2;//ignore stick dead zone

	config = config || {};
	if (config.position === undefined) config.position = true;
	if (config.rotation === undefined) config.rotation = true;
	if (config.scale === undefined) config.scale = true;

	function awake(o, s) {

		object3d = o;
		scene = s;
		sync = object3d.getBehaviorByType('Object3DSync');
		originalObj = object3d.clone();
		gamepad = getGamepad();
		if (gamepad) {
			console.log('Gamepad detected: ' + gamepad.id);
		} else {
			var intervalID = setInterval(function() {
				gamepad = getGamepad();
				if (gamepad) {
					console.log('Gamepad connected: ' + gamepad.id);
					clearInterval(intervalID);
				}
			}, 500);
		}

		scene.addEventListener('cursordown', function(e) {
			//preventDefault only works when app has focus, so call after initial click
			if (gamepad && !isInitialized) {
				preventDefault(gamepad);
				isInitialized = true;
			}
		});

	}

	function getGamepad() {
		if (altspace && altspace.inClient) {
			gamepads = altspace.getGamepads();
		} else {
			//Gamepad API works in Chrome and Firefox browsers only
			//https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API
			gamepads = navigator.getGamepads();
		}
		if (gamepads.length > 0) {
			for (var i=0; i < gamepads.length; i++) {
				var g = gamepads[i];
				if (g && g.axes  && g.axes.length === 4 && g.buttons && g.buttons.length === 16) {
					if (altspace && altspace.inClient) preventDefault(g);
					return g;//return first valid gamepad
				}
			}
		}
		return undefined;
	}

	function preventDefault(g) {
		var axes = [];
		var buttons = [];
		for (var i=0; i > g.buttons; i++) buttons[i] = false;
		for (var i=0; i > g.axes; i++) axes[i] = false;
		if (config.position) {
			axes[0] = true;
			axes[1] = true;
			buttons[10] = true;
		}
		if (config.rotation) {
			axes[2] = true;
			axes[3] = true;
			buttons[11] = true;
		}
		if (config.scale) {
			buttons[12] = true;
			buttons[13] = true;
		}
		buttons[8] = true;
		g.preventDefault(axes, buttons);
	}

	function update(deltaTime) {
		if ((!altspace || !altspace.inClient) && window.chrome && gamepad) {
			gamepad = getGamepad();//On Chrome, need to poll for updates.
		}
		if (!gamepad) return;

		//For axis and button numbers see: https://w3c.github.io/gamepad/
		var isResetButton = gamepad.buttons[8].pressed;//reset / back button
		if (isResetButton) {
			if (!sync.isMine) sync.takeOwnership();
			object3d.position.copy(originalObj.position);
			object3d.rotation.copy(originalObj.rotation);
			object3d.scale.copy(originalObj.scale);
			return;
		}

		if (config.position) {
			var isAltButtonL = gamepad.buttons[10].pressed;//left stick button
			if (prevAltButtonL && !isAltButtonL) isAltModeL = !isAltModeL;//button released
			prevAltButtonL = isAltButtonL;

			var leftStickX = gamepad.axes[0];//left / right
			var leftStickY = gamepad.axes[1];//up / down

			var isMove = Math.abs(leftStickX) > tolerance || Math.abs(leftStickY) > tolerance;
			if (isMove && !sync.isMine) sync.takeOwnership();

			var moveDistance = 200 * (deltaTime/1000);// 200 units per second
			if (!isAltModeL && Math.abs(leftStickX) > tolerance) {
				object3d.position.x += moveDistance * leftStickX;
			}
			if (!isAltModeL && Math.abs(leftStickY) > tolerance) {
				object3d.position.z += moveDistance * leftStickY;
			}
			if (isAltModeL && Math.abs(leftStickX) > tolerance) {
				object3d.position.x += moveDistance * leftStickX;
			}
			if (isAltModeL && Math.abs(leftStickY) > tolerance) {
				object3d.position.y += moveDistance * -leftStickY;
			}
		}

		if (config.rotation) {
			var isAltButtonR = gamepad.buttons[11].pressed;//right stick button
			if (prevAltButtonR && !isAltButtonR) isAltModeR = !isAltModeR;//button released
			prevAltButtonR = isAltButtonR;

			var rightStickX = gamepad.axes[2];//left / right
			var rightStickY = gamepad.axes[3];//up / down

			var isRotate = Math.abs(rightStickX) > tolerance || Math.abs(rightStickY) > tolerance;
			if (isRotate && !sync.isMine) sync.takeOwnership();

			var rotateAngle = Math.PI * (deltaTime/1000);// 180 degrees per second
			if (!isAltModeR && Math.abs(rightStickX) > tolerance) {
				object3d.rotation.y += rotateAngle * rightStickX;
			}
			if (!isAltModeR && Math.abs(rightStickY) > tolerance) {
				object3d.rotation.x += rotateAngle * rightStickY;
			}
			if (isAltModeR && Math.abs(rightStickX) > tolerance) {
				object3d.rotation.z += rotateAngle * -rightStickX;
			}
		}

		if (config.scale) {
			var scaleChange = 10 * (deltaTime/1000);// 10 units per second
			var dpadUp = gamepad.buttons[12].pressed;//d-pad up
			var dpadDown = gamepad.buttons[13].pressed;//d-pad down

			var isScale = gamepad.buttons[12].pressed || gamepad.buttons[13].pressed;
			if (isScale && !sync.isMine) sync.takeOwnership();

			var prev = object3d.scale;
			var v3 = new THREE.Vector3(1, 1, 1);
			v3.multiplyScalar(scaleChange);
			if (dpadUp) object3d.scale.add(v3);
			if (dpadDown) {
				if (prev.x > v3.x && prev.y > v3.y && prev.z > v3.z) {//Don't go negative.
					object3d.scale.sub(v3);
				}
			}
		}

	}

	return { awake: awake, update: update };
};

