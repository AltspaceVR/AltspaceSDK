'use strict';

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

import {registerComponentClass, registerSystemClass, flatten} from './AFrameComponent';

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

import SyncSystem from './SyncSystem';
registerSystemClass('sync-system', SyncSystem);

import SyncTransform from './sync-transform';
import SyncNSound from './sync-n-sound';
import NativeComponents from './native-components';
import Wire from './wire';

export {AltspaceComponent, AltspaceCursorCollider, AltspaceTrackedControls, SyncSystem, SyncComponent, SyncColor, flatten };
