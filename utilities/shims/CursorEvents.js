/*
 * CursorEvents detects mouse events using the Three.js raycaster,
 * then dispatches an event the mimics Altspace cursor events.
 * This allows events to function similarly in and outside Altspace.
 *
 * Attribution: based on ObjectControls by cabbibo (http://cabbi.bo)
 * Version 3/17/2015 from https://github.com/cabbibo/ObjectControls
 * 
 */
function CursorEvents( scene, camera, params ){

	this.intersected;
	this.selected;

	this.intersectionPoint;

	this.scene = scene;
	this.camera = camera;

	this.mouse = new THREE.Vector3();
	this.unprojectedMouse = new THREE.Vector3();

	var params = params || {};
	var p = params;

	this.TRACE = p.TRACE || false; // Log all events.

	this.domElement = p.domElement || document;

	// Recursively check descendants of objects in this.objects for intersections.
	this.recursive = p.recursive || true;

	// Call all events on the scene, as well as target objets.
	this.scene = scene;

	this.raycaster = new THREE.Raycaster();

	this.raycaster.near = this.camera.near;
	this.raycaster.far = this.camera.far;


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
	this.updateRaycaster();

}



/* CURSOR EVENTS */

CursorEvents.prototype.cursormove = function( event ){

	if(this.TRACE) {console.log("CursorEvents shim: cursormove");}

	var mockCursorEventScene = this.mockCursorEvent( 'cursormove', event, this.scene );
	scene.dispatchEvent( mockCursorEventScene );

}


CursorEvents.prototype.cursorleave = function( object ){

	if(this.TRACE) { console.log("CursorEvents shim: cursorleave", object); }
	
	this.objectHovered = false;
	
	var mockCursorEvent = this.mockCursorEvent( 'cursorleave', event, object );
	object.dispatchEvent( mockCursorEvent );

	var mockCursorEventScene = this.mockCursorEvent( 'cursorleave', event, this.scene );
	scene.dispatchEvent( mockCursorEventScene );
};


CursorEvents.prototype.cursorenter = function( object ){
 
	if(this.TRACE) {console.log("CursorEvents shim: cursorenter", object);}
	
	this.objectHovered = true;

	var mockCursorEvent = this.mockCursorEvent( 'cursorenter', event, object );
	object.dispatchEvent( mockCursorEvent );

	var mockCursorEventScene = this.mockCursorEvent( 'cursorenter', event, this.scene );
	scene.dispatchEvent( mockCursorEventScene );
};


CursorEvents.prototype.cursordown = function( event, object ){

	if(this.TRACE) {console.log("CursorEvents shim: cursordown", object);}

	this.selected = object;

	var mockCursorEvent = this.mockCursorEvent( 'cursordown', event, object );
	object.dispatchEvent( mockCursorEvent );

	var mockCursorEventScene = this.mockCursorEvent( 'cursordown', event, this.scene );
	scene.dispatchEvent( mockCursorEventScene );
};


CursorEvents.prototype.cursorup = function( event, object ){

	if(this.TRACE) {console.log("CursorEvents shim: cursorup", object);}

	this.selected = undefined;

	var mockCursorEvent = this.mockCursorEvent( 'cursorup', event, object );
	object.dispatchEvent( mockCursorEvent );

	var mockCursorEventScene = this.mockCursorEvent( 'cursorup', event, this.scene );
	scene.dispatchEvent( mockCursorEventScene );

};


CursorEvents.prototype.mockCursorEvent = function( eventName, event, object ) {

	// currentTarget: THREE.Scene or THREE.Object3D
	// cursorRay: Object (obsolete)
	// point: THREE.Vector3
	// ray: THREE.Ray
	// stopImmediatePropagation: function
	// stopPropagation: function
	// target: THREE.Mesh
	// type: 'cursorenter'

	var origin = this.raycaster.ray.origin;
	var direction = this.raycaster.ray.direction;
	var point =	this.intersectionPoint ? this.intersectionPoint.clone() : null;

	var mockCursorEvent = { 

		currentTarget: object,
		cursorRay: { // TODO: remove this once it's removed from Altspace event
			origin: { x: origin.x, y: origin.y, z: origin.z },
			direction: { x: direction.x, y: direction.y, z: direction.z },
		},
		point: point,
		ray: {
			origin: origin,
			direction: direction,
		},
		// target gets set by EventDispatcher
		type: eventName,
	}

	return mockCursorEvent;

}


