'use strict';

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

import {registerComponentClass} from './AFrameComponent';

import AltspaceCursorCollider from './AltspaceCursorCollider';
registerComponentClass('altspace-cursor-collider', AltspaceCursorCollider);

import AltspaceTrackedControls from './AltspaceTrackedControls';
registerComponentClass('altspace-tracked-controls', AltspaceTrackedControls);

import AltspaceComponent from './AltspaceComponent';
registerComponentClass('altspace', AltspaceComponent);

import SyncColor from './SyncColor';
registerComponentClass('sync-color', SyncColor);

import SyncComponent from './SyncComponent';
registerComponentClass('sync', SyncComponent);
