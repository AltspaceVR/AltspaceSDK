/*
 * NOTE: Used internally by CursorEffects; no need to instantiate manually! 
 *
 * CursorEvents detects mouse events using the Three.js raycaster.
 * This allows events to function similarly in and outside Altspace.
 * To activate: cursorEventsSingleton.enableMouseEvents( camera )
 *
 * Attribution: based on ObjectControls by cabbibo (http://cabbi.bo)
 * Version 3/17/2015 from https://github.com/cabbibo/ObjectControls
 * 
 * Modifications
 * Added intersectionPoint: where raycast meets the target object.
 * Added delegate: optionally receives all events, instead of target object.
 * Added eventDetail: contains ray origin, direction, intersection point, etc. 
 *
 */
function CursorEvents( eye , params ){

	this.intersected;
	this.selected;

	this.intersectionPoint;

	this.eye = eye;

	this.mouse = new THREE.Vector3();
	this.unprojectedMouse = new THREE.Vector3();

	this.objects = [];

	var params = params || {};
	var p = params;

	this.domElement = p.domElement || document;

	// Recursively check descendants of objects in this.objects for intersections.
	this.recursive = p.recursive || false;

	// Call all events on this one object, not the intersected object.
	this.delegate = p.delegate || null;

	this.raycaster = new THREE.Raycaster();

	this.raycaster.near = this.eye.near;
	this.raycaster.far = this.eye.far;


	var addListener = this.domElement.addEventListener;

	var cb1 = this.mouseDown.bind( this );
	var cb2 = this.mouseUp.bind( this );
	var cb3 = this.mouseMove.bind( this );

	this.domElement.addEventListener( 'mousedown', cb1, false )
	this.domElement.addEventListener( 'mouseup'	, cb2, false )
	this.domElement.addEventListener( 'mousemove', cb3, false )

	this.domElement.addEventListener( 'touchdown', cb1, false )
	this.domElement.addEventListener( 'touchup'	, cb2, false )
	this.domElement.addEventListener( 'touchmove', cb3, false )

	this.unprojectMouse();

}




/*
 
	 EVENTS

*/


// You can think of _up and _down as mouseup and mouse down
CursorEvents.prototype._down = function(){

	this.down();

	if( this.intersected ){
	 
		this._select( this.intersected );

	}

}

CursorEvents.prototype.down = function(){}



CursorEvents.prototype._up = function(){

	this.up();

	if( this.selected ){

		this._deselect( this.selected );

	}

}

CursorEvents.prototype.up = function(){}


CursorEvents.prototype._move = function(){
	this.move();

	if ( this.delegate ) {

		this.delegate.move( null, this._eventDetail( "move" ) );

	}

}

CursorEvents.prototype.move = function(){}


CursorEvents.prototype._hoverOut = function( object ){

	this.hoverOut();
	
	this.objectHovered = false;
	
	if ( this.delegate ) {

		this.delegate.hoverOut( object, this._eventDetail( "hoverOut" ) );
		
	} else {

		if( object.hoverOut ){
			object.hoverOut( this );
		}

	}

};

CursorEvents.prototype.hoverOut = function(){};


CursorEvents.prototype._hoverOver = function( object ){
 
	this.hoverOver();
	
	this.objectHovered = true;

	if ( this.delegate ) {

		this.delegate.hoverOver( object, this._eventDetail( "hoverOver" ) );
		
	} else {

		if( object.hoverOver ){
			object.hoverOver( this );
		}

	}

};

CursorEvents.prototype.hoverOver = function(){};


CursorEvents.prototype._select = function( object ){
 
	this.select();

	this.selected = object;

	if ( this.delegate ) {

		this.delegate.select( object, this._eventDetail( "select" ) );
		
	} else {

		if( object.select ){
			object.select( this );
		}

	}

};

CursorEvents.prototype.select = function(){}



CursorEvents.prototype._deselect = function( object ){

	this.selected = undefined;

	if ( this.delegate ) {

		this.delegate.deselect( object, this._eventDetail( "deselect") );
		
	} else {

		if( object.deselect ){
			object.deselect( this );
		}

	}

	this.deselect();

};

CursorEvents.prototype.deselect = function(){}


CursorEvents.prototype._eventDetail = function( eventName ){

	var origin = this.raycaster.ray.origin;
	var direction = this.raycaster.ray.direction;
	var point =	this.intersectionPoint ? this.intersectionPoint.clone() : null;

	var detail = {

		name: eventName,
		raycaster: {
			ray: {
				origin: { x: origin.x, y: origin.y, z: origin.z },
				direction: { x: direction.x, y: direction.y, z: direction.z },
			},
			near: this.raycaster.near,
			far: this.raycaster.far,
		},
		intersectionPoint: point ? { x: point.x, y: point.y, z: point.z } : null,

	};

	return detail;

}



/*

	Changing what objects we are controlling

*/

CursorEvents.prototype.add = function( object ){

	this.objects.push( object );

};

