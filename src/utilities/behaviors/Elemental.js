window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * A behavior that renders out a three.js scene to DOM elements. This allows for easier debugging via the Chrome inspector.
 * @class Elemental
 * @param {Object} [config]
 */
altspace.utilities.behaviors.Elemental = function (config) {
    config = config || {};

    var object3d;
    var scene;

    var rootEl;

    var elements = {};

    var toElements = {};

    function awake(o, s) {
        object3d = o;
        scene = s;

        rootEl = document.createElement('x-elemental');
        attachRoot();

        setInterval(refresh, 1000);
    }

    function addElement(newO) {
        var el = getToElementFor(newO).call(newO, null);
        elements[newO.uuid] = el;

        var parentEl = newO.parent ? elements[newO.parent.uuid] : rootEl;
        parentEl.appendChild(el);
    }

    function getToElementFor(o) {
        //work for behaviors?
        return o.toElement || toElements[o.type] || defaultToElement;
    }

    toElements['Scene'] = function(previousElement) {
        var el = previousElement || document.createElement('x-scene');
        return el;
    }

    function defaultToElement(previousElement) {
        var el = previousElement || document.createElement('x-object3d');

        /*for (var i = 0, max = this.__behaviorList.length; i < max; i++) {
            var behavior = this.__behaviorList[i];
            el.setAttribute('behavior-' + behavior.type, behavior.type);
        }*/

        var sync = this.getBehaviorByType('Object3DSync');
        if (sync) {
            el.setAttribute('isMine', sync.isMine);
        }

        //todo add behaviors
        //todo check for changes

        function formatNumber(val) {
            var prechar = val > 0 ? '+' : '';
            return prechar + val.toFixed(3);
        }
        el.setAttribute('type', this.type);
        //el.setAttribute('pos-x', formatNumber(this.position.x));
        //el.setAttribute('pos-y', formatNumber(this.position.y));
        //el.setAttribute('pos-z', formatNumber(this.position.z));
        //el.setAttribute('rot-x', formatNumber(this.rotation.x));
        //el.setAttribute('rot-y', formatNumber(this.rotation.y));
        //el.setAttribute('rot-z', formatNumber(this.rotation.z));
        //el.setAttribute('rotation', JSON.stringify(this.rotation, null, '\t'));
        //el.setAttribute('position', JSON.stringify(this.position, null, '\t'));

        var existingPositionEls = el.getElementsByTagName('x-position');
        var positionEl = existingPositionEls[0] || el.appendChild(document.createElement('x-position'));

        if (positionEl.savedPosition) {
            if (!positionEl.savedPosition.equals(this.position)) {
                this.position = positionEl.getAttribute('x');
                this.position = positionEl.getAttribute('y');
                this.position = positionEl.getAttribute('z');
            }
        }
        positionEl.setAttribute('x', formatNumber(this.position.x));
        positionEl.setAttribute('y', formatNumber(this.position.y));
        positionEl.setAttribute('z', formatNumber(this.position.z));

        var existingRotationEls = el.getElementsByTagName('x-rotation');
        var rotationEl = existingRotationEls[0] || el.appendChild(document.createElement('x-rotation'));
        rotationEl.setAttribute('x', formatNumber(this.rotation.x));
        rotationEl.setAttribute('y', formatNumber(this.rotation.y));
        rotationEl.setAttribute('z', formatNumber(this.rotation.z));

        return el;
    }

    function resetRoot() {
        if (rootEl) rootEl.remove();
        rootEl = null;
        rootEl = document.createElement('three-elemental');
    }

    function attachRoot() {
        document.head.insertBefore(rootEl, document.head.firstChild);
    }

    function update(deltaTime) {
    }

    function refresh() {
        //resetRoot();
        scene.traverse(function (o) {
            if (elements[o.uuid]) {
                var toElement = getToElementFor(o);
                toElement.call(o, elements[o.uuid]);
            } else {
                addElement(o);
            }
        });
        //TODO: remove
        //attachRoot();
    }

    function start() {
    }

    return { type: 'Elemental', awake: awake, start: start, update: update };
};