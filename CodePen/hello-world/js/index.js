//Boilerplate
altspaceCodePen.setName('Hello World');
altspaceCodePen.ensureInVR();

var text = "Hello World";

//Setup 
var scene = new THREE.Scene();
var renderer = altspace.getThreeJSRenderer({
  version: '0.2.0'
});

//Text
var geometry = new THREE.TextGeometry(text);
var material = new THREE.MeshBasicMaterial({
  color: 'green'
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.x = -400;
mesh.scale.z = 0.3;
mesh.scale.multiplyScalar(1);
mesh.rotation.y = Math.PI;
scene.add(mesh);

//Update & Rendering
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene);
  //mesh.rotation.x += 0.05;
}
animate();