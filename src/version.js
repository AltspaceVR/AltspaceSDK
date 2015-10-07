(function () {

    var version = VERSION;

    if (window.altspace && window.altspace.requestVersion) {
        window.altspace.requestVersion(version);
    }

}());