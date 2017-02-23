import THREE from 'three';
import altspace from 'altspace';

import BrushBehavior from './behaviors/brush.js';

const SteamVRInputBehavior = altspace.utilities.behaviors.SteamVRInput;
const SteamVRTrackedObjectBehavior = altspace.utilities.behaviors.SteamVRTrackedObject;

const sim = new altspace.utilities.Simulation();
const config = { authorId: 'AltspaceVR', appId: 'SpinningCube' };

function createAxis() {
	const group = new THREE.Object3D();

	const x = new THREE.Mesh(
		new THREE.BoxGeometry(10, 1, 1),
		new THREE.MeshBasicMaterial({
			color: '#FF0000',
		})
	);
	x.position.x = 5;
	group.add(x);

	const y = new THREE.Mesh(
		new THREE.BoxGeometry(1, 10, 1),
		new THREE.MeshBasicMaterial({
			color: '#00FF00',
		})
	);
	y.position.y = 5;
	group.add(y);

	const z = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 10),
		new THREE.MeshBasicMaterial({
			color: '#0000FF',
		})
	);
	z.position.z = 5;
	group.add(z);

	return group;
}

function createBrush({ hand, enclosure }) {
	const group = createAxis();
	group.addBehaviors(
		new SteamVRTrackedObjectBehavior({ hand }),
		new BrushBehavior({ hand })
	);
	sim.scene.add(group);
	group.position.y = -enclosure.innerHeight/2;
	return group;
}

function createClone({ position, rotation, scale }) {
	const group = createAxis();
	group.addBehaviors(
		new altspace.utilities.behaviors.Object3DSync()
	);
	group.position.set(position.x, position.y, position.z);
	group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
	group.scale.set(scale.x, scale.y, scale.z);
	sim.scene.add(group);
	return group;
}

function createFocusCube({innerWidth, innerDepth, innerHeight, pixelsPerMeter}) {
	const geometry = new THREE.BoxGeometry(pixelsPerMeter, pixelsPerMeter, pixelsPerMeter);
	const material = new THREE.MeshBasicMaterial({
		color: '#FFFFFF',
	});
	const ground = new THREE.Mesh(geometry, material);
	ground.position.y = -innerHeight/2 + pixelsPerMeter/2
	sim.scene.add(ground);
}

altspace.utilities.sync.connect(config).then((connection) => {
	const sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance, {
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

	altspace.getEnclosure().then((enclosure) => {
		createFocusCube(enclosure);
		createBrush({
			hand: SteamVRInputBehavior.LEFT_CONTROLLER,
			enclosure
		});
		createBrush({
			hand: SteamVRInputBehavior.RIGHT_CONTROLLER,
			enclosure
		});
	})

});
