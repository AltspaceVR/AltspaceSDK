import THREE from 'three';
import altspace from 'altspace';

import BrushBehavior from './behaviors/brush.js';

const SteamVRInputBehavior = altspace.utilities.behaviors.SteamVRInput;
const SteamVRTrackedObjectBehavior = altspace.utilities.behaviors.SteamVRTrackedObject;

const sim = altspace.utilities.Simulation();
const config = { authorId: 'AltspaceVR', appId: 'SpinningCube' };

function createAxis() {
	const group = new THREE.Object3D();
	group.position.set(0, -600, 0);

	const x = new THREE.Mesh(
		new THREE.BoxGeometry(50, 5, 5),
		new THREE.MeshBasicMaterial({
			color: '#FF0000',
		})
	);
	x.position.x = 25;
	group.add(x);

	const y = new THREE.Mesh(
		new THREE.BoxGeometry(5, 50, 5),
		new THREE.MeshBasicMaterial({
			color: '#00FF00',
		})
	);
	y.position.y = 25;
	group.add(y);

	const z = new THREE.Mesh(
		new THREE.BoxGeometry(5, 5, 50),
		new THREE.MeshBasicMaterial({
			color: '#0000FF',
		})
	);
	z.position.z = 25;
	group.add(z);

	return group;
}

function createBrush({ hand }) {
	const group = createAxis();
	group.addBehaviors(
		new SteamVRTrackedObjectBehavior({ hand }),
		new BrushBehavior({ hand })
	);
	sim.scene.add(group);
	return group;
}

function createClone({ position, rotation, scale }) {
	const group = createAxis();
	group.addBehaviors(
		altspace.utilities.behaviors.Object3DSync()
	);
	group.position.set(position.x, position.y, position.z);
	group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
	group.scale.set(scale.x, scale.y, scale.z);
	sim.scene.add(group);
	return group;
}

function createFloor() {
	const geometry = new THREE.BoxGeometry(1000, 10, 1000);
	const material = new THREE.MeshBasicMaterial({
		color: '#FFFFFF',
	});
	const ground = new THREE.Mesh(geometry, material);
	ground.position.y = -520;
	sim.scene.add(ground);
}

altspace.utilities.sync.connect(config).then((connection) => {
	const sceneSync = altspace.utilities.behaviors.SceneSync(connection.instance, {
		instantiators: {
			clone: createClone,
		},
		ready: (firstInstance) => {
			if (firstInstance) {
					//
			}
		},
	});

	sim.scene.addBehaviors(
		new SteamVRInputBehavior(),
		sceneSync
	);

	createFloor();
	// Thes only need to be created locally
	createBrush({
		hand: SteamVRInputBehavior.LEFT_CONTROLLER,
	});
	createBrush({
		hand: SteamVRInputBehavior.RIGHT_CONTROLLER,
	});
});
