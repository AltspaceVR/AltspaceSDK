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

        card.addBehavior( Object3DSync({ position: true }) );
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

    function cardFollowBehavior(config) {

        var offset = config.offset;
        var joint = config.joint;

        var object3d;
        var sync;

        function awake(o) {
            object3d = o;
            sync = object3d.getBehaviorByType('Object3DSync');
        }

        function update() {
            object3d.rotation.set(0, joint.rotation.y+Math.PI, 0, 'XYZ');

            object3d.position.copy(joint.position);

            object3d.translateX(offset.x);
            object3d.translateY(offset.y);
            object3d.translateZ(offset.z);

            sync.enqueueSend();
        }

        return { awake: awake, update: update };
    }

    function attachCardToEye(card){
        var eye = party.skeleton.getJoint('Eye', 'Center', 0);
        var offset = computeOffsetForCard(card);
        card.addBehavior(party.cardFollowBehavior({ offset: offset, joint: eye }));
    }

    function computeOffsetForCard(card){
        var dX = new THREE.Box3().setFromObject(card).size().x/2 * -1;
        var dZ = -200;
        return new THREE.Vector3(dX,0,dZ);
    }


    party.attachCardToEye = attachCardToEye;
    party.cardFollowBehavior = cardFollowBehavior;
    party.createCard = createCard;
})();
