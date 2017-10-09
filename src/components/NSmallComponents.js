'use strict';

import NativeComponent from './NativeComponent';

/**
* Attach a given native object to this entity. @aframe
* @alias n-object
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
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
* Create an object that spawns additional copies of itself when grabbed by a user (the copies are not spawners themselves).
* These copies will be physically interactive and automatically synchronized
* between users. @aframe
* @alias n-spawner
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
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
* Creates dynamic 2D text on the entity. The text will wrap automatically based on the width and height provided.
* This text will be clearer than texture-based text and more performant than geometry-based test. @aframe
* @alias n-text
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NText extends NativeComponent {
	constructor(){ super('n-text'); }
	get schema(){
		return {
			/**
			* The text to be drawn.
			* @instance
			* @member {string} text
			* @memberof module:altspace/components.n-text
			*/
			text: { default: '', type: 'string' },

			/**
			* The height of the letters. 10pt ~= 1m
			* @instance
			* @member {int} fontSize
			* @default 10
			* @memberof module:altspace/components.n-text
			*/
			fontSize: { default: 10, type: 'int' },//roughly a meter tall

			/**
			* The width of the text area in meters. If the
			* text is wider than this value, the overflow will be wrapped to the next line.
			* @instance
			* @member {number} width
			* @default 10
			* @memberof module:altspace/components.n-text
			*/
			width: { default: 10, type: 'number' },//in meters

			/**
			* The height of the text area in meters. If the
			* text is taller than this value, the overflow will be cut off.
			* @instance
			* @member {number} height
			* @default 1
			* @memberof module:altspace/components.n-text
			*/
			height: { default: 1, type: 'number' },//in meters

			/**
			* The horizontal anchor point for the text. Can be `left`, `middle`, or `right`.
			* @instance
			* @member {string} horizontalAlign
			* @default "middle"
			* @memberof module:altspace/components.n-text
			*/
			horizontalAlign: { default: 'middle'},

			/**
			* The vertical anchor point for the text. Can be `top`, `middle`, or `bottom`.
			* @instance
			* @member {string} verticalAlign
			* @default "middle"
			* @memberof module:altspace/components.n-text
			*/
			verticalAlign: { default: 'middle'}
		};
	}
}

/**
* Make the object's +Z always face the viewer. Currently will only directly apply
* to main mesh or native component on the attached entity, not any children or submeshes. @aframe
* @alias n-billboard
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NBillboard extends NativeComponent {
	constructor(){ super('n-billboard', false); }
}

/**
* Parents an entity to a joint on the avatar skeleton. @aframe
* @alias n-skeleton-parent
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
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
* Parents an entity to the cockpit. @aframe
* @alias n-cockpit-parent
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NCockpitParent extends NativeComponent {
	constructor(){ super('n-cockpit-parent', false); }
}

export {NObject, NSpawner, NText, NBillboard, NSkeletonParent, NCockpitParent};
