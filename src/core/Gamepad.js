/**
* Get a list of currently connected gamepads. Currently this requires polling this function until it returns
* a non-empty array. Connected gamepads are represented as
* [Gamepad]{@link module:altspace~Gamepad}
* objects. This should work with a range of gamepads, but has only been tested with an Xbox One and
* HTC Vive controllers on Windows.
* @method getGamepads
* @returns {Array}
* @memberof module:altspace
*/

/**
* Represents a gamepad button and its current state.
* @property {Boolean} pressed - If the button is currently pressed.
* @property {Boolean} touched - If the button is currently touched (for Oculus Touch controllers).
* @property {Boolean} nearlyTouched - If the button is nearly being touched (for Oculus Touch controllers).
* @property {Boolean} value - Value of an analog button.
*
* @class module:altspace~GamepadButton
* @memberof module:altspace
*/

/**
* Represents a gamepad. Can be retrived via [altspace.getGamepads]{@link module:altspace.getGamepads}.
* See the official [Gamepad]{@link https://developer.mozilla.org/en-US/docs/Web/API/Gamepad} spec for more
* details.
*
* See {@link https://github.com/AltspaceVR/AltspaceSDK/examples/steamvr} for a usage example
*
* ### SteamVR Gamepad Mappings
* #### Buttons
* | Index | Button          |
* |-------|-----------------|
* | 0     | Trigger (analog)|
* | 1     | Grip            |
* | 2     | Touchpad        |
* | 4     | Touchpad Up     |
* | 5     | Touchpad Right  |
* | 6     | Touchpad Down   |
* | 7     | Touchpad Left   |
*
* #### Axes
* | Index | Axis       |
* |-------|------------|
* | 0     | Touchpad X |
* | 1     | Touchpad Y |
*
* ### Oculus Touch Gamepad Mappings
* #### Buttons
* | Index | Button                   |
* |-------|--------------------------|
* | 0     | Index Trigger (analog)   |
* | 1     | Hand Trigger (analog)    |
* | 2     | Thumbstick               |
* | 3     | Button One (A/X)         |
* | 4     | Button Two (B/Y)         |
* | 5     | Thumbrest (touch)         |
*
* #### Axes
* | Index | Axis         |
* |-------|------------- |
* | 0     | Thumbstick X |
* | 1     | Thumbstick Y |

* @property {Boolean} connected  - Whether the controller is connected.
* @property {string} mapping     - Controller mapping. In addtion to the "standard" mapping in the HTML5
*	Gamepad spec. SteamVR input devices are exposed with a "steamvr" mapping. Oculus touch is exposed with
*   a "touch" mapping.
*
* @property {module:altspace~GamepadButton[]} buttons - An array representing the buttons present on the gamepad.
*
* @property {string} hand        - "left" for the controller in the users left hand, "right for the right hand.
* If only one controller is connected, only a "right" controller will be returned..
*
* @property {object} position    - The position in enclosure space of a SteamVR input device
*	(only available on gamepads with mapping == 'steamvr' or mapping == 'touch')
* @property {number} position.x  - x coordinate
* @property {number} position.y  - y coordinate
* @property {number} position.z  - z coordinate
*
* @property {object} rotation    - The orientation quaternion in enclosure space of a SteamVR input device
*	(only available on gamepads with mapping == 'steamvr' or mapping == 'touch').
* @property {number} rotation.x  - x component
* @property {number} rotation.y  - y component
* @property {number} rotation.z  - z component
* @property {number} rotation.w  - w component
*
* @class module:altspace~Gamepad
* @memberof module:altspace
*/

/**
* Prevents default actions on specific axes and buttons.
* @instance
* @method preventDefault
* @param {Array} axes An array of booleans, arranged according to the axis order of the layout. A true value
*	for a given location will block the default action for that axis.
* @param {Array} buttons An array of booleans, arranged according to the button order of the layout. A true
*	value for a given location will block the default action for that button.
* @memberof module:altspace~Gamepad
*/
