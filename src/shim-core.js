(function () {
    //Cant use || as assigning the same value to an unwritable property would throw an error
    if (!window.altspace) {
        window.altspace = {};
        window.altspace.inClient = false;
    }
    if (!window.altspace.utilities) {
        window.altspace.utilities = {};
    }
}());