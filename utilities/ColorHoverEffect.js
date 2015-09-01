// ColorHoverEffect makes objects change color on hover.

ColorHoverEffect = function ( params ) {

	this.hoverObject;
 
	var p = params || {};

	if ( p.color && ! (p.color instanceof THREE.Color )) {
		console.error("Color should be instance of THREE.Color", p.color);
		return ; // valid color required
	}

	this.color = p.color || new THREE.Color(1, 1, 0); // yellow-ish
	this.tintColor = { r: this.color.r, g: this.color.g, b: this.color.b };

	this.dragObject;

};


ColorHoverEffect.prototype.cursorenter = function( object ) {

	if ( this.dragObject ) return ; // ignore hover events during drag

	if ( this.hoverObject ) {
		this.unhoverEffect( this.hoverObject );
	}

	this.hoverEffect( object );

};


ColorHoverEffect.prototype.cursorleave = function( object ) {

	if ( this.dragObject ) return ; // ignore hover events during drag

	if ( this.hoverObject === object ) {
		this.unhoverEffect( object );
	}

};


ColorHoverEffect.prototype.hoverEffect = function( object ) {

	this.hoverObject = object;

	if ( object.userData.tintColor ) {
		// Remember the previous tint color, if any.
		object.userData.origTintColor = object.userData.tintColor;
	}

	this.deepTint( object, this.tintColor );

};


ColorHoverEffect.prototype.unhoverEffect = function( object ) {

	this.hoverObject = null;

	// Return to previous tint color. If none, origTintColor will be undefined
	// and color will revert to the one used before the tint was applied.
	this.deepTint( object, object.userData.origTintColor );

	// Needed for new material color to be rendered.
	if (object.material) object.material.needsUpdate = true;

};


ColorHoverEffect.prototype.update = function( effectsState ) {

	// Remember if a drag is in progress.
	this.dragObject = effectsState.dragObject;

	// No need to update the effectsState, so return nothing.

};

ColorHoverEffect.prototype.deepTint = function ( obj, tintColor ) {
	console.log("deepTint setting tint", tintColor);
	obj.userData.tintColor = tintColor;
	for ( var i = 0; i < obj.children.length; i++ ) {
		obj.children[i].userData.tintColor = tintColor;
	}
};

