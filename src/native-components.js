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

	AFRAME.registerComponent('n-object', {
		schema: {
			type: 'string'
		},
		init: nativeComponentInit,
		update: nativeComponentUpdate,
		remove: nativeComponentRemove
	});

	AFRAME.registerComponent('n-spawner', {
		schema: {
			res: {type: 'string'}
		},
		init: nativeComponentInit,
		update: nativeComponentUpdate,
		remove: nativeComponentRemove
	});

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
	AFRAME.registerComponent('n-sphere-collider', {
		init:nativeComponentInit,
		remove: nativeComponentRemove,
		update: nativeComponentUpdate,
		schema: {
			isTrigger: { default: false, type: 'boolean' },
			center: { type: 'vec3' },
			radius: { default: '0', type: 'number' },
			type: {default: 'object'}
		}
	});

	AFRAME.registerComponent('n-box-collider', {
		init:nativeComponentInit,
		remove: nativeComponentRemove,
		update: nativeComponentUpdate,
		schema: {
			isTrigger: { default: false, type: 'boolean' },
			center: { type: 'vec3' },
			size: { type: 'vec3' },
			type: {default: 'object'}
		}
	});

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
			type: {default: 'object'}
		}
	});

	AFRAME.registerComponent('n-mesh-collider', {
		init:nativeComponentInit,
		remove: nativeComponentRemove,
		update: nativeComponentUpdate,
		schema: {
			isTrigger: { default: false, type: 'boolean' },
			convex: { default: true, type: 'boolean' },
			type: {default: 'object'}
		}
	});

	AFRAME.registerComponent('n-billboard', {
		init:nativeComponentInit,
		remove: nativeComponentRemove,
	});

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

	AFRAME.registerComponent('n-sound', {
		init: function () {
			nativeComponentInit.call(this);
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
		},
		pauseSound: function () {
			callComponent.call(this, 'pause');
			this.el.emit('sound-paused');
		},
		playSound: function () {
			callComponent.call(this, 'play');
			this.el.emit('sound-played');
		},
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