'use strict';

import Behavior from './Behavior';

//idea: API for symbolic camera from altspace? altspace.getThreeJSCenterCamera();
//idea: offset (drag from bottom of piece). Workaround if you reparent

//TODO: GSAP Draggable

function getWorldPosition(obj) {
	obj.updateMatrixWorld();
	let vec = new THREE.Vector3();
	vec.setFromMatrixPosition(obj.matrixWorld);
	return vec;
}

function vec2str(vec) {
	return `x: ${+vec.x.toFixed(2)}, y: ${+vec.y.toFixed(2)}, z: ${+vec.z.toFixed(2)}`;
}

/**
 * A behavior that makes an object draggable along a plane.
 * @param {Object} [config] Specify the axes along which the object can be
 *  dragged.
 *  E.g. To constrain the object to an XY plane: `{x: true, y: true}`
 *  Each axis can also be an object specifying the minimum and maximum limits
 *  of the constraint. E.g. `{x: {min: -10, max: 20}, y: true}`
 *  **Note:** Currently you must specify exactly two axes.
 * @memberof module:altspace/utilities/behaviors
 * @extends module:altspace/utilities/behaviors.Behavior
 */
class Drag extends Behavior
{
	get type(){ return 'Drag'; }

	constructor(config)
	{
		//space: view, local, world, sphere
		//gridSnap, cursorSnap
		//config: x: true, y: true, z: false, defaultDistance: 1000
		this.config = config = Object.assign(
			{space: 'world', x: false, y: false, z: false, cursorSnap: true},
			config
		);

		this.min = new THREE.Vector3(
			config.x.min !== undefined ? config.x.min : Number.NEGATIVE_INFINITY,
			config.y.min !== undefined ? config.y.min : Number.NEGATIVE_INFINITY,
			config.z.min !== undefined ? config.z.min : Number.NEGATIVE_INFINITY
		);
		this.max = new THREE.Vector3(
			config.x.max !== undefined ? config.x.max : Number.POSITIVE_INFINITY,
			config.y.max !== undefined ? config.y.max : Number.POSITIVE_INFINITY,
			config.z.max !== undefined ? config.z.max : Number.POSITIVE_INFINITY
		);

		//if (THREE.REVISION !== '72') throw new Error('Drag requires three.js revision 72'); //TODO: Do we need a revision check?

		this.object3d = null;
		this.scene = null;
		this.sync = null;
		this.intersector = null;
		this.dragOffset = new THREE.Vector3();
		this.raycaster = new THREE.Raycaster();
		this.raycaster.linePrecision = 3;

		this._cbs = {
			startDrag: this.startDrag.bind(this),
			moveDrag: this.moveDrag.bind(this),
			stopDrag: this.stopDrag.bind(this)
		}
	}

	awake(o, s)
	{
		this.object3d = o;
		this.scene = s;
		this.sync = o.getBehaviorByType('Object3DSync');
		this.makeIntersector();
		this.scene.add(this.intersector);//TODO: see if I can remove it from the scene. Might not req 72.
	}

	start()
	{
		this.object3d.addEventListener('cursordown', this._cbs.startDrag);
	}

	dispose()
	{
		this.object3d.removeEventListener('cursordown', this._cbs.startDrag);
	}

	makeIntersector()
	{
		let extent = 10000;
		let plane = new THREE.PlaneGeometry(extent, extent);

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

		let inX = !!this.config.x, inY = !!this.config.y, inZ = !!this.config.z;
		let axisCount = inX + inY + inZ; // implicit cast to integers

		if (axisCount === 3) {
			throw new Error('Arbitrary dragging currently unsupported. Please lock at least one axis.');
		}
		else if (axisCount === 2) {
			if (inX && inY) {
				makeXY();
			} else if (inX && inZ) {
				makeXZ();
			} else if (inY && inZ) {
				makeYZ();
			}
		}
		else if (axisCount === 1) {
			throw new Error('Single axis dragging currently unsupported.');
			//TODO: make possible, possibly via view-aligned plane
		}
		else {
			throw new Error('Invalid axis configuration');
		}

		let material = new THREE.MeshBasicMaterial({ color: 'purple' });
		material.side = THREE.DoubleSide;
		this.intersector = new THREE.Mesh(plane, material);
		this.intersector.visible = false;// ensures other raycasters don't hit our intersector
		this.intersector.material.visible = false;// ensures we never see flicker during temp visibility
	}

