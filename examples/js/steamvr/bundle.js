(function (THREE,altspace) {
'use strict';

THREE = 'default' in THREE ? THREE['default'] : THREE;
altspace = 'default' in altspace ? altspace['default'] : altspace;

var SteamVRInputBehavior$1 = altspace.utilities.behaviors.SteamVRInput;

var BRUSH_SIZE = 0.3; // in meters

// Returns a function that returns true only if the value passed in is true, and was previously false
var createPressHelper = function () {
	var prevVal = false;
	return function (val) {
		var ret = val && !prevVal;
		prevVal = !!val;
		return ret;
	}
};

var BrushBehavior = function BrushBehavior(ref) {
	var this$1 = this;
	var hand = ref.hand;

	this._hand = hand;
	this._pixelsPerMeter = 0;
	altspace.getEnclosure().then((function (enclosure) {
		this$1._pixelsPerMeter = enclosure.pixelsPerMeter;
		var s = BRUSH_SIZE/10 * this$1._pixelsPerMeter;

		if(this$1._object3d)
			{ this$1._object3d.scale.setScalar(s); }
		else {
			this$1._scaleFactor = s;
		}
	}).bind(this));
};

BrushBehavior.prototype.awake = function awake (object3d, scene) {
	this._object3d = object3d;
	this._scene = scene;

	if(this._scaleFactor)
		{ this._object3d.scale.setScalar(this._scaleFactor); }

	this._steamVRInput = this._scene.getBehaviorByType('SteamVRInput');
	this._sceneSync = this._scene.getBehaviorByType('SceneSync');

	this._triggerPressed = createPressHelper();
	this._gripPressed = createPressHelper();
};

BrushBehavior.prototype.spawnObject = function spawnObject (position, rotation, scale) {
	this._sceneSync.instantiate('clone', {
		position: position,
		rotation: rotation,
		scale: {
			x: scale.x,
			y: scale.y,
			z: scale.z,
		},
	}, true);
};

BrushBehavior.prototype.clearAllMyObjects = function clearAllMyObjects () {
		var this$1 = this;

	var myObjects = [];
	this._scene.traverse(function (obj) {
		var o = obj.getBehaviorByType('Object3DSync');
		if(o && o.isMine){
			myObjects.push(obj);
		}
	});
	myObjects.forEach(function (obj) { return this$1._sceneSync.destroy(obj); });
};

BrushBehavior.prototype.update = function update () {
	var controller = this._steamVRInput[this._hand + "Controller"];
	var object3d = this._object3d;

	if (controller) {
		// these will be true only on the first frame the button is pressed down.
		var triggerPressed = this._triggerPressed(controller.buttons[SteamVRInputBehavior$1.BUTTON_TRIGGER].pressed);
		var gripPressed = this._gripPressed(controller.buttons[SteamVRInputBehavior$1.BUTTON_GRIP].pressed);

		var s = BRUSH_SIZE/10 * this._pixelsPerMeter + controller.axes[SteamVRInputBehavior$1.AXIS_TOUCHPAD_Y];
		object3d.scale.set(s, s, s);

		if (triggerPressed) {
			this.spawnObject(controller.position, controller.rotation, object3d.scale);
		}

		if (gripPressed) {
			this.clearAllMyObjects();
		}
	}
};

var SteamVRInputBehavior = altspace.utilities.behaviors.SteamVRInput;
var SteamVRTrackedObjectBehavior = altspace.utilities.behaviors.SteamVRTrackedObject;

var sim = new altspace.utilities.Simulation();
var config = { authorId: 'AltspaceVR', appId: 'SpinningCube' };

function createAxis() {
	var group = new THREE.Object3D();

	var x = new THREE.Mesh(
		new THREE.BoxGeometry(10, 1, 1),
		new THREE.MeshBasicMaterial({
			color: '#FF0000',
		})
	);
	x.position.x = 5;
	group.add(x);

	var y = new THREE.Mesh(
		new THREE.BoxGeometry(1, 10, 1),
		new THREE.MeshBasicMaterial({
			color: '#00FF00',
		})
	);
	y.position.y = 5;
	group.add(y);

	var z = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 10),
		new THREE.MeshBasicMaterial({
			color: '#0000FF',
		})
	);
	z.position.z = 5;
	group.add(z);

	return group;
}

function createBrush(ref) {
	var hand = ref.hand;
	var enclosure = ref.enclosure;

	var group = createAxis();
	group.addBehaviors(
		new SteamVRTrackedObjectBehavior({ hand: hand }),
		new BrushBehavior({ hand: hand })
	);
	sim.scene.add(group);
	group.position.y = -enclosure.innerHeight/2;
	return group;
}

function createClone(ref) {
	var position = ref.position;
	var rotation = ref.rotation;
	var scale = ref.scale;

	var group = createAxis();
	group.addBehaviors(
		new altspace.utilities.behaviors.Object3DSync()
	);
	group.position.set(position.x, position.y, position.z);
	group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
	group.scale.set(scale.x, scale.y, scale.z);
	sim.scene.add(group);
	return group;
}

function createFocusCube(ref) {
	var innerWidth = ref.innerWidth;
	var innerDepth = ref.innerDepth;
	var innerHeight = ref.innerHeight;
	var pixelsPerMeter = ref.pixelsPerMeter;

	var geometry = new THREE.BoxGeometry(pixelsPerMeter, pixelsPerMeter, pixelsPerMeter);
	var material = new THREE.MeshBasicMaterial({
		color: '#FFFFFF',
	});
	var ground = new THREE.Mesh(geometry, material);
	ground.position.y = -innerHeight/2 + pixelsPerMeter/2;
	sim.scene.add(ground);
}

altspace.utilities.sync.connect(config).then(function (connection) {
	var sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance, {
		instantiators: {
			clone: createClone,
		},
		ready: function (firstInstance) {
			if (firstInstance) {
					//
			}
		},
	});

	sim.scene.addBehaviors(
		new SteamVRInputBehavior(),
		sceneSync
	);

	altspace.getEnclosure().then(function (enclosure) {
		createFocusCube(enclosure);
		createBrush({
			hand: SteamVRInputBehavior.LEFT_CONTROLLER,
			enclosure: enclosure
		});
		createBrush({
			hand: SteamVRInputBehavior.RIGHT_CONTROLLER,
			enclosure: enclosure
		});
	});

});

}(THREE,altspace));
