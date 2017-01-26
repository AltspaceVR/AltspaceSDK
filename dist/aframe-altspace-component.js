(function (exports) {
'use strict';

var AFrameComponent = function AFrameComponent () {};

var prototypeAccessors = { schema: {} };

prototypeAccessors.schema.get = function (){
	return null;
};

AFrameComponent.prototype.init = function init (){ };
AFrameComponent.prototype.update = function update (oldData){ };
AFrameComponent.prototype.remove = function remove (){ };
AFrameComponent.prototype.tick = function tick (time, timeDelta){ };
AFrameComponent.prototype.pause = function pause (){ };
AFrameComponent.prototype.play = function play (){ };
AFrameComponent.prototype.updateSchema = function updateSchema (data){ };

Object.defineProperties( AFrameComponent.prototype, prototypeAccessors );

function flatten(obj)
{
	var ret = {};
	if(!obj.prototype){
		ret = Object.assign( {schema: {}, dependencies: []}, obj );
	}
	else {
		ret = Object.assign( flatten(obj.prototype), obj );
	}

	if(obj.schema)
		{ Object.assign(ret.schema, obj.schema); }
		
	if(obj.dependencies)
		{ (ref = ret.dependencies).push.apply(ref, obj.dependencies); }

	return ret;
	var ref;
}

function registerComponent(name, cls)
{
	AFRAME.registerComponent(name, flatten(cls));
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

	var prototypeAccessors = { version: {},schema: {} };

	prototypeAccessors.version.get = function (){
		return 'AFRAME_ALTSPACE_VERSION';
	};

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

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

registerComponent('altspace-cursor-collider', AltspaceCursorCollider);

registerComponent('altspace-tracked-controls', AltspaceTrackedControls);

registerComponent('altspace', AltspaceComponent);

registerComponent('sync-color', SyncColor);

exports.AltspaceCursorCollider = AltspaceCursorCollider;

}((this.altspace = this.altspace || {})));
//# sourceMappingURL=aframe-altspace-component.js.map
