window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

altspace.utilities.behaviors.ChangeColor = function (config) {

  var object3d;
  var lastColor;

  config = config || {};
  if (config.onEvent === undefined) {
  	throw new Error('Must set config.onEvent, e.g. "cursordown"');
  }
  if (config.initalColor === undefined) config.initialColor = new THREE.Color('white');

  function awake(o) {
    object3d = o;
		if (!object3d.userData.syncData) {
			object3d.userData.syncData = {};
		}
		if (!object3d.userData.syncData.color){
			object3d.userData.syncData.color = config.initialColor;
		}
		object3d.addEventListener(config.onEvent, function() {
			var newColor = Please.make_color()[0];
			object3d.userData.syncData.color = newColor;
			var sync = object3d.getBehaviorByType('Object3DSync');//TODO: better way of doing this
			console.log('send update');//XXX
      if (sync) sync.enqueueSend();
		});
  }

  function update(deltaTime) {
  	if (object3d.userData.syncData.color !== lastColor) {
  		lastColor = object3d.userData.syncData.color;
			object3d.material.color = new THREE.Color(object3d.userData.syncData.color);
			object3d.material.needsUpdate = true;//currently required in Altspace
  	}
  }

  return { awake: awake, update: update };

};

