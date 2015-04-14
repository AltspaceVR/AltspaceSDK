# Altspace Web App SDK

This SDK will enable you to create interactive, multi-user web apps with 3D content that is rendered by the Altspace web browser.  Your app will be running inside the Altspace virtual reality environment, experienced with the Oculus Rift DK2 and other advanced VR hardware that Altspace will support in the future.  Below is an overview of the types of apps you can build, the basic steps to create an app, and this repository contents.  

See the [AltspaceSDK Wiki] for additional documentation, including a list of [Known Issues].

To create an Altspace Web App:

1. Clone/download this repo and create your app HTML file.
2. Load one or more OBJ/MTL models using the [AltOBJMTLLoader]
3. Render your scene using the [AltRender] in your animate loop.
4. Implement your animations and app logic using [Three.js]
5. Add Altspace user interaction to your app
	* Add event handlers to objects with [CursorEvents]
	* Add pre-defined interactive behavior with [CursorEffects]
6. Add muti-player networking with [FirebaseSync]

The above steps are explained in more detail in the Getting Started section below, but first a brief overview of what types of 3D web apps are currently supported.

## App Examples (and Counter-Examples)

Altspace Web Apps typically consist of 3D objects that are rendered in Altsapce by a custom renderer, included in this SDK, that supports a subset of [Three.js]. Three.js is a render-agnostic 3D engine written in Javascript. It is used to construct much of the WebGL or CSS 3D you see on the web.

Apps that work best in the Altspace VR environment generally use 3D graphics to *simulate real-world physical objects*. Think retro video games (Tetris blocks, Asteroids rocks), not impressionist art or floating UI elements.  Also note that 3D objects loaded into Altspace by your app currently behave like *holograms*: avatars cannot climb onto them, and they do not have any Physics behaviors (gravity, collisions, etc) besides what you implement.

Types of apps you can build:
* [Draggable Cubes] - Click-and-drag to move objects around.
* [Voxel Painter] - Interactively add objects to the world.
* [Falling Cubes] - Gravity/collision simulation using Physijs plugin. 
* [Flocking Birds] - Objects simulating the Boid flocking algorithm.
* [Sharp Dressed Man] - Load objects from OBJ/MTL files from Blender.  

Not currently supported:
* [Hemisphere Lights] - Flying bird, with a dynamic shadow and toggleable lighting.
* [Materials Reflection] - Car with a reflective material that can change color.
* [Dynamic Particles] - People made of point clouds that fall to the ground then reconstruct.
* [Three.js Scene] - Scene with eclectic objects exported from Three.js then imported back.
* [Ocean Shader] - Sphere submerging into an ocean rendered with a custom WebGL ocean shader.

Habits of Successful Altspace Web Apps:
* Use models loaded from and OBJ file, not Three.js geometry.
* Use Object3D transforms (position, rotation, scale) for animation.
* Use input via Altspace cursor events, not traditional keyboard.
* Limit the number of objects per scene and polygons per object.
* Do not use lights (other than ambient light rendered by Altspace).
* Do not change object geometries or materials (except tint color).

## Getting Started

Let's look at how to create a simple interactive, multi-player Altspace Web App. (See [spinningcube.html] for full example)

**Step 1**
Clone/download this repo and create your app HTML file.

Your app HTML file should contain script tags pointing to the SDK files (and also any desired HTML/CSS, if you app supports running in a tranditional browser).  Next, let's add Javascript that uses standard Three.js commands along with new functions from our SDK (in **bold**).  For larger apps, you could separate your Javascript into multiple JS files; the SDK does not impose any particular file or directory structure.  

**Step 2**:
Load one or more OBJ/MTL models using the **AltOBJMTLLoader**
```
var loader = new THREE.AltOBJMTLLoader();
loader.load(filenameOBJ, function ( loadedObject ) {

	console.log("loaded object from " + filenameOBJ, loadedObject);
	cube = loadedObject;
	isLoadingDone = true;

});
// after loading done
scene.add( cube );
```
Loading can take a second or two, so an app typically waits until are models are loaded before continuing its initialization. Above we set a flag in the loader callback that is checked by an interval timer.

**Step 3**:
Render your scene using the **AltRender** in your animate loop.
```
renderer = new THREE.AltRenderer(); // during scene initialization
...
renderer.render( scene ); // in animation loop (via requestAnimationFrame)
```
Any objects loaded in the first step and added to the Three.js scene are now imported (a.k.a. spawned) into the Altspace VR environment!  They remain there until you remove them from the scene.  Optionally, you can also create a WebGLRenderer, to use when your app is running outside of the Altspace environment.

**Step 4**:
Implement your animations and app logic using **Three.js**
```
// in animate loop
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
```
The AltRenderer serializes key information about objects in your scene for use by the game engine (Unity 3D) rendering the Altspace environment. Thus changes to the transform (position, rotation, scale) of the above cube are mirrored by the cube hologram in Altspace. **Hologram** refers to the in-Altspace 3D object controlled by an Altspace Web App.


