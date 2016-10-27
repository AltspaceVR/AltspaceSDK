if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
AFRAME.registerComponent('editor', {
  _setSelectedObject: function (event) {
      if(event.target.el.dataset.editorAsset) { return; }
      if (this.placingObject) {
        this.placingObject = null;
      this.raycastFloor.userData.altspace.collider.enabled = false;
      }
      this.selectedObject = event.target;
  },
  _moveSelectedObject: function (event) {
    if (!this.selectedObject) { return; }
    var el = this.selectedObject.el
    var pos = Object.assign({}, el.components.position.data);
    switch (event.keyCode) {
      case 'I'.charCodeAt(0): pos.z--; break;
      case 'J'.charCodeAt(0): pos.x--; break;
      case 'K'.charCodeAt(0): pos.z++; break;
      case 'L'.charCodeAt(0): pos.x++; break;
      case 'P'.charCodeAt(0): pos.y+=0.25; break;
      case ';'.charCodeAt(0): pos.y-=0.25; break;
    }
    el.setAttribute('position', pos);
  },
  _placeObject: function (event) {
    if (!this.placingObject) { return; }
    this.raycastFloor.userData.altspace.collider.enabled = true;
    this.raycaster.set(event.ray.origin, event.ray.direction);
    var intersection = this.raycaster.intersectObject(this.raycastFloor)[0];
    if (!intersection) { return; }
    var pos = intersection.point.clone().multiplyScalar(1/this.scene.object3D.scale.x);
    pos.x = Math.ceil(pos.x);
    pos.z = Math.floor(pos.z);
    pos.x += 0.5;
    pos.z -= 0.5;
    this.placingObject.setAttribute('position',  pos);
  },
  _assets: [
    'Architecture/Ceiling_2Wx2L',
    'Architecture/Ceiling_2Wx4L',
    'Architecture/Ceiling_4Wx2L',
    'Architecture/Ceiling_4Wx4L',
    'Architecture/Ceiling_Skylight_4Wx4L',
    'Architecture/Ceiling_Skylight_Corner_2Wx2L',
    'Architecture/Ceiling_Skylight_Edge_2W',
    'Architecture/Ceiling_Skylight_Edge_4W',
    'Architecture/Ceiling_Skylight_Filled_4Wx4L',
    'Architecture/Ceiling_Skylight_Filled2_4Wx4L',
    'Architecture/Ceiling_Slice_Concave_2R',
    'Architecture/Ceiling_Slice_Concave_4R',
    'Architecture/Ceiling_Slice_Convex_2R',
    'Architecture/Ceiling_Slice_Convex_4R',
    'Architecture/Door_4Wx4H',
    'Architecture/Floor_2Wx2L',
    'Architecture/Floor_2Wx4L',
    'Architecture/Floor_4Wx2L',
    'Architecture/Floor_4Wx4L',
    'Architecture/Floor_Slice_Concave_2R',
    'Architecture/Floor_Slice_Concave_4R',
    'Architecture/Floor_Slice_Convex_2R',
    'Architecture/Floor_Slice_Convex_4R',
    'Architecture/Railing_2L',
    'Architecture/Railing_4L',
    'Architecture/Railing_Curve_Concave_2R',
    'Architecture/Wall_2Wx4H',
    'Architecture/Wall_4Wx4H',
    'Architecture/Wall_Base_2W',
    'Architecture/Wall_Base_4W',
    'Architecture/Wall_Base_Curve_Concave_2R',
    'Architecture/Wall_Base_Curve_Concave_4R',
    'Architecture/Wall_Base_Curve_Convex_2R',
    'Architecture/Wall_Base_Curve_Convex_4R',
    'Architecture/Wall_Bulkhead_2W',
    'Architecture/Wall_Bulkhead_4W',
    'Architecture/Wall_Bulkhead_Curve_Concave_2R',
    'Architecture/Wall_Bulkhead_Curve_Concave_4R',
    'Architecture/Wall_Bulkhead_Curve_Convex_2R',
    'Architecture/Wall_Bulkhead_Curve_Convex_4R',
    'Architecture/Wall_Curve_Concave_2Rx4H',
    'Architecture/Wall_Curve_Concave_4Rx4H',
    'Architecture/Wall_Curve_Convex_2Rx4H',
    'Architecture/Wall_Curve_Convex_4Rx4H',
    'Architecture/Wall_Curve_Window_Concave_4Rx4H',
    'Architecture/Wall_Curve_Window_Gap_Concave_4Rx4H',
    'Architecture/Wall_Curve_Window_Gap_End_L_Concave_4Rx4H',
    'Architecture/Wall_Curve_Window_Gap_End_R_Concave_4Rx4H',
    'Architecture/Wall_Filler_Corner_Inner_4H',
    'Architecture/Wall_Filler_Corner_Outer_4H',
    'Architecture/Wall_Window_4Wx4H',
    'Architecture/Wall_Window_GapEnd_R_4Wx4H',
    'Architecture/Wall_Window_Gap_2Wx4H',
    'Architecture/Wall_Window_Gap_4Wx4H',
    'Architecture/Wall_Window_Gap_End_L_2Wx4H',
    'Architecture/Wall_Window_Gap_End_L_4Wx4H',
    'Architecture/Wall_Window_Gap_End_R_2Wx4H',
    'Architecture/Wall_Window2',
    'Architecture/Window_Wall_Curve_Concave_4Rx4H'
  ],
  _setPlacingObject: function (event) {
    var placingObject = document.createElement('a-entity');
    placingObject.setAttribute('native-object', {asset: event.target.el.components['native-object'].data.asset});
    this.placingObject = placingObject;
    this.scene.appendChild(placingObject);
  },
  _addAssetToPalette: function (asset, i) {
    var assetEntity = document.createElement('a-entity');
    assetEntity.dataset.editorAsset = true;
    assetEntity.setAttribute('native-object', {asset: asset});

    // Hack to fix scaling issue
    setTimeout(function (assetEntity) { return function () {
      assetEntity.setAttribute('scale', '0.05 0.05 0.05');
    }}(assetEntity), 500);

    var cols = 3;
    var scale = 1 / 5;
    var spacing = 1 + 1 / 3;
    var pos = {x: (i % cols) * (scale * spacing), y: -Math.floor(i / cols) * (scale * spacing)};

    assetEntity.setAttribute('position', pos);
    assetEntity.object3D.addEventListener('cursordown', this._setPlacingObject.bind(this));
    this.palette.appendChild(assetEntity);
  },
  _createPalette: function () {
    this.palette = document.createElement('a-entity');
    this.palette.id = 'editorPalette';
    this.palette.setAttribute('position', '0 1.5 5');
    this._assets.forEach(this._addAssetToPalette.bind(this));
    this.scene.appendChild(this.palette);
  },
  init: function () {
    this.scene = document.querySelector('a-scene');
    this.scene.object3D.addEventListener('cursordown', this._setSelectedObject.bind(this));
    window.addEventListener('keydown', this._moveSelectedObject.bind(this));

    this.raycastFloor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({color: 'white'}));
    this.raycastFloor.material.visible = false;
    this.raycastFloor.userData.altspace = {collider: {enabled: false}};

    // Hack so that we avoid errors about this non-aframe object
    var noop = function () {}
    this.raycastFloor.el = { removeState: noop, addState: noop, emit: noop};

    this.raycastFloor.rotation.x = -Math.PI / 2;
    this.scene.object3D.add(this.raycastFloor);
    this.raycaster = new THREE.Raycaster();
    this.scene.object3D.addEventListener('cursormove', this._placeObject.bind(this));

    this._createPalette();
  }
});

