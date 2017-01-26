'use strict';

function flatten(obj)
{
	if(!obj.__proto__){
		return Object.assign( {}, obj );
	}
	else {
		return Object.assign( flatten(obj.__proto__), obj );
	}
}

export default class AFrameComponent
{
	constructor(){
		this.schema = null;
	}

	init(){ }
	update(oldData){ }
	remove(){ }
	tick(time, timeDelta){ }
	pause(){ }
	play(){ }
	updateSchema(data){ }

	register(name)
	{
		AFRAME.registerComponent(name, flatten(this));
	}
}
