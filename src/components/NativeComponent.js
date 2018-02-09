'use strict';

import {AFrameComponent} from './AFrameComponent';
import {safeDeepSet} from './utilities';

// graceful fallback in web browsers
if (!window.altspace || !altspace.inClient)
{
	let noop = () => {};
	safeDeepSet(window, ['altspace','addNativeComponent'], noop);
	safeDeepSet(window, ['altspace','updateNativeComponent'], noop);
	safeDeepSet(window, ['altspace','removeNativeComponent'], noop);
}

// create js-side dummy meshes so things are processed correctly
var placeholderGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
var placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
placeholderMaterial.visible = false;
class PlaceholderMesh extends THREE.Mesh {
	constructor(){
		super(placeholderGeometry, placeholderMaterial);
	}
}

/**
* Native components represent Unity-native game objects that offer extended functionality
* only in AltspaceVR, with added caveats. This is the abstract base class for all
* native components. Do not use this class directly.
*
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
*/
class NativeComponent extends AFrameComponent
{
	constructor(name, sendUpdates = true){
		super();
		Object.assign(this, {name, sendUpdates});
	}

	init()
	{
		let mesh = this.mesh || this.el.getOrCreateObject3D('mesh', PlaceholderMesh);
		this.currentMesh = mesh;

		//If you attach native components to an entity, it will not use a default collider
		safeDeepSet(mesh.userData, ['altspace', 'collider', 'enabled'], false);
		altspace.addNativeComponent(mesh, this.name);

		this.update();

		if(!this.mesh && !this._dontRebind){
			this.el.addEventListener('object3dset', (event => {
				if(event.detail.type === 'mesh'){
					altspace.removeNativeComponent(this.currentMesh, this.name);
					this._dontRebind = true;
					this.init();
				}
			}).bind(this));
		}
	}

	update(){
		let mesh = this.mesh || this.el.object3DMap.mesh;
		if(this.sendUpdates){
			altspace.updateNativeComponent(mesh, this.name, this.data);
		}
	}

	remove(){
		let mesh = this.mesh || this.el.object3DMap.mesh;
		altspace.removeNativeComponent(mesh, this.name);
	}

	callComponent(name, ...args){
		let mesh = this.mesh || this.el.object3DMap.mesh;
		return altspace.callNativeComponent(mesh, this.name, name, args);
	}
}

export default NativeComponent;