CursorEvents.prototype.remove = function( object ){

	for( var i = 0; i < this.objects.length; i++ ){

		if( this.objects[i] == object ){
	
			this.objects.splice( i , 1 );

		}

	}

};



/*
 
	 Update Loop

*/

CursorEvents.prototype.update = function(){


	if ( this.unprojectedMouse ) {

		this.setRaycaster( this.unprojectedMouse );
		if( !this.selected ){

			this.checkForIntersections();

		}else{

			this._updateSelected( this.unprojectedMouse );

		}

	}

};

CursorEvents.prototype._updateSelected = function(){

	if( this.selected.update ){

		this.selected.update( this );

	}

}

CursorEvents.prototype.updateSelected = function(){};




CursorEvents.prototype.setRaycaster = function( position ){

	var origin = position;
	var direction = origin.clone()

	direction.sub( this.eye.position );
	direction.normalize();

	this.raycaster.set( this.eye.position, direction );

}



/*
 
	Checks

*/

CursorEvents.prototype.checkForIntersections = function(){

	var intersected = this.raycaster.intersectObjects( this.objects, this.recursive );


	if( intersected.length > 0 ){

		for (var n = 0; n < intersected.length; n++ ) {

			if ( this.recursive ) {

				var topLevelObj = this._findTopLevelAncestor( intersected[n].object );
				if ( topLevelObj ) {

					// Reset intersected.object, leave intersected.point etc. unchanged.
					// This works since in the two most common use cases the ancestor:
					// (1) contains the child object (and the intersection point)
					// (2) is not a THREE.Mesh and thus doesn't appear in the scene, 
					//     e.g. an Object3D used for grouping other related objects.
					intersected[n].object = topLevelObj;

				}

			}

		}

		this._objectIntersected( intersected );

	}else{

		this._noObjectIntersected();

	}

};

CursorEvents.prototype.checkForUpDown = function( hand , oHand ){

	if( this.upDownEvent( this.selectionStrength , hand, oHand ) === true ){
	
		this._down();
	
	}else if( this.upDownEvent( this.selectionStrength, hand, oHand ) === false ){
	
		this._up();
	
	}

};




CursorEvents.prototype.getIntersectionPoint = function( i ){

	var intersected = this.raycaster.intersectObjects( this.objects, this.recursive );
 
	return intersected[0].point.sub( i.position );

}

CursorEvents.prototype._findTopLevelAncestor = function( object ){

	// Traverse back up until we find the first ancestor that is a top-level
	// object then return it (or null), since only top-level objects (which
	// were passed to objectControls.add) handle events, even if their child
	// objects are the ones intersected.

	while ( this.objects.indexOf(object) === -1) {

		if ( !object.parent ) {

			return null;

		}

		object = object.parent;

	}

	return object;

} 



/*
 
	 Raycast Events

*/

CursorEvents.prototype._objectIntersected = function( intersected ){

	// Assigning out first intersected object
	// so we don't get changes everytime we hit 
	// a new face
	var firstIntersection = intersected[0].object;

	if( !this.intersected ){

		this.intersected = firstIntersection;
		this.intersectionPoint = intersected[0].point;

		this._hoverOver( this.intersected );


	}else{

		if( this.intersected != firstIntersection ){

			this._hoverOut( this.intersected );

			this.intersected = firstIntersection;
			this.intersectionPoint = intersected[0].point;

			this._hoverOver( this.intersected );

		} else {

			// Same object intersected, just update intersection point.
			this.intersectionPoint = intersected[0].point;

		}

	}

	this.objectIntersected();

};

CursorEvents.prototype.objectIntersected = function(){}

CursorEvents.prototype._noObjectIntersected = function(){

	if( this.intersected ){

		this._hoverOut( this.intersected );
		this.intersected = undefined;
		this.intersectionPoint = undefined;

	}

	this.noObjectIntersected();

};

CursorEvents.prototype.noObjectIntersected = function(){}


CursorEvents.prototype.mouseMove = function(event){

	this.mouseMoved = true;

	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	this.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
	this.mouse.z = 1;

	this.unprojectMouse();

	this._move();
}

CursorEvents.prototype.unprojectMouse = function(){
	this.unprojectedMouse.copy( this.mouse );
	this.unprojectedMouse.unproject( this.eye );

}

CursorEvents.prototype.mouseDown = function( event ){
	//this.mouseMove( event ); // remove to match Altspace
	this._down();
}

CursorEvents.prototype.mouseUp = function(){
	//this.mouseMove( event ); // remove to match Altspace
	this._up();
}


CursorEvents.prototype.touchStart = function(event){
	//this.touchMove( event ); // remove to match Altspace
	this._down();
}

CursorEvents.prototype.touchEnd = function(event){
	//this.touchMove( event ); // remove to match Altspace
	this._up();
}

CursorEvents.prototype.touchMove= function(event){

	this.mouseMoved = true;

	this.mouse.x = ( event.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
	this.mouse.y = -( event.touches[ 0 ].pageY / window.innerHeight ) * 2 + 1;
	this.mouse.z = 1;

	this.unprojectMouse();
	
}
