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

	// Reddish tint color
	//if ( inAltspace ) {

		if (! object.userData.origTintColor ) {
			object.userData.origTintColor = object.userData.tintColor;
		}

		object.userData.tintColor = this.tintColor;
		object.position.x += 0.001; // hack to force AltRender to redraw scene

		// workaround since deep-tint which isn't working with new renderer
		object.traverse( function(child) {

			child.userData.tintColor = this.tintColor;

		}.bind( this ));

};


ColorHoverEffect.prototype.unhoverEffect = function( object ) {

	this.hoverObject = null;

	object.userData.tintColor = object.userData.origTintColor;
	object.position.x += 0.001; // hack to force AltRender to redraw scene

	// workaround since deep-tint isn't working with new renderer
	object.traverse( function(child) {

		child.userData.tintColor = object.userData.origTintColor;

	});

};


ColorHoverEffect.prototype.update = function( effectsState ) {

	// Remember if a drag is in progress.
	this.dragObject = effectsState.dragObject;

	// No need to update the effectsState, so return nothing.

};





