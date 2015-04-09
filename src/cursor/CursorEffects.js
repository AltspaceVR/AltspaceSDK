/**
 * CursorEffects makes it easier to reuse code with CursorEvents. 
 *
 * Instead of putting spin-bounce-on-hover into myObject.holocursoreffect
 * you can write separate reusable SpinEffect and BounceEffect, that implement
 * SpinEffect.holocursorenter and BounceEffect.holocursorenter, add call
 * addEffect( spinEffect, myObject) and addEffect( boundEffect, myObject ) 
 *
 * @author Amber Roy
 * Copyright (c) 2015 AltspaceVR
 */

CursorEffects = function () {

  this.objectEffects = {};  // objectEffects[ object.uuid ] = [ effect1, effect2, ... ]

  this.effects = [];  // flat list of all effects

  this.effectsState = {}; // built-in: copy of lastEvent, other values added by effects

};


CursorEffects.prototype.addEffect = function( effect, object ) {
  // TODO: Corresponding removeEffect method.

  if ( !object || !effect ) {
    console.error("AddEffect requires a valid effect and object", effect, object );
    return ; // sanity check
  }

  if ( !this.objectEffects[ object.uuid ] ) {

    // First time an effect added to this object, initialize it.
    this._addObject( object );

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


CursorEffects.prototype._addObject = function( object ) {
  // TODO: Corresponding removeObject method.

  this.objectEffects[ object.uuid ] = [];

}


CursorEffects.prototype.dispatchEffects = function( object, event ) {

  // Save most recent event, for effects that track cursorRay (like drag).
  this.effectsState.lastEvent = event;

  // No object (e.g. move event with no defaultTarget) or no effects for object.
  if ( !object || !this.objectEffects[ object.uuid ] ) return ;

  var effects = this.objectEffects[ object.uuid ];
  for ( var i=0; i < effects.length; i++) {

    var effect = effects[ i ];
    var effectCallback = null;

    if ( effect[ event.type ]) {

      var effectCallback = effect[ event.type ].bind( effect );
      effectCallback( object, event );
    }
  }

};


CursorEffects.prototype.update = function() {

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

