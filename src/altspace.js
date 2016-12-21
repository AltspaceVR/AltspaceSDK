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
AFRAME.registerComponent('altspace', {
  version: 'AFRAME_ALTSPACE_VERSION',
  schema: {
	usePixelScale: { type: 'boolean', default: 'false'},
	verticalAlign: { type: 'string',  default: 'middle'},
	enclosuresOnly:{ type: 'boolean', default: 'true'},
	fullspace:     { type: 'boolean', default: 'false'}
  },

  /*
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
	  this.initCollisionEvents();
	} else {
	  console.warn('aframe-altspace-component only works inside of AltspaceVR');
	}

  },

  /*
   * Called on every single tick or render loop of the scene.
   */
  tick: function (t, dt) {
      if(this.el.object3D.updateAllBehaviors)
        this.el.object3D.updateAllBehaviors();
  },

  /*
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /*
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /*
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /*
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },


  /********** Helper Methods **********/

  /*
   * Swap in Altspace renderer when running in AltspaceVR.
   */
  initRenderer: function () {

	var scene = this.el.object3D;
	altspace.getEnclosure().then(function(e)
	{
		if(this.data.fullspace){
			e.requestFullspace();
			e.addEventListener('fullspacechange', function(){
				scene.scale.setScalar(e.pixelsPerMeter);
			});
		}

		if (!this.data.usePixelScale || this.data.fullspace){
			scene.scale.setScalar(e.pixelsPerMeter);
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
	}.bind(this));

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

  },

  /*
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

  initCollisionEvents: function () {

	var scene = this.el.object3D;

	var emit = function (eventName, event) {
		var targetEl = event.target.el;
		if (!targetEl) return;

		//remap target and other from object3Ds to aframe element
		event.target = targetEl;
		if (event.other && event.other.el) {
			event.other = event.other.el;
		}
		targetEl.emit(eventName, event);
	};

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

  }

});
