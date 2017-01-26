(function (exports) {
'use strict';

function flatten(obj)
{
	if(!obj.__proto__){
		return Object.assign( {}, obj );
	}
	else {
		return Object.assign( flatten(obj.__proto__), obj );
	}
}

var AFrameComponent = function AFrameComponent(){
	this.schema = null;
};
	
AFrameComponent.prototype.init = function init (){ };
AFrameComponent.prototype.update = function update (oldData){ };
AFrameComponent.prototype.remove = function remove (){ };
AFrameComponent.prototype.tick = function tick (time, timeDelta){ };
AFrameComponent.prototype.pause = function pause (){ };
AFrameComponent.prototype.play = function play (){ };
AFrameComponent.prototype.updateSchema = function updateSchema (data){ };

AFrameComponent.prototype.register = function register (name)
{
	var definition = flatten(this);
	AFRAME.registerComponent(name, definition);
	console.log('definition:', definition);
	console.log('class:', this);
};

function safeDeepSet(obj, keys, value)
{
	if(keys.length === 0)
		{ return value; }
	else {
		obj[keys[0]] = safeDeepSet(obj[keys[0]] || {}, keys.slice(1), value);
		return obj;
	}
}

/**
* Enable or disable cursor collision on the object.
* @mixin altspace-cursor-collider
* @memberof altspace
* @prop {boolean} enabled=true - The state of the cursor collider.
*/

var AltspaceCursorCollider = (function (AFrameComponent$$1) {
	function AltspaceCursorCollider(){
		this.schema = {enabled: {type: 'boolean', default: 'true'}};
	}

	if ( AFrameComponent$$1 ) AltspaceCursorCollider.__proto__ = AFrameComponent$$1;
	AltspaceCursorCollider.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	AltspaceCursorCollider.prototype.constructor = AltspaceCursorCollider;

	AltspaceCursorCollider.prototype.init = function init ()
	{
		var this$1 = this;

		this.setColliderFlag(this.el.object3D, this.data.enabled);
		this.el.addEventListener('model-loaded', (function () {
			this$1.setColliderFlag(this$1.data.enabled);
		}).bind(this));
	};

	AltspaceCursorCollider.prototype.update = function update ()
	{
		this.setColliderFlag(this.data.enabled);
	};

	AltspaceCursorCollider.prototype.setColliderFlag = function setColliderFlag (state)
	{
		var obj = this.el.object3D;
		if(obj){
			console.log('Setting collider flag to', state);
			safeDeepSet(obj.userData, ['altspace','collider','enabled'], state);
			obj.traverse(function (subobj) {
				if( subobj instanceof THREE.Mesh ){
					safeDeepSet(subobj.userData, ['altspace','collider','enabled'], state);
				}
			});
		}
	};

	return AltspaceCursorCollider;
}(AFrameComponent));

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

(new AltspaceCursorCollider()).register('altspace-cursor-collider');

exports.AltspaceCursorCollider = AltspaceCursorCollider;

}((this.aframe_altspace = this.aframe_altspace || {})));
//# sourceMappingURL=aframe-altspace-component.js.map
