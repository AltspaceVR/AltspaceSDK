import {AFrameComponent} from './AFrameComponent';

delete AFRAME.components['visible'];

export default class Visible extends AFrameComponent {
	get schema(){ return {default: true}; }
	update(){
		this.el.object3D.traverse(obj => obj.visible = this.data);
	}
}