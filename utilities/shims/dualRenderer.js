//Creates a simple scene and renders using AltRender or THREE.WebGLRenderer.
altspace = altspace || {};
altspace.utilities = altspace.utilities || {};
altspace.utilities.shims = altspace.utilities.shims || {};
altspace.utilities.shims.dualRenderer = (function(){

  var scene;
  var camera;
  var ambientLight;
  var renderer;
  var inAltMode;

  var antialias;
  var clearColor;
  var lightColor;
  var TRACE;

  function init(myScene, myParams){
    if (!myScene || !myScene instanceof THREE.Scene){
      throw new Error('dualRender: init requires THREE.Scene argument.')
    } 
    scene = myScene;
    var p = myParams || {};
    var forceWebGL = p.forceWebGL || false;
    //auto-detect if running in Altspace, unless 'forceWebGL' given in params.
    inAltMode = !forceWebGL && window.altspace && window.altspace.inClient;

    var addAmbientLight = !!p.addAmbientLight;
    antialias = p.antialias || true;
    clearColor = p.clearColor || new THREE.Color('silver');
    lightColor = p.clearColor || new THREE.Color('white');
    camera = p.camera || null;
    TRACE = p.TRACE || false;

    if (inAltMode) {
      renderer = altspace.getThreeJSRenderer();
      camera = null;
      ambientLight = null;
    } else {
      // See also: http://threejs.org/docs/#Manual/Introduction/Creating_a_scene
      document.body.style.margin = '0px';
      document.body.style.overflow = 'hidden';
      var container = document.createElement('div');
      document.body.appendChild(container);
      renderer = new THREE.WebGLRenderer({antialias: antialias});
      renderer.setClearColor(clearColor);
      container.appendChild(renderer.domElement);
      var resizeRender = function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', resizeRender);
      if (!camera){
        camera = new THREE.PerspectiveCamera();
        camera.fov = 60;
        camera.near = 1;
        camera.far = 2000;
      }
      resizeRender();
      scene.add(camera);
      if (addAmbientLight){
        // Throw in a default light since any loaded OBJ files use MeshPhongMaterial.
        ambientLight = new THREE.AmbientLight(lightColor);
        scene.add(ambientLight);
      }
    }
  }

  function render() {
    if (inAltMode) {
      renderer.render(scene);
    } else {
      renderer.render(scene, camera);
    }
  }

  var exports = {
    init: init,
    render: render,
  };

  Object.defineProperty(exports, 'camera', {get: function(){return camera}});
  Object.defineProperty(exports, 'ambientLight', {get: function(){return ambientLight}});
  Object.defineProperty(exports, 'renderer', {get: function(){return renderer}});
  Object.defineProperty(exports, 'inAltMode', {get: function(){return inAltMode}});

  return exports;

}());

