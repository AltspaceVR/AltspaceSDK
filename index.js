if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * The altspace component makes A-Frame apps compatible with AltspaceVR.
 */
AFRAME.registerComponent('altspace', {

  /**
   * usePixelScale will allow you to use A-Frame units as CSS pixels.
   * This is the default behavior for three.js apps, but not for A-Frame apps.
   * verticalAlign puts the origin at the bottom, middle (default), or top of the Altspace enclosure.
   * enclosuresOnly prevents the scene from being created if enclosure is flat.
   */
  schema: {
    usePixelScale: { type: 'boolean', default: 'false'},
    verticalAlign: { type: 'string',  default: 'middle'},
    enclosuresOnly:{ type: 'boolean', default: 'true'},
    fullspace:     { type: 'boolean', default: 'false'}
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    if (!(this.el.object3D instanceof THREE.Scene)) {
      console.warn('aframe-altspace-component can only be attached to a-scene');
      return;
    }

    if (window.altspace && window.altspace.inClient)
    {
      this.el.setAttribute('vr-mode-ui', {enabled: false});
      this.initRenderer();
      this.initCursorEvents();
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

    var emit = function(eventName, targetEl) {
      // Fire events on intersected object and A-Frame cursor.
      if (cursorEl) cursorEl.emit(eventName, {target: targetEl});
      if (targetEl) targetEl.emit(eventName, {target: targetEl});
    } ;

    var cursordownObj = null;
    scene.addEventListener('cursordown', function(event) {
      cursordownObj = event.target;
      emit('mousedown', event.target.el);
    });

    scene.addEventListener('cursorup', function(event) {
      emit('mouseup', event.target.el);
      if (event.target.uuid === cursordownObj.uuid) {
        emit('click', event.target.el);
      }
      cursordownObj = null;
    });

    scene.addEventListener('cursorenter', function(event) {
      if (!event.target.el) { return; }
      event.target.el.addState('hovered');
      if (cursorEl) cursorEl.addState('hovering');
      emit('mouseenter', event.target.el);
    });

    scene.addEventListener('cursorleave', function(event) {
      if (!event.target.el) { return; }
      event.target.el.removeState('hovered');
      if (cursorEl) cursorEl.removeState('hovering');
      emit('mouseleave', event.target.el);
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

(function(){

  function setColliderFlag(obj, state) {
    obj.userData.altspace = {collider: {enabled: state}};
    obj.traverse(function (obj) {
      if (obj instanceof THREE.Mesh) {
        obj.userData.altspace = {collider: {enabled: state}};
      }
    })
  }

  AFRAME.registerComponent('altspace-cursor-collider', {
    schema: { enabled: { default: true } },
    init: function () {
      setColliderFlag(this.el.object3D, this.data.enabled);
      this.el.addEventListener('model-loaded', (function(){
        setColliderFlag(this.el.object3D, this.data.enabled);
      }).bind(this));
    },
    update: function () {
      setColliderFlag(this.el.object3D, this.data.enabled);
    }
  });

})();

