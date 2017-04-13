'use strict';

/**
* Details of a user.
* @typedef {Object} module:altspace~User
* @property {String} userId Unique id for this user.
* @property {String} displayName The user's chosen display name.
* @property {Boolean} isModerator True if the user should be able to moderate apps
*/

/**
* Gets the current user. The resulting promise resolves to a
* [User]{@link module:altspace~User} object.
* @method getUser
* @returns {Promise}
* @memberof module:altspace
*/
