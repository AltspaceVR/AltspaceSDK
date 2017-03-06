'use strict';

import NativeComponent from './NativeComponent';

/**
* Abstract base class for [n-sphere-collider]{@link module:altspace/components.n-sphere-collider},
* [n-box-collider]{@link module:altspace/components.n-box-collider},
* [n-capsule-collider]{@link module:altspace/components.n-capsule-collider},
* and [n-mesh-collider]{@link module:altspace/components.n-mesh-collider}. You cannot use
* this class directly, but instead you should add one of those components
* to your objects.
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NCollider extends NativeComponent {
	get schema(){
		return {
			/**
			* The offset of the collider in local space.
			* @instance
			* @member {vec3} center
			* @default [0, 0, 0]
			* @memberof module:altspace/components.NCollider
			*/
			center: { type: 'vec3' },

			/**
			* The type of collider, one of: `object` | `environment` | `hologram`.
			* Object colliders collide with other objects, the environment, and the cursor.
			* Environment colliders collide with everything objects do, but you can also
			* teleport onto them. Hologram colliders only collide with other holograms and
			* the cursor.
			* @instance
			* @member {string} type
			* @default "hologram"
			* @memberof module:altspace/components.NCollider
			*/
			type: { type: 'string', default: 'object' },

			/**
			* If true, this collider will not block
			* other objects, but instead fire a `triggerenter` event when an object comes
			* into contact with it, and a `triggerexit` when it leaves contact.
			* @instance
			* @member {boolean} isTrigger
			* @default false
			* @memberof module:altspace/components.NCollider
			*/
			isTrigger: { default: false, type: 'boolean' }
		};
	}
}

/**
* Fired when an object enters a trigger volume, e.g. `isTrigger: true`
* @event module:altspace/components.NCollider.triggerenter
*/

/**
* Fired when an object leaves a trigger volume, e.g. `isTrigger: true`
* @event module:altspace/components.NCollider.triggerexit
*/

/**
* A sphere-shaped collider. @aframe
* @alias n-sphere-collider
* @memberof module:altspace/components
* @extends module:altspace/components.NCollider
* @example <a-sphere radius=1 n-sphere-collider='radius: 1; type: object;'></a-sphere>
*/
class NSphereCollider extends NCollider {
	constructor(){ super('n-sphere-collider'); }
	get schema(){
		return {
			/**
			* The radius of the sphere collider in meters
			* @instance
			* @member {Number} radius
			* @default 1
			* @memberof module:altspace/components.n-sphere-collider
			*/
			radius: { default: 1, type: 'number' },
		};
	}
}

/**
* Create a box-shaped collider on this entity. @aframe
* @alias n-box-collider
* @memberof module:altspace/components
* @extends module:altspace/components.NCollider
*/
class NBoxCollider extends NCollider {
	constructor(){ super('n-box-collider'); }
	get schema(){
		return {
			/**
			* The dimensions of the collider.
			* @instance
			* @member {vec3} size
			* @default [1, 1, 1]
			* @memberof module:altspace/components.n-box-collider
			*/
			size: { type: 'vec3', default: '1 1 1' }
		};
	}
}

/**
* Create a capsule-shaped collider on this entity. Capsules
* are a union of a cylinder and two spheres on top and bottom. @aframe
* @alias n-capsule-collider
* @memberof module:altspace/components
* @extends module:altspace/components.NCollider
*/
class NCapsuleCollider extends NCollider {
	constructor(){ super('n-capsule-collider'); }
	get schema(){
		return {

			/**
			* The radius of the capsule in meters.
			* @instance
			* @member {number} radius
			* @default 1
			* @memberof module:altspace/components.n-capsule-collider
			*/
			radius: { default: '0', type: 'number' },

			/**
			* The height of the shaft of the capsule in meters.
			* @instance
			* @member {number} height
			* @default 0
			* @memberof module:altspace/components.n-capsule-collider
			*/
			height: { default: '0', type: 'number' },

			/**
			* The axis with which the capsule is aligned. Must be one of 'x', 'y' or 'z'.
			* @instance
			* @member {string} direction
			* @default 'y'
			* @memberof module:altspace/components.n-capsule-collider
			*/
			direction: { default: 'y' }
		};
	}
}

/**
* Enable collision for the entire attached mesh. This is expensive to evaluate, so should only be used on
* low-poly meshes. @aframe
* @example <a-box n-mesh-collider></a-box>
* @alias n-mesh-collider
* @memberof module:altspace/components
* @extends module:altspace/components.NCollider
*/
class NMeshCollider extends NCollider {
	get schema(){
		return {

			/**
			* Whether the collider should be convex or concave. Set this to false if you have holes
			* in your mesh. Convex colliders are limited to 255 triangles. Note: concave colliders can be significantly more
			* expensive compared to convex colliders.
			* @instance
			* @member {boolean} convex
			* @default true
			* @memberof module:altspace/components.n-mesh-collider
			*/
			convex: { type: 'boolean', default: 'true' }
		};
	}

	constructor(mesh = null, data){
		super('n-mesh-collider');
		this.mesh = mesh;
		this.subcomponents = [];
	}

	init()
	{
		if(this.mesh){
			super.init();
		}
		else
		{
			this.subcomponents = [];
			let mesh = this.el.object3D;
			mesh.traverse((o => {
				if(o instanceof THREE.Mesh){
					let subcomp = new NMeshCollider(o);
					this.subcomponents.push(subcomp);
					subcomp.data = this.data;
					subcomp.init();
				}
			}).bind(this));

			this.el.addEventListener('model-loaded', this.init.bind(this));
		}
	}

	update(oldData)
	{
		if(this.mesh){
			super.update(oldData);
		}
		else {
			this.subcomponents.forEach((sub => {
				sub.data = this.data;
				sub.update(oldData);
			}).bind(this));
		}
	}

	remove()
	{
		if(this.mesh){
			super.remove();
		}
		else {
			this.subcomponents.forEach((sub => {
				sub.remove();
			}).bind(this));
		}
	}
}

export { NSphereCollider, NBoxCollider, NCapsuleCollider, NMeshCollider };
