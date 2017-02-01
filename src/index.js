'use strict';

/**
* The main module for the AltspaceVR SDK.
* @module altspace
*/

import components from './components/index';

// make sure that the core uses the correct version of the SDK
let version = VERSION;
if (window.altspace && window.altspace.requestVersion) {
	window.altspace.requestVersion(version);
}

export { components };
