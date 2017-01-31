(function (exports) {
'use strict';

var AFrameSystem = function AFrameSystem () {};

var prototypeAccessors = { schema: {} };

prototypeAccessors.schema.get = function (){
	return null;
};

AFrameSystem.prototype.init = function init (){ };
AFrameSystem.prototype.tick = function tick (time, timeDelta){ };
AFrameSystem.prototype.pause = function pause (){ };
AFrameSystem.prototype.play = function play (){ };

Object.defineProperties( AFrameSystem.prototype, prototypeAccessors );

var AFrameComponent = (function (AFrameSystem) {
	function AFrameComponent () {
		AFrameSystem.apply(this, arguments);
	}

	if ( AFrameSystem ) AFrameComponent.__proto__ = AFrameSystem;
	AFrameComponent.prototype = Object.create( AFrameSystem && AFrameSystem.prototype );
	AFrameComponent.prototype.constructor = AFrameComponent;

	AFrameComponent.prototype.update = function update (oldData){ };
	AFrameComponent.prototype.remove = function remove (){ };
	AFrameComponent.prototype.updateSchema = function updateSchema (data){ };

	return AFrameComponent;
}(AFrameSystem));

function flatten(obj)
{
	var ret = {};
	if(!obj.__proto__){
		ret = Object.assign( {schema: {}, dependencies: []}, obj );
	}
	else {
		ret = Object.assign( flatten(obj.__proto__), obj );
	}

	if(obj.schema)
		{ Object.assign(ret.schema, obj.schema); }

	if(obj.dependencies)
		{ (ref = ret.dependencies).push.apply(ref, obj.dependencies); }

	return ret;
	var ref;
}

function registerComponentClass(name, cls)
{
	AFRAME.registerComponent(name, flatten(new cls(true)));
}

function registerSystemClass(name, cls)
{
	AFRAME.registerSystem(name, flatten(new cls(true)));
}

function safeDeepSet(obj, keys, value)
{
	if(keys.length === 0)
		{ return value; }
	else {
		obj[keys[0]] = safeDeepSet(obj[keys[0]] || {}, keys.slice(1), value);
		return obj;
	}
}

/**
* Enable or disable cursor collision on the object.
* @mixin altspace-cursor-collider
* @memberof altspace
* @prop {boolean} enabled=true - The state of the cursor collider.
*/

var AltspaceCursorCollider = (function (AFrameComponent$$1) {
	function AltspaceCursorCollider () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) AltspaceCursorCollider.__proto__ = AFrameComponent$$1;
	AltspaceCursorCollider.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	AltspaceCursorCollider.prototype.constructor = AltspaceCursorCollider;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {enabled: {type: 'boolean', default: 'true'}};
	};

	AltspaceCursorCollider.prototype.init = function init ()
	{
		var this$1 = this;

		this.setColliderFlag(this.data.enabled);
		this.el.addEventListener('model-loaded', (function () {
			this$1.setColliderFlag(this$1.data.enabled);
		}).bind(this));
	};

	AltspaceCursorCollider.prototype.update = function update ()
	{
		this.setColliderFlag(this.data.enabled);
	};

	AltspaceCursorCollider.prototype.setColliderFlag = function setColliderFlag (state)
	{
		var obj = this.el.object3D;
		if(obj){
			console.log('Setting collider flag to', state);
			safeDeepSet(obj.userData, ['altspace','collider','enabled'], state);
			obj.traverse(function (subobj) {
				if( subobj instanceof THREE.Mesh ){
					safeDeepSet(subobj.userData, ['altspace','collider','enabled'], state);
				}
			});
		}
	};

	Object.defineProperties( AltspaceCursorCollider.prototype, prototypeAccessors );

	return AltspaceCursorCollider;
}(AFrameComponent));

/**
* Enables tracked control support for A-Frame applications that use the built-in
* `tracked-controls`, `vive-controls` or `hand-controls` components.
* @mixin altspace-tracked-controls
* @memberof altspace
*/
var AltspaceTrackedControls = (function (AFrameComponent$$1) {
	function AltspaceTrackedControls () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) AltspaceTrackedControls.__proto__ = AFrameComponent$$1;
	AltspaceTrackedControls.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	AltspaceTrackedControls.prototype.constructor = AltspaceTrackedControls;

	AltspaceTrackedControls.prototype.init = function init ()
	{
		this.gamepadIndex = null;
		this.trackedControlsSystem = document.querySelector('a-scene').systems['tracked-controls'];
		this.systemGamepads = 0;
		altspace.getGamepads();
	};

	AltspaceTrackedControls.prototype.tick = function tick ()
	{
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
	};

	return AltspaceTrackedControls;
}(AFrameComponent));

