//Change color of an object when cursor hovers over it.
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};


altspace.utilities.behaviors.HoverColor = function(config){

  config = config || {};

  if (config.scene === undefined) throw Error('Must pass config.scene');//TODO: better way to get the scene
  if (config.color === undefined) config.color = new THREE.Color('yellow');
  if (config.TRACE === undefined) config.TRACE = false;

  var object3d;
  var cursordownObject;
  var hoverObject;
  var hoverColor = config.color;
  var TRACE = config.TRACE;


  function awake(o) {
    object3d = o;
    object3d.addEventListener("cursordown", cursordown);
    object3d.addEventListener("cursorenter", cursorenter);
    object3d.addEventListener("cursorleave", cursorleave);
    config.scene.addEventListener("cursorup", cursorupScene);
  }

  function cursordown(event){
    if (TRACE) console.log('setting cursordownObject', object3d);
    cursordownObject = object3d;
  }

  function cursorenter(event){
    //Ignore hover events if a different object is selected,
    //for example during a drag we don't want to change highlight
    if (cursordownObject && cursordownObject !== object3d){
      if (TRACE) console.log('Ignore hover, other object selected', cursordownObject);
      return;
    } 
    if (hoverObject){
      unhoverEffect(hoverObject);
    }
    hoverEffect(object3d);
  }

  function cursorleave(event){
    if (hoverObject === object3d){
      unhoverEffect(object3d);
    }
  }

  function cursorupScene(event){
    if (TRACE) console.log('clearning cursordownObject', cursordownObject);
    cursordownObject = null;

  }

  function hoverEffect(o){
    hoverObject = o;
    setHoverColor(o, hoverColor);
    if (TRACE) console.log('hoverEffect', o);
  }

  function unhoverEffect(o){
    hoverObject = null;
    unsetHoverColor(o);
    if (TRACE) console.log('unhoverEffect', o);
  }

  function setHoverColor(o, hoverColor){
    if (o.material && o.material.color){
      o.userData.origColor = o.material.color;
      o.material.color = hoverColor;  
      //Not strictly needed but seems to make updating faster in Altspace.
      if (o.material) o.material.needsUpdate = true;
    } 
    for (var i = 0; i < o.children.length; i++){
      setHoverColor(o.children[i], hoverColor);//recursively apply to children
    }
  }

  function unsetHoverColor(o){
    if (o.material && o.material.color){
      if (!o.userData.origColor){
        console.error('Cannot unsetHoverColor, no userData.origColor for object', o);
        return;
      }
      o.material.color = o.userData.origColor;
      if (o.material) o.material.needsUpdate = true;
    } 
    for (var i = 0; i < o.children.length; i++){
      unsetHoverColor(o.children[i]);
    }
  }

  function update(){}

  return {
    awake: awake,
    //no update method, event-driven
  };

};
