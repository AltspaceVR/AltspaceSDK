## aframe-altspace-component

Component to make an [A-Frame](https://aframe.io) scene compatible with [AltspaceVR](http://altvr.com). When loading your scene in Altspace, the Altspace Render is used instead of the WebGLRender. Behavior outside of Altspace is not affected.

Live examples: http://altspacevr.github.io/aframe/examples/ (forked from [aframevr/aframe](https://github.com/aframevr/aframe))

Note that when running in Altspace, the scene will not be synchronized between users.  In addition, some A-Frame features are currently not supported in Altspace, such as lighting and video.  For details, see the [Three.js Feature Support](http://github.com/AltspaceVR/AltspaceSDK#threejs-feature-support) section in the [AltspaceSDK](http://github.com/AltspaceVR/AltspaceSDK) repo.

### Properties

| Property  | Description | Default Value |
| --------  | ----------- | ------------- |
| `usePixelScale` | Treat a unit as a CSS Pixel, and have your scene scale with the scale of the AltspaceVR web browser. This is the default behavior in AltspaceVR for three.js apps. In A-Frame, however, the default value is `false`, as units are in meters by default. | `false`
| `verticalAlign` | Puts the scene origin at the bottom, middle, or top of the Altspace enclosure.  If your scene seems to be floating in midair, try setting this to 'bottom'. | `middle`
| `enclosuresOnly` | Turn off 3d rendering when loaded in flat displays (e.g. personal browsers) | `true`

### Usage

Add the "altspace" attribute on your `<a-scene>` like so: `<a-scene altspace>`

**Note**: If you use the `embedded` A-Frame component on your scene, you must include it *before* the `altspace` component, or your app will silently fail.

#### Example

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://cdn.rawgit.com/AltspaceVR/aframe-altspace-component/v0.3.0/dist/aframe-altspace-component.min.js"></script>
</head>

<body>
  <a-scene altspace>
    <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
  </a-scene>
</body>
```

## altspace-tracked-controls

This library also includes an `altspace-tracked-controls` component that enables tracked control support for A-Frame
applications that use the built-in `tracked-controls`, `vive-controls` or `hand-controls` components.

### Usage

Add the "altspace-tracked-controls" attribute to your tracked entity. For example:

```html
<a-entity hand-controls="right" altspace-tracked-controls></a-entity>
```
