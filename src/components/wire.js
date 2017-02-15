'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* The wire component allows you to trigger an event on another entity when an event occurs on an entity.
* @property {string} on Name of an event to listen to
* @property {string} gained Name of a state to watch for
* @property {string} lost Name of a state to watch for
* @property {string} emit Name of an event to trigger on the targets
* @property {string} gain Name of a state to add on the target
* @property {string} lose Name of a state to remove on the target
* @property {selector} targets A selector to pick which objects to wire to
* @property {selector} target - A selector to pick a single object to wire to
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
**/

class Wire extends AFrameComponent
{
	get schema(){
		return {
			on: {type: 'string'},
			emit: {type: 'string'},
			gained: {type: 'string'},
			lost: {type: 'string'},
			gain: {type: 'string'},
			lose: {type: 'string'},
			targets: {type: 'selectorAll'},
			target: {type: 'selector'}
		};
	}

	constructor()
	{
		this.multiple = true;

		this.actOnTargets = function()
		{
			function act(el) {
				if (this.data.emit) {
					el.emit(this.data.emit);
				}
				if (this.data.gain) {
					el.addState(this.data.gain);
				}
				if (this.data.lose) {
					el.removeState(this.data.lose);
				}
			}

			if(this.data.targets)
				this.data.targets.forEach(act.bind(this));

			if(this.data.target)
				act.call(this, this.data.target);
		}.bind(this);

		this.actOnTargetsIfStateMatches = function (event) {
			let state = event.detail.state;
			if (state === this.data.gained || state === this.data.lost) {
				this.actOnTargets();
			}
		}.bind(this);
	}

	update(oldData)
	{
		if (oldData.on) {
			this.el.removeEventListener(oldData.on, this.actOnTargets);
		}
		if (oldData.gained) {
			this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
		}
		if (oldData.lost) {
			this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
		}

		if (this.data.on) {
			this.el.addEventListener(this.data.on, this.actOnTargets);
		}
		if (this.data.gained) {
			this.el.addEventListener('stateadded', this.actOnTargetsIfStateMatches);
		}
		if (this.data.lost) {
			this.el.addEventListener('stateremoved', this.actOnTargetsIfStateMatches);
		}
	}

	remove() {
		this.el.removeEventListener(this.data.on, this.actOnTargets);
		this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
		this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
	}
}

export default Wire;
