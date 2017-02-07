'use strict';

import Behavior from './Behavior';

/**
* Changes the color of an object when cursor hovers over it.
* @param {Object} [config] Optional parameters.
* @param {String} [config.event='cursorenter'] Specify the name of event which
*  triggers the color change.  Default is 'cursorenter' for a hover effect.
* @param {THREE.Color} [config.color=THREE.Color('yellow')] A THREE.Color value that will be applied to the object's
*  material.
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
*/
class HoverColor extends Behavior
{
	get type(){ return 'HoverColor'; }

	constructor(config)
	{
		this.config = Object.assign(
			{event: 'cursorenter', color: new THREE.Color('yellow')},
			config
		);

		// Default is to trigger color change on cursorenter/cursorleave events,
		// also support triggering on cursordown/cursorup events.
		if (config.event !== 'cursorenter' && config.event !== 'cursordown') {
			throw Error('Expected config.event "cursorenter" or "cursordown"');
		}

		this.object3d = null;
		this.cursordownObject = null;
		this.cursorenterObject = null;
		this.scene = null;

		/*
		* These are here and not in the prototype because we need references
		* to the bound versions of these functions for "dispose".
		*/

		this.cursordown = (event => {
			this.cursordownObject = this.object3d;
			if (this.config.event === 'cursordown' ){
				this.setColor(cursordownObject);
			}
		}).bind(this);

		this.cursorenter = (event => {
			//ignore hover events if a different object is selected,
			//for example during a drag we don't want to change highlight
			if (this.cursordownObject && this.cursordownObject !== this.object3d){
				return;
			}
			if (this.cursorenterObject){
				this.unsetColor(this.cursorenterObject);
			}
			this.cursorenterObject = this.object3d;
			this.setColor(this.object3d);
		}).bind(this);

		this.cursorleave = (event => {
			if (this.cursorenterObject === this.object3d){
				this.cursorenterObject = null;
				this.unsetColor(this.object3d);
			}
		}).bind(this);

		this.cursorupScene = (event => {
			if (this.config.event === 'cursordown' && this.cursordownObject ){
				this.unsetColor(this.cursordownObject);
			}
			this.cursordownObject = null;
		}).bind(this);
	}

	awake(o, s)
	{
		this.object3d = o;
		this.scene = s;
		this.object3d.addEventListener('cursordown', this.cursordown);
		this.scene.addEventListener('cursorup', this.cursorupScene);
		if (this.config.event === 'cursorenter') {
			this.object3d.addEventListener('cursorenter', this.cursorenter);
			this.object3d.addEventListener('cursorleave', this.cursorleave);
		}
	}

	dispose()
	{
		this.object3d.removeEventListener('cursordown', this.cursordown);
		this.scene.removeEventListener('cursorup', this.cursorupScene);
		this.object3d.removeEventListener('cursorenter', this.cursorenter);
		this.object3d.removeEventListener('cursorleave', this.cursorleave);
	}

	setColor(o)
	{
		if (o.material && o.material.color){
			o.userData.origColor = o.material.color;
			o.material.color = this.config.color;
			//Not strictly needed but seems to make updating faster in Altspace.
			if (o.material) o.material.needsUpdate = true;
		}
		o.children.forEach(this.setColor.bind(this));
	}

	unsetColor(o)
	{
		if (o.material && o.material.color){
			if (!o.userData.origColor){
				console.error('Cannot unsetColor, no userData.origColor for object', o);
				return;
			}
			o.material.color = o.userData.origColor;
			if (o.material) o.material.needsUpdate = true;
		}
		o.children.forEach(this.unsetColor.bind(this));
	}


}

export default HoverColor;
