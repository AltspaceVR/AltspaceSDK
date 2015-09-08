// ColorHoverEffect makes objects change color on hover.

ColorHoverEffect = function ( hoverColor, params ) {

	this.hoverColor = hoverColor;
	this.hoverObject;
	this.cursordownObject;
 
	var p = params || {};

	if ( p.color && ! (p.color instanceof THREE.Color )) {
		console.error("Color should be instance of THREE.Color", p.color);
		return ; // valid color required
	}

	this.TRACE = p.TRACE || null; 

	this.inAltspace = !!window.altspace;

	this.dragObject;

};


ColorHoverEffect.prototype.cursorenter = function( object ) {

	// Ignore hover events if a different object is selected,
	// for example during a drag we don't want to change highlight
	if ( this.cursordownObject && this.cursordownObject !== object ) {
		// TODO: Test this again in Altspace once renderer "blink" bug is fixed.
		if ( this.TRACE ) console.log("Ignore hover, other object selected", this.cursordownObject);
		return ;
	} 

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

ColorHoverEffect.prototype.cursordown = function( object ) {

	if ( this.TRACE ) console.log("setting cursordownObject", object);
	this.cursordownObject = object;

};


ColorHoverEffect.prototype.cursorupScene = function( object ) {

	if ( this.TRACE ) console.log("clearning cursordownObject", object);
	this.cursordownObject = null;

};


ColorHoverEffect.prototype.hoverEffect = function( object ) {

	if ( this.ignoreHoverChange( object ) ) return;

	this.hoverObject = object;

	this.setHoverColor( object, this.hoverColor );

	if ( this.TRACE ) console.log("hoverEffect", object);
};


ColorHoverEffect.prototype.unhoverEffect = function( object ) {

	if ( this.ignoreHoverChange( object ) ) return;

	this.hoverObject = null;

	this.unsetHoverColor( object );

	if ( this.TRACE ) console.log("unhoverEffect", object);
};


ColorHoverEffect.prototype.ignoreHoverChange = function( object ) {

	if ( !inAltspace ) return false;

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



