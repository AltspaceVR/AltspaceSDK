'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

if (!window.altspace) {
    window.altspace = {};
}
if (!window.altspace.utilities) {
    window.altspace.utilities = {};
}
if (!window.altspace.utilities.shims) {
    window.altspace.utilities.shims = {};
}

var OBJMTLLoader = (function () {
    function OBJMTLLoader() {
        _classCallCheck(this, OBJMTLLoader);
    }

    _createClass(OBJMTLLoader, [{
        key: 'load',
        value: function load(objFile, mtlFile, callback) {
            var mtlLoader = new THREE.MTLLoader();
            var baseUrl = mtlFile.split('/').slice(0, -1).join('/');
            mtlLoader.setBaseUrl(baseUrl + '/');
            mtlLoader.load(mtlFile, function (materials) {
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load(objFile, callback);
            });
        }
    }]);

    return OBJMTLLoader;
})();

window.altspace.utilities.shims.OBJMTLLoader = OBJMTLLoader;