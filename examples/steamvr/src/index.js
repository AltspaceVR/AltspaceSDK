import '../style/base.css';

import THREE from 'three';
import altspace from 'altspace';

import SteamVRInputBehavior from './behaviors/steamvr-input.js';

const sim = altspace.utilities.Simulation();
const config = { authorId: 'AltspaceVR', appId: 'SpinningCube' };


window.sim = sim;
function createCube(device) {
  console.log(arguments)
  const geometry = new THREE.BoxGeometry(10, 10, 50);
  const material = new THREE.MeshBasicMaterial({ color: device === SteamVRInputBehavior.LEFT_CONTROLLER ? '#ff0000' : '#0000ff' });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = 25;
  cube.position.y = -10;

  const group = new THREE.Object3D()
  group.addBehaviors(
    altspace.utilities.behaviors.Object3DSync(),
    new SteamVRInputBehavior({device})
  );
  group.add(cube);
  sim.scene.add(group);

  return group;
}

altspace.utilities.sync.connect(config).then((connection) => {
  const sceneSync = altspace.utilities.behaviors.SceneSync(connection.instance, {
    instantiators: {
      left_hand: createCube.bind(null, SteamVRInputBehavior.LEFT_CONTROLLER),
      right_hand: createCube.bind(null, SteamVRInputBehavior.RIGHT_CONTROLLER),
    },
    ready: (firstInstance) => {
      if (firstInstance) {
        sceneSync.instantiate('left_hand');
        sceneSync.instantiate('right_hand');
      }
    },
  });
  sim.scene.addBehavior(sceneSync);
});
