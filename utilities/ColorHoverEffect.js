//Change color of an object when cursor hovers over it.
ColorHoverEffect = function (hoverColor, params){
	this.hoverColor = hoverColor;
	this.hoverObject;
	this.cursordownObject;
	var p = params || {};
	if (p.color && ! (p.color instanceof THREE.Color)){
		console.error('Color should be instance of THREE.Color', p.color);
		return ;//valid color required
	}
	this.TRACE = p.TRACE || null; 
};

ColorHoverEffect.prototype.cursorenter = function(object){
	//Ignore hover events if a different object is selected,
	//for example during a drag we don't want to change highlight
	if (this.cursordownObject && this.cursordownObject !== object){
		if (this.TRACE) console.log('Ignore hover, other object selected', this.cursordownObject);
		return ;
	} 
	if (this.hoverObject){
		this.unhoverEffect(this.hoverObject);
	}
	this.hoverEffect(object);
};

ColorHoverEffect.prototype.cursorleave = function(object){
	if (this.hoverObject === object){
		this.unhoverEffect(object);
	}
};

ColorHoverEffect.prototype.cursordown = function(object){
	if (this.TRACE) console.log('setting cursordownObject', object);
	this.cursordownObject = object;
};

ColorHoverEffect.prototype.cursorupScene = function(object){
	if (this.TRACE) console.log('clearning cursordownObject', object);
	this.cursordownObject = null;

};

ColorHoverEffect.prototype.hoverEffect = function(object){
	this.hoverObject = object;
	this.setHoverColor(object, this.hoverColor);
	if (this.TRACE) console.log('hoverEffect', object);
};

ColorHoverEffect.prototype.unhoverEffect = function(object){
	this.hoverObject = null;
	this.unsetHoverColor(object);
	if (this.TRACE) console.log('unhoverEffect', object);
};

ColorHoverEffect.prototype.setHoverColor = function (obj, hoverColor){
	if (obj.material && obj.material.color){
		obj.userData.origColor = obj.material.color;
		obj.material.color = hoverColor;	
		//Not strictly needed but seems to make updating faster in Altspace.
		if (obj.material) obj.material.needsUpdate = true;
	} 
	for (var i = 0; i < obj.children.length; i++){
		this.setHoverColor(obj.children[i], hoverColor);//recursively apply to children
	}
};

ColorHoverEffect.prototype.unsetHoverColor = function (obj){

	if (obj.material && obj.material.color){
		if (!obj.userData.origColor){
			console.error('Cannot unsetHoverColor, no userData.origColor for object', obj);
			return;
		}
		obj.material.color = obj.userData.origColor;
		if (obj.material) obj.material.needsUpdate = true;
	} 
	for (var i = 0; i < obj.children.length; i++){
		this.unsetHoverColor(obj.children[i]);
	}
};
