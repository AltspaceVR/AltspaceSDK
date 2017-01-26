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
		ret = Object.assign( {schema: {}, dependencies: []}, obj );
	}
	else {
		ret = Object.assign( flatten(obj.prototype), obj );
	}

	if(obj.schema)
		Object.assign(ret.schema, obj.schema);
		
	if(obj.dependencies)
		ret.dependencies.push(...obj.dependencies);

	return ret;
}

function registerComponent(name, cls)
{
	AFRAME.registerComponent(name, flatten(cls));
}

export { AFrameComponent, registerComponent };
