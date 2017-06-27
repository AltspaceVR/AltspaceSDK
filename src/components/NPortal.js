'use strict';

import NativeComponent from './NativeComponent';

/**
* Spawn a portal that allows you to travel to a different space or a different location in the current space.
* @aframe
* @alias n-portal
* @memberof module:altspace/components
* @extends module:altspace/components.NativeComponent
*/
class NPortal extends NativeComponent {
	constructor(){ super('n-portal'); }
	get schema(){
		return {
			/**
			* The space id of the space that you want the portal to send users to.
			* @instance
			* @member {string} targetSpace
			* @memberof module:altspace/components.n-portal
			*/
			targetSpace: {type: 'string'},
			/**
			* The id of the event that you want the portal to send users to.
			* @instance
			* @member {string} targetEvent
			* @memberof module:altspace/components.n-portal
			*/
			targetEvent: {type: 'string'},
			/**
			* A selector pointing to an A-Frame Entity. The portal will send users to the selected entity's position
			* and rotate the user in its direction. Note: The target position/rotation will not be updated if the
			* targetEntity moves.
			* @instance
			* @member {selector} targetEntity
			* @memberof module:altspace/components.n-portal
			*/
			targetEntity: {type: 'selector'}
		};
	}
	update(){
		let mesh = this.el.object3DMap.mesh;
		let targetPosition, targetQuaternion;
		if (this.data.targetEntity) {
			// updateMatrixWorld doesn't traverse upwards to actually update an object's world matrix.
			// Updating the entire scene's world matrcies is overkill, but there isn't a simple way to do the right
			// thing at the moment. See https://github.com/mrdoob/three.js/pull/9410
			this.el.sceneEl.object3D.updateMatrixWorld(true);
			targetPosition = this.data.targetEntity.object3D.getWorldPosition();
			let quaternion = this.data.targetEntity.object3D.getWorldQuaternion();
			targetQuaternion = {x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w};
		}

		var data = {
			targetSpace: this.data.targetSpace,
			targetEvent: this.data.targetEvent,
			targetPosition: targetPosition,
			targetQuaternion: targetQuaternion
		}

		altspace.updateNativeComponent(mesh, this.name, data);
	}
}

export default NPortal;
