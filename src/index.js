'use strict';

/**
* The main module for the AltspaceVR SDK.
* @module altspace
*/

// make sure that the core uses the correct version of the SDK
let version = '<SDK_VERSION>';
if (window.altspace && window.altspace.requestVersion) {
	window.altspace.requestVersion(version);
}

// copy aframe's bundled version of THREE to global namespace
if(window.AFRAME && !window.THREE){
	window.THREE = window.AFRAME.THREE;
}

// include source packages
import * as components from './components/index';
import * as utilities from './utilities/index';

export { components, utilities, version };
