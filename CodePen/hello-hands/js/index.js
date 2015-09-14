//Boilerplate
var ascp = altspace.utilities.codePen;
ascp.setName("Hello Hands"); 
ascp.ensureInVR();

var text = "HelloHands";

//Setup 
var scene = new THREE.Scene();
var renderer = altspace.getThreeJSRenderer({version:'0.2.0'});

//Letters
var letters = [];
for(var i = 0; i < text.length; i++){
	var geometry = new THREE.TextGeometry(text.charAt(i));
	var material = new THREE.MeshBasicMaterial({color:'green'});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.scale.z = 0.3;
	mesh.scale.multiplyScalar(0.3);
	mesh.position.z = 30;
	mesh.position.x = 12;
	mesh.rotation.x = Math.PI / 2;
	mesh.rotation.y = Math.PI;
	scene.add(mesh);
	letters.push(mesh);
}

//Skeleton
altspace.getThreeJSTrackingSkeleton().then(function(args){
	var skeleton = args;
	scene.add(skeleton);
	var i = 0;
	skeleton.getJoint('Little', 'Left', 	3).add(letters[i++]);
	skeleton.getJoint('Ring', 	'Left', 	3).add(letters[i++]);
	skeleton.getJoint('Middle', 'Left', 	3).add(letters[i++]);
	skeleton.getJoint('Index', 	'Left', 	3).add(letters[i++]);
	letters[i].rotation.y -= Math.PI / 3;
	skeleton.getJoint('Thumb', 	'Left', 	3).add(letters[i++]);
	letters[i].rotation.y += Math.PI / 3;
	skeleton.getJoint('Thumb', 	'Right', 	3).add(letters[i++]);
	skeleton.getJoint('Index', 	'Right', 	3).add(letters[i++]);
	skeleton.getJoint('Middle', 'Right', 	3).add(letters[i++]);
	skeleton.getJoint('Ring', 	'Right', 	3).add(letters[i++]);
	skeleton.getJoint('Little', 'Right', 	3).add(letters[i++]);
});

//Rendering
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene);
}
animate();
