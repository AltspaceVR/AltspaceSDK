/**
* @module altspace/components
*/

'use strict';

import {registerComponentClass, registerSystemClass} from './AFrameComponent';
import AltspaceCursorCollider from './AltspaceCursorCollider';
import AltspaceTrackedControls from './AltspaceTrackedControls';
import AltspaceComponent from './AltspaceComponent';
import SyncColor from './SyncColor';
import SyncComponent from './SyncComponent';
import SyncSystem from './SyncSystem';
import SyncTransform from './sync-transform';
import SyncNSound from './sync-n-sound';
import Wire from './wire';

import {NObject, NSpawner, NText, NBillboard} from './NSmallComponents';
import {NSphereCollider, NBoxCollider, NCapsuleCollider, NMeshCollider} from './NColliders';
import NContainer from './NContainer';
import NSound from './NSound';

if (window.AFRAME)
{
	registerComponentClass('altspace-cursor-collider', AltspaceCursorCollider);
	registerComponentClass('altspace-tracked-controls', AltspaceTrackedControls);
	registerComponentClass('altspace', AltspaceComponent);
	registerSystemClass('sync-system', SyncSystem);
	registerComponentClass('sync-color', SyncColor);
	registerComponentClass('sync-transform', SyncTransform);
	registerComponentClass('sync', SyncComponent);
	registerComponentClass('sync-n-sound', SyncNSound);
	registerComponentClass('wire', Wire);
	registerComponentClass('n-object', NObject);
	registerComponentClass('n-spawner', NSpawner);
	registerComponentClass('n-text', NText);
	registerComponentClass('n-billboard', NBillboard);
	registerComponentClass('n-container', NContainer);
	registerComponentClass('n-sound', NSound);
	registerComponentClass('n-sphere-collider', NSphereCollider);
	registerComponentClass('n-box-collider', NBoxCollider);
	registerComponentClass('n-capsule-collider', NCapsuleCollider);
	registerComponentClass('n-mesh-collider', NMeshCollider);
}

export {
	AltspaceComponent, AltspaceCursorCollider, AltspaceTrackedControls, SyncSystem,
	SyncComponent, SyncColor, SyncTransform, SyncNSound, Wire,
	NObject, NSpawner, NText, NBillboard, NContainer, NSound,
	NSphereCollider, NBoxCollider, NCapsuleCollider, NMeshCollider
};