AFRAME.registerComponent('native', {
  schema: {
	asset: { type: 'string' },
  	attributes: {
  		type: 'string',
  		/*parse: function (value) {
			var ret;
			  try {
				  ret = JSON.parse(value);
			  } catch (e) {}
			  return ret;
  		},
  		stringify: function (value) {
  			var ret;
  			try {
  				ret = JSON.stringify(value);
  			} catch (e) { }
  			return ret;
  		}*/
	  }
  },
  init: function () {
    this.el.setObject3D('native', altspace.instantiateNativeObject(this.data.asset));
  },
  update: function (oldData) {
  	if (this.data.attributes) {
  		altspace._internal.callClientFunction('UpdateNativeAttributes', {
  			MeshId: this.el.object3DMap.native.id,
  			Attributes: this.data.attributes
  		}, { argsType: 'JSTypeUpdateNativeAttributes' });
	}
  },
  remove: function () {
    this.el.removeObject3D('native');
  }
});
//TODO Next: Add and trigger thrust function to the n-rigidbody
(function () {

	function nativeComponentInit() {
		var mesh = this.el.getOrCreateObject3D('mesh', THREE.Mesh);
		altspace._internal.callClientFunction('AddNativeComponent', {
			MeshId: mesh.id,
			Type: this.name
		}, { argsType: 'JSTypeAddNativeComponent' });
	}
	function nativeComponentUpdate(oldData) {
		altspace._internal.callClientFunction('UpdateNativeComponent', {
			MeshId: this.el.object3DMap.mesh.id,
			ComponentName: this.name,
			Attributes: JSON.stringify(this.data),
		}, { argsType: 'JSTypeUpdateNativeComponent' });
	}

	function callComponent(functionName, args) {
		altspace._internal.callClientFunction('CallNativeComponent', {
			MeshId: this.el.object3DMap.mesh.id,
			ComponentName: this.name,
			FunctionName: functionName,
			Arguments: JSON.stringify(args)
		}, { argsType: 'JSTypeCallNativeComponent' });
	}

	function parseBool(boolString) {
		return boolString === 'true';//good enough
	}
	                   
	//TODO: Get them to add type registration to AFRAME
	var vec3bool = {
		default: 'false false false',
		parse: function (value) {
			return value.split(' ').map(parseBool);
		},
		stringify: function (value) {
			return value.join(' ');
		}
	}

	AFRAME.registerComponent('n-sphere-collider', {
		init:nativeComponentInit,
		update: nativeComponentUpdate,
		schema: {
			isTrigger: { default: false, type: 'boolean' },
			radius: { default: '0', type: 'number' },
			center: { type: 'vec3' }
		}
	});

	AFRAME.registerComponent('n-rigidbody', {
		init: function() {
			nativeComponentInit.call(this);
			//todo look at this
			this.addRelativeForce = function(force, mode) {
				callComponent.call(this, 'addRelativeForce', {
					force: force,
					mode: mode || 'impulse'
				});
			}.bind(this);

			this.addForce = function (force, mode) {
				callComponent.call(this, 'addForce', {
					force: force,
					mode: mode || 'impulse'
				});
			}.bind(this);
		},
		update: nativeComponentUpdate,
		schema: {
			mass: { default: 1, type: 'number' },
			drag: { default: 0, type: 'number' },
			angularDrag: { default: 0.05, type: 'number' },
			useGravity: { default: true, type: 'boolean' },
			isKinematic: { default: false, type: 'boolean' },
			positionConstraints: vec3bool,
			rotationConstraints: vec3bool
		}
	});
})();

