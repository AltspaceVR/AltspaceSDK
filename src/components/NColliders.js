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

/**
* Create a box-shaped collider on this entity.
* @prop {vec3} size=1,1,1 - The dimensions of the collider.
* @memberof module:altspace/components
* @extends module:altspace/components.NCollider
*/
class NBoxCollider extends NCollider {
	constructor(){ super('n-box-collider'); }
	get schema(){
		return {
			size: { type: 'vec3', default: '1 1 1' }
		};
	}
}

/**
* Create a capsule-shaped collider on this entity. Capsules
* are a union of a cylinder and two spheres on top and bottom.
* @prop {number} radius=1 - The radius of the capsule in meters.
* @prop {number} height=1 - The height of the shaft of the capsule in meters.
* @prop {string} direction=y - The axis with which the capsule is aligned.
* @memberof module:altspace/components
* @extends module:altspace/components.NCollider
*/
class NCapsuleCollider extends NCollider {
	constructor(){ super('n-capsule-collider'); }
	get schema(){
		return {
			radius: { default: '0', type: 'number' },
			height: { default: '0', type: 'number' },
			direction: { default: 'y' }
		};
	}
}

function forEachMesh(mesh, executor)
{

}

/**
* Enable collision for the entire attached mesh. This is expensive to evaluate, so should only be used on
* low-poly meshes.
* @example <a-box n-mesh-collider></a-box>
* @prop {boolean} convex=true - Whether the collider should be convex or concave. Set this to false if you have holes
* in your mesh. Convex colliders are limited to 255 triangles. Note: concave colliders can be significantly more
* expensive comparet to conves colliders.
* @memberof module:altspace/components
* @extends module:altspace/components.NCollider
*/
class NMeshCollider extends NCollider {
	get schema(){
		convex: { type: 'boolean', default: 'true' }
	}

	constructor(mesh = null){
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
			let mesh = this.el.object3DMap.mesh;
			mesh.traverse((o => {
				if(o instanceof THREE.Mesh){
					let subcomp = new NMeshCollider(o);
					this.subcomponents.push(subcomp);
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
