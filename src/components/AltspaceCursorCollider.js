'use strict';

import {AFrameComponent} from './AFrameComponent';
import {safeDeepSet} from './utilities';


/**
* @name module:altspace/components.altspace-cursor-collider
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Enable or disable cursor collision on the object. @aframe
* @example <a-box altspace-cursor-collider='enabled: false'></a-box>
*/
class AltspaceCursorCollider extends AFrameComponent
{
	get schema(){
		return {
			/**
			* The state of the cursor collider. If `true`, the object can be clicked,
			* and things behind this object cannot be clicked.
			* @instance
			* @member {boolean} enabled
			* @default true
			* @memberof module:altspace/components.altspace-cursor-collider
			*/
			enabled: {type: 'boolean', default: true}
		};
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
			safeDeepSet(obj.userData, ['altspace','collider','enabled'], state);
			obj.traverse(subobj => {
				if( subobj instanceof THREE.Mesh ){
					safeDeepSet(subobj.userData, ['altspace','collider','enabled'], state);
				}
			});
		}
	}
}

export default AltspaceCursorCollider;