//Use selector for teleporting
//The attributes may just be better strongly typed. Hmm hard call.
//Maybe some things are just only Primitives like browsers, and some can be used like components (if they are actually native components)
//Primitives for native 
//Demo by remaking D&D including the Tomes
//Point Layout enclsure url at github repo

//TODO: Bug in AFRAME 2.0
//AFRAME.registerPrimitive('n-browser', {
//	defaultComponents: {
//		native: { asset: 'System/Browser' }
//	},
//	mappings: {
//	}
//});

//AFRAME.registerPrimitive('n-browser', {
//	defaultComponents: {
//		native: { asset: 'System/Browser' }
//	},
//	mappings: {
//	}
//});

AFRAME.registerPrimitive('n-entity', {
	defaultComponents: {
		native: {}
	},
	mappings: {
		asset: 'native.asset',
		attributes: 'native.attributes'
	}
});

/**
 * The altspace component makes A-Frame apps compatible with AltspaceVR.
 */
AFRAME.registerComponent('altspace', {

  /**
   * usePixelScale will allow you to use A-Frame units as CSS pixels.
   * This is the default behavior for three.js apps, but not for A-Frame apps.
   * verticalAlign puts the origin at the bottom, middle (default), or top of the Altspace enclosure.
   */
  schema: {
    usePixelScale: { type: 'boolean', default: 'false'},
    verticalAlign: { type: 'string', default: 'middle'}
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    if (!(this.el.object3D instanceof THREE.Scene)) {
      console.warn('aframe-altspace-component can only be attached to a-scene');
      return;
    }

    if (window.altspace && window.altspace.inClient) {
      this.el.setAttribute('vr-mode-ui', {enabled: false});
      this.initRenderer();
      this.initCursorEvents();
    } else {
      console.warn('aframe-altspace-component only works inside of AltspaceVR');
    }

  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },


  /********** Helper Methods **********/

  /**
   * Swap in Altspace renderer when running in AltspaceVR.
   */
  initRenderer: function () {

    var scene = this.el.object3D;
    if (!this.data.usePixelScale) {
      altspace.getEnclosure().then(function(e) {
        scene.scale.multiplyScalar(e.pixelsPerMeter);
      });
    }
    var verticalAlign = this.data.verticalAlign;
    if (verticalAlign !== 'center') {
      altspace.getEnclosure().then(function(e) {
        switch (verticalAlign) {
          case 'bottom':
            scene.position.y -= e.innerHeight / 2;
            break;
          case 'top':
            scene.position.y += e.innerHeight / 2;
            break;
          default:
            console.warn('Unexpected value for verticalAlign: ', this.data.verticalAlign);
        }
      });
    }
    var renderer = this.el.renderer = this.el.effect = altspace.getThreeJSRenderer();
    var noop = function() {};
    renderer.setSize = noop;
    renderer.setPixelRatio = noop;
    renderer.setClearColor = noop;
    renderer.clear = noop;
    renderer.enableScissorTest = noop;
    renderer.setScissor = noop;
    renderer.setViewport = noop;
    renderer.getPixelRatio = noop;
    renderer.getMaxAnisotropy = noop;
    renderer.setFaceCulling = noop;
    renderer.context = {canvas: {}};
    renderer.shadowMap = {};

  },

  /**
   * Emulate A-Frame cursor events when running in altspaceVR.
   */
  initCursorEvents: function() {

    var scene = this.el.object3D;
    var cursorEl = document.querySelector('a-cursor') || document.querySelector('a-entity[cursor]');
    if (cursorEl) {
      // Hide A-Frame cursor mesh.
      cursorEl.setAttribute('material', 'transparent', true);
      cursorEl.setAttribute('material', 'opacity', 0.0);
    }

    var emit = function (eventName, event) {
    	// Fire events on intersected object and A-Frame cursor.
    	var targetEl = event.target.el;
    	if (cursorEl) cursorEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
    	if (targetEl) targetEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
    } ;

    var cursordownObj = null;
    scene.addEventListener('cursordown', function(event) {
      cursordownObj = event.target;
      emit('mousedown', event);
    });

    scene.addEventListener('cursorup', function(event) {
      emit('mouseup', event);
      if (event.target.uuid === cursordownObj.uuid) {
        emit('click', event);
      }
      cursordownObj = null;
    });

    scene.addEventListener('cursorenter', function(event) {
      if (!event.target.el) { return; }
      event.target.el.addState('hovered');
      if (cursorEl) cursorEl.addState('hovering');
      emit('mouseenter', event);
    });

    scene.addEventListener('cursorleave', function(event) {
      if (!event.target.el) { return; }
      event.target.el.removeState('hovered');
      if (cursorEl) cursorEl.removeState('hovering');
      emit('mouseleave', event);
    });

  },

});

