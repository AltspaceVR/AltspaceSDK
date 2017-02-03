/**
* @module altspace/components
*/

'use strict';

import {registerComponentClass, registerSystemClass, flatten} from './AFrameComponent';
import AltspaceCursorCollider from './AltspaceCursorCollider';
import AltspaceTrackedControls from './AltspaceTrackedControls';
import AltspaceComponent from './AltspaceComponent';
import SyncColor from './SyncColor';
import SyncComponent from './SyncComponent';
import SyncSystem from './SyncSystem';
import SyncTransform from './sync-transform';
import SyncNSound from './sync-n-sound';
//import NativeComponents from './native-components';
import Wire from './wire';

// TODO: finish porting aframe components to es6
if (window.AFRAME)
{
    /**
    * @mixin sync-system
    * @memberof module:altspace/components
    * @see {@link module:altspace/components.SyncSystem}
    */
    registerSystemClass('sync-system', SyncSystem);

    registerComponentClass('altspace-cursor-collider', AltspaceCursorCollider);
    registerComponentClass('altspace-tracked-controls', AltspaceTrackedControls);
    registerComponentClass('altspace', AltspaceComponent);
    registerComponentClass('sync-color', SyncColor);
    registerComponentClass('sync', SyncComponent);

}

export {AltspaceComponent, AltspaceCursorCollider, AltspaceTrackedControls, SyncSystem, SyncComponent, SyncColor, flatten };
