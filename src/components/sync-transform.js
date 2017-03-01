'use strict';

import {AFrameComponent} from './AFrameComponent';

//from underscore.js
function throttle(func, wait, options) {
	var timeout, context, args, result;
	var previous = 0;
	if (!options) options = {};

	var later = function() {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};

	var throttled = function() {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};

	throttled.cancel = function() {
		clearTimeout(timeout);
		previous = 0;
		timeout = context = args = null;
	};

	return throttled;
}


/**
* Synchronize the position, rotation, and scale of this object with all clients.
* Requires both a [sync-system]{@link module:altspace/components.sync-system} component on the `a-scene`, and a
* [sync]{@link module:altspace/components.sync} component on the target entity. @aframe
* @alias sync-transform
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
* @example
* <a-scene sync-system='app: myapp; author: name'>
*     <a-box move-it-around sync sync-transform></a-box>
* </a-scene>
*/
class SyncTransform extends AFrameComponent
{
	get dependencies(){ return ['sync']; }
	init()
	{
		this.sync = this.el.components.sync;
		if(this.sync.isConnected)
			start();
		else
			this.el.addEventListener('connected', this.start.bind(this));
	}

	start()
	{
		let sync = this.sync, component = this;
		let positionRef = sync.dataRef.child('position');
		let rotationRef = sync.dataRef.child('rotation');
		let scaleRef = sync.dataRef.child('scale');

		component.updateRate = 100;
		let stoppedAnimations = [];

		//pause all animations on ownership loss
		component.el.addEventListener('ownershiplost', () => {
			component.el.children.forEach(child => {
				let tagName = child.tagName.toLowerCase();
				if (tagName === "a-animation") {
					stoppedAnimations.push(child);
					child.stop();
				}
			});
		});

		component.el.addEventListener('ownershipgained', () => {
			stoppedAnimations.forEach(a => a.start());
			stoppedAnimations = [];
		});

		function onTransform(snapshot, componentName) {
			if (sync.isMine) return;

			let value = snapshot.val();
			if (!value) return;

			component.el.setAttribute(componentName, value);
		}

		positionRef.on('value', snapshot => onTransform(snapshot, 'position'));
		rotationRef.on('value', snapshot => onTransform(snapshot, 'rotation'));
		scaleRef.on('value', snapshot => onTransform(snapshot, 'scale'));

		let sendPosition = throttle(function(value){
			positionRef.set(value);
		}, component.updateRate);

		let sendRotation = throttle(function(value){
			rotationRef.set(value);
		}, component.updateRate);

		let sendScale = throttle(function(value){
			scaleRef.set(value);
		}, component.updateRate);

		function onComponentChanged(event)
		{
			if (!sync.isMine) return;

			let name = event.detail.name;
			let newData = event.detail.newData;

			if (name === 'position') {
				sendPosition(newData);
			} else if (name === 'rotation') {
				sendRotation(newData);
			} else if (name === 'scale') {
				sendScale(newData);
			}
		}

		component.el.addEventListener('componentchanged', onComponentChanged);
	}
}

export default SyncTransform;
