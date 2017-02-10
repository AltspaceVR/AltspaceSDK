'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* Synchronize the playback state of an {@link n.n-sound} component between clients.
* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
* {@link sync.sync} component on the target entity.
* @extends module:altspace/components.AFrameComponent
* @memberof module:altspace/components
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
				time: Date.now()
			};
			this.soundEventRef.set(event);
		}

		this.el.addEventListener('sound-played', sendEvent.bind(this));
		this.el.addEventListener('sound-paused', sendEvent.bind(this));

		this.soundEventRef.on('value', (snapshot => {
			if (this.sync.isMine)
				return;

			let event = snapshot.val();
			if (!event)
				return;

			if (event.el === this.el.id) {
				let sound = this.el.components['n-sound'];
				if (event.type === 'sound-played') {
					sound.playSound();
				}
				else {
					sound.pauseSound();
				}
			}
		}).bind(this));

		this.el.addEventListener('componentchanged', (event => {
			if (!this.sync.isMine) return;
			let name = event.detail.name;
			if (name !== 'n-sound') return;
			this.soundStateRef.set(event.detail.newData);
		}).bind(this));

		this.soundStateRef.on('value', (snapshot => {
			if (this.sync.isMine) return;
			let state = snapshot.val();
			if (!state) return;
			this.el.setAttribute('n-sound', state);
		}).bind(this));
	}
}

export default SyncNSound;
