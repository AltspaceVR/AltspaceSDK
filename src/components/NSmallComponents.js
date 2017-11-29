'use strict';

import NativeComponent from './NativeComponent';

/**
* @name module:altspace/components.n-object
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Attach a given native object to this entity. @aframe
* @example <a-entity n-object='res:architecture/wall-4w-4h'></a-entity>
*/
class NObject extends NativeComponent {
	constructor(){ super('n-object'); }
	get schema(){
		return {
			/**
			* The identifier for the [resource]{@link module:altspace/resources} you want. This component
			* can accept all resource types except for `interactables`.
			* @instance
			* @member {string} res
			* @memberof module:altspace/components.n-object
			*/
			res: {type: 'string'}
		};
	}
}

/**
* @name module:altspace/components.n-spawner
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Create an object that spawns additional copies of itself when grabbed by a user (the copies are not spawners themselves).
* These copies will be physically interactive and automatically synchronized
* between users. @aframe
* @example <a-entity n-spawner='res: interactables/basketball'></a-entity>
*/
class NSpawner extends NativeComponent {
	constructor(){ super('n-spawner'); }
	get schema(){
		return {
			/**
			* The identifier for the [resource]{@link module:altspace/resources} you want. This component
			* can only accept resources of type `interactables`.
			* @instance
			* @member {string} res
			* @memberof module:altspace/components.n-spawner
			*/
			res: {type: 'string'}
		};
	}
}


/**
* @name module:altspace/components.n-billboard
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Make the object's +Z always face the viewer. Currently will only directly apply
* to main mesh or native component on the attached entity, not any children or submeshes. @aframe
* @example <a-image src='#tree' n-billboard></a-image>
*/
class NBillboard extends NativeComponent {
	constructor(){ super('n-billboard', false); }
}

/**
* @name module:altspace/components.n-skeleton-parent
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Parents an entity to a joint on the avatar skeleton. @aframe
* @example <a-sphere n-skeleton-parent='part: head'></a-sphere>
*/
class NSkeletonParent extends NativeComponent {
	constructor(){ super('n-skeleton-parent'); }
	get schema(){ return {
		/**
		* One of 'eye, 'head', 'neck', 'spine', 'hips', 'upper-leg', 'lower-leg',
		* 'foot', 'toes', 'shoulder', 'upper-arm', 'lower-arm', 'hand', 'thumb',
		* 'index', 'middle', 'ring' or 'pinky'.
		* @member {string} module:altspace/components.n-skeleton-parent#part
		*/
		part: {type: 'string'},

		/**
		* Side of the body. Either 'left', 'center' or 'right'
		* @member {string} module:altspace/components.n-skeleton-parent#side
		* @default "center"
		*/
		side: {type: 'string', default: 'center'},

		/**
		* Bone index. e.g. Which knuckle joint to attach to.
		* @member {int} module:altspace/components.n-skeleton-parent#index
		* @default 0
		*/
		index: {type: 'int', default: 0},

		/**
		* Id of the user to which the entity should be attached. Defaults to the
		* local user.
		* @member {int} module:altspace/components.n-skeleton-parent#userId
		*/
		userId: {type: 'string'}
	}; }
}

/**
* 
* @name module:altspace/components.n-cockpit-parent
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Parents an entity to the cockpit, i.e. the player's HUD. This is primarily used for UI elements.
* Note that this does not dock the items to the radial menu. If you want that, use [altspace.open](../js/module-altspace.html#.open). @aframe
* @example <a-image src='#button' n-cockpit-parent></a-image>
*/
class NCockpitParent extends NativeComponent {
	constructor(){ super('n-cockpit-parent', false); }
}

export {NObject, NSpawner, NBillboard, NSkeletonParent, NCockpitParent};