/**
* @namespace altspace
*/

/**
* The altspace component makes A-Frame apps compatible with AltspaceVR.
*
* **Note**: If you use the `embedded` A-Frame component on your scene, you must include it *before* the `altspace` component, or your app will silently fail.
* @mixin altspace
* @memberof altspace
* @property {boolean} usePixelScale=`false` - Allows you to use A-Frame units as CSS pixels.
* This is the default behavior for three.js apps, but not for A-Frame apps.
* @property {string} verticalAlign=`middle` - Puts the origin at the `bottom`, `middle` (default),
* or `top` of the Altspace enclosure.
* @property {boolean} enclosuresOnly=`true` - Prevents the scene from being created if
* enclosure is flat.
* @property {boolean} fullspace=`false` - Puts the app into fullspace mode.
*
* @example
* <head>
*   <title>My A-Frame Scene</title>
*   <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
*   <script src="https://cdn.rawgit.com/AltspaceVR/aframe-altspace-component/vAFRAME_ALTSPACE_VERSION/dist/aframe-altspace-component.min.js"></script>
* </head>
* <body>
*   <a-scene altspace>
*     <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
*   </a-scene>
* </body>
*/
var AltspaceComponent = (function (AFrameComponent$$1) {
	function AltspaceComponent () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) AltspaceComponent.__proto__ = AFrameComponent$$1;
	AltspaceComponent.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	AltspaceComponent.prototype.constructor = AltspaceComponent;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {
			usePixelScale: { type: 'boolean', default: 'false'},
			verticalAlign: { type: 'string',  default: 'middle'},
			enclosuresOnly:{ type: 'boolean', default: 'true'},
			fullspace:     { type: 'boolean', default: 'false'}
		}
	};

	AltspaceComponent.prototype.init = function init ()
	{
		this.version = 'AFRAME_ALTSPACE_VERSION';
		if(!this.el.object3D instanceof THREE.Scene){
			console.warn('aframe-altspace-component can only be attached to a-scene');
			return;
		}

		if (window.altspace && window.altspace.inClient) {
			this.el.setAttribute('vr-mode-ui', {enabled: false});
			this.initRenderer();
			this.initCursorEvents();
			this.initCollisionEvents();
		}
		else {
			console.warn('aframe-altspace-component only works inside of AltspaceVR');
		}
	};

	AltspaceComponent.prototype.tick = function tick (t, dt)
	{
		if(this.el.object3D.updateAllBehaviors)
			{ this.el.object3D.updateAllBehaviors(); }
	};

	/*
	* Swap in Altspace renderer when running in AltspaceVR.
	*/
	AltspaceComponent.prototype.initRenderer = function initRenderer ()
	{
		var this$1 = this;

		var scene = this.el.object3D;
		altspace.getEnclosure().then((function (e) {
			if(this$1.data.fullspace){
				e.requestFullspace();
				e.addEventListener('fullspacechange', function () {
					scene.scale.setScalar(e.pixelsPerMeter);
				});
			}

			if (!this$1.data.usePixelScale || this$1.data.fullspace){
				scene.scale.setScalar(e.pixelsPerMeter);
			}

			switch (this$1.data.verticalAlign) {
				case 'bottom':
					scene.position.y -= e.innerHeight / 2;
					break;
				case 'top':
					scene.position.y += e.innerHeight / 2;
					break;
				case 'middle':
					break;
				default:
					console.warn('Unexpected value for verticalAlign: ', this$1.data.verticalAlign);
			}

			if(this$1.data.enclosuresOnly && e.innerDepth === 1){
				this$1.el.renderer.render(new THREE.Scene());
				this$1.el.renderer = this$1.el.effect = oldRenderer;

			}
		}).bind(this));

		var oldRenderer = this.el.renderer;
		var renderer = this.el.renderer = this.el.effect = altspace.getThreeJSRenderer({
			aframeComponentVersion: this.version
		});

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
	};

	/*
	* Emulate A-Frame cursor events when running in AltspaceVR.
	*/
	AltspaceComponent.prototype.initCursorEvents = function initCursorEvents ()
	{

		var scene = this.el.object3D;
		var cursorEl = document.querySelector('a-cursor') || document.querySelector('a-entity[cursor]');
		if (cursorEl) {
			// Hide A-Frame cursor mesh.
			cursorEl.setAttribute('material', 'transparent', true);
			cursorEl.setAttribute('material', 'opacity', 0.0);
		}

		function emit(eventName, event)
		{
			// Fire events on intersected object and A-Frame cursor.
			var targetEl = event.target.el;
			if (cursorEl){
				cursorEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
			}

			if (targetEl){
				targetEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
			}
		}

		var cursordownObj = null;
		scene.addEventListener('cursordown', function (event) {
			cursordownObj = event.target;
			emit('mousedown', event);
		});

		scene.addEventListener('cursorup', function (event) {
			emit('mouseup', event);
			if (event.target.uuid === cursordownObj.uuid) {
				emit('click', event);
			}
			cursordownObj = null;
		});

		scene.addEventListener('cursorenter', function (event) {
			if (!event.target.el){
				return;
			}
			event.target.el.addState('hovered');
			if (cursorEl){
				cursorEl.addState('hovering');
			}
			emit('mouseenter', event);
		});

		scene.addEventListener('cursorleave', function (event) {
			if (!event.target.el){
				return;
			}
			event.target.el.removeState('hovered');
			if (cursorEl){
				cursorEl.removeState('hovering');
			}
			emit('mouseleave', event);
		});
    };

	AltspaceComponent.prototype.initCollisionEvents = function initCollisionEvents ()
	{
		var scene = this.el.object3D;

		function emit(eventName, event)
		{
			var targetEl = event.target.el;
			if (!targetEl)
				{ return; }

			//remap target and other from object3Ds to aframe element
			event.target = targetEl;
			if (event.other && event.other.el) {
				event.other = event.other.el;
			}
			targetEl.emit(eventName, event);
		}

		scene.addEventListener('collisionenter', function (event) {
			emit('collisionenter', event);
		});

		scene.addEventListener('collisionexit', function (event) {
			emit('collisionexit', event);
		});

		scene.addEventListener('triggerenter', function (event) {
			emit('triggerenter', event);
		});

		scene.addEventListener('triggerexit', function (event) {
			emit('triggerexit', event);
		});

    };

	Object.defineProperties( AltspaceComponent.prototype, prototypeAccessors );

	return AltspaceComponent;
}(AFrameComponent));

