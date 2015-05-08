/*
 * UserEvents API gives the app information about the users in Altspace.
 *
 * You should call getUsers() on initial app load to retrieve the current state of all users.
 * Then, you should listen for the altUserEntered and altUserExited events on window to
 * track when users enter or leave the space.
 *
 * The data returned for each user is:
 *     userId (string)
 *     firstName (string)
 *     isLocal (bool, dictates if this is the user running the app)
 * 
 * Example:
 * 
    var users = {};
    userEvents = new UserEvents();

    window.addEventListener("altUserEntered", function( event ) {
        users[event.detail.userId] = {firstName: event.detail.firstName};
        console.log(event.detail.firstName + " has entered the space.");

    });

    window.addEventListener("altUserExited", function( event ) {
        delete users[event.detail.userId];
        console.log(event.detail.firstName + " has exited the space.");
    });

    userEvents.getUsers().then(
        function(val) {
            val.forEach(function(user) {
                users[user.userId] = {firstName: user.firstName};
                console.log(user.firstName + " is in the space.");
            });
        }
    );
 *
 * Author: Kevin Lee
 * Copyright (c) 2015 AltspaceVR
 */

var UserEvents = function() {

    var inAltspace = !!window.Alt;

    if ( inAltspace ) {
        window.addEventListener("userEntered", userEntered);
        window.addEventListener("userExited", userExited);
    }

    function userEntered( object ) {
        dispatchUserEvent('altUserEntered', object);
    }

    function userExited( object ) {
        dispatchUserEvent('altUserExited', object);
    }

    function dispatchUserEvent( eventType, object ) {
        var eventDetail = {
            detail: { 
                userId: object.userId, 
                firstName: object.firstName, 
                isLocal: object.isLocal 
            }
        };
        var objectEvent = new CustomEvent( eventType, eventDetail);

        window.dispatchEvent( objectEvent );
    }

    function getUsers() {
        return new Promise(
            function(resolve, reject) {
                Alt.Users.GetUsers(resolve);
            }
            //TODO: handle reject
        );
    }

    return {
        getUsers: getUsers
    };
};