import NativeComponent from './NativeComponent';

/**
* @name module:altspace/components.n-text
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Creates dynamic 2D text on the entity. The text will wrap automatically based on the width and height provided.
* This text will be clearer than texture-based text and more performant than geometry-based test. @aframe
* @example <a-entity n-text='text: Hello world!;'></a-entity>
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

export default NText;