AFRAME.registerComponent('altspace-tracked-controls', {
  init: function () {
    this.gamepadIndex = null;
    this.trackedControlsSystem = document.querySelector('a-scene').systems['tracked-controls'];
    this.systemGamepads = 0;
    altspace.getGamepads();
  },
  tick: function () {
      if (
        this.trackedControlsSystem &&
        this.systemGamepads !== this.trackedControlsSystem.controllers.length &&
        window.altspace && altspace.getGamepads && altspace.getGamepads().length
      ) {
        var components = this.el.components;
        if (components['paint-controls']) {
          this.gamepadIndex = components['paint-controls'].data.hand === 'left' ? 2 : 1;
        }
        if (this.gamepadIndex === null && components['hand-controls']) {
          this.gamepadIndex = components['hand-controls'].data === 'left' ? 2 : 1;
        }
        if (this.gamepadIndex === null && components['vive-controls']) {
          this.gamepadIndex = components['vive-controls'].data.hand === 'left' ? 2 : 1;
        }
        if (this.gamepadIndex === null && components['tracked-controls']) {
          this.gamepadIndex = components['tracked-controls'].data.controller;
        }
        this.el.setAttribute('tracked-controls', 'id', altspace.getGamepads()[this.gamepadIndex].id);
        this.el.setAttribute('tracked-controls', 'controller', 0);
        this.systemGamepads = this.trackedControlsSystem.controllers.length;
      }
  }
});

