# AltspaceVR Web SDK

This SDK can be used with [three.js] to create holographic, multi-user web apps for virtual reality. When running inside AltspaceVR they can be experienced with consumer VR hardware including the Oculus Rift DK2.

Three.js is an open-source, render-agnostic 3D engine written in Javascript. It is used to construct much of the 3D graphics you see on the web, and can be used to create entire applications, or enhance existing webpages with 3D content.

This repository contains the primary documentation for the SDK and related APIs, as well as examples and helper modules. As  all required APIs are already integrated into the client, you can build holographic three.js apps for AltspaceVR without using additional libraries from this repo (though many many can be very useful). 

This SDK is in pre-release beta and actively under development. **It is critically important to stay up to date by reading the [Wiki], the [Developer Answers] page, and the [GitHub Issues] page.**

> **Heads up that some documentation and examples may be out of date.** AltRenderer has been depreciated, and altspace.getThreeJSRenderer() should be used instead. The version 0.2.0 of the renderer should be explicitly requested (even if some of the examples do not). All window.Alt calls have been depreciated and replaced with calls on window.altspace, and all supported AltspaceVR APIs now exist only on this object. AltOBJMTLLoader should not be used for any new apps. CursorEvents needs to be refactored now that the normal cursor events can fire on individual objects. It should only be only be used if you intent on using one of the cursor effects.
 
## Getting Started

**Start by following our [Setup Guide].**  
It has very useful things like links to the debuggger.

## AltspaceVR APIs

####Holographic Rendering

* `var renderer = altspace.getThreeJSRenderer({version:'0.2.0'});`  
 returns a renderer that can be used to render three.js scenes as holographic objects

 > **Use {version:'0.2.0'} for the time being.** We may ask you to change this prior to launch. Version 0.1.0 will be delievered if you do not specify a version, but this will change to delivering the latest version at an arbitrary date. Version 0.1.0 can only be used with AltOBJMTLLoader (not arbitrary geometry) and should not be used if at all possible.

####Cursor Events

The basic way to allow the user to interact with three.js objects in AltspaceVR is by attaching cursor event listeners. 

>Note that currently every mesh is represented in our physics engine as object aligned cuboids, 80% the size of a full bounding box (basically a stretched cube that contains most of the object). This means that the cursor will not precisely collide with your meshes, and that signifigantly concave objects (buckets, etc) will block contained objects from being clicked on.

* `mesh.addEventListener('cursorup' / 'cursordown', callback);`  
 listen for cursor events on a specific object.
* `scene.addEventListner('cursormove', callback)`  
 listen for cursor move events

####Enclosure Properties

* `altspace.getEnclosure().then(callback)`  
 returns a promise that will fufill with a description of the enclosure, including pixelsPerMeter which can be used as a coefficient to maintain static sizes for objects regardless of the scale of the enclosure.

####User Data

* `altspace.getUser().then(callback)`  
 returns a promise that will fufill with information about the local user

####Tracking Skeleton

* `altspace.getThreeJSTrackingSkeleton().then(callback)`  
 returns a promise that will fufill with a three.js object hierarchy with each object representing a joint in the unified tracking skeleton. These object's transforms will be automatically updated by AltspaceVR, so feel free to query them for position or add objects as children. **Make sure to add the skeleton to your scene after receiving it**

## Three.js Feature Support

**Currently supported:**
* Object3D transformation and hierarchy
* Most Geometries
* MeshBasicMaterial map and color properties
* Examples that should work: [Draggable Cubes] - [Voxel Painter] - [Falling Cubes] - [Flocking Birds] - [OBJ/MTL Import]

**Not currently supported:**
* Lighting, custom shaders, screen space effects.
* Examples that won't work: [Hemisphere Light] - [Material Reflection] - [Ocean Shader]

**Habits of Successful AltspaceVR Web Apps:**
* Use Object3D transforms (position, rotation, scale) for animation rather than skinned meshes.
* Get user input via AltspaceVR cursor events or the tracking skeleton rather than from the keyboard.
* Limit the number of objects per scene and polygons per object.
* Bake ambient occlusion and other lighting into your models. All models currently render as unlit.

## Learning More

More documentation is available in the [Wiki], including Tutorials and Tips for Developers.  

Videos
* [Live Coding Tutorial]
* [AltspaceVR looking for SDK Collaborators]

Or dive into the source code, organized as follows:
* [src/cursor](src/cursor) - Extends the Cursor API to allow for cursor effects
* [src/sync](src/sync) - Synchronizes object transforms (position, rotation) between clients.
* [src/helpers](src/helpers) - Convenience utilities for common tasks
* [lib](lib) - third-party libraries used by the SDK
* [examples](examples) - sample web apps demonstrating various features

[three.js]: http://threejs.org/

[Wiki]: https://github.com/AltspaceVR/AltspaceSDK/wiki
[Developer Answers]: http://answers.altvr.com
[GitHub Issues]: https://github.com/AltspaceVR/AltspaceSDK/issues

[Setup Guide]: https://github.com/AltspaceVR/AltspaceSDK/wiki/Setup-Guide

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

[Live Coding Tutorial]: https://www.youtube.com/watch?v=R47GvXmvmec
[AltspaceVR looking for SDK Collaborators]: https://www.youtube.com/watch?v=dk8i5or4PJI


