/**
* The TouchpadEvent interface represents events that occur due to the user interacting with the Samsung
* GearVR Touchpad
*
* The best way to think about the units returned from the displacement properties is that they are the number
* of pixels that would be theoretically scrolled by swiping on the touchpad.
* Due to built-in acceleration, this can range from approximately 300 to 700 pixels for a full swipe of the
* touchpad.
* The coordinate system can also be thought of as the value you would add to the document position to scroll
* due to the swipe. (left is +x, up is +y)
*
* @typedef {Object} module:altspace~TouchpadEvent
* @property {Number} displacementX - The horizontal distance that the user has dragged their finger since
*	pressing it on the touchpad. Sliding the finger left on the touchpad increases this value
* @property {Number} displacementY - The vertical distance that the user has dragged their finger since
*	pressing it on the touchpad. Sliding the finger up on the touchpad increases this value
*/

/**
* The touchpadup event is fired from the [altspace]{@link module:altspace} object when the user lifts their
* finger up from the touchpad.
*
* @event module:altspace#touchpadup
* @type {module:altspace~TouchpadEvent}
*/

/**
* The touchpaddown event is fired from the [altspace]{@link module:altspace} object when the user presses their
* finger down on the touchpad.
* The displacement for this event will always be [0, 0]
*
* @event module:altspace#touchpaddown
* @type {module:altspace~TouchpadEvent}
*/

/**
* The touchpadmove event is fired from the [altspace]{@link module:altspace} object while the user slides their
* finger across the trackpad.
*
* @event module:altspace#touchpadmove
* @type {module:altspace~TouchpadEvent}
*/

/**
* Possible touchpad gestures
* @enum {TouchpadGesture}
*/

/**
* The touchpadgesture event is fired from the [altspace]{@link module:altspace} object when the user lifts their
* finger off the touchpad. If it is within a minimum radius, a tap is triggered. Otherwise the primary direction
* of movement is used to generate a directional gesture.
*
* @event module:altspace#touchpadgesture
* @property {TouchpadGesture} gesture - One of 'tap', 'up', 'down', 'left', 'right'
*/
