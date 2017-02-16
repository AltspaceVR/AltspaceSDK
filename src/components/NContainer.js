'use strict';

import NativeComponent from './NativeComponent';

/**
* A container keeps a running tally of how many objects are within
* its bounds, and adds and removes the states `container-full` and
* `container-empty` based on the current count of objects. Requires a native
* collider component set to trigger mode. @aframe
* @alias n-container
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
* @example
* <a-box n-box-collider="isTrigger: true" n-container="capacity: 6"></a-box>
*/
class NContainer extends NativeComponent
{
	constructor(){ super('n-container'); }
	get schema(){
		return {
			/**
			* The value at which the container will fire the `container-full` event.
			* @instance
			* @member {number} capacity
			* @default 4
			* @memberof module:altspace/components.n-container
			*/
			capacity: { default: 4, type: 'number' }
		};
	}
	init()
	{
		super.init();

		let el = this.el;
		let component = this;

		el.addEventListener('stateadded', event => {
			if(event.detail.state === 'container-full'){
				/**
				* Fired when the n-container reaches its capacity
				* @event container-full
				* @memberof module:altspace/components.n-container
				*/
				el.emit('container-full');
			}
			if(event.detail.state === 'container-empty'){
				/**
				* Fired when the n-container reaches zero objects contained
				* @event container-empty
				* @memberof module:altspace/components.n-container
				*/
				el.emit('container-empty');
			}
		});

		/**
		* Fired every time an object enters or leaves the bounds of the n-container
		* @event container-count-changed
		* @memberof module:altspace/components.n-container
		* @param {Object} event - Contains details of the event. The current
		*/
		el.addEventListener('container-count-changed', event => {

			/**
			* The number of objects in this container.
			* @instance
			* @member {int} count
			* @readonly
			* @memberof module:altspace/components.n-container
			*/
			component.count = event.detail.count;
		});
	}
}

export default NContainer;
