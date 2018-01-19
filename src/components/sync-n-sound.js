'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* @name module:altspace/components.sync-n-sound
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Synchronize the playback state of an [n-sound]{@link module:altspace/components.n-sound} component between clients.
* Requires both a [sync-system]{@link module:altspace/components.sync-system} component on the `a-scene`, and a
* [sync]{@link module:altspace/components.sync} component on the target entity. @aframe
*/
class SyncNSound extends AFrameComponent
{
	get dependencies(){
		return ['sync'];
	}

	init()
	{
		this.sync = this.el.components.sync;
		this.scene = this.el.sceneEl;
		this.syncSys = this.scene.systems['sync-system'];

		this.soundStateRef = null;
		this.soundEventRef = null;

		if(this.sync.isConnected)
			this.start();
		else
			this.el.addEventListener('connected', this.start.bind(this));
	}

	remove()
	{
		this.soundStateRef.off('value');
		this.soundEventRef.off('value');
	}

	start()
	{
		this.soundStateRef = this.sync.dataRef.child('sound/state');
		this.soundEventRef = this.sync.dataRef.child('sound/event');

		function sendEvent(event) {
			if (!this.sync.isMine) return;
			var event = {
				type: event.type,
				sender: this.syncSys.clientId,
				el: this.el.id,
				time: Firebase.ServerValue.TIMESTAMP
			};
			this.soundEventRef.set(event);
		}

		this.el.addEventListener('sound-played', sendEvent.bind(this));
		this.el.addEventListener('sound-paused', sendEvent.bind(this));

		// Retrieve the initial value once so we know to discard it.
		this.soundEventRef.once('value', snapshot => {
			let initialEvent = snapshot.val();
			this.soundEventRef.on('value', snapshot => {
				let event = snapshot.val();
				if (!event || (initialEvent && event.time === initialEvent.time) || this.sync.isMine) { return; }

				if (event.el === this.el.id) {
					let sound = this.el.components['n-sound'];
					if (event.type === 'sound-played') {
						sound.playSound();
					}
					else {
						sound.pauseSound();
					}
				}
			});
		});

		this.el.addEventListener('componentchanged', event => {
			if (!this.sync.isMine) return;
			let name = event.detail.name;
			if (name !== 'n-sound') return;
			this.soundStateRef.set(this.el.getAttribute(name));
		});

		this.soundStateRef.on('value', snapshot => {
			if (this.sync.isMine) return;
			let state = snapshot.val();
			if (!state) return;
			this.el.setAttribute('n-sound', state);
		});
	}
}

export default SyncNSound;
