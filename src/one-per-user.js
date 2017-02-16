AFRAME.registerComponent('one-per-user', {
	schema: {
		mixin: {type: 'string'},
		parent: {type: 'selector', default: 'a-scene'}
	},
	init: function () {
		var scene = document.querySelector('a-scene');
		this.instantiatorSys = scene.systems['instantiator'];
		this.instantiatorSys.instantiate(this.el.id, this.el.id, this.data.mixin, this.data.parent)
	}
});