AFRAME.registerSystem('sync-system',
{
    schema: {
        author: { type: 'string', default: null },
        app: { type: 'string', default: null },
        instance: { type: 'string', default: null },
        'ref-url': { type: 'string', default: null },
    },
    init: function() {
        altspace.utilities.sync.connect({
            authorId: this.data.author,
            appId: this.data.app,
            instanceId: this.data.instance,
            baseRefUrl: this.data['ref-url']
        }).then(function(connection) {
            this.connection = connection;
            this.sceneEl.emit('connected', null, false);

            this.sceneRef = this.connection.instance.child('scene');
            this.clientsRef = this.connection.instance.child('clients');

            // temporary way of having unique identifiers for each client
            var clientId = this.sceneEl.object3D.uuid;
            var masterClientId;
            this.clientsRef.on("value", function (snapshot) {
                var clientIds = snapshot.val();

                if (!clientIds) return;

                var masterClientKey = Object.keys(clientIds)[0];
                masterClientId = clientIds[masterClientKey];
            });

            // add our client ID to the list of connected clients, 
            // but have it be automatically removed by firebase if we disconnect for any reason
            this.clientsRef.push(clientId).onDisconnect().remove();

            this.connection.instance.child('initialized').once('value', function (snapshot) {
                var shouldInitialize = !snapshot.val();
                snapshot.ref().set(true);

                this.sceneEl.emit('instanceready', { shouldInitialize: shouldInitialize }, false);
                //todo: change this to an event. Perhaps also do this for creators and destroyers
            }.bind(this));


            Object.defineProperty(this, 'isMasterClient', {
                get: function () { return masterClientId === clientId; }
            });
        }.bind(this));
    }
});

//var syncSystem = function (instanceRef, config) {
//    var sceneRef = instanceRef.child('scene');
//    var clientsRef = instanceRef.child('clients');

//    config = config || {};
//    var instantiators = config.instantiators || {};
//    var destroyers = config.destroyers || {};

//    var autoSendRateMS = 100;

//    var syncBehaviors = [];
//    var objectForKey = {};
//    var keyForUuid = {};

//    var clientId;
//    // there should always be one master client in the room. For now it will be the longest person online.
//    var masterClientId;

//    function autoSendAll() {
//        for (var i = 0, max = syncBehaviors.length; i < max; i++) {
//            syncBehaviors[i].autoSend();
//        }
//    }

//    function awake(o, s) {
//        setInterval(autoSendAll, autoSendRateMS);

//        var scene = s;

//        // temporary way of having unique identifiers for each client
//        clientId = scene.uuid;
//        clientsRef.on("value", function (snapshot) {
//            var clientIds = snapshot.val();

//            if (!clientIds) return;

//            masterClientKey = Object.keys(clientIds)[0];
//            masterClientId = clientIds[masterClientKey];
//        });
//        // add our client ID to the list of connected clients, 
//        // but have it be automatically removed by firebase if we disconnect for any reason
//        clientsRef.push(clientId).onDisconnect().remove();

//        instanceRef.child('initialized').once('value', function (snapshot) {
//            var shouldInitialize = !snapshot.val();
//            snapshot.ref().set(true);
//            if (config.ready) {
//                config.ready(shouldInitialize);
//            }
//        });


