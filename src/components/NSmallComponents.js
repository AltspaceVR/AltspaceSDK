'use strict';

import NativeComponent from './NativeComponent';

/**
* Attach a given native object to this entity.
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
* @example <a-entity n-object='res:architecture/wall-4w-4h'></a-entity>
*/
class NObject extends NativeComponent {
	constructor(){ super('n-object'); }

	/**
	* @prop {string} res - The identifier for the [resource]{@link module:altspace/resources} you want. This component
	* can accept all resource types except for `interactables`.
	*/
	get schema(){
		return {res: {type: 'string'}};
	}
}

/**
* Create an object that spawns additional copies of itself when grabbed by a user (the copies are not spawners themselves).
* These copies will be physically interactive and automatically synchronized
* between users.
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
* @example <a-entity n-spawner='res: interactables/basketball'></a-entity>
*/
class NSpawner extends NativeComponent {
	constructor(){ super('n-spawner'); }

	/**
	* @prop {string} res - The identifier for the [resource]{@link module:altspace/resources} you want. This component
	* can only accept resources of type `interactables`.
	*/
	get schema(){
		return {res: {type: 'string'}};
	}
}

/**
* Creates dynamic 2D text on the entity. The text will wrap automatically based on the width and height provided.
* This text will be clearer than texture-based text and more performant than geometry-based test.
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NText extends NativeComponent {
	constructor(){ super('n-text'); }

	/**
	* @prop {string} text - The text to be drawn.
	* @prop {number} fontSize=10 - The height of the letters. 10pt ~= 1m
	* @prop {number} width=10 - The width of the text area in meters. If the
	* text is wider than this value, the overflow will be wrapped to the next line.
	* @prop {number} height=1 - The height of the text area in meters. If the
	* text is taller than this value, the overflow will be cut off.
	* @prop {string} horizontalAlign=middle - The horizontal anchor point for
	* the text. Can be `left`, `middle`, or `right`.
	* @prop {string} verticalAlign=middle - The vertical anchor point for the
	* text. Can be `top`, `middle`, or `bottom`.
	*/
	get schema(){
		return {
			text: { default: '', type: 'string' },
			/*color: { default: 'white',
				parse: function(value) {
					return parseFloat(value, 10);
				},
				stringify: function(value) {
					return value.toString();
				}},*/
			fontSize: { default: '10', type: 'int' },//roughly a meter tall
			width: { default: '10', type: 'number' },//in meters
			height: { default: '1', type: 'number' },//in meters
			horizontalAlign: { default: 'middle'},
			verticalAlign: { default: 'middle'}
		};
	}
}

/**
* Make the object's +Z always face the viewer. Currently will only directly apply
* to main mesh or native component on the attached entity, not any children or submeshes.
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NBillboard extends NativeComponent {
	constructor(){ super('n-billboard'); }
}

export {NObject, NSpawner, NText, NBillboard};
