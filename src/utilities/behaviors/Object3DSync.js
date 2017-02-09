'use strict';

import Behavior from './Behavior';

// deep object comparison
function isEqual(a, b)
{
	// objects are directly equal
	if(a === b){
		return true;
	}
	// recurse for each pair of array items
	else if( Array.isArray(a) && Array.isArray(b) && a.length === b.length ){
		return a.every( (v,i) => isEqual(a[i], b[i]) );
	}
	// recurse for every key/val pair in objects
	else if( a instanceof Object && b instanceof Object
		&& isEqual(Object.keys(a).sort(), Object.keys(b).sort()) )
	{
		for(let k in a){
			if( !isEqual(a[k], b[k]) )
				return false;
		}
		return true;
	}
	else {
		return false;
	}
}

/**
* The Object3DSync behavior syncs an object's transform and data.
* **Note:** Object3DSync must be used in conjunction with
* [SceneSync]{@link module:altspace/utilities/behaviors.SceneSync}
*
* @param {Object} [config]
* @param {Boolean} [config.position=false] Whether object's position should
*  be synced
* @param {Boolean} [config.rotation=false] Whether object's rotation should
*  be synced
* @param {Boolean} [config.scale=false] Whether object's scale should
*  be synced
* @param {Boolean} [config.auto=false] Whether the object should be synced
*  automatically. Not currently recommended.
* @param {Boolean} [config.world=false] Whether world coordiantes should
*  be sent when synchronizing position and rotation, instead of the
*  transformation relative to the object's parent.  Use if synced object
*  is a child (e.g. of the tracking skeleton) only in the sender scene.
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
**/
class Object3DSync extends Behavior
{
	get type(){ return 'Object3DSync'; }

	constructor(config)
	{
		this.config = Object.assign(
			{position: false, rotation: false, scale: false, auto: false, world: false},
			config
		);

		this.object3d = null;
		this.scene = null;
		this.ref = null;
		this.key = null;
		this.dataRef = null;
		this.ownerRef = null;
		this.transformRef = null;

		this.sceneSync = null;
		this.isMine = false;

		this.position = new THREE.Vector3();
		this.quaternion = new THREE.Quaternion();
		this.scale = new THREE.Vector3();
	}

	awake(o, s)
	{
		this.object3d = o;
		this.scene = s;

		this.setupReceive();
	}

	//TODO: lerp
	setupReceive()
	{
		this.transformRef.on('value', (snapshot =>
		{
			let value = snapshot.val();

			if( !this.isMine && value )
			{
				if (this.config.position) {
					this.object3d.position.set(value.position.x, value.position.y, value.position.z);
				}
				if (this.config.rotation) {
					this.object3d.quaternion.set(value.quaternion.x, value.quaternion.y, value.quaternion.z, value.quaternion.w);
				}
				if (this.config.scale) {
					this.object3d.scale.set(value.scale.x, value.scale.y, value.scale.z);
				}
			}
		}).bind(this));

		this.ownerRef.on('value', (snapshot => {
			let newOwnerId = snapshot.val();
			if (newOwnerId === this.sceneSync.clientId && !this.isMine)
			{
				/**
				* Fired when a synced object's ownership is transferred to the local client.
				* @event ownershipgained
				* @memberof module:altspace/utilities/behaviors.Object3DSync
				*/
				this.object3d.dispatchEvent({ type: 'ownershipgained' });
			}

			if (newOwnerId !== this.sceneSync.clientId && this.isMine)
			{
				/**
				* Fired when a synced object's ownership is transferred to someone else.
				* @event ownershiplost
				* @memberof module:altspace/utilities/behaviors.Object3DSync
				*/
				this.object3d.dispatchEvent({ type: 'ownershiplost' });
			}

			this.isMine = newOwnerId === this.sceneSync.clientId;
		}).bind(this));
	}

	link(objectRef, sS)
	{
		this.ref = objectRef;
		this.key = this.ref.key();
		this.transformRef = this.ref.child('batch');
		this.dataRef = this.ref.child('data');
		this.ownerRef = this.ref.child('owner');
		this.sceneSync = sS;
	}

	autoSend()
	{
		if (!this.isMine)
			return;

		let transform = {};
		if (this.config.world) {
			this.object3d.updateMatrixWorld();//call before sending to avoid being a frame behind
			this.object3d.matrixWorld.decompose(this.position, this.quaternion, this.scale);
		} else {
			this.position = this.object3d.position;
			this.quaternion = this.object3d.quaternion;
			this.scale = this.object3d.scale;
		}
		if (this.config.position) {
			transform.position = {
				x: this.position.x,
				y: this.position.y,
				z: this.position.z
			};
		}
		if (this.config.rotation) {
			transform.quaternion = {
				x: this.quaternion.x,
				y: this.quaternion.y,
				z: this.quaternion.z,
				w: this.quaternion.w
			};
		}
		if (this.config.scale) {
			transform.scale = {
				x: this.scale.x,
				y: this.scale.y,
				z: this.scale.z
			};
		}
		if (Object.keys(transform).length > 0) {
			if (isEqual(transform, this.lastTransform)) { return; }
			this.transformRef.set(transform);
			this.lastTransform = transform;
		}
	}

	/**
	* Take ownership of this object. The client that instantiates an object owns it,
	* afterwards changes in ownership must be managed by the app. Manual modifications
	* to the Firebase ref's will not obey ownership status.
	* @instance
	* @method takeOwnership
	* @memberof module:altspace/utilities/behaviors.Object3DSync
	*/
	takeOwnership() {
		this.ownerRef.set(this.sceneSync.clientId);
	}

	/**
	* Firebase reference for the 'data' child location, can be used to store data related to
	* this object.
	* @readonly
	* @instance
	* @member {Firebase} dataRef
	* @memberof module:altspace/utilities/behaviors.Object3DSync
	*/

	/**
	* True if this object is currently owned by this client, false otherwise.
	* @readonly
	* @instance
	* @member {boolean} isMine
	* @memberof module:altspace/utilities/behaviors.Object3DSync
	*/
}

export default Object3DSync;
