//Change color of an object when cursor hovers over it.
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};


altspace.utilities.behaviors.HoverColor = function(config){

  config = config || {};

  if (config.scene === undefined) throw Error('Must pass config.scene');//TODO: better way to get the scene
  //Default is to trigger color change on cursorenter/cursorleave events,
  //also support triggering on cursordown/cursorup events.
  if (config.event === undefined) config.event = 'cursorenter';
  if (config.event !== 'cursorenter' && config.event !== 'cursordown') {
    throw Error('Expected config.event "cursorenter" or "cursordown"');
  }
  if (config.color === undefined) config.color = new THREE.Color('yellow');
  if (config.TRACE === undefined) config.TRACE = false;

  var object3d;
  var cursordownObject;
  var cursorenterObject;
  var TRACE = config.TRACE;


  function awake(o) {
    object3d = o;
    object3d.addEventListener('cursordown', cursordown);
    config.scene.addEventListener('cursorup', cursorupScene);
    if (config.event === 'cursorenter') {
      object3d.addEventListener('cursorenter', cursorenter);
      object3d.addEventListener('cursorleave', cursorleave);
    }
  }

  function cursordown(event){
    if (TRACE) console.log('setting cursordownObject', object3d);
    cursordownObject = object3d;
    if (config.event === 'cursordown' ){
      setColor(cursordownObject);
    }
  }

  function cursorenter(event){
    //ignore hover events if a different object is selected,
    //for example during a drag we don't want to change highlight
    if (cursordownObject && cursordownObject !== object3d){
      if (trace) console.log('ignore hover, other object selected', cursordownObject);
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
    if (TRACE) console.log('clearning cursordownObject', cursordownObject);
    if (config.event === 'cursordown' && cursordownObject ){
      unsetColor(cursordownObject);
    }
    cursordownObject = null;
  }

  function setColor(o){
    if (TRACE) console.log('setColor', o);
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
    if (TRACE) console.log('unsetColor', o);
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
