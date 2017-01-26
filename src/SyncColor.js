/**
* Sync the color property of the object between clients.
* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
* {@link sync.sync} component on the target entity.
* @mixin sync-color
* @memberof sync
*/

import {AFrameComponent} from './AFrameComponent';

export default class SyncColor extends AFrameComponent
{
	get dependencies(){
		return ['sync'];
	}

	init()
	{
		let component = this;
		let sync = component.el.components.sync;

		// wait for firebase connection to start sync routine
		if(sync.isConnected)
			start();
		else
			component.el.addEventListener('connected', start);

		function start()
		{
			let colorRef = sync.dataRef.child('material/color');
			let refChangedLocked = false;
			let firstValue = true;

			component.el.addEventListener('componentchanged', event =>
			{
				let name = event.detail.name;
				let oldData = event.detail.oldData;
				let newData = event.detail.newData;

				if (name === 'material' && !refChangedLocked && oldData.color !== newData.color && sync.isMine)
				{
					//For some reason A-Frame has a misconfigured material reference if we do this too early
					setTimeout(() => colorRef.set(newData.color), 0);
				}
			});

			colorRef.on('value', snapshot => {
				if(!sync.isMine || firstValue)
				{
					let color = snapshot.val();

					refChangedLocked = true;
					component.el.setAttribute('material', 'color', color);
					refChangedLocked = false;

					firstValue = false;
				}
			});
		}
	}
}
