import NativeComponent from './NativeComponent';
import Url from 'urllib';

export default class NGLTF extends NativeComponent {
	constructor() {super('n-gltf'); }
	get schema() {
		return {
			url: { type: 'string' },
			sceneIndex: { type: 'int' }
		};
	}
	update(){
		let mesh = this.mesh || this.el.object3DMap.mesh;
		var data = Object.assign({}, this.data);
		data.url = new Url(data.url).toString();

		if(this.sendUpdates){
			altspace.updateNativeComponent(mesh, this.name, data);
		}
	}
}
