import NativeComponent from './NativeComponent';
import Url from 'urllib';

/**
* @name module:altspace/components.n-gltf
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Load a 3D model as a native asset, and attach it to this node.
* As a native asset, the model will be inaccessible from javascript, but
* may have better performance, materials, and colliders than normal SDK objects.
* This feature is a work in progress, with improvements going out periodically.
* Because of the higher-fidelity material system, using this feature may cause
* framerates to drop, so proceed with caution. @aframe
*/
export default class NGLTF extends NativeComponent {
	constructor() {super('n-gltf'); }
	get schema() {
		return {
			/**
			* The URL of a glTF model.
			* @instance
			* @member {string} url
			* @memberof module:altspace/components.n-gltf
			*/
			url: { type: 'string' },

			/**
			* If the model file describes multiple scenes, load this one instead of the default.
			* @instance
			* @member {int} sceneIndex
			* @memberof module:altspace/components.n-gltf
			*/
			sceneIndex: { type: 'int' }
		};
	}
	init(){
		NativeComponent.prototype.init.call(this);
		this.boundsCache = null;
	}
	update(oldData)
	{
		let mesh = this.mesh || this.el.object3DMap.mesh;
		var data = Object.assign({}, this.data);
		data.url = new Url(data.url).toString();

		if(this.sendUpdates){
			altspace.updateNativeComponent(mesh, this.name, data);
		}

		if(this.data.url && oldData && this.data.url !== oldData.url){
			this.boundsCache = null;
		}
	}

	/**
	* Returns a promise that resolves with a [THREE.Box3](https://threejs.org/docs/index.html#api/math/Box3)
	* @instance
	* @method getBoundingBox
	* @memberof module:altspace/components.n-gltf
	* @returns {Promise}
	*/
	getBoundingBox()
	{
		if(!this.boundsCache){
			this.boundsCache = this.callComponentFunc('GetBoundingBox').then(data => {
				const V3 = AFRAME.THREE.Vector3;
				return new AFRAME.THREE.Box3(
					new V3().subVectors(data.center, data.extents),
					new V3().addVectors(data.center, data.extents)
				);
			});
		}
		return this.boundsCache;
	}
}

/**
* Emitted when the glTF model is finished loading
* @event module:altspace/components.n-gltf#n-gltf-loaded
*/
