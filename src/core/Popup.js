/**
* Represents a popup. This type should not be instantiated manually. You should open popups with the
* [altspace.open]{@link module:altspace.open} method.
* @class module:altspace~Popup
*
*/
/**
* Show the popup
* @instance
* @method show
* @memberof module:altspace~Popup
*/
/**
* Hide the popup
* @instance
* @method hide
* @memberof module:altspace~Popup
*/

/**
* Open a URL in a user's private browser. The resulting promise resolves to a
* [Popup]{@link module:altspace~Popup} object.
* The target of the popup can either be '_blank' or '_experience'. The '_blank' target will open the URL
* in the user's "Web" panel. The '_experience' target allows you to augment the Altspace UI with a new
* button in the user's menu. When users click on the button, the popup will open in their private UI with
* the URL you provide. By default, the button will display the favicon associated with the URL.
* This gives you richer control of the user's experience when your app is loaded in a space.
* @method open
* @param {String} url The full URL that should be opened in the popup.
* @param {String} [target='_blank'] Either '_experience' or '_blank'
* @param {Object} [opts] Options for the popup
* @param {Object} [opts.icon] The full URL to an icon. The icon must be a square PNG or JPG.
*	If omitted, the favicon will be based on the popup URL's host.
* @param {Object} [opts.hidden=false] Whether to hide the popup by default.
* @returns {Promise}
* @memberof module:altspace
*/
