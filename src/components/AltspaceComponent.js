'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* The altspace component makes A-Frame apps compatible with AltspaceVR. @aframe
*
* **Note**: This component can have side-effects on some default components. To be
* safe, this component should be specified last.
*
* @example
* <head>
*   <title>My A-Frame Scene</title>
*   <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
*   <script src="https://cdn.rawgit.com/AltspaceVR/AltspaceSDK/v{{SDK_VERSION}}/dist/altspace.min.js"></script>
* </head>
* <body>
*   <a-scene altspace>
*     <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
*   </a-scene>
* </body>
*
* @alias altspace
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
*/
class AltspaceComponent extends AFrameComponent
{
	get schema(){
		return {

			/**
			* Allows you to use A-Frame units as CSS pixels.
			* This is the default behavior for three.js apps, but not for A-Frame apps.
			* @instance
			* @member {boolean} usePixelScale
			* @default false
			* @memberof module:altspace/components.altspace
			*/
			usePixelScale: { type: 'boolean', default: 'false'},

			/**
			* Puts the origin at the `bottom`, `middle` (default), or `top` of the Altspace enclosure.
			* @instance
			* @member {string} verticalAlign
			* @default "middle"
			* @memberof module:altspace/components.altspace
			*/
			verticalAlign: { type: 'string',  default: 'middle'},

			/**
			* Prevents the scene from being created if enclosure is flat.
			* @instance
			* @member {boolean} enclosuresOnly
			* @default true
			* @memberof module:altspace/components.altspace
			*/
			enclosuresOnly: { type: 'boolean', default: 'true'},

			/**
			* Puts the app into fullspace mode.
			* @instance
			* @member {boolean} fullspace
			* @default false
			* @memberof module:altspace/components.altspace
			*/
			fullspace: { type: 'boolean', default: 'false'}
		}
	}

	init()
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
	}

	tick(t, dt)
	{
		if(this.el.object3D.updateAllBehaviors)
			this.el.object3D.updateAllBehaviors();
	}

	/*
	* Swap in Altspace renderer when running in AltspaceVR.
	*/
	initRenderer()
	{
		let scene = this.el.object3D;
		let naturalScale = this.el.sceneEl.getAttribute('scale') || {x: 1, y: 1, z: 1};
		altspace.getEnclosure().then((e =>
		{

			if(this.data.fullspace){
				e.requestFullspace();
				e.addEventListener('fullspacechange', () => {
					scene.scale.copy(naturalScale).multiplyScalar(e.pixelsPerMeter);
				});
			}

			if (!this.data.usePixelScale || this.data.fullspace){
				scene.scale.copy(naturalScale).multiplyScalar(e.pixelsPerMeter);
			}

			switch (this.data.verticalAlign) {
				case 'bottom':
					scene.position.y -= e.innerHeight / 2;
					break;
				case 'top':
					scene.position.y += e.innerHeight / 2;
					break;
				case 'middle':
					break;
				default:
					console.warn('Unexpected value for verticalAlign: ', this.data.verticalAlign);
			}

			if(this.data.enclosuresOnly && e.innerDepth === 1){
				this.el.renderer.render(new THREE.Scene());
				this.el.renderer = this.el.effect = oldRenderer;

			}
		}).bind(this));

		let oldRenderer = this.el.renderer;
		let renderer = this.el.renderer = this.el.effect = altspace.getThreeJSRenderer({
			aframeComponentVersion: this.version
		});

		let noop = function() {};
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
	}

	/*
	* Emulate A-Frame cursor events when running in AltspaceVR.
	*/
	initCursorEvents()
	{

		let scene = this.el.object3D;
		let cursorEl = document.querySelector('a-cursor') || document.querySelector('a-entity[cursor]');
		if (cursorEl) {
			// Hide A-Frame cursor mesh.
			cursorEl.setAttribute('material', 'transparent', true);
			cursorEl.setAttribute('material', 'opacity', 0.0);
		}

		function emit(eventName, event)
		{
			// Fire events on intersected object and A-Frame cursor.
			let targetEl = event.target.el;
			if (cursorEl){
				cursorEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
			}

			if (targetEl){
				targetEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
			}
		}

		let cursordownObj = null;
		scene.addEventListener('cursordown', event => {
			cursordownObj = event.target;
			emit('mousedown', event);
		});

		scene.addEventListener('cursorup', event => {
			emit('mouseup', event);
			if (event.target.uuid === cursordownObj.uuid) {
				emit('click', event);
			}
			cursordownObj = null;
		});

		scene.addEventListener('cursorenter', event => {
			if (!event.target.el){
				return;
			}
			event.target.el.addState('hovered');
			if (cursorEl){
				cursorEl.addState('hovering');
			}
			emit('mouseenter', event);
		});

		scene.addEventListener('cursorleave', event => {
			if (!event.target.el){
				return;
			}
			event.target.el.removeState('hovered');
			if (cursorEl){
				cursorEl.removeState('hovering');
			}
			emit('mouseleave', event);
		});
    }

	initCollisionEvents()
	{
		let scene = this.el.object3D;

		function emit(eventName, event)
		{
			let targetEl = event.target.el;
			if (!targetEl)
				return;

			//remap target and other from object3Ds to aframe element
			event.target = targetEl;
			if (event.other && event.other.el) {
				event.other = event.other.el;
			}
			targetEl.emit(eventName, event);
		};

		scene.addEventListener('collisionenter', event => {
			emit('collisionenter', event);
		});

		scene.addEventListener('collisionexit', event => {
			emit('collisionexit', event);
		});

		scene.addEventListener('triggerenter', event => {
			emit('triggerenter', event);
		});

		scene.addEventListener('triggerexit', event => {
			emit('triggerexit', event);
		});

    }
}

export default AltspaceComponent;
