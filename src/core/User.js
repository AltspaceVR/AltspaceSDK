'use strict';

/**
* Details of an Altspace user.
* @class module:altspace~User
* @memberof module:altspace
* @property {String} userId - Unique id for this user (per site origin)
* @property {String} displayName - The user's chosen display name.
* @property {Boolean} isModerator - True if the user should be able to moderate apps.
* @property {Object} avatarInfo - What avatar the user is wearing
* @property {String} avatarInfo.sid - The series ID of the avatar. Will be one of:
*   "rubenoid-male-01" (human male), "rubenoid-female-01" (human female),
*   "s-series-m01" (robot male), "s-series-f01" (robot female),
*   "pod-classic" (rounded robot), "a-series-m01" (swirled robot), "x-series-m02" (visor robot),
*   "robothead-propellerhead-01" (helicopter robot), "robothead-roundguy-01" (bumblebee robot),
*   or other future avatar models.
* @property {String} avatarInfo.primaryColor - The main color of the avatar (s, a, x, and pod series only)
* @property {String} avatarInfo.highlightColor - The accent color of the avatar (s, a, x, and pod series only)
* @property {Array} avatarInfo.textures - Texture selection IDs (rubenoids only)
*/

/**
* The avatarchange event is fired when the user changes their avatar.
* @event avatarchange
* @memberof module:altspace~User
* @property {Object} data - The new avatar info, in the same format as User.avatarInfo
*/

/**
* Gets the current user. The resulting promise resolves to a
* [User]{@link module:altspace~User} object.
* @method getUser
* @returns {Promise}
* @memberof module:altspace
*/