//        sceneRef.on('child_added', onInstantiate.bind(this));
//        sceneRef.on('child_removed', onDestroy.bind(this));
//    }

//    /**
//     * Instantiate an object by syncType.
//     * @instance
//     * @method instantiate
//     * @param {String} syncType Type of object to instantiate.
//     * @param {Object} initData An object containing initialization data, passed
//     *  to the instantiator.
//     * @param {Boolean} destroyOnDisconnect If the object should be destroyed
//     *  across all synced instance when the instantiating instance disconnects.
//     * @memberof module:altspace/utilities/behaviors.SceneSync
//     */
//    function instantiate(syncType, initData, destroyOnDisconnect) {
//        initData = initData || {};
//        var objectRef = sceneRef.push({ syncType: syncType, initData: initData },
//            function (error) { if (error) throw Error('Failed to save to Firebase', error) }
//        );
//        if (destroyOnDisconnect) {
//            objectRef.onDisconnect().remove();//send remvoe_child to remote clients
//        }
//        //instantiation done, local child_added callback happens syncronously with push
//        var object = objectForKey[objectRef.key()];
//        object.getBehaviorByType('Object3DSync').takeOwnership();
//        return object;
//    }

//    function onInstantiate(snapshot) {

//        var data = snapshot.val();
//        var key = snapshot.key();

//        var instantiator = instantiators[data.syncType];

//        if (!instantiator) {
//            console.warn('No instantiator found for syncType: ' + data.syncType);
//            return;
//        }

//        var object3d = instantiator(data.initData, data.syncType);
//        if (!object3d) {
//            console.error(data.syncType + '.create must return an Object3D');
//            return;
//        }
//        objectForKey[key] = object3d;
//        keyForUuid[object3d.uuid] = key;

//        var syncBehavior = object3d.getBehaviorByType('Object3DSync');
//        if (!syncBehavior) {
//            console.error(data.syncType + ' instantiator must return an Object3D with an Object3DSync behavior');
//            return;
//        }

//        syncBehaviors.push(syncBehavior);
//        syncBehavior.link(snapshot.ref(), this);
//    }
//    function destroy(object3d) {
//        var key = keyForUuid[object3d.uuid];
//        if (!key) {
//            console.warn('Failed to find key for object3d to be destroyed', object3d);
//            return;
//        }
//        sceneRef.child(key).remove(function (error) {
//            if (error) console.warn('Failed to remove from Firebase', error);
//        });
//        sceneRef.child(key).off();//detach all callbacks
//    }

//    function onDestroy(snapshot) {
//        var data = snapshot.val();
//        var key = snapshot.key();
//        var object3d = objectForKey[key];
//        if (!object3d) {
//            console.warn('Failed to find object matching deleted key', key);
//            return;
//        }
//        var syncType = data.syncType;
//        if (!syncType) {
//            console.warn('No syncType found for object being destroyed', object3d);
//            return;
//        }

//        function defaultDestroyer(object3d) {

//            // remove all behaviors including this one
//            object3d.removeAllBehaviors();

//            // remove from scene or parent
//            if (object3d.parent) {
//                object3d.parent.remove(object3d);
//            }

//            if (object3d.geometry) {
//                object3d.geometry.dispose();
//            }

//            if (object3d.material) {
//                if (object3d.material.map) {
//                    object3d.material.map.dispose();
//                }
//                object3d.material.dispose();
//            }
//        }

//        var customDestroyer = destroyers[syncType];
//        var shouldDefaultDestroy = !customDestroyer;

//        if (customDestroyer) {

//            // returning true from a destroyer will additionally invoke the default destroyer
//            shouldDefaultDestroy = customDestroyer(object3d);
//        }

//        if (shouldDefaultDestroy) defaultDestroyer(object3d);

//        //remove from our local bookkeeping
//        delete objectForKey[key];
//        delete keyForUuid[object3d.uuid];
//    }

