/**
 * CursorEvents dispatches Cursor API events to the target object.
 * Thus you can attach event listeners to objects instead of the window:
 * myObject.addEventListener( "holocursorenter", myEventHandler );
 *
 * Can also manage AltObjectControls and CursorEffects, if enabled then
 * those two libraries are also required for this one to function.

 * @author Amber Roy
 * Copyright (c) 2015 AltspaceVR
 */

CursorEvents = function( params ) {

	this.p = params || {};

	// Dispatch events without a target to this object.
	this.defaultTarget = this.p.defaultTarget || null;


	this.objectLookup = {};  // objectLookup[ object.uuid ] = object

	this.camera;
	this.objectControls;
	this.objectControlsDelegate;

	this.objectEffects;

	// TODO: add camera for when not in altspace
	// TODO: add raycaster

	this.inAltspace = !!window.Alt;

	if ( inAltspace ) {

		var dispatcher = this.holoCursorDispatch.bind( this ); 

		// Cursor Events from Altspace
		window.addEventListener("holocursormove", dispatcher);
		window.addEventListener("holocursordown", dispatcher);
		window.addEventListener("holocursorup", dispatcher);
		window.addEventListener("holocursorenter", dispatcher);
		window.addEventListener("holocursorleave", dispatcher);

	}

};


CursorEvents.prototype.enableEffects = function() {

	this.objectEffects = new CursorEffects();

};


CursorEvents.prototype.addEffect = function( effect, object ) {

	if ( !this.objectEffects ) {
		console.error("CursorEffects not enabled");
		return ; // sanity check 
	}

	this.objectEffects.addEffect( effect, object );

};	


CursorEvents.prototype.enableMouseEvents = function( camera ) {

	if ( this.inAltspace ) return ; // in Altspace, use cursor events only

	if ( !camera ) {
		console.error( "Camera required to enableMouseEvents");
		return; // Withotu a camera, cannot use the raycaster.
	}
	this.camera = camera;

	this.objectControlsDelegate = new THREE.Object3D(); // dummy object
	var params = {
		recursive: true,
		delegate: this.objectControlsDelegate
	};
	this.objectControls = new AltObjectControls( this.camera, params );

	var dispatcher = this.objectControlsDispatch.bind( this ); 

	this.objectControlsDelegate.hoverOver = dispatcher;
	this.objectControlsDelegate.hoverOut = dispatcher;
	this.objectControlsDelegate.select = dispatcher;
	this.objectControlsDelegate.deselect = dispatcher;
	this.objectControlsDelegate.move = dispatcher;

};

CursorEvents.prototype.update = function() {
	
	if ( this.objectControls ) {

		this.objectControls.update();

	}

	if ( this.objectEffects ) {

		this.objectEffects.update();

	}
};

CursorEvents.prototype.add = function( object ) {
  // TODO: Corresponding removeEffect method.

  if ( !object ) {
    console.error("CursorEvents.add object missing");
    return ; // sanity check
  }

  if ( !this.objectLookup[ object.uuid ] ) {

    this.objectLookup[ object.uuid ] = object;

    if ( this.objectControls ) {
    	this.objectControls.add( object );
    }
  }

};


CursorEvents.prototype.holoCursorDispatch = function( event ) {

	var detail = this._createEventDetail( event );
	var objectEvent = new CustomEvent( event.type, { detail: detail });

	// Use uuid to map from Altspace object to its corresponding ThreeJS object.
	// Currently cursor events fire on all objects, even non-interactive ones,
	// so only dispatch events on objects that have been added to objectControls.

	if ( objectEvent.detail.targetUuid ) {

		var targetObject = this.objectLookup[ objectEvent.detail.targetUuid ];
		if ( targetObject ) {

			targetObject.dispatchEvent( objectEvent );

			if ( this.objectEffects ) {

				this.objectEffects.dispatchEffects( targetObject, objectEvent );

			}
		}

	} else {

		// For events not associated with a uuid, dispatch on defaultTarget.
		// Currently only one is "holocursormove"
		if ( this.defaultTarget ) {

			this.defaultTarget.dispatchEvent( objectEvent );

		}

		if ( this.objectEffects ) {

			// Always dispatch to objectEffects, which needs latest cursorRay
			// for effects like drag, otherwise cursor can "escpace" object.
			this.objectEffects.dispatchEffects( this.defaultTarget, objectEvent );

		}

	}

};

CursorEvents.prototype.objectControlsDispatch = function( object, eventDetail ) {

	var eventNameMapping = {
		"hoverOver" : "holocursorenter",
		"hoverOut" : "holocursorleave",
		"select" : "holocursordown",
		"deselect" : "holocursorup",
		"move" : "holocursormove",
	};

	var eventName = eventNameMapping[ eventDetail.name ];
	if ( !eventName ) {
		console.error("AltObjectControls event name unrecognized", eventName);
		return ; // Cannot map event to holocursor event.
	}

	var mockCursorEvent = {
		type: eventName,
		targetUuid: eventDetail.name !== "move" ? object.uuid : null,
		cursorRay: eventDetail.raycaster.ray,
	};

    this.holoCursorDispatch( mockCursorEvent );

}

CursorEvents.prototype._createEventDetail = function( event ) {

	var origin = new THREE.Vector3(
		event.cursorRay.origin.x,
		event.cursorRay.origin.y,
		event.cursorRay.origin.z
	);

	var direction = new THREE.Vector3(
		event.cursorRay.direction.x,
		event.cursorRay.direction.y,
		event.cursorRay.direction.z
	);

	var cursorRay = new THREE.Ray( origin, direction );

	// All custom event data should go in the detail object.
	// TODO: Fix original event generated by Altspace.
	var detail = {
		targetUuid: event.targetUuid,
		cursorRay: cursorRay,
	};

	return detail;
};

