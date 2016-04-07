//Change color of an object when cursor hovers over it.
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * Changes the color of an object when cursor hovers over it.
 * @class HoverColor
 * @param {Object} [config] Optional parameters.
 * @param {String} [config.event='cursorenter'] Specify the name of event which
 *  triggers the color change.  Default is 'cursorenter' for a hover effect.
 * @param {THREE.Color} [config.color=THREE.Color('yellow')] A THREE.Color value that will be applied to the object's
 *  material.
 * @memberof module:altspace/utilities/behaviors
 */
altspace.utilities.behaviors.HoverColor = function(config){

	config = config || {};

	//Default is to trigger color change on cursorenter/cursorleave events,
	//also support triggering on cursordown/cursorup events.
	if (config.event === undefined) config.event = 'cursorenter';
	if (config.event !== 'cursorenter' && config.event !== 'cursordown') {
		throw Error('Expected config.event "cursorenter" or "cursordown"');
	}
	if (config.color === undefined) config.color = new THREE.Color('yellow');

	var object3d;
	var cursordownObject;
	var cursorenterObject;
	var scene;


	function awake(o, s) {
		object3d = o;
		scene = s;
		object3d.addEventListener('cursordown', cursordown);
		scene.addEventListener('cursorup', cursorupScene);
		if (config.event === 'cursorenter') {
			object3d.addEventListener('cursorenter', cursorenter);
			object3d.addEventListener('cursorleave', cursorleave);
		}
	}

	function cursordown(event){
		cursordownObject = object3d;
		if (config.event === 'cursordown' ){
			setColor(cursordownObject);
		}
	}

	function cursorenter(event){
		//ignore hover events if a different object is selected,
		//for example during a drag we don't want to change highlight
		if (cursordownObject && cursordownObject !== object3d){
			return;
		} 
		if (cursorenterObject){
			unsetcolor(cursorenterObject);
		}
		cursorenterObject = object3d;
		setColor(object3d);
	}

	function cursorleave(event){
		if (cursorenterObject === object3d){
			cursorenterObject = null;
			unsetColor(object3d);
		}
	}

	function cursorupScene(event){
		if (config.event === 'cursordown' && cursordownObject ){
			unsetColor(cursordownObject);
		}
		cursordownObject = null;
	}

	function setColor(o){
		if (o.material && o.material.color){
			o.userData.origColor = o.material.color;
			o.material.color = config.color;  
			//Not strictly needed but seems to make updating faster in Altspace.
			if (o.material) o.material.needsUpdate = true;
		} 
		for (var i = 0; i < o.children.length; i++){
			setColor(o.children[i], config.color);//recursively apply to children
		}
	}

	function unsetColor(o){
		if (o.material && o.material.color){
			if (!o.userData.origColor){
				console.error('Cannot unsetColor, no userData.origColor for object', o);
				return;
			}
			o.material.color = o.userData.origColor;
			if (o.material) o.material.needsUpdate = true;
		} 
		for (var i = 0; i < o.children.length; i++){
			unsetColor(o.children[i]);
		}
	}

	return {
		awake: awake,
		//no update method, event-driven
	};

};
