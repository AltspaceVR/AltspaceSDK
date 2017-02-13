AFRAME.registerSystem('instantiator', {
	init: function () {
		this.instantiatorCounter = 0;
		this.groupNameToEntityEls = new Map();
	},
	instantiate: function (instantiatorId, groupName, mixin, parent) {
		if (!this.groupNameToEntityEls.get(groupName)) {
			this.groupNameToEntityEls.set(groupName, []);
		}
		var entityEls = this.groupNameToEntityEls.get(groupName);

		var entityEl = document.createElement('a-entity');
		entityEl.id = groupName + '-instance-' + this.instantiatorCounter++;
		entityEl.dataset.instantiatorId = instantiatorId;

		parent.appendChild(entityEl);
		entityEl.setAttribute('mixin', mixin);

		entityEls.push(entityEl);
	},
	removeLast: function (groupName) {
		var entityEls = this.groupNameToEntityEls.get(groupName);
		if (!entityEls) { return; }
		var entityEl = entityEls.pop();
		if (!entityEl) { return; }
		entityEl.parentNode.removeChild(entityEl);
		return entityEl;
	},
});
