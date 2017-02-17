AFRAME.registerComponent('one-per-user', {
	schema: {
		mixin: {type: 'string'},
		parent: {type: 'selector'}
	},
	init: function () {
		var scene = document.querySelector('a-scene');
		this.syncSys = scene.systems['sync-system'];
		this.syncSys.instantiate(this.el, this.data.mixin, this.data.parent || this.el.parentNode)
	}
});
