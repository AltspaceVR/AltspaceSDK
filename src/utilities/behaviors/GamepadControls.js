'use strict';

import Behavior from './Behavior';

// ignore stick dead zone
let tolerance = 0.2;

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
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
**/

class GamepadControls extends Behavior
{
	get type(){ return 'GamepadControls'; }

	constructor(config)
	{
		this.config = Object.assign(
			{position: true, rotation: true, scale: true},
			config
		);

		this.object3d = null;
		this.gamepad = null;
		this.scene = null;
		this.sync = null;

		this.isAltModeR = false;
		this.isAltModeL = false;
		this.prevAltButtonR = false;
		this.prevAltButtonL = false;
		this.isInitialized = false;

		this.originalObj = null;//used to reset
	}

	awake(o, s)
	{
		this.object3d = o;
		this.scene = s;
		this.sync = this.object3d.getBehaviorByType('Object3DSync');
		this.originalObj = this.object3d.clone();
		this.gamepad = this.getGamepad();
		if (this.gamepad) {
			console.log('Gamepad detected: ' + this.gamepad.id);
		} else {
			let intervalID = setInterval((() => {
				this.gamepad = this.getGamepad();
				if (this.gamepad) {
					console.log('Gamepad connected: ' + this.gamepad.id);
					clearInterval(intervalID);
				}
			}).bind(this), 500);
		}

		this.scene.addEventListener('cursordown', (e => {
			//preventDefault only works when app has focus, so call after initial click
			if (this.gamepad && !this.isInitialized) {
				this.preventDefault(this.gamepad);
				this.isInitialized = true;
			}
		}).bind(this));

	}

	// utility function to fetch correct type of gamepad
	getGamepad()
	{
		let gamepads = [];
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
					if (altspace && altspace.inClient) this.preventDefault(g);
					return g;//return first valid gamepad
				}
			}
		}
		return undefined;
	}

	preventDefault(g)
	{
		let axes = (new Array(4)).fill(false);
		let buttons = (new Array(16)).fill(false);
		if (this.config.position) {
			axes[0] = true;
			axes[1] = true;
			buttons[10] = true;
		}
		if (this.config.rotation) {
			axes[2] = true;
			axes[3] = true;
			buttons[11] = true;
		}
		if (this.config.scale) {
			buttons[12] = true;
			buttons[13] = true;
		}
		buttons[8] = true;
		g.preventDefault(axes, buttons);
	}

	update(deltaTime)
	{
		if ((!altspace || !altspace.inClient) && window.chrome && this.gamepad) {
			this.gamepad = this.getGamepad();//On Chrome, need to poll for updates.
		}
		if (!this.gamepad)
			return;

		//For axis and button numbers see: https://w3c.github.io/gamepad/
		let isResetButton = this.gamepad.buttons[8].pressed;//reset / back button
		if (isResetButton)
		{
			if (!this.sync.isMine)
				this.sync.takeOwnership();
			this.object3d.position.copy(this.originalObj.position);
			this.object3d.rotation.copy(this.originalObj.rotation);
			this.object3d.scale.copy(this.originalObj.scale);
			return;
		}

		if (this.config.position)
		{
			let isAltButtonL = this.gamepad.buttons[10].pressed;//left stick button
			if (this.prevAltButtonL && !isAltButtonL)
				this.isAltModeL = !this.isAltModeL;//button released
			this.prevAltButtonL = isAltButtonL;

			let leftStickX = this.gamepad.axes[0];//left / right
			let leftStickY = this.gamepad.axes[1];//up / down

			let isMove = Math.abs(leftStickX) > tolerance || Math.abs(leftStickY) > tolerance;
			if (isMove && !this.sync.isMine)
				this.sync.takeOwnership();

			let moveDistance = 200 * (deltaTime/1000);// 200 units per second

			// left stick X always controls X movement
			if (Math.abs(leftStickX) > tolerance){
				this.object3d.position.x += moveDistance * leftStickX;
			}

			// left stick Y controls Z movement in normal mode, Y movement in alt mode
			if(Math.abs(leftStickY) > tolerance)
			{
				if (this.isAltModeL){
					this.object3d.position.y += moveDistance * -leftStickY;
				}
				else {
					this.object3d.position.z += moveDistance * leftStickY;
				}
			}
		}

		if (this.config.rotation)
		{
			let isAltButtonR = this.gamepad.buttons[11].pressed;//right stick button
			if (this.prevAltButtonR && !isAltButtonR)
				this.isAltModeR = !this.isAltModeR;//button released
			this.prevAltButtonR = isAltButtonR;

			let rightStickX = this.gamepad.axes[2];//left / right
			let rightStickY = this.gamepad.axes[3];//up / down

			let isRotate = Math.abs(rightStickX) > tolerance || Math.abs(rightStickY) > tolerance;
			if (isRotate && !this.sync.isMine)
				this.sync.takeOwnership();

			let rotateAngle = Math.PI * (deltaTime/1000);// 180 degrees per second

			if (!this.isAltModeR && Math.abs(rightStickY) > tolerance) {
				this.object3d.rotation.x += rotateAngle * rightStickY;
			}

			if (Math.abs(rightStickX) > tolerance) {
				if(this.isAltModeR)
					this.object3d.rotation.z += rotateAngle * -rightStickX;
				else
					this.object3d.rotation.y += rotateAngle * rightStickX;
			}
		}

		if (this.config.scale)
		{
			let scaleChange = 10 * (deltaTime/1000);// 10 units per second
			let dpadUp = this.gamepad.buttons[12].pressed;//d-pad up
			let dpadDown = this.gamepad.buttons[13].pressed;//d-pad down

			let isScale = this.gamepad.buttons[12].pressed || this.gamepad.buttons[13].pressed;
			if (isScale && !this.sync.isMine)
				this.sync.takeOwnership();

			let prev = this.object3d.scale;
			let v3 = new THREE.Vector3(1, 1, 1);
			v3.multiplyScalar(scaleChange);
			if (dpadUp) this.object3d.scale.add(v3);
			if (dpadDown) {
				if (prev.x > v3.x && prev.y > v3.y && prev.z > v3.z) {//Don't go negative.
					this.object3d.scale.sub(v3);
				}
			}
		}
	}
}

export default GamepadControls;
