var instantiatorCounter = 0;
AFRAME.registerComponent('instantiator',
{
	schema: {
		on: {type: 'string'},
		mixin: {type: 'string'}
	},
	init: function () {
		this.el.addEventListener(this.data.on, function () {
			var entity = document.createElement('a-entity');
			entity.id = this.el.id + '-instance-' + instantiatorCounter++;

			var scene = document.querySelector('a-scene');
			scene.appendChild(entity);
			entity.setAttribute('mixin', this.data.mixin);
		}.bind(this));
	}
});


