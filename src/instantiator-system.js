AFRAME.registerSystem('instantiator', {
	init: function () {
		this.queuedInstantiations = [];
		this.initialized = false;
		var syncSys = this.sceneEl.systems['sync-system'];
		if (syncSys && syncSys.isConnected) {
			this.initializeRef();
		}
		else {
			this.sceneEl.addEventListener('connected', this.initializeRef.bind(this));
		}
	},
	initializeRef: function () {
		this.syncSys = this.sceneEl.systems['sync-system'];
		this.instantiatedElementsRef = this.syncSys.sceneRef.child('instantiatedElements')
		this.instantiatedElementsRef.on('child_added', this.listenToGroup.bind(this));
		this.instantiatedElementsRef.on('child_removed', this.stopListeningToGroup.bind(this));
		this.initialized = true;
		this.processQueuedInstantiations();
	},
	listenToGroup: function (snapshot) {
		snapshot.ref().on('child_added', this.createElement.bind(this));
		snapshot.ref().on('child_removed', this.removeElement.bind(this));
	},
	stopListeningToGroup: function (snapshot) {
		snapshot.ref().off('child_added');
		snapshot.ref().off('child_removed');
	},
	processQueuedInstantiations: function () {
		this.queuedInstantiations.forEach(function (instantiationProps) {
			instantiationProps.creatorUserId = this.syncSys.userInfo.userId;
			instantiationProps.clientId = this.syncSys.clientId;
			this.instantiatedElementsRef.child(instantiationProps.groupName).
				push(instantiationProps).
				onDisconnect().remove();
		}.bind(this));
		this.queuedInstantiations.length = 0;
	},
	instantiate: function (instantiatorId, groupName, mixin, parent) {
		// Bit of a hack since we need to store a string to in firebase and parent.stringify doesn't
		// return a proper selector for a-scene.
		var parentSelector = parent.nodeName === 'A-SCENE' ? 'a-scene' : '#' + parent.id;
		var instantiationProps = {
			instantiatorId: instantiatorId,
			groupName: groupName,
			mixin: mixin,
			parent: parentSelector
		};
		this.queuedInstantiations.push(instantiationProps);
		if (this.initialized) {
			this.processQueuedInstantiations();
		}
	},
	removeLast: function (groupName) {
		return new Promise(function (resolve) {
			this.instantiatedElementsRef.child(groupName).orderByKey().limitToLast(1).once(
				'value',
				function (snapshot) {
					if (!snapshot.hasChildren()) { resolve(); return; }
					var val = snapshot.val();
					var key = Object.keys(val)[0];
					resolve(val[key].instantiatorId);
					snapshot.ref().child(key).remove();
				});
		}.bind(this));
	},
	createElement: function (snapshot) {
		var val = snapshot.val();
		var key = snapshot.key();
		var entityEl = document.createElement('a-entity');
		entityEl.id = val.groupName + '-instance-' + key;
		entityEl.dataset.instantiatorId = val.instantiatorId;
		document.querySelector(val.parent).appendChild(entityEl);
		entityEl.setAttribute('mixin', val.mixin);
		entityEl.dataset.creatorUserId = val.creatorUserId;
	},
	removeElement: function (snapshot) {
		var val = snapshot.val();
		var key = snapshot.key();
		var id = val.groupName + '-instance-' + key;
		var el = document.querySelector('#' + id);
		el.parentNode.removeChild(el);
	}
});