/**
* Sync the color property of the object between clients.
* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
* {@link sync.sync} component on the target entity.
* @mixin sync-color
* @memberof sync
*/
var SyncColor = (function (AFrameComponent$$1) {
	function SyncColor () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) SyncColor.__proto__ = AFrameComponent$$1;
	SyncColor.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	SyncColor.prototype.constructor = SyncColor;

	var prototypeAccessors = { dependencies: {} };

	prototypeAccessors.dependencies.get = function (){
		return ['sync'];
	};

	SyncColor.prototype.init = function init ()
	{
		var component = this;
		var sync = component.el.components.sync;

		// wait for firebase connection to start sync routine
		if(sync.isConnected)
			{ start(); }
		else
			{ component.el.addEventListener('connected', start); }

		function start()
		{
			var colorRef = sync.dataRef.child('material/color');
			var refChangedLocked = false;
			var firstValue = true;

			component.el.addEventListener('componentchanged', function (event) {
				var name = event.detail.name;
				var oldData = event.detail.oldData;
				var newData = event.detail.newData;

				if (name === 'material' && !refChangedLocked && oldData.color !== newData.color && sync.isMine)
				{
					//For some reason A-Frame has a misconfigured material reference if we do this too early
					setTimeout(function () { return colorRef.set(newData.color); }, 0);
				}
			});

			colorRef.on('value', function (snapshot) {
				if(!sync.isMine || firstValue)
				{
					var color = snapshot.val();

					refChangedLocked = true;
					component.el.setAttribute('material', 'color', color);
					refChangedLocked = false;

					firstValue = false;
				}
			});
		}
	};

	Object.defineProperties( SyncColor.prototype, prototypeAccessors );

	return SyncColor;
}(AFrameComponent));

