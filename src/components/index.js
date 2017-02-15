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
	/*
	* @mixin altspace-cursor-collider
	* @memberof module:altspace/components
	* @extends module:altspace/components.AltspaceCursorCollider
	*/
	registerComponentClass('altspace-cursor-collider', AltspaceCursorCollider);

	/*
	* @mixin altspace-tracked-controls
	* @memberof module:altspace/components
	* @extends module:altspace/components.AltspaceTrackedControls
	*/
	registerComponentClass('altspace-tracked-controls', AltspaceTrackedControls);

	/*
	* @mixin altspace
	* @memberof module:altspace/components
	* @extends module:altspace/components.AltspaceComponent
	*/
	registerComponentClass('altspace', AltspaceComponent);

	/*
	* @mixin sync-system
	* @memberof module:altspace/components
	* @extends module:altspace/components.SyncSystem
	*/
	registerSystemClass('sync-system', SyncSystem);

	/*
	* @mixin sync-color
	* @memberof module:altspace/components
	* @extends module:altspace/components.SyncColor
	*/
	registerComponentClass('sync-color', SyncColor);

	/*
	* @mixin sync
	* @memberof module:altspace/components
	* @extends module:altspace/components.SyncComponent
	*/
	registerComponentClass('sync', SyncComponent);

	/*
	* @mixin sync-n-sound
	* @memberof module:altspace/components
	* @extends module:altspace/components.SyncNSound
	*/
	registerComponentClass('sync-n-sound', SyncNSound);

	/*
	* @mixin wire
	* @memberof module:altspace/components
	* @extends module:altspace/components.Wire
	*/
	registerComponentClass('wire', Wire);

	/*
	* @mixin n-object
	* @memberof module:altspace/components
	* @extends module:altspace/components.NObject
	*/
	registerComponentClass('n-object', NObject);

	/*
	* @mixin n-spawner
	* @memberof module:altspace/components
	* @extends module:altspace/components.NSpawner
	*/
	registerComponentClass('n-spawner', NSpawner);

	/*
	* @mixin n-text
	* @memberof module:altspace/components
	* @extends module:altspace/components.NText
	*/
	registerComponentClass('n-text', NText);

	/*
	* @mixin n-billboard
	* @memberof module:altspace/components
	* @extends module:altspace/components.NBillboard
	*/
	registerComponentClass('n-billboard', NBillboard);

	/*
	* @mixin n-container
	* @memberof module:altspace/components
	* @extends module:altspace/components.NContainer
	*/
	registerComponentClass('n-container', NContainer);

	/*
	* @mixin n-sound
	* @memberof module:altspace/components
	* @extends module:altspace/components.NSound
	*/
	registerComponentClass('n-sound', NSound);

	/*
	* @mixin n-sphere-collider
	* @memberof module:altspace/components
	* @extends module:altspace/components.NSphereCollider
	*/
	registerComponentClass('n-sphere-collider', NSphereCollider);

	/*
	* @mixin n-box-collider
	* @memberof module:altspace/components
	* @extends module:altspace/components.NBoxCollider
	*/
	registerComponentClass('n-box-collider', NBoxCollider);

	/*
	* @mixin n-capsule-collider
	* @memberof module:altspace/components
	* @extends module:altspace/components.NCapsuleCollider
	*/
	registerComponentClass('n-capsule-collider', NCapsuleCollider);

	/*
	* @mixin n-mesh-collider
	* @memberof module:altspace/components
	* @extends module:altspace/components.NMeshCollider
	*/
	registerComponentClass('n-mesh-collider', NMeshCollider);
}

export {
	AltspaceComponent, AltspaceCursorCollider, AltspaceTrackedControls, SyncSystem,
	SyncComponent, SyncColor, SyncNSound, Wire,
	NObject, NSpawner, NText, NBillboard, NContainer, NSound,
	NSphereCollider, NBoxCollider, NCapsuleCollider, NMeshCollider
};
