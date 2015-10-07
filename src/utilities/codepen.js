 altspace.utilities.codePen = (function () {
    var exports = {};

    var Please = window.Please;
    var Url = window.Url;

    var name = 'VR CodePen';
    var inTile = !!window.__cancelAnimationFrame;
    var inVR = !!window.altspace.inClient;
    var inCodePen = !!location.href.match('codepen.io/');

    function printDebugInfo() {
        console.log("In a tile: " + inTile);
        console.log("In VR: " + inVR);
    }

    function ensureInVR() {
        if (inTile || !inVR) //inTile && inAltspace
        {
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = "@import url(https://fonts.googleapis.com/css?family=Open+Sans:800);.altspace-info{text-align:center;font-family:'Open Sans',sans-serif;line-height:.5}.altspace-vr-notice{color:rgba(0,0,0,.7);font-size:5vw}.altspace-pen-name{font-size:7vw}";
            document.head.appendChild(css);

            document.body.style.background = Please.make_color({ seed: getPenId() });

            var info = document.createElement("div");
            info.className = "altspace-info";
            document.body.appendChild(info);

            var nameEl = document.createElement("span");
            nameEl.className = "altspace-pen-name";
            nameEl.innerHTML = '<p>' + name.toUpperCase() + '</p>';
            info.appendChild(nameEl);

            if (inTile) {
                var errorMsg = 'VR mode does not support preview tiles. Stopping code execution.';
                console.log('ERROR: ' + errorMsg);
                throw new Error(errorMsg);
            }

            if (!inVR) {

                var launchEl = document.createElement("span");
                launchEl.className = "altspace-vr-notice";
                launchEl.innerHTML = '<p>View</p>';
                info.insertBefore(launchEl, nameEl);

                var notice = document.createElement("span");
                notice.className = "altspace-vr-notice";
                notice.innerHTML = '<p>in <a href="http://altvr.com"> AltspaceVR </a></p>';
                info.appendChild(notice);


                var errorMsg = 'Not in VR mode. Stopping code execution.';
                if (inTile) {
                    console.log('ERROR: ' + errorMsg);//thrown error message not displayed in console when inTile, log it
                }
                throw new Error(errorMsg);
            }
            return;

        }
    }

    function setName(n) {//TODO: A better method for this would be awesome
        name = n;
    }

    function getParsedUrl() {
        var canonicalElement = document.querySelector('link[rel=canonical]');
        var fullUrl = canonicalElement ? canonicalElement.href : window.location.href;
        return new Url(fullUrl);
    }

    function getPenId() {
        var url = getParsedUrl();
        var splitPath = url.path.split('/');
        var id = splitPath[splitPath.length - 1];
        return id;
    }

    function getAuthorId() {
        var url = getParsedUrl();
        var splitPath = url.path.split('/');
        var isTeam = splitPath[1] == 'team';
        var id = isTeam ? 'team-' + splitPath[2] : splitPath[1];
        return id;
    }

    return {
        inTile: inTile,
        inVR: inVR,
        inCodePen: inCodePen,
        ensureInVR: ensureInVR,
        setName: setName,
        getPenId: getPenId,
        getAuthorId: getAuthorId,
        printDebugInfo: printDebugInfo
    };
}());