import NativeComponent from './NativeComponent';

export default class NSphereCollider extends NativeComponent {
	constructor() {super('n-gltf'); }
	get schema() {
		return {
			url: { type: 'string' },
		};
	}
}