//    var exports = {
//        awake: awake,
//        instantiate: instantiate,
//        destroy: destroy,
//        type: 'SceneSync'
//    };
//    Object.defineProperty(exports, 'autoSendRateMS', {
//        get: function () { return autoSendRateMS; }
//    });
//    Object.defineProperty(exports, 'isMasterClient', {
//        get: function () { return masterClientId === clientId; }
//    });
//    Object.defineProperty(exports, 'clientId', {
//        get: function () { return clientId; }
//    });
//    Object.defineProperty(exports, 'clientsRef', {
//        get: function () { return clientsRef; }
//    });
//    return exports;
//};



//var syncComponent = function () {

//    var object3d;
//    var scene;
//    var ref;
//    var key;
//    var dataRef;
//    var ownerRef;
//    var transformRef;

//    var sceneSync;
//    var isMine = false;

//    var position = new THREE.Vector3();
//    var quaternion = new THREE.Quaternion();
//    var scale = new THREE.Vector3();
//    var isEqual = require('lodash.isequal');


//    function link(objectRef, sS) {
//        ref = objectRef;
//        key = ref.key();
//        transformRef = ref.child('batch');
//        dataRef = ref.child('data');
//        ownerRef = ref.child('owner');
//        sceneSync = sS;
//    }

//    //TODO: lerp
//    function setupReceive() {
//        transformRef.on('value', function (snapshot) {

//            if (isMine) return;

//            var value = snapshot.val();
//            if (!value) return;

//            if (config.position) {
//                object3d.position.set(value.position.x, value.position.y, value.position.z);
//            }
//            if (config.rotation) {
//                object3d.quaternion.set(value.quaternion.x, value.quaternion.y, value.quaternion.z, value.quaternion.w);
//            }
//            if (config.scale) {
//                object3d.scale.set(value.scale.x, value.scale.y, value.scale.z);
//            }
//        });

//        ownerRef.on('value', function (snapshot) {
//            var newOwnerId = snapshot.val();

//            var gained = newOwnerId === sceneSync.clientId && !isMine;
//            if (gained) object3d.dispatchEvent({ type: 'ownershipgained' });

//            var lost = newOwnerId !== sceneSync.clientId && isMine;
//            if (lost) object3d.dispatchEvent({ type: 'ownershiplost' });

//            isMine = newOwnerId === sceneSync.clientId;
//        });
//    }

//    function send() {
//        if (!isMine) return;

//        var transform = {};
//        if (config.world) {
//            object3d.updateMatrixWorld();//call before sending to avoid being a frame behind
//            object3d.matrixWorld.decompose(position, quaternion, scale);
//        } else {
//            position = object3d.position;
//            quaternion = object3d.quaternion;
//            scale = object3d.scale;
//        }
//        if (config.position) {
//            transform.position = {
//                x: position.x,
//                y: position.y,
//                z: position.z
//            };
//        }
//        if (config.rotation) {
//            transform.quaternion = {
//                x: quaternion.x,
//                y: quaternion.y,
//                z: quaternion.z,
//                w: quaternion.w
//            };
//        }
//        if (config.scale) {
//            transform.scale = {
//                x: scale.x,
//                y: scale.y,
//                z: scale.z
//            };
//        }
//        if (Object.keys(transform).length > 0) {
//            if (isEqual(transform, this.lastTransform)) { return; }
//            transformRef.set(transform);
//            this.lastTransform = transform;
//        }
//    }

//    function awake(o, s) {
//        object3d = o;
//        scene = s;

//        setupReceive();
//    }

//    function takeOwnership() {
//        ownerRef.set(sceneSync.clientId);
//    }

//    var exports = { init: awake, type: 'Object3DSync', link: link, autoSend: send, takeOwnership: takeOwnership };

//    Object.defineProperty(exports, 'dataRef', {
//        get: function () {
//            return dataRef;
//        }
//    });

//    Object.defineProperty(exports, 'isMine', {
//        get: function () {
//            return isMine;
//        }
//    });

//    return exports;
//};

AFRAME.registerComponent('sync',
{
    schema: {
        mode: {default:'link'}
    },
    init: function(){
        if(this.data.mode === 'link') {
            var id = this.el.id;
            if (!id) {
                console.error('Entities cannot be synced using link mode without an id.');
                return;
            }
        }
    }
});

