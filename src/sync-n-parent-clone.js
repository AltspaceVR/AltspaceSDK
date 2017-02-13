/**
* Instantiates objects on an event trigger and adds them to the scene. The instantiated objects are built using
* the specified mixins.
* @mixin instantiator
* @prop {string} on - An event that triggers the instantiation
* @prop {string} mixin - A space-separated list of mixins that should be used to instantiate the object.
* @prop {string} parent='a-scene' - A selector that determines which object the instantiated object will be added to.
* @prop {string} group='main' - An identifier which can be used to group instantiated objects.
* @prop {boolean} removeLast=true - Whether the last object instantiated in this group should be removed when a new
*	object is instantiated.
* @prop {boolean} toggleExisting=true - Whether the object should be removed if the same instantiator is triggered twice.
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
		var lastEntityEl;
		if (this.data.removeLast) {
			lastEntityEl = this.system.removeLast(this.data.group);
		}
		var lastInstantiatorId;
		if (lastEntityEl) {
			lastInstantiatorId = lastEntityEl.dataset.instantiatorId;
		}
		if (!this.data.toggleExisting || !lastInstantiatorId || lastInstantiatorId !== this.el.id) {
			this.system.instantiate(this.el.id, this.data.group, this.data.mixin, this.data.parent)
		}
	},
	remove: function () {
		this.el.removeEventListener(this.data.on, this.onHandler);
	}
});
