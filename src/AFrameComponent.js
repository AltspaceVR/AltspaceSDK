'use strict';

class AFrameSystem
{
	get schema(){
		return null;
	}

	init(){ }
	tick(time, timeDelta){ }
	pause(){ }
	play(){ }
}

class AFrameComponent extends AFrameSystem
{
	update(oldData){ }
	remove(){ }
	updateSchema(data){ }
}

function flatten(obj)
{
	let ret = {};
	if(!obj.__proto__){
		ret = Object.assign( {schema: {}, dependencies: []}, obj );
	}
	else {
		ret = Object.assign( flatten(obj.__proto__), obj );
	}

	if(obj.schema)
		Object.assign(ret.schema, obj.schema);

	if(obj.dependencies)
		ret.dependencies.push(...obj.dependencies);

	return ret;
}

function registerComponentClass(name, cls)
{
	AFRAME.registerComponent(name, flatten(new cls(true)));
}

function registerSystemClass(name, cls)
{
	AFRAME.registerSystem(name, flatten(new cls(true)));
}

export { AFrameComponent, AFrameSystem, registerComponentClass, registerSystemClass, flatten };
