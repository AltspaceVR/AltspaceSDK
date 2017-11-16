'use strict';

import NativeComponent from './NativeComponent';

/**
* @name module:altspace/components.n-layout-browser
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Spawn a browser or enclosure during the "layout" phase when a space is first created or reset. 
* Layout browsers can only be used by apps that are set as the default app in a space.
* @aframe
*/
class NLayoutBrowser extends NativeComponent
{
	constructor(){ super('n-layout-browser'); }
	get schema(){
		return {
			/**
			* An absolute URL that you want to load in the browser.
			* @instance
			* @member {string} url
			* @memberof module:altspace/components.n-layout-browser
			*/
			url: { default: 'about:blank'},
			/**
			* Whether the browser is a three-dimensional browser that can contain other apps.
			* @instance
			* @default false
			* @member {bool} isEnclosure
			* @memberof module:altspace/components.n-layout-browser
			*/
			isEnclosure: { default: false }
		};
	}
}

export default NLayoutBrowser;
