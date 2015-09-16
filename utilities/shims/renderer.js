//Detects mouse move/up/down events, raycasts to find intersected objects, then
//dispatches cursor move/up/down/enter/leave events that mimics Altspace events.
altspace.utilities.dualRenderer = (function(){

  var scene;
  var camera;
  var renderer;
  var ambientLight;

  var useAltRenderer;
  var antialias;

  var TRACE;

/*
  return {
    init: init,
    render: render,

    useAltRenderer: useAltRenderer,
    renderer: renderer,
    scene: scene,
    camera: camera,
    ambientLight: ambientLight,
  };
  */

  function init(myParams){
    var params = myParams || {};
    var p = myParams;
    //auto-detect if running in Altspace, unless useAltRenderer given in params.
    useAltRenderer = p.useAltRenderer || !!(window.altspace && window.altspace.inClient);
    antialias = p.antialias || true;
    clearColor = p.clearColor || true; // XXX fix
    TRACE = p.TRACE || false;

    scene = new THREE.Scene();

    if (useAltRenderer) {
      renderer = window.altspace.getThreeJSRenderer();
      camera = { position: new THREE.Vector3() };//so changing position has no effect
      //but must check if camera exists before using its other properties or methods
    } else {
      renderer = new THREE.WebGLRenderer({antialias: antialias});
      camera = new THREE.PerspectiveCamera();
      window.altspace.utilities.cursor.init(scene, camera);

      // See also: http://threejs.org/docs/#Manual/Introduction/Creating_a_scene
      var resizeRender = function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      document.body.style.margin = '0px';
      document.body.style.overflow = 'hidden';
      renderer.setClearColor("#AAAAAA");
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
      ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientLight);
    }
  }

  function render(scene, camera){
    if (useAltRenderer) {
      renderer.render(scene);
    } else {
      renderer.render(scene, camera);
    }
  }

  function getUseAltRenderer() { return useAltRenderer; }
  function getRenderer() { return renderer; }
  function getScene() { return scene; }
  function getCamera() { return camera; }
  function getAmbientLight() { return ambientLight; }

  return {
    init: init,
    render: render,

    useAltRenderer: useAltRenderer,
    renderer: renderer,
    scene: scene,
    camera: camera,
    ambientLight: ambientLight,
  };

}());

