'use strict';

import NativeComponent from './NativeComponent';

/**
* Play the sound given by the `src` or `res` property from the location
* of the entity.
* @prop {string} res - The resource identifier for a built-in sound clip.
* @prop {string} src - A URL to an external sound clip. The sound can be in WAV, OGG or MP3 format. However. only
* WAV is supported on all platforms. MP3 is supported on Gear VR and OGG is supported on desktop.
* @prop {string} on - The name of the event that will play this sound clip.
* @prop {boolean} loop=false - Tells the clip to loop back to the beginning of the clip
* once it's finished.
* @prop {boolean} autoplay=false - Tells the clip to start automatically when
* the scene loads, instead of waiting for `playSound()`.
* @prop {boolean} oneshot=false - Tells the clip to clean itself up when it
* finishes playing. Allows for overlapping instances of the sound.
* @prop {number} volume=1 - The volume of the clip, from [0,1].
* @prop {number} spatialBlend=1 - How spatialized a sound is, from [0,1].
* A value of 1 will be fully localized, and the sound will pan left and
* right as you turn your head. A value of 0 makes it non-spatialized, and
* it will always be heard in both ears.
* @prop {number} pitch=1 - The speed multiplier for the sound. 0.5 is one
* octave down, and 2 is one octave up.
* @prop {number} minDistance=1 - Inside this distance in meters,
* the sound volume is at full volume.
* @prop {number} maxDistance=12 - If rolloff is 'logarithmic', the sound will stop attenuating at this distance.
* If rolloff is 'linear' or 'cosine', the sound will be silent at this distance.
* @prop {string} rolloff='logarithmic' - Set this to 'linear' or 'cosine' if you want to cut sounds off at a
* maxDistance.
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NSound extends NativeComponent
{
	constructor(){ super('n-sound'); }
	get schema(){
		return {
			on: { type: 'string' },
			res: { type: 'string' },
			src: { type: 'string' },
			loop: { type: 'boolean' },
			volume: { type: 'number', default: 1 },
			autoplay: { type: 'boolean' },
			oneshot: { type: 'boolean' },
			spatialBlend: { type: 'float', default: 1 },
			pitch: { type: 'float', default: 1 },
			minDistance: { type: 'float', default: 1 },
			maxDistance: { type: 'float', default: 12 },
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
		  this.el.removeEventListener(oldData.on, this.playHandler);
		}
	}

	/**
	* Stop the playing sound, and preserve position in clip.
	*/
	pauseSound() {
		this.callComponent('pause');

		/**
		* Emitted when the sound stops playing
		* @event sound-paused
		* @memberof module:altspace/components.NSound
		*/
		this.el.emit('sound-paused');
	}

	/**
	* Start the sound playing.
	*/
	playSound() {
		this.callComponent('play');

		/**
		* Emitted when the sound starts playing
		* @event sound-played
		* @memberof module:altspace/components.NSound
		*/
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
* Fired when a sound has loaded and is ready to be played
* @event n-sound-loaded
* @memberof module:altspace/components.NSound
*/

export default NSound;
