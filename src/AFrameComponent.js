'use strict';

class AFrameComponent
{
	get schema(){
		return null;
	}

	init(){ }
	update(oldData){ }
	remove(){ }
	tick(time, timeDelta){ }
	pause(){ }
	play(){ }
	updateSchema(data){ }

}

function flatten(obj)
{
	let ret = {};
	if(!obj.prototype){
		ret = Object.assign( {schema: {}}, obj );
	}
	else {
		ret = Object.assign( flatten(obj.prototype), obj );
	}

	Object.assign(ret.schema, obj.schema);
	return ret;
}

function registerComponent(name, cls)
{
	AFRAME.registerComponent(name, flatten(cls));
}

export { AFrameComponent, registerComponent };
