//Detects mouse move/up/down events, raycasts to find intersected objects, then
//dispatches cursor move/up/down/enter/leave events that mimics Altspace events.
altspace = altspace || {};
altspace.utilities = altspace.utilities || {};
altspace.utilities.shims = altspace.utilities.shims || {};
altspace.utilities.shims.cursor = (function(){//TODO: move to utilities.shims.cursor

  var scene;
  var camera;
  var intersected;
  var selected;
  var intersectionPoint;
  var TRACE;

  var mouse = new THREE.Vector3();
  var unprojectedMouse = new THREE.Vector3();
  var raycaster = new THREE.Raycaster();

  function init(myScene, myCamera, myParams){
    if (!myScene || !myScene instanceof THREE.Scene) {
      throw new Error('cursor shim: init requires THREE.Scene argument');
    }
    if (!myCamera || !myCamera instanceof THREE.Camera) {
      throw new Error('cursor shim: init requires THREE.Camera argument');
    }
    scene = myScene;
    camera = myCamera;
    raycaster.near = camera.near;
    raycaster.far = camera.far;

    var params = myParams || {};
    var p = params;
    TRACE = p.TRACE || false;//log all events.
    domElement = p.domElement || document;//attach listeners here
    recursive = p.recursive || true;//check descenants for intersections

    unprojectMouse();
    updateRaycaster();
    domElement.addEventListener('mousedown', cursordown, false)
    domElement.addEventListener('mouseup'  , cursorup, false)
    domElement.addEventListener('mousemove', mouseMove, false)
  }

  function cursordown(event){
    if(!intersected){
      return;//no object under cursor
    }
    var object = intersected;
    if(TRACE){console.log("cursor shim: cursordown", object);}
    selected = object;
    var cursorEvent = mockCursorEvent('cursordown', event, object);
    object.dispatchEvent(cursorEvent);
    var mockCursorEventScene = mockCursorEvent('cursordown', event, scene);
    scene.dispatchEvent(mockCursorEventScene);
  }

  function cursorup(event){
    if(!selected){
      return;//no object previously selected
    }
    var object = selected;
    if(TRACE){console.log("cursor shim: cursorup", object);}
    object.dispatchEvent(mockCursorEvent('cursorup', event, object));
    scene.dispatchEvent(mockCursorEvent('cursorup', event, scene));
    selected = undefined;
  }

  function cursormove(event){
    if(TRACE){console.log("cursor shim: cursormove");}
    scene.dispatchEvent(mockCursorEvent('cursormove', event, scene));
  }

  function cursorleave(object){
    var object = intersected;
    if(TRACE){ console.log("cursor shim: cursorleave", object); }
    object.dispatchEvent(mockCursorEvent('cursorleave', event, object));
    scene.dispatchEvent(mockCursorEvent('cursorleave', event, scene));
  }

  function cursorenter(object){
    var object = intersected;
    if(TRACE){console.log("cursor shim: cursorenter", object);}
    object.dispatchEvent(mockCursorEvent('cursorenter', event, object));
    scene.dispatchEvent(mockCursorEvent('cursorenter', event, scene));
  }

  function mouseMove(event){
    mouseMoved = true;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;
    unprojectMouse();
    updateRaycaster();
    cursormove(event);
  };

  function unprojectMouse(){
    unprojectedMouse.copy(mouse);
    unprojectedMouse.unproject(camera);

  }

  function mockCursorEvent(eventName, event, object){
    //currentTarget: THREE.Scene or THREE.Object3D
    //cursorRay: Object (obsolete)
    //point: THREE.Vector3
    //ray: THREE.Ray
    //stopImmediatePropagation: function
    //stopPropagation: function
    //target: THREE.Mesh
    //type: 'cursorenter'
    var origin = raycaster.ray.origin;
    var direction = raycaster.ray.direction;
    var point =  intersectionPoint ? intersectionPoint.clone() : null;
    var mockCursorEvent = { 
      //target gets set by EventDispatcher
      currentTarget: object,
      cursorRay: {//TODO: remove once it's removed from Altspace event
        origin: { x: origin.x, y: origin.y, z: origin.z },
        direction: { x: direction.x, y: direction.y, z: direction.z },
      },
      point: point,
      ray: {
        origin: origin,
        direction: direction,
      },
      type: eventName,
      isShimEvent: true,//for workarounds related to quirks in Altspace events
    }
    return mockCursorEvent;
  }

  function updateRaycaster(){
    if (unprojectedMouse){
      setRaycaster(unprojectedMouse);
      if(!selected){
        checkForIntersections();
      }
    }
  };

  function setRaycaster(position){
    var origin = position;
    var direction = origin.clone()
    direction.sub(camera.position);
    direction.normalize();
    raycaster.set(camera.position, direction);
  }

  function checkForIntersections(){
    //TODO: Implement bubbling, don't assume scene top-level objects.
    var intersections = raycaster.intersectObjects(scene.children, recursive);
    if(intersections.length > 0){
      //Use first intersection so we don't get changes when we hit a new face.
      mockBubble(intersections[0]);//TODO: Implement real event bubbling.
      var firstIntersection = intersections[0].object;
      if(!intersected){
        intersected = firstIntersection;
        intersectionPoint = intersections[0].point;
        cursorenter(intersected);
      }else{
        if(intersected != firstIntersection){
          cursorleave(intersected);
          intersected = firstIntersection;
          intersectionPoint = intersections[0].point;
          cursorenter(intersected);
        } else {
          //Same object intersected, just update intersection point.
          intersectionPoint = intersections[0].point;
        }
      }
    }else{
      //No intersections, clear any existing ones.
      if(intersected){
        cursorleave(intersected);
        intersected = undefined;
        intersectionPoint = undefined;
      }
    }
  }

  function mockBubble(intersection){
    //Bubble up to descendant that is child of scene.
    var newTarget = intersection.object;
    while (scene.children.indexOf(newTarget) === -1){
      if (!newTarget.parent) {
        console.error('Intersected object is not descendant of scene', newTarget);
        return;
      }        
      newTarget = newTarget.parent;
    }
    //Reset intersected.object, leave intersected.point etc. unchanged. 
    intersection.object = newTarget;
  }

  return {
    init: init,
  };

}());

