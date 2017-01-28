AFRAME.registerComponent('sync-n-parent',
{
	dependencies: ['sync'],
	init: function () {
		var scene = document.querySelector('a-scene');
		this.syncSys = scene.systems['sync-system'];
		altspace.getUser().then(function (user) {
			this.userId = user.userId;
			if(this.syncSys.isConnected) { this._start(); }
			else { scene.addEventListener('connected', this._start.bind(this)); }
		}.bind(this));
	},
	_start: function () {
		var components = [];
		Object.keys(this.el.components).forEach(function (componentName) {
			// TODO We'd have to remove other sync components I think
			if (['sync', 'sync-n-parent'].indexOf(componentName) !== -1) { return; }
			var data = Object.assign({}, this.el.components[componentName].data);
			if (componentName === 'n-skeleton-parent') {
				data.userId = this.userId;
			}
			components.push({type: componentName, data: data});
		}.bind(this));
		this.syncSys.instantiateRemotely(this.el, components, true);
	}
});

