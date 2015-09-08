// Dispatch cursor events to effects registered with this class.
CursorEffects = function( scene, params ) {

	this.scene = scene;

	var p = params || {};

	// Debugging log
	this.TRACE = p.TRACE;

	// Cursor Effects
	this.objectEffects = {};  // objectEffects[ object.uuid ] = [ effect1, effect2, ... ]
	this.effects = [];  // flat list of all effects

	var cursorEvents;	// shim used when outside of Altspace to dispatch cursor events

 	// Attach listeners to scene
	var dispatcher = this._dispatchEffectsToScene.bind( this ); 
	scene.addEventListener("cursordown", dispatcher);
	scene.addEventListener("cursorup", dispatcher);
	scene.addEventListener("cursorenter", dispatcher);
	scene.addEventListener("cursorleave", dispatcher);
	scene.addEventListener("cursormove", dispatcher);

};

CursorEffects.prototype.enableMouseEvents = function( camera ) {

	var inAltspace = !!window.altspace;
	if ( !inAltspace ) {
		var params = { TRACE: this.TRACE, recursive: true};
		this.cursorEvents =  new CursorEvents( this.scene, camera, params ); 
		THREE.EventDispatcher.call( this.scene ); // register scene for events
		console.log("Not in Altspace, listening for mouse events.");	
	} else {
		console.log("In Altspace, ignoring request to listening for mouse events.");
	}

};


CursorEffects.prototype.addEffect = function( effect, object ) {

	if ( !object || !effect ) {
		console.error("AddEffect requires a valid effect and object", effect, object );
		return ; // sanity check
	}

	if ( !this.objectEffects[ object.uuid ] ) {

		// First time an effect added to this object, initialize it.
		this.objectEffects[ object.uuid ] = [];		

		// Attach listeners
		var dispatcher = this._dispatchEffectsToObject.bind( this ); 
		object.addEventListener("cursordown", dispatcher);
		object.addEventListener("cursorup", dispatcher);
		object.addEventListener("cursorenter", dispatcher);
		object.addEventListener("cursorleave", dispatcher);
		
		if ( this.cursorEvents ) {
			THREE.EventDispatcher.call( object ); // register object for events
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

CursorEffects.prototype._dispatchEffectsToScene = function( event ) {

	if ( event.currentTarget !== scene ) {
		console.error("Expected target of 'scene' for event", event);
		return;
	} 

	if ( this.TRACE ) console.log(event.type, event);

	var functionName = event.type + "Scene";
	for ( var i=0; i < this.effects.length; i++) {

		var effect = this.effects[ i ];
		var effectCallback = null;

		if ( effect[ functionName ]) {

			effectCallback = effect[ functionName ].bind( effect );
			effectCallback( event );

		}
	}
};


CursorEffects.prototype._dispatchEffectsToObject = function( event ) {

	if ( this.TRACE ) console.log(event.type, event);

	var target = event.currentTarget;
	if ( !target || !this.objectEffects[ target.uuid ] ) {
		console.error("Unexpected target object for event", event);
	}

	var effects = this.objectEffects[ target.uuid ];
	var functionName = event.type;
	for ( var i=0; i < effects.length; i++) {

		var effect = effects[ i ];
		var effectCallback = null;

		if ( effect[ functionName ]) {

			effectCallback = effect[ functionName ].bind( effect );
			effectCallback( target, event );

		}

	}

};

