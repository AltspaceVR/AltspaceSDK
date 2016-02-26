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
altspace.utilities.sync = (function () {
    var Firebase = window.Firebase;
    var inAltspace = altspace && altspace.inClient;
    var canonicalUrl = getCanonicalUrl();

    var instance;

    function dashEscape(keyName) {
        return keyName ? encodeURIComponent(keyName).replace(/\./g, '%2E').replace(/%[A-Z0-9]{2}/g, '-') : null;
    }

    function getCanonicalUrl() {
        var canonicalElement = document.querySelector('link[rel=canonical]');
        return canonicalElement ? canonicalElement.href : window.location.href;
    }

    function getInstance(params) {
        console.warn('altspace.utilities.sync.getInstance has been deprecated, please use connect instead.');
      return getInstanceRef(params);
    }

    function getInstanceRef(params) {
        var canonicalUrl = getCanonicalUrl();
        var url = new Url();

        params = params || {};

        var instanceId = params.instanceId || url.query['altspace-sync-instance'];
        var projectId = getProjectId(params.appId, params.authorId, canonicalUrl);

        var firebaseApp = new Firebase('https://altspace-apps.firebaseio.com/apps/examples/').child(projectId); //An example firebase to be used for testing. Data will be cleared periodically.
        firebaseApp.child('lastUrl').set(canonicalUrl);

        var firebaseInstance;

        if (instanceId) {
            firebaseInstance = firebaseApp.child('instances').child(instanceId);
        } else {
            firebaseInstance = firebaseApp.child('instances').push();
            instanceId = firebaseInstance.key();
            url.query['altspace-sync-instance'] = instanceId;
            window.location.href = url.toString();
        }
        instance = firebaseInstance;
        return firebaseInstance;
    }

    function getProjectId(appId, authorId, canonicalUrl) {
        return dashEscape(authorId || canonicalUrl) + ':' + dashEscape(appId || '');
    }

    function deprecatedAuthenticate(callback) {
        console.warn('altspace.utilities.sync.authenticate has been depreciated, please use connect instead.');
        var ref = instance || getInstance(params);
        ref.authAnonymously(function(error, authData) {
          if (error) {
            console.error('Authetication Failed!', error);
          } else {
            callback(authData);
          }
        }, {remember: 'sessionOnly'});
    }


    function authenticate(ref) {
        return new Promise(function(resolve, reject) {
            ref.authAnonymously(function(error, authData) {
                if (error) {
                    console.error('Authetication Failed!', error);
                    reject(error);
                } else {
                    resolve(authData);
                }
            }, { remember: 'sessionOnly' });
        });
    }
    
    /**
     * Retreived
     * via [altspace.utilities.sync.connect]{@link module:altspace/utilities/sync#connect}.
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
     * Returns a promise that will fufill with a [Connection]{@link module:altspace/utilities/sync~Connection}.
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
    function connect(config) {
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

        var tasks = [authenticate(baseRef)];
        if (inAltspace) {
            if (!spaceId) tasks.unshift(altspace.getSpace());
            if (!userId) tasks.unshift(altspace.getUser());
        }

        function getRefs() {
            var refs = {};

            var projectId = getProjectId(config.appId, config.authorId, canonicalUrl);
            console.log(projectId);
            refs.app = baseRef.child(projectId).child('app');
            refs.space = spaceId ? refs.app.child('spaces').child(spaceId) : null;
            refs.user = userId ? refs.app.child('users').child(userId) : null;

            var instancesRef = refs.app.child('instances');
            if (instanceId) {
                refs.instance = instancesRef.child(instanceId);
            } else {
                refs.instance = instancesRef.push();
                instanceId = refs.instance.key();
            }
            return refs;
        }

        function updateUrl() {
            if (!url.query['altspace-sync-instance']) {
                url.query['altspace-sync-instance'] = instanceId;
            }
        }

        return Promise.all(tasks).then(function (results) {
            results.pop();//auth

            if (inAltspace) {
                if (!spaceId) spaceId = results.pop().sid;
                if (!userId) userId = results.pop().userId;
            }

            spaceId = dashEscape(spaceId);
            userId = dashEscape(userId);
            instanceId = dashEscape(instanceId);

            var connection = getRefs();

            updateUrl();

            return connection;
        }).catch(function(error) {
            console.error("Failed to connect.");
            console.dir(error);
        });
    }


    /**
     * Returns a firebase instance, just as if you had called new Firebase()  
     *
     * By using syncInstance.parent() you can store cross-instance data like high scores. Likewise you can store persistent user data at syncInstance.parent().child([userId).
     * @deprecated The connect function can do this and more! Please switch to using it instead. This function will be removed in the next major version
     * @method getInstance
     * @param {Object} params
     * @param {String} params.appId An identifier for your app.
     * @param {String} [params.instanceId] An id for a particular instance of
     *  your app. Leave this blank if you would like to have one automatically generated and appended as a query string.
     * @param {String} [params.authorId] An identifier for the author of the
     *  app.
     * @return {Firebase}
     * @memberof module:altspace/utilities/sync
     * @example
     *  var syncInstance = altspace.utilities.sync.getInstance({
     *      // All sync instances with the same instance id will share 
     *      // properties. 
     *      instanceId: yourInstanceId, 
     *      // This helps to prevent collisions.
     *      authorId: yourAuthorId  
     *  });
     */
    return {
      connect: connect,
      getInstance: getInstance,
      authenticate: deprecatedAuthenticate
    };
    
}());
