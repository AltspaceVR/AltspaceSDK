/**
* Represents an app enclosure in AltspaceVR. The enclosure should be retrieved via
* [altspace.getEnclosure]{@link module:altspace.getEnclosure}.
* @class module:altspace~Enclosure
* @memberof module:altspace
*/

/**
* The width of the enclosure in pixels.
* @readonly
* @instance
* @member {Number} innerWidth
* @memberof module:altspace~Enclosure
*/

/**
* The height of the enclosure in pixels.
* @readonly
* @instance
* @member {Number} innerHeight
* @memberof module:altspace~Enclosure
*/

/**
* The depth of the enclosure in pixels.
* @readonly
* @instance
* @member {Number} innerDepth
* @memberof module:altspace~Enclosure
*/

/**
* The ratio of pixels to meters.
* @readonly
* @instance
* @member {Number} pixelsPerMeter
* @memberof module:altspace~Enclosure
*/

/**
* Whether the user has focused the enclosure.
* @readonly
* @instance
* @member {Boolean} hasFocus
* @memberof module:altspace~Enclosure
*/

/**
* Whether the enclosure is in fullspace mode.
* @readonly
* @instance
* @member {Boolean} fullspace
* @memberof module:altspace~Enclosure
*/

/**
* Requests fullspace mode for this enclosure. The returned promise might be rejected if the app doesn't have
* fullspace permissions (although that should rarely be the case).
* @instance
* @method requestFullspace
* @returns {Promise}
* @memberof module:altspace~Enclosure
*/

/**
* Exits fullspace mode.
* @instance
* @method exitFullspace
* @returns {Promise}
* @memberof module:altspace~Enclosure
*/

/**
* The fullspacechange event is fired on the enclosure when it enters or exits fullspace mode.
*
* @event module:altspace.Enclosure#fullspacechange
* @type {Event}
*/

/**
* Altspace augments the global Window object with some events.
*
* @class Window
*/

/**
* The focus event is fired on the window when an enclosure gains focus.
*
* @event Window#focus
* @type {Event}
*/

/**
* The blur event is fired on the window when an enclosure loses focus.
*
* @event Window#blur
* @type {Event}
*/

/**
* Gets the enclosure for the app. The resulting promise resolves to an
* [Enclosure]{@link module:altspace~Enclosure}.
* @method getEnclosure
* @returns {Promise}
* @memberof module:altspace
*/
