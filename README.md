## aframe-altspace-component

Component to make an [A-Frame](https://aframe.io) scene compatible with [AltspaceVR](http://altvr.com). When loading your scene in Altspace, the Altspace Render is used instead of the WebGLRender. Behavior outside of Altspace is not affected.  For more info on building VR Web Apps for Altspace, see the [AltspaceSDK](http://github.com/AltspaceVR/AltspaceSDK) repo and the [developer portal](http://developer.altvr.com).

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
  <script src="https://rawgit.com/AltspaceVR/aframe-altspace-component/master/dist/aframe-altspace-component.min.js"></script>
</head>

<body>
  <a-scene altspace="autoscale:true">
    <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
  </a-scene>
</body>
```

#### NPM Installation

Install via NPM:

```bash
npm install aframe-altspace-component
```

Then register and use.

```js
require('aframe');
require('aframe-altspace-component');
```
