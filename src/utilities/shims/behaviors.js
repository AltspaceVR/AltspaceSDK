/**
 * @author gavanwilhite / http://gavanwilhite.com
 */

/**
 * The AltspaceDK includes a Behaviors shim that adds Behavior capabilities to 
 * Three.js.
 * It adds methods to Three.js' Scene and Object3D classes which allow you to 
 * add, remove, retrieve and use Behaviors.
 *
 * @namespace THREE
 */

/**
 * The AltspaceSDK adds Behavior capabilites to Three.js' Scene class.
 * @class Scene
 * @memberof THREE
 */

/**
 * Update the behaviors of all the objects in this Scene.
 * @instance
 * @method updateAllBehaviors 
 * @memberof THREE.Scene
 */
THREE.Scene.prototype.updateAllBehaviors = function () {

    var now = performance.now();
    var lastNow = this.__lastNow || now;

    var deltaTime = now - lastNow;

    this.traverse(function (object3d) {

        if (object3d.__behaviorList) {
            object3d.updateBehaviors(deltaTime, this);
        }

    });

    this.__lastNow = now;

}

/**
 * The AltspaceSDK adds Behavior capabilites to Three.js' Object3D class.
 * @class Object3D
 * @memberof THREE
 */

/**
 * Adds the given behavior to this object.
 * @instance
 * @method addBehavior 
 * @param {Behavior} behavior Behavior to add.
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.addBehavior = function()
{
    this.__behaviorList = this.__behaviorList || [];
    Array.prototype.push.apply(this.__behaviorList, arguments);
}

/**
 * Adds the given behaviors to this object.
 * @instance
 * @method addBehaviors
 * @param {...Behavior} behavior Behavior to add.
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.addBehaviors = function()
{
    this.__behaviorList = this.__behaviorList || [];
    Array.prototype.push.apply(this.__behaviorList, arguments);
}

/**
 * Removes the given behavior from this object. The behavior is disposed if
 * possible.
 * @instance
 * @method removeBehavior 
 * @param {...Behavior} behavior Behavior to remove.
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.removeBehavior = function(behavior)
{
    var i = this.__behaviorList.indexOf(behavior);
    if (i !== -1) {
        this.__behaviorList.splice(i, 1);
        try {

            if (behavior.dispose) behavior.dispose.call(behavior, this);

        } catch (e) {

            (console.error || console.log).call(console, e.stack || e);

        }
    }
}

/**
 * Removes all behaviors from this object. The behaviors are disposed if
 * possible.
 * @instance
 * @method removeAllBehaviors
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.removeAllBehaviors = function ()
{
    if (!this.__behaviorList || this.__behaviorList.length === 0) return null;

    for (var i = 0, max = this.__behaviorList.length; i < max; i++) {
        var behavior = this.__behaviorList[i];

        try {

            if (behavior.dispose) behavior.dispose.call(behavior, this);

        } catch (e) {

            (console.error || console.log).call(console, e.stack || e);

        }
    }
}

/**
 * Retrieve a behavior by type.
 * @instance
 * @method getBehaviorByType
 * @param {String} type 
 * @returns {Behavior}
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.getBehaviorByType = function(type) {
    if (!this.__behaviorList || this.__behaviorList.length === 0) return null;

    for (var i = 0, max = this.__behaviorList.length; i < max; i++) {
        if (this.__behaviorList[i].type === type)
            return this.__behaviorList[i];
    }
}

/**
 * Update behaviors on this object.
 * @instance
 * @method updateBehaviors
 * @param {Number} deltaTime Elapsed time in milliseconds
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.updateBehaviors = function(deltaTime) {

    if (!this.__behaviorList || this.__behaviorList.length === 0) return;

    var toInit = [];
    var toUpdate = this.__behaviorList.slice(); // prevent mutation of the behavior list during this loop

    for (var i = 0, max = this.__behaviorList.length; i < max; i++) {

        var behavior = this.__behaviorList[i];
        if (!behavior.__isInitialized) toInit.push(behavior);

    }

    //Awake
    for (var i = 0, max = toInit.length; i < max; i++) {

        var behavior = toInit[i];
        try {

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


