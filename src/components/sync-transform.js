//TODO: We need to figure out a way to recieve our first update without caring about ownership.
// firstValue is probably not the right way to go, probably something about having sent yet. Need to change for both

/**
* Synchronize the position, rotation, and scale of this object with all clients.
* Requires both a {@link sync.sync-system} component on the `a-scene`, and a
* {@link sync.sync} component on the target entity.
* @mixin sync-transform
* @memberof sync
*/
AFRAME.registerComponent('sync-transform',
{
	dependencies: ['sync'],
	schema: {
	},
	init: function () {
		var component = this;
		var sync = component.el.components.sync;
		if(sync.isConnected) start(); else component.el.addEventListener('connected', start);

		function start(){

			var positionRef = sync.dataRef.child('position');
			var rotationRef = sync.dataRef.child('rotation');
			var scaleRef = sync.dataRef.child('scale');

			component.updateRate = 100;

			var stoppedAnimations = [];
			//pause all animations on ownership loss
			component.el.addEventListener('ownershiplost', function() {
				var children = component.el.children;
				for (var i = 0; i < children.length; i++) {
					var tagName = children[i].tagName.toLowerCase();
					if (tagName === "a-animation") {
						stoppedAnimations.push(children[i]);
						children[i].stop();
					}
				}
			});
			component.el.addEventListener('ownershipgained', function () {
				for (var i = 0; i < stoppedAnimations.length; i++) {
					var animation = stoppedAnimations[i];
					animation.start();
				}
				stoppedAnimations = [];
			});

			function onTransform(snapshot, componentName) {
				if (sync.isMine) return;

				var value = snapshot.val();
				if (!value) return;

				component.el.setAttribute(componentName, value);
			}

			positionRef.on('value', function (snapshot) {
				onTransform(snapshot, 'position');
			});

			rotationRef.on('value', function (snapshot) {
				onTransform(snapshot, 'rotation');
			});

			scaleRef.on('value', function (snapshot) {
				onTransform(snapshot, 'scale');
			});

			var sendPosition = throttle(function(value){
				positionRef.set(value);
			}, component.updateRate);

			var sendRotation = throttle(function(value){
				rotationRef.set(value);
			}, component.updateRate);

			var sendScale = throttle(function(value){
				scaleRef.set(value);
			}, component.updateRate);

			function onComponentChanged(event){
				if (!sync.isMine) return;

				var name = event.detail.name;
				var newData = event.detail.newData;

				if (name === 'position') {
					sendPosition(newData);
				} else if (name === 'rotation') {
					sendRotation(newData);
				} else if (name === 'scale') {
					sendScale(newData);
				} else {
					return;
				}

			}

			//from underscore.js
			function throttle(func, wait, options) {
				var timeout, context, args, result;
				var previous = 0;
				if (!options) options = {};

				var later = function() {
				  previous = options.leading === false ? 0 : Date.now();
				  timeout = null;
				  result = func.apply(context, args);
				  if (!timeout) context = args = null;
				};

				var throttled = function() {
				  var now = Date.now();
				  if (!previous && options.leading === false) previous = now;
				  var remaining = wait - (now - previous);
				  context = this;
				  args = arguments;
				  if (remaining <= 0 || remaining > wait) {
					if (timeout) {
					  clearTimeout(timeout);
					  timeout = null;
					}
					previous = now;
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				  } else if (!timeout && options.trailing !== false) {
					timeout = setTimeout(later, remaining);
				  }
				  return result;
				};

				throttled.cancel = function() {
				  clearTimeout(timeout);
				  previous = 0;
				  timeout = context = args = null;
				};

				return throttled;
			  };


			component.el.addEventListener('componentchanged', onComponentChanged);
		}
	}
});

export default null;
