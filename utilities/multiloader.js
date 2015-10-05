/**
 * Asynchronous loading of models using THREE.OBJMTLLoader
 * @module altspace/utilities/multiloader
 */
altspace = window.altspace || {};
altspace.utilities = altspace.utilities || {};
altspace.utilities.multiloader = (function(){

  var loader;
  var TRACE;
  var baseUrl = '';
  var crossOrigin = '';//assigned to THREE.MTLLoader.crossOrigin

  /**
   * Represents a request containing OBJ and MTL files that you want the 
   * multiloader to load. The LoadRequest instance is populated with the 
   * resulting objects.
   * @name LoadRequest
   * @class LoadRequest
   * @memberof module:altspace/utilities/multiloader
   */
  function LoadRequest(){
    var objUrls = [];
    var mtlUrls = [];
    var objects = [];
    var error;
    var objectsLoaded = 0;

    return {
      /**
       * Paths to model geometry files, in Wavefront OBJ format.
       * @instance
       * @type String[]
       * @memberof module:altspace/utilities/multiloader.LoadRequest
       */
      objUrls: objUrls,
      /**
       * Paths to model materials files, in Wavefront MTL format.
       * @instance
       * @type String[]
       * @memberof module:altspace/utilities/multiloader.LoadRequest
       */
      mtlUrls: mtlUrls,
      /**
       * Objects resulting from the load request. 
       * i.e. objects[i] is result of loader.load(objUrl[i], mtlUrl[i])
       * @instance
       * @type THREE.Object3D[]
       * @memberof module:altspace/utilities/multiloader.LoadRequest
       */
      objects: objects,
      /**
       * Error message indicating an error while loading at least one of the
       * requested files.
       * @instance
       * @type String
       * @memberof module:altspace/utilities/multiloader.LoadRequest
       */
      error: error,
      /**
       * Used internally to determine when loading complete.
       * @instance
       * @type Number
       * @memberof module:altspace/utilities/multiloader.LoadRequest
       */
      objectsLoaded: objectsLoaded
    };

  }//end of LoadRequest

  function init(params){
    var p = params || {};
    TRACE = p.TRACE || false;
    if (p.crossOrigin) crossOrigin = p.crossOrigin;
    if (p.baseUrl) baseUrl = p.baseUrl;
    if (baseUrl.slice(-1) !== '/') baseUrl += '/';

    loader = new THREE.OBJMTLLoader();
    loader.crossOrigin = crossOrigin;
    if (TRACE) console.log('MultiLoader initialized with params', params);
  }

  function load(loadRequest, onComplete){
    var req = loadRequest;
    var start = Date.now();
    if (!req || !req instanceof LoadRequest){
      throw new Error('MultiLoader.load expects first arg of type LoadRequest');
    }
    if (!onComplete || typeof(onComplete) !== 'function'){
      throw new Error('MultiLoader.load expects second arg of type function');
    }
    if (!req.objUrls || !req.mtlUrls || req.objUrls.length !== req.mtlUrls.length){
      throw new Error('MultiLoader.load called with bad LoadRequest');
    }
    var reqCount = req.objUrls.length;
    if (TRACE) console.log('Loading models...')
    for (var i=0; i < reqCount; i++){
      var loadModel = function(req, i){//We need i in the closure to store result.
        var objUrl = baseUrl + req.objUrls[i];
        var mtlUrl = baseUrl + req.mtlUrls[i];
        if (TRACE) console.log('Loading obj:'+objUrl+', mtl:'+mtlUrl);
        loader.load(objUrl, mtlUrl, function(object3d){//onLoaded
          req.objects[i] = object3d;
          req.objectsLoaded++;
          if(req.objectsLoaded === reqCount){
            var elapsed = ((Date.now()-start)/1000.0).toFixed(2);
            if (TRACE) console.log('Loaded '+reqCount+' models in '+elapsed+' seconds');
            onComplete();
          }
        }, onProgress, function(){//onError 
          var url = xhr.target.responseURL || '';
          req.error = 'Error loading file '+url;
        });
      };
      loadModel(req, i);
    }
  }

  function onProgress(xhr){
    if (xhr.lengthComputable && xhr.target.responseURL) {
      //Skip progress log if no xhr url, meaning it's a local file.
      var percentComplete = xhr.loaded / xhr.total * 100;
      var filename = xhr.target.responseURL.split('/').pop();
      if (TRACE) console.log('...'+filename+' '+Math.round(percentComplete,2)+'% downloaded');
    }
  }

  return {
    /**
     * Initialize the multiloader module
     * @static
     * @method
     * @param {Object} [params] Optional parameters.
     * @param {String} [params.crossOrigin=''] 
     * @param {String} [params.baseUrl=''] 
     * @param {Boolean} [params.TRACE=false] Log debug messages.
     */
    init: init,
    /**
     * Load the given LoadRequest and call the callback when ready.
     * @static
     * @method
     * @param {LoadRequest} loadRequest An instance of LoadRequest with the obj
     *  and mtl files that you want to load.
     * @param {Function} onComplete called when all the OBJs have been 
     *  loaded. The loadRequest instance will now contain the objects you 
     *  requested.
     */
    load: load,
    LoadRequest: LoadRequest,
  };

}());