**Step 5a**:
Add event handlers to objects with **CursorEvents**
```
cursorEvents = new CursorEvents();
cursorEvents.add( cube );
// cursorEvents.enableMouseEvents( camera )
// optionally map mouse events to cursor events outside of Altsapce

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
Cursor event names are **holocursordown** / **holocursorup** for clicking on a hologram, **holocursorenter** / **holocursorleave** for hovering a hologram, and **holocursormove** for cursor movement. Since holocursormove is not tied to a specific hologram, to receive this event provide a default target in the CursorEvents constructor. (Alternatively, add listeners for cursor events directly to the global window element.)

**Step 5b**:
Add pre-defined interactive behavior with **CursorEffects**
```
cursorEvents.enableEffects();

var dragEffect = new DragPlaneEffect();
var blueGreen = new THREE.Color(0, 1, 1);
var hoverEffect = new ColorHoverEffect( blueGreen );

cursorEvents.addEffect( dragEffect, cube );
cursorEvents.addEffect( hoverEffect, cube );
```
Now the cube is draggable (click once to start drag, click again to release) and it will also change color when the cursor hovers over it. Note these interactive effects, comprising 200 lines of Javascript, were added above with just a half-dozen lines. In addition to using pre-made effects, you can also create your own, for use in your apps or to share with the Altspace developer community.

**Step 6**:
Add muti-player networking with **FirebaseSync**
```
var firebaseRootURL = "https://your-firebase-root.firebaseio.com/";
var appID = "Your-App-Name";
firebaseSync = new FirebaseSync( firebaseRootURL, appID );
firebaseSync.add( cube, "cube" ); // object and unique id
// add all objects you want to sync before calling ...
firebaseSync.connect();
..
// after changing position.y of cube above
firebaseSync.saveObject( cube );
// or call firebaseSync.update() in your animate loop to save all objects,
// but not recommended if objects change position or rotation every frame.
```
The new object state is now saved to the [Firebase](http://firebase.com) cloud and broadcast to any clients connected to this room.  FirebaseSync will update your objects when it recieves broadcasts from other clients.  You can select a room manually by appending "roomID=XXX" (where X is a digit) to your app url query string, or if none is provided one is chosen randomly.

Now this basic app is complete, and you can see the full source code listing at [spinningcube.html]. Also check out [cube.obj] and [cube.mtl] for examples of simple OBJ and MTL files.

## Repository Contents

[examples](examples) - sample web apps demonstrating various features

* [spinningcube.html](spinningcube.html) - Most basic example of loading a cube and adding cursor events.
* [followcursor](followcursor.html) - Cube follows the Altspace cursor using ray origin/direction.

[src](src) - source code

* top level (AltRender.js, AltOBJMTLLoader.js) - requried by all Altspace Web Apps.
* [cursor](src/cursor) - Extends the Cursor API to implement per-object event dispatch, etc.
* [sync](src/sync) - Synchronizes object transforms (position, rotation) between clients.

[lib](lib) - third-party libraries 
* top level (three.min.js, etc) - Open source modules used by src and examples. 

[AltspaceSDK Wiki]: https://github.com/AltspaceVR/AltspaceSDK/wiki
[Known Issues]: https://github.com/AltspaceVR/AltspaceSDK/wiki/Known-Issues

[Flocking Birds]: http://threejs.org/examples/canvas_geometry_birds.html
[Voxel Painter]: http://threejs.org/examples/#webgl_interactive_voxelpainter
[Draggable Cubes]: http://threejs.org/examples/#webgl_interactive_draggablecubes
[Hemisphere Lights]: http://threejs.org/examples/#webgl_lights_hemisphere
[Materials Reflection]: http://threejs.org/examples/#webgl_materials_cars_camaro
[Dynamic Particles]: http://threejs.org/examples/#webgl_particles_dynamic
[Sharp Dressed Man]: http://threejs.org/examples/#webgl_loader_obj_mtl
[Three.js Scene]: http://threejs.org/examples/#webgl_loader_scene
[Ocean Shader]: http://threejs.org/examples/#webgl_shaders_ocean
[Falling Cubes]: http://chandlerprall.github.io/Physijs/examples/collisions.html

[AltOBJMTLLoader]: src/AltOBJMTLLoader.js
[AltRender]: src/AltRenderer.js
[CursorEvents]: src/cursor/CursorEvents.js
[CursorEffects]: src/cursor/CursorEffects.js
[FirebaseSync]: src/sync/FirebaseSync.js
[Three.js]: http://https://github.com/mrdoob/three.js/

[spinningcube.html]: examples/spinningcube.html
[cube.obj]: examples/spinning_cube/cube.obj
[cube.mtl]: examples/spinning_cube/cube.mtl



