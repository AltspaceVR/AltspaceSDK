# Altspace Web App SDK

This SDK will enable you to use Javascript to create interactive, multi-user web apps with 3D content that is rendered by the Altspace web browser.  Your app will be running inside the Altspace virtual reality environment, experienced with the Oculus Rift DK2 and other advanced VR hardware that Altspace will support in the future.

The Altspace SDK is in beta and actively under development. **It is critically important to stay up to date by reading the [AltspaceSDK Wiki], the [Known Issues] page, and the [GitHub Issues] page.**

Consequently, it is also good practice to source the SDK directly from our CDN, or pull from this repo on a consistent basis. The file structure is mirrored in our sdk subdomain so that AltRender (for example) can be linked from http://sdk.altvr.com/src/AltRenderer.js

## Scope of Current SDK

Altspace Web Apps are powered by a custom renderer that supports a subset of [Three.js]. Three.js is a render-agnostic 3D engine written in Javascript. It is used to construct much of the WebGL or CSS 3D you see on the web.

Types of apps you can build:
* Games (arcade-style, table-top, etc), interactive scenes, art & science sims, and much more.
* Tech demos, computational art, data visualizaion, demoscene-style audio/visual experiences.
* Interfaces to popular websites and mobile apps, or original VR creations inspired by them.
* Apps that *simulate real-world physical objects* tend to work best in Altspace, for example...
* [Draggable Cubes] - [Voxel Painter] - [Falling Cubes] - [Flocking Birds] - [OBJ/MTL Import]

Not currently supported:
* Running stock Three.js apps (must be ported to use our SDK for rendering, input, etc)
* Collisions with avatars (app objects behave like *holograms*; avatars cannot climb onto them)
* Dynamic text, dynamic or animated textures, CSS 3D, Dat.gui or other UI widgets/elements.
* Point clouds, custom shaders, dynamic/modified meshes or materials, screen space effects.
* [Hemisphere Light] - [Material Reflection] - [Point Cloud] - [Three.js Scene] - [Ocean Shader]

Habits of Successful Altspace Web Apps:
* Use models loaded from OBJ/MTL files, not Three.js geometry.
* Use Object3D transforms (position, rotation, scale) for animation.
* Use input via Altspace cursor events, not traditional keyboard.
* Limit the number of objects per scene and polygons per object.
* Do not use lights (other than ambient light rendered by Altspace).
* Do not change object geometries or materials (except tint color).

## Getting Started

Let's create an interactive, multi-player Altspace Web App.  
Source: [examples/spinning-cube.html]

**Step 1**
Clone/download this repo and create your app HTML file.

Your app HTML file should contain script tags pointing to the SDK files (and HTML/CSS, if you app supports running in a tranditional browser).  Next, let's add Javascript that uses standard Three.js commands along with new functions from our SDK.  For larger apps, you could separate your Javascript into multiple JS files; the SDK does not impose any particular file or directory structure.  

**Step 2**:
Load one or more OBJ/MTL models using the [AltOBJMTLLoader]
```
var cube;
var loader = new THREE.AltOBJMTLLoader();

// loader assumes .mtl file has same basename as .obj file
loader.load("models/AltspaceCube/cube.obj", function ( loadedObject ) {

	cube = loadedObject;
	scene.add( cube );
		
});
```
The object is now loaded, but it will not appear until the scene is rendered.

**Step 3**:
Render your scene using the [AltRender] in your animate loop.
```
renderer = new THREE.AltRenderer(); // during scene initialization
...
renderer.render( scene ); // in animation loop (via requestAnimationFrame)
```
Any objects loaded by AltOBJMTLLoader and added to the Three.js scene are now imported (a.k.a. spawned) into the Altspace VR environment!  They remain there until you remove them from the scene.  Optionally, you can also create a WebGLRenderer, to use when your app is running outside of the Altspace environment.

**Step 4**:
Implement your animations and app logic using [Three.js]
```
// in animate loop
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
```
The AltRenderer serializes key information about objects in your scene for use by the game engine (Unity 3D) rendering the Altspace environment. Thus changes to the transform (position, rotation, scale) of the above cube are mirrored by the cube hologram in Altspace. **Hologram** refers to the in-Altspace 3D object controlled by an Altspace Web App.


**Step 5a**:
Register objects for Altspce events with [CursorEvents]
```
cursorEvents = new CursorEvents();

// optionally map mouse events to cursor events outside of Altsapce
cursorEvents.enableMouseEvents( camera )

cursorEvents.addObject( cube );

cube.addEventListener( "holocursordown", function( event ) {
	this.position.y += 2;
});

cube.addEventListener( "holocursorup",  function( event ) {
	this.position.y -= 2;
});

...
// in animate loop
cursorEvents.update();
```
Now the cube will apper to "jump" slightly up and down on Altspace cursor press and release.  It will also respond to correspond HTML5 mouse events in a traditional browser.

