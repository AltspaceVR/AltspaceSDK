'use strict';

var loader;
var TRACE;
var baseUrl = '';
var crossOrigin = '';//assigned to THREE.MTLLoader.crossOrigin

class LoadRequest {
	//To create loadRequst: new MultiLoader.LoadRequest()
	constructor(){
		this.objUrls = [];//Paths to model geometry file, in Wavefront OBJ format.
		this.mtlUrls = [];//Paths to model materials file, in Wavefront MTL format.
		this.objects = [];//objects[i] is result of loader.load(objUrl[i], mtlUrl[i])
		this.error = null;//String indicating loading error with at least one file.
		this.objectsLoaded = 0;//Used internally to determine when loading complete.
	}
}//end of LoadRequest

function init(params){
	var p = params || {};
	TRACE = p.TRACE || false;
	if (p.crossOrigin) crossOrigin = p.crossOrigin;
	if (p.baseUrl) baseUrl = p.baseUrl;
	if (baseUrl.slice(-1) !== '/') baseUrl += '/';

	loader = new altspace.utilities.shims.OBJMTLLoader();
	loader.crossOrigin = crossOrigin;
	if (TRACE) console.log('MultiLoader initialized with params', params);
}

function load(loadRequest, onComplete){
	var req = loadRequest;
	var start = Date.now();
	if (!req || !(req instanceof LoadRequest)){
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

export { init, load, LoadRequest };
