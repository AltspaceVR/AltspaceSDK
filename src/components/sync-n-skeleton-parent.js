/**
 * Syncs the attributes of an n-skeleton-parent component across clients
 * @mixin sync-n-skeleton-parent
 * @memberof sync
 */
AFRAME.registerComponent('sync-n-skeleton-parent', {
	dependencies: ['sync'],
	init: function () {
		var scene = document.querySelector('a-scene');
		this.syncSys = scene.systems['sync-system'];
		this.sync = this.el.components.sync;
		if(this.syncSys.isConnected) { this._start(); }
		else { scene.addEventListener('connected', this._start.bind(this)); }
	},
	getDataRef: function (propertyName) {
		return this.sync.dataRef.child('n-skeleton-parent/' + propertyName);
	},
	_start: function () {
		this.attributeRef = this.sync.dataRef.child('n-skeleton-parent');
		this.attributeRef.on('value', function (snapshot) {
			var val = snapshot.val();
			if (!val) { return; }
			this.el.setAttribute('n-skeleton-parent', val);
		}.bind(this));

		// dataset.creatorUserId is defined when the entity is instantiated via the sync system.
		if (this.el.dataset.creatorUserId) {
			this.attributeRef.set(Object.assign(
				{}, this.el.components['n-skeleton-parent'].data, {userId: this.el.dataset.creatorUserId}));
		}

		this.el.addEventListener('componentchanged', function (event) {
			if (!this.sync.isMine) return;
			var name = event.detail.name;
			if (name === 'n-skeleton-parent') {
				this.attributeRef.set(event.detail.newData);
			}
		}.bind(this));
	}
});

