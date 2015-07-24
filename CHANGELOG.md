Listing of Features, Performance Improvements, Bug Fixes, and Breaking Changes for each version. Version numbers follow the [Semantic Versioning Spec](http://semver.org) (SemVer).  The current version is hard-coded in AltRenderer.SDK_VERSION.

### Version 0.3.2 (2015-07-20)
* **CursorEvents**: Fixed to work with new renderer (which is part of Altspace client). 

### Version 0.3.1 (2015-06-07)
* **DragPlaneEffect**: Fixed to have better default dragPlane and use bounding box to detect when object near edge.
* **FirebaseSync**: Fixed converting the relative token path to full URL.

### Version 0.3.0 (2015-06-05)
* **FirebaseSync**: constructor parameters now accepts optional Firebase custom authentication token.
* **FontAwesome**: FontAwesome and primitives added to `examples/models`
* **AltRenderer**: Added hardcoded version number following the semver spec.

### Version 0.2.0 (2015-05-15)
* **FirebaseSync**: now supports adding and deleting synced objects while the app is running. 

### Version 0.1.0 (2015-04-20)
* First version of the SDK deployed to [sdk.altvr.com] (http://sdk.altvr.com/src/AltRenderer.js)
* **AltRenderer**: Removed transformation adjustments from AltRenderer, now done client-side 
([110096](../../commit/110096730d26e48d5d3457d5491c0ffbfa1dc7a9), [#5](../../issues/5), [#6](../../issues/6))

