The code is bundled up using Webpack and a dev server is provided for previewing the app. Run the following to spin it up:

```
> npm install
> npm start
```

Note that you may see the warning:

```
WARNING in ./~/altspace/dist/altspace.js
Critical dependencies:
2777:113-120 This seems to be a pre-built javascript file. Though this is possible, it's not recommended. Try to require the original source to get better results.
 @ ./~/altspace/dist/altspace.js 2777:113-120
```

This is expected due to the way altspace is published to npm and will be fixed in the future.
