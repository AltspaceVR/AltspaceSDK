AFRAME.registerComponent('one-per-user', {
	dependencies: ['sync'],
	schema: {
		mixin: {type: 'string'},
		parent: {type: 'selector', default: 'a-scene'}
	},
	init: function () {
		/*
		this.syncSys = scene.systems['sync-system'];
		this.sync = this.el.components.sync;
		altspace.getUser().then(function (user) {
			this.userId = user.userId;
			if(this.syncSys.isConnected) { this._start(); }
			else { scene.addEventListener('connected', this._start.bind(this)); }
		}.bind(this));
	   */
		var scene = document.querySelector('a-scene');
		this.instantiatorSys = scene.systems['instantiator'];
		this.instantiatorSys.instantiate(this.el.id, this.el.id, this.data.mixin, this.data.parent)
		console.log('BPDEBUG instantiated one-per-user');
	}
});