	startDrag(event)
	{
		this.scene.addEventListener('cursorup', this._cbs.stopDrag);
		this.scene.addEventListener('cursormove', this._cbs.moveDrag);

		//Remember difference between center of object and drag point.
		//Otherwise, object appears to 'jump' when selected, moving so its
		//center is directly until the cursor. We allow drag on edge of object.
		this.raycaster.set(event.ray.origin, event.ray.direction);
		let hit = raycaster.intersectObject(object3d, true)[0];
		if (!hit)
			return;

		let dragPoint = hit.point.clone();
		let objectCenterPoint = getWorldPosition(this.object3d).clone();
		this.dragOffset.copy(dragPoint).sub(objectCenterPoint);

		//Move to drag point (not object center), where raycast hits the object.
		this.intersector.position.copy(this.intersector.parent.worldToLocal(dragPoint));
		this.intersector.quaternion.copy(this.object3d.parent.quaternion);
		this.intersector.updateMatrixWorld();// necessary for raycast, TODO: Make GH issue

		/**
		* Fired on an object when a drag interaction begins.
		*
		* @event dragstart
		* @type module:altspace/utilities/behaviors.Drag~DragEvent
		* @memberof module:altspace/utilities/behaviors.Drag
		*/
	 	let dragEvent = this.createDragEvent('dragstart');
		this.object3d.dispatchEvent(dragEvent);
	}

	moveDrag(event)
	{
		if (this.sync && !this.sync.isMine)
			this.sync.takeOwnership();

		//find intersection
		this.intersector.visible = true;// allow our intersector to be intersected
		this.raycaster.set(event.ray.origin, event.ray.direction);
		let intersection = this.raycaster.intersectObject(this.intersector, true)[0];
		this.intersector.visible = false;// disallow our intersector to be intersected

		if (!intersection)
			return;

		//New position is intersection point minus offset. Need offset since
		//user probably won't click on exact center of object to drag it.
		let targetWorldPosition = new THREE.Vector3();
		targetWorldPosition.copy(intersection.point).sub(this.dragOffset);

		//But maintain the original locked positions of the object.
		let self = this;
		let objWorldPos = getWorldPosition(this.object3d);
		['x','y','z'].filter(i => !self.config[i]).forEach(i => {
			targetWorldPosition[i] = objWorldPos[i];
		});

		//constrain target position
		targetWorldPosition.clamp(min, max);

		//move object
		this.object3d.parent.updateMatrixWorld();
		let targetLocalPosition = this.object3d.parent.worldToLocal(targetWorldPosition);//TODO: Test with nested objects
		this.object3d.position.set(
			this.config.x ? targetLocalPosition.x : this.object3d.position.x,
			this.config.y ? targetLocalPosition.y : this.object3d.position.y,
			this.config.z ? targetLocalPosition.z : this.object3d.position.z
		);

	}

	stopDrag()
	{
		this.scene.removeEventListener('cursorup', this._cbs.stopDrag);
		this.scene.removeEventListener('cursormove', this._cbs.moveDrag);

		/**
		* Fired on an object when a drag interaction ends
		*
		* @event dragstop
		* @type module:altspace/utilities/behaviors.Drag~DragEvent
		* @memberof module:altspace/utilities/behaviors.Drag
		*/
		var dragEvent = this.createDragEvent('dragstop');
		this.object3d.dispatchEvent(dragEvent);
	}

	/**
	* Represents events emitted during drag interactions
	*
	* @typedef {Object} module:altspace/utilities/behaviors.Drag~DragEvent
	* @property {THREE.Ray} ray - The raycaster ray at the time of the event.
	* @property {THREE.Object3D} target - The object which was dragged.
	*/
	createDragEvent(type)
	{
		return {
			type: type,
			bubbles: true,
			target: this.object3d,
			ray: this.raycaster.ray.clone()
		}
	}
}

export default Drag;
