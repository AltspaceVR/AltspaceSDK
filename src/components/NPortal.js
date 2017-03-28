'use strict';

import NativeComponent from './NativeComponent';

/**
*/
class NPortal extends NativeComponent {
	constructor(){ super('n-portal'); }
	get schema(){
		return {
			targetSpace: {type: 'string'},
			targetEntity: {type: 'selector'}
		};
	}
	update(){
		let mesh = this.el.object3DMap.mesh;
		let targetPosition, targetQuaternion;
		if (this.data.targetEntity) {
			// updateMatrixWorld doesn't traverse upwards to actually update the world matrix.
			// Updating the entire scene's world matrcies is overkill, but there isn't a simple way to do the right thing
			// at the moment. See https://github.com/mrdoob/three.js/pull/9410
			this.el.sceneEl.object3D.updateMatrixWorld(true);
			targetPosition = this.data.targetEntity.object3D.getWorldPosition();
			let quaternion = this.data.targetEntity.object3D.getWorldQuaternion();
			targetQuaternion = {x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w};
		}

		var data = {
			targetSpace: this.data.targetSpace,
			targetPosition: targetPosition,
			targetQuaternion: targetQuaternion
		}

		altspace.updateNativeComponent(mesh, this.name, data);
	}
}

export default NPortal;
