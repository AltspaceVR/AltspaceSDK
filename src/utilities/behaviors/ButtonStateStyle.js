'use strict';

import Behavior from './Behavior';

/**
* A behavior that changes the color of an object when the cursor interacts with it.
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
* @param {Object} [config] Optional parameters.
* @param {THREE.Color} [config.originalColor] Base material color.
* @param {Number} [config.overBrightness=1.5] Material brightness when cursor
*	is over button.
* @param {Number} [config.downBrightness=0.5] Material brightness when cursor
*	is clicked.
*/
class ButtonStateStyle extends Behavior
{
	get type(){ return 'ButtonStateStyle'; }

	constructor(config)
	{
		this.config = Object.assign({overBrightness: 1.5, downBrightness: 0.5}, config);
		this.object3d = null;
		this.scene = null;
		this.originalColor = null;
		this.modifiedColor = new THREE.Color();

		this._cbs = {
			cursorenter: this.cursorEnter.bind(this),
			cursordown: this.cursorDown.bind(this),
			cursorup: this.cursorUp.bind(this),
			cursorleave: this.cursorLeave.bind(this)
		};
	}

	awake(o, s)
	{
		this.object3d = o;
		this.scene = s;
		this.originalColor = this.config.originalColor || this.object3d.material.color;
		this.object3d.addEventListener('cursorenter', this._cbs.cursorenter);
		this.object3d.addEventListener('cursordown', this._cbs.cursordown);
	}

	dispose()
	{
		this.object3d.removeEventListener('cursorenter', this._cbs.cursorenter);
		this.object3d.removeEventListener('cursorleave', this._cbs.cursorleave);
		this.object3d.removeEventListener('cursorup', this._cbs.cursorup);
		this.object3d.removeEventListener('cursordown', this._cbs.cursordown);
	}

	changeBrightness(brightness)
	{
		this.modifiedColor.set(this.originalColor);
		this.modifiedColor.multiplyScalar(brightness);
		this.modifiedColor.r = THREE.Math.clamp(this.modifiedColor.r, 0, 1);
		this.modifiedColor.g = THREE.Math.clamp(this.modifiedColor.g, 0, 1);
		this.modifiedColor.b = THREE.Math.clamp(this.modifiedColor.b, 0, 1);
		this.object3d.material.color = this.modifiedColor;
	}

	cursorLeave()
	{
		this.object3d.removeEventListener('cursorleave', this._cbs.cursorleave);
		this.changeBrightness(1.0);
	}

	cursorEnter()
	{
		this.changeBrightness(this.config.overBrightness);
		this.object3d.addEventListener('cursorleave', this._cbs.cursorleave);
	}

	cursorUp(event)
	{
		this.scene.removeEventListener('cursorup', this._cbs.cursorup);
		this.object3d.addEventListener('cursorenter', this._cbs.cursorenter);
		if (event.target === this.object3d) {
			this.changeBrightness(this.config.overBrightness);
			this.object3d.addEventListener('cursorleave', this._cbs.cursorleave);
		} else {
			this.changeBrightness(1.0);
		}
	}

	cursorDown()
	{
		this.scene.addEventListener('cursorup', this._cbs.cursorup);
		this.object3d.removeEventListener('cursorleave', this._cbs.cursorleave);
		this.object3d.removeEventListener('cursorenter', this._cbs.cursorenter);
		this.changeBrightness(this.config.downBrightness);
	}
}

export default ButtonStateStyle;
