'use strict';

import Behavior from './Behavior';

/**
* The Bob behavior adds a bobbing animation to an object
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
* @param {Object} [config]
* @param {Boolean} [config.shouldRotate=true] Whether the animation should include
*  rotation.
* @param {Boolean} [config.shouldMove=true] Whether the animation should
*  include movement.
* @param {Number} [config.x=3] Amount of bob on the x axis.
* @param {Number} [config.y=5] Amount of bob on the y axis.
**/
class Bob extends Behavior
{
	get type(){ return 'Bob'; }

	constructor(config)
	{
		super();
		this.config = Object.assign({x:3, y:5, shouldRotate:true, shouldMove:true}, config);
		this.object3d = null;
		this.offsetPosition = null;
		this.lastBobPosition = new THREE.Vector3();
		this.nowOffset = Math.random() * 10000;
	}

	awake(o)
	{
		this.object3d = o;
		this.offsetPosition = this.object3d.position.clone();
	}

	update(deltaTime)
	{
		let nowInt = Math.floor(performance.now()) + this.nowOffset;

		if (this.config.shouldMove)
		{
			if (!this.lastBobPosition.equals(this.object3d.position))
				this.offsetPosition.copy(this.object3d.position);

			this.object3d.position.y = this.offsetPosition.y + Math.sin(nowInt / 800) * this.config.x;
			this.object3d.position.x = this.offsetPosition.x + Math.sin(nowInt / 500) * this.config.y;
			this.lastBobPosition.copy(this.object3d.position);
		}

		if (this.config.shouldRotate){
			this.object3d.rotation.x = Math.sin(nowInt / 500) / 15;
		}
	}
}

export default Bob;
