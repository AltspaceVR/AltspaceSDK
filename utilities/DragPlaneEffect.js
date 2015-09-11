// Implement drag-and-drop of objects in a horizontal plane.
DragPlaneEffect = function ( dragPlane, params ) {

	if ( ! dragPlane instanceof THREE.Object3D ) {
		console.error("dragPlane must be of type Object3D");
		return;
	}
	this.dragPlane = dragPlane.clone(); // make copy that is NOT added to scene

	this.hoverObject;
	this.dragObject;
	this.dragObjectWidth;

	this.dragOffset = new THREE.Vector3();

	this.inAltspace = window.altspace && window.altspace.inClient;

	var p = params || {};

	this.TRACE = p.TRACE || null;

	// Save object as drag position changes.
	this.firebaseSync = p.firebaseSync || null;

	// Disable orbit controls during a drag (non-Altspace only). 
	this.orbitControls = p.orbitControls || null;

	// Mark the intersection point when an object is dragged and on hoverOver.
	// Intended as a debugging aide. Mesh with SphereGeometry works well.
	this.dragPointMarker = p.dragPointMarker || null;

	this.rayOrigin = new THREE.Vector3();
	this.rayDirection = new THREE.Vector3();

	// Raycaster usually set from Three.js camera, but here assume near=1 and
	// make "far" 20% bigger than dragplane (if smaller, raycast won't work).
	this.raycaster = new THREE.Raycaster();
	var geo = this.dragPlane.geometry.parameters;
	this.raycaster.near = 1;
	this.raycaster.far = Math.max(geo.width, geo.depth) * 1.2;

};


DragPlaneEffect.prototype.cursormoveScene = function( event ) {

	// Update raycaster origin and direction whenever cursor moves.
	this.rayOrigin.copy( event.ray.origin );
	this.rayDirection.copy( event.ray.direction );

	this.dragUpdate();

};

DragPlaneEffect.prototype.cursorupScene = function( event ) {

	if ( this.dragObject ) {
		this.dragEnd();
	}

};

DragPlaneEffect.prototype.cursordown = function( object, event ) {

	// Handle (rare) case where cursordown happens before any mousemove.
	this.rayOrigin.copy( event.ray.origin );
	this.rayDirection.copy( event.ray.direction );

	this.dragStart( object, event );

};

DragPlaneEffect.prototype.cursorup = function( object, event ) {

	if ( this.dragObject ) {
		this.dragEnd();
	}

}


DragPlaneEffect.prototype.dragStart = function( object, event ) {

	if ( this.TRACE ) console.log("Starting drag", object);

	this.dragObject = object;

	var boudingBox = new THREE.Box3().setFromObject( this.dragObject );
	this.dragObjectWidth = Math.abs( boudingBox.max.x - boudingBox.min.x );

	if ( this.TRACE ) console.log( "dragObject width: " + this.dragObjectWidth );

	var intersectionPoint = event.point.clone();
	if (this.inAltspace) {
		// TODO: Investigate if this bug in Altspace event or our mistake.
		intersectionPoint.z *= -1; // invert z cordinate
	}

	if ( !intersectionPoint ) {
		console.error("drag start but no intersected object");
		return;
	}

	if ( this.TRACE ) console.log( "Intersection point:", intersectionPoint );

	if ( this.dragObject ) {

		if ( this.orbitControls ) {
			this.orbitControls.enabled = false;
		}

		// Raise/lower the drag plane to match the drag start point.
		this.dragPlane.position.y = intersectionPoint.y;

		// Force update, otherwise old position of dragPlane is used when raycaster
		// computes drag point later, and objects appear to "jump" when selected.
		this.dragPlane.updateMatrixWorld();
		if ( this.TRACE ) console.log( "Moving dragPlane.position.y to " + intersectionPoint.y );

		// Remember difference between center of object and drag point.
		var objectCenterPoint = this.dragObject.position.clone();
		objectCenterPoint.y = this.dragPlane.position.y;
		this.dragOffset.copy( intersectionPoint ).sub( objectCenterPoint );

	} else {

		console.error("dragStart called, but object not selected");

	}

};


DragPlaneEffect.prototype.dragEnd = function() {

		if ( this.TRACE ) console.log("Ending drag");

		if ( this.orbitControls ) {
			this.orbitControls.enabled = true;
		}

		this.dragObject = null;

		// Return dragPlane to ground-level. Not strictly needed since we'll reset
		// on new drag, but looks better if the dragPlane is visible, e.g. for debugging.
		this.dragPlane.position.y = 0;
};


DragPlaneEffect.prototype.dragUpdate = function() {
	// based on http://threejs.org/examples/#webgl_interactive_draggablecubes
	// but changed to constrain dragging to x-z ground plane, instead of x-y vertical plane.

	if (!this.dragObject) return;  // No drag, we're done.

	this.raycaster.set( this.rayOrigin, this.rayDirection );
	var intersects = this.raycaster.intersectObject( this.dragPlane );

	if (intersects.length === 0) {
		if ( this.TRACE ) console.log( "Ray no longer intersects dragplane");
		this.dragEnd();
		return;
	}

	var dragPoint = intersects[0].point.clone();

	if ( this.dragPointMarker ) {
		this.dragPointMarker.position.x = dragPoint.x;
		this.dragPointMarker.position.y = dragPoint.y;
		this.dragPointMarker.position.z = dragPoint.z;
	}

	// Update object position to where raycaster intersects dragPlane (minus offset).
	var newPosition = new THREE.Vector3();
	newPosition.copy( dragPoint ).sub( this.dragOffset );

	// But maintain the original y position of the object.
	newPosition.y = this.dragObject.position.y;

	// Constrain new position to the width and depth of the dragPlane.
	// Prevents object from getting moved outside the bounding volume in Altspace.
	// Account for object width, otherwise objects end up halfway off the dragPlane.
	var params = this.dragPlane.geometry.parameters;
	var objectWidth = this.dragObjectWidth;

	if (dragPoint.x - objectWidth/2 < this.dragPlane.position.x - params.width/2) {
		newPosition.x = this.dragPlane.position.x - params.width/2 + objectWidth/2;
	}
	if (dragPoint.x + objectWidth/2 > this.dragPlane.position.x + params.width/2) {
		newPosition.x = this.dragPlane.position.x + params.width/2 - objectWidth/2;
	}
	if (dragPoint.z - objectWidth/2 < this.dragPlane.position.z - params.depth/2) {
		newPosition.z = this.dragPlane.position.z - params.depth/2 + objectWidth/2;
	}
	if (dragPoint.z + objectWidth/2 > this.dragPlane.position.z + params.depth/2) {
		newPosition.z = this.dragPlane.position.z + params.depth/2 - objectWidth/2;
	}

	this.dragObject.position.copy( newPosition );

	// Save our new position to the cloud, will update other players.
	if ( this.firebaseSync ) {
		this.firebaseSync.saveObject(this.dragObject);
	}

	return;

};

