// ColorHoverEffect makes objects change color on hover.

ColorHoverEffect = function ( params ) {

	this.hoverObject;
 
	var p = params || {};

	if ( p.color && ! (p.color instanceof THREE.Color )) {
		console.error("Color should be instance of THREE.Color", p.color);
		return ; // valid color required
	}

	this.inAltspace = !!window.altspace;

	this.hoverColor = p.color || new THREE.Color(1, 1, 0); // yellow-ish

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

	if ( this.ignoreHoverChange( object ) ) return;

	this.hoverObject = object;

	this.setHoverColor( object, this.hoverColor );

};


ColorHoverEffect.prototype.unhoverEffect = function( object ) {

	if ( this.ignoreHoverChange( object ) ) return;

	this.hoverObject = null;

	this.unsetHoverColor( object );

};


ColorHoverEffect.prototype.ignoreHoverChange = function( object ) {

	// TODO: remove once the renderer bug where materials change
	// triggers re-rendering the object and cursor leave/enter events.
	var now = Date.now();
	var lastHoverChange = object.userData.lastHoverChange;
	object.userData.lastHoverChange = now;
	if ( lastHoverChange && now - lastHoverChange < 75 ) {
		object.userData.lastHoverChange = now;
		return true;
	}

	return false;

};

ColorHoverEffect.prototype.update = function( effectsState ) {

	// Remember if a drag is in progress.
	this.dragObject = effectsState.dragObject;

	// No need to update the effectsState, so return nothing.

};


ColorHoverEffect.prototype.setHoverColor = function ( obj, hoverColor ) {

	if ( obj.material && obj.material.color ) {
		obj.userData.origColor = obj.material.color;

		obj.material.color = hoverColor;	

		// Needed for new material color to be rendered in Altspace.
		// TODO: remove when renderer fixed to handle this case.
		if (obj.material) obj.material.needsUpdate = true;
	} 

	// recursively apply to children
	for ( var i = 0; i < obj.children.length; i++ ) {
		this.setHoverColor( obj.children[i], hoverColor );
	}

};


ColorHoverEffect.prototype.unsetHoverColor = function ( obj ) {

	if ( obj.material && obj.material.color ) {
		if ( !obj.userData.origColor ) {
			console.error("Cannot unsetHoverColor, no userData.origColor for object", obj);
			return;
		}
		obj.material.color = obj.userData.origColor;

		// Needed for new material color to be rendered in Altspace.
		// TODO: remove when renderer fixed to handle this case.
		if (obj.material) obj.material.needsUpdate = true;
	} 

	// recursively apply to children
	for ( var i = 0; i < obj.children.length; i++ ) {
		this.unsetHoverColor( obj.children[i] );
	}

};



