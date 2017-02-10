'use strict';

import NativeComponent from './NativeComponent';

/**
* Abstract base class for [NSphereCollider]{@link module:altspace/components.NSphereCollider},
* [NBoxCollider]{@link module:altspace/components.NBoxCollider},
* [NCapsuleCollider]{@link module:altspace/components.NCapsuleCollider},
* and [NMeshCollider]{@link module:altspace/components.NMeshCollider}. You cannot use
* this class directly, but instead you should add one of those components
* to your objects.
* @prop {vec3} center=0,0,0 - The offset of the collider in local space.
* @prop {string} type=hologram - The type of collider, one of: `object` | `environment` | `hologram`.
* Object colliders collide with other objects, the environment, and the cursor.
* Environment colliders collide with everything objects do, but you can also
* teleport onto them. Hologram colliders only collide with other holograms and
* the cursor.
* @prop {boolean} isTrigger=false - If true, this collider will not block
* other objects, but instead fire a `triggerenter` event when an object comes
* into contact with it, and a `triggerexit` when it leaves contact.
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NCollider extends NativeComponent {
	get schema(){
		return {
			center: { type: 'vec3' },
			type: { type: 'string', default: 'object' },
			isTrigger: { default: false, type: 'boolean' }
		};
	}
}

/**
* A sphere-shaped collider.
* @prop {Number} radius=0.001 - The radius of the sphere collider in meters
* @memberof module:altspace/components
* @extends module:altspace/components.NCollider
*/
class NSphereCollider extends NCollider {
	constructor(){ super('n-sphere-collider'); }
	get schema(){
		return {
			radius: { default: '0.001', type: 'number' },
		};
	}
}
