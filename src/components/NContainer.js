'use strict';

import NativeComponent from './NativeComponent';

/**
* A container keeps a running tally of how many objects are within
* its bounds, and adds and removes the states `container-full` and
* `container-empty` based on the current count of objects. Can fire three
* special events: `container-full`, `container-empty`, and `container-count-changed`.
* @prop {number} capacity=4 - The value at which the container will fire the
* `container-full` event.
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NContainer extends NativeComponent
{
	constructor(){ super('n-container'); }
	get schema(){ return {capacity: { default: 4, type: 'number' }}; }
	init()
	{
		super.init();

		let el = this.el;
		let component = this;

		el.addEventListener('stateadded', event => {
			if(event.detail.state === 'container-full'){
				el.emit('container-full');
			}
			if(event.detail.state === 'container-empty'){
				el.emit('container-empty');
			}
		});

		el.addEventListener('container-count-changed', event => {
			component.count = event.detail.count;
		});
	}
}

export default NContainer;
