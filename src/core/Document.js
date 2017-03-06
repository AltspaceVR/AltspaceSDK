/**
* Get a three.js object that represents the visible 2D DOM content of an enclosure.
* Returns a promise that resolves with a [Document]{@link module:altspace~Document}
* object.
* @method getDocument
* @returns {Promise}
* @memberof module:altspace
*/

/**
* Represents the 2D content in an enclosure. Document should
* not be instantiated directly, instead it should be retrieved
* via [altspace.getDocument]{@link module:altspace.getDocument}.
* @class module:altspace~Document
* @memberof module:altspace
* @extends {THREE.Mesh}
*/

/**
* Reset the document to its default position regardless of the scene transform.
* Called by default when the document is initally retrieved.
* @instance
* @method reset
* @memberof module:altspace~Document
*/
