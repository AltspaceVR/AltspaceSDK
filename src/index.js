'use strict';

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

import {registerComponent} from './AFrameComponent';

import AltspaceCursorCollider from './AltspaceCursorCollider';
registerComponent('altspace-cursor-collider', AltspaceCursorCollider);

import AltspaceTrackedControls from './AltspaceTrackedControls';
registerComponent('altspace-tracked-controls', AltspaceTrackedControls);

import AltspaceComponent from './AltspaceComponent';
registerComponent('altspace', AltspaceComponent);

import SyncColor from './SyncColor';
registerComponent('sync-color', SyncColor);

export {AltspaceCursorCollider};
