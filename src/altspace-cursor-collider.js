(function(){

	function setColliderFlag(obj, state) {
		obj.userData.altspace = {collider: {enabled: state}};
		obj.traverse(function (obj) {
			if (obj instanceof THREE.Mesh) {
				obj.userData.altspace = {collider: {enabled: state}};
			}
		})
	}

	/**
	* Enable or disable cursor collision on the object.
	* @mixin altspace-cursor-collider
	* @memberof altspace
	* @prop {boolean} enabled=true - The state of the cursor collider.
	*/
	AFRAME.registerComponent('altspace-cursor-collider', {
		schema: { enabled: { default: true } },
		init: function () {
			setColliderFlag(this.el.object3D, this.data.enabled);
			this.el.addEventListener('model-loaded', (function(){
				setColliderFlag(this.el.object3D, this.data.enabled);
			}).bind(this));
		},
		update: function () {
			setColliderFlag(this.el.object3D, this.data.enabled);
		}
	});

})();
