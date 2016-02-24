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
altspace.utilities.sync = (function() {
    
    var instance;
    var spaceId; //only set when getSpaceRef is called.

    function dashEscapeFirebaseKey(keyName) {
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
        var appName = params.appId || '';
        var instanceId = params.instanceId || url.query['altspace-sync-instance'];
        var authorName = params.authorId || canonicalUrl;

        var appId = dashEscapeFirebaseKey(authorName) + ':' + dashEscapeFirebaseKey(appName);

        var firebaseApp = new Firebase('https://altspace-apps.firebaseio.com/apps/examples/').child(appId); //An example firebase to be used for testing. Data will be cleared periodically.
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

    function authenticate(callback){//TODO: Promise and document
        var ref = instance || getInstance(params);
        ref.authAnonymously(function(error, authData) {
          if (error) {
            console.error('Authetication Failed!', error);
          } else {
            callback(authData);
          }
        }, {remember: 'sessionOnly'});
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
      authenticate: authenticate,
      getSpaceId: function() { return spaceId; }
    };
    
}());