/**
* Enables the synchronization of properties of entities. All property sync components
* require both a {@link sync.sync-system} on `a-scene`, and a {@link sync.sync}
* on the entity to be synced.
* @name sync
* @namespace sync
* @example
* <a-scene sync-system='app: example sync; author: altspacevr'>
*   <a-entity sync='ownOn: cursordown' sync-color></a-entity>
* </a-scene>
*/

/**
* Enables the synchronization of properties of the entity. Must be used in
* conjuction with the {@link sync.sync-system} component and a component for a
* specific property (e.g. {@link sync.sync-transform}).
* @memberof sync
* @mixin sync
* @prop {string} ownOn - The name of the event, or a list of events, that
* will cause the local client to take ownership of this object. This field
* cannot be updated after initialization.
*/

var SyncComponent = (function (AFrameComponent$$1) {
	function SyncComponent(isComponent)
	{
		if ( isComponent === void 0 ) isComponent = false;

		this._isComponent = isComponent;

		this.scene = undefined;
		this.syncSys = undefined;
		this.ref = undefined;
		this.key = undefined;
		this.dataRef = undefined;
		this.ownerRef = undefined;
		this.ownerId = undefined;

		this.isConnected = false;

		/**
		* Indicates whether the sync ownership is yours.
		* @member sync.sync#isMine
		* @readonly
		*/
		this.isMine = false;
	}

	if ( AFrameComponent$$1 ) SyncComponent.__proto__ = AFrameComponent$$1;
	SyncComponent.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	SyncComponent.prototype.constructor = SyncComponent;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {
			mode: { default: 'link' },
			ownOn: { type: 'string' } //cannot be changed after creation
		};
	};

	SyncComponent.prototype.init = function init ()
	{
		var this$1 = this;

		this.scene = this.el.sceneEl;
		this.syncSys = this.scene.systems['sync-system'];

		if(this.syncSys.isConnected)
			{ start(); }
		else
			{ this.scene.addEventListener('connected', this.start.bind(this)); }

		if(this.data.ownOn)
		{
			var ownershipEvents = this.data.ownOn.split(/[ ,]+/);
			ownershipEvents.forEach((function (e) {
				this$1.el.addEventListener(e, (function () {
					if(this$1.isConnected){
						this$1.takeOwnership();
					}
				}).bind(this$1));
			}).bind(this));
		}
	};

	/**
	* Tell sync to start pushing local property values instead of updating
	* local from remote values.
	* @method sync.sync#takeOwnership
	*/
	SyncComponent.prototype.takeOwnership = function takeOwnership ()
	{
		this.ownerRef.set(this.syncSys.clientId);

		//clear our ownership if we disconnect
		//this is needed if we are the last user in the room, but we expect people to join later
		this.ownerRef.onDisconnect().set(null);
	};

	SyncComponent.prototype.start = function start ()
	{
		var this$1 = this;

		//Make sure someone always owns an object. If the owner leaves and we are the master client, we will take it.
		//This ensures, for example, that synced animations keep playing
		this.scene.addEventListener('clientleft', (function (event) {
			var shouldTakeOwnership = (!ownerId || ownerId === event.detail.id) && this$1.syncSys.isMasterClient;
			if(shouldTakeOwnership)
				{ this$1.takeOwnership(); }
		}).bind(this));

		if (this.data.mode === 'link') {
			var id = this.el.id;
			if (!id) {
				console.error('Entities cannot be synced using link mode without an id.');
				return;
			}

			console.log('syncSys: ' + this.syncSys);
			console.log('syncSys.sceneRef: ' + this.syncSys.sceneRef);

			this.link(this.syncSys.sceneRef.child(id));
			this.setupReceive();

		} else {
			console.error('Unsupported sync mode: ' + this.data.mode);
			return;
		}

		this.isConnected = true;
		this.el.emit('connected', null, false);
	};

	SyncComponent.prototype.link = function link (entityRef)
	{
		this.ref = entityRef;
		this.key = this.ref.key();
		this.dataRef = this.ref.child('data');
		this.ownerRef = this.ref.child('owner');
	};

	SyncComponent.prototype.setupReceive = function setupReceive ()
	{
		var this$1 = this;

		//if nobody has owned the object yet, we will.
		this.ownerRef.transaction((function (owner) {
			if (owner) { return undefined; }
			this$1.ownerRef.onDisconnect().set(null);
			return this$1.syncSys.clientId;
		}).bind(this));

		this.ownerRef.on('value', (function (snapshot) {
			var newOwnerId = snapshot.val();
			var gained = newOwnerId === this$1.syncSys.clientId && !this$1.isMine;
			if (gained)
				{ this$1.el.emit('ownershipgained', null, false); }

			//note this also fires when we start up without ownership
			var lost = newOwnerId !== this$1.syncSys.clientId && this$1.isMine;
			if (lost){
				this$1.el.emit('ownershiplost', null, false);

				//we no longer have to clear our ownership when we disconnect
				this$1.ownerRef.onDisconnect().cancel();
			}

			this$1.ownerId = newOwnerId;

			this$1.isMine = newOwnerId === this$1.syncSys.clientId;
		}).bind(this));
	};

	Object.defineProperties( SyncComponent.prototype, prototypeAccessors );

	return SyncComponent;
}(AFrameComponent));

