/**
 * @author gavanwilhite / http://gavanwilhite.com
 */

THREE.Scene.prototype.updateBehaviors = function () {

    var now = performance.now();
    var lastNow = this.__lastNow || now;

    var deltaTime = now - lastNow;

    var self = this;
    this.traverse(function (object3d) {

        if (object3d === self) return;

        if (object3d.behaviors) {
            object3d.behaviors.update.call(object3d, deltaTime);//TODO: See if there is a way to not make this necessary
        }

    });

    this.__lastNow = now;

}

THREE.Object3D.prototype.enableBehaviors = function()
{
    console.log('asdf');
    console.dir(this);
    //this.behaviors = 

    this.behaviors = /**
 * @author gavanwilhite / http://gavanwilhite.com
 */

THREE.Scene.prototype.updateBehaviors = function () {

    var now = performance.now();
    var lastNow = this.__lastNow || now;

    var deltaTime = now - lastNow;

    var self = this;
    this.traverse(function (object3d) {

        if (object3d === self) return;

        if (object3d.behaviors) {
            object3d.behaviors.update.call(object3d, deltaTime);//TODO: See if there is a way to not make this necessary
        }

    });

    this.__lastNow = now;

}

THREE.Object3D.prototype.enableBehaviors = function() {
    var behaviorList = [];

    this.behaviors = (function() {

        function add() {
            console.log('add this: ');
            console.dir(this);
            Array.prototype.push.apply(behaviorList, arguments);
        }

        function remove(behavior) {
            //TODO: call removed function
            var i = array.indexOf(behavior);
            if (i != -1) {
                behaviorList.splice(i, 1);
            }
        }

        function update(deltaTime) {

            if (!behaviorList.length === 0) return;

            var toInit = [];
            var toUpdate = behaviorList.slice(); // prevent mutation of the behavior list during this loop

            for (var i = 0, max = behaviorList.length; i < max; i++) {

                var behavior = behaviorList[i];
                if (!behavior.__isInitialized) toInit.push(behavior);

            }

            //Awake
            for (var i = 0, max = toInit.length; i < max; i++) {

                var behavior = toInit[i];
                try {

                    console.dir(this);
                    if (behavior.awake) behavior.awake.call(behavior, this);

                } catch (e) {

                    (console.error || console.log).call(console, e.stack || e);

                }

            }

            //Start
            for (var i = 0, max = toInit.length; i < max; i++) {

                var behavior = toInit[i];
                try {

                    if (behavior.start) behavior.start.call(behavior);

                } catch (e) {

                    (console.error || console.log).call(console, e.stack || e);

                }
                behavior.__isInitialized = true;

            }

            //Update
            for (var i = 0, max = toUpdate.length; i < max; i++) {

                var behavior = toUpdate[i];
                try {

                    if (behavior.update) behavior.update.call(behavior, deltaTime);

                } catch (e) {

                    (console.error || console.log).call(console, e.stack || e);

                }

            }

        }

        return {
            add: add,
            remove: remove,
            update: update /*, getByType: getByType, getAllByType: getAllByType */
        };
    }).call(this);
}
