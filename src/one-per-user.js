/**
 * Instantiates an entity for each user using [sync-system]{@link sync.sync-system}.
 * @mixin one-per-user
 * @memberof sync
 * @prop {string} mixin - A comma-separated list of mixin ids that are used to instantiate the object.
 * @prop {string} [parent] - A selector specifying which element should be the parent of the instantiated entity.
 *	Defaults to the parent node.
 */
AFRAME.registerComponent('one-per-user', {
	schema: {
		mixin: {type: 'string'},
		parent: {type: 'selector'}
	},
	init: function () {
		var scene = document.querySelector('a-scene');
		this.syncSys = scene.systems['sync-system'];
		this.syncSys.instantiate(this.data.mixin, this.data.parent || this.el.parentNode, this.el)
	}
});
