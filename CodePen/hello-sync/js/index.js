//Boilerplate
altspaceCodePen.setName("Hello Sync"); 
//TODO: Ensure not in grid, i think it makes an instance every time.
var syncInstance = altspaceCodePen.getSyncInstance();

var color = syncInstance.child('color');

color.on('value', function(snapshot){
  document.body.style.background = snapshot.val();
});

document.addEventListener('click', function(){
  color.set(Please.make_color());
}, false);

color.set(Please.make_color());