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
		this.initialized = true;
		this.processQueuedInstantiations();
	},
	listenToGroup: function (snapshot) {
		snapshot.ref().on('child_added', this.createElement.bind(this));
		snapshot.ref().on('child_removed', this.removeElement.bind(this));
	},
	processQueuedInstantiations: function () {
		this.queuedInstantiations.forEach(function (instantiationProps) {
			instantiationProps.clientId = this.syncSys.clientId;
			console.log('BPDEBUG instantiationProps clientId', instantiationProps.clientId);
			this.instantiatedElementsRef.child(instantiationProps.groupName).push(instantiationProps);
		}.bind(this));
		this.queuedInstantiations.length = 0;
	},
	instantiate: function (instantiatorId, groupName, mixin, parent) {
		// Bit of a hack since we need to pass a string to instantiate() and this.stringify doesn't 
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
			this.instantiatedElementsRef.child(groupName).orderByKey().limitToLast(1).once('value', function (snapshot) {
				if (!snapshot.hasChildren()) { resolve(); return; }

				var ref = snapshot.ref();
				ref.once('value', function () {
					var val = snapshot.val();
					var key = Object.keys(val)[0];
					var props = val[key];
					resolve(props.instantiatorId);
				});
				ref.remove();
			});
		}.bind(this));
	},
	createElement: function (snapshot) {
		var val = snapshot.val();
		var key = snapshot.key();
		console.log('BPDEBUG createElement', key);
		var entityEl = document.createElement('a-entity');
		entityEl.id = val.groupName + '-instance-' + key;
		entityEl.dataset.instantiatorId = val.instantiatorId;
		document.querySelector(val.parent).appendChild(entityEl);
		entityEl.setAttribute('mixin', val.mixin);
		if (val.clientId === this.syncSys.clientId) {
			entityEl.addEventListener('loaded', function () {
				if (!entityEl.components.sync) { return; }
				console.log('BPDEBUG taking ownership', key);
				entityEl.components.sync.takeOwnership();
			});
		}
	},
	removeElement: function (snapshot) {
		var val = snapshot.val();
		var key = snapshot.key();
		var id = val.groupName + '-instance-' + key;
		var el = document.querySelector('#' + id);
		el.parentNode.removeChild(el);
	}
});
