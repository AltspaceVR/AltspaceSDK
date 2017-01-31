/**
* Synchronize the playback state of an {@link n.n-sound} component between clients.
* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
* {@link sync.sync} component on the target entity.
* @mixin sync-n-sound
* @memberof sync
*/
'use strict';

import {AFrameComponent} from './AFrameComponent';

export default class SyncNSound extends AFrameComponent
{
	get dependencies(){
		return ['sync'];
	}
}

AFRAME.registerComponent('sync-n-sound',
{
	dependencies: ['sync'],
	schema: { },
	init: function () {
		var component = this;
		var sync = component.el.components.sync;
		var scene = document.querySelector('a-scene');
		var syncSys = scene.systems['sync-system'];
		if(sync.isConnected) start(); else component.el.addEventListener('connected', start);

		function start(){
			component.soundStateRef = sync.dataRef.child('sound/state');
			component.soundEventRef = sync.dataRef.child('sound/event');

			function sendEvent(event) {
				if (!sync.isMine) return;
				var event = {
					type: event.type,
					sender: syncSys.clientId,
					el: component.el.id,
					time: Date.now()
				};
				component.soundEventRef.set(event);
			}

			component.el.addEventListener('sound-played', sendEvent);
			component.el.addEventListener('sound-paused', sendEvent);

			component.soundEventRef.on('value', function (snapshot) {
				if (sync.isMine) return;
				var event = snapshot.val();
				if (!event) return;
				if (event.el === component.el.id) {
					var sound = component.el.components['n-sound'];
					if (event.type === 'sound-played') {
						sound.playSound();
					}
					else {
						sound.pauseSound();
					}
				}
			});

			component.el.addEventListener('componentchanged', function (event) {
				if (!sync.isMine) return;
				var name = event.detail.name;
				if (name !== 'n-sound') return;
				component.soundStateRef.set(event.detail.newData);
			});

			component.soundStateRef.on('value', function (snapshot) {
				if (sync.isMine) return;
				var state = snapshot.val();
				if (!state) return;
				component.el.setAttribute('n-sound', state);
			});
		}
	},
	remove: function () {
		this.soundStateRef.off('value');
		this.soundEventRef.off('value');
	}
});
