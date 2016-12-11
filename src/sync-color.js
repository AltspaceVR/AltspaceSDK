AFRAME.registerComponent('sync-color',
{
	dependencies: ['sync'],
	schema: {
	},
	init: function () {
		var component = this;
		var sync = component.el.components.sync;
		if(sync.isConnected) start(); else component.el.addEventListener('connected', start);

		function start(){
			var colorRef = sync.dataRef.child('material/color');

			var refChangedLocked = false;

			var firstValue = true;

			component.el.addEventListener('componentchanged', function (event) {
				var name = event.detail.name;
				var oldData = event.detail.oldData;
				var newData = event.detail.newData;

				if (name !== 'material') return;
				if (refChangedLocked) return;

				if (oldData.color !== newData.color) {
					if(sync.isMine){
						setTimeout(function() {//For some reason A-Frame has a misconfigured material reference if we do this too early
							colorRef.set(newData.color);
						}, 0);
					}
				}
			});

			colorRef.on('value', function (snapshot) {
				if (sync.isMine && !firstValue) return;
				var color = snapshot.val();

				refChangedLocked = true;
				component.el.setAttribute('material', 'color', color);
				refChangedLocked = false;

				firstValue = false;
			});
		}
	}
});