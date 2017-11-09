import {AFrameComponent} from './AFrameComponent';

/**
* Reaches into a model's hierarchy and directly assigns the first mesh found
* to the containing entity. This is mostly necessary for use alongside native
* components like [n-skeleton-parent]{@link module:altspace/components.n-skeleton-parent}. @aframe
*
* @alias collapse-model
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
*/
class CollapseModel extends AFrameComponent
{
	init()
	{
		function getFirstMesh(obj){
			if(obj.isMesh)
				return obj;
			else if(obj.children.length === 0)
				return null;
			else
				return obj.children.reduce((m,o) => m || getFirstMesh(o), null);
		}

		this.el.addEventListener('model-loaded', () => {
			this.el.setObject3D('mesh', getFirstMesh(this.el.object3DMap.mesh));
		});
	}
}

export default CollapseModel;