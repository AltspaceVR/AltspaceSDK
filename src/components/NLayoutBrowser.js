'use strict';

import NativeComponent from './NativeComponent';

class NLayoutBrowser extends NativeComponent
{
	constructor(){ super('n-layout-browser'); }
	get schema(){
		return {
			url: { default: 'about:blank'},
			is3d: { default: false }
		};
	}
}

export default NLayoutBrowser;
