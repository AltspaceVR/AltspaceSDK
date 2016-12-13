
/**
* This set of components map to various objects and effects that are provided
* natively by AltspaceVR. Your management of these objects may be limited to
* some degree, but they will tend to be more performant than SDK equivalents,
* or may provide some functionality not otherwise available to the SDK.
* @namespace n
*/
(function () {

	var placeholderGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
	var placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
	placeholderMaterial.visible = false;
	var PlaceholderMesh = function () {
		THREE.Mesh.call( this, placeholderGeometry, placeholderMaterial );
	};
	PlaceholderMesh.prototype = Object.create( THREE.Mesh.prototype );
	PlaceholderMesh.prototype.constructor = THREE.PlaceholderMesh;

	function nativeComponentInit() {
		var mesh = this.el.getOrCreateObject3D('mesh', PlaceholderMesh);

		//If you attach native components to an entity, it will not use a default collider
		mesh.userData.altspace = mesh.userData.altspace || {};
		mesh.userData.altspace.collider = mesh.userData.altspace.collider || {};
		mesh.userData.altspace.collider.enabled = false;

		//Unless the entity already had a geometry
		if (!(mesh instanceof PlaceholderMesh)) {
			mesh.userData.altspace.collider.enabled = true
		}

		altspace.addNativeComponent(mesh, this.name);
		this.update(this.data);//to pass defaults
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
    * Creates a native object on this
    * entity. The nature of these objects vary.
    * @mixin n-object
	* @memberof n
    * @prop {string} query - The identifier for the resource you want.
    * @example <a-entity n-object='architecture/wall-4w-4h'></a-entity>
    */
	AFRAME.registerComponent('n-object', {
		schema: {
			type: 'string'
		},
		init: nativeComponentInit,
		update: nativeComponentUpdate,
		remove: nativeComponentRemove
	});

	/**
    * Create an object that spawns additional non-spawning copies of itself.
	* These copies will be physically interactive and automatically synchronized
	* between users. Only some native resources can be spawned.
    * @mixin n-spawner
	* @memberof n
    * @prop {string} res - The identifier for the resource you want.
    * @example <a-entity n-spawner='res: interactables/basketball'></a-entity>
    */
	AFRAME.registerComponent('n-spawner', {
		schema: {
			res: {type: 'string'}
		},
		init: nativeComponentInit,
		update: nativeComponentUpdate,
		remove: nativeComponentRemove
	});

	/**
    * Creates dynamic 2D text on the entity. The text will wrap automatically based on the width and height provided.
    * This text will be clearer than texture-based text and more performant than geometry-based test.
    * @mixin n-text
	* @memberof n
    * @prop {string} text - The text to be drawn.
    * @prop {number} fontSize=10 - The height of the letters. 10pt ~= 1m
    * @prop {number} width=10 - The width of the text area in meters. If the
    * text is wider than this value, the overflow will be wrapped to the next line.
    * @prop {number} height=1 - The height of the text area in meters. If the
    * text is taller than this value, the overflow will be cut off.
    * @prop {string} horizontalAlign=middle - The horizontal anchor point for
    * the text. Can be `left`, `middle`, or `right`.
    * @prop {string} verticalAlign=middle - The vertical anchor point for the
    * text. Can be `top`, `middle`, or `bottom`.
    */
	AFRAME.registerComponent('n-text', {
		init: nativeComponentInit,
		update: nativeComponentUpdate,
		remove: nativeComponentRemove,
		schema: {
			text: { default: '', type: 'string' },
			/*color: { default: 'white',
				parse: function(value) {
					return parseFloat(value, 10);
				},
				stringify: function(value) {
					return value.toString();
				}},*/
			fontSize: { default: '10', type: 'int' },//roughly a meter tall
			width: { default: '10', type: 'number' },//in meters
			height: { default: '1', type: 'number' },//in meters
			horizontalAlign: { default: 'middle'},
			verticalAlign: { default: 'middle'}
		}
	});

	//object: collides against: objects / enviroment / cursor
	//environment: can be teleported onto, and collides against: objects / environment / cursor
	//hologram: collides against: cursor / holograms

	/**
	* Abstract base class for {@link n.n-sphere-collider}, {@link n.n-box-collider},
	* {@link n.n-capsule-collider}, and {@link n.n-mesh-collider}. You cannot use
	* this class directly, but instead you should add one of those components
	* to your objects.
	* @name n-collider
	* @mixin n-collider
	* @memberof n
    * @prop {vec3} center=0,0,0 - The offset of the collider in local space.
	* @prop {string} type=hologram - The type of collider, one of: `object` | `environment` | `hologram`.
	* Object colliders collide with other objects, the environment, and the cursor.
	* Environment colliders collide with everything objects do, but you can also
	* teleport onto them. Hologram colliders only collide with other holograms and
	* the cursor.
	*/

    /**
    * Create a spherical collider on this entity.
    * @mixin n-sphere-collider
	* @memberof n
	* @extends n.n-collider
    * @prop {number} radius=1 - The size of the collider in meters.
    */
	AFRAME.registerComponent('n-sphere-collider', {
		init:nativeComponentInit,
		remove: nativeComponentRemove,
		update: nativeComponentUpdate,
		schema: {
			isTrigger: { default: false, type: 'boolean' },
			center: { type: 'vec3' },
			radius: { default: '0', type: 'number' },
			type: {default: 'hologram'}
		}
	});


	/**
    * Create a box-shaped collider on this entity.
    * @mixin n-box-collider
	* @memberof n
	* @extends n.n-collider
    * @prop {vec3} size=1,1,1 - The dimensions of the collider.
    */
	AFRAME.registerComponent('n-box-collider', {
		init:nativeComponentInit,
		remove: nativeComponentRemove,
		update: nativeComponentUpdate,
		schema: {
			isTrigger: { default: false, type: 'boolean' },
			center: { type: 'vec3' },
			size: { type: 'vec3' },
			type: {default: 'hologram'}
		}
	});

	/**
    * Create a capsule-shaped collider on this entity. Capsules
    * are a union of a cylinder and two spheres on top and bottom.
    * @mixin n-capsule-collider
	* @memberof n
	* @extends n.n-collider
    * @prop {number} radius=1 - The radius of the capsule in meters.
    * @prop {number} height=1 - The height of the shaft of the capsule in meters.
    * @prop {string} direction=y - The axis with which the capsule is aligned.
    * One of `x`, `y`, or `z`.
    */
	AFRAME.registerComponent('n-capsule-collider', {
		init:nativeComponentInit,
		remove: nativeComponentRemove,
		update: nativeComponentUpdate,
		schema: {
			isTrigger: { default: false, type: 'boolean' },
			center: { type: 'vec3' },
			radius: { default: '0', type: 'number' },
			height: { default: '0', type: 'number' },
			direction: { default: 'y' },
			type: {default: 'hologram'}
		}
	});

	/**
    * Enable collision for the entire attached mesh. This is expensive to evaluate, so should only be used on
    * low-poly meshes.
    * @mixin n-mesh-collider
	* @memberof n
	* @extends n.n-collider
    * @example <a-box n-mesh-collider></a-box>
    */
	AFRAME.registerComponent('n-mesh-collider', {
		init:nativeComponentInit,
		remove: nativeComponentRemove,
		update: nativeComponentUpdate,
		schema: {
			isTrigger: { default: false, type: 'boolean' },
			convex: { default: true, type: 'boolean' },
			type: {default: 'hologram'}
		}
	});

	/**
    * Make the object always face the viewer. An object's "forward" direction is
	* its -Z axis.
    * @mixin n-billboard
	* @memberof n
    * @example <a-plane n-billboard></a-plane>
    */
	AFRAME.registerComponent('n-billboard', {
		init:nativeComponentInit,
		remove: nativeComponentRemove,
	});

	/**
    * A container keeps a running tally of how many objects are within
    * its bounds, and adds and removes the states `container-full` and
	* `container-empty` based on the current count of objects. Can fire three
	* special events: `container-full`, `container-empty`, and `container-count-changed`.
    * @mixin n-container
	* @memberof n
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
	* @memberof n
    * @prop {string} res - The resource identifier for a built-in sound clip.
	* @prop {string} src - A URL to an external sound clip.
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
	* @prop {number} maxDistance=12 - Beyond this distance in meters, the sound
	* will rapidly fall off to silence.

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
		* @method n.n-sound#pauseSound
		*/
		pauseSound: function () {
			callComponent.call(this, 'pause');
			this.el.emit('sound-paused');
		},

		/**
		* Start the sound playing.
		* @method n.n-sound#playSound
		*/
		playSound: function () {
			callComponent.call(this, 'play');
			this.el.emit('sound-played');
		},

		/**
		* Jump to a position in the clip.
		* @method n.n-sound#seek
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
		}
	});

})();
