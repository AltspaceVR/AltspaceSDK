/**
* Enable or disable cursor collision on the object.
* @mixin altspace-cursor-collider
* @memberof altspace
* @prop {boolean} enabled=true - The state of the cursor collider.
*/

'use strict';

import AFrameComponent from './AFrameComponent';
import {safeDeepSet} from './utilities';


export default class AltspaceCursorCollider extends AFrameComponent
{
	constructor(){
		this.schema = {enabled: {type: 'boolean', default: 'true'}};
	}

	init()
	{
		this.setColliderFlag(this.data.enabled);
		this.el.addEventListener('model-loaded', (() => {
			this.setColliderFlag(this.data.enabled);
		}).bind(this));
	}

	update()
	{
		this.setColliderFlag(this.data.enabled);
	}

	setColliderFlag(state)
	{
		let obj = this.el.object3D;
		if(obj){
			console.log('Setting collider flag to', state);
			safeDeepSet(obj.userData, ['altspace','collider','enabled'], state);
			obj.traverse(subobj => {
				if( subobj instanceof THREE.Mesh ){
					safeDeepSet(subobj.userData, ['altspace','collider','enabled'], state);
				}
			});
		}
	}
};