/* UPDATE */

CursorEvents.prototype.updateRaycaster = function(){


	if ( this.unprojectedMouse ) {

		this.setRaycaster( this.unprojectedMouse );
		if( !this.selected ){

			this.checkForIntersections();

		}

	}

};


CursorEvents.prototype.setRaycaster = function( position ){

	var origin = position;
	var direction = origin.clone()

	direction.sub( this.camera.position );
	direction.normalize();

	this.raycaster.set( this.camera.position, direction );

}


/* CHECKS */

CursorEvents.prototype.checkForIntersections = function(){

	// TODO: Implement bubbling, don't assume scene top-level objects.
	var intersected = this.raycaster.intersectObjects( this.scene.children, this.recursive );


	if( intersected.length > 0 ){

		for (var n = 0; n < intersected.length; n++ ) {

			if ( this.recursive ) {

				var topLevelObj = this.findTopLevelAncestor( intersected[n].object );
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

		this.objectIntersected( intersected );

	}else{

		this.noObjectIntersected();

	}

};

CursorEvents.prototype.checkForUpDown = function( hand , oHand ){

	if( this.upDownEvent( this.selectionStrength , hand, oHand ) === true ){
	
		this.down();
	
	}else if( this.upDownEvent( this.selectionStrength, hand, oHand ) === false ){
	
		this.up();
	
	}

};




CursorEvents.prototype.getIntersectionPoint = function( i ){

	var intersected = this.raycaster.intersectObjects( this.scene.children, this.recursive );
 
	return intersected[0].point.sub( i.position );

}

CursorEvents.prototype.findTopLevelAncestor = function( object ){

	// Traverse back up until we find the first ancestor that is a top-level
	// object then return it (or null), since only top-level objects (which
	// were passed to objectControls.add) handle events, even if their child
	// objects are the ones intersected.

	while ( this.scene.children.indexOf(object) === -1) {

		if ( !object.parent ) {

			return null;

		}

		object = object.parent;

	}

	return object;

} 



/* RAYCAST EVENTS */

CursorEvents.prototype.objectIntersected = function( intersected ){

	// Assigning out first intersected object
	// so we don't get changes everytime we hit 
	// a new face
	var firstIntersection = intersected[0].object;

	if( !this.intersected ){

		this.intersected = firstIntersection;
		this.intersectionPoint = intersected[0].point;

		this.cursorenter( this.intersected );


	}else{

		if( this.intersected != firstIntersection ){

			this.cursorleave( this.intersected );

			this.intersected = firstIntersection;
			this.intersectionPoint = intersected[0].point;

			this.cursorenter( this.intersected );

		} else {

			// Same object intersected, just update intersection point.
			this.intersectionPoint = intersected[0].point;

		}

	}

};

CursorEvents.prototype.noObjectIntersected = function(){

	if( this.intersected ){

		this.cursorleave( this.intersected );
		this.intersected = undefined;
		this.intersectionPoint = undefined;

	}

};


/* MOUSE EVENTS */

CursorEvents.prototype.mouseMove = function( event ){

	this.mouseMoved = true;

	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	this.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
	this.mouse.z = 1;

	this.unprojectMouse();
	this.updateRaycaster();

	this.cursormove(event);
}

CursorEvents.prototype.unprojectMouse = function(){
	this.unprojectedMouse.copy( this.mouse );
	this.unprojectedMouse.unproject( this.camera );

}

CursorEvents.prototype.mouseDown = function( event ){
	//this.mouseMove( event ); // remove to match Altspace

	if( this.intersected ){
	 
		this.cursordown( event, this.intersected );

	}
}

CursorEvents.prototype.mouseUp = function( event ){
	//this.mouseMove( event ); // remove to match Altspace

	if( this.selected ){

		this.cursorup( event, this.selected );

	}
}


