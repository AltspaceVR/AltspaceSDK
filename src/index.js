'use strict';

/**
* The main module for the AltspaceVR SDK.
* @module altspace
*/

if(!window.altspace)
	window.altspace = {components: {}, utilities: {}, inClient: false};

let version = '{{SDK_VERSION}}';
if (window.altspace.requestVersion) {
	window.altspace.requestVersion(version);
}

// copy aframe's bundled version of THREE to global namespace
if(window.AFRAME && !window.THREE){
	window.THREE = window.AFRAME.THREE;
}

// include source packages
import * as components_lib from './components/index';
import * as utilities_lib from './utilities/index';

Object.assign(window.altspace.components || {}, components_lib);
Object.assign(window.altspace.utilities || {}, utilities_lib);
