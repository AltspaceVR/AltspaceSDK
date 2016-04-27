if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * aframe-altspace-component component for A-Frame.
 */
AFRAME.registerComponent('altspace', {

  /**
   * usePixelScale will allow you to use A-Frame units as CSS pixels. This is the default behavior for three.js apps, but not for A-Frame apps.
   */
  schema: { 
    usePixelScale: { type: 'boolean', default: 'false'}
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {},

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    if (!(this.el.object3D instanceof THREE.Scene)) {
      console.warn('aframe-altspace-component can only be attached to a-scene');
      return;
    }
    if (window.altspace && window.altspace.inClient) {
      var scene = this.el.object3D;
      if (!this.data.usePixelScale) {
        altspace.getEnclosure().then(function(e) {
          scene.scale.multiplyScalar(e.pixelsPerMeter);
        });
      }
      var renderer = this.el.renderer = altspace.getThreeJSRenderer();
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
    }
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
});
