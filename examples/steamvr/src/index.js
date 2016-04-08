import '../style/base.css';

import THREE from 'three';
import altspace from 'altspace';

import SteamVRInputBehavior from './behaviors/steamvr-input.js';

const sim = altspace.utilities.Simulation();
const config = { authorId: 'AltspaceVR', appId: 'SpinningCube' };


window.sim = sim;
function createCube({ device, tracked, color, position, rotation, size }) {
  const geometry = new THREE.BoxGeometry(10, 10, 50);
  const material = new THREE.MeshBasicMaterial({
    color: color || (device === SteamVRInputBehavior.LEFT_CONTROLLER ? '#ff0000' : '#0000ff')
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = 25;
  cube.position.y = -10;

  const group = new THREE.Object3D();
  if (tracked) {
    group.addBehaviors(
      new SteamVRInputBehavior({ device }),
      altspace.utilities.behaviors.Object3DSync({
        position: tracked,
        rotation: tracked,
        scale: tracked,
      })
    );
  } else {
    group.position.set(position.x, position.y, position.z);
    group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    group.scale.z = size;
  }
  group.add(cube);
  sim.scene.add(group);

  return group;
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
  sim.scene.addBehavior(sceneSync);
});

// Thes only need to be created locally
createCube({
  device: SteamVRInputBehavior.LEFT_CONTROLLER,
  tracked: true,
});
createCube({
  device: SteamVRInputBehavior.RIGHT_CONTROLLER,
  tracked: true,
});
