/**
* Detects mouse move/up/down events, raycasts to find intersected objects,
* then dispatches cursor move/up/down/enter/leave events that mimics
* Altspace events.
* @module altspace/utilities/shims/cursor
*/
'use strict';

var scene;
var camera;
var domElem;

var overObject;

var raycaster = new THREE.Raycaster();

/**
 * Initializes the cursor module
 * @static
 * @method init
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera - Camera used for raycasting.
 * @param {Object} [options] - An options object
 * @param {THREE.WebGLRenderer} [options.renderer] - If supplied, applies cursor movement to render target
 *	instead of entire client
 * @memberof module:altspace/utilities/shims/cursor
 */
function init(_scene, _camera, _params) {
	if (!_scene || !(_scene instanceof THREE.Scene)) {
		throw new TypeError('Requires THREE.Scene argument');
	}
	if (!_camera || !(_camera instanceof THREE.Camera)) {
		throw new TypeError('Requires THREE.Camera argument');
	}
	scene = _scene;
	camera = _camera;

	p = _params || {};
	domElem = p.renderer && p.renderer.domElement || window;

	domElem.addEventListener('mousedown', mouseDown, false)
	domElem.addEventListener('mouseup', mouseUp, false)
	domElem.addEventListener('mousemove', mouseMove, false)
}

function mouseDown(event) {

	var intersection = findIntersection(event);
	if (!intersection || !intersection.point) return;

	var cursorEvent = createCursorEvent('cursordown', intersection);
	intersection.object.dispatchEvent(cursorEvent);
}

function mouseUp(event) {
	var intersection = findIntersection(event);

	var cursorEvent = createCursorEvent('cursorup', intersection);

	if (intersection) {
		intersection.object.dispatchEvent(cursorEvent);
	} else {
		scene.dispatchEvent(cursorEvent);
	}
}

function mouseMove(event) {
	var intersection = findIntersection(event);

	var cursorEvent = createCursorEvent('cursormove', intersection);//TODO improve and don't fire only on scene
	scene.dispatchEvent(cursorEvent);

	var object = intersection ? intersection.object : null;
	if (overObject != object) {
		if (overObject) {
			cursorEvent = createCursorEvent('cursorleave', intersection);
			overObject.dispatchEvent(cursorEvent);
		}

		if (object) {
			cursorEvent = createCursorEvent('cursorenter', intersection);
			object.dispatchEvent(cursorEvent);
		}

		overObject = object;
	}
}

function createCursorEvent(type, intersection) {
	return {
		type: type,
		bubbles: true,
		target: intersection ? intersection.object : null,
		ray: {
			origin: raycaster.ray.origin.clone(),
			direction: raycaster.ray.direction.clone()
		},
		point: intersection ? intersection.point.clone() : null
	}
}

function findIntersection(mouseEvent) {
	var mouse = new THREE.Vector2();
	mouse.x = (mouseEvent.offsetX / (domElem.width || domElem.innerWidth)) * 2 - 1;
	mouse.y = -(mouseEvent.offsetY / (domElem.height || domElem.innerHeight)) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	var intersections = raycaster.intersectObjects(scene.children, true);

	// return the first object with an enabled collider
	return intersections.find(function(e){
		return !e.object.userData
			|| !e.object.userData.altspace
			|| !e.object.userData.altspace.collider
			|| e.object.userData.altspace.collider.enabled !== false;
	}) || null;
}

export {init};
