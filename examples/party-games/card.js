window.party = window.party || {};

(function(){
  var Object3DSync = altspace.utilities.behaviors.Object3DSync;

  function createCard(initData){
    var text = initData.text;
    var textColor = initData.textColor;
    var cardColor = initData.cardColor;

    var card = new THREE.Object3D();

    var text = createText({ text: text, color: textColor });
    card.text = text;
    card.add(text);

    text.geometry.computeBoundingBox();
    var textSize = text.geometry.boundingBox.size();
    var back = createBack({ 
      minHeight: textSize.y, 
      minWidth: textSize.x, 
      color: cardColor 
    });
    card.back = back;
    card.add(back);

    var newWordButton = createButton({
      x: -150,
      y: textSize.y/2,
      cursordown: function(){
        party.changeWord();
      }
    });
    card.newWordButton = newWordButton;
    card.add(newWordButton);

    var passButton = createButton({
      x: textSize.x+150,
      y: textSize.y/2,
      cursordown: function(){
        console.log("clicked on pass card button.");
      }
    });
    card.passButton = passButton;
    card.add(passButton);

    card.addBehavior( Object3DSync({ position: true , rotation: true}));

    card.scale.set(.1,.1,.1)
    party.sim.scene.add(card);
    return card;
  }

  function createText(initData){
    var text = initData.text;
    var color = initData.color;

    var geo = new THREE.TextGeometry(text);
    var mat = new THREE.MeshBasicMaterial({color: color});
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, 0, 0.2);
    mesh.scale.set(1,1,0.2);
    return mesh;
  }

  function createBack(initData){
    var minHeight = initData.minHeight;
    var minWidth = initData.minWidth;
    var color = initData.color;

    var geo = new THREE.BoxGeometry(minWidth + 500, minHeight * 2,10);
    var mat = new THREE.MeshBasicMaterial({color: color});
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(minWidth/2, minHeight/2, 0);
    return mesh;
  }

  function createButton(initData){
    var cursordown = initData.cursordown;
    var x = initData.x;
    var y = initData.y;

    var geo = new THREE.BoxGeometry(150,150,10);
    var mat = new THREE.MeshBasicMaterial({color: '#AA8539'});
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, 10);
    mesh.addEventListener('cursordown', cursordown);
    return mesh;
  }

  //TODO: move
  function attachCardToEye(){
    if (wordIsAttached){
      return;
    }

    if (typeof(party.eye !== 'undefined')){
        party.eye = party.skeleton.getJoint('Eye', 'Center', 0);
    }
    party.eye.add(party.card);
    wordIsAttached = true;

    party.card.rotation.set(0, Math.PI, 0, 'XYZ');
    party.card.position.set(0,0,0);

    var offset = computeOffsetForCard();
    party.card.translateX(offset.x);
    party.card.translateY(offset.y);
    party.card.translateZ(offset.z);
  }

  //TODO: move
  function computeOffsetForCard(){
    var dX = new THREE.Box3().setFromObject(party.card).size().x * 1/2 * -1;
    var dZ = -200;
    return new THREE.Vector3(dX,0,dZ);
  }

  //TODO: move
  function detachCardFromEye(){
    if (wordIsAttached){
      party.eye.remove(party.card);
      wordIsAttached = false;
    }
  }

  party.attachCardToEye = attachCardToEye;
  party.detachCardFromEye = detachCardFromEye;
  party.createCard = createCard;
})();
