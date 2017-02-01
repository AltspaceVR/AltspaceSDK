'use strict';

/**
* Details of a space.
* @typedef {Object} module:altspace~Space
* @property {String} sid Unique id for this space.
* @property {String} name The space's display name.
* @property {String} templateSid Id for the template that the space is based on.
*	E.g. "conference-room-base", "game-room-base", etc.
*/

/**
* Gets the space that the app is running in. The resulting promise resolves to a
* [Space]{@link module:altspace~Space}
* @method getSpace
* @returns {Promise}
* @memberof module:altspace
*/
