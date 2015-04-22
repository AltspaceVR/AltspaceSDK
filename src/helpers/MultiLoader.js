/**
 * MultiLoader is a helper for loading multiple files at once.
 * It requires a callback to be specified which will be called once all loading is completed.
 * By default, it uses THREE.AltOBJMTLLoader, however a custom loader can be specified.
 * It requires async.js https://github.com/caolan/async
 *
 * @author Kevin Lee
 * Copyright (c) 2015 AltspaceVR
 */

var MultiLoader = function() {

	var cache = {};

	/**
	 * Default loader for loading obj's
	 */
	function loadModel(fileParams, cb) {
		var fileName = fileParams.fileName;
		var cacheKey = fileParams.cacheKey;

		var loader = new THREE.AltOBJMTLLoader();
		loader.load(fileName, function ( loadedObject ) {
			cache[cacheKey] = loadedObject;
			cb();
		});
	}

	 /**
	  * loadFilesInParallel should be faster for loading many different types of objects.
	  */
	function loadFilesInParallel(fileList, cb, optionalLoader) {

		var loader = optionalLoader || loadModel;

		files = [];

		fileList.forEach(function(fileParams){
			files.push(async.apply(loader, fileParams))
		});

		async.parallel(files, function(){
			if(cb) {
				cb();
			}
		});
	}

	/**
	 * loadFilesInSeries should be faster for loading many similar objects if your loader is properly cached.
	 */
	function loadFilesInSeries(fileList, cb, optionalLoader) {

		var loader = optionalLoader || loadModel;

		files = [];

		fileList.forEach(function(fileParams){
			files.push(async.apply(loader, fileParams))
		});

		async.series(files, function(){
			if(cb) {
				cb();
			}
		});
	}

	/**
	 * Retrieve the cached item. Returns null if the item does not exist.
	 */
	function getCached(cacheKey) {
		return cache[cacheKey] || null;
	}

	return {
		loadFilesInParallel: loadFilesInParallel,
		loadFilesInSeries: loadFilesInSeries,
		getCached: getCached
	};
}();