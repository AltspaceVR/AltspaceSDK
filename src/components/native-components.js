
/**
* This set of components map to various objects and effects that are provided
* natively by AltspaceVR. Your management of these objects may be limited to
* some degree, but they will tend to be more performant than SDK equivalents,
* or may provide some functionality not otherwise available to the SDK.
* @namespace native
*/
(function () {
	if (!window.altspace || !altspace.inClient) {
		var noop = function () {};
		window.altspace = {
			addNativeComponent: noop,
			updateNativeComponent: noop,
			removeNativeComponent: noop
		};
	}

	var placeholderGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
	var placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
	placeholderMaterial.visible = false;
	var PlaceholderMesh = function () {
		THREE.Mesh.call( this, placeholderGeometry, placeholderMaterial );
	};
	PlaceholderMesh.prototype = Object.create( THREE.Mesh.prototype );
	PlaceholderMesh.prototype.constructor = THREE.PlaceholderMesh;

	function meshInit(mesh) {
		//If you attach native components to an entity, it will not use a default collider
		mesh.userData.altspace = mesh.userData.altspace || {};
		mesh.userData.altspace.collider = mesh.userData.altspace.collider || {};
		mesh.userData.altspace.collider.enabled = false;

		altspace.addNativeComponent(mesh, this.name);
	}

	function nativeComponentInit() {
		var mesh = this.el.getOrCreateObject3D('mesh', PlaceholderMesh);

		meshInit.call(this, mesh);

		//to pass defaults
		this.update(this.data);
	}
	function nativeComponentRemove() {
		var mesh = this.el.getObject3D('mesh');
		altspace.removeNativeComponent(mesh, this.name);
	}
	function nativeComponentUpdate(oldData) {
		altspace.updateNativeComponent(this.el.object3DMap.mesh, this.name, this.data);
	}

	function callComponent(functionName, functionArguments) {
		altspace.callNativeComponent(this.el.object3DMap.mesh, this.name, functionName, functionArguments)
	}


	/**
	* A container keeps a running tally of how many objects are within
	* its bounds, and adds and removes the states `container-full` and
	* `container-empty` based on the current count of objects. Can fire three
	* special events: `container-full`, `container-empty`, and `container-count-changed`.
	* @mixin n-container
	* @memberof native
	* @prop {number} capacity=4 - The value at which the container will fire the
	* `container-full` event.
	*/
	AFRAME.registerComponent('n-container', {
		init: function(){
			nativeComponentInit.call(this);

			var el = this.el;
			var component = this;

			el.addEventListener('stateadded', function(event){
				if(event.detail.state === 'container-full'){
					el.emit('container-full');
				}
				if(event.detail.state === 'container-empty'){
					el.emit('container-empty');
				}
			});

			el.addEventListener('container-count-changed', function(event){
				component.count = event.detail.count;
			});
		},
		remove: nativeComponentRemove,
		update: nativeComponentUpdate,
		schema: {
			capacity: { default: 4, type: 'number' },
		}
	});

	/**
	* Play the sound given by the `src` or `res` property from the location
	* of the entity.
	* @mixin n-sound
	* @memberof native
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
	*/
	/**
	* Fired when a sound has loaded and is ready to be played
	* @event native.n-sound#n-sound-loaded
	*/
	AFRAME.registerComponent('n-sound', {
		init: function () {
			var src = this.data.src;
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
			nativeComponentInit.call(this);
		},

		/**
		* Stop the playing sound, and preserve position in clip.
		* @method native.n-sound#pauseSound
		*/
		pauseSound: function () {
			callComponent.call(this, 'pause');
			this.el.emit('sound-paused');
		},

		/**
		* Start the sound playing.
		* @method native.n-sound#playSound
		*/
		playSound: function () {
			callComponent.call(this, 'play');
			this.el.emit('sound-played');
		},

		/**
		* Jump to a position in the clip.
		* @method native.n-sound#seek
		* @param {number} time - The time in milliseconds to jump to.
		*/
		seek: function (time) {
			callComponent.call(this, 'seek', {time: time});
		},
		remove: function () {
			nativeComponentRemove.call(this);
			if (this.playHandler) {
			  this.el.removeEventListener(oldData.on, this.playHandler);
			}
		},
		update: function (oldData) {
			nativeComponentUpdate.call(this, oldData);
			if (this.playHandler) {
			  this.el.removeEventListener(oldData.on, this.playHandler);
			}
			if (this.data.on) {
			  this.playHandler = this.playSound.bind(this);
			  this.el.addEventListener(this.data.on, this.playHandler);
			}
		},
		schema: {
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
		}
	});

})();

export default null;
