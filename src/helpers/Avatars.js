/**
 * This module provides a simplified way to use the AvatarsApi with Three.js
 * 
 * It will create an Object3D for the Avatar and for each joint being tracked (e.g. head)
 * that you should then add to your scene. You can add your own objects grouped under these parent objects. 
 * Note: It is recommended that you add these parent objects to the scene directly, 
 * because for simplicity their transforms are only being applied locally. 
 * (Modifying their world transforms is possible, but introduces some additional complexity).
 * 
 * You should then call update during your animation update loop.
 *
 *  Author: Kevin Lee
 *  Copyright (c) 2015 Altspace VR
 */

Avatars = function() {

    var users = {};
    var userIds = [];

    function addUser(userId) {
        var body = new THREE.Object3D();
        var head = new THREE.Object3D();
        body.add(head);

        userIds.push(userId);
        avatars[userId] = {body: body, head: head};
        return {
            body: body,
            head: head
        }
    }

    function removeUser(userId) {

        var index = userIds.indexOf(userId);
        if (index != -1){
            userIds.splice(index, 1);
            delete users[userId];
        }
        
    }

    function update() {
        window.Alt.Avatars.getAvatars(userIds.toString()).then(
            function(users) {
                for (var i = 0; i < users.length; i++) {
                    user = users[i];
                    var avatar = avatars[user.userId];
                    var head = avatar.head;
                    head.position.set(user.headTransform[0], user.headTransform[1], user.headTransform[2]);
                    head.quaternion.set(user.headTransform[3], user.headTransform[4], user.headTransform[5], user.headTransform[6]);
                }
            }
        );
    }

    return {
        addUser: addUser,
        removeUser: removeUser,
        update: update
    };
};