/**
* AltspaceVR supports the 3D scene-building tool [A-Frame]{@link https://aframe.io/docs/0.3.0/introduction/}.
* In addition to the set of [default components provided by A-Frame]{@link https://aframe.io/docs/0.3.0/core/component.html},
* this SDK provides a set of components to add AltspaceVR compatibility and additional
* functionality to the toolset. At a minimum, A-Frame apps will need the [altspace]{@link module:altspace/components.altspace}
* component on the `<a-scene>` tag to function as an AltspaceVR app.
* @module altspace/components
* @example
* <html>
*   <head>
*     <title>My A-Frame Scene</title>
*     <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
*     <script src="https://cdn.rawgit.com/AltspaceVR/AltspaceSDK/v{{SDK_VERSION}}/dist/altspace.min.js"></script>
*   </head>
*   <body>
*     <a-scene altspace>
*       <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
*     </a-scene>
*   </body>
* </html>
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
import SyncNSkeletonParent from './sync-n-skeleton-parent';
import Wire from './wire';
import OnePerUser from './one-per-user';
import Instantiator from './instantiator';

import {
	NObject, NSpawner, NText, NBillboard, NSkeletonParent, NCockpitParent
} from './NSmallComponents';
import {NSphereCollider, NBoxCollider, NCapsuleCollider, NMeshCollider} from './NColliders';
import NContainer from './NContainer';
import NPortal from './NPortal';
import NSound from './NSound';
import NLayoutBrowser from './NLayoutBrowser';
import NGLTF from './NGLTF';

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
	registerComponentClass('sync-n-skeleton-parent', SyncNSkeletonParent);
	registerComponentClass('wire', Wire);
	registerComponentClass('one-per-user', OnePerUser);
	registerComponentClass('instantiator', Instantiator);
	registerComponentClass('n-object', NObject);
	registerComponentClass('n-portal', NPortal);
	registerComponentClass('n-spawner', NSpawner);
	registerComponentClass('n-text', NText);
	registerComponentClass('n-billboard', NBillboard);
	registerComponentClass('n-skeleton-parent', NSkeletonParent);
	registerComponentClass('n-cockpit-parent', NCockpitParent);
	registerComponentClass('n-container', NContainer);
	registerComponentClass('n-sound', NSound);
	registerComponentClass('n-sphere-collider', NSphereCollider);
	registerComponentClass('n-box-collider', NBoxCollider);
	registerComponentClass('n-capsule-collider', NCapsuleCollider);
	registerComponentClass('n-mesh-collider', NMeshCollider);
	registerComponentClass('n-layout-browser', NLayoutBrowser);
	registerComponentClass('n-gltf', NGLTF);
}

export {
	AltspaceComponent, AltspaceCursorCollider, AltspaceTrackedControls, SyncSystem,
	SyncComponent, SyncColor, SyncTransform, SyncNSound, Wire, OnePerUser, Instantiator,
	SyncNSkeletonParent, NObject, NPortal, NSpawner, NText, NBillboard, NSkeletonParent,
	NCockpitParent, NContainer, NSound, NSphereCollider, NBoxCollider, NCapsuleCollider,
	NMeshCollider, NLayoutBrowser, NGLTF
};
