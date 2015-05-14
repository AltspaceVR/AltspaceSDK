/*
 * DragPlaneEffect implements drag-and-drop of objects.
 * Apply using CursorEffects.
 *
 * Author: Amber Roy
 * Copyright (c) 2015 AltspaceVR
 */

DragPlaneEffect = function ( params ) {

	this.hoverObject;
	this.dragObject;

	this.dragOffset = new THREE.Vector3();

  // Needed to interect dragPlane and compute new position of dragObject.
  this.raycaster;

  var p = params || {};

  // Save object as drag position changes.
  this.firebaseSync = p.firebaseSync || null;

  // Disable orbit controls during a drag (non-Altspace only). 
  this.orbitControls = p.orbitControls || null;

  this.dragPlane = p.dragPlane || null;

  if ( !this.dragPlane ) {
    // Default drag plane, for demo only! Normally it should be passed in,
    // with location and width/depth matching drag area of your scene.
    this.dragPlane = new THREE.Mesh( 
      new THREE.BoxGeometry(1000, 0.25, 1000),
      new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.25 })
    );
  }

  // Mark the intersection point when an object is dragged and on hoverOver.
  // Intended as a debugging aide. Mesh with SphereGeometry works well.
  this.dragPointMarker = p.dragPointMarker || null;

};

DragPlaneEffect.prototype.holocursordown = function( object, event ) {

  this.dragStart( object, event );

}

DragPlaneEffect.prototype.holocursorup = function( object, event ) {

  this.dragEnd( object, event );

  // To use click-release to start drag, move, then click-release to end drag,
  // ignore holocursordown and toggle between start/end drag here as follows:
  // this.dragObject ? this.dragEnd( object, event ) : this.dragStart( object, event );
  // We could add this as option set in constructor params if desired.

}


DragPlaneEffect.prototype.dragStart = function( object, event ) {

  this.dragObject = object;

  var intersects = this.raycaster.intersectObject( object, true );
  if ( intersects.length === 0) {
    console.error("dragStart but no intersected object");
    return ; // something went wrong
  }
  var intersectionPoint = intersects[0].point;

  if ( this.dragObject ) {

    if ( this.orbitControls ) {
      this.orbitControls.enabled = false;
    }

    // Raise/lower the drag plane to match the drag start point.
    this.dragPlane.position.y = intersectionPoint.y;

    // Force update, otherwise old position of dragPlane is used when raycaster
    // computes drag point later, and objects appear to "jump" when selected.
    this.dragPlane.updateMatrixWorld();

    // Remember difference between center of object and drag point.
    var objectCenterPoint = this.dragObject.position.clone();
    objectCenterPoint.y = this.dragPlane.position.y;
    this.dragOffset.copy( intersectionPoint ).sub( objectCenterPoint );

  } else {

    console.error("dragStart called, but object not selected");

  }

};


DragPlaneEffect.prototype.dragEnd = function( object, event ) {

    if ( this.orbitControls ) {
      this.orbitControls.enabled = true;
    }

    this.dragObject = null;

    // Return dragPlane to ground-level. Not strictly needed since we'll reset
    // on new drag, but looks better if the dragPlane is visible, e.g. for debugging.
    this.dragPlane.position.y = 0;
};


DragPlaneEffect.prototype.update = function( effectsState ) {
  // based on http://threejs.org/examples/#webgl_interactive_draggablecubes
  // but changed to constrain dragging to x-z ground plane, instead of x-y vertical plane.

  effectsState.dragObject = this.dragObject;

  this._setRaycaster( effectsState.lastEvent );

  if (!this.dragObject) return effectsState ;  // No drag, we're done.

  var intersects = this.raycaster.intersectObject( this.dragPlane );

  if (intersects.length === 0) {
    this.dragEnd();
    return effectsState ;
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

  // TODO: Correctly assign object width based on object bounding box.
  var objectWidth = 25;

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

  return effectsState;
};


DragPlaneEffect.prototype._setRaycaster = function( lastEvent ) {

  if ( !lastEvent ) return ; // No cursor events yet.

  if ( !this.raycaster ) {
    var params = this.dragPlane.geometry.parameters;
    this.raycaster = new THREE.Raycaster();

    // Raycaster usually set from Three.js camera, but here assume near=1 and
    // make "far" 20% bigger than dragplane (if smaller, raycast won't work).
    this.raycaster.near = 1;
    this.raycaster.far = Math.max(params.width, params.depth) * 1.2;
  }

  var cursorRay = lastEvent.detail.cursorRay;
  this.raycaster.set( cursorRay.origin, cursorRay.direction );

};




