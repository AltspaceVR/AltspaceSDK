/*
 * CursorEvents dispatches Cursor API events to the target object.
 * Thus you can attach event listeners to objects instead of the window:
 * myObject.addEventListener( "holocursorenter", myEventHandler );
 *
 * Can also manage AltObjectControls and CursorEffects, if enabled then
 * those two libraries are also required for this one to function.
 *
 * Author: Amber Roy
 * Copyright (c) 2015 AltspaceVR
 */

CursorEvents = function( params ) {

	this.p = params || {};

	// Dispatch events without a target to this object.
	this.defaultTarget = this.p.defaultTarget || null;


	this.objectLookup = {};  // objectLookup[ object.uuid ] = object

	// Cursor Effects
	this.objectEffects = {};  // objectEffects[ object.uuid ] = [ effect1, effect2, ... ]
	this.effects = [];  // flat list of all effects
	this.effectsState = {}; // built-in: copy of lastEvent, other values added by effects

	this.inAltspace = !!window.Alt;

	if ( inAltspace ) {

		var dispatcher = this._holoCursorDispatch.bind( this ); 

		// Cursor Events from Altspace
		window.addEventListener("holocursormove", dispatcher);
		window.addEventListener("holocursordown", dispatcher);
		window.addEventListener("holocursorup", dispatcher);
		window.addEventListener("holocursorenter", dispatcher);
		window.addEventListener("holocursorleave", dispatcher);

	}

};


CursorEvents.prototype.addEffect = function( effect, object ) {

	if ( !object || !effect ) {
		console.error("AddEffect requires a valid effect and object", effect, object );
		return ; // sanity check
	}

	if ( !this.objectEffects[ object.uuid ] ) {

		// First time an effect added to this object, initialize it.
		this.objectEffects[ object.uuid ] = [];		

	}

	if ( this.effects.indexOf( effect ) === -1 ) {
		this.effects.push( effect );
	}

	if ( object ) {

		this.objectEffects[ object.uuid ].push( effect );

	} else {

		// If no object given, add this effect for all objects.
		var uuids = Object.keys( this.objectEffects );
		for (var i=0; i < uuids.length; i++) {

			this.objectEffects[ uuids[i] ].push( effect ); 

		}

	}

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

	var dispatcher = this._objectControlsDispatch.bind( this ); 

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

	this._updateEffects();

};

CursorEvents.prototype.addObject = function( object ) {
  // TODO: Corresponding removeEffect method.

  if ( !object ) {
    console.error("CursorEvents.addObject expected one argument");
    return ; // sanity check
  }

  if ( !this.objectLookup[ object.uuid ] ) {

    this.objectLookup[ object.uuid ] = object;

    if ( this.objectControls ) {
    	this.objectControls.add( object );
    }
  }

};


CursorEvents.prototype._holoCursorDispatch = function( event ) {

	var detail = this._createEventDetail( event );
	var objectEvent = new CustomEvent( event.type, { detail: detail });

	// Use uuid to map from Altspace object to its corresponding ThreeJS object.
	// Currently cursor events fire on all objects, even non-interactive ones,
	// so only dispatch events on objects that have been added to objectControls.

	if ( objectEvent.detail.targetUuid ) {

		var targetObject = this.objectLookup[ objectEvent.detail.targetUuid ];
		if ( targetObject ) {

			targetObject.dispatchEvent( objectEvent );

			this._dispatchEffects( targetObject, objectEvent );

		}

	} else {

		// For events not associated with a uuid, dispatch on defaultTarget.
		// Currently only one is "holocursormove"
		if ( this.defaultTarget ) {

			this.defaultTarget.dispatchEvent( objectEvent );

		}

		// Always dispatch to objectEffects, which needs latest cursorRay
		// for effects like drag, otherwise cursor can "escpace" object.
		this._dispatchEffects( this.defaultTarget, objectEvent );

	}

};

CursorEvents.prototype._objectControlsDispatch = function( object, eventDetail ) {

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

    this._holoCursorDispatch( mockCursorEvent );

};

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


CursorEvents.prototype._dispatchEffects = function( object, event ) {

  // Save most recent event, for effects that track cursorRay (like drag).
  this.effectsState.lastEvent = event;

  // No object (e.g. move event with no defaultTarget) or no effects for object.
  if ( !object || !this.objectEffects[ object.uuid ] ) return ;

  var effects = this.objectEffects[ object.uuid ];
  for ( var i=0; i < effects.length; i++) {

    var effect = effects[ i ];
    var effectCallback = null;

    if ( effect[ event.type ]) {

      effectCallback = effect[ event.type ].bind( effect );
      effectCallback( object, event );
    }
  }

};


CursorEvents.prototype._updateEffects = function() {

  // Call update( this.effectState ) on all effects that define it.
  // Optional return value is the new effect state, useful for effects
  // that need to share state between them. Note we are chaining updates,
  // so an effect that depends on state managed by other events should
  // be added after them.

  for (var i=0; i < this.effects.length; i++) {

    var effect = this.effects[i];
    if ( effect.update ) {

      var newEffectsState = effect.update( this.effectsState );
      if ( newEffectsState ) {

        this.effectsState = newEffectsState;

      }

    }
    
  }

};



