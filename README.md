<!--
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
THIS FILE IS GENERATED FROM README.template.md. EDIT THAT INSTEAD
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-->

# AltspaceVR SDK

## [A-Frame API](https://altspacevr.github.io/AltspaceSDK/doc/aframe/) - [Three.js API](https://altspacevr.github.io/AltspaceSDK/doc/js/)

The AltspaceVR SDK can be used together with [Three.js] or [A-Frame] to create holographic, multi-user web apps for virtual reality. When running inside [AltspaceVR](https://altvr.com/) they can be experienced with consumer VR hardware including the Oculus Rift, HTC Vive, Samsung GearVR, and Google Daydream, as well as in non-VR mode for PC, Mac, and Mobile.

Three.js is an open-source, renderer-agnostic 3D engine written in Javascript. It is used to construct much of the 3D graphics you see on the web, and can be used to create entire applications, or enhance existing webpages with 3D content. A-Frame is a later addition to the 3D Web family, simplifying the process with the use of HTML-style markup to build 3D scenes instead of Javascript.

**If you are brand new to web development** or 3D applications, we recommend you develop with A-Frame, as it's more user-friendly and has more utility built-in. Head over to our [A-Frame API Documentation] for more info on how to get started using A-Frame with AltspaceVR. You should also check out the official reference from [A-Frame].

**If you know what you're doing**, you have your choice between A-Frame and Three.js. Three.js is lower-level than A-Frame, so it is more flexible, but at the cost of additional complexity. If you think this is for you, you should read our [Three.js API Documentation]. You'll also need the upstream [Three.js Reference].

## Resources
- **[Developer Portal] - Tutorials, projects, initiative program, and app submission**
- **The AltspaceVR [SDK Wiki] - User-contributed tips and tricks**
- **[Local Dev Setup] - Instructions for setting up a local dev environment**
- **[App Guidelines] - Suggestions for building apps that work well in Altspace and Gear VR**
- **[Slack] - Chat with other members of the community and AltspaceVR devs.  [Register for Slack](http://altspacevr-slackin.herokuapp.com)**


## altspace.js

`altspace.js` should be included whenever you use the SDK. It contains core utilities and APIs, and is useful both inside and outside of the client.

Many APIs are present in the client without loading `altspace.js`, but please still include it, as this may change in the future.

The version baked into the altspace.js script will determine which version of the entire SDK  the client will provide your app. This means that if we make any breaking internal changes to things like rendering or cursor events, and you are using an older version of `altspace.js`, we will try to return legacy behavior appropriate to your version of `altspace.js`. Versioning will follow [SEMVER](http://semver.org/) as closely as possible. Details for each version can be found in the [Release Notes](https://github.com/AltspaceVR/AltspaceSDK/releases).

**Latest Version: v2.2.0 -- [See Changes](https://github.com/AltspaceVR/AltspaceSDK/releases/tag/v2.2.0)**

Include the latest version of the SDK in your app with:

`<script src="https://sdk.altvr.com/libs/altspace.js/2.2.0/altspace.min.js"></script>`

If you use npm, you can install altspace.js with:

`npm install altspace`

## SDK Feature Overview

- **Holographic rendering** - Display your 3D models in true-to-life size, stand next to them, walk through them, etc.
- <strong>Cursor emulation*</strong> - Receive cursor events on your objects, e.g. `cursordown`, `cursormove`, etc.
- **Synchronization** - Share app state across all clients, store high scores, etc.
- <strong>Environmental data**</strong> - Know the size and relative scale of your app's enclosure, or request access to the entire virtual space.
- **User data** - Know info about who is using your app, including a unique identifier, name, and moderator status. (This data is not stored automatically, but is available upon request.)
- **Avatar tracking skeleton** - Know the position and orientation of your users' heads, hands, etc.
- **Unity native resources (A-Frame only)** - Create proxy objects that let you manipulate native Unity assets, including pre-optimized models, particle effects, colliders, and more.

\* For the purposes of cursor collision, meshes are approximated to be a 4/5 scale of their bounding box. If desired, default cursor collision can be disabled.

\*\* Meshes outside the bounds of the enclosure will be culled unless you request full space access.

## AltspaceVR Debugger

The debugger is essentially a remote Chrome inspector for AltspaceVR browsers. This allows you to view and modify your app in real-time, as well as see any errors that occur.

**[OSX Debugger](http://sdk.altvr.com/debugger/DebuggerMacOSX.zip) - [Windows Debugger](http://sdk.altvr.com/debugger/DebuggerWindows.zip)**
> Note that you cannot rename the OSX Debugger from Debugger.app after you extract it, or it won’t run due to legacy .app bundle structure — it needs an Info.plist with metadata.

## Graphics Feature Support

AltspaceVR supports Three.js versions r73, r74, r76, and r84. r84 is recommended. A-Frame version 0.3.0 is currently the only version supported.

**Currently supported:**
* Object3D transformation and hierarchy
* Most Geometries
* MeshBasicMaterial
* JPEG, PNG, [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage) textures
* Face and vertex colors

**Not currently supported:**
* Lighting, custom shaders, screen space effects.
* Texture filter, format, anisotropy, flip, THREE.MirroredRepeatWrapping.
* Using GIF images for textures
* VideoTexture
* Material blending, depthTest, depthWrite, alphaTest, clippingPlanes
* Other material types including LineBasicMateral, MeshFaceMaterial, MultiMaterial
* Wireframes
* Line Geometries
* Quad/N-Gon faces
* Dynamic meshes, skinned meshes
* Interleaved BufferGeometry attributes
* Geometries with more than 65,000 vertices (Note: Calculated as &lt;number of faces&gt; * 3)

## Habits of Successful AltspaceVR Web Apps

* If you're loading a texture from a URL, make sure its dimensions are a power-of-two for improved performance.
* Mind your texture sizes. Large textures can cause frame locking in the client.
* If your app requires many different textures and geometries, add them to a scene incrementally.
* Use Object3D transforms (position, rotation, scale) for animation rather than skinned meshes.
* Get user input via AltspaceVR cursor events or the tracking skeleton rather than from the keyboard.
* Limit the number of objects per scene and polygons per object.
* Bake ambient occlusion and other lighting into your models. All models currently render as unlit.
* Avoid adding too many transparent objects to your scene. Transparency is GPU-intensive, especially on the Gear VR.

**Known Issues:**
* Object visibility does not propagate to child objects in the scene graph.
  You can work around this by recursively setting the visibility on an object and its children.
* Texture wrap mode is ignored on the `wrapT` property. The value of `wrapS` is used for both axes.

## Browser Feature Support
Altspace's browser is based on Chromium version 40.

**Currently supported:**
* Libre audio and video codecs (ogg, webm)
* ES2015 [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises)

**Not currently supported:**
* Proprietary audio and video codecs (h.264, mp4, mp3)
* WebRTC
* WebVR
* Most features of ES2015
* The `<audio>` media tag
* The `<a>` tag attribute `target`
* The `<iframe>` tag

[Three.js]: http://threejs.org/
[Three.js Reference]: https://threejs.org/docs/
[A-Frame]: https://aframe.io/docs/0.3.0/introduction/

[SDK Wiki]: https://github.com/AltspaceVR/AltspaceSDK/wiki
[GitHub Issues]: https://github.com/AltspaceVR/AltspaceSDK/issues
[Developer Portal]: http://developer.altvr.com
[A-Frame API Documentation]: https://altspacevr.github.io/AltspaceSDK/doc/aframe/
[Three.js API Documentation]: https://altspacevr.github.io/AltspaceSDK/doc/js/
[Local Dev Setup]: https://developer.altvr.com/local-dev/
[App Guidelines]: https://slack-files.com/T0B35FQCT-F0LED1QC9-299cb2300f
[Getting Started]: https://developer.altvr.com/get-started/
[Slack]: https://altspacevrsdk.slack.com

---

[![dev dependency status](https://david-dm.org/AltspaceVR/AltspaceSDK/dev-status.svg)](https://david-dm.org/AltspaceVR/AltspaceSDK/#info=devDependencies)
