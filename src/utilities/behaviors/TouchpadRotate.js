'use strict';

import Behavior from './Behavior';

/**
* Spin an object with the GearVR touchpad
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
*/
class TouchpadRotate extends Behavior
{
	get type(){ return 'TouchpadRotate'; }

	constructor(config = {})
	{
		super();
		this.object3d = null;
		this.scene = null;
		this.startingRotation = null;
		this.activelyRotating = false;
		this.lastDisplacementX = 0;
		this.runningCount = 5;
		this.runningAverageVelocityX = 0;
	}

	awake(o, s)
	{
		this.object3d = o;
		this.scene = s;

		altspace.addEventListener('touchpadup', this.onTouchpadUp.bind(this));
		altspace.addEventListener('touchpaddown', this.onTouchpadDown.bind(this));
		altspace.addEventListener('touchpadmove', this.onTouchpadMove.bind(this));
	}

	update(deltaTime) {
		if (!this.activelyRotating && Math.abs(this.runningAverageVelocityX) > 0.01) {
			this.object3d.rotation.y += this.runningAverageVelocityX;
			this.runningAverageVelocityX *= 0.97;
		}
	}

	onTouchpadUp(event) {
		this.activelyRotating = false;
	}

	onTouchpadDown(event) {
		this.activelyRotating = true;
		this.startingRotation = this.object3d.rotation.clone();
	}

	onTouchpadMove(event) {
		var deltaX = event.displacementX - this.lastDisplacementX;
		this.object3d.rotation.set(
			this.startingRotation.x,
			this.startingRotation.y + event.displacementX / 300,
			this.startingRotation.z
		);

		this.runningAverageVelocityX = (this.runningAverageVelocityX * this.runningCount + deltaX/300) / (this.runningCount + 1);
		this.lastDisplacementX = event.displacementX;
	}
}

export default TouchpadRotate;
