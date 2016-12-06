AFRAME.registerComponent('wire',
{
	schema: {
		on: {type: 'string'},
		emit: {type: 'string'},
		targets: {type: 'selectorAll'}
	},
	update: function (oldData) {
		if (oldData) {
			this.el.removeEventListener(oldData.on, this.emitOnTargets);
		}
		this.emitOnTargets = function () {
			this.data.targets.forEach(function (el) {
				el.emit(this.data.emit);
			}.bind(this));
		}.bind(this);
		this.el.addEventListener(this.data.on, this.emitOnTargets);
	},
	remove: function () {
		this.el.removeEventListener(this.data.on, this.emitOnTargets);
	}
});
