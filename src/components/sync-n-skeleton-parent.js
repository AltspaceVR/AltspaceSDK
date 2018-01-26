'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* @name module:altspace/components.sync-n-skeleton-parent
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Syncs the attributes of an [n-skeleton-parent]{@link module:altspace/components.n-skeleton-parent} component across clients.
* Requires the [sync]{@link module:altspace/components.sync} component be present
* on the entity. @aframe
* @example <a-box n-skeleton-parent='userId: 123123123123;' sync sync-n-skeleton-parent></a-box>
*/

class SyncNSkeletonParent extends AFrameComponent
{
	get dependencies(){ return ['sync']; }

	init()
	{
		let scene = this.el.sceneEl;
		this.syncSys = scene.systems['sync-system'];
		this.sync = this.el.components.sync;
		if(this.syncSys.isConnected){
			this._start();
		}
		else {
			scene.addEventListener('connected', this._start.bind(this));
		}
	}

	getDataRef(propertyName) {
		return this.sync.dataRef.child('n-skeleton-parent/' + propertyName);
	}

	_start()
	{
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
				this.attributeRef.set(this.el.getAttribute(name));
			}
		}.bind(this));
	}
}

export default SyncNSkeletonParent;
