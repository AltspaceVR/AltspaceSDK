'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* @name module:altspace/components.instantiator
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Instantiates objects on an event trigger, adds them to the scene and syncs their creation across clients.
* The instantiated objects are built using the specified mixins. @aframe
* @example <!-- attaches a ball to your head if you click the box -->
* <a-mixin id='headbox' geometry='primitive:sphere;' n-skeleton-parent='part: head'></a-mixin>
* <a-box instantiator='on: click; mixin: headbox;'></a-box>
*/
class Instantiator extends AFrameComponent
{
	get schema(){ return {
		/**
		* An event that triggers the instantiation
		* @instance
		* @member {string} on
		* @memberof module:altspace/components.instantiator
		*/
		on: {type: 'string'},

		/**
		* A space-separated list of mixins that should be used to instantiate the object.
		* @instance
		* @member {string} mixin
		* @memberof module:altspace/components.instantiator
		*/
		mixin: {type: 'string'},

		/**
		* A selector that determines which object the instantiated object will be added to.
		* @instance
		* @member {string} parent
		* @default "a-scene"
		* @memberof module:altspace/components.instantiator
		*/
		parent: {type: 'selector', default: 'a-scene'},

		/**
		* An identifier which can be used to group instantiated objects.
		* @instance
		* @member {string} group
		* @default "main"
		* @memberof module:altspace/components.instantiator
		*/
		group: {type: 'string', default: 'main'},

		/**
		* Whether the last object instantiated in a group should be removed before
		* instantiating a new object.
		* @instance
		* @member {boolean} removeLast
		* @default true
		* @memberof module:altspace/components.instantiator
		*/
		removeLast: {type: 'boolean', default: true},
	}; }

	init() {
		this.onHandler = this.instantiateOrToggle.bind(this);
		this.el.addEventListener(this.data.on, this.onHandler);
		this.syncSys = this.el.sceneEl.systems['sync-system'];
	}

	instantiateOrToggle() {
		let userGroup = this.data.group + '-' + this.syncSys.userInfo.userId;
		if (this.data.removeLast) {
			this.syncSys.removeLast(userGroup).then(function (lastInstantiatorId) {
				if (lastInstantiatorId !== this.el.id) {
					this.syncSys.instantiate(this.data.mixin, this.data.parent, this.el, userGroup, this.el.id)
				}
			}.bind(this));
		}
		else {
			this.syncSys.instantiate(this.el.id, userGroup, this.data.mixin, this.data.parent)
		}
	}

	remove() {
		this.el.removeEventListener(this.data.on, this.onHandler);
	}
}

export default Instantiator;
