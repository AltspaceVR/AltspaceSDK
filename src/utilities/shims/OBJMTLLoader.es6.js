if (!window.altspace) { window.altspace = {}; }
if (!window.altspace.utilities) { window.altspace.utilities = {}; }
if (!window.altspace.utilities.shims) { window.altspace.utilities.shims = {}; }

class OBJMTLLoader {
    load (objFile, mtlFile, callback) {
        var mtlLoader = new THREE.MTLLoader()
        var baseUrl = mtlFile.split('/').slice(0, -1).join('/');
        mtlLoader.setBaseUrl(baseUrl + '/');
        mtlLoader.setCrossOrigin(this.crossOrigin);
        mtlLoader.load(mtlFile, function (materials) {
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(objFile, callback);
        });
    }
}
window.altspace.utilities.shims.OBJMTLLoader = OBJMTLLoader;
