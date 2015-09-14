//Implement drag-and-drop of objects in a horizontal plane.
window.altspace.utilities.DragPlaneEffect = function(){
  var dragPlane;
  var hoverObject;
  var dragObject;
  var dragObjectWidth;
  var dragOffset = new THREE.Vector3();
  var raycaster = new THREE.Raycaster();
  var rayOrigin = new THREE.Vector3();
  var rayDirection = new THREE.Vector3();
  var inAltspace = window.altspace && window.altspace.inClient;

  // for debugging
  var orbitControls;
  var dragPointMarker;
  var TRACE;

  function init(myDragPlane, params){
    if (! myDragPlane instanceof THREE.Object3D){
      console.error('dragPlane must be of type Object3D');
      return;
    }
    dragPlane = myDragPlane.clone();//make copy that is NOT added to scene

    var p = params || {};
    TRACE = p.TRACE || null;
    orbitControls = p.orbitControls || null; //Disable during a drag (non-Altspace only).
    //Mark the intersection point when an object is dragged and on hoverOver.
    //Intended as a debugging aide. Mesh with SphereGeometry works well.
    dragPointMarker = p.dragPointMarker || null;

    //Raycaster usually set from Three.js camera, but here assume near=1 and
    //make 'far' 20% bigger than dragplane (if smaller, raycast won't work).
    var geo = dragPlane.geometry.parameters;
    raycaster.near = 1;
    raycaster.far = Math.max(geo.width, geo.depth) * 1.2;
  }

  function cursormoveScene(event){
    //Update raycaster origin and direction whenever cursor moves.
    rayOrigin.copy(event.ray.origin);
    rayDirection.copy(event.ray.direction);
    dragUpdate();
  }

  function cursorupScene(event){
    if (dragObject){
      dragEnd();
    }
  }

  function cursordown(object, event){
    //Handle (rare) case where cursordown happens before any mousemove.
    rayOrigin.copy(event.ray.origin);
    rayDirection.copy(event.ray.direction);
    dragStart(object, event);
  }

  function cursorup(object, event){
    if (dragObject){
      dragEnd();
    }
  }

  function dragStart(object, event){
    if (TRACE) console.log('Starting drag', object);
    dragObject = object;
    var boudingBox = new THREE.Box3().setFromObject(dragObject);
    dragObjectWidth = Math.abs(boudingBox.max.x - boudingBox.min.x);
    var intersectionPoint = event.point.clone();
    if (inAltspace){
      //TODO: Investigate if bug in Altspace event or our mistake.
      intersectionPoint.z *= -1;//invert z cordinate
    }
    if (!intersectionPoint){
      console.error('drag start but no intersected object');
      return;
    }
    if (TRACE) console.log('Intersection point:', intersectionPoint);
    if ( !dragObject ) {
      console.error('dragStart called, but object not selected');
      return;
    }
    if (orbitControls){
      orbitControls.enabled = false;
    }
    //Raise/lower the drag plane to match the drag start point.
    dragPlane.position.y = intersectionPoint.y;
    //Force update, otherwise old position of dragPlane is used when raycaster
    //computes drag point later, and objects appear to 'jump' when selected.
    dragPlane.updateMatrixWorld();
    if (TRACE) console.log('Moving dragPlane.position.y to ' + intersectionPoint.y);
    //Remember difference between center of object and drag point.
    var objectCenterPoint = dragObject.position.clone();
    objectCenterPoint.y = dragPlane.position.y;
    dragOffset.copy(intersectionPoint).sub(objectCenterPoint);
  }

  function dragEnd(){
      if (TRACE) console.log('Ending drag');
      if (orbitControls){
        orbitControls.enabled = true;
      }
      dragObject = null;
      //Return dragPlane to ground-level. Not strictly needed since we'll reset
      //on new drag, but looks better if the dragPlane is visible, e.g. for debugging.
      dragPlane.position.y = 0;
  }

  function dragUpdate(){
    //based on http://threejs.org/examples/#webgl_interactive_draggablecubes
    //but changed to drag in x-z ground plane, instead of x-y vertical plane.
    if (!dragObject) return;  //No drag, we're done.
    raycaster.set(rayOrigin, rayDirection);
    var intersects = raycaster.intersectObject(dragPlane);
    if (intersects.length === 0){
      if (TRACE) console.log('Ray no longer intersects dragplane');
      dragEnd();
      return;
    }
    var dragPoint = intersects[0].point.clone();
    if (dragPointMarker){
      dragPointMarker.position.x = dragPoint.x;
      dragPointMarker.position.y = dragPoint.y;
      dragPointMarker.position.z = dragPoint.z;
    }
    //Update object position to where raycaster intersects dragPlane (minus offset).
    var newPosition = new THREE.Vector3();
    newPosition.copy(dragPoint).sub(dragOffset);
    //But maintain the original y position of the object.
    newPosition.y = dragObject.position.y;
    //Constrain new position to the width and depth of the dragPlane.
    //Prevents object from getting moved outside the bounding volume in Altspace.
    //Account for object width, otherwise objects end up halfway off the dragPlane.
    var params = dragPlane.geometry.parameters;
    var objectWidth = dragObjectWidth;
    if (dragPoint.x - objectWidth/2 < dragPlane.position.x - params.width/2){
      newPosition.x = dragPlane.position.x - params.width/2 + objectWidth/2;
    }
    if (dragPoint.x + objectWidth/2 > dragPlane.position.x + params.width/2){
      newPosition.x = dragPlane.position.x + params.width/2 - objectWidth/2;
    }
    if (dragPoint.z - objectWidth/2 < dragPlane.position.z - params.depth/2){
      newPosition.z = dragPlane.position.z - params.depth/2 + objectWidth/2;
    }
    if (dragPoint.z + objectWidth/2 > dragPlane.position.z + params.depth/2){
      newPosition.z = dragPlane.position.z + params.depth/2 - objectWidth/2;
    }
    dragObject.position.copy(newPosition);
    return;
  }

  return {
    init: init,
    cursordown: cursordown,
    cursorup: cursorup,
    cursorupScene: cursorupScene,
    cursormoveScene: cursormoveScene,
  };

};

