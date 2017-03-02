'use strict';

/**
* Load an OBJ file and its material definition in one pass.
* @class OBJMTLLoader
* @memberof module:altspace/utilities/shims
*/
class OBJMTLLoader
{
	/**
	* A function that's passed the result of the OBJMTLLoader.
	* @callback module:altspace/utilities/shims.OBJMTLLoader~LoaderCallback
	* @param {Object3D} object - The loaded object
	*/

	/**
	* Begin loading the definition files.
	* @method load
	* @memberof module:altspace/utilities/shims.OBJMTLLoader
	* @static
	* @param {string} objFile - The URL to the OBJ file
	* @param {string} mtlFile - The URL to the MTL file
	* @param {LoaderCallback} callback - The function called when loading is complete
	*/
	load (objFile, mtlFile, callback)
	{
		var mtlLoader = new THREE.MTLLoader()
		var baseUrl = mtlFile.split('/').slice(0, -1).join('/');
		mtlLoader.setTexturePath(baseUrl + '/');
		mtlLoader.setCrossOrigin(this.crossOrigin);
		mtlLoader.load(mtlFile, function (materials) {
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.load(objFile, callback);
		});
	}
}

export default OBJMTLLoader;
