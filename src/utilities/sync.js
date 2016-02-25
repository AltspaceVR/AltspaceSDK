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

//TODO: Change name. kvSync?
altspace.utilities.sync = (function () {
    var Firebase = window.Firebase;
    var inAltspace = altspace && altspace.inClient;
    var canonicalUrl = getCanonicalUrl();

    var instance;
    var spaceId; //only set when getSpaceRef is called.

    function dashEscape(keyName) {
        return encodeURIComponent(keyName).replace(/\./g, '%2E').replace(/%[A-Z0-9]{2}/g, '-');
    }

    function getCanonicalUrl() {
        var canonicalElement = document.querySelector('link[rel=canonical]');
        return canonicalElement ? canonicalElement.href : window.location.href;
    }

    function getInstance(params) {

      console.warn('altspace.utilities.sync.getInstance is depreciated, use getInstanceRef instead.');
      return getInstanceRef(params);
    }

    function getInstanceRef(params) {
        var canonicalUrl = getCanonicalUrl();
        var url = new Url();

        params = params || {};

        var instanceId = params.instanceId || url.query['altspace-sync-instance'];
        var projectId = getProjectId(params.appId, params.instanceId, canonicalUrl);

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

    /**
     * Returns a promise whose argument is a firebase instance, specific to 
     * this app and this Altspace space. Promise rejected if not in Altspace
     * (unless spaceId given in the URL).
     * @method getSpaceRef
     * @param {Object} params Same as getInstanceRef
     * @return {Promise}
     * @memberof module:altspace/utilities/sync
     * @example
     *    var params = { appId: yourAppName, authorId: yourAuthorId };
     *    altspace.utilities.sync.getSpaceRef(params).then(onConnected);
     *    function onConnected(firebaseRef) {
     *        firebaseRef.child('highscore').set(42);
     *        // or create a SceneSync using firebaseRef as the syncInstance 
     *    }
     */
    function getSpaceRef(params) {

      params = params || {};
      var inAltspace = altspace && altspace.inClient;
      var hasSpaceId = window.location.search.indexOf('spaceId=') !== -1;

      var p = new Promise(function(resolve, reject) {
        if (hasSpaceId) {
          //spaceId is given in the URL. Needed if in an iframe, cannot call
          //getSpaceRef directly, instead set iframe url query param 'spaceId'
          //using getSpaceId. Can also enable testing outside of Altspace.
          var url = new Url();
          spaceId = url.query['spaceId'];
          console.log("Got spaceId from URL: " + spaceId);
          params["instanceId"] = spaceId;
          instance = getInstanceRef(params);
          resolve(instance);
        } else if (!inAltspace) {//error if not in altspace
          var msg = 'Called getSpaceRef but not running in Altspace';
          reject(msg);
        } else {//get space id using altspace API
          altspace.getSpace().then(function(spaceInfo) {
            spaceId = spaceInfo.sid;
            console.log("Got spaceId from Altspace " + spaceId);
            params["instanceId"] = spaceId;
            instance = getInstanceRef(params);
            resolve(instance);
          }, function(err) {
            var msg = 'Error trying to get space info from Altspace: ' + err;
            reject(msg);
          });
        }      
      });
      return p;
    }

    function depreciatedAuthenticate(callback){//TODO: Promise and document
        var ref = instance || getInstance(params);
        ref.authAnonymously(function(error, authData) {
          if (error) {
            console.error('Authetication Failed!', error);
          } else {
            callback(authData);
          }
        }, {remember: 'sessionOnly'});
    }










    function authenticate() {
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
     * Connect to a sync session to obtain Firebase refs that can be used for syncronizing your app.
     *
     * @method connect
     * @param {Object} [config]
     * @param {Object} [config.authorId] 
     * @param {Object} [config.appId] 
     * @param {Object} [config.instanceId] (Optional) 
     * @param {Object} [config.spaceId] (Optional) 
     * @param {Object} [config.userId] (Optional) 
     * @param {Object} [config.baseRefUrl] (Optional) 
     * @return {Promise}
     * @memberof module:altspace/utilities/sync
     **/
    //TODO params
    //todo return docs
    function connect(config) {
        config = config || {};

        var url = new Url();

        // Our ref used for example apps. Data may be cleared periodically.
        var baseRefUrl = 'https://altspace-apps.firebaseio.com/apps/examples/';

        // Gather query paramaters (some may only be used as testing overrides)
        var instanceId = url.query['altspace-sync-instance'];
        var spaceId = url.query['altspace-sync-space'];
        var userId = url.query['altspace-sync-user'];

        var tasks = [authenticate()];
        if (inAltspace) {
            if(!spaceId) tasks.push(altspace.getSpace());
            if(!userId) tasks.push(altspace.getUser());
        }

        function getRefs() {
            var baseRef = new Firebase(baseRefUrl);
            var refs = {};

            refs.app = baseRef.child(getProjectId(config.appId, config.authorId, canonicalUrl)).child('app');
            refs.space = spaceId ? refs.app.child(spaceId) : null;
            refs.user = userId ? refs.app.child(userId) : null;

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
            if (!spaceId) spaceId = results.pop();
            if (!userId) userId = results.pop();

            var refs = getRefs();

            updateUrl();

            return refs;
        }, function(error) {
            console.error("Failed to connect.");
            console.dir(error);
        });
    }










    /**
     * Returns a firebase instance, just as if you had called new Firebase()  
     *
     * By using syncInstance.parent() you can store cross-instance data like high scores. Likewise you can store persistent user data at syncInstance.parent().child([userId).
     * @method getInstanceRef
     * @param {Object} params
     * @param {String} params.appId An identifier for your app.
     * @param {String} [params.instanceId] An id for a particular instance of
     *  your app. Leave this blank if you would like to have one automatically generated and appended as a query string.
     * @param {String} [params.authorId] An identifier for the author of the
     *  app.
     * @return {Firebase}
     * @memberof module:altspace/utilities/sync
     * @example
     *  var syncInstance = altspace.utilities.sync.getInstanceRef({
     *      // All sync instances with the same instance id will share 
     *      // properties. 
     *      instanceId: yourInstanceId, 
     *      // This helps to prevent collisions.
     *      authorId: yourAuthorId  
     *  });
     */
    return {
      getInstance: getInstance,
      getInstanceRef: getInstanceRef,
      getSpaceRef: getSpaceRef,
      authenticate: depreciatedAuthenticate,
      getSpaceId: function() { return spaceId; }
    };
    
}());