/**
* Connect to a remote Firebase server, and facilitate synchronization. These
* options correspond exactly with the configuration options for
* [altspace.utilities.sync.connect]{@link http://altspacevr.github.io/AltspaceSDK/doc/module-altspace_utilities_sync.html#.connect}.
* This component must be present on `a-scene` for any other sync components to work.
* @memberof sync
* @mixin sync-system
* @prop {string} author - A unique identifier for you or your organization.
* @prop {string} app - The name of the app.
* @prop {string} refUrl - Override the base reference. Set this to use your own Firebase.
* @prop {string} instance - Override the instance ID. Can also be overridden with
* a URL parameter.
* @method {boolean} isMasterClient - Returns true if the local client is the master client.
*/
var SyncSystem = (function (AFrameSystem$$1) {
	function SyncSystem () {
		AFrameSystem$$1.apply(this, arguments);
	}

	if ( AFrameSystem$$1 ) SyncSystem.__proto__ = AFrameSystem$$1;
	SyncSystem.prototype = Object.create( AFrameSystem$$1 && AFrameSystem$$1.prototype );
	SyncSystem.prototype.constructor = SyncSystem;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {
			author: { type: 'string', default: null },
			app: { type: 'string', default: null },
			instance: { type: 'string', default: null },
			refUrl: { type: 'string', default: null }
		};
	};

	SyncSystem.prototype.init = function init ()
	{
		if(!this.data || !this.data.app){
			console.warn('The sync-system must be present on the scene and configured with required data.');
			return;
		}
		console.log(this.data);

		this.isConnected = false;
		altspace.utilities.sync.connect({
			authorId: this.data.author,
			appId: this.data.app,
			instanceId: this.data.instance,
			baseRefUrl: this.data.refUrl
		}).then(this.connected.bind(this));
	};

	SyncSystem.prototype.connected = function connected (connection)
	{
		this.connection = connection;

		this.sceneRef = this.connection.instance.child('scene');
		this.clientsRef = this.connection.instance.child('clients');

		// temporary way of having unique identifiers for each client
		this.clientId = this.sceneEl.object3D.uuid;
		this.masterClientId = null;

		var self = this;

		// local client connected
		this.clientsRef.on("value", function (snapshot) {
			var clientIds = snapshot.val();
			var masterClientKey = Object.keys(clientIds)[0];
			self.masterClientId = clientIds[masterClientKey];
		});

		// remote client connected
		this.clientsRef.on('child_added', function (childSnapshot) {
			var joinedClientId = childSnapshot.val();
			//let the master client flag get set first
			setTimeout(function () {
				self.sceneEl.emit('clientjoined', {id: joinedClientId}, false);
			}, 0);
		});

		// remote client disconnected
		this.clientsRef.on('child_removed', function (childSnapshot) {
			var leftClientId = childSnapshot.val();
			//let the master client flag get set first
			setTimeout(function () {
				self.sceneEl.emit('clientleft', {id: leftClientId}, false);
			}, 0);
		});

		// add our client ID to the list of connected clients,
		// but have it be automatically removed by firebase if we disconnect for any reason
		this.clientsRef.push(this.clientId).onDisconnect().remove();

		this.connection.instance.child('initialized').once('value', function (snapshot) {
			var shouldInitialize = !snapshot.val();
			snapshot.ref().set(true);

			self.sceneEl.emit('connected', { shouldInitialize: shouldInitialize }, false);
			self.isConnected = true;
		});
	};

	SyncSystem.prototype.isMasterClient = function isMasterClient ()
	{
		return this.masterClientId === this.clientId;
	};

	Object.defineProperties( SyncSystem.prototype, prototypeAccessors );

	return SyncSystem;
}(AFrameSystem));

