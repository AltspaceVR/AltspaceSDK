import '../style/base.css';

import THREE from 'three';
import altspace from 'altspace';

import SteamVRInputBehavior, * as SteamVR from './behaviors/steamvr-input.js';
import SteamVRTrackedObjectBehavior from './behaviors/steamvr-tracked-object.js';
import BrushBehavior from './behaviors/brush.js';

const sim = altspace.utilities.Simulation();
const config = { authorId: 'AltspaceVR', appId: 'SpinningCube' };

window.sim = sim;
function createBrush({ device }) {
  const geometry = new THREE.BoxGeometry(10, 10, 50);
  const material = new THREE.MeshBasicMaterial({
    color: device === SteamVR.LEFT_CONTROLLER ? '#ff0000' : '#0000ff',
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = 25;
  cube.position.y = -10;

  const group = new THREE.Object3D();
  group.addBehaviors(
    new SteamVRTrackedObjectBehavior({ device }),
    new BrushBehavior({ device })
  );
  group.position.set(0, -600, 0);
  group.add(cube);
  sim.scene.add(group);

  return group;
}

function createCube({ color, position, rotation, size }) {
  const geometry = new THREE.BoxGeometry(10, 10, 50);
  const material = new THREE.MeshBasicMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = 25;
  cube.position.y = -10;

  const group = new THREE.Object3D();
  group.addBehaviors(
    altspace.utilities.behaviors.Object3DSync()
  );
  group.position.set(position.x, position.y, position.z);
  group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
  group.scale.z = size;
  group.add(cube);
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
      cube: createCube,
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
    device: SteamVR.LEFT_CONTROLLER,
  });
  createBrush({
    device: SteamVR.RIGHT_CONTROLLER,
  });
});
