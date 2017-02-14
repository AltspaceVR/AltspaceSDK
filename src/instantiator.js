/**
* Instantiates objects on an event trigger and adds them to the scene. The instantiated objects are built using
* the specified mixins.
* @mixin instantiator
* @prop {string} on - An event that triggers the instantiation
* @prop {string} mixin - A space-separated list of mixins that should be used to instantiate the object.
* @prop {string} parent='a-scene' - A selector that determines which object the instantiated object will be added to.
* @prop {string} group='main' - An identifier which can be used to group instantiated objects.
*/
AFRAME.registerComponent('instantiator', {
	schema: {
		on: {type: 'string'},
		mixin: {type: 'string'},
		parent: {type: 'selector', default: 'a-scene'},
		group: {type: 'string', default: 'main'},
		removeLast: {type: 'boolean', default: 'true'},
		toggleExisting: {type: 'boolean', default: 'true'}
	},
	init: function () {
		this.onHandler = this.instantiateOrToggle.bind(this);
		this.el.addEventListener(this.data.on, this.onHandler);
	},
	instantiateOrToggle: function () {
		this.system.removeLast(this.data.group).then(function (lastInstantiatorId) {
			if (lastInstantiatorId !== this.el.id) {
				this.system.instantiate(this.el.id, this.data.group, this.data.mixin, this.data.parent)
			}
		}.bind(this));
	},
	remove: function () {
		this.el.removeEventListener(this.data.on, this.onHandler);
	}
});
