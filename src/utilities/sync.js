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