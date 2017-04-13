'use strict';

/**
* Altspace-specific properties associated with an [Object3D]{@link THREE.Object3D} instance via the
* [userData.altspace]{@link THREE.Object3D#userData} property.
* @typedef {Object} THREE.Object3D~AltspaceFlags
* @property {Object} collider Properties for the collider (hitbox) associated with the Object3D
* @property {Boolean} [collider.enabled=true] If set to false, the Altspace cursor will not collide with this
*	object.
*/

/**
* User data for this Object3D instance. If `userData` has an `altspace` property, it will be used to set extra
* properties on the object that are used by the Altspace renderer.
* @instance
* @member {Object} userData
* @property {THREE.Object3D~AltspaceFlags} altspace Altspace-specific properties
* associated with this object.
* @memberof THREE.Object3D
*/


/**
* True if the app is running inside AltspaceVR.
* @member {Boolean} inClient
* @memberof module:altspace
*/
