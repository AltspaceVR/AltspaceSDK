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
		this.el.sceneEl.object3D.updateMatrixWorld(true);
		let position = this.data.targetEntity.object3D.getWorldPosition();
		let rotation = this.data.targetEntity.object3D.getWorldRotation();
		var data = {
			targetSpace: this.targetSpace,
			targetPosition: position,
			targetRotation: rotation
		}
		console.log('BPDEBUG nportal data ', JSON.stringify(data.targetPosition));
		altspace.updateNativeComponent(mesh, this.name, data);
	}
}

export default NPortal;
