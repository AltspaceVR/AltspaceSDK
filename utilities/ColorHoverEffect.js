//Change color of an object when cursor hovers over it.
window.altspace.utilities.ColorHoverEffect = function(){

  var hoverColor;
  var hoverObject;
  var cursordownObject;
  var TRACE;

  function init(myHoverColor, params){
    hoverColor = myHoverColor;
    if (myHoverColor && ! (myHoverColor instanceof THREE.Color)){
      throw new Error('Color should be instance of THREE.Color', p.color);
    }
    var p = params || {};
    TRACE = p.TRACE || null; 
  }

  function cursordown(object){
    if (TRACE) console.log('setting cursordownObject', object);
    cursordownObject = object;
  }

  function cursorenter(object){
    //Ignore hover events if a different object is selected,
    //for example during a drag we don't want to change highlight
    if (cursordownObject && cursordownObject !== object){
      if (TRACE) console.log('Ignore hover, other object selected', cursordownObject);
      return;
    } 
    if (hoverObject){
      unhoverEffect(hoverObject);
    }
    hoverEffect(object);
  }

  function cursorleave(object){
    if (hoverObject === object){
      unhoverEffect(object);
    }
  }

  function cursorupScene(object){
    if (TRACE) console.log('clearning cursordownObject', object);
    cursordownObject = null;

  }

  function hoverEffect(object){
    hoverObject = object;
    setHoverColor(object, hoverColor);
    if (TRACE) console.log('hoverEffect', object);
  }

  function unhoverEffect(object){
    hoverObject = null;
    unsetHoverColor(object);
    if (TRACE) console.log('unhoverEffect', object);
  }

  function setHoverColor(obj, hoverColor){
    if (obj.material && obj.material.color){
      obj.userData.origColor = obj.material.color;
      obj.material.color = hoverColor;  
      //Not strictly needed but seems to make updating faster in Altspace.
      if (obj.material) obj.material.needsUpdate = true;
    } 
    for (var i = 0; i < obj.children.length; i++){
      setHoverColor(obj.children[i], hoverColor);//recursively apply to children
    }
  }

  function unsetHoverColor(obj){
    if (obj.material && obj.material.color){
      if (!obj.userData.origColor){
        console.error('Cannot unsetHoverColor, no userData.origColor for object', obj);
        return;
      }
      obj.material.color = obj.userData.origColor;
      if (obj.material) obj.material.needsUpdate = true;
    } 
    for (var i = 0; i < obj.children.length; i++){
      unsetHoverColor(obj.children[i]);
    }
  }

    return {
    init: init,
    cursordown: cursordown,
    cursorenter: cursorenter,
    cursorleave: cursorleave,
    cursorupScene: cursorupScene,
  };

};
