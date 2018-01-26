import {AFrameComponent} from './AFrameComponent';

// kill default visible component, replace with clone
if(window.AFRAME){
	delete AFRAME.components['visible'];
}

export default class Visible extends AFrameComponent {
	get schema(){ return {default: true}; }
	init(){
		this.el.addEventListener('model-loaded', this.update.bind(this));
	}
	update(){
		this.el.object3D.traverse(obj => obj.visible = this.data);
	}
}