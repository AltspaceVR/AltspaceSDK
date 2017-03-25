'use strict';

/**
* Stubs out the A-Frame "system" concept.
* @see {@link https://aframe.io/docs/0.3.0/core/systems.html}
* @memberof module:altspace/components
*/
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

/**
* Stubs out the A-Frame "component" concept.
* @see {@link https://aframe.io/docs/0.3.0/core/component.html}
* @extends module:altspace/components.AFrameSystem
* @memberof module:altspace/components
*/
class AFrameComponent extends AFrameSystem
{
	update(oldData){ }
	remove(){ }
	updateSchema(data){ }
}

class AFrameNode
{
	attachedCallback(){ }
	attributeChangedCallback(){ }
	createdCallback(){ }
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

function toDefinition(cls)
{
	let proto = cls.prototype;
	let ret = {};
	Object.keys(proto).forEach(function (key) {
		ret[key] = { value: proto[key] };
	});
	return ret;
}

function registerComponentClass(name, cls)
{
	AFRAME.registerComponent(name, flatten(new cls()));
}

function registerSystemClass(name, cls)
{
	AFRAME.registerSystem(name, flatten(new cls()));
}

function registerElementClass(name, cls)
{
	AFRAME.registerElement(name, {prototype: 
		Object.create(AFRAME.ANode.prototype, toDefinition(cls))
	});
}

export { AFrameComponent, AFrameSystem, AFrameNode, registerComponentClass, registerSystemClass, registerElementClass, flatten };
