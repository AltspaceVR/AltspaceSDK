//Synchronize position/rotation of distributed Three.js objects using Firebase.
altspace.utilities = altspace.utilities || {};
altspace.utilities.threebase = (function(){

	var syncInstance;
	var TRACE;

	var keyForLocalUuid = {};
	var objectInfoForKey = {};
	var DEFAULT_SYNC_EVERY = 100;
	var PRECISION_DIGITS = 2;

	function init(mySyncInstance, params){
		syncInstance = mySyncInstance;
		var p = params || {};
		TRACE = p.TRACE || false;
	}

	function add(object3d, params){
		validateAdd(object3d, params);
		var key = object3d.name;
		if (TRACE) console.log('threebase: adding object ' + key, object3d)
		objectInfo = {
			object: object3d,
			key: key,
			params: params,
			lastSaveAt: null,
			lastSaveData: null,
			lastSyncAt: null,
		};
		objectInfoForKey[key] = objectInfo;
		keyForLocalUuid[object3d.uuid] = key;
		syncInstance.child(key).on('value', function(snapshot){
			var data = snapshot.val();
			var key = snapshot.key();
			var objectInfo = objectInfoForKey[key];
			if (data){
				validateData(key, data);
				if (TRACE) console.log('threebase: SYNC data for ' + key, data);
				var target = objectInfoForKey[key].object;
				if (data.position){
					target.position.set(data.position.x, data.position.y, data.position.z);
				}
				if (data.rotation){
					target.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
				}
				objectInfo.lastSyncAt = Date.now();
			} else {
				save(objectInfo.object);//We are first to create this object, save it.
			}
		});
	}

	function save(object3d){
		validateSave(object3d);
		var key = keyForLocalUuid[object3d.uuid];
		var objectInfo = objectInfoForKey[key];
		var p = objectInfo.params || {};
		var savePosition = p.position === undefined || p.position;
		var saveRotation = p.rotation === undefined || p.rotation;
		var data = {};
		if (savePosition) data.position = {
			'x': object3d.position.x,
			'y': object3d.position.y,
			'z': object3d.position.z,
		};
		if (saveRotation) data.rotation = {
			'x': object3d.rotation.x,
			'y': object3d.rotation.y,
			'z': object3d.rotation.z,
		};
		//Only save if values have changes since last save.
		if (dataDiffers(objectInfo.lastSaveData, data)){
			objectInfo.lastSaveData = data;
			objectInfo.lastSaveAt = Date.now();
			if (TRACE) console.log('threebase: SAVE data for ' + key, data);
			syncInstance.child(key).set(data, function(error){
				if (error){
					console.error('threebase: SAVE failed', error);
				}
			});
		}
	}

	function update(){
		var keys = Object.keys(objectInfoForKey);
		for(var i=0; i < keys.length; i++){
			var objectInfo = objectInfoForKey[keys[i]];
			if (!objectInfo.lastSyncAt){
				continue;//Wait until initial sync before updating.
			}
			var lastSaveAt = objectInfo.lastSaveAt;
			var p = objectInfo.p || {};
			var autoSyncEvery = p.autoSyncEvery || DEFAULT_SYNC_EVERY;
			if (lastSaveAt && (Date.now() - lastSaveAt < autoSyncEvery)){
				continue;//Wait until per-object interval has elapsed.
			}	
			save(objectInfo.object);	
		}
	}

	function dataDiffers(data1, data2){
		var roundXYZ = function(triple){
			triple.x = Number(triple.x.toFixed(PRECISION_DIGITS));	
			triple.y = Number(triple.y.toFixed(PRECISION_DIGITS));	
			triple.z = Number(triple.z.toFixed(PRECISION_DIGITS));	
			return triple;
		};
		var diffXYZ = function(triple1, triple2){
			var t1 = roundXYZ(triple1);
			var t2 = roundXYZ(triple2);
			return t1.x !== t2.x || t1.y !== t2.y || t1.z !== t2.z;
		};
		if (!data1){
			return true;
		}
		var diffPosition = data1.position && diffXYZ(data1.position, data2.position);
		var diffRotation = data1.rotation && diffXYZ(data1.rotation, data2.rotation);
		return diffPosition || diffRotation;
	}

	//LOTS of validation, since errors in callbacks are really hard to track down.

	function validateAdd(object3d, params){
		var key = object3d.name;
		if (!syncInstance){
			die('threebase: must init() before adding objects');
		}
		if (!object3d instanceof THREE.Object3D){
			die('threebase: cannot add, not a THREE.Object3d', object3d);
		}
		if (!key){
			die('threebase: object.name must be set to a unique key for object', object3d);
		}
		if (objectInfoForKey[key]){
			die('threebase: key (object.name) '+ key +' already in use for another object');
		}
		if (params){
		    if (typeof(params) !== 'object'){
				die('threebase: params passed to add is not an object', params);
			}
			if (params.position && typeof(params.position) !== 'boolean'){
				die('threebase: params[\'position\'] is not a boolean', params.position);
			}
			if (params.rotation && typeof(params.rotation) !== 'boolean'){
				die('threebase: params[\'rotation\'] is not a boolean', params.rotation);
			}
			if (params.autoSyncEvery){
				var ase = params.autoSyncEvery;
				if (typeof(ase) !== 'number'){
					die('threebase: params[\'autoSyncEvery\'] is not a number', ase);
				}
				if (ase < 0 ){
					die('threebase: params[\'autoSyncEvery\'] cannot be negative', ase);
				}
			}
		}
	}

	function validateSave(object3d){
		if (!object3d instanceof THREE.Object3D){
			die('threebase: cannot save, not a THREE.Object3d', object3d);
		}
		if (!keyForLocalUuid[object3d.uuid]){
			die('threebase: cannot save, object not yet added locally', object3d);
		}
	}

	function validateData(key, data){
		var position = data.position;
		var rotation = data.rotation;
		if (typeof(key) !== 'string'){
			die('threebase: data[\'key\'] is not a string', key);
		} 
		if (!objectInfoForKey[key]){
			die('threebase: no object found for data[\'key\']', key);
		}
		if (position){
			if (position.x === undefined || position.y === undefined || position.z === undefined){
				die('threebase: data[\'position\'] is not an x,y,z triple', position);
			} 
		}
		if (rotation){
			if (rotation.x === undefined || rotation.y === undefined || rotation.z === undefined){
				die('threebase: data[\'rotation\'] is not an x,y,z triple', rotation);
			} 
		} 
	}

	function die(message){
		throw new Error(message);
	}

	return {
		init: init,
		add: add,
		save: save,
		update: update,
	};


}());
