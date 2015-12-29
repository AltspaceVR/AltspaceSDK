window.party = window.party || {};

(function(){
    var Object3DSync = altspace.utilities.behaviors.Object3DSync;

    function createCard(params){
        var text3D = createCardText(params.text, params.textColor);

        text3D.geometry.computeBoundingBox();
        var textBox = text3D.geometry.boundingBox;
        var back = createCardBack(textBox, params.backColor);

        var card = new THREE.Object3D();
        card.back = back;
        card.text3D = text3D;
        card.add(back);
        card.add(text3D);

        card.addBehavior( Object3DSync({ position: true , rotation: true}));
        card.scale.set(0.2,0.2,0.2);

        party.sim.scene.add(card);
        return card;
    }

    function createCardBack(textBox, backColor){
        var size = textBox.size();
        var geo = new THREE.BoxGeometry(size.x * 1.3, size.y * 2,10);
        var mat = new THREE.MeshBasicMaterial({color: backColor});
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(size.x/2, size.y/2, 0);
        return mesh;
    }
    
    function createCardText(text, textColor){
        var geo = new THREE.TextGeometry(text);
        var mat = new THREE.MeshBasicMaterial({color: textColor});
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(0, 0, 0.2);
        mesh.scale.set(1,1,0.2);
        return mesh;
    }

    function testBehavior(){

        var object3d;
        var sync;

        function awake(o){
            object3d = o;
            sync = object3d.getBehaviorByType('Object3DSync');
        }

        function update(){
            sync.enqueueSend();
        }

        return { awake: awake, update: update };
    }

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

    function computeOffsetForCard(){
        var dX = new THREE.Box3().setFromObject(party.card).size().x * 1/2 * -1;
        var dZ = -200;
        return new THREE.Vector3(dX,0,dZ);
    }

    function detachCardFromEye(){
        if (wordIsAttached){
            party.eye.remove(party.card);
            wordIsAttached = false;
        }
    }

    party.testBehavior = testBehavior;
    party.attachCardToEye = attachCardToEye;
    party.detachCardFromEye = detachCardFromEye;
    party.createCard = createCard;
})();
