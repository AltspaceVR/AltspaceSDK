// Dispatch cursor events to effects registered with this class.
window.altspace.utilities.CursorEffects = (function(){

  var scene;
  var TRACE;
  var objectEffects = {};//objectEffects[object.uuid] = [effect1, effect2, ...]
  var effects = [];//flat list of all effects

  function init(myScene, params){
    scene = myScene;
    scene.addEventListener("cursordown", dispatchEffectsToScene);
    scene.addEventListener("cursorup", dispatchEffectsToScene);
    scene.addEventListener("cursorenter", dispatchEffectsToScene);
    scene.addEventListener("cursorleave", dispatchEffectsToScene);
    scene.addEventListener("cursormove", dispatchEffectsToScene);
    var p = params || {};
    TRACE = p.TRACE;
  }

  function add(effect, object){
    if (!object || !effect){
      throw new Error("AddEffect requires a valid effect and object", effect, object);
    }
    if (!objectEffects[object.uuid]){
      objectEffects[object.uuid] = [];    
      object.addEventListener("cursordown", dispatchEffectsToObject);
      object.addEventListener("cursorup", dispatchEffectsToObject);
      object.addEventListener("cursorenter", dispatchEffectsToObject);
      object.addEventListener("cursorleave", dispatchEffectsToObject);
    }
    if (effects.indexOf(effect) === -1){
      effects.push(effect);
    }
    objectEffects[object.uuid].push(effect);
  }

  function dispatchEffectsToScene (event){
    if (event.currentTarget !== scene){
      console.error("Expected target of 'scene' for event", event);
      return;
    } 
    if (TRACE) console.log(event.type, event);
    var functionName = event.type + "Scene";
    for (var i=0; i < effects.length; i++){
      var effect = effects[i];
      var effectCallback = null;
      if (effect[functionName]){
        effectCallback = effect[functionName].bind(effect);
        effectCallback(event);
      }
    }
  }

  function dispatchEffectsToObject(event){
    if (TRACE) console.log(event.type, event);
    var target = event.currentTarget;
    if (!target || !objectEffects[target.uuid]){
      console.error("Unexpected target object for event", event);
      return;
    }
    var effects = objectEffects[target.uuid];
    var functionName = event.type;
    for (var i=0; i < effects.length; i++){
      var effect = effects[i];
      var effectCallback = null;
      if (effect[functionName]){
        effectCallback = effect[functionName].bind(effect);
        effectCallback(target, event);
      }
    }
  }

  return {
    init: init,
    add: add,
  };

}());

