//Creates a simple scene and renders using AltRender or THREE.WebGLRenderer.
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
    //auto-detect if running in Altspace, unless 'forceWebGL' given in params.
    inAltMode = !p.forceWebGL && window.altspace && window.altspace.inClient;

    antialias = p.antialias || true;
    clearColor = p.clearColor || new THREE.Color('silver');
    lightColor = p.clearColor || new THREE.Color('white');
    TRACE = p.TRACE || false;

    if (inAltMode) {
      renderer = altspace.getThreeJSRenderer();
      camera = null;
      ambientLight = null;
    } else {
      renderer = new THREE.WebGLRenderer({antialias: antialias});
      camera = new THREE.PerspectiveCamera();

      // See also: http://threejs.org/docs/#Manual/Introduction/Creating_a_scene
      var resizeRender = function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      document.body.style.margin = '0px';
      document.body.style.overflow = 'hidden';
      renderer.setClearColor(clearColor);
      var container = document.createElement('div');
      document.body.appendChild(container);
      container.appendChild(renderer.domElement);
      window.addEventListener('resize', resizeRender);
      resizeRender();
      camera.fov = 45;
      camera.near = 1;
      camera.far = 2000;
      scene.add(camera);
      // Throw in a light since any loaded OBJ files use MeshPhongMaterial.
      //ambientLight = new THREE.AmbientLight(0xffffff);
      ambientLight = new THREE.AmbientLight(lightColor);
      scene.add(ambientLight);
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

  Object.defineProperty(exports, 'camera', { get: function(){return camera} });
  Object.defineProperty(exports, 'ambientLight', { get: function(){return ambientLight} });
  Object.defineProperty(exports, 'renderer', { get: function(){return renderer} });
  Object.defineProperty(exports, 'inAltMode', { get: function(){return inAltMode} });

  return exports;

}());

