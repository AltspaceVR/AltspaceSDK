//Creates a per author, per app, per instance, firebase
//and sets a url query paramater to the intsance id
//If you want to set something globally for your app, get the immediate parent of your instance.
//If you want to set something per user, create a new child keyed to altspace.getUser()...userId on your global app firebase



var fb = createFirebaseInstance('test');
fb.child('testdata').set('testdata')
/*
//Something like this?
threebase.add(object3d);
threebase.add(object3d, {position: true, rotation: true, autoSyncEvery: 200});
threebase.remove(object3d);
*/



//Possible future work