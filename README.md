## aframe-altspace-component

When it comes to building something quick in AltspaceVR, it’s hard to beat [A-Frame](https://aframe.io/). It has a simple HTML-based syntax, so anyone acquainted with web development will pick it up in no time. On the other hand, if you don’t know what an HTML tag is, or how to add an image to a page, you should go through MDN’s terrific [Introduction to HTML](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Introduction) before you continue.

The world is full of web developers though, so if you feel comfortable experimenting on your own, you should jump right in with the [A-Frame Documentation](https://aframe.io/docs/0.3.0/introduction/). You just need to add the `altspace` component to your `<a-scene>` tag. Keep in mind though that development in AltspaceVR has a few [caveats](https://github.com/altspacevr/altspacesdk#threejs-feature-support).

In either case, you should join the [AltspaceVR SDK Slack channel](https://altspacevrsdk.slack.com/) ([register here](https://altspacevr-slackin.herokuapp.com/))! We love to see what you’re working on, and are always happy to answer questions. In addition, there are special activities available only for developers that may be better for apps. Just request developer status on Slack, and we’ll hook you up!

## Quick Start

This is a fully functional example of what A-Frame code looks like.

```html
<!DOCTYPE html>
<html><head>
<script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/AltspaceVR/aframe-altspace-component/v0.3.0/dist/aframe-altspace-component.min.js"></script>
<script>

// an example custom component, that will change the color when clicked
AFRAME.registerComponent('color-cycle', {
    schema: {},
    init: function(){
        var self = this;
        self.el.object3D.addEventListener('cursorup', function(){
            var rgb = [
                Math.floor(Math.random()*256),
                Math.floor(Math.random()*256),
                Math.floor(Math.random()*256)
            ];
            self.el.setAttribute('color', 'rgb('+rgb.join(',')+')');
        });
    }
});

</script>
</head>
<body>

<!-- set up the scene -->
<a-scene altspace='vertical-align: bottom;'>
    <a-box position='0 1 0' color-cycle></a-box>
</a-scene>

</body></html>
```

## Resources
