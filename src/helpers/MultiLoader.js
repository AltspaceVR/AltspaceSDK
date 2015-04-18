/**
 * MultiLoader is a helper for loading multiple files at once.
 * It expects a loader callback that accepts the arguments of filename and key to be passed to it,
 * as well as a final callback that is called at the end.
 *
 * @author Kevin Lee
 * Copyright (c) 2015 AltspaceVR
 */

var MultiLoader = function() {
	function loadModels(fileList, loader, cb) {
		files = [];

		fileList.forEach(function(file){
			files.push(async.apply(loader, file[0], file[1]))
		});

		async.parallel(files, function(){
			if(cb) {
				cb();
			}
		});
	}

	return {
		loadModels: loadModels
	}
}();