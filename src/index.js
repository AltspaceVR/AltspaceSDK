if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

require('./altspace');
require('./altspace-cursor-collider');
require('./altspace-tracked-controls');
require('./native-components');
require('./native-resources');
require('./sync');
require('./sync-system');
require('./sync-transform');
require('./sync-color');
require('./sync-n-sound');
require('./wire');
