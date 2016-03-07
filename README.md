# AltspaceVR SDK

The AltspaceVR SDK can be used together with [three.js] to create holographic, multi-user web apps for virtual reality. When running inside [AltspaceVR](http://altvr.com/) they can be experienced with consumer VR hardware including the Oculus Rift DK2.  

**Latest Version: v0.5.3 -- [See Changes](https://github.com/AltspaceVR/AltspaceSDK/releases/tag/v0.5.3)**  

<!-- 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
THIS FILE IS GENERATED FROM README.md.template. EDIT THAT INSTEAD
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
--> 

[Three.js](http://threejs.org/) is an open-source, render-agnostic 3D engine written in Javascript. It is used to construct much of the 3D graphics you see on the web, and can be used to create entire applications, or enhance existing webpages with 3D content.

## Resources

**[Getting Started] - If you're new to the SDK, start here!**  
**[API Reference] - Reference for built in API functions, utilities, and more**  
**[Developer Portal] - Tutorials, projects, initiative program, and app submission**  
**[Developer Answers] - Questions and answers about the SDK**  
**[Local Dev Setup] - Instructions for setting up a local dev environment**  
**[App Guidelines] - Suggestions for building apps that work well in Altspace and Gear VR**    
**[Slack] - Chat with other members of the community and AltspaceVR devs.  [Register for Slack](http://altspacevr-slackin.herokuapp.com)**  


## altspace.js

`altspace.js` should be included whenever you use the SDK. It contains core utilities and apis, and is useful both inside and outside of the client.  

Many APIs are present in the client without loading `altspace.js`, but please still include it, as this may change in the future.  

**The version baked into the altspace.js script you include will determine which version of the entire SDK that the client will provide your app.** This means that if we make any breaking internal changes to things like rendering or cursor events, and you are using an older version of `altspace.js` we will try to return legacy behavior appropriate to your version of `altspace.js`. Versioning will follow [SEMVER](http://semver.org/) as closely as possible. Details for each version can be found in the [Release Notes](https://github.com/AltspaceVR/AltspaceSDK/releases).

Include the latest version of altspace in your app with:

`<script src="http://sdk.altvr.com/libs/altspace.js/0.5.3/altspace.min.js"></script>`

If you use npm, you can install altspace.js with:

`npm install altspace`

## API Overview  

**See the [API Reference](http://altspacevr.github.io/AltspaceSDK/doc) for full details and a complete list of APIs and utilities.**  

> Note that many of our APIs make use of Promises. Learn about how they work over at [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/es6/promises/)

#### Holographic Rendering

* `var renderer = altspace.getThreeJSRenderer();`  
 returns a renderer that can be used to render three.js scenes as holographic objects  

  > Holographic objects are limited to the size of the enclosure (1024 x 1024 x 1024 in the apps panel and public 3D browsers, 1280 x 720 x 300 in the browse panel, units are CSS pixels)

#### Cursor Events

The basic way to allow the user to interact with three.js objects in AltspaceVR is by attaching cursor event listeners. 

>Note that currently every mesh is represented in our physics engine as object aligned cuboids, 80% the size of a full bounding box (basically a stretched cube that contains most of the object). This means that the cursor will not precisely collide with your meshes, and that signifigantly concave objects (buckets, etc) will block contained objects from being clicked on.

* `mesh.addEventListener('cursorup' / 'cursordown', callback);`  
 listen for cursor events on a specific mesh.  

  >These events will bubble up the three.js hierarchy. `stopPropagation` and `stopImmediatePropagation` are supported and work similarly to DOM events
* `scene.addEventListner('cursormove', callback)`  
 listen for cursor move events

#### Enclosure Properties

* `altspace.getEnclosure().then(callback)`  
 returns a promise that will fufill with a description of the enclosure, including its size and `pixelsPerMeter` which can be used as a coefficient to maintain static sizes for objects regardless of the scale of the enclosure.  

#### User Data

* `altspace.getUser().then(callback)`  
 returns a promise that will fufill with information about the local user

#### Tracking Skeleton

* `altspace.getThreeJSTrackingSkeleton().then(callback)`  
 returns a promise that will fufill with a three.js object hierarchy with each object representing a joint in the unified tracking skeleton. These object's transforms will be automatically updated by AltspaceVR, so feel free to query them for position or add objects as children. **Make sure to add the skeleton to your scene after receiving it**

## Debugger

The Debugger is essentially a remote Chrome inspector for AltspaceVR browsers.  

**[OSX Debugger](http://sdk.altvr.com/debugger/DebuggerMacOSX.zip) - [Windows Debugger](http://sdk.altvr.com/debugger/DebuggerWindows.zip)**   
> Note that you cannot rename the OSX Debugger from Debugger.app after you extract it, or it won’t run due to legacy .app bundle structure — it needs an Info.plist with metadata.  

## Three.js Feature Support
Altspace supports Three.js r69 to r73. r73 is recommended.

**Currently supported:**
* Object3D transformation and hierarchy
* Most Geometries
* MeshBasicMaterial map and color properties

**Not currently supported:**
* Three.js r74
* Lighting, custom shaders, screen space effects.
* Texture wrap, filter, format, anisotropy, repeat, offset, flip
* Using GIF images for textures
* VideoTexture
* Material opacity, transparency, blending, side
* Wireframes
* Face and vertex colors
* Other material types including LineBasicMateral/MeshFaceMaterial/MultiMaterial
* Line Geometries
* Quad faces
* Dynamic meshes, skinned meshes
* Geometries with more than 65,000 vertices (Note: Calculated as &lt;number of faces&gt; * 3)

**Habits of Successful AltspaceVR Web Apps:**
* If you're loading a texture from a URL, make sure its dimenstions are a power-of-two for improved performance.
* Mind your texture sizes. Large textures can cause frame locking in the client.
* If your app requires many different textures and geometries, add them to a scene incrementally.
* Use Object3D transforms (position, rotation, scale) for animation rather than skinned meshes.
* Get user input via AltspaceVR cursor events or the tracking skeleton rather than from the keyboard.
* Limit the number of objects per scene and polygons per object.
* Bake ambient occlusion and other lighting into your models. All models currently render as unlit.  

**Known Issues:**
* Object visibility does not propagate to child objects in the scene graph. 
  You can work around this by recursively setting the visibility on an object and its children.

## Browser Feature Support
Altspace's browser is based on Chromium version 28.

**Currently supported:**
* Libre audio and video codecs (ogg, webm)

**Not currently supported:**
* Proprietary audio and video codecs (h.264, mp4, mp3)
* WebRTC
* ES6

[three.js]: http://threejs.org/

[Wiki]: https://github.com/AltspaceVR/AltspaceSDK/wiki
[Developer Answers]: http://answers.altvr.com
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
[Hemisphere Light]: http://threejs.org/examples/#webgl_lights_hemisphere "Flying bird, with a dynamic shadow and toggleable lighting."
[Material Reflection]: http://threejs.org/examples/#webgl_materials_cars_camaro "Car with a reflective material that can change color."
[Point Cloud]: http://threejs.org/examples/#webgl_particles_dynamic "People made of particles that fall to the ground then reconstruct."
[Three.js Scene]: http://threejs.org/examples/#webgl_loader_scene "Scene with eclectic objects exported from Three.js then imported back."
[Ocean Shader]: http://threejs.org/examples/#webgl_shaders_ocean "Sphere submerging into an ocean rendered with a custom WebGL shader."

[Live Coding Tutorial]: https://www.youtube.com/watch?v=R47GvXmvmec
[AltspaceVR looking for SDK Collaborators]: https://www.youtube.com/watch?v=dk8i5or4PJI

---

[![dev dependency status](https://david-dm.org/AltspaceVR/AltspaceSDK/dev-status.svg)](https://david-dm.org/AltspaceVR/AltspaceSDK/#info=devDependencies)
