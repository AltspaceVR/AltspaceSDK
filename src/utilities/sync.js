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

    function dashEscapeFirebaseKey(keyName) {
        return encodeURIComponent(keyName).replace(/\./g, '%2E').replace(/%[A-Z0-9]{2}/g, '-');
    }

    function getCanonicalUrl() {
        var canonicalElement = document.querySelector('link[rel=canonical]');
        return canonicalElement ? canonicalElement.href : window.location.href;
    }

    function getInstance(params) {
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
     * Returns a promise whose argument is a firebase instance, shared by all
     * instances of this app running in the same Altspace space.
     * @method getInstanceForSpace
     * @param {Object} params Same as getInstance
     * @return {Promise}
     * @memberof module:altspace/utilities/sync
     * @example
     *    var params = { appId: yourAppName, authorId: yourAuthorId };
     *    altspace.utilities.sync.getInstanceForSpace(params).then(onConnected);
     *    function onConnected(firebaseRef) {
     *        firebaseRef.child('highscore').set(42);
     *        // or create a SceneSync using firebaseRef as the syncInstance 
     *    }
     */
    function getInstanceForSpace(params) {

      params = params || {};

      var inAltspace = altspace && altspace.inClient;
      var hasRoomId = window.location.search.indexOf('roomId=') !== -1;

      //If roomId is given in the URL, use it, otherwise get the sid.
      //sid is an URL-safe user-readable string, unique to each space.
      var p = new Promise(function(resolve, reject) {
        if (inAltspace && !hasRoomId) {
          altspace.getSpace().then(function(spaceInfo) {
            spaceSid = spaceInfo.sid;
            console.log('Running in Altspace space ' + spaceSid);
            instance = connect(params, spaceSid);
            resolve(instance);
          }, function(err) {
            var msg = 'Error trying to get space info from Altspace: ' + err;
            console.log(msg);
            reject(msg);
          });
        } else {
          instance = connect(params);
          resolve(instance);
        }      
      });
      return p;
    }

    function connect(params, spaceSid) {

      //three cases: roomId in the URL, use Altspace sid, or use default roomId
      var url = new Url();
      var roomId = url.query['roomId'];
      if (roomId) {
        console.log("Got roomId from URL: " + roomId);
      } else if (spaceSid) {
        roomId = spaceSid;
        console.log("No roomId in URL, using Altspace space sid: " + roomId);
      } else {
        roomId = params.defaultRoomId || 'default';
        console.log("No roomId in URL and not running in Altspace, using default room: " + roomId);
      }

      // Connect to Firebase
      params["instanceId"] = roomId;
      return getInstance(params);
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
      getInstance: getInstance,
      getInstanceForSpace: getInstanceForSpace,
      authenticate: authenticate
    };
    
}());
