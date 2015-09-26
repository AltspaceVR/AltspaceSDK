//Detects mouse move/up/down events, raycasts to find intersected objects, then
//dispatches cursor move/up/down/enter/leave events that mimics Altspace events.
altspace.utilities = altspace.utilities || {};
altspace.utilities.shims = altspace.utilities.shims || {};

altspace.utilities.shims.cursor = (function () {
    //TODO: Support non-full window apps

    var scene;
    var camera;
    var overObject;

    var raycaster = new THREE.Raycaster();

    function init(_scene, _camera, _params) {
        if (!_scene || !_scene instanceof THREE.Scene) {
            throw new Error('cursor shim: init requires THREE.Scene argument');
        }
        if (!_camera || !_camera instanceof THREE.Camera) {
            throw new Error('cursor shim: init requires THREE.Camera argument');
        }
        scene = _scene;
        camera = _camera;

        _params = _params || {};

        document.addEventListener('mousedown', mouseDown, false)
        document.addEventListener('mouseup', mouseUp, false)
        document.addEventListener('mousemove', mouseMove, false)
    }

    function mouseDown(event) {
        var intersection = findIntersection(event);
        if (!intersection || !intersection.point) return;

        var cursorEvent = createCursorEvent('cursordown', intersection);
        intersection.object.dispatchEvent(cursorEvent);
    }

    function mouseUp(event) {
        var intersection = findIntersection(event);
        if (!intersection || !intersection.point) return;

        var cursorEvent = createCursorEvent('cursorup', intersection);
        intersection.object.dispatchEvent(cursorEvent);
    }

    function mouseMove(event) {
        var intersection = findIntersection(event);
        if (!intersection || !intersection.point) return;

        var cursorEvent = createCursorEvent('cursormove', intersection);
        scene.dispatchEvent(cursorEvent);

        if (overObject != intersection.object) {
            if (overObject) {
                cursorEvent = createCursorEvent('cursorleave', intersection);
                intersection.object.dispatchEvent(cursorEvent);
            }

            cursorEvent = createCursorEvent('cursorenter', intersection);
            intersection.object.dispatchEvent(cursorEvent);

            overObject = intersection.object;
        }
    }

    function createCursorEvent(type, intersection) {
        return {
            type: type,
            bubbles: true,
            target: intersection.object,
            ray: {
                origin: raycaster.ray.origin.clone(),
                direction: raycaster.ray.direction.clone()
            },
            point: intersection.point.clone()
        }
    }

    function findIntersection(mouseEvent) {
        var mouse = {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        }

        raycaster.setFromCamera(mouse, camera);

        return raycaster.intersectObjects(scene.children, true)[0];
    };

    return {
        init: init,
    };

}());

