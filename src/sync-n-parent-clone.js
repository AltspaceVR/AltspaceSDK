var parentCloneCounter = 1;
AFRAME.registerComponent('sync-n-parent-clone',
{
	schema: {
		part: {type: 'string'},
		side: {type: 'string', default: 'center'},
		index: {type: 'int', default: 0},
		parentedPosition: {type: 'vec3'},
		on: {type: 'string'}
	},
	init: function () {
		this.el.addEventListener(this.data.on, function () {
			var clone = document.createElement(this.el.nodeName);
			clone.id = 'sync-n-parent-clone-' + parentCloneCounter++;
			var scene = document.querySelector('a-scene');
			scene.appendChild(clone);
			Object.keys(this.el.components).forEach(function (componentName) {
				if (['sync-n-parent-clone'].indexOf(componentName) !== -1) { return; }
				clone.setAttribute(componentName, this.el.components[componentName].data);
			}.bind(this));
			clone.setAttribute('position', this.data.parentedPosition);
			clone.setAttribute('n-skeleton-parent', {
				part: this.data.part,
				side: this.data.side,
				index: this.data.index
			});
			clone.setAttribute('sync-n-parent', '');
		}.bind(this));
	}
});


