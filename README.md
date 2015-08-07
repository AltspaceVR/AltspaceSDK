# AltspaceVR Web SDK

This SDK can be used with [three.js] to create holographic, multi-user web apps for virtual reality. When running inside AltspaceVR they can be experienced with consumer VR hardware including the Oculus Rift DK2.

Three.js is a render-agnostic 3D engine written in Javascript. It is used to construct much of the 3D graphics (usually WebGL) you see on the web.

This SDK is in pre-release beta and actively under development. **It is critically important to stay up to date by reading the [Wiki], the [Developer Answers] page, and the [GitHub Issues] page.**

> **Heads up that some of this documentation and a few of the examples are currently out of date.** AltRenderer has been depreciated, and altspace.getThreeJSRenderer() should be used instead. All window.Alt calls have been depreciated and replaced with calls on window.altspace, and all supported AltspaceVR APIs now exist only on this object. Support for arbitrary three.js geometry is also on its way soon!

>**The full list of availible API functions are as follows**:
* `altspace.getThreeJSRenderer()`  
 returns a renderer that can be used to render three.js scenes as holographic objects
* `altspace.getThreeJSTrackingSkeleton().then(callback)`  
 returns a promise that will fufill with a three.js object hierarchy with each object representing a joint in the unified tracking skeleton. These object's transforms will be automatically updated by AltspaceVR
* `altspace.getUser().then(callback)`  
 returns a promise that will fufill with information about the local user
* `altspace.getEnclosure().then(callback)`  
 returns a promise that will fufill with a description of the enclosure
* `mesh.addEventListener('cursorup' / 'cursordown', callback);`  
 listen for cursor events on a specific object.
* `scene.addEventListner('cursormove', callback)`  
 listen for cursor move events
 

## Scope of Current SDK

AltspaceVR Web Apps are powered by a custom renderer that supports a subset of [three.js]. 

Types of apps you can build:
* Games (arcade-style, table-top, etc), interactive scenes, art & science sims, and much more.
* Tech demos, computational art, data visualization, demoscene-style audio/visual experiences.
* Interfaces to popular websites and mobile apps, or original VR creations inspired by them.
* Apps that *simulate real-world physical objects* tend to work best in Altspace, for example...
* [Draggable Cubes] - [Voxel Painter] - [Falling Cubes] - [Flocking Birds] - [OBJ/MTL Import]

Not currently supported:
* Running stock Three.js apps (must be ported to use our SDK for rendering, input, etc)
* Collisions with avatars (app objects behave like *holograms*; avatars cannot climb onto them)
* Dynamic text, dynamic or animated textures, CSS 3D, Dat.gui or other UI widgets/elements.
* Point clouds, custom shaders, dynamic/modified meshes or materials, screen space effects.
* [Hemisphere Light] - [Material Reflection] - [Point Cloud] - [Three.js Scene] - [Ocean Shader]

Habits of Successful AltspaceVR Web Apps:
* Use models loaded from OBJ/MTL files, not Three.js geometry.
* Use Object3D transforms (position, rotation, scale) for animation.
* Use input via AltspaceVR cursor events, not traditional keyboard.
* Limit the number of objects per scene and polygons per object.
* Do not use lights (other than ambient light rendered by Altspace).
* Do not change object geometries or materials (except tint color).

## Getting Started


## Learning More

More documentation is available in the [Wiki], including Tutorials and Tips for Developers.  

Videos
* [Live Coding Tutorial]
* [AltspaceVR looking for SDK Collaborators]

Or dive into the source code, organized as follows:
* [src](src) - source code for this SDK; top-level files are required by all AltspaceVR web apps
* [src/cursor](src/cursor) - Extends the Cursor API to implement per-object event dispatch, etc.
* [src/sync](src/sync) - Synchronizes object transforms (position, rotation) between clients.
* [src/helpers](src/helpers) - Convenience utilities for common tasks
* [lib](lib) - third-party libraries used by the SDK
* [examples](examples) - sample web apps demonstrating various features

[three.js]: http://threejs.org/

[Wiki]: https://github.com/AltspaceVR/AltspaceSDK/wiki
[Developer Answers]: http://answers.altvr.com
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

[Live Coding Tutorial]: https://www.youtube.com/watch?v=R47GvXmvmec
[AltspaceVR looking for SDK Collaborators]: https://www.youtube.com/watch?v=dk8i5or4PJI