**Step 5b**:
Add interactive behavior with [Cursor Effect Plugins]
```
var dragEffect = new DragPlaneEffect();
var blueGreen = new THREE.Color(0, 1, 1);
var hoverEffect = new ColorHoverEffect( blueGreen );

cursorEvents.addEffect( dragEffect, cube );
cursorEvents.addEffect( hoverEffect, cube );
```
Now the cube is draggable (click once to start drag, click again to release) and it will also change color when the cursor hovers over it. In addition to using plugins included with this SDK, you can create your own, for use in your apps or to share with the Altspace developer community.

**Step 6**:
Add muti-player networking with [FirebaseSync]
```
var firebaseRootURL = "https://your-firebase-root.firebaseio.com/";
var appId = "Your-App-Name";
firebaseSync = new FirebaseSync( firebaseRootURL, appId );
firebaseSync.addObject( cube, "cube" ); // object and unique id
// add all objects you want to sync before calling ...
firebaseSync.connect();
..
// after changing position.y of cube above
firebaseSync.saveObject( cube );
// or call firebaseSync.update() in your animate loop to save all objects,
// but not recommended if objects change position or rotation every frame.
```
The new object state is now saved to the [Firebase](http://firebase.com) cloud and broadcast to any clients connected to this room.  FirebaseSync will update your objects when it recieves broadcasts from other clients.

Now this basic app is complete! For details, see the source code: [examples/spinning-cube.html].

## Learning More

More documentation is available in the [AltspaceSDK Wiki], including Tutorials and Tips for Developers.  

Or dive info the source code, organized as follows:
* [src](src) - source code for this SDK; top-level files are requried by all Altspace web apps
* [src/cursor](src/cursor) - Extends the Cursor API to implement per-object event dispatch, etc.
* [src/sync](src/sync) - Synchronizes object transforms (position, rotation) between clients.
* [src/helpers](src/helpers) - Convenience utilities for common tasks
* [lib](lib) - third-party libraries used by the SDK
* [examples](examples) - sample web apps demonstrating various features

[AltspaceSDK Wiki]: https://github.com/AltspaceVR/AltspaceSDK/wiki
[Known Issues]: https://github.com/AltspaceVR/AltspaceSDK/wiki/Known-Issues
[GitHub Issues]: https://github.com/AltspaceVR/AltspaceSDK/issues

[Flocking Birds]: http://threejs.org/examples/canvas_geometry_birds.html "Objects simulating the Boid flocking algorithm."
[Voxel Painter]: http://threejs.org/examples/#webgl_interactive_voxelpainter "Interactively add objects to the world."
[Draggable Cubes]: http://threejs.org/examples/#webgl_interactive_draggablecubes "Click-and-drag to move objects around."
[Falling Cubes]: http://chandlerprall.github.io/Physijs/examples/collisions.html "Gravity/collision simulation using Physijs plugin."
[OBJ/MTL Import]: http://threejs.org/examples/#webgl_loader_obj_mtl "Load objects from OBJ/MTL files from Blender."
[Hemisphere Light]: http://threejs.org/examples/#webgl_lights_hemisphere "Flying bird, with a dynamic shadow and toggleable lighting."
[Material Reflection]: http://threejs.org/examples/#webgl_materials_cars_camaro "Car with a reflective material that can change color."
[Point Cloud]: http://threejs.org/examples/#webgl_particles_dynamic "People made of particles that fall to the ground then reconstruct."
[Three.js Scene]: http://threejs.org/examples/#webgl_loader_scene "Scene with eclectic objects exported from Three.js then imported back."
[Ocean Shader]: http://threejs.org/examples/#webgl_shaders_ocean "Sphere submerging into an ocean rendered with a custom WebGL shader."

[AltOBJMTLLoader]: src/AltOBJMTLLoader.js
[AltRender]: src/AltRenderer.js
[CursorEvents]: src/cursor/CursorEvents.js
[ColorHighlightEffect]: src/cursor/ColorHighlightEffect.js
[DragPlaneEffect]: src/cursor/DragPlaneEffect.js
[FirebaseSync]: src/sync/FirebaseSync.js
[Three.js]: http://https://github.com/mrdoob/three.js/

[examples/spinning-cube.html]: examples/spinning-cube.html
[cube.obj]: examples/spinning_cube/cube.obj
[cube.mtl]: examples/spinning_cube/cube.mtl



