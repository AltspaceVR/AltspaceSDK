window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};

altspace.utilities.Simulation = function (config) {
    config = config || {};
    if (config.auto === undefined) config.auto = true;

    var exports = {};
    var scene = new THREE.Scene();
    var renderer;
    var camera;

    setup();

    function loop() {
        window.requestAnimationFrame(loop);
        scene.updateAllBehaviors();
        renderer.render(scene, camera);
    }

    function setup() {
        function setupAltspace() {
            renderer = altspace.getThreeJSRenderer();
            camera = new THREE.PerspectiveCamera(); // TODO: change from shim to symbolic
            altspace.getThreeJSTrackingSkeleton(function (s) {//TODO: this should have a non-promise version
                var skeleton = s;
                skeleton.getJoint('Eye').add(camera);// add our virtual camera to the center eye so that it looks normal to other behaviors
            });
        }

        function setupWebGL() {
            renderer = new THREE.WebGLRenderer();
            camera = new THREE.PerspectiveCamera();
            camera.position.z = 500;

            var resizeRender = function () {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            document.addEventListener("DOMContentLoaded", function (event) {
                document.body.style.margin = '0px';
                document.body.style.overflow = 'hidden';
                renderer.setClearColor('#035F72');
                var container = document.createElement('div');
                document.body.appendChild(container);
                container.appendChild(renderer.domElement);
            });
            window.addEventListener('resize', resizeRender);
            resizeRender();
            camera.fov = 45;
            camera.near = 1;
            camera.far = 2000;
            scene.add(camera);
            scene.add(new THREE.AmbientLight('white'));

            var shouldShimCursor = altspace && altspace.utilities && altspace.utilities.shims && altspace.utilities.shims.cursor;
            if (shouldShimCursor) altspace.utilities.shims.cursor.init(scene, camera);
        }

        if (altspace && altspace.inClient) {
            setupAltspace();
        } else {
            setupWebGL();
        }
    }

    if (config.auto) window.requestAnimationFrame(loop);

    Object.defineProperty(exports, 'scene', {
        get: function () {
            return scene;
        }
    })
    Object.defineProperty(exports, 'renderer', {
        get: function () {
            return renderer;
        }
    })
    Object.defineProperty(exports, 'camera', {
        get: function () {
            return camera;
        },
        set: function (value) {
            camera = value;
        }
    })
    return exports;
}