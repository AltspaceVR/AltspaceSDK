//Creates a simple scene and renders using AltRender or THREE.WebGLRenderer.
altspace.utilities.dualRenderer = (function(){

  var scene;
  var camera;
  var ambientLight;
  var renderer;
  var useAltRenderer;

  var antialias;
  var clearColor;
  var lightColor;
  var TRACE;

  var mockCamera = {
    postion: new THREE.Vector3(),
    lookAt: function() {},
  }

  function init(myParams){
    console.log('init myParams', myParams);
    var p = myParams || {};
    //auto-detect if running in Altspace, unless useAltRenderer given in params.
    useAltRenderer = p.useAltRenderer || !!(window.altspace && window.altspace.inClient);
    antialias = p.antialias || true;
    clearColor = p.clearColor || new THREE.Color('silver');
    lightColor = p.clearColor || new THREE.Color('white');
    TRACE = p.TRACE || false;

    scene = new THREE.Scene();

    if (useAltRenderer) {
      renderer = altspace.getThreeJSRenderer();
      camera = mockCamera;//ignore common references to camera
    } else {
      renderer = new THREE.WebGLRenderer({antialias: antialias});
      camera = new THREE.PerspectiveCamera();
      altspace.utilities.cursor.init(scene, camera);

      // See also: http://threejs.org/docs/#Manual/Introduction/Creating_a_scene
      var resizeRender = function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      document.body.style.margin = '0px';
      document.body.style.overflow = 'hidden';
      //renderer.setClearColor("#AAAAAA");
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
    if (useAltRenderer) {
      renderer.render(scene);
    } else {
      renderer.render(scene, camera);
    }
  }

  return {
    init: init,
    render: render,

    getScene: function() { return scene; },
    getCamera: function() { return camera; },
    getAmbientLight: function() { return ambientLight; },
    getRenderer: function() { return renderer; },
    getUseAltRenderer: function() { return useAltRenderer; },
  };

}());