//TODO: We need to figure out a way to recieve our first update without caring about ownership.
// firstValue is probably not the right way to go, probably something about having sent yet. Need to change for both

/**
* Synchronize the position, rotation, and scale of this object with all clients.
* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
* {@link sync.sync} component on the target entity.
* @mixin sync-transform
* @memberof sync
*/
AFRAME.registerComponent('sync-transform',
{
	dependencies: ['sync'],
	schema: {
	},
	init: function () {
		var component = this;
		var sync = component.el.components.sync;
		if(sync.isConnected) { start(); } else { component.el.addEventListener('connected', start); }

		function start(){

			var positionRef = sync.dataRef.child('position');
			var rotationRef = sync.dataRef.child('rotation');
			var scaleRef = sync.dataRef.child('scale');

			component.updateRate = 100;

			var stoppedAnimations = [];
			//pause all animations on ownership loss
			component.el.addEventListener('ownershiplost', function() {
				var children = component.el.children;
				for (var i = 0; i < children.length; i++) {
					var tagName = children[i].tagName.toLowerCase();
					if (tagName === "a-animation") {
						stoppedAnimations.push(children[i]);
						children[i].stop();
					}
				}
			});
			component.el.addEventListener('ownershipgained', function () {
				for (var i = 0; i < stoppedAnimations.length; i++) {
					var animation = stoppedAnimations[i];
					animation.start();
				}
				stoppedAnimations = [];
			});

			function onTransform(snapshot, componentName) {
				if (sync.isMine) { return; }

				var value = snapshot.val();
				if (!value) { return; }

				component.el.setAttribute(componentName, value);
			}

			positionRef.on('value', function (snapshot) {
				onTransform(snapshot, 'position');
			});

			rotationRef.on('value', function (snapshot) {
				onTransform(snapshot, 'rotation');
			});

			scaleRef.on('value', function (snapshot) {
				onTransform(snapshot, 'scale');
			});

			var sendPosition = throttle(function(value){
				positionRef.set(value);
			}, component.updateRate);

			var sendRotation = throttle(function(value){
				rotationRef.set(value);
			}, component.updateRate);

			var sendScale = throttle(function(value){
				scaleRef.set(value);
			}, component.updateRate);

			function onComponentChanged(event){
				if (!sync.isMine) { return; }

				var name = event.detail.name;
				var newData = event.detail.newData;

				if (name === 'position') {
					sendPosition(newData);
				} else if (name === 'rotation') {
					sendRotation(newData);
				} else if (name === 'scale') {
					sendScale(newData);
				} else {
					return;
				}

			}

			//from underscore.js
			function throttle(func, wait, options) {
				var timeout, context, args, result;
				var previous = 0;
				if (!options) { options = {}; }

				var later = function() {
				  previous = options.leading === false ? 0 : Date.now();
				  timeout = null;
				  result = func.apply(context, args);
				  if (!timeout) { context = args = null; }
				};

				var throttled = function() {
				  var now = Date.now();
				  if (!previous && options.leading === false) { previous = now; }
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
					if (!timeout) { context = args = null; }
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


			component.el.addEventListener('componentchanged', onComponentChanged);
		}
	}
});

/**
* Synchronize the playback state of an {@link n.n-sound} component between clients.
* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
* {@link sync.sync} component on the target entity.
* @mixin sync-n-sound
* @memberof sync
*/
var SyncNSound = (function (AFrameComponent$$1) {
	function SyncNSound () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) SyncNSound.__proto__ = AFrameComponent$$1;
	SyncNSound.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	SyncNSound.prototype.constructor = SyncNSound;

	var prototypeAccessors = { dependencies: {} };

	prototypeAccessors.dependencies.get = function (){
		return ['sync'];
	};

	Object.defineProperties( SyncNSound.prototype, prototypeAccessors );

	return SyncNSound;
}(AFrameComponent));

AFRAME.registerComponent('sync-n-sound',
{
	dependencies: ['sync'],
	schema: { },
	init: function () {
		var component = this;
		var sync = component.el.components.sync;
		var scene = document.querySelector('a-scene');
		var syncSys = scene.systems['sync-system'];
		if(sync.isConnected) { start(); } else { component.el.addEventListener('connected', start); }

		function start(){
			component.soundStateRef = sync.dataRef.child('sound/state');
			component.soundEventRef = sync.dataRef.child('sound/event');

			function sendEvent(event) {
				if (!sync.isMine) { return; }
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
				if (sync.isMine) { return; }
				var event = snapshot.val();
				if (!event) { return; }
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
				if (!sync.isMine) { return; }
				var name = event.detail.name;
				if (name !== 'n-sound') { return; }
				component.soundStateRef.set(event.detail.newData);
			});

			component.soundStateRef.on('value', function (snapshot) {
				if (sync.isMine) { return; }
				var state = snapshot.val();
				if (!state) { return; }
				component.el.setAttribute('n-sound', state);
			});
		}
	},
	remove: function () {
		this.soundStateRef.off('value');
		this.soundEventRef.off('value');
	}
});

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
		altspace.callNativeComponent(this.el.object3DMap.mesh, this.name, functionName, functionArguments);
	}

	/**
	* Attach a given native object to this entity.
	* @mixin n-object
	* @memberof native
	* @prop {string} res - The identifier for the resource you want. This component
	* can accept all resources except for `interactables`.
	* @example <a-entity n-object='res:architecture/wall-4w-4h'></a-entity>
	*/
	AFRAME.registerComponent('n-object', {
		schema: {
			res: {type: 'string'}
		},
		init: nativeComponentInit,
		update: nativeComponentUpdate,
		remove: nativeComponentRemove
	});

	/**
	* Create an object that spawns additional copies of itself when grabbed by a user (the copies are not spawners themselves).
	* These copies will be physically interactive and automatically synchronized
	* between users.
	* @mixin n-spawner
	* @memberof native
	* @prop {string} res - The identifier for the resource you want. This component
	* can only accept resources of type `interactables`.
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
	* @memberof native
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
	* @memberof native
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
	* @memberof native
	* @extends native.n-collider
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
			type: {default: 'object'}
		}
	});


	/**
	* Create a box-shaped collider on this entity.
	* @mixin n-box-collider
	* @memberof native
	* @extends native.n-collider
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
			type: {default: 'object'}
		}
	});

	/**
	* Create a capsule-shaped collider on this entity. Capsules
	* are a union of a cylinder and two spheres on top and bottom.
	* @mixin n-capsule-collider
	* @memberof native
	* @extends native.n-collider
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
			type: {default: 'object'}
		}
	});

	/**
	* Enable collision for the entire attached mesh. This is expensive to evaluate, so should only be used on
	* low-poly meshes.
	* @mixin n-mesh-collider
	* @memberof native
	* @extends native.n-collider
	* @example <a-box n-mesh-collider></a-box>
	* @prop {bool} convex=true - Whether the collider should be convex or concave. Set this to false if you have holes
	* in your mesh. Convex colliders are limited to 255 triangles. Note: concave colliders can be significantly more
	* expensive comparet to conves colliders.
	*/
	AFRAME.registerComponent('n-mesh-collider', {
		_forEachMesh: function (func) {
			var obj = this.el.object3DMap.mesh;
			if (!obj) { return; }
			if (obj instanceof THREE.Mesh) {
				func(obj);
			}
			obj.traverse(function (childObj) {
				if (childObj instanceof THREE.Mesh) {
					func(childObj);
				}
			}.bind(this));
		},
		_initObj: function () {
			this._forEachMesh(function (mesh) {
				meshInit.call(this, mesh);

				//to pass defaults
				altspace.updateNativeComponent(mesh, this.name, this.data);
			}.bind(this));
		},
		init: function () {
			// Allow a-frame to create a PlaceholderMesh if there isn't already one, so that the native collider is
			// registered.
			this.el.getOrCreateObject3D('mesh', PlaceholderMesh);

			// Initialize the existing mesh
			this._initObj();

			this.el.addEventListener('model-loaded', function () {
				// Re-initialize the collider if a new model is loaded
				this._initObj();
			}.bind(this));
		},
		remove: function () {
			this._forEachMesh(function (mesh) {
				altspace.removeNativeComponent(mesh, this.name);
			}.bind(this));
		},
		update: function (oldData) {
			this._forEachMesh(function (mesh) {
				altspace.updateNativeComponent(mesh, this.name, this.data);
			}.bind(this));
		},
		schema: {
			isTrigger: { default: false, type: 'boolean' },
			convex: { default: true, type: 'boolean' },
			type: {default: 'object'}
		}
	});

	/**
	* Make the object's +Z always face the viewer. Currently will only directly apply to main mesh or native component on the attached entity, not any children or submeshes.
	* @mixin n-billboard
	* @memberof native
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

/**
 * The wire component allows you to trigger an event on another entity when an event occurs on an entity
 * @mixin wire
 * @property {string} on Name of an event to listen to
 * @property {string} gained Name of a state to watch for
 * @property {string} lost Name of a state to watch for
 * @property {string} emit Name of an event to trigger on the targets
 * @property {string} gain Name of a state to add on the target
 * @property {string} lose Name of a state to remove on the target
 * @property {selector} targets A selector to pick which objects to wire to
 * @property {selector} target - A selector to pick a single object to wire to
 **/
