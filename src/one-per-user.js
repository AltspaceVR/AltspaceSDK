AFRAME.registerComponent('one-per-user', {
	schema: {
		mixin: {type: 'string'},
		parent: {type: 'selector', default: 'a-scene'}
	},
	init: function () {
		var scene = document.querySelector('a-scene');
		this.syncSys = scene.systems['sync-system'];
		this.syncSys.instantiate(this.el.id, this.el.id, this.data.mixin, this.data.parent)
	}
});
