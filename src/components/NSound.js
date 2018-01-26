'use strict';

import 'es6-string-polyfills';
import NativeComponent from './NativeComponent';

/**
* @name module:altspace/components.n-sound
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Play a sound from a particular location. Limiting sound duration to 5 seconds
* or less is recommended to prevent hitching when the sound loads. @aframe
* @example <a-entity n-sound='res: effects/fanfare-start; on: begin'></a-entity>
*/
class NSound extends NativeComponent
{
	constructor(){ super('n-sound'); }
	get schema(){
		return {

			/**
			* Play the sound given by the `src` or `res` property from the location
			* of the entity.
			* The resource identifier for a built-in sound clip.
			* @instance
			* @member {string} res
			* @memberof module:altspace/components.n-sound
			*/
			res: { type: 'string' },

			/**
			* A URL to an external sound clip. The sound can be in WAV, OGG or MP3 format. However, only
			* WAV is supported on all platforms. MP3 is supported on Gear VR and OGG is supported on desktop.
			* @instance
			* @member {string} src
			* @memberof module:altspace/components.n-sound
			*/
			src: { type: 'string' },

			/**
			* The name of the event that will play this sound clip.
			* @instance
			* @member {string} on
			* @memberof module:altspace/components.n-sound
			*/
			on: { type: 'string' },

			/**
			* Tells the clip to loop back to the beginning of the clip once it's finished.
			* @instance
			* @member {boolean} loop
			* @default false
			* @memberof module:altspace/components.n-sound
			*/
			loop: { type: 'boolean' },

			/**
			* The volume of the clip, from [0,1].
			* @instance
			* @member {number} volume
			* @default 1
			* @memberof module:altspace/components.n-sound
			*/
			volume: { type: 'number', default: 1 },

			/**
			* Tells the clip to start automatically when the scene loads, instead of waiting for `playSound()`.
			* @instance
			* @member {boolean} autoplay
			* @default false
			* @memberof module:altspace/components.n-sound
			*/
			autoplay: { type: 'boolean' },

			/**
			* Tells the clip to clean itself up when it
			* finishes playing. Allows for overlapping instances of the sound.
			* @instance
			* @member {boolean} oneshot
			* @default false
			* @memberof module:altspace/components.n-sound
			*/
			oneshot: { type: 'boolean' },

			/**
			* How spatialized a sound is, from [0,1].
			* A value of 1 will be fully localized, and the sound will pan left and
			* right as you turn your head. A value of 0 makes it non-spatialized, and
			* it will always be heard in both ears.
			* @instance
			* @member {number} spatialBlend
			* @default 1
			* @memberof module:altspace/components.n-sound
			*/
			spatialBlend: { type: 'float', default: 1 },

			/**
			* The speed multiplier for the sound. 0.5 is one octave down, and 2 is one octave up.
			* @instance
			* @member {number} pitch
			* @default 1
			* @memberof module:altspace/components.n-sound
			*/
			pitch: { type: 'float', default: 1 },

			/**
			* Inside this distance in meters, the sound is at full volume.
			* @instance
			* @member {number} minDistance
			* @default 1
			* @memberof module:altspace/components.n-sound
			*/
			minDistance: { type: 'float', default: 1 },

			/**
			* If rolloff is 'logarithmic', the sound will stop attenuating at this distance in meters.
			* If rolloff is 'linear' or 'cosine', the sound will be silent at this distance.
			* @instance
			* @member {number} maxDistance
			* @default 12
			* @memberof module:altspace/components.n-sound
			*/
			maxDistance: { type: 'float', default: 12 },

			/**
			* Set this to 'linear' or 'cosine' if you want to cut sounds off at a maxDistance.
			* @instance
			* @member {string} rolloff
			* @default "logarithmic"
			* @memberof module:altspace/components.n-sound
			*/
			rolloff: { type: 'string', default: 'logarithmic' },
		};
	}

	init()
	{
		let src = this.data.src;
		if (src && !src.startsWith('http')) {
			if (src.startsWith('/')) {
				this.data.src = location.origin + src;
			}
			else {
				var currPath = location.pathname;
				if (!currPath.endsWith('/')) {
					currPath = location.pathname.split('/').slice(0, -1).join('/') + '/';
				}
				this.data.src = location.origin + currPath + src;
			}

		}
		super.init();
	}

	update(oldData)
	{
		super.update(oldData);
		if (this.playHandler) {
			this.el.removeEventListener(oldData.on, this.playHandler);
		}

		if (this.data.on) {
			this.playHandler = this.playSound.bind(this);
			this.el.addEventListener(this.data.on, this.playHandler);
		}
	}

	remove()
	{
		super.remove();
		if (this.playHandler) {
			this.el.removeEventListener(this.data.on, this.playHandler);
		}
	}

	/**
	* Stop the playing sound, and preserve position in clip.
	* @fires module:altspace/components.n-sound#sound-paused
	*/
	pauseSound() {
		this.callComponent('pause');

		this.el.emit('sound-paused');
	}

	/**
	* Start the sound playing.
	* @fires module:altspace/components.n-sound#sound-played
	*/
	playSound() {
		this.callComponent('play');

		this.el.emit('sound-played');
	}

	/**
	* Jump to a position in the clip.
	* @param {number} time - The time in milliseconds to jump to.
	*/
	seek(time) {
		this.callComponent('seek', {time: time});
	}
}

/**
* Emitted when the sound stops playing
* @event module:altspace/components.n-sound#sound-paused
*/

/**
* Emitted when the sound starts playing
* @event module:altspace/components.n-sound#sound-played
*/

/**
* Fired when a sound has loaded and is ready to be played
* @event module:altspace/components.n-sound#n-sound-loaded
*/

export default NSound;
