/**
* The ThreeJSCursorEvent interface represents events that occur due to the user interacting with three.js
* objects using the cursor
*
*
* @typedef {Object} THREE.Object3D#ThreeJSCursorEvent
* @property {THREE.Ray} ray - The ray that was used to project the cursor. Will often come from either the
*	user's center eye or a motion controller they are holding.
* @property {THREE.Vector3} point - The point in world space where the ray intersected an object.
* @property {Boolean} bubbles - Whether this event will bubble up the three.js hierarchy. True for all
*	ThreeJSCursorEvents. Roughly matches DOM bubbling (does not have a capture step).
* @property {THREE.Object3D} target - The [THREE.Object3D]{@link THREE.Object3D} the event originally fired on.
* @property {THREE.Object3D} currentTarget - The [THREE.Object3D]{@link THREE.Object3D} the event is currently
*	firing on as it bubbles.
* @property {Function} stopPropagation - Allows the remaining event listeners for this event on
*	this [THREE.Object3D]{@link THREE.Object3D} to fire and then stops.
* @property {Function} stopImmediatePropagation - Stops the firing of any more event listeners for this event.
*/

/**
* The cursorenter event is fired from an [THREE.Object3D]{@link THREE.Object3D} when the user's cursor
* moves over the object.
*
* @event THREE.Object3D.cursorenter
* @type {THREE.Object3D#ThreeJSCursorEvent}
* @static
*/

/**
* The cursorleave event is fired from an [THREE.Object3D]{@link THREE.Object3D} when the user's cursor
* moves off the object.
*
* @event THREE.Object3D.cursorleave
* @type {THREE.Object3D#ThreeJSCursorEvent}
* @static
*/

/**
* The cursorup event is fired from an [THREE.Object3D]{@link THREE.Object3D} when the user's primary
* cursor button is lifted up over an object
*
* @event THREE.Object3D.cursorup
* @type {THREE.Object3D#ThreeJSCursorEvent}
* @static
*/

/**
* The cursordown event is fired from an [THREE.Object3D]{@link THREE.Object3D} when the user's primary
* cursor button is pressed down over an object
*
* @event THREE.Object3D.cursordown
* @type {THREE.Object3D#ThreeJSCursorEvent}
* @static
*/

/**
* The cursormove event is fired from a [THREE.Scene]{@link THREE.Scene} when the user's cursor moves over
* or near an object
*
* @event THREE.Scene#cursormove
* @type {THREE.Object3D#ThreeJSCursorEvent}
*/
