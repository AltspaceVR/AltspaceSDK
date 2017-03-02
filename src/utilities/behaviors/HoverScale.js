'use strict';

import Behavior from './Behavior';

/**
* Changes the scale of an object when the cursor hovers over it, and restores the original scale when the cursor is no longer hovering over the object.
* @class HoverScale
* @param {Object} [config] Optional parameters.
* @param {Number} [config.scale=1.15] A scaling factor that will be applied to the object's initial scale when the cursor hovers over it.
* @param {Number} [config.duration=75] Duration the scaling effect is intended to take to complete, in milliseconds.
* @param {Boolean} [config.revertOnDispose=true] Specifies whether the object's original scale should be restored when the behavior has been destroyed.
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
*/
class HoverScale extends Behavior
{
	get type(){ return 'HoverScale'; }

	constructor(config)
	{
		super();
		this.config = Object.assign(
			{scale: 1.15, duration: 75, revertOnDispose: true},
			config
		);

		this.object3d = null;
		this.originalScale = null;
		this.elapsedTime = this.config.duration;
		this.progress = 1;
		this.srcScale = null;
		this.destScale = null;

		this.onHoverStateChange = (() => {
			[this.srcScale, this.destScale] = [this.destScale, this.srcScale];
			this.progress = 1 - this.progress;
			this.elapsedTime = this.config.duration - this.elapsedTime;
		}).bind(this);
	}

	awake(o, s)
	{
		this.object3d = o;
		this.originalScale = this.object3d.scale.clone();

		this.srcScale = this.object3d.scale.clone();
		this.srcScale.multiplyScalar(this.config.scale);

		this.destScale = new THREE.Vector3();
		this.destScale.copy(this.originalScale);

		this.progress = 1;
		this.elapsedTime = this.config.duration;

		this.object3d.addEventListener('cursorenter', this.onHoverStateChange);
		this.object3d.addEventListener('cursorleave', this.onHoverStateChange);
	}

	update(deltaTime)
	{
		if(this.progress < 1) {
			this.elapsedTime = THREE.Math.clamp(
				this.elapsedTime + deltaTime, 0, this.config.duration
			);

			this.progress = THREE.Math.clamp(this.elapsedTime / this.config.duration, 0, 1);
			this.object3d.scale.lerpVectors(this.srcScale, this.destScale, this.progress);
		}
	}

	dispose()
	{
		this.object3d.removeEventListener('cursorenter', this.onHoverStateChange);
		this.object3d.removeEventListener('cursorleave', this.onHoverStateChange);

		// Restore Original Object Scale Before Behavior Was Applied
		if(this.config.revertOnDispose)
			this.object3d.scale.copy(this.originalScale);

		this.originalScale = null;
		this.srcScale = null;
		this.destScale = null;
		this.object3d = null;
	}


}

export default HoverScale;
