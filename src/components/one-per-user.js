'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* Instantiates an entity for each user using [sync-system]{@link sync.sync-system}. @aframe
* @alias one-per-user
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
*/
class OnePerUser extends AFrameComponent
{
	get schema(){
		return {
			/**
			* A comma-separated list of mixin ids that are used to instantiate the object.
			* @member {array} mixin
			* @instance
			* @memberof module:altspace/components.one-per-user
			*/
			mixin: {type: 'string'},

			/**
			* A selector specifying which element should be the parent of the instantiated entity.
			* Defaults to the parent node (i.e. new element becomes a sibling of this entity).
			* @member {string} [parent]
			* @instance
			* @memberof module:altspace/components.one-per-user
			*/
			parent: {type: 'selector'}
		};
	}

	init(){
		let scene = this.el.sceneEl;
		this.syncSys = scene.systems['sync-system'];
		this.syncSys.instantiate(this.data.mixin, this.data.parent || this.el.parentNode, this.el);
	}
}

export default OnePerUser;
