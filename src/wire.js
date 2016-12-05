AFRAME.registerComponent('wire',
{
	schema: {
		on: {type: 'string'},
		emit: {type: 'string'},
		els: {type: 'selectorAll'}
	},
	init: function () {
		this.emitOnEls = function () {
			this.data.els.forEach(function (el) {
				el.emit(this.data.emit);
			}.bind(this));
		}.bind(this);
		this.el.addEventListener(this.data.on, this.emitOnEls);
	},
	remove: function () {
		this.el.removeEventListener(this.data.on, this.emitOnEls);
	}
});
