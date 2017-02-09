'use strict';

import Behavior from './Behavior';

/**
* The Spin behavior adds a spinning animation to an object.
* @param {Object} [config]
* @param {Number} [config.speed=0.0001] Rotation speed in radians per
*  millisecond
* @param {Vector3} [config.axis={0,1,0}] - The axis of rotation
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
*/
class Spin extends Behavior
{
	get type(){ return 'Spin'; }
	
	constructor(config) {
		this.config = Object.assign(
			{speed: 1e-4, axis: new THREE.Vector3(0,1,0)},
			config
		);
		this.config.axis.normalize();
		this.object3d = null;
	}

	awake(o) {
		this.object3d = o;
	}

	update(deltaTime) {
		this.object3d.rotateOnAxis(this.config.axis, this.config.speed * deltaTime);
	}
};

export default Spin;
