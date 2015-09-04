// Dispatch cursor events to effects registered with this class.
CursorEffects = function( params ) {

	this.scene; // set when we add the first object

	var p = params || {};

	// Debugging log
	this.TRACE = p.TRACE;

	// Cursor Effects
	this.objectEffects = {};  // objectEffects[ object.uuid ] = [ effect1, effect2, ... ]
	this.effects = [];  // flat list of all effects
	this.effectsState = {}; // built-in: copy of lastEvent, other values added by effects

	var cursorEvents;	// shim used when outside of Altspace to dispatch cursor events
	var inAltspace = !!window.altspace;
	if ( !inAltspace ) {
		var params = { TRACE: this.TRACE, recursive: true};
		this.cursorEvents =  new CursorEvents( camera, params ); 
	}
};


CursorEffects.prototype.addEffect = function( effect, object ) {

	if ( !object || !effect ) {
		console.error("AddEffect requires a valid effect and object", effect, object );
		return ; // sanity check
	}

	if ( this.effects.length === 0 ) {
		this.scene = CursorEffects.getScene( object );
	}

	if ( !this.objectEffects[ object.uuid ] ) {

		// First time an effect added to this object, initialize it.
		this.objectEffects[ object.uuid ] = [];		

		// Attach listeners
		var dispatcher = this._dispatchEffects.bind( this ); 
		object.addEventListener("cursordown", dispatcher);
		object.addEventListener("cursorup", dispatcher);
		object.addEventListener("cursorenter", dispatcher);
		object.addEventListener("cursorleave", dispatcher);
		
		if ( this.cursorEvents ) {
			THREE.EventDispatcher.call( object );
			this.cursorEvents.add( object );
		}

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


CursorEffects.prototype._dispatchEffects = function( event ) {

	if ( this.TRACE ) console.log(event.type, event);

	// Save most recent event, for effects that track cursorRay (like drag).
	this.effectsState.lastEvent = event;

	var target = event.currentTarget;
	if ( !target || !this.objectEffects[ target.uuid ] ) {
		console.error("Unexpected target object for event", event);
	}

	var effects = this.objectEffects[ target.uuid ];
	for ( var i=0; i < effects.length; i++) {

		var effect = effects[ i ];
		var effectCallback = null;

		if ( effect[ event.type ]) {

			effectCallback = effect[ event.type ].bind( effect );
			effectCallback( target, event );

		}

	}

};


// STATIC method
CursorEffects.getScene = function( object ) {

	// Find the parent scene for the given object
	var parent = object.parent;
	while ( parent ) {
		if ( parent instanceof THREE.Scene ) {
			break;
		}
		parent = object.parent;
	}
	if ( !parent ) {
		console.error("Object must be a child of the scene", object);
		return;
	}
	return parent;

};


CursorEffects.prototype.update = function() {

	if ( this.cursorEvents ) {
		this.cursorEvents.update();
	}

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

