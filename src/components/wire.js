'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* @name module:altspace/components.wire
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc The wire component allows you to trigger an event on one entity when an event
* occurs on the another entity. If no targets are selected, it will target itself. @aframe
* @example <a-box id='proxy' wire='on: click; emit: click; target: #otherbox></a-box>
* <a-box id='otherbox' random-color></a-box>
**/

class Wire extends AFrameComponent
{
	get schema(){
		return {
			/**
			* Name of an event to listen for
			* @instance
			* @member {string} on
			* @memberof module:altspace/components.wire
			*/
			on: {type: 'string'},

			/**
			* Name of an event to trigger on the targets
			* @instance
			* @member {string} emit
			* @memberof module:altspace/components.wire
			*/
			emit: {type: 'string'},

			/**
			* Name of a state to watch for
			* @instance
			* @member {string} gained
			* @memberof module:altspace/components.wire
			*/
			gained: {type: 'string'},

			/**
			* Name of a state to watch for
			* @instance
			* @member {string} lost
			* @memberof module:altspace/components.wire
			*/
			lost: {type: 'string'},

			/**
			* Name of a state to add on the target
			* @instance
			* @member {string} gain
			* @memberof module:altspace/components.wire
			*/
			gain: {type: 'string'},

			/**
			* Name of a state to remove on the target
			* @instance
			* @member {string} lose
			* @memberof module:altspace/components.wire
			*/
			lose: {type: 'string'},

			/**
			* A selector to pick which objects to wire to. The selector is re-evaluated when the wire is triggered.
			* @instance
			* @member {selector} targets
			* @memberof module:altspace/components.wire
			*/
			targets: {type: 'selectorAll'},

			/**
			* A selector to pick a single object to wire to. The selector is re-evaluated when the wire is triggered.
			* @instance
			* @member {selector} target
			* @memberof module:altspace/components.wire
			*/
			target: {type: 'selector'}
		};
	}

	constructor(){
		super();
		this.multiple = true;
	}

	init()
	{
		this.actOnTargets = (function()
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

			this.updateProperties(this.attrValue);

			if(this.data.targets)
				this.data.targets.forEach(act.bind(this));

			if(this.data.target)
				act.call(this, this.data.target);

			if( !this.data.targets && !this.data.target )
				act.call(this, this.el);

		}).bind(this);

		this.actOnTargetsIfStateMatches = (function (event) {
			let state = event.detail.state;
			if (state === this.data.gained || state === this.data.lost) {
				this.actOnTargets();
			}
		}).bind(this);
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
