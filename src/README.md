# Three.js API for AltspaceVR



## API Overview

> Note that many of our APIs make use of Promises. Learn about how they work over at [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/es6/promises/)

#### Holographic Rendering

* `var renderer = altspace.getThreeJSRenderer();`
 returns a renderer that can be used to render three.js scenes as holographic objects

  > Holographic objects are limited to the size of the enclosure (1024 x 1024 x 1024 in the apps panel and public 3D browsers, 1280 x 720 x 300 in the browse panel, units are CSS pixels)

#### Cursor Events

The basic way to allow the user to interact with three.js objects in AltspaceVR is by attaching cursor event listeners.

>Note that currently every mesh is represented in our physics engine as object aligned cuboids, 80% the size of a full bounding box (basically a stretched cube that contains most of the object). This means that the cursor will not precisely collide with your meshes, and that significantly concave objects (buckets, etc) will block contained objects from being clicked on.

* `mesh.addEventListener('cursorup' / 'cursordown', callback);`
 listen for cursor events on a specific mesh.

  >These events will bubble up the three.js hierarchy. `stopPropagation` and `stopImmediatePropagation` are supported and work similarly to DOM events
* `scene.addEventListner('cursormove', callback)`
 listen for cursor move events

#### Enclosure Properties

* `altspace.getEnclosure().then(callback)`
 returns a promise that will fulfill with a description of the enclosure, including its size and `pixelsPerMeter` which can be used as a coefficient to maintain static sizes for objects regardless of the scale of the enclosure.

#### User Data

* `altspace.getUser().then(callback)`
 returns a promise that will fulfill with information about the local user

#### Tracking Skeleton

* `altspace.getThreeJSTrackingSkeleton().then(callback)`
 returns a promise that will fulfill with a three.js object hierarchy with each object representing a joint in the unified tracking skeleton. These object's transforms will be automatically updated by AltspaceVR, so feel free to query them for position or add objects as children. **Make sure to add the skeleton to your scene after receiving it**

[Three.js]: http://threejs.org/
[A-Frame]: https://aframe.io/docs/0.3.0/introduction/

[Wiki]: https://github.com/AltspaceVR/AltspaceSDK/wiki
[GitHub Issues]: https://github.com/AltspaceVR/AltspaceSDK/issues
[Developer Portal]: http://developer.altvr.com
[API Reference]: http://altspacevr.github.io/AltspaceSDK/doc/
[Local Dev Setup]: https://developer.altvr.com/local-dev/
[App Guidelines]: https://slack-files.com/T0B35FQCT-F0LED1QC9-299cb2300f
[Getting Started]: https://developer.altvr.com/get-started/
[Slack]: https://altspacevrsdk.slack.com

[Tutorial Series]: https://developer.altvr.com/get-started/

[Flocking Birds]: http://threejs.org/examples/canvas_geometry_birds.html "Objects simulating the Boid flocking algorithm."
[Voxel Painter]: http://threejs.org/examples/#webgl_interactive_voxelpainter "Interactively add objects to the world."
[Draggable Cubes]: http://threejs.org/examples/#webgl_interactive_draggablecubes "Click-and-drag to move objects around."
[Falling Cubes]: http://chandlerprall.github.io/Physijs/examples/collisions.html "Gravity/collision simulation using Physijs plugin."
[OBJ/MTL Import]: http://threejs.org/examples/#webgl_loader_obj_mtl "Load objects from OBJ/MTL files from Blender."
[Hemisphere Light]: http://threejs.org/examples/#webgl_lights_hemisphere "Flying bird, with a dynamic shadow and toggle-able lighting."
[Material Reflection]: http://threejs.org/examples/#webgl_materials_cars_camaro "Car with a reflective material that can change color."
[Point Cloud]: http://threejs.org/examples/#webgl_particles_dynamic "People made of particles that fall to the ground then reconstruct."
[Three.js Scene]: http://threejs.org/examples/#webgl_loader_scene "Scene with eclectic objects exported from Three.js then imported back."
[Ocean Shader]: http://threejs.org/examples/#webgl_shaders_ocean "Sphere submerging into an ocean rendered with a custom WebGL shader."

[Live Coding Tutorial]: https://www.youtube.com/watch?v=R47GvXmvmec
[AltspaceVR looking for SDK Collaborators]: https://www.youtube.com/watch?v=dk8i5or4PJI

---

[![dev dependency status](https://david-dm.org/AltspaceVR/AltspaceSDK/dev-status.svg)](https://david-dm.org/AltspaceVR/AltspaceSDK/#info=devDependencies)
