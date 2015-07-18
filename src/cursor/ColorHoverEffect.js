/*
 * ColorHoverEffect makes objects change color on hover.
 * Apply using CursorEfects.
 *
 * Author: Amber Roy
 * Copyright (c) 2015 AltspaceVR
 */

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


ColorHoverEffect.prototype.holocursorenter = function( object ) {

	if ( this.dragObject ) return ; // ignore hover events during drag

	if ( this.hoverObject ) {
		this.unhoverEffect( this.hoverObject );
	}

	this.hoverEffect( object );

};


ColorHoverEffect.prototype.holocursorleave = function( object ) {

	if ( this.dragObject ) return ; // ignore hover events during drag

	if ( this.hoverObject === object ) {
		this.unhoverEffect( object );
	}

};


ColorHoverEffect.prototype.hoverEffect = function( object ) {

	this.hoverObject = object;

	// Reddish tint color
	if ( inAltspace ) {

		if (! object.userData.origTintColor ) {
			object.userData.origTintColor = object.userData.tintColor;
		}

		object.userData.tintColor = this.tintColor;
		object.position.x += 0.001; // hack to force AltRender to redraw scene

		// workaround since deep-tint which isn't working with new renderer
		object.traverse( function(child) {

			child.userData.tintColor = this.tintColor;

		}.bind( this ));

	} else {

		object.traverse( function(child) { // TODO: Is traverse still needed?
			if ( child.material && child.material instanceof THREE.MeshPhongMaterial) {

				if (! child.userData.origAmbientColor ) {
					child.userData.origAmbientColor = child.material.ambient;
				}

				child.material.ambient = this.color;

			}
		}.bind( this )); 

	}

};


ColorHoverEffect.prototype.unhoverEffect = function( object ) {

	this.hoverObject = null;

	if ( inAltspace ) {

		object.userData.tintColor = object.userData.origTintColor;
		object.position.x += 0.001; // hack to force AltRender to redraw scene

		// workaround since deep-tint isn't working with new renderer
		object.traverse( function(child) {

			child.userData.tintColor = object.userData.origTintColor;

		});

	} else {

		object.traverse( function(child) {

			if ( child.material && child.material instanceof THREE.MeshPhongMaterial) {
				if (child.userData.origAmbientColor) {
					child.material.ambient = child.userData.origAmbientColor;
				} else {
					console.error("Cannot clear hover effect", child);
				}
			}

		}); 

	}
};


ColorHoverEffect.prototype.update = function( effectsState ) {

	// Remember if a drag is in progress.
	this.dragObject = effectsState.dragObject;

	// No need to update the effectsState, so return nothing.

};





