AFRAME.registerComponent('sync-n-parent',
{
	dependencies: ['sync'],
	init: function () {
		var scene = document.querySelector('a-scene');
		this.syncSys = scene.systems['sync-system'];
		this.sync = this.el.components.sync;
		altspace.getUser().then(function (user) {
			this.userId = user.userId;
			if(this.syncSys.isConnected) { this._start(); }
			else { scene.addEventListener('connected', this._start.bind(this)); }
		}.bind(this));
	},
	getDataRef: function (propertyName) {
		return this.sync.dataRef.child('n-skeleton-parent/' + propertyName);
	},
	_start: function () {
		this.attributeRef = this.sync.dataRef.child('n-skeleton-parent');
		this.attributeRef.on('value', function (snapshot) {
			var val = snapshot.val();
			if (!val) { return; }
			console.log('BPDEBUG setAttribute', val);
			this.el.setAttribute('n-skeleton-parent', val);
		}.bind(this));

		// immediately sync this entity's parent userId to the owner's
		if (this.sync.isMine) {
			console.log('BPDEBUG isMine', this.userId);
			this.attributeRef.set(Object.assign(
				{}, this.el.components['n-skeleton-parent'].data, {userId: this.userId}));
		}
		this.el.addEventListener('componentchanged', function (event) {
			if (!this.sync.isMine) return;
			var name = event.detail.name;
			if (name === 'n-skeleton-parent') {
				console.log('BPDEBUG newData', event.detail.newData);
				this.attributeRef.set(event.detail.newData);
			}
		}.bind(this));

		this.el.addEventListener('ownershipgained', function () {
			this.attributeRef.set(Object.assign(
				{}, this.el.components['n-skeleton-parent'].data, {userId: this.userId}));
		}.bind(this));
	}
});

