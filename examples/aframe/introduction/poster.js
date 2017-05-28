AFRAME.registerComponent('circle-layout', {
	schema: {
		radius: {default: 1, min: 0}
	},
	init: function () {
		var children = this.el.getChildEntities();
		for (var i = 0; i < children.length; i++) {
			var childEl = children[i];
			var radians = i * (2 * Math.PI) / children.length;
			childEl.setAttribute('position', {
				x: this.data.radius * Math.cos(radians),
				y: 0,
				z: this.data.radius * Math.sin(radians)
			});
		}
	}
});
