'use strict';

import {AFrameComponent} from './AFrameComponent';

/**
* Sync the color property of the object between clients.
* Requires both a [sync-system]{@link module:altspace/components.sync-system} component on the `a-scene`, and a
* [sync]{@link module:altspace/components.sync} component on the target entity. @aframe
* @alias sync-color
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
*/

class SyncColor extends AFrameComponent
{
	get dependencies(){
		return ['sync'];
	}

	init()
	{
		this.sync = this.el.components.sync;

		// wait for firebase connection to start sync routine
		if(this.sync.isConnected)
			start();
		else
			this.el.addEventListener('connected', this.start.bind(this));
	}

	start()
	{
		let colorRef = this.sync.dataRef.child('material/color');
		let refChangedLocked = false;
		let firstValue = true;
		let self = this;

		this.el.addEventListener('componentchanged', event =>
		{
			let name = event.detail.name;
			let oldData = event.detail.oldData;
			let newData = event.detail.newData;

			if (name === 'material' && !refChangedLocked && oldData.color !== newData.color && self.sync.isMine)
			{
				//For some reason A-Frame has a misconfigured material reference if we do this too early
				setTimeout(() => colorRef.set(newData.color), 0);
			}
		});

		colorRef.on('value', snapshot => {
			if(!self.sync.isMine || firstValue)
			{
				let color = snapshot.val();

				refChangedLocked = true;
				self.el.setAttribute('material', 'color', color);
				refChangedLocked = false;

				firstValue = false;
			}
		});
	}
}

export default SyncColor;
