/**
 * MultiLoader is a helper for loading multiple files at once.
 * It requires async.js https://github.com/caolan/async
 * It expects a loader callback to be passed in which will do the actual loading of assets. 
 * as well as a final callback that is called at the end.
 *
 * @author Kevin Lee
 * Copyright (c) 2015 AltspaceVR
 */

var MultiLoader = function() {

	/**
	 * loadFilesInParallel should be faster for loading many different types of objects.
	 */
	function loadFilesInParallel(fileList, loader, cb) {
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
	function loadFilesInSeries(fileList, loader, cb) {
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

	return {
		loadFilesInParallel: loadFilesInParallel,
		loadFilesInSeries: loadFilesInSeries
	};
}();