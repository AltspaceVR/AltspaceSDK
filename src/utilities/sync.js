/* global Url */
/**
 * The Sync utility is currently based on Firebase. It provides a quick way
 * to synchronize apps between users (even when they are running outside of
 * AltspaceVR).
 * During the SDK beta, please consider all data stored with the sync
 * utility to be ephemeral (it may be cleared or clobbered at any time).
 * You do not need a Firebase account to use the Sync utility.
 *
 *
 * Refer to the [Firebase API documentation](https://www.firebase.com/docs/web/api/)
 * when working with the sync instance.
 * @module altspace/utilities/sync
 */

import Firebase from 'firebase';
import Url from 'urllib';

let inAltspace = altspace && altspace.inClient;
let canonicalUrl = getCanonicalUrl();

let instance;

function dashEscape(keyName) {
	return keyName ? encodeURIComponent(keyName).replace(/\./g, '%2E').replace(/%[A-Z0-9]{2}/g, '-') : null;
}

function getCanonicalUrl() {
	var canonicalElement = document.querySelector('link[rel=canonical]');
	return canonicalElement ? canonicalElement.href : window.location.href;
}

function getProjectId(appId, authorId, canonicalUrl) {
	return dashEscape(authorId || canonicalUrl) + ':' + dashEscape(appId || '');
}


/**
* Retreived
* via [altspace.utilities.sync.connect]{@link module:altspace/utilities/sync.connect}.
* @class module:altspace/utilities/sync~Connection
* @memberof module:altspace/utilities/sync
*/

/**
* (In-client only) A Firebase reference for the current user (on a per app basis). This can be used for things like a persistent inventory or personal highscores.
* @instance
* @member {Firebase} user
* @memberof module:altspace/utilities/sync~Connection
*/

/**
* A Firebase reference to the current instance of the app.
* This will change if the query paramater is removed through navigation, rebeaming, the space timing out, or other reasons.
* This can be used as an input to SceneSync
* @instance
* @member {Firebase} instance
* @memberof module:altspace/utilities/sync~Connection
*/

/**
* (In-client only) A Firebase reference for the current space. Especially useful if multiple apps / instances need to communicate inside the space.
* @instance
* @member {Firebase} space
* @memberof module:altspace/utilities/sync~Connection
*/

/**
* A Firebase reference for the app.
* This can be used for things like persistent high-scores, dynamic configuration, or inter-instance communication.
* @instance
* @member {Firebase} app
* @memberof module:altspace/utilities/sync~Connection
*/


/**
* Connect to a sync session to obtain Firebase references that can be used for syncronization of real-time and persistent state.
* Returns a promise that will fulfill with a [Connection]{@link module:altspace/utilities/sync~Connection}.
*
* Note: Calling this method will cause a reload of the app, since it adds an 'altspace-sync-instance' query
* parameter to the app's url. Best practice is to establish a sync connection first, before you load any resources
* or render anything in your app. The promise returned by this method will be rejected the first time it is called,
* while the app reloads with the new sync instance id.
*
* @method connect
* @param {Object} config
* @param {String} config.authorId A unique identifier for yourself or your organization
* @param {String} config.appId The name of your app
* @param {String} [config.baseRefUrl] Override the base reference. Set this to use your own Firebase.
* @param {String} [config.instanceId] Override the instanceId. Can also be overriden using a query parameter.
* @param {String} [config.spaceId] Override the spaceId. Can also be overriden using a query parameter.
* @param {String} [config.userId] Override the userId. Can also be overriden using a query parameter.
* @return {Promise}
* @memberof module:altspace/utilities/sync
**/
//todo clients
function connect(config)
{
	config = config || {};

	var url = new Url();

	// Our ref used for example apps. Data may be cleared periodically.
	var baseRefUrl = config.baseRefUrl || 'https://altspace-apps.firebaseio.com/apps/examples/';
	var baseRef = new Firebase(baseRefUrl);

	// Gather query paramaters (some may only be used as testing overrides)
	var instanceId = config.instanceId || url.query['altspace-sync-instance'];
	var spaceId = config.spaceId || url.query['altspace-sync-space'];
	var userId = config.userId || url.query['altspace-sync-user'];

	if (!config.appId || !config.authorId) {
		throw new Error('Both the appId and authorId must be provided to connect.');
	}

	var tasks = [];
	if (inAltspace) {
		if (!spaceId) tasks.unshift(altspace.getSpace());
		if (!userId) tasks.unshift(altspace.getUser());
	}

	var refs = {};
	var projectId = getProjectId(config.appId, config.authorId, canonicalUrl);
	refs.app = baseRef.child(projectId).child('app');
	var instancesRef = refs.app.child('instances');
	if(instanceId) {
		refs.instance = instancesRef.child(instanceId);
	}
	else {
		refs.instance = instancesRef.push();
		instanceId = refs.instance.key();
		url.query['altspace-sync-instance'] = instanceId;
		window.location.href = url.toString();
		// bail early and allow the page to reload
		return Promise.reject(new Error('Sync instance id not found. Reloading app with new sync id.'));
	}

	return Promise.all(tasks).then(function (results) {
		if (inAltspace) {
			if (!spaceId) spaceId = results.pop().sid;
			if (!userId) userId = results.pop().userId;
		}

		spaceId = dashEscape(spaceId);
		userId = dashEscape(userId);
		instanceId = dashEscape(instanceId);

		refs.space = spaceId ? refs.app.child('spaces').child(spaceId) : null;
		refs.user = userId ? refs.app.child('users').child(userId) : null;

		var connection = refs;
		return connection;
	});
}

export { connect };
