[< Back to top-level doc](../index.html)

# Three.js API for AltspaceVR

## API Overview

Note that many of our APIs make use of Promises. Learn about how they work [here](https://developers.google.com/web/fundamentals/getting-started/primers/promises).

* [altspace.getThreeJSRenderer](module-altspace.html#.getThreeJSRenderer) - Get AltspaceVR's renderer. Has one function that you should call every frame: [render(scene)](module-altspace-AltRenderer.html#render).
* [altspace.getEnclosure](module-altspace.html#.getEnclosure) - Retrieve the enclosure in which the app is loaded. Details the width, depth, and height of the enclosure, as well as the unit conversion factor to meter scale.
* [altspace.getUser](module-altspace.html#.getUser) - Retrieve the local user's id, name, and moderator status.
* [object.addEventListener](https://threejs.org/docs/#Reference/Core/EventDispatcher) - Be notified when a user interacts with an object. Available events are `cursorup`, `cursordown`, `cursormove`, `cursorenter`, and `cursorleave`.
* [altspace.utilities.sync.connect](module-altspace_utilities_sync.html) - Every user in a room is running their own copy of your app. Use this function to synchronize changes and events between users.
    * [SceneSync](module-altspace_utilities_behaviors.SceneSync.html) and [Object3DSync](module-altspace_utilities_behaviors.Object3DSync.html) are helper behaviors to make the sync process easier.
* [altspace.getThreeJSTrackingSkeleton](module-altspace.html#.getThreeJSTrackingSkeleton) - Keep track of the user's head and hands.

* [Behaviors](module-altspace_utilities_behaviors.html) - Our system for modularizing code so it's reusable on different objects. Many behaviors are built-in.

## Examples and Resources

* [Examples list](/examples/) ([Source code](https://github.com/AltspaceVR/AltspaceSDK/tree/master/examples))
* [Three.js documentation](https://threejs.org/docs)
* [Report a bug](https://github.com/AltspaceVR/AltspaceSDK/issues)

## Quick Start

This is a fully functional example of what Three.js code looks like.
[Live Demo](https://altspacevr.github.io/AltspaceSDK/examples/basic-cube.html)

```html
<!DOCTYPE html>
<html lang=en>
	<head>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/84/three.js"></script>
		<script src="https://sdk.altvr.com/libs/altspace.js/{{SDK_VERSION}}/altspace.min.js"></script>
	</head>
	<body>
		<script>
        // wraps up the renderer, scene, and animation loop
		var sim = new altspace.utilities.Simulation();

        // create a green cube 200 pixels in size
		var cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshBasicMaterial({color: 0x00ff00})
        );
		sim.scene.add(cube);

        // attach a spin behavior to make it rotate over time
		cube.addBehavior( new altspace.utilities.behaviors.Spin() );
		</script>
	</body>
</html>
```
