/**
* Behaviors are designed to be plug-and-play reusable modules to add some type of
* functionality to an object. See [Behavior]{@link module:altspace/utilities/behaviors.Behavior}
* for a full description of a behavior's lifecycle. You add behaviors to Object3Ds
* with [addBehavior]{@link THREE.Object3D}.
* @module altspace/utilities/behaviors
*/

'use strict';

import Behavior from './Behavior';
import Bob from './Bob';
import ButtonStateStyle from './ButtonStateStyle';
import Drag from './Drag';
import GamepadControls from './GamepadControls';
import HoverColor from './HoverColor';
import HoverScale from './HoverScale';
import JointCollisionEvents from './JointCollisionEvents';
import Layout from './Layout';
import Object3DSync from './Object3DSync';
import SceneSync from './SceneSync';
import Spin from './Spin';
import SteamVRInput from './SteamVRInput';
import SteamVRTrackedObject from './SteamVRTrackedObject';
import TouchpadRotate from './TouchpadRotate';

export { Behavior, Bob, ButtonStateStyle, Drag, GamepadControls, HoverColor,
	HoverScale, JointCollisionEvents, Layout, Object3DSync, SceneSync, Spin,
 	SteamVRInput, SteamVRTrackedObject, TouchpadRotate };
