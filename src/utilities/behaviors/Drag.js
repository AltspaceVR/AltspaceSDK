window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

//idea: API for symbolic camera from altspace? altspace.getThreeJSCenterCamera();
//idea: offset (drag from bottom of piece). Workaround if you reparent

//TODO: GSAP Draggable
/**
 * A behavior that makes an object draggable along a plane.
 * @class Drag
 * @param {Object} [config] Specify the axes along which the object can be
 *  dragged.
 *  E.g. To constrain the object to an XY plane: `{x: true, y: true}`
 *  Each axis can also be an object specifying the minimum and maximum limits
 *  of the constraint. E.g. `{x: {min: -10, max: 20}, y: true}`
 *  **Note:** Currently you must specify exactly two axes.
 * @memberof module:altspace/utilities/behaviors
 */
altspace.utilities.behaviors.Drag = function (config) {
	//space: view, local, world, sphere
	//gridSnap, cursorSnap
	//config: x: true, y: true, z: false, defaultDistance: 1000

	config = config || {};

	if (config.space === undefined) config.space = 'world';//TODO others
	if (config.x === undefined) config.x = false;
	if (config.y === undefined) config.y = false;
	if (config.z === undefined) config.z = false;
	if (config.cursorSnap === undefined) config.cursorSnap = true;//TODO false

	var inX = !!config.x;
	var inY = !!config.y;
	var inZ = !!config.z;
	var min = new THREE.Vector3(
		config.x.min !== undefined ? config.x.min : Number.NEGATIVE_INFINITY,
		config.y.min !== undefined ? config.y.min : Number.NEGATIVE_INFINITY,
		config.z.min !== undefined ? config.z.min : Number.NEGATIVE_INFINITY
	);
	var max = new THREE.Vector3(
		config.x.max !== undefined ? config.x.max : Number.POSITIVE_INFINITY,
		config.y.max !== undefined ? config.y.max : Number.POSITIVE_INFINITY,
		config.z.max !== undefined ? config.z.max : Number.POSITIVE_INFINITY
	);

	var object3d;
	var scene;
	var sync;
	var intersector;
	var dragOffset = new THREE.Vector3();
	var raycaster = new THREE.Raycaster();
	raycaster.linePrecision = 3;

	//if (THREE.REVISION !== '72') throw new Error('Drag requires three.js revision 72'); //TODO: Do we need a revision check?

	function awake(o, s) {
		object3d = o;
		scene = s;
		sync = object3d.getBehaviorByType('Object3DSync');
		makeIntersector();
		scene.add(intersector);//TODO: see if I can remove it from the scene. Might not req 72.
	}

	function makeIntersector() {
		var extent = 10000;
		var plane = new THREE.PlaneGeometry(extent, extent);

		function makeXY() {
			plane.rotateY(Math.PI);
		}
		function makeXZ() {
			plane.rotateX(Math.PI / 2);
		}
		function makeYZ() {
			plane.rotateY(Math.PI / 2);
		}
		function makeViewAligned() {
			throw new Error('Not implemented');
		}

		var axisCount = inX + inY + inZ; // implicit cast to integers

		if (axisCount === 3) {

			throw new Error('Arbitrary dragging currently unsupported. Please lock at least one axis.');

		} else if (axisCount === 2) {

			if (inX && inY) {
				makeXY();
			} else if (inX && inZ) {
				makeXZ();
			} else if (inY && inZ) {
				makeYZ();
			}

		} else if (axisCount === 1) {

			throw new Error('Single axis dragging currently unsupported.');
			//TODO: make possible, possibly via view-aligned plane

		} else {
			throw new Error('Invalid axis configuration');
		}
		var material = new THREE.MeshBasicMaterial({ color: 'purple' });
		material.side = THREE.DoubleSide;
		intersector = new THREE.Mesh(plane, material);
		intersector.visible = false;// ensures other raycasters don't hit our intersector
		intersector.material.visible = false;// ensures we never see flicker during temp visibility
	}

	function getWorldPosition(obj) {
		obj.updateMatrixWorld();
		var vec = new THREE.Vector3();
		vec.setFromMatrixPosition(obj.matrixWorld);
		return vec;
	}

	function vec2str(vec) {
		function shortNum(num) {
			return Math.floor(num * 100) / 100;
		}
		return 'x: ' + shortNum(vec.x) + ', y: ' + shortNum(vec.y) + ', z: ' + shortNum(vec.z);
	}

	function startDrag(event) {
		scene.addEventListener('cursorup', stopDrag);
		scene.addEventListener('cursormove', moveDrag);

		//Remember difference between center of object and drag point.
		//Otherwise, object appears to 'jump' when selected, moving so its
		//center is directly until the cursor. We allow drag on edge of object.
		raycaster.set(event.ray.origin, event.ray.direction);
		var hit = raycaster.intersectObject(object3d, true)[0];
		if (!hit) return;
		var dragPoint = hit.point.clone();
		var objectCenterPoint = getWorldPosition(object3d).clone();
		dragOffset.copy(dragPoint).sub(objectCenterPoint);

		//Move to drag point (not object center), where raycast hits the object.
		intersector.position.copy(intersector.parent.worldToLocal(dragPoint));
		intersector.quaternion.copy(object3d.parent.quaternion);
		intersector.updateMatrixWorld();// necessary for raycast, TODO: Make GH issue

		//Create and dispatch "dragstart" event
		var dragEvent = createDragEvent('dragstart', object3d);
		object3d.dispatchEvent(dragEvent);
	}

	function moveDrag(event) {

		if (sync && !sync.isMine) sync.takeOwnership();

		//find intersection
		intersector.visible = true;// allow our intersector to be intersected
		raycaster.set(event.ray.origin, event.ray.direction);
		var intersection = raycaster.intersectObject(intersector, true)[0];
		intersector.visible = false;// disallow our intersector to be intersected

		if (!intersection) return;

		//New position is intersection point minus offset. Need offset since
		//user probably won't click on exact center of object to drag it.
		var targetWorldPosition = new THREE.Vector3();
		targetWorldPosition.copy(intersection.point).sub(dragOffset);
		//But maintain the original y position of the object.
		targetWorldPosition.y = getWorldPosition(object3d).y;

		//constrain target position
		targetWorldPosition.clamp(min, max);

		//move object
		object3d.parent.updateMatrixWorld();
		var targetLocalPosition = object3d.parent.worldToLocal(targetWorldPosition);//TODO: Test with nested objects
		object3d.position.set(
			config.x ? targetLocalPosition.x : object3d.position.x,
			config.y ? targetLocalPosition.y : object3d.position.y,
			config.z ? targetLocalPosition.z : object3d.position.z
		);

	}

	function stopDrag() {
		scene.removeEventListener('cursorup', stopDrag);
		scene.removeEventListener('cursormove', moveDrag);

		//Create and dispatch "dragstop" event
		var dragEvent = createDragEvent('dragstop', object3d);
		object3d.dispatchEvent(dragEvent);
	}

	function start() {
		object3d.addEventListener('cursordown', startDrag);
	}

	function dispose() {
		object3d.removeEventListener('cursordown', startDrag);
	}

	function createDragEvent(type, object) {
		return {
			type: type,
			bubbles: true,
			target: object ? object : null,
			ray: {
				origin: raycaster.ray.origin.clone(),
				direction: raycaster.ray.direction.clone()
			},
			point: object ? object.position.clone() : null
		}
	}


	return { awake: awake, start: start, dispose: dispose, type: 'Drag' };
};
