/**
 * The Sync utility is currently based on Firebase. It provides a quick way 
 * to syncronize apps between users (even when they are running outside of 
 * AltspaceVR). 
 * During the SDK beta, please consider all data stored with the sync 
 * utility to be ephemeral (it may be cleared or clobbered at any time). 
 * You do not need a Firebase account to use the Sync utility.
 *
 * Refer to the [Firebase API documentation](https://www.firebase.com/docs/web/api/)
 * when working with the sync instance.
 * @module altspace/utilities/sync
 */
altspace.utilities.sync = (function() {
    
    var instance;

    function dashEscapeFirebaseKey(keyName) {
        return encodeURIComponent(keyName).replace(/\./g, '%2E').replace(/%[A-Z0-9]{2}/g, '-')
    }

    function getCanonicalUrl() {
        var canonicalElement = document.querySelector('link[rel=canonical]');
        return canonicalElement ? canonicalElement.href : window.location.href;
    }

    function authenticate(callback){//TODO: Promise
        var ref = instance || getInstance(params);
        ref.authAnonymously(function(error, authData) {
          if (error) {
            console.error("Authetication Failed!", error);
          } else {
            callback(authData);
          }
        }, {remember: 'sessionOnly'});
    }

    /**
     * Returns a firebase instance, just as if you had called new Firebase()  
     * @method getInstance
     * @param {Object} params
     * @param {String} params.appId An identifier for your app.
     * @param {String} [params.instanceId] An id for a particular instance of
     *  your app.
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

    return { getInstance: getInstance, authenticate: authenticate };
}());
