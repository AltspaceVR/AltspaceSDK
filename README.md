## aframe-altspace-component

Component to make an [A-Frame](https://aframe.io) scene compatible with [AltspaceVR](http://altvr.com). When loading your scene in Altspace, the Altspace Render is used instead of the WebGLRender. Behavior outside of Altspace is not affected.

Live examples: http://altspacevr.github.io/aframe/examples/ (forked from [aframevr/aframe](https://github.com/aframevr/aframe))

Note that when running in Altspace, the scene will not respond to cursor events nor be synchronized between users.  In addition, the following A-Frame features are currently not supported in Altspace: lights, transparency, and video.  For details, see the [Three.js Feature Support](http://github.com/AltspaceVR/AltspaceSDK#threejs-feature-support) section in the [AltspaceSDK](http://github.com/AltspaceVR/AltspaceSDK) repo. 

### Properties

| Property  | Description | Default Value |
| --------  | ----------- | ------------- |
| autoscale | Scale scene when running in Altspace, so 1 unit is 1 meter in-game. | true |

### Usage
Add the "altspace" parameter on your `<a-scene>` like so: `<a-scene altspace="autoscale:true">`


#### Example

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.2.0/aframe.min.js"></script>
  <script src="https://cdn.rawgit.com/AltspaceVR/aframe-altspace-component/v0.1.0/dist/aframe-altspace-component.min.js"></script>
</head>

<body>
  <a-scene altspace="autoscale:true">
    <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
  </a-scene>
</body>
```