AFRAME.registerComponent('wire',
{
	multiple: true,
	schema: {
		on: {type: 'string'},
		emit: {type: 'string'},
		gained: {type: 'string'},
		lost: {type: 'string'},
		gain: {type: 'string'},
		lose: {type: 'string'},
		targets: {type: 'selectorAll'},
		target: {type: 'selector'}
	},
	update: function (oldData) {
		if (oldData.on) {
			this.el.removeEventListener(oldData.on, this.actOnTargets);
		}
		if (oldData.gained) {
			this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
		}
		if (oldData.lost) {
			this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
		}

		this.actOnTargets = function () {
			function act(el) {
				if (this.data.emit) {
					el.emit(this.data.emit);
				}
				if (this.data.gain) {
					el.addState(this.data.gain);
				}
				if (this.data.lose) {
					el.removeState(this.data.lose);
				}
			}
			if(this.data.targets) { this.data.targets.forEach(act.bind(this)); }
			if(this.data.target) { act.call(this, this.data.target); }
		}.bind(this);

		this.actOnTargetsIfStateMatches = function (event) {
			var state = event.detail.state;
			if (state === this.data.gained || state === this.data.lost) {
				this.actOnTargets();
			}
		}.bind(this);

		if (this.data.on) {
			this.el.addEventListener(this.data.on, this.actOnTargets);
		}
		if (this.data.gained) {
			this.el.addEventListener('stateadded', this.actOnTargetsIfStateMatches);
		}
		if (this.data.lost) {
			this.el.addEventListener('stateremoved', this.actOnTargetsIfStateMatches);
		}
	},
	remove: function () {
		this.el.removeEventListener(this.data.on, this.actOnTargets);
		this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
		this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
	}
});

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

registerComponentClass('altspace-cursor-collider', AltspaceCursorCollider);

registerComponentClass('altspace-tracked-controls', AltspaceTrackedControls);

registerComponentClass('altspace', AltspaceComponent);

registerComponentClass('sync-color', SyncColor);

registerComponentClass('sync', SyncComponent);

registerSystemClass('sync-system', SyncSystem);

exports.AltspaceComponent = AltspaceComponent;
exports.AltspaceCursorCollider = AltspaceCursorCollider;
exports.AltspaceTrackedControls = AltspaceTrackedControls;
exports.SyncSystem = SyncSystem;
exports.SyncComponent = SyncComponent;
exports.SyncColor = SyncColor;
exports.flatten = flatten;

}((this.ALTSPACE = this.ALTSPACE || {})));
//# sourceMappingURL=aframe-altspace-component.js.map
