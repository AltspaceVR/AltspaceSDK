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

    var useThreeJSLoader = false;

    /**
     * Loads models and caches them.
     */
    function loadModel(file, cache, options, cb) {

        var loader;
        if (useThreeJSLoader) {
            loader = new THREE.OBJMTLLoader();
            loader.load(file, file.replace('.obj', '.mtl'), function(loadedObject) {
                cache[file] = loadedObject;
                cb();
            });
        }
        else {
            loader = new THREE.AltOBJMTLLoader(undefined, options);
            loader.load(file, function ( loadedObject ) {
                cache[file] = loadedObject;
                cb();
            });
        }
    }

    /**
     * loads the assets as specified in the file list.
     * Expects fileList to be in format {file: "path/to/file.obj", key: "some_identifier"}
     * It will call the cb with the loaded assets when completed.
     */
    function load(fileList, cb, options) {

        var filesToLoad = [];

        var cache = {};

        uniqueFileList = [];

        fileList.forEach(function(fileParams) {
            if (uniqueFileList.indexOf(fileParams.file) == -1) {
                uniqueFileList.push(fileParams.file);
            }
        });

        uniqueFileList.forEach(function(file) {
            filesToLoad.push(async.apply(loadModel, file, cache, options));
        });

        async.parallel(filesToLoad, function() {
            var assets = {};
            fileList.forEach(function(fileParams) {
                assets[fileParams.key] = cache[fileParams.file].clone();
            });

            cb(assets);
        });
    }

    var retObj = {
        load: load
    };

    /**
     * Set 'useThreeJSLoader' to 'true' if using >= v0.2.0 of the SDK
     */
    Object.defineProperty(retObj, 'useThreeJSLoader', {
        get: function(){
            return useThreeJSLoader;
        },
        set: function (val) {
            useThreeJSLoader = val;
        }
    });

    return retObj;
}();
