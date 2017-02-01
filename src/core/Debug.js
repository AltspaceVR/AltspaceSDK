/**
* Debug information about an object in an app.
* @typedef {Object} module:altspace~ThreeJSDebugInfo
* @property {String} uuid The Three.js UUID for this object.
* @property {Number} vertexCount Number of vertices in this object's
*	geometry.
* @property {Boolean} isVisible If this object is visible in the scene
* @property {Boolean} isMaterialVisible If this object's material is
*	visible.
* @property {Boolean} isCulled If this object has been culled due to it
*	moving out of the app enclosure bounds.
* @property {Object} position The object's position vector.
* @property {Object} quaternion The object's orientation quarternion.
*/

/**
* Retrieves debug information about 3D objects in an app.
* The resulting promise resolves to an array of
* [ThreeJSDebugInfo]{@link module:altspace~ThreeJSDebugInfo} objects.
* @method getThreeJSDebugInfo
* @returns {Promise}
* @memberof module:altspace
*/
