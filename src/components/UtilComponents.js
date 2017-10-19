import {AFrameComponent} from './AFrameComponent';

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
				return obj.children.map(c => getFirstMesh(c)).find(o => !!o);
		}

		this.el.addEventListener('model-loaded', () => {
			this.el.setObject3D('mesh', getFirstMesh(this.el.object3DMap.mesh));
		});
	}
}

export {CollapseModel}