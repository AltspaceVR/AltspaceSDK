//Show crosshair when cursor hovers over an object.
//Alternatively, the crosshairs can follow the cursor.
altspace.utilities = altspace.utilities || {};
altspace.utilities.TargetEffect = function(){

	var crosshair;
	var objects = [];
	var scene;
	var hoverObject = null;

	var followCursor;//boolean
	var followDistance;//integer
	var cursorRay = new THREE.Ray();

  var lineLength, lineWidth, lineDepth;
  var radius, color;
  var showDot, dotRadius, dotColor;

	function init(myScene, params){
		if (!myScene || !myScene instanceof THREE.Scene){
			throw new Error('TargetEffect: init expects a Scene argument');
		}
		scene = myScene;
		var p = params || {};
		followCursor = p.followCursor || false;
		followDistance = p.followDistance || 15;
		lineLength = p.lineLength || 2.5;
		lineWidth = p.lineWidth|| 1.25;
		lineDepth = p.lineDepth || lineWidth/2;
		color = p.color || '#FFFF00';//yellow
		radius = p.radius || lineWidth;
		showDot = p.showDot || followCursor;
		dotRadius = p.dotRadius || lineWidth;
		dotColor = p.dotColor || color;

		crosshair = p.crosshair || makeCrosshair();
		crosshair.visible = false;
		scene.add(crosshair);
		if (followCursor) {
			scene.addEventListener('cursormove', cursormoveFollow);
		}
	}

	function add(object){
		if (!object || !object instanceof THREE.Object3D){
			throw new Error('TargetEffect: add expects an Object3D argument');
		}
		objects.push(object);
		object.addEventListener('cursorenter', cursorenter);
		object.addEventListener('cursorleave', cursorleave);
		scene.addEventListener('cursormove', cursormove);
	}

	function cursorenter(event){
		hoverObject = event.currentTarget;
		crosshair.position.copy(hoverObject.position);
		crosshair.visible = true;
	}

	function cursorleave(event){
		crosshair.visible = false;
		hoverObject = null;
	}

	function cursormove(event){
		if (hoverObject){//Handle case where the object is moving.
			crosshair.position.copy(hoverObject.position);
		}
	}

	function cursormoveFollow(event){
		if (!crosshair.visible) {//we don't know cursor position until it moves
			crosshair.visible = true;
		}
		cursorRay.origin = event.ray.origin;
		cursorRay.direction = event.ray.direction;
		var newDirection = cursorRay.direction.clone();
		newDirection.multiplyScalar(followDistance);
		var newPosition = new THREE.Vector3();
		newPosition.copy(cursorRay.origin);
		newPosition.add(newDirection);
		crosshair.position.copy(newPosition);
		crosshair.lookAt(cursorRay.origin);
	}


	function makeCrosshair(){
		var geometry, numFaces;
	  geometry = new THREE.BoxGeometry(lineWidth, lineLength, lineDepth);
	  var material = new THREE.MeshBasicMaterial({color: color});
	  var lineDown =  new THREE.Mesh(geometry, material);
	  var lineUp = lineDown.clone();
	  var lineRight = lineDown.clone();
	  var lineLeft = lineDown.clone();
	  lineDown.position.y = - (lineLength / 2) - radius;
	  lineUp.position.y = lineLength / 2 + radius;
	  lineLeft.position.x = - (lineLength / 2) - radius;
	  lineRight.position.x = lineLength / 2 + radius;
	  lineUp.rotation.z = Math.PI;
	  lineLeft.rotation.z = - Math.PI / 2;
	  lineRight.rotation.z = Math.PI / 2;
	  var group = new THREE.Group();
	  if (showDot) {//add center dot first, if there is one
		  var mat = new THREE.MeshBasicMaterial({color: dotColor});
			var geo =  new THREE.SphereGeometry(dotRadius, 20, 20);
	  	var dotMesh = new THREE.Mesh(geo, mat);
		  group.add(dotMesh);
	  }
	  group.add(lineDown);
	  group.add(lineUp);
	  group.add(lineLeft);
	  group.add(lineRight);
	  return group;
	}

  function mergeGeo(meshArray) {
	  var mergedGeo = new THREE.Geometry();
	  var materials = [];
	  var faceMaterialOffset = 0;
	  for (var i=0; i < meshArray.length; i++) {
	    var mesh = meshArray[i];
	    mesh.updateMatrix();  // must update before merge
	    mergedGeo.merge(mesh.geometry, mesh.matrix, faceMaterialOffset);
	    var matArray = mesh.material.materials || [mesh.material];
	    materials = materials.concat(matArray);
	    faceMaterialOffset += matArray.length;
	  }
	  var mergedMaterials = new THREE.MeshFaceMaterial(materials);
	  newMesh = new THREE.Mesh(mergedGeo, mergedMaterials);
	  return newMesh;
	}

	var exports = {
		init: init,
		add: add,
	}

	Object.defineProperty(exports, 'crosshair', {get: function(){return crosshair}});
	Object.defineProperty(exports, 'cursorRay', {get: function(){return cursorRay}});

	return exports;

};
