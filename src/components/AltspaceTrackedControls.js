'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* @name module:altspace/components.altspace-tracked-controls
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Enables tracked control support for A-Frame applications that use the built-in
* `tracked-controls`, `vive-controls` or `hand-controls` components. @aframe
*/
class AltspaceTrackedControls extends AFrameComponent
{
	init()
	{
		this.gamepadIndex = null;
		this.trackedControlsSystem = document.querySelector('a-scene').systems['tracked-controls'];
		this.systemGamepads = 0;
		altspace.getGamepads();
	}

	tick()
	{
		if (
			this.trackedControlsSystem &&
			this.systemGamepads !== this.trackedControlsSystem.controllers.length &&
			window.altspace && altspace.getGamepads && altspace.getGamepads().length
		) {
			var components = this.el.components;
			if (components['paint-controls']) {
				this.gamepadIndex = components['paint-controls'].data.hand === 'left' ? 2 : 1;
			}

			if (this.gamepadIndex === null && components['hand-controls']) {
				this.gamepadIndex = components['hand-controls'].data === 'left' ? 2 : 1;
			}

			if (this.gamepadIndex === null && components['vive-controls']) {
				this.gamepadIndex = components['vive-controls'].data.hand === 'left' ? 2 : 1;
			}

			if (this.gamepadIndex === null && components['tracked-controls']) {
				this.gamepadIndex = components['tracked-controls'].data.controller;
			}

			this.el.setAttribute('tracked-controls', 'id', altspace.getGamepads()[this.gamepadIndex].id);
			this.el.setAttribute('tracked-controls', 'controller', 0);
			this.systemGamepads = this.trackedControlsSystem.controllers.length;
		}
	}
}

export default AltspaceTrackedControls;
