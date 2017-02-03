'use strict';

/**
* Base class for all behaviors.
* @memberof module:altspace/utilities/behaviors
* @prop {string} type=Behavior - The name of this class
*/
class Behavior
{
	constructor(){}

	get type(){ return 'Behavior'; }

	/**
	* Called when the behavior is attached to an object. Any setup that requires
	* the object should be done here, e.g. adding event listeners.
	* @param {Object3D} obj - The new parent object
	* @param {Scene} scene - The scene the object is a member of
	*/
	awake(obj, scene){}

	/**
	* Called when the behavior is ready to start. This is guaranteed to run after
	* all behaviors are awake. Any setup that requires interdependence on other
	* behaviors or objects should be done here.
	*/
	start(){}

	/**
	* Called every frame after awake/start. Run anything that needs to happen over
	* time here, e.g. animations.
	* @param {integer} deltaTime - The number of milliseconds elapsed since the
	* last update
	*/
	update(deltaTime){}

	/**
	* Called when the behavior is removed from its object. Clean up your event
	* handlers, etc. here.
	* @param {Object3D} obj - The object this behavior was once attached to
	*/
	dispose(obj){}
}

export default Behavior;
