//Show target reticle that follows the cursor.
altspace.utilities = altspace.utilities || {};
altspace.utilities.reticle = (function(){

	var object;
	var scene;

	var distance;
	var cursorRay = new THREE.Ray();

  var lineLength, lineWidth, lineDepth;
  var radius, color;
  var showDot, dotRadius, dotColor;

	function init(myScene, params){
		if (!myScene || !myScene instanceof THREE.Scene){
			throw new Error('reticle: init expects a Scene argument');
		}
		scene = myScene;
		var p = params || {};
		distance = p.distance || 15;
		lineLength = p.lineLength || 2.5;
		lineWidth = p.lineWidth|| 1.25;
		lineDepth = p.lineDepth || lineWidth/2;
		color = p.color || '#FFFF00';//yellow
		radius = p.radius || lineWidth;
		showDot = p.showDot || true;
		dotRadius = p.dotRadius || lineWidth;
		dotColor = p.dotColor || color;

		object = p.object || makeCrosshair();
		object.visible = false;
		scene.add(object);
		scene.addEventListener('cursormove', cursormove);
	}

	function cursormove(event){
		if (!object.visible) {//we don't know cursor position until it moves
			object.visible = true;
		}
		cursorRay.origin = event.ray.origin;
		cursorRay.direction = event.ray.direction;
		var newDirection = cursorRay.direction.clone();
		newDirection.multiplyScalar(distance);
		var newPosition = new THREE.Vector3();
		newPosition.copy(cursorRay.origin);
		newPosition.add(newDirection);
		object.position.copy(newPosition);
		object.lookAt(cursorRay.origin);
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
		init: init
	}

	Object.defineProperty(exports, 'object', {get: function(){return object}});
	Object.defineProperty(exports, 'cursorRay', {get: function(){return cursorRay}});

	return exports;

}());
