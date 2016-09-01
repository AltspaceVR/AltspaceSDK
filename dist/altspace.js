
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["three"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('three'));
  } else {
    root.altspace = factory(root.THREE);
  }
}(this, function(THREE) {

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":4}],2:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],3:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":1}],4:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":5}],5:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],6:[function(require,module,exports){
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
},{"babel-runtime/helpers/class-call-check":2,"babel-runtime/helpers/create-class":3}]},{},[6]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
/**
 * lodash 4.1.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @returns {Object} Returns the new hash object.
 */
function Hash() {}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(hash, key) {
  return hashHas(hash, key) && delete hash[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(hash, key) {
  if (nativeCreate) {
    var result = hash[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(hash, key) {
  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function hashSet(hash, key, value) {
  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
}

// Avoid inheriting from `Object.prototype` when possible.
Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function MapCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': Map ? new Map : [],
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapDelete(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapGet(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.get(key) : assocGet(data.map, key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapHas(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.has(key) : assocHas(data.map, key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapSet(key, value) {
  var data = this.__data__;
  if (isKeyable(key)) {
    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
  } else if (Map) {
    data.map.set(key, value);
  } else {
    assocSet(data.map, key, value);
  }
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapClear;
MapCache.prototype['delete'] = mapDelete;
MapCache.prototype.get = mapGet;
MapCache.prototype.has = mapHas;
MapCache.prototype.set = mapSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function Stack(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = { 'array': [], 'map': null };
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocDelete(array, key) : data.map['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocGet(array, key) : data.map.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocHas(array, key) : data.map.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__,
      array = data.array;

  if (array) {
    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
      assocSet(array, key, value);
    } else {
      data.array = null;
      data.map = new MapCache(array);
    }
  }
  var map = data.map;
  if (map) {
    map.set(key, value);
  }
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Removes `key` and its value from the associative array.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function assocDelete(array, key) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = array.length - 1;
  if (index == lastIndex) {
    array.pop();
  } else {
    splice.call(array, index, 1);
  }
  return true;
}

/**
 * Gets the associative array value for `key`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function assocGet(array, key) {
  var index = assocIndexOf(array, key);
  return index < 0 ? undefined : array[index][1];
}

/**
 * Checks if an associative array value for `key` exists.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function assocHas(array, key) {
  return assocIndexOf(array, key) > -1;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * Sets the associative array `key` to `value`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function assocSet(array, key, value) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    array.push([key, value]);
  } else {
    array[index][1] = value;
  }
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'number' || type == 'boolean' ||
    (type == 'string' && value != '__proto__') || value == null;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (!isObject(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = Stack;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
/**
 * lodash 4.1.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var Stack = require('lodash._stack'),
    keys = require('lodash.keys'),
    root = require('lodash._root');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to an array.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the converted array.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Converts `set` to an array.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the converted array.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetPrototype = Object.getPrototypeOf;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = DataView ? (DataView + '') : '',
    mapCtorString = Map ? funcToString.call(Map) : '',
    promiseCtorString = Promise ? funcToString.call(Promise) : '',
    setCtorString = Set ? funcToString.call(Set) : '',
    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return hasOwnProperty.call(object, key) ||
    (typeof object == 'object' && key in object && getPrototype(object) === null);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var index = -1,
      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(array, other);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isUnordered) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue ||
              equalFunc(arrValue, othValue, customizer, bitmask, stack);
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and
      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
      // not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object) ? other != +other : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;
      stack.set(object, other);

      // Recursively compare objects (susceptible to call stack limits).
      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : baseHas(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Gets the `[[Prototype]]` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {null|Object} Returns the `[[Prototype]]`.
 */
function getPrototype(value) {
  return nativeGetPrototype(Object(value));
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  return objectToString.call(value);
}

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : null,
        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are **not** supported.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent,
 *  else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(funcToString.call(value));
  }
  return isObjectLike(value) &&
    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = isEqual;

},{"lodash._root":1,"lodash._stack":2,"lodash.keys":4}],4:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    stringTag = '[object String]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetPrototype = Object.getPrototypeOf,
    nativeKeys = Object.keys;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return hasOwnProperty.call(object, key) ||
    (typeof object == 'object' && key in object && getPrototype(object) === null);
}

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a
 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
 * Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Gets the `[[Prototype]]` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {null|Object} Returns the `[[Prototype]]`.
 */
function getPrototype(value) {
  return nativeGetPrototype(Object(value));
}

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{}],5:[function(require,module,exports){
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The Object3DSync behavior syncs an object's transform and data.  
 * **Note:** Object3DSync must be used in conjunction with 
 * [SceneSync]{@link module:altspace/utilities/behaviors.SceneSync}
 *
 * @class Object3DSync
 * @param {Object} [config]
 * @param {Boolean} [config.position=false] Whether object's position should
 *  be synced
 * @param {Boolean} [config.rotation=false] Whether object's rotation should
 *  be synced
 * @param {Boolean} [config.scale=false] Whether object's scale should
 *  be synced
 * @param {Boolean} [config.auto=false] Whether the object should be synced 
 *  automatically. Not currently recommended.
 * @param {Boolean} [config.world=false] Whether world coordiantes should
 *  be sent when synchronizing position and rotation, instead of the
 *  transformation relative to the object's parent.  Use if synced object
 *  is a child (e.g. of the tracking skeleton) only in the sender scene.
 * @memberof module:altspace/utilities/behaviors
 **/
window.altspace.utilities.behaviors.Object3DSync = function (config){
	config = config || {};
	/*if (config.position === undefined) config.position = true;
	if (config.rotation === undefined) config.rotation = true;
	if (config.scale === undefined) config.scale = true; */
	var object3d;
	var scene;
	var ref;
	var key;
	var dataRef;
	var ownerRef;
	var transformRef;

	var sceneSync;
	var isMine = false;

	var position = new THREE.Vector3();
	var quaternion = new THREE.Quaternion(); 
	var scale = new THREE.Vector3();
	var isEqual = require('lodash.isequal');


	function link(objectRef, sS) {
		ref = objectRef;
		key = ref.key();
		transformRef = ref.child('batch');
		dataRef = ref.child('data');
		ownerRef = ref.child('owner');
		sceneSync = sS;
	}

	//TODO: lerp
	function setupReceive() {
		transformRef.on('value', function (snapshot) {

			if (isMine) return;

			var value = snapshot.val();
			if (!value) return;

			if (config.position) {
				object3d.position.set(value.position.x, value.position.y, value.position.z);
			}
			if (config.rotation) {
				object3d.quaternion.set(value.quaternion.x, value.quaternion.y, value.quaternion.z, value.quaternion.w);
			}
			if (config.scale) {
				object3d.scale.set(value.scale.x, value.scale.y, value.scale.z);
			}
		});

		ownerRef.on('value', function (snapshot) {
			var newOwnerId = snapshot.val();

			var gained = newOwnerId === sceneSync.clientId && !isMine;
			if (gained) object3d.dispatchEvent({ type: 'ownershipgained' });

			var lost = newOwnerId !== sceneSync.clientId && isMine;
			if (lost) object3d.dispatchEvent({ type: 'ownershiplost' });
			
			isMine = newOwnerId === sceneSync.clientId;
		});
	}

	function send() {
		if (!isMine) return;

		var transform = {};
		if (config.world) {
			object3d.updateMatrixWorld();//call before sending to avoid being a frame behind
			object3d.matrixWorld.decompose(position, quaternion, scale); 
		} else {
			position = object3d.position;
			quaternion = object3d.quaternion;
			scale = object3d.scale;
		}
		if (config.position) {
			transform.position = {
				x: position.x,
				y: position.y,
				z: position.z
			};
		}
		if (config.rotation) {
			transform.quaternion = {
				x: quaternion.x,
				y: quaternion.y,
				z: quaternion.z,
				w: quaternion.w
			};
		}
		if (config.scale) {
			transform.scale = {
				x: scale.x,
				y: scale.y,
				z: scale.z
			};
		}
		if (Object.keys(transform).length > 0) {
			if (isEqual(transform, this.lastTransform)) { return; }
			transformRef.set(transform);
			this.lastTransform = transform;
		}
	}

	function awake(o, s) {
		object3d = o;
		scene = s;

		setupReceive();
	}

	function update(deltaTime) {
		
	}

	/**
	 * Take ownership of this object. The client that instantiates an object owns it,
	 * afterwards changes in ownership must be managed by the app. Manual modifications
	 * to the Firebase ref's will not obey ownership status.
	 * @instance
	 * @method takeOwnership
	 * @memberof module:altspace/utilities/behaviors.Object3DSync
	 */
	function takeOwnership() {
		ownerRef.set(sceneSync.clientId);
	}

	var exports = { awake: awake, update: update, type: 'Object3DSync', link: link, autoSend: send, takeOwnership: takeOwnership };

	/**
	 * Firebase reference for the 'data' child location, can be used to store data related to
	 * this object.
	 * @readonly
	 * @instance
	 * @member {Firebase} dataRef
	 * @memberof module:altspace/utilities/behaviors.Object3DSync
	 */
	Object.defineProperty(exports, 'dataRef', {
		get: function () {
			return dataRef;
		}
	});

	/**
	 * True if this object is currently owned by this client, false otherwise.
	 * @readonly
	 * @instance
	 * @member {boolean} isMine
	 * @memberof module:altspace/utilities/behaviors.Object3DSync
	 */
	Object.defineProperty(exports, 'isMine', {
		get: function () {
			return isMine;
		}
	});

	return exports;
};

//manual modifications to the ref's will not obey ownership status.

},{"lodash.isequal":3}]},{},[5]);

/*!Please JS v0.4.2, Jordan Checkman 2014, Checkman.io, MIT License, Have fun.*/
!function(e,r,a){"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?module.exports=a():r[e]=a()}("Please",this,function(){"use strict";function e(){function e(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),Math.floor(o()*(r-e+1))+e}function r(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),o()*(r-e)+e}function a(e,r,a){return Math.max(r,Math.min(e,a))}function o(e,r){var a;switch(e){case"hex":for(a=0;a<r.length;a++)r[a]=F.HSV_to_HEX(r[a]);break;case"rgb":for(a=0;a<r.length;a++)r[a]=F.HSV_to_RGB(r[a]);break;case"rgb-string":for(a=0;a<r.length;a++){var o=F.HSV_to_RGB(r[a]);r[a]="rgb("+o.r+","+o.g+","+o.b+")"}break;case"hsv":break;default:console.error("Format not recognized.")}return r}function n(e){var r=F.HSV_to_RGB(e),a=(299*r.r+587*r.g+114*r.b)/1e3;return a>=128?"dark":"light"}function t(e){var r={};for(var a in e)e.hasOwnProperty(a)&&(r[a]=e[a]);return r}function l(e){function r(){o=(o+1)%256,n=(n+a[o])%256;var e=a[o];return a[o]=a[n],a[n]=e,a[(a[o]+a[n])%256]}for(var a=[],o=0,n=0,t=0;256>t;t++)a[t]=t;for(var l=0,F=0;256>l;l++){F=(F+a[l]+e.charCodeAt(l%e.length))%256;var s=a[l];a[l]=a[F],a[F]=s}this.random=function(){for(var e=0,a=0,o=1;8>e;e++)a+=r()*o,o*=256;return a/0x10000000000000000}}var F={},s={aliceblue:"F0F8FF",antiquewhite:"FAEBD7",aqua:"00FFFF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000000",blanchedalmond:"FFEBCD",blue:"0000FF",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",crimson:"DC143C",cyan:"00FFFF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgrey:"A9A9A9",darkgreen:"006400",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkslategrey:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dimgrey:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",fuchsia:"FF00FF",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",grey:"808080",green:"008000",greenyellow:"ADFF2F",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgray:"D3D3D3",lightgrey:"D3D3D3",lightgreen:"90EE90",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",lightskyblue:"87CEFA",lightslategray:"778899",lightslategrey:"778899",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"00FF00",limegreen:"32CD32",linen:"FAF0E6",magenta:"FF00FF",maroon:"800000",mediumaquamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370D8",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",olive:"808000",olivedrab:"6B8E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"98FB98",paleturquoise:"AFEEEE",palevioletred:"D87093",papayawhip:"FFEFD5",peachpuff:"FFDAB9",peru:"CD853F",pink:"FFC0CB",plum:"DDA0DD",powderblue:"B0E0E6",purple:"800080",rebeccapurple:"663399",red:"FF0000",rosybrown:"BC8F8F",royalblue:"4169E1",saddlebrown:"8B4513",salmon:"FA8072",sandybrown:"F4A460",seagreen:"2E8B57",seashell:"FFF5EE",sienna:"A0522D",silver:"C0C0C0",skyblue:"87CEEB",slateblue:"6A5ACD",slategray:"708090",slategrey:"708090",snow:"FFFAFA",springgreen:"00FF7F",steelblue:"4682B4",tan:"D2B48C",teal:"008080",thistle:"D8BFD8",tomato:"FF6347",turquoise:"40E0D0",violet:"EE82EE",wheat:"F5DEB3",white:"FFFFFF",whitesmoke:"F5F5F5",yellow:"FFFF00",yellowgreen:"9ACD32"},i=.618033988749895,u={hue:null,saturation:null,value:null,base_color:"",greyscale:!1,grayscale:!1,golden:!0,full_random:!1,colors_returned:1,format:"hex",seed:null},c={scheme_type:"analogous",format:"hex"},h={golden:!1,format:"hex"};return F.NAME_to_HEX=function(e){return e=e.toLowerCase(),e in s?s[e]:(console.error("Color name not recognized."),void 0)},F.NAME_to_RGB=function(e){return F.HEX_to_RGB(F.NAME_to_HEX(e))},F.NAME_to_HSV=function(e){return F.HEX_to_HSV(F.NAME_to_HEX(e))},F.HEX_to_RGB=function(e){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(r,function(e,r,a,o){return r+r+a+a+o+o});var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return a?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null},F.RGB_to_HEX=function(e){return"#"+((1<<24)+(e.r<<16)+(e.g<<8)+e.b).toString(16).slice(1)},F.HSV_to_RGB=function(e){var r,a,o,n,t,l,F,s,i=e.h,u=e.s,c=e.v;if(0===u)return{r:c,g:c,b:c};switch(i/=60,n=Math.floor(i),t=i-n,l=c*(1-u),F=c*(1-u*t),s=c*(1-u*(1-t)),n){case 0:r=c,a=s,o=l;break;case 1:r=F,a=c,o=l;break;case 2:r=l,a=c,o=s;break;case 3:r=l,a=F,o=c;break;case 4:r=s,a=l,o=c;break;case 5:r=c,a=l,o=F}return{r:Math.floor(255*r),g:Math.floor(255*a),b:Math.floor(255*o)}},F.RGB_to_HSV=function(e){var r=e.r/255,a=e.g/255,o=e.b/255,n=0,t=0,l=0,F=Math.min(r,Math.min(a,o)),s=Math.max(r,Math.max(a,o));if(F===s)return l=F,{h:0,s:0,v:l};var i=r===F?a-o:o===F?r-a:o-r,u=r===F?3:o===F?1:5;return n=60*(u-i/(s-F)),t=(s-F)/s,l=s,{h:n,s:t,v:l}},F.HSV_to_HEX=function(e){return F.RGB_to_HEX(F.HSV_to_RGB(e))},F.HEX_to_HSV=function(e){return F.RGB_to_HSV(F.HEX_to_RGB(e))},F.make_scheme=function(e,r){function n(e){return{h:e.h,s:e.s,v:e.v}}var l,F,s,i,u,h=t(c);if(null!==r)for(var d in r)r.hasOwnProperty(d)&&(h[d]=r[d]);var g=[e];switch(h.scheme_type.toLowerCase()){case"monochromatic":case"mono":for(u=1;2>=u;u++)l=n(e),s=l.s+.1*u,s=a(s,0,1),i=l.v+.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);for(u=1;2>=u;u++)l=n(e),s=l.s-.1*u,s=a(s,0,1),i=l.v-.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);break;case"complementary":case"complement":case"comp":l=n(e),l.h=(l.h+180)%360,g.push(l);break;case"split-complementary":case"split-complement":case"split":l=n(e),l.h=(l.h+165)%360,g.push(l),l=n(e),l.h=Math.abs((l.h-165)%360),g.push(l);break;case"double-complementary":case"double-complement":case"double":l=n(e),l.h=(l.h+180)%360,g.push(l),l.h=(l.h+30)%360,F=n(l),g.push(l),l.h=(l.h+180)%360,g.push(F);break;case"analogous":case"ana":for(u=1;5>=u;u++)l=n(e),l.h=(l.h+20*u)%360,g.push(l);break;case"triadic":case"triad":case"tri":for(u=1;3>u;u++)l=n(e),l.h=(l.h+120*u)%360,g.push(l);break;default:console.error("Color scheme not recognized.")}return o(h.format.toLowerCase(),g),g},F.make_color=function(n){var s=[],c=t(u),h=null;if(null!==n)for(var d in n)n.hasOwnProperty(d)&&(c[d]=n[d]);var g=null;"string"==typeof c.seed&&(g=new l(c.seed)),c.base_color.length>0&&(h=c.base_color.match(/^#?([0-9a-f]{3})([0-9a-f]{3})?$/i)?F.HEX_to_HSV(c.base_color):F.NAME_to_HSV(c.base_color));for(var m=0;m<c.colors_returned;m++){var f,E,b,p=e(0,360,g);null!==h?(f=a(e(h.h-5,h.h+5,g),0,360),E=0===h.s?0:r(.4,.85,g),b=r(.4,.85,g),s.push({h:f,s:E,v:b})):(f=c.greyscale===!0||c.grayscale===!0?0:c.golden===!0?(p+p/i)%360:null===c.hue||c.full_random===!0?p:a(c.hue,0,360),E=c.greyscale===!0||c.grayscale===!0?0:c.full_random===!0?r(0,1,g):null===c.saturation?.4:a(c.saturation,0,1),b=c.full_random===!0?r(0,1,g):c.greyscale===!0||c.grayscale===!0?r(.15,.75,g):null===c.value?.75:a(c.value,0,1),s.push({h:f,s:E,v:b}))}return o(c.format.toLowerCase(),s),s},F.make_contrast=function(e,r){var l=t(h);if(null!==r)for(var s in r)r.hasOwnProperty(s)&&(l[s]=r[s]);var u,c,d=n(e);if(l.golden===!0)c=e.h*(1+i)%360;else{var g=F.make_scheme(e,{scheme_type:"complementary",format:"hsv"})[1];c=a(g.h-30,0,360)}var m;return"dark"===d?m=a(e.v-.25,0,1):"light"===d&&(m=a(e.v+.25,0,1)),u=[{h:c,s:e.s,v:m}],o(l.format.toLowerCase(),u),u[0]},F}return e()});
/*!
 * Lightweight URL manipulation with JavaScript
 * This library is independent of any other libraries and has pretty simple interface
 * and lightweight code-base.
 * Some ideas of query string parsing had been taken from Jan Wolter
 * @see http://unixpapa.com/js/querystring.html
 * 
 * @license MIT
 * @author Mykhailo Stadnyk <mikhus@gmail.com>
 */
; var Url = (function() {
	"use strict";

	var
		// mapping between what we want and <a> element properties
		map = {
			protocol : 'protocol',
			host     : 'hostname',
			port     : 'port',
			path     : 'pathname',
			query    : 'search',
			hash     : 'hash'
		},

		/**
		 * default ports as defined by http://url.spec.whatwg.org/#default-port
		 * We need them to fix IE behavior, @see https://github.com/Mikhus/jsurl/issues/2
		 */
		defaultPorts = {
			"ftp"    : 21,
			"gopher" : 70,
			"http"   : 80,
			"https"  : 443,
			"ws"     : 80,
			"wss"    : 443
		},

		parse = function( self, url) {
			var
				d      = document,
				link   = d.createElement( 'a'),
				url    = url || d.location.href,
				auth   = url.match( /\/\/(.*?)(?::(.*?))?@/) || []
			;

			link.href = url;

			for (var i in map) {
				self[i] = link[map[i]] || '';
			}

			// fix-up some parts
			self.protocol = self.protocol.replace( /:$/, '');
			self.query    = self.query.replace( /^\?/, '');
			self.hash     = self.hash.replace( /^#/, '');
			self.user     = auth[1] || '';
			self.pass     = auth[2] || '';
			self.port     = (defaultPorts[self.protocol] == self.port || self.port == 0) ? '' : self.port; // IE fix, Android browser fix

			if (!self.protocol && !/^([a-z]+:)?\/\//.test( url)) { // is IE and path is relative
				var
					base     = new Url( d.location.href.match(/(.*\/)/)[0]),
					basePath = base.path.split( '/'),
					selfPath = self.path.split( '/')
				;

				basePath.pop();

				for (var i = 0, props = ['protocol','user','pass','host','port'], s = props.length; i < s; i++) {
					self[props[i]] = base[props[i]];
				}

				while (selfPath[0] == '..') { // skip all "../
					basePath.pop();
					selfPath.shift();
				}

				self.path = (url.substring(0, 1) != '/' ? basePath.join( '/') : '') + '/' + selfPath.join( '/');
			}

			else {
				// fix absolute URL's path in IE
				self.path = self.path.replace( /^\/?/, '/');
			}

			parseQs( self);
		},
		
		decode = function(s) {
			s = s.replace( /\+/g, ' ');

			s = s.replace( /%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi,
				function( code, hex1, hex2, hex3) {
					var
						n1 = parseInt( hex1, 16) - 0xE0,
						n2 = parseInt( hex2, 16) - 0x80
					;
	
					if (n1 == 0 && n2 < 32) {
						return code;
					}
	
					var
						n3 = parseInt( hex3, 16) - 0x80,
						n = (n1 << 12) + (n2 << 6) + n3
					;
	
					if (n > 0xFFFF) {
						return code;
					}
	
					return String.fromCharCode( n);
				}
			);

			s = s.replace( /%([cd][0-9a-f])%([89ab][0-9a-f])/gi,
				function( code, hex1, hex2) {
					var n1 = parseInt(hex1, 16) - 0xC0;
	
					if (n1 < 2) {
						return code;
					}
	
					var n2 = parseInt(hex2, 16) - 0x80;
	
					return String.fromCharCode( (n1 << 6) + n2);
				}
			);

			s = s.replace( /%([0-7][0-9a-f])/gi,
				function( code, hex) {
					return String.fromCharCode( parseInt(hex, 16));
				}
			);

			return s;
		},

		parseQs = function( self) {
			var qs = self.query;

			self.query = new (function( qs) {
				var re = /([^=&]+)(=([^&]*))?/g, match;

				while ((match = re.exec( qs))) {
					var
						key = decodeURIComponent(match[1].replace(/\+/g, ' ')),
						value = match[3] ? decode(match[3]) : ''
					;

					if (this[key] != null) {
						if (!(this[key] instanceof Array)) {
							this[key] = [this[key]];
						}

						this[key].push( value);
					}

					else {
						this[key] = value;
					}
				}

				this.clear = function() {
					for (key in this) {
						if (!(this[key] instanceof Function)) {
							delete this[key];
						}
					}
				};

				this.toString = function() {
					var
						s = '',
						e = encodeURIComponent
					;

					for (var i in this) {
						if (this[i] instanceof Function) {
							continue;
						}

						if (this[i] instanceof Array) {
							var len = this[i].length;

							if (len) {
								for (var ii = 0; ii < len; ii++) {
									s += s ? '&' : '';
									s += e( i) + '=' + e( this[i][ii]);
								}
							}

							else { // parameter is an empty array, so treat as an empty argument
								s += (s ? '&' : '') + e( i) + '=';
							}
						}

						else {
							s += s ? '&' : '';
							s += e( i) + '=' + e( this[i]);
						}
					}

					return s;
				};
			})( qs);
		}
	;

	return function( url) {
		this.toString = function() {
			return (
				(this.protocol && (this.protocol + '://')) +
				(this.user && (this.user + (this.pass && (':' + this.pass)) + '@')) +
				(this.host && this.host) +
				(this.port && (':' + this.port)) +
				(this.path && this.path) +
				(this.query.toString() && ('?' + this.query)) +
				(this.hash && ('#' + this.hash))
			);
		};

		parse( this, url);
	};
}());

/*! @license Firebase v2.2.9
    License: https://www.firebase.com/terms/terms-of-service.html */
(function() {var g,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.vb=function(){return a.uf?a.uf:a.uf=new a}}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}var la=Date.now||function(){return+new Date};
function ma(a,b){function c(){}c.prototype=b.prototype;a.$g=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Wg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function r(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function na(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function oa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function pa(a){var b=0,c;for(c in a)b++;return b}function qa(a){for(var b in a)return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function sa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ta(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function ua(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function va(a,b){var c=ua(a,b,void 0);return c&&a[c]}function wa(a){for(var b in a)return!1;return!0}function xa(a){var b={},c;for(c in a)b[c]=a[c];return b}var ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function za(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ya.length;f++)c=ya[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function Aa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Ba(){this.Sd=void 0}
function Ca(a,b,c){switch(typeof b){case "string":Da(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ca(a,a.Sd?a.Sd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Da(f,c),
c.push(":"),Ca(a,a.Sd?a.Sd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Ea={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Fa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function Da(a,b){b.push('"',a.replace(Fa,function(a){if(a in Ea)return Ea[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Ea[a]=e+b.toString(16)}),'"')};function Ga(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^la()).toString(36)};var Ha;a:{var Ia=aa.navigator;if(Ia){var Ja=Ia.userAgent;if(Ja){Ha=Ja;break a}}Ha=""};function Ka(){this.Wa=-1};function La(){this.Wa=-1;this.Wa=64;this.P=[];this.ne=[];this.Uf=[];this.Ld=[];this.Ld[0]=128;for(var a=1;a<this.Wa;++a)this.Ld[a]=0;this.ee=this.ac=0;this.reset()}ma(La,Ka);La.prototype.reset=function(){this.P[0]=1732584193;this.P[1]=4023233417;this.P[2]=2562383102;this.P[3]=271733878;this.P[4]=3285377520;this.ee=this.ac=0};
function Ma(a,b,c){c||(c=0);var d=a.Uf;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.P[0];c=a.P[1];for(var h=a.P[2],k=a.P[3],l=a.P[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),m=1518500249):(f=c^h^k,m=1859775393):60>e?(f=c&h|k&(c|h),m=2400959708):(f=c^h^k,m=3395469782),f=(b<<
5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.P[0]=a.P[0]+b&4294967295;a.P[1]=a.P[1]+c&4294967295;a.P[2]=a.P[2]+h&4294967295;a.P[3]=a.P[3]+k&4294967295;a.P[4]=a.P[4]+l&4294967295}
La.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Wa,d=0,e=this.ne,f=this.ac;d<b;){if(0==f)for(;d<=c;)Ma(this,a,d),d+=this.Wa;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Wa){Ma(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Wa){Ma(this,e);f=0;break}}this.ac=f;this.ee+=b}};var u=Array.prototype,Na=u.indexOf?function(a,b,c){return u.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Oa=u.forEach?function(a,b,c){u.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Pa=u.filter?function(a,b,c){return u.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=p(a)?
a.split(""):a,k=0;k<d;k++)if(k in h){var l=h[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},Qa=u.map?function(a,b,c){return u.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ra=u.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return u.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Oa(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Sa=u.every?function(a,b,
c){return u.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ta(a,b){var c=Ua(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Ua(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Va(a,b){var c=Na(a,b);0<=c&&u.splice.call(a,c,1)}function Wa(a,b,c){return 2>=arguments.length?u.slice.call(a,b):u.slice.call(a,b,c)}
function Xa(a,b){a.sort(b||Ya)}function Ya(a,b){return a>b?1:a<b?-1:0};var Za=-1!=Ha.indexOf("Opera")||-1!=Ha.indexOf("OPR"),$a=-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE"),ab=-1!=Ha.indexOf("Gecko")&&-1==Ha.toLowerCase().indexOf("webkit")&&!(-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE")),bb=-1!=Ha.toLowerCase().indexOf("webkit");
(function(){var a="",b;if(Za&&aa.opera)return a=aa.opera.version,ha(a)?a():a;ab?b=/rv\:([^\);]+)(\)|;)/:$a?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:bb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(Ha))?a[1]:"");return $a&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var cb=null,db=null,eb=null;function fb(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");gb();for(var c=b?db:cb,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,l=e+2<a.length,m=l?a[e+2]:0,t=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|m>>6,m=m&63;l||(m=64,h||(k=64));d.push(c[t],c[f],c[k],c[m])}return d.join("")}
function gb(){if(!cb){cb={};db={};eb={};for(var a=0;65>a;a++)cb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),db[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),eb[db[a]]=a,62<=a&&(eb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};var hb=hb||"2.2.9";function v(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function w(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function ib(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function jb(a){var b={};ib(a,function(a,d){b[a]=d});return b};function kb(a){var b=[];ib(a,function(a,d){ea(d)?Oa(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function lb(a){var b={};a=a.replace(/^\?/,"").split("&");Oa(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function z(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
function A(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(z(a,b,d)+"must be a valid function.");}function mb(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(z(a,b,!0)+"must be a valid context object.");};function nb(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):Aa(a)}function B(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ca(new Ba,a,b);a=b.join("")}return a};function ob(){this.Wd=C}ob.prototype.j=function(a){return this.Wd.Y(a)};ob.prototype.toString=function(){return this.Wd.toString()};function pb(){}pb.prototype.qf=function(){return null};pb.prototype.ze=function(){return null};var qb=new pb;function rb(a,b,c){this.Rf=a;this.Ka=b;this.Kd=c}rb.prototype.qf=function(a){var b=this.Ka.Q;if(sb(b,a))return b.j().J(a);b=null!=this.Kd?new tb(this.Kd,!0,!1):this.Ka.C();return this.Rf.xc(a,b)};rb.prototype.ze=function(a,b,c){var d=null!=this.Kd?this.Kd:ub(this.Ka);a=this.Rf.oe(d,b,1,c,a);return 0===a.length?null:a[0]};function vb(){this.ub=[]}function wb(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Zb();null===c||f.ca(c.Zb())||(a.ub.push(c),c=null);null===c&&(c=new xb(f));c.add(e)}c&&a.ub.push(c)}function yb(a,b,c){wb(a,c);zb(a,function(a){return a.ca(b)})}function Ab(a,b,c){wb(a,c);zb(a,function(a){return a.contains(b)||b.contains(a)})}
function zb(a,b){for(var c=!0,d=0;d<a.ub.length;d++){var e=a.ub[d];if(e)if(e=e.Zb(),b(e)){for(var e=a.ub[d],f=0;f<e.vd.length;f++){var h=e.vd[f];if(null!==h){e.vd[f]=null;var k=h.Vb();Bb&&Cb("event: "+h.toString());Db(k)}}a.ub[d]=null}else c=!1}c&&(a.ub=[])}function xb(a){this.ra=a;this.vd=[]}xb.prototype.add=function(a){this.vd.push(a)};xb.prototype.Zb=function(){return this.ra};function D(a,b,c,d){this.type=a;this.Ja=b;this.Xa=c;this.Le=d;this.Qd=void 0}function Eb(a){return new D(Fb,a)}var Fb="value";function Gb(a,b,c,d){this.ve=b;this.$d=c;this.Qd=d;this.ud=a}Gb.prototype.Zb=function(){var a=this.$d.mc();return"value"===this.ud?a.path:a.parent().path};Gb.prototype.Ae=function(){return this.ud};Gb.prototype.Vb=function(){return this.ve.Vb(this)};Gb.prototype.toString=function(){return this.Zb().toString()+":"+this.ud+":"+B(this.$d.mf())};function Hb(a,b,c){this.ve=a;this.error=b;this.path=c}Hb.prototype.Zb=function(){return this.path};Hb.prototype.Ae=function(){return"cancel"};
Hb.prototype.Vb=function(){return this.ve.Vb(this)};Hb.prototype.toString=function(){return this.path.toString()+":cancel"};function tb(a,b,c){this.w=a;this.ea=b;this.Ub=c}function Ib(a){return a.ea}function Jb(a,b){return b.e()?a.ea&&!a.Ub:sb(a,E(b))}function sb(a,b){return a.ea&&!a.Ub||a.w.Da(b)}tb.prototype.j=function(){return this.w};function Kb(a){this.eg=a;this.Dd=null}Kb.prototype.get=function(){var a=this.eg.get(),b=xa(a);if(this.Dd)for(var c in this.Dd)b[c]-=this.Dd[c];this.Dd=a;return b};function Lb(a,b){this.Nf={};this.fd=new Kb(a);this.ba=b;var c=1E4+2E4*Math.random();setTimeout(q(this.If,this),Math.floor(c))}Lb.prototype.If=function(){var a=this.fd.get(),b={},c=!1,d;for(d in a)0<a[d]&&v(this.Nf,d)&&(b[d]=a[d],c=!0);c&&this.ba.Ve(b);setTimeout(q(this.If,this),Math.floor(6E5*Math.random()))};function Mb(){this.Ec={}}function Nb(a,b,c){n(c)||(c=1);v(a.Ec,b)||(a.Ec[b]=0);a.Ec[b]+=c}Mb.prototype.get=function(){return xa(this.Ec)};var Ob={},Pb={};function Qb(a){a=a.toString();Ob[a]||(Ob[a]=new Mb);return Ob[a]}function Rb(a,b){var c=a.toString();Pb[c]||(Pb[c]=b());return Pb[c]};function F(a,b){this.name=a;this.S=b}function Sb(a,b){return new F(a,b)};function Tb(a,b){return Ub(a.name,b.name)}function Vb(a,b){return Ub(a,b)};function Wb(a,b,c){this.type=Xb;this.source=a;this.path=b;this.Ga=c}Wb.prototype.Xc=function(a){return this.path.e()?new Wb(this.source,G,this.Ga.J(a)):new Wb(this.source,H(this.path),this.Ga)};Wb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ga.toString()+")"};function Yb(a,b){this.type=Zb;this.source=a;this.path=b}Yb.prototype.Xc=function(){return this.path.e()?new Yb(this.source,G):new Yb(this.source,H(this.path))};Yb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function $b(a,b){this.La=a;this.wa=b?b:ac}g=$b.prototype;g.Oa=function(a,b){return new $b(this.La,this.wa.Oa(a,b,this.La).X(null,null,!1,null,null))};g.remove=function(a){return new $b(this.La,this.wa.remove(a,this.La).X(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.wa;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function bc(a,b){for(var c,d=a.wa,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.wa.e()};g.count=function(){return this.wa.count()};g.Sc=function(){return this.wa.Sc()};g.fc=function(){return this.wa.fc()};g.ia=function(a){return this.wa.ia(a)};
g.Xb=function(a){return new cc(this.wa,null,this.La,!1,a)};g.Yb=function(a,b){return new cc(this.wa,a,this.La,!1,b)};g.$b=function(a,b){return new cc(this.wa,a,this.La,!0,b)};g.sf=function(a){return new cc(this.wa,null,this.La,!0,a)};function cc(a,b,c,d,e){this.Ud=e||null;this.Ge=d;this.Qa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.Ge?a.left:a.right;else if(0===e){this.Qa.push(a);break}else this.Qa.push(a),a=this.Ge?a.right:a.left}
function J(a){if(0===a.Qa.length)return null;var b=a.Qa.pop(),c;c=a.Ud?a.Ud(b.key,b.value):{key:b.key,value:b.value};if(a.Ge)for(b=b.left;!b.e();)a.Qa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Qa.push(b),b=b.left;return c}function dc(a){if(0===a.Qa.length)return null;var b;b=a.Qa;b=b[b.length-1];return a.Ud?a.Ud(b.key,b.value):{key:b.key,value:b.value}}function ec(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:ac;this.right=null!=e?e:ac}g=ec.prototype;
g.X=function(a,b,c,d,e){return new ec(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ia=function(a){return this.left.ia(a)||a(this.key,this.value)||this.right.ia(a)};function fc(a){return a.left.e()?a:fc(a.left)}g.Sc=function(){return fc(this).key};g.fc=function(){return this.right.e()?this.key:this.right.fc()};
g.Oa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.X(null,null,null,e.left.Oa(a,b,c),null):0===d?e.X(null,b,null,null,null):e.X(null,null,null,null,e.right.Oa(a,b,c));return gc(e)};function hc(a){if(a.left.e())return ac;a.left.fa()||a.left.left.fa()||(a=ic(a));a=a.X(null,null,null,hc(a.left),null);return gc(a)}
g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=ic(c)),c=c.X(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=jc(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=kc(c),c.left.left.fa()&&(c=jc(c),c=kc(c)));if(0===b(a,c.key)){if(c.right.e())return ac;d=fc(c.right);c=c.X(d.key,d.value,null,null,hc(c.right))}c=c.X(null,null,null,null,c.right.remove(a,b))}return gc(c)};g.fa=function(){return this.color};
function gc(a){a.right.fa()&&!a.left.fa()&&(a=lc(a));a.left.fa()&&a.left.left.fa()&&(a=jc(a));a.left.fa()&&a.right.fa()&&(a=kc(a));return a}function ic(a){a=kc(a);a.right.left.fa()&&(a=a.X(null,null,null,null,jc(a.right)),a=lc(a),a=kc(a));return a}function lc(a){return a.right.X(null,null,a.color,a.X(null,null,!0,null,a.right.left),null)}function jc(a){return a.left.X(null,null,a.color,null,a.X(null,null,!0,a.left.right,null))}
function kc(a){return a.X(null,null,!a.color,a.left.X(null,null,!a.left.color,null,null),a.right.X(null,null,!a.right.color,null,null))}function mc(){}g=mc.prototype;g.X=function(){return this};g.Oa=function(a,b){return new ec(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ia=function(){return!1};g.Sc=function(){return null};g.fc=function(){return null};g.fa=function(){return!1};var ac=new mc;function nc(a,b){return a&&"object"===typeof a?(K(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function oc(a,b){var c=new pc;qc(a,new L(""),function(a,e){c.nc(a,rc(e,b))});return c}function rc(a,b){var c=a.B().H(),c=nc(c,b),d;if(a.L()){var e=nc(a.Ca(),b);return e!==a.Ca()||c!==a.B().H()?new sc(e,M(c)):a}d=a;c!==a.B().H()&&(d=d.ga(new sc(c)));a.R(N,function(a,c){var e=rc(c,b);e!==c&&(d=d.O(a,e))});return d};function L(a,b){if(1==arguments.length){this.n=a.split("/");for(var c=0,d=0;d<this.n.length;d++)0<this.n[d].length&&(this.n[c]=this.n[d],c++);this.n.length=c;this.Z=0}else this.n=a,this.Z=b}function O(a,b){var c=E(a);if(null===c)return b;if(c===E(b))return O(H(a),H(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}function E(a){return a.Z>=a.n.length?null:a.n[a.Z]}function tc(a){return a.n.length-a.Z}
function H(a){var b=a.Z;b<a.n.length&&b++;return new L(a.n,b)}function uc(a){return a.Z<a.n.length?a.n[a.n.length-1]:null}g=L.prototype;g.toString=function(){for(var a="",b=this.Z;b<this.n.length;b++)""!==this.n[b]&&(a+="/"+this.n[b]);return a||"/"};g.slice=function(a){return this.n.slice(this.Z+(a||0))};g.parent=function(){if(this.Z>=this.n.length)return null;for(var a=[],b=this.Z;b<this.n.length-1;b++)a.push(this.n[b]);return new L(a,0)};
g.u=function(a){for(var b=[],c=this.Z;c<this.n.length;c++)b.push(this.n[c]);if(a instanceof L)for(c=a.Z;c<a.n.length;c++)b.push(a.n[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new L(b,0)};g.e=function(){return this.Z>=this.n.length};g.ca=function(a){if(tc(this)!==tc(a))return!1;for(var b=this.Z,c=a.Z;b<=this.n.length;b++,c++)if(this.n[b]!==a.n[c])return!1;return!0};
g.contains=function(a){var b=this.Z,c=a.Z;if(tc(this)>tc(a))return!1;for(;b<this.n.length;){if(this.n[b]!==a.n[c])return!1;++b;++c}return!0};var G=new L("");function vc(a,b){this.Ra=a.slice();this.Ha=Math.max(1,this.Ra.length);this.lf=b;for(var c=0;c<this.Ra.length;c++)this.Ha+=wc(this.Ra[c]);xc(this)}vc.prototype.push=function(a){0<this.Ra.length&&(this.Ha+=1);this.Ra.push(a);this.Ha+=wc(a);xc(this)};vc.prototype.pop=function(){var a=this.Ra.pop();this.Ha-=wc(a);0<this.Ra.length&&--this.Ha};
function xc(a){if(768<a.Ha)throw Error(a.lf+"has a key path longer than 768 bytes ("+a.Ha+").");if(32<a.Ra.length)throw Error(a.lf+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+yc(a));}function yc(a){return 0==a.Ra.length?"":"in property '"+a.Ra.join(".")+"'"};function zc(){this.wc={}}zc.prototype.set=function(a,b){null==b?delete this.wc[a]:this.wc[a]=b};zc.prototype.get=function(a){return v(this.wc,a)?this.wc[a]:null};zc.prototype.remove=function(a){delete this.wc[a]};zc.prototype.wf=!0;function Ac(a){this.Fc=a;this.Pd="firebase:"}g=Ac.prototype;g.set=function(a,b){null==b?this.Fc.removeItem(this.Pd+a):this.Fc.setItem(this.Pd+a,B(b))};g.get=function(a){a=this.Fc.getItem(this.Pd+a);return null==a?null:nb(a)};g.remove=function(a){this.Fc.removeItem(this.Pd+a)};g.wf=!1;g.toString=function(){return this.Fc.toString()};function Bc(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Ac(b)}}catch(c){}return new zc}var Cc=Bc("localStorage"),P=Bc("sessionStorage");function Dc(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.lb=b;this.Db=c;this.Ug=d;this.Od=e||"";this.Pa=Cc.get("host:"+a)||this.host}function Ec(a,b){b!==a.Pa&&(a.Pa=b,"s-"===a.Pa.substr(0,2)&&Cc.set("host:"+a.host,a.Pa))}Dc.prototype.toString=function(){var a=(this.lb?"https://":"http://")+this.host;this.Od&&(a+="<"+this.Od+">");return a};var Fc=function(){var a=1;return function(){return a++}}();function K(a,b){if(!a)throw Gc(b);}function Gc(a){return Error("Firebase ("+hb+") INTERNAL ASSERT FAILED: "+a)}
function Hc(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{gb();for(var c=eb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var l=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==l)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=l&&d.push(k<<6&192|l))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Wa(d,c,
c+8192));b=a}}return b}catch(m){Cb("base64Decode failed: ",m)}return null}function Ic(a){var b=Jc(a);a=new La;a.update(b);var b=[],c=8*a.ee;56>a.ac?a.update(a.Ld,56-a.ac):a.update(a.Ld,a.Wa-(a.ac-56));for(var d=a.Wa-1;56<=d;d--)a.ne[d]=c&255,c/=256;Ma(a,a.ne);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.P[d]>>e&255,++c;return fb(b)}
function Kc(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Kc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var Bb=null,Lc=!0;function Cb(a){!0===Lc&&(Lc=!1,null===Bb&&!0===P.get("logging_enabled")&&Mc(!0));if(Bb){var b=Kc.apply(null,arguments);Bb(b)}}function Nc(a){return function(){Cb(a,arguments)}}
function Oc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Kc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Pc(a){var b=Kc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function Q(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Kc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function Qc(a){var b="",c="",d="",e="",f=!0,h="https",k=443;if(p(a)){var l=a.indexOf("//");0<=l&&(h=a.substring(0,l-1),a=a.substring(l+2));l=a.indexOf("/");-1===l&&(l=a.length);b=a.substring(0,l);e="";a=a.substring(l).split("/");for(l=0;l<a.length;l++)if(0<a[l].length){var m=a[l];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(t){}e+="/"+m}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);l=b.indexOf(":");0<=l&&(f="https"===h||"wss"===h,k=b.substring(l+1),isFinite(k)&&
(k=String(k)),k=p(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,Rg:d,lb:f,scheme:h,$c:e}}function Rc(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
function Sc(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function Ub(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Tc(a),d=Tc(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function Uc(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
function Vc(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=Vc(a[b[d]]);return c+"}"}function Wc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function Xc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else r(a,b)}
function Yc(a){K(!Rc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}var Zc=/^-?\d{1,10}$/;function Tc(a){return Zc.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Db(a){try{a()}catch(b){setTimeout(function(){Q("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function R(a,b){if(ha(a)){var c=Array.prototype.slice.call(arguments,1).slice();Db(function(){a.apply(null,c)})}};function Jc(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,K(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function wc(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function $c(a){var b={},c={},d={},e="";try{var f=a.split("."),b=nb(Hc(f[0])||""),c=nb(Hc(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{Xg:b,Bc:c,data:d,Og:e}}function ad(a){a=$c(a).Bc;return"object"===typeof a&&a.hasOwnProperty("iat")?w(a,"iat"):null}function bd(a){a=$c(a);var b=a.Bc;return!!a.Og&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")};function cd(a){this.V=a;this.g=a.o.g}function dd(a,b,c,d){var e=[],f=[];Oa(b,function(b){"child_changed"===b.type&&a.g.Ad(b.Le,b.Ja)&&f.push(new D("child_moved",b.Ja,b.Xa))});ed(a,e,"child_removed",b,d,c);ed(a,e,"child_added",b,d,c);ed(a,e,"child_moved",f,d,c);ed(a,e,"child_changed",b,d,c);ed(a,e,Fb,b,d,c);return e}function ed(a,b,c,d,e,f){d=Pa(d,function(a){return a.type===c});Xa(d,q(a.fg,a));Oa(d,function(c){var d=fd(a,c,f);Oa(e,function(e){e.Kf(c.type)&&b.push(e.createEvent(d,a.V))})})}
function fd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Qd=c.rf(b.Xa,b.Ja,a.g));return b}cd.prototype.fg=function(a,b){if(null==a.Xa||null==b.Xa)throw Gc("Should only compare child_ events.");return this.g.compare(new F(a.Xa,a.Ja),new F(b.Xa,b.Ja))};function gd(){this.bb={}}
function hd(a,b){var c=b.type,d=b.Xa;K("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");K(".priority"!==d,"Only non-priority child changes can be tracked.");var e=w(a.bb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.bb[d]=new D("child_changed",b.Ja,d,e.Ja);else if("child_removed"==c&&"child_added"==f)delete a.bb[d];else if("child_removed"==c&&"child_changed"==f)a.bb[d]=new D("child_removed",e.Le,d);else if("child_changed"==c&&
"child_added"==f)a.bb[d]=new D("child_added",b.Ja,d);else if("child_changed"==c&&"child_changed"==f)a.bb[d]=new D("child_changed",b.Ja,d,e.Le);else throw Gc("Illegal combination of changes: "+b+" occurred after "+e);}else a.bb[d]=b};function id(a,b,c){this.Rb=a;this.qb=b;this.sb=c||null}g=id.prototype;g.Kf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.o.g;return new Gb("value",this,new S(a.Ja,b.mc(),c))};g.Vb=function(a){var b=this.sb;if("cancel"===a.Ae()){K(this.qb,"Raising a cancel event on a listener with no cancel callback");var c=this.qb;return function(){c.call(b,a.error)}}var d=this.Rb;return function(){d.call(b,a.$d)}};g.gf=function(a,b){return this.qb?new Hb(this,a,b):null};
g.matches=function(a){return a instanceof id?a.Rb&&this.Rb?a.Rb===this.Rb&&a.sb===this.sb:!0:!1};g.tf=function(){return null!==this.Rb};function jd(a,b,c){this.ha=a;this.qb=b;this.sb=c}g=jd.prototype;g.Kf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ha};g.gf=function(a,b){return this.qb?new Hb(this,a,b):null};
g.createEvent=function(a,b){K(null!=a.Xa,"Child events should have a childName.");var c=b.mc().u(a.Xa);return new Gb(a.type,this,new S(a.Ja,c,b.o.g),a.Qd)};g.Vb=function(a){var b=this.sb;if("cancel"===a.Ae()){K(this.qb,"Raising a cancel event on a listener with no cancel callback");var c=this.qb;return function(){c.call(b,a.error)}}var d=this.ha[a.ud];return function(){d.call(b,a.$d,a.Qd)}};
g.matches=function(a){if(a instanceof jd){if(!this.ha||!a.ha)return!0;if(this.sb===a.sb){var b=pa(a.ha);if(b===pa(this.ha)){if(1===b){var b=qa(a.ha),c=qa(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return oa(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};g.tf=function(){return null!==this.ha};function kd(a){this.g=a}g=kd.prototype;g.K=function(a,b,c,d,e,f){K(a.Jc(this.g),"A node must be indexed if only a child is updated");e=a.J(b);if(e.Y(d).ca(c.Y(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Da(b)?hd(f,new D("child_removed",e,b)):K(a.L(),"A child remove without an old child only makes sense on a leaf node"):e.e()?hd(f,new D("child_added",c,b)):hd(f,new D("child_changed",c,b,e)));return a.L()&&c.e()?a:a.O(b,c).mb(this.g)};
g.xa=function(a,b,c){null!=c&&(a.L()||a.R(N,function(a,e){b.Da(a)||hd(c,new D("child_removed",e,a))}),b.L()||b.R(N,function(b,e){if(a.Da(b)){var f=a.J(b);f.ca(e)||hd(c,new D("child_changed",e,b,f))}else hd(c,new D("child_added",e,b))}));return b.mb(this.g)};g.ga=function(a,b){return a.e()?C:a.ga(b)};g.Na=function(){return!1};g.Wb=function(){return this};function ld(a){this.Ce=new kd(a.g);this.g=a.g;var b;a.ma?(b=md(a),b=a.g.Pc(nd(a),b)):b=a.g.Tc();this.ed=b;a.pa?(b=od(a),a=a.g.Pc(pd(a),b)):a=a.g.Qc();this.Gc=a}g=ld.prototype;g.matches=function(a){return 0>=this.g.compare(this.ed,a)&&0>=this.g.compare(a,this.Gc)};g.K=function(a,b,c,d,e,f){this.matches(new F(b,c))||(c=C);return this.Ce.K(a,b,c,d,e,f)};
g.xa=function(a,b,c){b.L()&&(b=C);var d=b.mb(this.g),d=d.ga(C),e=this;b.R(N,function(a,b){e.matches(new F(a,b))||(d=d.O(a,C))});return this.Ce.xa(a,d,c)};g.ga=function(a){return a};g.Na=function(){return!0};g.Wb=function(){return this.Ce};function qd(a){this.sa=new ld(a);this.g=a.g;K(a.ja,"Only valid if limit has been set");this.ka=a.ka;this.Jb=!rd(a)}g=qd.prototype;g.K=function(a,b,c,d,e,f){this.sa.matches(new F(b,c))||(c=C);return a.J(b).ca(c)?a:a.Eb()<this.ka?this.sa.Wb().K(a,b,c,d,e,f):sd(this,a,b,c,e,f)};
g.xa=function(a,b,c){var d;if(b.L()||b.e())d=C.mb(this.g);else if(2*this.ka<b.Eb()&&b.Jc(this.g)){d=C.mb(this.g);b=this.Jb?b.$b(this.sa.Gc,this.g):b.Yb(this.sa.ed,this.g);for(var e=0;0<b.Qa.length&&e<this.ka;){var f=J(b),h;if(h=this.Jb?0>=this.g.compare(this.sa.ed,f):0>=this.g.compare(f,this.sa.Gc))d=d.O(f.name,f.S),e++;else break}}else{d=b.mb(this.g);d=d.ga(C);var k,l,m;if(this.Jb){b=d.sf(this.g);k=this.sa.Gc;l=this.sa.ed;var t=td(this.g);m=function(a,b){return t(b,a)}}else b=d.Xb(this.g),k=this.sa.ed,
l=this.sa.Gc,m=td(this.g);for(var e=0,y=!1;0<b.Qa.length;)f=J(b),!y&&0>=m(k,f)&&(y=!0),(h=y&&e<this.ka&&0>=m(f,l))?e++:d=d.O(f.name,C)}return this.sa.Wb().xa(a,d,c)};g.ga=function(a){return a};g.Na=function(){return!0};g.Wb=function(){return this.sa.Wb()};
function sd(a,b,c,d,e,f){var h;if(a.Jb){var k=td(a.g);h=function(a,b){return k(b,a)}}else h=td(a.g);K(b.Eb()==a.ka,"");var l=new F(c,d),m=a.Jb?ud(b,a.g):vd(b,a.g),t=a.sa.matches(l);if(b.Da(c)){for(var y=b.J(c),m=e.ze(a.g,m,a.Jb);null!=m&&(m.name==c||b.Da(m.name));)m=e.ze(a.g,m,a.Jb);e=null==m?1:h(m,l);if(t&&!d.e()&&0<=e)return null!=f&&hd(f,new D("child_changed",d,c,y)),b.O(c,d);null!=f&&hd(f,new D("child_removed",y,c));b=b.O(c,C);return null!=m&&a.sa.matches(m)?(null!=f&&hd(f,new D("child_added",
m.S,m.name)),b.O(m.name,m.S)):b}return d.e()?b:t&&0<=h(m,l)?(null!=f&&(hd(f,new D("child_removed",m.S,m.name)),hd(f,new D("child_added",d,c))),b.O(c,d).O(m.name,C)):b};function wd(a,b){this.ke=a;this.dg=b}function yd(a){this.U=a}
yd.prototype.ab=function(a,b,c,d){var e=new gd,f;if(b.type===Xb)b.source.xe?c=zd(this,a,b.path,b.Ga,c,d,e):(K(b.source.pf,"Unknown source."),f=b.source.bf,c=Ad(this,a,b.path,b.Ga,c,d,f,e));else if(b.type===Bd)b.source.xe?c=Cd(this,a,b.path,b.children,c,d,e):(K(b.source.pf,"Unknown source."),f=b.source.bf,c=Dd(this,a,b.path,b.children,c,d,f,e));else if(b.type===Ed)if(b.Vd)if(b=b.path,null!=c.tc(b))c=a;else{f=new rb(c,a,d);d=a.Q.j();if(b.e()||".priority"===E(b))Ib(a.C())?b=c.za(ub(a)):(b=a.C().j(),
K(b instanceof T,"serverChildren would be complete if leaf node"),b=c.yc(b)),b=this.U.xa(d,b,e);else{var h=E(b),k=c.xc(h,a.C());null==k&&sb(a.C(),h)&&(k=d.J(h));b=null!=k?this.U.K(d,h,k,H(b),f,e):a.Q.j().Da(h)?this.U.K(d,h,C,H(b),f,e):d;b.e()&&Ib(a.C())&&(d=c.za(ub(a)),d.L()&&(b=this.U.xa(b,d,e)))}d=Ib(a.C())||null!=c.tc(G);c=Fd(a,b,d,this.U.Na())}else c=Gd(this,a,b.path,b.Qb,c,d,e);else if(b.type===Zb)d=b.path,b=a.C(),f=b.j(),h=b.ea||d.e(),c=Hd(this,new Id(a.Q,new tb(f,h,b.Ub)),d,c,qb,e);else throw Gc("Unknown operation type: "+
b.type);e=ra(e.bb);d=c;b=d.Q;b.ea&&(f=b.j().L()||b.j().e(),h=Jd(a),(0<e.length||!a.Q.ea||f&&!b.j().ca(h)||!b.j().B().ca(h.B()))&&e.push(Eb(Jd(d))));return new wd(c,e)};
function Hd(a,b,c,d,e,f){var h=b.Q;if(null!=d.tc(c))return b;var k;if(c.e())K(Ib(b.C()),"If change path is empty, we must have complete server data"),b.C().Ub?(e=ub(b),d=d.yc(e instanceof T?e:C)):d=d.za(ub(b)),f=a.U.xa(b.Q.j(),d,f);else{var l=E(c);if(".priority"==l)K(1==tc(c),"Can't have a priority with additional path components"),f=h.j(),k=b.C().j(),d=d.ld(c,f,k),f=null!=d?a.U.ga(f,d):h.j();else{var m=H(c);sb(h,l)?(k=b.C().j(),d=d.ld(c,h.j(),k),d=null!=d?h.j().J(l).K(m,d):h.j().J(l)):d=d.xc(l,b.C());
f=null!=d?a.U.K(h.j(),l,d,m,e,f):h.j()}}return Fd(b,f,h.ea||c.e(),a.U.Na())}function Ad(a,b,c,d,e,f,h,k){var l=b.C();h=h?a.U:a.U.Wb();if(c.e())d=h.xa(l.j(),d,null);else if(h.Na()&&!l.Ub)d=l.j().K(c,d),d=h.xa(l.j(),d,null);else{var m=E(c);if(!Jb(l,c)&&1<tc(c))return b;var t=H(c);d=l.j().J(m).K(t,d);d=".priority"==m?h.ga(l.j(),d):h.K(l.j(),m,d,t,qb,null)}l=l.ea||c.e();b=new Id(b.Q,new tb(d,l,h.Na()));return Hd(a,b,c,e,new rb(e,b,f),k)}
function zd(a,b,c,d,e,f,h){var k=b.Q;e=new rb(e,b,f);if(c.e())h=a.U.xa(b.Q.j(),d,h),a=Fd(b,h,!0,a.U.Na());else if(f=E(c),".priority"===f)h=a.U.ga(b.Q.j(),d),a=Fd(b,h,k.ea,k.Ub);else{c=H(c);var l=k.j().J(f);if(!c.e()){var m=e.qf(f);d=null!=m?".priority"===uc(c)&&m.Y(c.parent()).e()?m:m.K(c,d):C}l.ca(d)?a=b:(h=a.U.K(k.j(),f,d,c,e,h),a=Fd(b,h,k.ea,a.U.Na()))}return a}
function Cd(a,b,c,d,e,f,h){var k=b;Kd(d,function(d,m){var t=c.u(d);sb(b.Q,E(t))&&(k=zd(a,k,t,m,e,f,h))});Kd(d,function(d,m){var t=c.u(d);sb(b.Q,E(t))||(k=zd(a,k,t,m,e,f,h))});return k}function Ld(a,b){Kd(b,function(b,d){a=a.K(b,d)});return a}
function Dd(a,b,c,d,e,f,h,k){if(b.C().j().e()&&!Ib(b.C()))return b;var l=b;c=c.e()?d:Md(Nd,c,d);var m=b.C().j();c.children.ia(function(c,d){if(m.Da(c)){var I=b.C().j().J(c),I=Ld(I,d);l=Ad(a,l,new L(c),I,e,f,h,k)}});c.children.ia(function(c,d){var I=!sb(b.C(),c)&&null==d.value;m.Da(c)||I||(I=b.C().j().J(c),I=Ld(I,d),l=Ad(a,l,new L(c),I,e,f,h,k))});return l}
function Gd(a,b,c,d,e,f,h){if(null!=e.tc(c))return b;var k=b.C();if(null!=d.value){if(c.e()&&k.ea||Jb(k,c))return Ad(a,b,c,k.j().Y(c),e,f,!1,h);if(c.e()){var l=Nd;k.j().R(Od,function(a,b){l=l.set(new L(a),b)});return Dd(a,b,c,l,e,f,!1,h)}return b}l=Nd;Kd(d,function(a){var b=c.u(a);Jb(k,b)&&(l=l.set(a,k.j().Y(b)))});return Dd(a,b,c,l,e,f,!1,h)};function Pd(){}var Qd={};function td(a){return q(a.compare,a)}Pd.prototype.Ad=function(a,b){return 0!==this.compare(new F("[MIN_NAME]",a),new F("[MIN_NAME]",b))};Pd.prototype.Tc=function(){return Rd};function Sd(a){this.cc=a}ma(Sd,Pd);g=Sd.prototype;g.Ic=function(a){return!a.J(this.cc).e()};g.compare=function(a,b){var c=a.S.J(this.cc),d=b.S.J(this.cc),c=c.Dc(d);return 0===c?Ub(a.name,b.name):c};g.Pc=function(a,b){var c=M(a),c=C.O(this.cc,c);return new F(b,c)};
g.Qc=function(){var a=C.O(this.cc,Td);return new F("[MAX_NAME]",a)};g.toString=function(){return this.cc};function Ud(){}ma(Ud,Pd);g=Ud.prototype;g.compare=function(a,b){var c=a.S.B(),d=b.S.B(),c=c.Dc(d);return 0===c?Ub(a.name,b.name):c};g.Ic=function(a){return!a.B().e()};g.Ad=function(a,b){return!a.B().ca(b.B())};g.Tc=function(){return Rd};g.Qc=function(){return new F("[MAX_NAME]",new sc("[PRIORITY-POST]",Td))};g.Pc=function(a,b){var c=M(a);return new F(b,new sc("[PRIORITY-POST]",c))};
g.toString=function(){return".priority"};var N=new Ud;function Vd(){}ma(Vd,Pd);g=Vd.prototype;g.compare=function(a,b){return Ub(a.name,b.name)};g.Ic=function(){throw Gc("KeyIndex.isDefinedOn not expected to be called.");};g.Ad=function(){return!1};g.Tc=function(){return Rd};g.Qc=function(){return new F("[MAX_NAME]",C)};g.Pc=function(a){K(p(a),"KeyIndex indexValue must always be a string.");return new F(a,C)};g.toString=function(){return".key"};var Od=new Vd;function Wd(){}ma(Wd,Pd);g=Wd.prototype;
g.compare=function(a,b){var c=a.S.Dc(b.S);return 0===c?Ub(a.name,b.name):c};g.Ic=function(){return!0};g.Ad=function(a,b){return!a.ca(b)};g.Tc=function(){return Rd};g.Qc=function(){return Xd};g.Pc=function(a,b){var c=M(a);return new F(b,c)};g.toString=function(){return".value"};var Yd=new Wd;function Zd(){this.Tb=this.pa=this.Lb=this.ma=this.ja=!1;this.ka=0;this.Nb="";this.ec=null;this.yb="";this.bc=null;this.wb="";this.g=N}var $d=new Zd;function rd(a){return""===a.Nb?a.ma:"l"===a.Nb}function nd(a){K(a.ma,"Only valid if start has been set");return a.ec}function md(a){K(a.ma,"Only valid if start has been set");return a.Lb?a.yb:"[MIN_NAME]"}function pd(a){K(a.pa,"Only valid if end has been set");return a.bc}
function od(a){K(a.pa,"Only valid if end has been set");return a.Tb?a.wb:"[MAX_NAME]"}function ae(a){var b=new Zd;b.ja=a.ja;b.ka=a.ka;b.ma=a.ma;b.ec=a.ec;b.Lb=a.Lb;b.yb=a.yb;b.pa=a.pa;b.bc=a.bc;b.Tb=a.Tb;b.wb=a.wb;b.g=a.g;return b}g=Zd.prototype;g.Ie=function(a){var b=ae(this);b.ja=!0;b.ka=a;b.Nb="";return b};g.Je=function(a){var b=ae(this);b.ja=!0;b.ka=a;b.Nb="l";return b};g.Ke=function(a){var b=ae(this);b.ja=!0;b.ka=a;b.Nb="r";return b};
g.ae=function(a,b){var c=ae(this);c.ma=!0;n(a)||(a=null);c.ec=a;null!=b?(c.Lb=!0,c.yb=b):(c.Lb=!1,c.yb="");return c};g.td=function(a,b){var c=ae(this);c.pa=!0;n(a)||(a=null);c.bc=a;n(b)?(c.Tb=!0,c.wb=b):(c.Zg=!1,c.wb="");return c};function be(a,b){var c=ae(a);c.g=b;return c}function ce(a){var b={};a.ma&&(b.sp=a.ec,a.Lb&&(b.sn=a.yb));a.pa&&(b.ep=a.bc,a.Tb&&(b.en=a.wb));if(a.ja){b.l=a.ka;var c=a.Nb;""===c&&(c=rd(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}
function de(a){return!(a.ma||a.pa||a.ja)}function ee(a){var b={};if(de(a)&&a.g==N)return b;var c;a.g===N?c="$priority":a.g===Yd?c="$value":a.g===Od?c="$key":(K(a.g instanceof Sd,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.ma&&(b.startAt=B(a.ec),a.Lb&&(b.startAt+=","+B(a.yb)));a.pa&&(b.endAt=B(a.bc),a.Tb&&(b.endAt+=","+B(a.wb)));a.ja&&(rd(a)?b.limitToFirst=a.ka:b.limitToLast=a.ka);return b}g.toString=function(){return B(ce(this))};function fe(a,b){this.Bd=a;this.dc=b}fe.prototype.get=function(a){var b=w(this.Bd,a);if(!b)throw Error("No index defined for "+a);return b===Qd?null:b};function ge(a,b,c){var d=na(a.Bd,function(d,f){var h=w(a.dc,f);K(h,"Missing index implementation for "+f);if(d===Qd){if(h.Ic(b.S)){for(var k=[],l=c.Xb(Sb),m=J(l);m;)m.name!=b.name&&k.push(m),m=J(l);k.push(b);return he(k,td(h))}return Qd}h=c.get(b.name);k=d;h&&(k=k.remove(new F(b.name,h)));return k.Oa(b,b.S)});return new fe(d,a.dc)}
function ie(a,b,c){var d=na(a.Bd,function(a){if(a===Qd)return a;var d=c.get(b.name);return d?a.remove(new F(b.name,d)):a});return new fe(d,a.dc)}var je=new fe({".priority":Qd},{".priority":N});function sc(a,b){this.A=a;K(n(this.A)&&null!==this.A,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||C;ke(this.aa);this.Cb=null}var le=["object","boolean","number","string"];g=sc.prototype;g.L=function(){return!0};g.B=function(){return this.aa};g.ga=function(a){return new sc(this.A,a)};g.J=function(a){return".priority"===a?this.aa:C};g.Y=function(a){return a.e()?this:".priority"===E(a)?this.aa:C};g.Da=function(){return!1};g.rf=function(){return null};
g.O=function(a,b){return".priority"===a?this.ga(b):b.e()&&".priority"!==a?this:C.O(a,b).ga(this.aa)};g.K=function(a,b){var c=E(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;K(".priority"!==c||1===tc(a),".priority must be the last token in a path");return this.O(c,C.K(H(a),b))};g.e=function(){return!1};g.Eb=function(){return 0};g.R=function(){return!1};g.H=function(a){return a&&!this.B().e()?{".value":this.Ca(),".priority":this.B().H()}:this.Ca()};
g.hash=function(){if(null===this.Cb){var a="";this.aa.e()||(a+="priority:"+me(this.aa.H())+":");var b=typeof this.A,a=a+(b+":"),a="number"===b?a+Yc(this.A):a+this.A;this.Cb=Ic(a)}return this.Cb};g.Ca=function(){return this.A};g.Dc=function(a){if(a===C)return 1;if(a instanceof T)return-1;K(a.L(),"Unknown node type");var b=typeof a.A,c=typeof this.A,d=Na(le,b),e=Na(le,c);K(0<=d,"Unknown leaf type: "+b);K(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.A<a.A?-1:this.A===a.A?0:1:e-d};
g.mb=function(){return this};g.Jc=function(){return!0};g.ca=function(a){return a===this?!0:a.L()?this.A===a.A&&this.aa.ca(a.aa):!1};g.toString=function(){return B(this.H(!0))};function T(a,b,c){this.m=a;(this.aa=b)&&ke(this.aa);a.e()&&K(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.xb=c;this.Cb=null}g=T.prototype;g.L=function(){return!1};g.B=function(){return this.aa||C};g.ga=function(a){return this.m.e()?this:new T(this.m,a,this.xb)};g.J=function(a){if(".priority"===a)return this.B();a=this.m.get(a);return null===a?C:a};g.Y=function(a){var b=E(a);return null===b?this:this.J(b).Y(H(a))};g.Da=function(a){return null!==this.m.get(a)};
g.O=function(a,b){K(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ga(b);var c=new F(a,b),d,e;b.e()?(d=this.m.remove(a),c=ie(this.xb,c,this.m)):(d=this.m.Oa(a,b),c=ge(this.xb,c,this.m));e=d.e()?C:this.aa;return new T(d,e,c)};g.K=function(a,b){var c=E(a);if(null===c)return b;K(".priority"!==E(a)||1===tc(a),".priority must be the last token in a path");var d=this.J(c).K(H(a),b);return this.O(c,d)};g.e=function(){return this.m.e()};g.Eb=function(){return this.m.count()};
var ne=/^(0|[1-9]\d*)$/;g=T.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.R(N,function(f,h){b[f]=h.H(a);c++;e&&ne.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.B().e()&&(b[".priority"]=this.B().H());return b};g.hash=function(){if(null===this.Cb){var a="";this.B().e()||(a+="priority:"+me(this.B().H())+":");this.R(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Cb=""===a?"":Ic(a)}return this.Cb};
g.rf=function(a,b,c){return(c=oe(this,c))?(a=bc(c,new F(a,b)))?a.name:null:bc(this.m,a)};function ud(a,b){var c;c=(c=oe(a,b))?(c=c.Sc())&&c.name:a.m.Sc();return c?new F(c,a.m.get(c)):null}function vd(a,b){var c;c=(c=oe(a,b))?(c=c.fc())&&c.name:a.m.fc();return c?new F(c,a.m.get(c)):null}g.R=function(a,b){var c=oe(this,a);return c?c.ia(function(a){return b(a.name,a.S)}):this.m.ia(b)};g.Xb=function(a){return this.Yb(a.Tc(),a)};
g.Yb=function(a,b){var c=oe(this,b);if(c)return c.Yb(a,function(a){return a});for(var c=this.m.Yb(a.name,Sb),d=dc(c);null!=d&&0>b.compare(d,a);)J(c),d=dc(c);return c};g.sf=function(a){return this.$b(a.Qc(),a)};g.$b=function(a,b){var c=oe(this,b);if(c)return c.$b(a,function(a){return a});for(var c=this.m.$b(a.name,Sb),d=dc(c);null!=d&&0<b.compare(d,a);)J(c),d=dc(c);return c};g.Dc=function(a){return this.e()?a.e()?0:-1:a.L()||a.e()?1:a===Td?-1:0};
g.mb=function(a){if(a===Od||ta(this.xb.dc,a.toString()))return this;var b=this.xb,c=this.m;K(a!==Od,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Xb(Sb),f=J(c);f;)e=e||a.Ic(f.S),d.push(f),f=J(c);d=e?he(d,td(a)):Qd;e=a.toString();c=xa(b.dc);c[e]=a;a=xa(b.Bd);a[e]=d;return new T(this.m,this.aa,new fe(a,c))};g.Jc=function(a){return a===Od||ta(this.xb.dc,a.toString())};
g.ca=function(a){if(a===this)return!0;if(a.L())return!1;if(this.B().ca(a.B())&&this.m.count()===a.m.count()){var b=this.Xb(N);a=a.Xb(N);for(var c=J(b),d=J(a);c&&d;){if(c.name!==d.name||!c.S.ca(d.S))return!1;c=J(b);d=J(a)}return null===c&&null===d}return!1};function oe(a,b){return b===Od?null:a.xb.get(b.toString())}g.toString=function(){return B(this.H(!0))};function M(a,b){if(null===a)return C;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);K(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new sc(a,M(c));if(a instanceof Array){var d=C,e=a;r(e,function(a,b){if(v(e,b)&&"."!==b.substring(0,1)){var c=M(a);if(c.L()||!c.e())d=
d.O(b,c)}});return d.ga(M(c))}var f=[],h=!1,k=a;ib(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=M(k[a]);b.e()||(h=h||!b.B().e(),f.push(new F(a,b)))}});if(0==f.length)return C;var l=he(f,Tb,function(a){return a.name},Vb);if(h){var m=he(f,td(N));return new T(l,M(c),new fe({".priority":m},{".priority":N}))}return new T(l,M(c),je)}var pe=Math.log(2);
function qe(a){this.count=parseInt(Math.log(a+1)/pe,10);this.jf=this.count-1;this.cg=a+1&parseInt(Array(this.count+1).join("1"),2)}function re(a){var b=!(a.cg&1<<a.jf);a.jf--;return b}
function he(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var m=a[b],t=c?c(m):m;return new ec(t,m.S,!1,null,null)}var m=parseInt(f/2,10)+b,f=e(b,m),y=e(m+1,d),m=a[m],t=c?c(m):m;return new ec(t,m.S,!1,f,y)}a.sort(b);var f=function(b){function d(b,h){var k=t-b,y=t;t-=b;var y=e(k+1,y),k=a[k],I=c?c(k):k,y=new ec(I,k.S,h,null,y);f?f.left=y:m=y;f=y}for(var f=null,m=null,t=a.length,y=0;y<b.count;++y){var I=re(b),xd=Math.pow(2,b.count-(y+1));I?d(xd,!1):(d(xd,!1),d(xd,!0))}return m}(new qe(a.length));
return null!==f?new $b(d||b,f):new $b(d||b)}function me(a){return"number"===typeof a?"number:"+Yc(a):"string:"+a}function ke(a){if(a.L()){var b=a.H();K("string"===typeof b||"number"===typeof b||"object"===typeof b&&v(b,".sv"),"Priority must be a string or number.")}else K(a===Td||a.e(),"priority of unexpected type.");K(a===Td||a.B().e(),"Priority nodes can't have a priority of their own.")}var C=new T(new $b(Vb),null,je);function se(){T.call(this,new $b(Vb),C,je)}ma(se,T);g=se.prototype;
g.Dc=function(a){return a===this?0:1};g.ca=function(a){return a===this};g.B=function(){return this};g.J=function(){return C};g.e=function(){return!1};var Td=new se,Rd=new F("[MIN_NAME]",C),Xd=new F("[MAX_NAME]",Td);function Id(a,b){this.Q=a;this.Yd=b}function Fd(a,b,c,d){return new Id(new tb(b,c,d),a.Yd)}function Jd(a){return a.Q.ea?a.Q.j():null}Id.prototype.C=function(){return this.Yd};function ub(a){return a.Yd.ea?a.Yd.j():null};function te(a,b){this.V=a;var c=a.o,d=new kd(c.g),c=de(c)?new kd(c.g):c.ja?new qd(c):new ld(c);this.Hf=new yd(c);var e=b.C(),f=b.Q,h=d.xa(C,e.j(),null),k=c.xa(C,f.j(),null);this.Ka=new Id(new tb(k,f.ea,c.Na()),new tb(h,e.ea,d.Na()));this.Ya=[];this.jg=new cd(a)}function ue(a){return a.V}g=te.prototype;g.C=function(){return this.Ka.C().j()};g.gb=function(a){var b=ub(this.Ka);return b&&(de(this.V.o)||!a.e()&&!b.J(E(a)).e())?b.Y(a):null};g.e=function(){return 0===this.Ya.length};g.Pb=function(a){this.Ya.push(a)};
g.kb=function(a,b){var c=[];if(b){K(null==a,"A cancel should cancel all event registrations.");var d=this.V.path;Oa(this.Ya,function(a){(a=a.gf(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Ya.length;++f){var h=this.Ya[f];if(!h.matches(a))e.push(h);else if(a.tf()){e=e.concat(this.Ya.slice(f+1));break}}this.Ya=e}else this.Ya=[];return c};
g.ab=function(a,b,c){a.type===Bd&&null!==a.source.Ib&&(K(ub(this.Ka),"We should always have a full cache before handling merges"),K(Jd(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.Hf.ab(d,a,b,c);b=this.Hf;c=a.ke;K(c.Q.j().Jc(b.U.g),"Event snap not indexed");K(c.C().j().Jc(b.U.g),"Server snap not indexed");K(Ib(a.ke.C())||!Ib(d.C()),"Once a server snap is complete, it should never go back");this.Ka=a.ke;return ve(this,a.dg,a.ke.Q.j(),null)};
function we(a,b){var c=a.Ka.Q,d=[];c.j().L()||c.j().R(N,function(a,b){d.push(new D("child_added",b,a))});c.ea&&d.push(Eb(c.j()));return ve(a,d,c.j(),b)}function ve(a,b,c,d){return dd(a.jg,b,c,d?[d]:a.Ya)};function xe(a,b,c){this.type=Bd;this.source=a;this.path=b;this.children=c}xe.prototype.Xc=function(a){if(this.path.e())return a=this.children.subtree(new L(a)),a.e()?null:a.value?new Wb(this.source,G,a.value):new xe(this.source,G,a);K(E(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new xe(this.source,H(this.path),this.children)};xe.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function ye(a,b){this.f=Nc("p:rest:");this.F=a;this.Hb=b;this.Aa=null;this.$={}}function ze(a,b){if(n(b))return"tag$"+b;var c=a.o;K(de(c)&&c.g==N,"should have a tag if it's not a default query.");return a.path.toString()}g=ye.prototype;
g.yf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.va());var f=ze(a,c),h={};this.$[f]=h;a=ee(a.o);var k=this;Ae(this,e+".json",a,function(a,b){var t=b;404===a&&(a=t=null);null===a&&k.Hb(e,t,!1,c);w(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.Pf=function(a,b){var c=ze(a,b);delete this.$[c]};g.N=function(a,b){this.Aa=a;var c=$c(a),d=c.data,c=c.Bc&&c.Bc.exp;b&&b("ok",{auth:d,expires:c})};g.he=function(a){this.Aa=null;a("ok",null)};g.Ne=function(){};
g.Cf=function(){};g.Jd=function(){};g.put=function(){};g.zf=function(){};g.Ve=function(){};
function Ae(a,b,c,d){c=c||{};c.format="export";a.Aa&&(c.auth=a.Aa);var e=(a.F.lb?"https://":"http://")+a.F.host+b+"?"+kb(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=nb(f.responseText)}catch(c){Q("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
f.status&&Q("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function Be(a,b){this.value=a;this.children=b||Ce}var Ce=new $b(function(a,b){return a===b?0:a<b?-1:1});function De(a){var b=Nd;r(a,function(a,d){b=b.set(new L(d),a)});return b}g=Be.prototype;g.e=function(){return null===this.value&&this.children.e()};function Ee(a,b,c){if(null!=a.value&&c(a.value))return{path:G,value:a.value};if(b.e())return null;var d=E(b);a=a.children.get(d);return null!==a?(b=Ee(a,H(b),c),null!=b?{path:(new L(d)).u(b.path),value:b.value}:null):null}
function Fe(a,b){return Ee(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(E(a));return null!==b?b.subtree(H(a)):Nd};g.set=function(a,b){if(a.e())return new Be(b,this.children);var c=E(a),d=(this.children.get(c)||Nd).set(H(a),b),c=this.children.Oa(c,d);return new Be(this.value,c)};
g.remove=function(a){if(a.e())return this.children.e()?Nd:new Be(null,this.children);var b=E(a),c=this.children.get(b);return c?(a=c.remove(H(a)),b=a.e()?this.children.remove(b):this.children.Oa(b,a),null===this.value&&b.e()?Nd:new Be(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(E(a));return b?b.get(H(a)):null};
function Md(a,b,c){if(b.e())return c;var d=E(b);b=Md(a.children.get(d)||Nd,H(b),c);d=b.e()?a.children.remove(d):a.children.Oa(d,b);return new Be(a.value,d)}function Ge(a,b){return He(a,G,b)}function He(a,b,c){var d={};a.children.ia(function(a,f){d[a]=He(f,b.u(a),c)});return c(b,a.value,d)}function Ie(a,b,c){return Je(a,b,G,c)}function Je(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=E(b);return(a=a.children.get(e))?Je(a,H(b),c.u(e),d):null}
function Ke(a,b,c){var d=G;if(!b.e()){var e=!0;a.value&&(e=c(d,a.value));!0===e&&(e=E(b),(a=a.children.get(e))&&Le(a,H(b),d.u(e),c))}}function Le(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=E(b);return(a=a.children.get(e))?Le(a,H(b),c.u(e),d):Nd}function Kd(a,b){Me(a,G,b)}function Me(a,b,c){a.children.ia(function(a,e){Me(e,b.u(a),c)});a.value&&c(b,a.value)}function Ne(a,b){a.children.ia(function(a,d){d.value&&b(a,d.value)})}var Nd=new Be(null);
Be.prototype.toString=function(){var a={};Kd(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function Oe(a,b,c){this.type=Ed;this.source=Pe;this.path=a;this.Qb=b;this.Vd=c}Oe.prototype.Xc=function(a){if(this.path.e()){if(null!=this.Qb.value)return K(this.Qb.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Qb.subtree(new L(a));return new Oe(G,a,this.Vd)}K(E(this.path)===a,"operationForChild called for unrelated child.");return new Oe(H(this.path),this.Qb,this.Vd)};
Oe.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Vd+" affectedTree="+this.Qb+")"};var Xb=0,Bd=1,Ed=2,Zb=3;function Qe(a,b,c,d){this.xe=a;this.pf=b;this.Ib=c;this.bf=d;K(!d||b,"Tagged queries must be from server.")}var Pe=new Qe(!0,!1,null,!1),Re=new Qe(!1,!0,null,!1);Qe.prototype.toString=function(){return this.xe?"user":this.bf?"server(queryID="+this.Ib+")":"server"};function Se(a){this.W=a}var Te=new Se(new Be(null));function Ue(a,b,c){if(b.e())return new Se(new Be(c));var d=Fe(a.W,b);if(null!=d){var e=d.path,d=d.value;b=O(e,b);d=d.K(b,c);return new Se(a.W.set(e,d))}a=Md(a.W,b,new Be(c));return new Se(a)}function Ve(a,b,c){var d=a;ib(c,function(a,c){d=Ue(d,b.u(a),c)});return d}Se.prototype.Rd=function(a){if(a.e())return Te;a=Md(this.W,a,Nd);return new Se(a)};function We(a,b){var c=Fe(a.W,b);return null!=c?a.W.get(c.path).Y(O(c.path,b)):null}
function Xe(a){var b=[],c=a.W.value;null!=c?c.L()||c.R(N,function(a,c){b.push(new F(a,c))}):a.W.children.ia(function(a,c){null!=c.value&&b.push(new F(a,c.value))});return b}function Ye(a,b){if(b.e())return a;var c=We(a,b);return null!=c?new Se(new Be(c)):new Se(a.W.subtree(b))}Se.prototype.e=function(){return this.W.e()};Se.prototype.apply=function(a){return Ze(G,this.W,a)};
function Ze(a,b,c){if(null!=b.value)return c.K(a,b.value);var d=null;b.children.ia(function(b,f){".priority"===b?(K(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Ze(a.u(b),f,c)});c.Y(a).e()||null===d||(c=c.K(a.u(".priority"),d));return c};function $e(){this.T=Te;this.na=[];this.Mc=-1}function af(a,b){for(var c=0;c<a.na.length;c++){var d=a.na[c];if(d.kd===b)return d}return null}g=$e.prototype;
g.Rd=function(a){var b=Ua(this.na,function(b){return b.kd===a});K(0<=b,"removeWrite called with nonexistent writeId.");var c=this.na[b];this.na.splice(b,1);for(var d=c.visible,e=!1,f=this.na.length-1;d&&0<=f;){var h=this.na[f];h.visible&&(f>=b&&bf(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.T=cf(this.na,df,G),this.Mc=0<this.na.length?this.na[this.na.length-1].kd:-1;else if(c.Ga)this.T=this.T.Rd(c.path);else{var k=this;r(c.children,function(a,b){k.T=k.T.Rd(c.path.u(b))})}return!0}return!1};
g.za=function(a,b,c,d){if(c||d){var e=Ye(this.T,a);return!d&&e.e()?b:d||null!=b||null!=We(e,G)?(e=cf(this.na,function(b){return(b.visible||d)&&(!c||!(0<=Na(c,b.kd)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||C,e.apply(b)):null}e=We(this.T,a);if(null!=e)return e;e=Ye(this.T,a);return e.e()?b:null!=b||null!=We(e,G)?(b=b||C,e.apply(b)):null};
g.yc=function(a,b){var c=C,d=We(this.T,a);if(d)d.L()||d.R(N,function(a,b){c=c.O(a,b)});else if(b){var e=Ye(this.T,a);b.R(N,function(a,b){var d=Ye(e,new L(a)).apply(b);c=c.O(a,d)});Oa(Xe(e),function(a){c=c.O(a.name,a.S)})}else e=Ye(this.T,a),Oa(Xe(e),function(a){c=c.O(a.name,a.S)});return c};g.ld=function(a,b,c,d){K(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.u(b);if(null!=We(this.T,a))return null;a=Ye(this.T,a);return a.e()?d.Y(b):a.apply(d.Y(b))};
g.xc=function(a,b,c){a=a.u(b);var d=We(this.T,a);return null!=d?d:sb(c,b)?Ye(this.T,a).apply(c.j().J(b)):null};g.tc=function(a){return We(this.T,a)};g.oe=function(a,b,c,d,e,f){var h;a=Ye(this.T,a);h=We(a,G);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.mb(f);if(h.e()||h.L())return[];b=[];a=td(f);e=e?h.$b(c,f):h.Yb(c,f);for(f=J(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=J(e);return b};
function bf(a,b){return a.Ga?a.path.contains(b):!!ua(a.children,function(c,d){return a.path.u(d).contains(b)})}function df(a){return a.visible}
function cf(a,b,c){for(var d=Te,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ga)c.contains(h)?(h=O(c,h),d=Ue(d,h,f.Ga)):h.contains(c)&&(h=O(h,c),d=Ue(d,G,f.Ga.Y(h)));else if(f.children)if(c.contains(h))h=O(c,h),d=Ve(d,h,f.children);else{if(h.contains(c))if(h=O(h,c),h.e())d=Ve(d,G,f.children);else if(f=w(f.children,E(h)))f=f.Y(H(h)),d=Ue(d,G,f)}else throw Gc("WriteRecord should have .snap or .children");}}return d}function ef(a,b){this.Mb=a;this.W=b}g=ef.prototype;
g.za=function(a,b,c){return this.W.za(this.Mb,a,b,c)};g.yc=function(a){return this.W.yc(this.Mb,a)};g.ld=function(a,b,c){return this.W.ld(this.Mb,a,b,c)};g.tc=function(a){return this.W.tc(this.Mb.u(a))};g.oe=function(a,b,c,d,e){return this.W.oe(this.Mb,a,b,c,d,e)};g.xc=function(a,b){return this.W.xc(this.Mb,a,b)};g.u=function(a){return new ef(this.Mb.u(a),this.W)};function ff(){this.ya={}}g=ff.prototype;g.e=function(){return wa(this.ya)};g.ab=function(a,b,c){var d=a.source.Ib;if(null!==d)return d=w(this.ya,d),K(null!=d,"SyncTree gave us an op for an invalid query."),d.ab(a,b,c);var e=[];r(this.ya,function(d){e=e.concat(d.ab(a,b,c))});return e};g.Pb=function(a,b,c,d,e){var f=a.va(),h=w(this.ya,f);if(!h){var h=c.za(e?d:null),k=!1;h?k=!0:(h=d instanceof T?c.yc(d):C,k=!1);h=new te(a,new Id(new tb(h,k,!1),new tb(d,e,!1)));this.ya[f]=h}h.Pb(b);return we(h,b)};
g.kb=function(a,b,c){var d=a.va(),e=[],f=[],h=null!=gf(this);if("default"===d){var k=this;r(this.ya,function(a,d){f=f.concat(a.kb(b,c));a.e()&&(delete k.ya[d],de(a.V.o)||e.push(a.V))})}else{var l=w(this.ya,d);l&&(f=f.concat(l.kb(b,c)),l.e()&&(delete this.ya[d],de(l.V.o)||e.push(l.V)))}h&&null==gf(this)&&e.push(new U(a.k,a.path));return{Ig:e,kg:f}};function hf(a){return Pa(ra(a.ya),function(a){return!de(a.V.o)})}g.gb=function(a){var b=null;r(this.ya,function(c){b=b||c.gb(a)});return b};
function jf(a,b){if(de(b.o))return gf(a);var c=b.va();return w(a.ya,c)}function gf(a){return va(a.ya,function(a){return de(a.V.o)})||null};function kf(a){this.ta=Nd;this.jb=new $e;this.af={};this.lc={};this.Nc=a}function lf(a,b,c,d,e){var f=a.jb,h=e;K(d>f.Mc,"Stacking an older write on top of newer ones");n(h)||(h=!0);f.na.push({path:b,Ga:c,kd:d,visible:h});h&&(f.T=Ue(f.T,b,c));f.Mc=d;return e?mf(a,new Wb(Pe,b,c)):[]}function nf(a,b,c,d){var e=a.jb;K(d>e.Mc,"Stacking an older merge on top of newer ones");e.na.push({path:b,children:c,kd:d,visible:!0});e.T=Ve(e.T,b,c);e.Mc=d;c=De(c);return mf(a,new xe(Pe,b,c))}
function of(a,b,c){c=c||!1;var d=af(a.jb,b);if(a.jb.Rd(b)){var e=Nd;null!=d.Ga?e=e.set(G,!0):ib(d.children,function(a,b){e=e.set(new L(a),b)});return mf(a,new Oe(d.path,e,c))}return[]}function pf(a,b,c){c=De(c);return mf(a,new xe(Re,b,c))}function qf(a,b,c,d){d=rf(a,d);if(null!=d){var e=sf(d);d=e.path;e=e.Ib;b=O(d,b);c=new Wb(new Qe(!1,!0,e,!0),b,c);return tf(a,d,c)}return[]}
function uf(a,b,c,d){if(d=rf(a,d)){var e=sf(d);d=e.path;e=e.Ib;b=O(d,b);c=De(c);c=new xe(new Qe(!1,!0,e,!0),b,c);return tf(a,d,c)}return[]}
kf.prototype.Pb=function(a,b){var c=a.path,d=null,e=!1;Ke(this.ta,c,function(a,b){var f=O(a,c);d=b.gb(f);e=e||null!=gf(b);return!d});var f=this.ta.get(c);f?(e=e||null!=gf(f),d=d||f.gb(G)):(f=new ff,this.ta=this.ta.set(c,f));var h;null!=d?h=!0:(h=!1,d=C,Ne(this.ta.subtree(c),function(a,b){var c=b.gb(G);c&&(d=d.O(a,c))}));var k=null!=jf(f,a);if(!k&&!de(a.o)){var l=vf(a);K(!(l in this.lc),"View does not exist, but we have a tag");var m=wf++;this.lc[l]=m;this.af["_"+m]=l}h=f.Pb(a,b,new ef(c,this.jb),
d,h);k||e||(f=jf(f,a),h=h.concat(xf(this,a,f)));return h};
kf.prototype.kb=function(a,b,c){var d=a.path,e=this.ta.get(d),f=[];if(e&&("default"===a.va()||null!=jf(e,a))){f=e.kb(a,b,c);e.e()&&(this.ta=this.ta.remove(d));e=f.Ig;f=f.kg;b=-1!==Ua(e,function(a){return de(a.o)});var h=Ie(this.ta,d,function(a,b){return null!=gf(b)});if(b&&!h&&(d=this.ta.subtree(d),!d.e()))for(var d=yf(d),k=0;k<d.length;++k){var l=d[k],m=l.V,l=zf(this,l);this.Nc.Ye(m,Af(this,m),l.xd,l.G)}if(!h&&0<e.length&&!c)if(b)this.Nc.be(a,null);else{var t=this;Oa(e,function(a){a.va();var b=t.lc[vf(a)];
t.Nc.be(a,b)})}Bf(this,e)}return f};kf.prototype.za=function(a,b){var c=this.jb,d=Ie(this.ta,a,function(b,c){var d=O(b,a);if(d=c.gb(d))return d});return c.za(a,d,b,!0)};function yf(a){return Ge(a,function(a,c,d){if(c&&null!=gf(c))return[gf(c)];var e=[];c&&(e=hf(c));r(d,function(a){e=e.concat(a)});return e})}function Bf(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!de(d.o)){var d=vf(d),e=a.lc[d];delete a.lc[d];delete a.af["_"+e]}}}
function xf(a,b,c){var d=b.path,e=Af(a,b);c=zf(a,c);b=a.Nc.Ye(b,e,c.xd,c.G);d=a.ta.subtree(d);if(e)K(null==gf(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Ge(d,function(a,b,c){if(!a.e()&&b&&null!=gf(b))return[ue(gf(b))];var d=[];b&&(d=d.concat(Qa(hf(b),function(a){return a.V})));r(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Nc.be(c,Af(a,c));return b}
function zf(a,b){var c=b.V,d=Af(a,c);return{xd:function(){return(b.C()||C).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=rf(a,d)){var h=sf(b);b=h.path;h=h.Ib;f=O(b,f);f=new Yb(new Qe(!1,!0,h,!0),f);b=tf(a,b,f)}else b=[]}else b=mf(a,new Yb(Re,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
(f="The service is unavailable");f=Error(b+": "+f);f.code=b.toUpperCase();return a.kb(c,null,f)}}}function vf(a){return a.path.toString()+"$"+a.va()}function sf(a){var b=a.indexOf("$");K(-1!==b&&b<a.length-1,"Bad queryKey.");return{Ib:a.substr(b+1),path:new L(a.substr(0,b))}}function rf(a,b){var c=a.af,d="_"+b;return d in c?c[d]:void 0}function Af(a,b){var c=vf(b);return w(a.lc,c)}var wf=1;
function tf(a,b,c){var d=a.ta.get(b);K(d,"Missing sync point for query tag that we're tracking");return d.ab(c,new ef(b,a.jb),null)}function mf(a,b){return Cf(a,b,a.ta,null,new ef(G,a.jb))}function Cf(a,b,c,d,e){if(b.path.e())return Df(a,b,c,d,e);var f=c.get(G);null==d&&null!=f&&(d=f.gb(G));var h=[],k=E(b.path),l=b.Xc(k);if((c=c.children.get(k))&&l)var m=d?d.J(k):null,k=e.u(k),h=h.concat(Cf(a,l,c,m,k));f&&(h=h.concat(f.ab(b,e,d)));return h}
function Df(a,b,c,d,e){var f=c.get(G);null==d&&null!=f&&(d=f.gb(G));var h=[];c.children.ia(function(c,f){var m=d?d.J(c):null,t=e.u(c),y=b.Xc(c);y&&(h=h.concat(Df(a,y,f,m,t)))});f&&(h=h.concat(f.ab(b,e,d)));return h};function Ef(){this.children={};this.nd=0;this.value=null}function Ff(a,b,c){this.Gd=a?a:"";this.Zc=b?b:null;this.w=c?c:new Ef}function Gf(a,b){for(var c=b instanceof L?b:new L(b),d=a,e;null!==(e=E(c));)d=new Ff(e,d,w(d.w.children,e)||new Ef),c=H(c);return d}g=Ff.prototype;g.Ca=function(){return this.w.value};function Hf(a,b){K("undefined"!==typeof b,"Cannot set value to undefined");a.w.value=b;If(a)}g.clear=function(){this.w.value=null;this.w.children={};this.w.nd=0;If(this)};
g.wd=function(){return 0<this.w.nd};g.e=function(){return null===this.Ca()&&!this.wd()};g.R=function(a){var b=this;r(this.w.children,function(c,d){a(new Ff(d,b,c))})};function Jf(a,b,c,d){c&&!d&&b(a);a.R(function(a){Jf(a,b,!0,d)});c&&d&&b(a)}function Kf(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new L(null===this.Zc?this.Gd:this.Zc.path()+"/"+this.Gd)};g.name=function(){return this.Gd};g.parent=function(){return this.Zc};
function If(a){if(null!==a.Zc){var b=a.Zc,c=a.Gd,d=a.e(),e=v(b.w.children,c);d&&e?(delete b.w.children[c],b.w.nd--,If(b)):d||e||(b.w.children[c]=a.w,b.w.nd++,If(b))}};function Lf(a){K(ea(a)&&0<a.length,"Requires a non-empty array");this.Vf=a;this.Oc={}}Lf.prototype.ge=function(a,b){for(var c=this.Oc[a]||[],d=0;d<c.length;d++)c[d].zc.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};Lf.prototype.Fb=function(a,b,c){Mf(this,a);this.Oc[a]=this.Oc[a]||[];this.Oc[a].push({zc:b,Ma:c});(a=this.Be(a))&&b.apply(c,a)};Lf.prototype.hc=function(a,b,c){Mf(this,a);a=this.Oc[a]||[];for(var d=0;d<a.length;d++)if(a[d].zc===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};
function Mf(a,b){K(Ta(a.Vf,function(a){return a===b}),"Unknown event: "+b)};var Nf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);K(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);K(20===c.length,"nextPushId: Length should be 20.");
return c}}();function Of(){Lf.call(this,["online"]);this.jc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.jc||(a.jc=!0,a.ge("online",!0))},!1);window.addEventListener("offline",function(){a.jc&&(a.jc=!1,a.ge("online",!1))},!1)}}ma(Of,Lf);Of.prototype.Be=function(a){K("online"===a,"Unknown event type: "+a);return[this.jc]};ca(Of);function Pf(){Lf.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Ob=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.Ob&&(c.Ob=b,c.ge("visible",b))},!1)}}ma(Pf,Lf);Pf.prototype.Be=function(a){K("visible"===a,"Unknown event type: "+a);return[this.Ob]};ca(Pf);var Qf=/[\[\].#$\/\u0000-\u001F\u007F]/,Rf=/[\[\].#$\u0000-\u001F\u007F]/,Sf=/^[a-zA-Z][a-zA-Z._\-+]+$/;function Tf(a){return p(a)&&0!==a.length&&!Qf.test(a)}function Uf(a){return null===a||p(a)||ga(a)&&!Rc(a)||ia(a)&&v(a,".sv")}function Vf(a,b,c,d){d&&!n(b)||Wf(z(a,1,d),b,c)}
function Wf(a,b,c){c instanceof L&&(c=new vc(c,a));if(!n(b))throw Error(a+"contains undefined "+yc(c));if(ha(b))throw Error(a+"contains a function "+yc(c)+" with contents: "+b.toString());if(Rc(b))throw Error(a+"contains "+b.toString()+" "+yc(c));if(p(b)&&b.length>10485760/3&&10485760<wc(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+yc(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;ib(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
!0,!Tf(b)))throw Error(a+" contains an invalid key ("+b+") "+yc(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Wf(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+yc(c)+" in addition to actual children.");}}
function Xf(a,b,c){if(!ia(b)||ea(b))throw Error(z(a,1,!1)+" must be an Object containing the children to replace.");if(v(b,".value"))throw Error(z(a,1,!1)+' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');Vf(a,b,c,!1)}
function Yf(a,b,c){if(Rc(c))throw Error(z(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Uf(c))throw Error(z(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
function Zf(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(z(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function $f(a,b,c,d){if((!d||n(c))&&!Tf(c))throw Error(z(a,b,d)+'was an invalid key: "'+c+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
function ag(a,b){if(!p(b)||0===b.length||Rf.test(b))throw Error(z(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function bg(a,b){if(".info"===E(b))throw Error(a+" failed: Can't modify data under /.info/");}function cg(a,b){if(!p(b))throw Error(z(a,1,!1)+"must be a valid credential (a string).");}function dg(a,b,c){if(!p(c))throw Error(z(a,b,!1)+"must be a valid string.");}
function eg(a,b){dg(a,1,b);if(!Sf.test(b))throw Error(z(a,1,!1)+"'"+b+"' is not a valid authentication provider.");}function fg(a,b,c,d){if(!d||n(c))if(!ia(c)||null===c)throw Error(z(a,b,d)+"must be a valid object.");}function gg(a,b,c){if(!ia(b)||!v(b,c))throw Error(z(a,1,!1)+'must contain the key "'+c+'"');if(!p(w(b,c)))throw Error(z(a,1,!1)+'must contain the key "'+c+'" with type "string"');};function hg(){this.set={}}g=hg.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return v(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return wa(this.set)};g.count=function(){return pa(this.set)};function ig(a,b){r(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];r(this.set,function(b,c){a.push(c)});return a};function pc(){this.m=this.A=null}pc.prototype.find=function(a){if(null!=this.A)return this.A.Y(a);if(a.e()||null==this.m)return null;var b=E(a);a=H(a);return this.m.contains(b)?this.m.get(b).find(a):null};pc.prototype.nc=function(a,b){if(a.e())this.A=b,this.m=null;else if(null!==this.A)this.A=this.A.K(a,b);else{null==this.m&&(this.m=new hg);var c=E(a);this.m.contains(c)||this.m.add(c,new pc);c=this.m.get(c);a=H(a);c.nc(a,b)}};
function jg(a,b){if(b.e())return a.A=null,a.m=null,!0;if(null!==a.A){if(a.A.L())return!1;var c=a.A;a.A=null;c.R(N,function(b,c){a.nc(new L(b),c)});return jg(a,b)}return null!==a.m?(c=E(b),b=H(b),a.m.contains(c)&&jg(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function qc(a,b,c){null!==a.A?c(b,a.A):a.R(function(a,e){var f=new L(b.toString()+"/"+a);qc(e,f,c)})}pc.prototype.R=function(a){null!==this.m&&ig(this.m,function(b,c){a(b,c)})};var kg="auth.firebase.com";function lg(a,b,c){this.od=a||{};this.fe=b||{};this.$a=c||{};this.od.remember||(this.od.remember="default")}var mg=["remember","redirectTo"];function ng(a){var b={},c={};ib(a||{},function(a,e){0<=Na(mg,a)?b[a]=e:c[a]=e});return new lg(b,{},c)};function og(a,b){this.Re=["session",a.Od,a.Db].join(":");this.ce=b}og.prototype.set=function(a,b){if(!b)if(this.ce.length)b=this.ce[0];else throw Error("fb.login.SessionManager : No storage options available!");b.set(this.Re,a)};og.prototype.get=function(){var a=Qa(this.ce,q(this.og,this)),a=Pa(a,function(a){return null!==a});Xa(a,function(a,c){return ad(c.token)-ad(a.token)});return 0<a.length?a.shift():null};og.prototype.og=function(a){try{var b=a.get(this.Re);if(b&&b.token)return b}catch(c){}return null};
og.prototype.clear=function(){var a=this;Oa(this.ce,function(b){b.remove(a.Re)})};function pg(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function qg(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(pg())}function rg(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
function sg(a){var b=pg();if(""===b)return!1;if("Microsoft Internet Explorer"===navigator.appName){if((b=b.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a}else if(-1<b.indexOf("Trident")&&(b=b.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a;return!1};function tg(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function ug(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function vg(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
function wg(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function xg(a){var b="";try{a=a.replace("#","");var c=lb(a);c&&v(c,"__firebase_request_key")&&(b=w(c,"__firebase_request_key"))}catch(d){}return b}function yg(){var a=Qc(kg);return a.scheme+"://"+a.host+"/v2"}function zg(a){return yg()+"/"+a+"/auth/channel"};function Ag(a){var b=this;this.Ac=a;this.de="*";sg(8)?this.Rc=this.zd=tg():(this.Rc=window.opener,this.zd=window);if(!b.Rc)throw"Unable to find relay frame";ug(this.zd,"message",q(this.ic,this));ug(this.zd,"message",q(this.Bf,this));try{Bg(this,{a:"ready"})}catch(c){ug(this.Rc,"load",function(){Bg(b,{a:"ready"})})}ug(window,"unload",q(this.zg,this))}function Bg(a,b){b=B(b);sg(8)?a.Rc.doPost(b,a.de):a.Rc.postMessage(b,a.de)}
Ag.prototype.ic=function(a){var b=this,c;try{c=nb(a.data)}catch(d){}c&&"request"===c.a&&(vg(window,"message",this.ic),this.de=a.origin,this.Ac&&setTimeout(function(){b.Ac(b.de,c.d,function(a,c){b.bg=!c;b.Ac=void 0;Bg(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};Ag.prototype.zg=function(){try{vg(this.zd,"message",this.Bf)}catch(a){}this.Ac&&(Bg(this,{a:"error",d:"unknown closed window"}),this.Ac=void 0);try{window.close()}catch(b){}};Ag.prototype.Bf=function(a){if(this.bg&&"die"===a.data)try{window.close()}catch(b){}};function Cg(a){this.pc=Ga()+Ga()+Ga();this.Ef=a}Cg.prototype.open=function(a,b){P.set("redirect_request_id",this.pc);P.set("redirect_request_id",this.pc);b.requestId=this.pc;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+kb(b);window.location=a};Cg.isAvailable=function(){return!rg()&&!qg()};Cg.prototype.Cc=function(){return"redirect"};var Dg={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function Eg(a){var b=Error(w(Dg,a),a);b.code=a;return b};function Fg(a){var b;(b=!a.window_features)||(b=pg(),b=-1!==b.indexOf("Fennec/")||-1!==b.indexOf("Firefox/")&&-1!==b.indexOf("Android"));b&&(a.window_features=void 0);a.window_name||(a.window_name="_blank");this.options=a}
Fg.prototype.open=function(a,b,c){function d(a){h&&(document.body.removeChild(h),h=void 0);t&&(t=clearInterval(t));vg(window,"message",e);vg(window,"unload",d);if(m&&!a)try{m.close()}catch(b){k.postMessage("die",l)}m=k=void 0}function e(a){if(a.origin===l)try{var b=nb(a.data);"ready"===b.a?k.postMessage(y,l):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=sg(8),h,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
var l=wg(a);if(l!==wg(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(h=document.createElement("iframe"),h.setAttribute("src",this.options.relay_url),h.style.display="none",h.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(h),k=h.contentWindow);a+=(/\?/.test(a)?"":"?")+kb(b);var m=window.open(a,this.options.window_name,this.options.window_features);k||(k=m);var t=setInterval(function(){m&&m.closed&&
(d(!1),c&&(c(Eg("USER_CANCELLED")),c=null))},500),y=B({a:"request",d:b});ug(window,"unload",d);ug(window,"message",e)}};
Fg.isAvailable=function(){var a;if(a="postMessage"in window&&!rg())(a=qg()||"undefined"!==typeof navigator&&(!!pg().match(/Windows Phone/)||!!window.Windows&&/^ms-appx:/.test(location.href)))||(a=pg(),a="undefined"!==typeof navigator&&"undefined"!==typeof window&&!!(a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||a.match(/CriOS/)||a.match(/Twitter for iPhone/)||a.match(/FBAN\/FBIOS/)||window.navigator.standalone)),a=!a;return a&&!pg().match(/PhantomJS/)};Fg.prototype.Cc=function(){return"popup"};function Gg(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.options=a}
Gg.prototype.open=function(a,b,c){function d(){c&&(c(Eg("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),h;ug(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=nb(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(Eg("SERVER_ERROR")):c(Eg("NETWORK_ERROR"));c=null;vg(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+kb(b),h=null;else{var k=this.options.headers.content_type;
"application/json"===k&&(h=B(b));"application/x-www-form-urlencoded"===k&&(h=kb(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};za(a,this.options.headers);for(var l in a)e.setRequestHeader(l,a[l]);e.send(h)};Gg.isAvailable=function(){var a;if(a=!!window.XMLHttpRequest)a=pg(),a=!(a.match(/MSIE/)||a.match(/Trident/))||sg(10);return a};Gg.prototype.Cc=function(){return"json"};function Hg(a){this.pc=Ga()+Ga()+Ga();this.Ef=a}
Hg.prototype.open=function(a,b,c){function d(){c&&(c(Eg("USER_CANCELLED")),c=null)}var e=this,f=Qc(kg),h;b.requestId=this.pc;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=kb(b);(h=window.open(a,"_blank","location=no"))&&ha(h.addEventListener)?(h.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var m=document.createElement("a");m.href=a.url;b=m.host===f.host&&"/blank/page.html"===m.pathname;break a}catch(t){}b=!1}b&&(a=xg(a.url),h.removeEventListener("exit",
d),h.close(),a=new lg(null,null,{requestId:e.pc,requestKey:a}),e.Ef.requestWithCredential("/auth/session",a,c),c=null)}),h.addEventListener("exit",d)):c(Eg("TRANSPORT_UNAVAILABLE"))};Hg.isAvailable=function(){return qg()};Hg.prototype.Cc=function(){return"redirect"};function Ig(a){a.callback_parameter||(a.callback_parameter="callback");this.options=a;window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}
Ig.prototype.open=function(a,b,c){function d(){c&&(c(Eg("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__firebase_auth_jsonp[f]=void 0;wa(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);vg(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.options.callback_parameter]="__firebase_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+kb(b);
ug(window,"beforeunload",d);window.__firebase_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};Jg(f,a,c)};
function Jg(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(Eg("NETWORK_ERROR"))};var e=document.getElementsByTagName("head");(e&&0!=e.length?e[0]:document.documentElement).appendChild(d)}catch(f){c&&c(Eg("NETWORK_ERROR"))}},0)}Ig.isAvailable=function(){return"undefined"!==typeof document&&null!=document.createElement};
Ig.prototype.Cc=function(){return"json"};function Kg(a,b,c,d){Lf.call(this,["auth_status"]);this.F=a;this.ef=b;this.Tg=c;this.Me=d;this.sc=new og(a,[Cc,P]);this.nb=null;this.Te=!1;Lg(this)}ma(Kg,Lf);g=Kg.prototype;g.ye=function(){return this.nb||null};function Lg(a){P.get("redirect_request_id")&&Mg(a);var b=a.sc.get();b&&b.token?(Ng(a,b),a.ef(b.token,function(c,d){Og(a,c,d,!1,b.token,b)},function(b,d){Pg(a,"resumeSession()",b,d)})):Ng(a,null)}
function Qg(a,b,c,d,e,f){"firebaseio-demo.com"===a.F.domain&&Q("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");a.ef(b,function(f,k){Og(a,f,k,!0,b,c,d||{},e)},function(b,c){Pg(a,"auth()",b,c,f)})}function Rg(a,b){a.sc.clear();Ng(a,null);a.Tg(function(a,d){if("ok"===a)R(b,null);else{var e=(a||"error").toUpperCase(),f=e;d&&(f+=": "+d);f=Error(f);f.code=e;R(b,f)}})}
function Og(a,b,c,d,e,f,h,k){"ok"===b?(d&&(b=c.auth,f.auth=b,f.expires=c.expires,f.token=bd(e)?e:"",c=null,b&&v(b,"uid")?c=w(b,"uid"):v(f,"uid")&&(c=w(f,"uid")),f.uid=c,c="custom",b&&v(b,"provider")?c=w(b,"provider"):v(f,"provider")&&(c=w(f,"provider")),f.provider=c,a.sc.clear(),bd(e)&&(h=h||{},c=Cc,"sessionOnly"===h.remember&&(c=P),"none"!==h.remember&&a.sc.set(f,c)),Ng(a,f)),R(k,null,f)):(a.sc.clear(),Ng(a,null),f=a=(b||"error").toUpperCase(),c&&(f+=": "+c),f=Error(f),f.code=a,R(k,f))}
function Pg(a,b,c,d,e){Q(b+" was canceled: "+d);a.sc.clear();Ng(a,null);a=Error(d);a.code=c.toUpperCase();R(e,a)}function Sg(a,b,c,d,e){Tg(a);c=new lg(d||{},{},c||{});Ug(a,[Gg,Ig],"/auth/"+b,c,e)}
function Vg(a,b,c,d){Tg(a);var e=[Fg,Hg];c=ng(c);"anonymous"===b||"password"===b?setTimeout(function(){R(d,Eg("TRANSPORT_UNAVAILABLE"))},0):(c.fe.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-625):0),c.fe.relay_url=zg(a.F.Db),c.fe.requestWithCredential=q(a.qc,a),Ug(a,e,"/auth/"+b,c,d))}
function Mg(a){var b=P.get("redirect_request_id");if(b){var c=P.get("redirect_client_options");P.remove("redirect_request_id");P.remove("redirect_client_options");var d=[Gg,Ig],b={requestId:b,requestKey:xg(document.location.hash)},c=new lg(c,{},b);a.Te=!0;try{document.location.hash=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,"")}catch(e){}Ug(a,d,"/auth/session",c,function(){this.Te=!1}.bind(a))}}
g.te=function(a,b){Tg(this);var c=ng(a);c.$a._method="POST";this.qc("/users",c,function(a,c){a?R(b,a):R(b,a,c)})};g.Ue=function(a,b){var c=this;Tg(this);var d="/users/"+encodeURIComponent(a.email),e=ng(a);e.$a._method="DELETE";this.qc(d,e,function(a,d){!a&&d&&d.uid&&c.nb&&c.nb.uid&&c.nb.uid===d.uid&&Rg(c);R(b,a)})};g.qe=function(a,b){Tg(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=ng(a);d.$a._method="PUT";d.$a.password=a.newPassword;this.qc(c,d,function(a){R(b,a)})};
g.pe=function(a,b){Tg(this);var c="/users/"+encodeURIComponent(a.oldEmail)+"/email",d=ng(a);d.$a._method="PUT";d.$a.email=a.newEmail;d.$a.password=a.password;this.qc(c,d,function(a){R(b,a)})};g.We=function(a,b){Tg(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=ng(a);d.$a._method="POST";this.qc(c,d,function(a){R(b,a)})};g.qc=function(a,b,c){Wg(this,[Gg,Ig],a,b,c)};
function Ug(a,b,c,d,e){Wg(a,b,c,d,function(b,c){!b&&c&&c.token&&c.uid?Qg(a,c.token,c,d.od,function(a,b){a?R(e,a):R(e,null,b)}):R(e,b||Eg("UNKNOWN_ERROR"))})}
function Wg(a,b,c,d,e){b=Pa(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){R(e,Eg("TRANSPORT_UNAVAILABLE"))},0):(b=new (b.shift())(d.fe),d=jb(d.$a),d.v="js-"+hb,d.transport=b.Cc(),d.suppress_status_codes=!0,a=yg()+"/"+a.F.Db+c,b.open(a,d,function(a,b){if(a)R(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;R(e,c)}else R(e,null,b)}))}
function Ng(a,b){var c=null!==a.nb||null!==b;a.nb=b;c&&a.ge("auth_status",b);a.Me(null!==b)}g.Be=function(a){K("auth_status"===a,'initial event must be of type "auth_status"');return this.Te?null:[this.nb]};function Tg(a){var b=a.F;if("firebaseio.com"!==b.domain&&"firebaseio-demo.com"!==b.domain&&"auth.firebase.com"===kg)throw Error("This custom Firebase server ('"+a.F.domain+"') does not support delegated login.");};function Xg(a){this.ic=a;this.Nd=[];this.Sb=0;this.re=-1;this.Gb=null}function Yg(a,b,c){a.re=b;a.Gb=c;a.re<a.Sb&&(a.Gb(),a.Gb=null)}function Zg(a,b,c){for(a.Nd[b]=c;a.Nd[a.Sb];){var d=a.Nd[a.Sb];delete a.Nd[a.Sb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Db(function(){f.ic(d[e])})}if(a.Sb===a.re){a.Gb&&(clearTimeout(a.Gb),a.Gb(),a.Gb=null);break}a.Sb++}};function $g(a,b,c){this.se=a;this.f=Nc(a);this.ob=this.pb=0;this.Va=Qb(b);this.Zd=c;this.Hc=!1;this.jd=function(a){b.host!==b.Pa&&(a.ns=b.Db);var c=[],f;for(f in a)a.hasOwnProperty(f)&&c.push(f+"="+a[f]);return(b.lb?"https://":"http://")+b.Pa+"/.lp?"+c.join("&")}}var ah,bh;
$g.prototype.open=function(a,b){this.hf=0;this.la=b;this.Af=new Xg(a);this.Ab=!1;var c=this;this.rb=setTimeout(function(){c.f("Timed out trying to connect.");c.hb();c.rb=null},Math.floor(3E4));Sc(function(){if(!c.Ab){c.Ta=new ch(function(a,b,d,k,l){dh(c,arguments);if(c.Ta)if(c.rb&&(clearTimeout(c.rb),c.rb=null),c.Hc=!0,"start"==a)c.id=b,c.Gf=d;else if("close"===a)b?(c.Ta.Xd=!1,Yg(c.Af,b,function(){c.hb()})):c.hb();else throw Error("Unrecognized command received: "+a);},function(a,b){dh(c,arguments);
Zg(c.Af,a,b)},function(){c.hb()},c.jd);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Ta.ie&&(a.cb=c.Ta.ie);a.v="5";c.Zd&&(a.s=c.Zd);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.jd(a);c.f("Connecting via long-poll to "+a);eh(c.Ta,a,function(){})}})};
$g.prototype.start=function(){var a=this.Ta,b=this.Gf;a.sg=this.id;a.tg=b;for(a.me=!0;fh(a););a=this.id;b=this.Gf;this.gc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.gc.src=this.jd(c);this.gc.style.display="none";document.body.appendChild(this.gc)};
$g.isAvailable=function(){return ah||!bh&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Vg)&&!0};g=$g.prototype;g.Ed=function(){};g.dd=function(){this.Ab=!0;this.Ta&&(this.Ta.close(),this.Ta=null);this.gc&&(document.body.removeChild(this.gc),this.gc=null);this.rb&&(clearTimeout(this.rb),this.rb=null)};
g.hb=function(){this.Ab||(this.f("Longpoll is closing itself"),this.dd(),this.la&&(this.la(this.Hc),this.la=null))};g.close=function(){this.Ab||(this.f("Longpoll is being closed."),this.dd())};g.send=function(a){a=B(a);this.pb+=a.length;Nb(this.Va,"bytes_sent",a.length);a=Jc(a);a=fb(a,!0);a=Wc(a,1840);for(var b=0;b<a.length;b++){var c=this.Ta;c.ad.push({Kg:this.hf,Sg:a.length,kf:a[b]});c.me&&fh(c);this.hf++}};function dh(a,b){var c=B(b).length;a.ob+=c;Nb(a.Va,"bytes_received",c)}
function ch(a,b,c,d){this.jd=d;this.ib=c;this.Qe=new hg;this.ad=[];this.ue=Math.floor(1E8*Math.random());this.Xd=!0;this.ie=Fc();window["pLPCommand"+this.ie]=a;window["pRTLPCB"+this.ie]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||Cb("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.fb=a.contentDocument:a.contentWindow?a.fb=a.contentWindow.document:a.document&&(a.fb=a.document);this.Ea=a;a="";this.Ea.src&&"javascript:"===this.Ea.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ea.fb.open(),this.Ea.fb.write(a),this.Ea.fb.close()}catch(f){Cb("frame writing exception"),f.stack&&Cb(f.stack),Cb(f)}}
ch.prototype.close=function(){this.me=!1;if(this.Ea){this.Ea.fb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ea&&(document.body.removeChild(a.Ea),a.Ea=null)},Math.floor(0))}var b=this.ib;b&&(this.ib=null,b())};
function fh(a){if(a.me&&a.Xd&&a.Qe.count()<(0<a.ad.length?2:1)){a.ue++;var b={};b.id=a.sg;b.pw=a.tg;b.ser=a.ue;for(var b=a.jd(b),c="",d=0;0<a.ad.length;)if(1870>=a.ad[0].kf.length+30+c.length){var e=a.ad.shift(),c=c+"&seg"+d+"="+e.Kg+"&ts"+d+"="+e.Sg+"&d"+d+"="+e.kf;d++}else break;gh(a,b+c,a.ue);return!0}return!1}function gh(a,b,c){function d(){a.Qe.remove(c);fh(a)}a.Qe.add(c,1);var e=setTimeout(d,Math.floor(25E3));eh(a,b,function(){clearTimeout(e);d()})}
function eh(a,b,c){setTimeout(function(){try{if(a.Xd){var d=a.Ea.fb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){Cb("Long-poll script failed to load: "+b);a.Xd=!1;a.close()};a.Ea.fb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var hh=null;"undefined"!==typeof MozWebSocket?hh=MozWebSocket:"undefined"!==typeof WebSocket&&(hh=WebSocket);function ih(a,b,c){this.se=a;this.f=Nc(this.se);this.frames=this.Kc=null;this.ob=this.pb=this.cf=0;this.Va=Qb(b);this.eb=(b.lb?"wss://":"ws://")+b.Pa+"/.ws?v=5";"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(this.eb+="&r=f");b.host!==b.Pa&&(this.eb=this.eb+"&ns="+b.Db);c&&(this.eb=this.eb+"&s="+c)}var jh;
ih.prototype.open=function(a,b){this.ib=b;this.xg=a;this.f("Websocket connecting to "+this.eb);this.Hc=!1;Cc.set("previous_websocket_failure",!0);try{this.ua=new hh(this.eb)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.hb();return}var e=this;this.ua.onopen=function(){e.f("Websocket connected.");e.Hc=!0};this.ua.onclose=function(){e.f("Websocket connection was disconnected.");e.ua=null;e.hb()};this.ua.onmessage=function(a){if(null!==e.ua)if(a=a.data,e.ob+=
a.length,Nb(e.Va,"bytes_received",a.length),kh(e),null!==e.frames)lh(e,a);else{a:{K(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.cf=b;e.frames=[];a=null;break a}}e.cf=1;e.frames=[]}null!==a&&lh(e,a)}};this.ua.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.hb()}};ih.prototype.start=function(){};
ih.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==hh&&!jh};ih.responsesRequiredToBeHealthy=2;ih.healthyTimeout=3E4;g=ih.prototype;g.Ed=function(){Cc.remove("previous_websocket_failure")};function lh(a,b){a.frames.push(b);if(a.frames.length==a.cf){var c=a.frames.join("");a.frames=null;c=nb(c);a.xg(c)}}
g.send=function(a){kh(this);a=B(a);this.pb+=a.length;Nb(this.Va,"bytes_sent",a.length);a=Wc(a,16384);1<a.length&&this.ua.send(String(a.length));for(var b=0;b<a.length;b++)this.ua.send(a[b])};g.dd=function(){this.Ab=!0;this.Kc&&(clearInterval(this.Kc),this.Kc=null);this.ua&&(this.ua.close(),this.ua=null)};g.hb=function(){this.Ab||(this.f("WebSocket is closing itself"),this.dd(),this.ib&&(this.ib(this.Hc),this.ib=null))};g.close=function(){this.Ab||(this.f("WebSocket is being closed"),this.dd())};
function kh(a){clearInterval(a.Kc);a.Kc=setInterval(function(){a.ua&&a.ua.send("0");kh(a)},Math.floor(45E3))};function mh(a){nh(this,a)}var oh=[$g,ih];function nh(a,b){var c=ih&&ih.isAvailable(),d=c&&!(Cc.wf||!0===Cc.get("previous_websocket_failure"));b.Ug&&(c||Q("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.gd=[ih];else{var e=a.gd=[];Xc(oh,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function ph(a){if(0<a.gd.length)return a.gd[0];throw Error("No transports available");};function qh(a,b,c,d,e,f){this.id=a;this.f=Nc("c:"+this.id+":");this.ic=c;this.Wc=d;this.la=e;this.Oe=f;this.F=b;this.Md=[];this.ff=0;this.Of=new mh(b);this.Ua=0;this.f("Connection created");rh(this)}
function rh(a){var b=ph(a.Of);a.I=new b("c:"+a.id+":"+a.ff++,a.F);a.Se=b.responsesRequiredToBeHealthy||0;var c=sh(a,a.I),d=th(a,a.I);a.hd=a.I;a.cd=a.I;a.D=null;a.Bb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.yd=setTimeout(function(){a.yd=null;a.Bb||(a.I&&102400<a.I.ob?(a.f("Connection exceeded healthy timeout but has received "+a.I.ob+" bytes.  Marking connection healthy."),a.Bb=!0,a.I.Ed()):a.I&&10240<a.I.pb?a.f("Connection exceeded healthy timeout but has sent "+
a.I.pb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function th(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.Ua?1===a.Ua&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.F.Pa.substr(0,2)&&(Cc.remove("host:"+a.F.host),a.F.Pa=a.F.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.hd!==c&&a.cd!==c||a.close()):a.f("closing an old connection")}}
function sh(a,b){return function(c){if(2!=a.Ua)if(b===a.cd){var d=Uc("t",c);c=Uc("d",c);if("c"==d){if(d=Uc("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Zd=c.s;Ec(a.F,f);0==a.Ua&&(a.I.start(),uh(a,a.I,d),"5"!==e&&Q("Protocol version mismatch detected"),c=a.Of,(c=1<c.gd.length?c.gd[1]:null)&&vh(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.cd=a.D;for(c=0;c<a.Md.length;++c)a.Id(a.Md[c]);a.Md=[];wh(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
a.Oe&&(a.Oe(c),a.Oe=null),a.la=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Ec(a.F,c),1===a.Ua?a.close():(xh(a),rh(a))):"e"===d?Oc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),yh(a),zh(a)):Oc("Unknown control packet command: "+d)}else"d"==d&&a.Id(c)}else if(b===a.D)if(d=Uc("t",c),c=Uc("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Ah(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.hd!==a.D&&a.cd!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
a.Mf--,Ah(a)));else if("d"==d)a.Md.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}qh.prototype.Fa=function(a){Bh(this,{t:"d",d:a})};function wh(a){a.hd===a.D&&a.cd===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.se),a.I=a.D,a.D=null)}
function Ah(a){0>=a.Mf?(a.f("Secondary connection is healthy."),a.Bb=!0,a.D.Ed(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.hd=a.D,wh(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}qh.prototype.Id=function(a){yh(this);this.ic(a)};function yh(a){a.Bb||(a.Se--,0>=a.Se&&(a.f("Primary connection is healthy."),a.Bb=!0,a.I.Ed()))}
function vh(a,b){a.D=new b("c:"+a.id+":"+a.ff++,a.F,a.Zd);a.Mf=b.responsesRequiredToBeHealthy||0;a.D.open(sh(a,a.D),th(a,a.D));setTimeout(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function uh(a,b,c){a.f("Realtime connection established.");a.I=b;a.Ua=1;a.Wc&&(a.Wc(c),a.Wc=null);0===a.Se?(a.f("Primary connection is healthy."),a.Bb=!0):setTimeout(function(){zh(a)},Math.floor(5E3))}
function zh(a){a.Bb||1!==a.Ua||(a.f("sending ping on primary."),Bh(a,{t:"c",d:{t:"p",d:{}}}))}function Bh(a,b){if(1!==a.Ua)throw"Connection is not connected";a.hd.send(b)}qh.prototype.close=function(){2!==this.Ua&&(this.f("Closing realtime connection."),this.Ua=2,xh(this),this.la&&(this.la(),this.la=null))};function xh(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.yd&&(clearTimeout(a.yd),a.yd=null)};function Ch(a,b,c,d){this.id=Dh++;this.f=Nc("p:"+this.id+":");this.xf=this.Fe=!1;this.$={};this.qa=[];this.Yc=0;this.Vc=[];this.oa=!1;this.Za=1E3;this.Fd=3E5;this.Hb=b;this.Uc=c;this.Pe=d;this.F=a;this.tb=this.Aa=this.Ia=this.Xe=null;this.Ob=!1;this.Td={};this.Jg=0;this.nf=!0;this.Lc=this.He=null;Eh(this,0);Pf.vb().Fb("visible",this.Ag,this);-1===a.host.indexOf("fblocal")&&Of.vb().Fb("online",this.yg,this)}var Dh=0,Fh=0;g=Ch.prototype;
g.Fa=function(a,b,c){var d=++this.Jg;a={r:d,a:a,b:b};this.f(B(a));K(this.oa,"sendRequest call when we're not connected not allowed.");this.Ia.Fa(a);c&&(this.Td[d]=c)};g.yf=function(a,b,c,d){var e=a.va(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};K(!this.$[f][e],"listen() called twice for same path/queryId.");a={G:d,xd:b,Gg:a,tag:c};this.$[f][e]=a;this.oa&&Gh(this,a)};
function Gh(a,b){var c=b.Gg,d=c.path.toString(),e=c.va();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=ce(c.o),f.t=b.tag);f.h=b.xd();a.Fa("q",f,function(f){var k=f.d,l=f.s;if(k&&"object"===typeof k&&v(k,"w")){var m=w(k,"w");ea(m)&&0<=Na(m,"no_index")&&Q("Using an unspecified index. Consider adding "+('".indexOn": "'+c.o.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==l&&Hh(a,d,e),b.G&&b.G(l,
k))})}g.N=function(a,b,c){this.Aa={gg:a,of:!1,zc:b,md:c};this.f("Authenticating using credential: "+a);Ih(this);(b=40==a.length)||(a=$c(a).Bc,b="object"===typeof a&&!0===w(a,"admin"));b&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.Fd=3E4)};g.he=function(a){delete this.Aa;this.oa&&this.Fa("unauth",{},function(b){a(b.s,b.d)})};
function Ih(a){var b=a.Aa;a.oa&&b&&a.Fa("auth",{cred:b.gg},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Aa===b&&delete a.Aa;b.of?"ok"!==d&&b.md&&b.md(d,c):(b.of=!0,b.zc&&b.zc(d,c))})}g.Pf=function(a,b){var c=a.path.toString(),d=a.va();this.f("Unlisten called for "+c+" "+d);if(Hh(this,c,d)&&this.oa){var e=ce(a.o);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.Fa("n",c)}};g.Ne=function(a,b,c){this.oa?Jh(this,"o",a,b,c):this.Vc.push({$c:a,action:"o",data:b,G:c})};
g.Cf=function(a,b,c){this.oa?Jh(this,"om",a,b,c):this.Vc.push({$c:a,action:"om",data:b,G:c})};g.Jd=function(a,b){this.oa?Jh(this,"oc",a,null,b):this.Vc.push({$c:a,action:"oc",data:null,G:b})};function Jh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.Fa(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Kh(this,"p",a,b,c,d)};g.zf=function(a,b,c,d){Kh(this,"m",a,b,c,d)};
function Kh(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.qa.push({action:b,Jf:d,G:e});a.Yc++;b=a.qa.length-1;a.oa?Lh(a,b):a.f("Buffering put: "+c)}function Lh(a,b){var c=a.qa[b].action,d=a.qa[b].Jf,e=a.qa[b].G;a.qa[b].Hg=a.oa;a.Fa(c,d,function(d){a.f(c+" response",d);delete a.qa[b];a.Yc--;0===a.Yc&&(a.qa=[]);e&&e(d.s,d.d)})}g.Ve=function(a){this.oa&&(a={c:a},this.f("reportStats",a),this.Fa("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
g.Id=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Td[b];c&&(delete this.Td[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.Hb(c.p,c.d,!1,c.t):"m"===b?this.Hb(c.p,c.d,!0,c.t):"c"===b?Mh(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Aa,delete this.Aa,c&&c.md&&c.md(a,b)):"sd"===b?this.Xe?this.Xe(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
"\nFIREBASE: ")):Oc("Unrecognized action received from server: "+B(b)+"\nAre you using the latest client?"))}};g.Wc=function(a){this.f("connection ready");this.oa=!0;this.Lc=(new Date).getTime();this.Pe({serverTimeOffset:a-(new Date).getTime()});this.nf&&(a={},a["sdk.js."+hb.replace(/\./g,"-")]=1,qg()&&(a["framework.cordova"]=1),this.Ve(a));Nh(this);this.nf=!1;this.Uc(!0)};
function Eh(a,b){K(!a.Ia,"Scheduling a connect when we're already connected/ing?");a.tb&&clearTimeout(a.tb);a.tb=setTimeout(function(){a.tb=null;Oh(a)},Math.floor(b))}g.Ag=function(a){a&&!this.Ob&&this.Za===this.Fd&&(this.f("Window became visible.  Reducing delay."),this.Za=1E3,this.Ia||Eh(this,0));this.Ob=a};g.yg=function(a){a?(this.f("Browser went online."),this.Za=1E3,this.Ia||Eh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ia&&this.Ia.close())};
g.Df=function(){this.f("data client disconnected");this.oa=!1;this.Ia=null;for(var a=0;a<this.qa.length;a++){var b=this.qa[a];b&&"h"in b.Jf&&b.Hg&&(b.G&&b.G("disconnect"),delete this.qa[a],this.Yc--)}0===this.Yc&&(this.qa=[]);this.Td={};Ph(this)&&(this.Ob?this.Lc&&(3E4<(new Date).getTime()-this.Lc&&(this.Za=1E3),this.Lc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Za=this.Fd,this.He=(new Date).getTime()),a=Math.max(0,this.Za-((new Date).getTime()-this.He)),a*=Math.random(),this.f("Trying to reconnect in "+
a+"ms"),Eh(this,a),this.Za=Math.min(this.Fd,1.3*this.Za));this.Uc(!1)};function Oh(a){if(Ph(a)){a.f("Making a connection attempt");a.He=(new Date).getTime();a.Lc=null;var b=q(a.Id,a),c=q(a.Wc,a),d=q(a.Df,a),e=a.id+":"+Fh++;a.Ia=new qh(e,a.F,b,c,d,function(b){Q(b+" ("+a.F.toString()+")");a.xf=!0})}}g.zb=function(){this.Fe=!0;this.Ia?this.Ia.close():(this.tb&&(clearTimeout(this.tb),this.tb=null),this.oa&&this.Df())};g.rc=function(){this.Fe=!1;this.Za=1E3;this.Ia||Eh(this,0)};
function Mh(a,b,c){c=c?Qa(c,function(a){return Vc(a)}).join("$"):"default";(a=Hh(a,b,c))&&a.G&&a.G("permission_denied")}function Hh(a,b,c){b=(new L(b)).toString();var d;n(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===pa(a.$[b])&&delete a.$[b]):d=void 0;return d}function Nh(a){Ih(a);r(a.$,function(b){r(b,function(b){Gh(a,b)})});for(var b=0;b<a.qa.length;b++)a.qa[b]&&Lh(a,b);for(;a.Vc.length;)b=a.Vc.shift(),Jh(a,b.action,b.$c,b.data,b.G)}function Ph(a){var b;b=Of.vb().jc;return!a.xf&&!a.Fe&&b};var V={mg:function(){ah=jh=!0}};V.forceLongPolling=V.mg;V.ng=function(){bh=!0};V.forceWebSockets=V.ng;V.Ng=function(a,b){a.k.Sa.Xe=b};V.setSecurityDebugCallback=V.Ng;V.Ze=function(a,b){a.k.Ze(b)};V.stats=V.Ze;V.$e=function(a,b){a.k.$e(b)};V.statsIncrementCounter=V.$e;V.sd=function(a){return a.k.sd};V.dataUpdateCount=V.sd;V.qg=function(a,b){a.k.Ee=b};V.interceptServerData=V.qg;V.wg=function(a){new Ag(a)};V.onPopupOpen=V.wg;V.Lg=function(a){kg=a};V.setAuthenticationServer=V.Lg;function S(a,b,c){this.w=a;this.V=b;this.g=c}S.prototype.H=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.w.H()};S.prototype.val=S.prototype.H;S.prototype.mf=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.w.H(!0)};S.prototype.exportVal=S.prototype.mf;S.prototype.lg=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.w.e()};S.prototype.exists=S.prototype.lg;
S.prototype.u=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));ag("Firebase.DataSnapshot.child",a);var b=new L(a),c=this.V.u(b);return new S(this.w.Y(b),c,N)};S.prototype.child=S.prototype.u;S.prototype.Da=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ag("Firebase.DataSnapshot.hasChild",a);var b=new L(a);return!this.w.Y(b).e()};S.prototype.hasChild=S.prototype.Da;
S.prototype.B=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.w.B().H()};S.prototype.getPriority=S.prototype.B;S.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.w.L())return!1;var b=this;return!!this.w.R(this.g,function(c,d){return a(new S(d,b.V.u(c),N))})};S.prototype.forEach=S.prototype.forEach;
S.prototype.wd=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.w.L()?!1:!this.w.e()};S.prototype.hasChildren=S.prototype.wd;S.prototype.name=function(){Q("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");x("Firebase.DataSnapshot.name",0,0,arguments.length);return this.key()};S.prototype.name=S.prototype.name;S.prototype.key=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.V.key()};
S.prototype.key=S.prototype.key;S.prototype.Eb=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.w.Eb()};S.prototype.numChildren=S.prototype.Eb;S.prototype.mc=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.V};S.prototype.ref=S.prototype.mc;function Qh(a,b){this.F=a;this.Va=Qb(a);this.fd=null;this.da=new vb;this.Hd=1;this.Sa=null;b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.ba=new ye(this.F,q(this.Hb,this)),setTimeout(q(this.Uc,this,!0),0)):this.ba=this.Sa=new Ch(this.F,q(this.Hb,this),q(this.Uc,this),q(this.Pe,this));this.Qg=Rb(a,q(function(){return new Lb(this.Va,this.ba)},this));this.uc=new Ff;
this.De=new ob;var c=this;this.Cd=new kf({Ye:function(a,b,f,h){b=[];f=c.De.j(a.path);f.e()||(b=mf(c.Cd,new Wb(Re,a.path,f)),setTimeout(function(){h("ok")},0));return b},be:ba});Rh(this,"connected",!1);this.la=new pc;this.N=new Kg(a,q(this.ba.N,this.ba),q(this.ba.he,this.ba),q(this.Me,this));this.sd=0;this.Ee=null;this.M=new kf({Ye:function(a,b,f,h){c.ba.yf(a,f,b,function(b,e){var f=h(b,e);Ab(c.da,a.path,f)});return[]},be:function(a,b){c.ba.Pf(a,b)}})}g=Qh.prototype;
g.toString=function(){return(this.F.lb?"https://":"http://")+this.F.host};g.name=function(){return this.F.Db};function Sh(a){a=a.De.j(new L(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function Th(a){a=a={timestamp:Sh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
g.Hb=function(a,b,c,d){this.sd++;var e=new L(a);b=this.Ee?this.Ee(a,b):b;a=[];d?c?(b=na(b,function(a){return M(a)}),a=uf(this.M,e,b,d)):(b=M(b),a=qf(this.M,e,b,d)):c?(d=na(b,function(a){return M(a)}),a=pf(this.M,e,d)):(d=M(b),a=mf(this.M,new Wb(Re,e,d)));d=e;0<a.length&&(d=Uh(this,e));Ab(this.da,d,a)};g.Uc=function(a){Rh(this,"connected",a);!1===a&&Vh(this)};g.Pe=function(a){var b=this;Xc(a,function(a,d){Rh(b,d,a)})};g.Me=function(a){Rh(this,"authenticated",a)};
function Rh(a,b,c){b=new L("/.info/"+b);c=M(c);var d=a.De;d.Wd=d.Wd.K(b,c);c=mf(a.Cd,new Wb(Re,b,c));Ab(a.da,b,c)}g.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,Yg:c});var e=Th(this);b=M(b,c);var e=rc(b,e),f=this.Hd++,e=lf(this.M,a,e,f,!0);wb(this.da,e);var h=this;this.ba.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||Q("set at "+a+" failed: "+b);e=of(h.M,f,!e);Ab(h.da,a,e);Wh(d,b,c)});e=Xh(this,a);Uh(this,e);Ab(this.da,e,[])};
g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Th(this),f={};r(b,function(a,b){d=!1;var c=M(a);f[b]=rc(c,e)});if(d)Cb("update() called with empty data.  Don't do anything."),Wh(c,"ok");else{var h=this.Hd++,k=nf(this.M,a,f,h);wb(this.da,k);var l=this;this.ba.zf(a.toString(),b,function(b,d){var e="ok"===b;e||Q("update at "+a+" failed: "+b);var e=of(l.M,h,!e),f=a;0<e.length&&(f=Uh(l,a));Ab(l.da,f,e);Wh(c,b,d)});b=Xh(this,a);Uh(this,b);Ab(this.da,a,[])}};
function Vh(a){a.f("onDisconnectEvents");var b=Th(a),c=[];qc(oc(a.la,b),G,function(b,e){c=c.concat(mf(a.M,new Wb(Re,b,e)));var f=Xh(a,b);Uh(a,f)});a.la=new pc;Ab(a.da,G,c)}g.Jd=function(a,b){var c=this;this.ba.Jd(a.toString(),function(d,e){"ok"===d&&jg(c.la,a);Wh(b,d,e)})};function Yh(a,b,c,d){var e=M(c);a.ba.Ne(b.toString(),e.H(!0),function(c,h){"ok"===c&&a.la.nc(b,e);Wh(d,c,h)})}function Zh(a,b,c,d,e){var f=M(c,d);a.ba.Ne(b.toString(),f.H(!0),function(c,d){"ok"===c&&a.la.nc(b,f);Wh(e,c,d)})}
function $h(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(Cb("onDisconnect().update() called with empty data.  Don't do anything."),Wh(d,"ok")):a.ba.Cf(b.toString(),c,function(e,f){if("ok"===e)for(var l in c){var m=M(c[l]);a.la.nc(b.u(l),m)}Wh(d,e,f)})}function ai(a,b,c){c=".info"===E(b.path)?a.Cd.Pb(b,c):a.M.Pb(b,c);yb(a.da,b.path,c)}g.zb=function(){this.Sa&&this.Sa.zb()};g.rc=function(){this.Sa&&this.Sa.rc()};
g.Ze=function(a){if("undefined"!==typeof console){a?(this.fd||(this.fd=new Kb(this.Va)),a=this.fd.get()):a=this.Va.get();var b=Ra(sa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.$e=function(a){Nb(this.Va,a);this.Qg.Nf[a]=!0};g.f=function(a){var b="";this.Sa&&(b=this.Sa.id+":");Cb(b,arguments)};
function Wh(a,b,c){a&&Db(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function bi(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.Fb("value",f);c={path:b,update:c,G:d,status:null,Ff:Fc(),df:e,Lf:0,je:function(){h.hc("value",f)},le:null,Ba:null,pd:null,qd:null,rd:null};d=a.M.za(b,void 0)||C;c.pd=d;d=c.update(d.H());if(n(d)){Wf("transaction failed: Data returned ",d,c.path);c.status=1;e=Gf(a.uc,b);var k=e.Ca()||[];k.push(c);Hf(e,k);"object"===typeof d&&null!==d&&v(d,".priority")?(k=w(d,".priority"),K(Uf(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
k=(a.M.za(b)||C).B().H();e=Th(a);d=M(d,k);e=rc(d,e);c.qd=d;c.rd=e;c.Ba=a.Hd++;c=lf(a.M,b,e,c.Ba,c.df);Ab(a.da,b,c);ci(a)}else c.je(),c.qd=null,c.rd=null,c.G&&(a=new S(c.pd,new U(a,c.path),N),c.G(null,!1,a))}function ci(a,b){var c=b||a.uc;b||di(a,c);if(null!==c.Ca()){var d=ei(a,c);K(0<d.length,"Sending zero length transaction queue");Sa(d,function(a){return 1===a.status})&&fi(a,c.path(),d)}else c.wd()&&c.R(function(b){ci(a,b)})}
function fi(a,b,c){for(var d=Qa(c,function(a){return a.Ba}),e=a.M.za(b,d)||C,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];K(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.Lf++;var k=O(b,h.path),d=d.K(k,h.qd)}d=d.H(!0);a.ba.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(of(a.M,c[f].Ba));if(c[f].G){var h=c[f].rd,k=new U(a,c[f].path);d.push(q(c[f].G,
null,null,!0,new S(h,k,N)))}c[f].je()}di(a,Gf(a.uc,b));ci(a);Ab(a.da,b,e);for(f=0;f<d.length;f++)Db(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(Q("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].le=d;Uh(a,b)}},e)}function Uh(a,b){var c=gi(a,b),d=c.path(),c=ei(a,c);hi(a,c,d);return d}
function hi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Qa(b,function(a){return a.Ba}),h=0;h<b.length;h++){var k=b[h],l=O(c,k.path),m=!1,t;K(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,t=k.le,e=e.concat(of(a.M,k.Ba,!0));else if(1===k.status)if(25<=k.Lf)m=!0,t="maxretry",e=e.concat(of(a.M,k.Ba,!0));else{var y=a.M.za(k.path,f)||C;k.pd=y;var I=b[h].update(y.H());n(I)?(Wf("transaction failed: Data returned ",I,k.path),l=M(I),"object"===typeof I&&null!=
I&&v(I,".priority")||(l=l.ga(y.B())),y=k.Ba,I=Th(a),I=rc(l,I),k.qd=l,k.rd=I,k.Ba=a.Hd++,Va(f,y),e=e.concat(lf(a.M,k.path,I,k.Ba,k.df)),e=e.concat(of(a.M,y,!0))):(m=!0,t="nodata",e=e.concat(of(a.M,k.Ba,!0)))}Ab(a.da,c,e);e=[];m&&(b[h].status=3,setTimeout(b[h].je,Math.floor(0)),b[h].G&&("nodata"===t?(k=new U(a,b[h].path),d.push(q(b[h].G,null,null,!1,new S(b[h].pd,k,N)))):d.push(q(b[h].G,null,Error(t),!1,null))))}di(a,a.uc);for(h=0;h<d.length;h++)Db(d[h]);ci(a)}}
function gi(a,b){for(var c,d=a.uc;null!==(c=E(b))&&null===d.Ca();)d=Gf(d,c),b=H(b);return d}function ei(a,b){var c=[];ii(a,b,c);c.sort(function(a,b){return a.Ff-b.Ff});return c}function ii(a,b,c){var d=b.Ca();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.R(function(b){ii(a,b,c)})}function di(a,b){var c=b.Ca();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Hf(b,0<c.length?c:null)}b.R(function(b){di(a,b)})}
function Xh(a,b){var c=gi(a,b).path(),d=Gf(a.uc,b);Kf(d,function(b){ji(a,b)});ji(a,d);Jf(d,function(b){ji(a,b)});return c}
function ji(a,b){var c=b.Ca();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(K(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].le="set"):(K(1===c[h].status,"Unexpected transaction status in abort"),c[h].je(),e=e.concat(of(a.M,c[h].Ba,!0)),c[h].G&&d.push(q(c[h].G,null,Error("set"),!1,null))));-1===f?Hf(b,null):c.length=f+1;Ab(a.da,b.path(),e);for(h=0;h<d.length;h++)Db(d[h])}};function W(){this.oc={};this.Qf=!1}W.prototype.zb=function(){for(var a in this.oc)this.oc[a].zb()};W.prototype.rc=function(){for(var a in this.oc)this.oc[a].rc()};W.prototype.we=function(){this.Qf=!0};ca(W);W.prototype.interrupt=W.prototype.zb;W.prototype.resume=W.prototype.rc;function X(a,b){this.bd=a;this.ra=b}X.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);this.bd.Jd(this.ra,a||null)};X.prototype.cancel=X.prototype.cancel;X.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);bg("Firebase.onDisconnect().remove",this.ra);A("Firebase.onDisconnect().remove",1,a,!0);Yh(this.bd,this.ra,null,a)};X.prototype.remove=X.prototype.remove;
X.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);bg("Firebase.onDisconnect().set",this.ra);Vf("Firebase.onDisconnect().set",a,this.ra,!1);A("Firebase.onDisconnect().set",2,b,!0);Yh(this.bd,this.ra,a,b)};X.prototype.set=X.prototype.set;
X.prototype.Kb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);bg("Firebase.onDisconnect().setWithPriority",this.ra);Vf("Firebase.onDisconnect().setWithPriority",a,this.ra,!1);Yf("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);Zh(this.bd,this.ra,a,b,c)};X.prototype.setWithPriority=X.prototype.Kb;
X.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);bg("Firebase.onDisconnect().update",this.ra);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;Q("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Xf("Firebase.onDisconnect().update",a,this.ra);A("Firebase.onDisconnect().update",2,b,!0);
$h(this.bd,this.ra,a,b)};X.prototype.update=X.prototype.update;function Y(a,b,c,d){this.k=a;this.path=b;this.o=c;this.kc=d}
function ki(a){var b=null,c=null;a.ma&&(b=nd(a));a.pa&&(c=pd(a));if(a.g===Od){if(a.ma){if("[MIN_NAME]"!=md(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.pa){if("[MAX_NAME]"!=od(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!Uf(b)||null!=c&&!Uf(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(K(a.g instanceof Sd||a.g===Yd,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
}function li(a){if(a.ma&&a.pa&&a.ja&&(!a.ja||""===a.Nb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function mi(a,b){if(!0===a.kc)throw Error(b+": You can't combine multiple orderBy calls.");}g=Y.prototype;g.mc=function(){x("Query.ref",0,0,arguments.length);return new U(this.k,this.path)};
g.Fb=function(a,b,c,d){x("Query.on",2,4,arguments.length);Zf("Query.on",a,!1);A("Query.on",2,b,!1);var e=ni("Query.on",c,d);if("value"===a)ai(this.k,this,new id(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;ai(this.k,this,new jd(f,e.cancel,e.Ma))}return b};
g.hc=function(a,b,c){x("Query.off",0,3,arguments.length);Zf("Query.off",a,!0);A("Query.off",2,b,!0);mb("Query.off",3,c);var d=null,e=null;"value"===a?d=new id(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new jd(e,null,c||null));e=this.k;d=".info"===E(this.path)?e.Cd.kb(this,d):e.M.kb(this,d);yb(e.da,this.path,d)};
g.Bg=function(a,b){function c(h){f&&(f=!1,e.hc(a,c),b.call(d.Ma,h))}x("Query.once",2,4,arguments.length);Zf("Query.once",a,!1);A("Query.once",2,b,!1);var d=ni("Query.once",arguments[2],arguments[3]),e=this,f=!0;this.Fb(a,c,function(b){e.hc(a,c);d.cancel&&d.cancel.call(d.Ma,b)})};
g.Ie=function(a){Q("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");x("Query.limit",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.o.ja)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.o.Ie(a);li(b);return new Y(this.k,this.path,b,this.kc)};
g.Je=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.o.ja)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.o.Je(a),this.kc)};
g.Ke=function(a){x("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.o.ja)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.o.Ke(a),this.kc)};
g.Cg=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');$f("Query.orderByChild",1,a,!1);mi(this,"Query.orderByChild");var b=be(this.o,new Sd(a));ki(b);return new Y(this.k,
this.path,b,!0)};g.Dg=function(){x("Query.orderByKey",0,0,arguments.length);mi(this,"Query.orderByKey");var a=be(this.o,Od);ki(a);return new Y(this.k,this.path,a,!0)};g.Eg=function(){x("Query.orderByPriority",0,0,arguments.length);mi(this,"Query.orderByPriority");var a=be(this.o,N);ki(a);return new Y(this.k,this.path,a,!0)};g.Fg=function(){x("Query.orderByValue",0,0,arguments.length);mi(this,"Query.orderByValue");var a=be(this.o,Yd);ki(a);return new Y(this.k,this.path,a,!0)};
g.ae=function(a,b){x("Query.startAt",0,2,arguments.length);Vf("Query.startAt",a,this.path,!0);$f("Query.startAt",2,b,!0);var c=this.o.ae(a,b);li(c);ki(c);if(this.o.ma)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new Y(this.k,this.path,c,this.kc)};
g.td=function(a,b){x("Query.endAt",0,2,arguments.length);Vf("Query.endAt",a,this.path,!0);$f("Query.endAt",2,b,!0);var c=this.o.td(a,b);li(c);ki(c);if(this.o.pa)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.k,this.path,c,this.kc)};
g.ig=function(a,b){x("Query.equalTo",1,2,arguments.length);Vf("Query.equalTo",a,this.path,!1);$f("Query.equalTo",2,b,!0);if(this.o.ma)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.o.pa)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.ae(a,b).td(a,b)};
g.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Z;c<a.n.length;c++)""!==a.n[c]&&(b+="/"+encodeURIComponent(String(a.n[c])));return this.k.toString()+(b||"/")};g.va=function(){var a=Vc(ce(this.o));return"{}"===a?"default":a};
function ni(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Ma=c,mb(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(z(a,3,!0)+" must either be a cancel callback or a context object.");return d}Y.prototype.ref=Y.prototype.mc;Y.prototype.on=Y.prototype.Fb;Y.prototype.off=Y.prototype.hc;Y.prototype.once=Y.prototype.Bg;Y.prototype.limit=Y.prototype.Ie;Y.prototype.limitToFirst=Y.prototype.Je;
Y.prototype.limitToLast=Y.prototype.Ke;Y.prototype.orderByChild=Y.prototype.Cg;Y.prototype.orderByKey=Y.prototype.Dg;Y.prototype.orderByPriority=Y.prototype.Eg;Y.prototype.orderByValue=Y.prototype.Fg;Y.prototype.startAt=Y.prototype.ae;Y.prototype.endAt=Y.prototype.td;Y.prototype.equalTo=Y.prototype.ig;Y.prototype.toString=Y.prototype.toString;var Z={};Z.vc=Ch;Z.DataConnection=Z.vc;Ch.prototype.Pg=function(a,b){this.Fa("q",{p:a},b)};Z.vc.prototype.simpleListen=Z.vc.prototype.Pg;Ch.prototype.hg=function(a,b){this.Fa("echo",{d:a},b)};Z.vc.prototype.echo=Z.vc.prototype.hg;Ch.prototype.interrupt=Ch.prototype.zb;Z.Tf=qh;Z.RealTimeConnection=Z.Tf;qh.prototype.sendRequest=qh.prototype.Fa;qh.prototype.close=qh.prototype.close;
Z.pg=function(a){var b=Ch.prototype.put;Ch.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Ch.prototype.put=b}};Z.hijackHash=Z.pg;Z.Sf=Dc;Z.ConnectionTarget=Z.Sf;Z.va=function(a){return a.va()};Z.queryIdentifier=Z.va;Z.rg=function(a){return a.k.Sa.$};Z.listens=Z.rg;Z.we=function(a){a.we()};Z.forceRestClient=Z.we;function U(a,b){var c,d,e;if(a instanceof Qh)c=a,d=b;else{x("new Firebase",1,2,arguments.length);d=Qc(arguments[0]);c=d.Rg;"firebase"===d.domain&&Pc(d.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");c&&"undefined"!=c||Pc("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d.lb||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&Q("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
c=new Dc(d.host,d.lb,c,"ws"===d.scheme||"wss"===d.scheme);d=new L(d.$c);e=d.toString();var f;!(f=!p(c.host)||0===c.host.length||!Tf(c.Db))&&(f=0!==e.length)&&(e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),f=!(p(e)&&0!==e.length&&!Rf.test(e)));if(f)throw Error(z("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof W)e=b;else if(p(b))e=W.vb(),c.Od=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
else e=W.vb();f=c.toString();var h=w(e.oc,f);h||(h=new Qh(c,e.Qf),e.oc[f]=h);c=h}Y.call(this,c,d,$d,!1)}ma(U,Y);var oi=U,pi=["Firebase"],qi=aa;pi[0]in qi||!qi.execScript||qi.execScript("var "+pi[0]);for(var ri;pi.length&&(ri=pi.shift());)!pi.length&&n(oi)?qi[ri]=oi:qi=qi[ri]?qi[ri]:qi[ri]={};U.goOffline=function(){x("Firebase.goOffline",0,0,arguments.length);W.vb().zb()};U.goOnline=function(){x("Firebase.goOnline",0,0,arguments.length);W.vb().rc()};
function Mc(a,b){K(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Bb=q(console.log,console):"object"===typeof console.log&&(Bb=function(a){console.log(a)})),b&&P.set("logging_enabled",!0)):a?Bb=a:(Bb=null,P.remove("logging_enabled"))}U.enableLogging=Mc;U.ServerValue={TIMESTAMP:{".sv":"timestamp"}};U.SDK_VERSION=hb;U.INTERNAL=V;U.Context=W;U.TEST_ACCESS=Z;
U.prototype.name=function(){Q("Firebase.name() being deprecated. Please use Firebase.key() instead.");x("Firebase.name",0,0,arguments.length);return this.key()};U.prototype.name=U.prototype.name;U.prototype.key=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:uc(this.path)};U.prototype.key=U.prototype.key;
U.prototype.u=function(a){x("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof L))if(null===E(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ag("Firebase.child",b)}else ag("Firebase.child",a);return new U(this.k,this.path.u(a))};U.prototype.child=U.prototype.u;U.prototype.parent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.k,a)};U.prototype.parent=U.prototype.parent;
U.prototype.root=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};U.prototype.root=U.prototype.root;U.prototype.set=function(a,b){x("Firebase.set",1,2,arguments.length);bg("Firebase.set",this.path);Vf("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);this.k.Kb(this.path,a,null,b||null)};U.prototype.set=U.prototype.set;
U.prototype.update=function(a,b){x("Firebase.update",1,2,arguments.length);bg("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;Q("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Xf("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);this.k.update(this.path,a,b||null)};U.prototype.update=U.prototype.update;
U.prototype.Kb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);bg("Firebase.setWithPriority",this.path);Vf("Firebase.setWithPriority",a,this.path,!1);Yf("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";this.k.Kb(this.path,a,b,c||null)};U.prototype.setWithPriority=U.prototype.Kb;
U.prototype.remove=function(a){x("Firebase.remove",0,1,arguments.length);bg("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);this.set(null,a)};U.prototype.remove=U.prototype.remove;
U.prototype.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);bg("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(z("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);bi(this.k,this.path,a,b||null,c)};U.prototype.transaction=U.prototype.transaction;
U.prototype.Mg=function(a,b){x("Firebase.setPriority",1,2,arguments.length);bg("Firebase.setPriority",this.path);Yf("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);this.k.Kb(this.path.u(".priority"),a,null,b)};U.prototype.setPriority=U.prototype.Mg;
U.prototype.push=function(a,b){x("Firebase.push",0,2,arguments.length);bg("Firebase.push",this.path);Vf("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=Sh(this.k),c=Nf(c),c=this.u(c);"undefined"!==typeof a&&null!==a&&c.set(a,b);return c};U.prototype.push=U.prototype.push;U.prototype.ib=function(){bg("Firebase.onDisconnect",this.path);return new X(this.k,this.path)};U.prototype.onDisconnect=U.prototype.ib;
U.prototype.N=function(a,b,c){Q("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");x("Firebase.auth",1,3,arguments.length);cg("Firebase.auth",a);A("Firebase.auth",2,b,!0);A("Firebase.auth",3,b,!0);Qg(this.k.N,a,{},{remember:"none"},b,c)};U.prototype.auth=U.prototype.N;U.prototype.he=function(a){x("Firebase.unauth",0,1,arguments.length);A("Firebase.unauth",1,a,!0);Rg(this.k.N,a)};U.prototype.unauth=U.prototype.he;
U.prototype.ye=function(){x("Firebase.getAuth",0,0,arguments.length);return this.k.N.ye()};U.prototype.getAuth=U.prototype.ye;U.prototype.vg=function(a,b){x("Firebase.onAuth",1,2,arguments.length);A("Firebase.onAuth",1,a,!1);mb("Firebase.onAuth",2,b);this.k.N.Fb("auth_status",a,b)};U.prototype.onAuth=U.prototype.vg;U.prototype.ug=function(a,b){x("Firebase.offAuth",1,2,arguments.length);A("Firebase.offAuth",1,a,!1);mb("Firebase.offAuth",2,b);this.k.N.hc("auth_status",a,b)};U.prototype.offAuth=U.prototype.ug;
U.prototype.Xf=function(a,b,c){x("Firebase.authWithCustomToken",2,3,arguments.length);cg("Firebase.authWithCustomToken",a);A("Firebase.authWithCustomToken",2,b,!1);fg("Firebase.authWithCustomToken",3,c,!0);Qg(this.k.N,a,{},c||{},b)};U.prototype.authWithCustomToken=U.prototype.Xf;U.prototype.Yf=function(a,b,c){x("Firebase.authWithOAuthPopup",2,3,arguments.length);eg("Firebase.authWithOAuthPopup",a);A("Firebase.authWithOAuthPopup",2,b,!1);fg("Firebase.authWithOAuthPopup",3,c,!0);Vg(this.k.N,a,c,b)};
U.prototype.authWithOAuthPopup=U.prototype.Yf;U.prototype.Zf=function(a,b,c){x("Firebase.authWithOAuthRedirect",2,3,arguments.length);eg("Firebase.authWithOAuthRedirect",a);A("Firebase.authWithOAuthRedirect",2,b,!1);fg("Firebase.authWithOAuthRedirect",3,c,!0);var d=this.k.N;Tg(d);var e=[Cg],f=ng(c);"anonymous"===a||"firebase"===a?R(b,Eg("TRANSPORT_UNAVAILABLE")):(P.set("redirect_client_options",f.od),Ug(d,e,"/auth/"+a,f,b))};U.prototype.authWithOAuthRedirect=U.prototype.Zf;
U.prototype.$f=function(a,b,c,d){x("Firebase.authWithOAuthToken",3,4,arguments.length);eg("Firebase.authWithOAuthToken",a);A("Firebase.authWithOAuthToken",3,c,!1);fg("Firebase.authWithOAuthToken",4,d,!0);p(b)?(dg("Firebase.authWithOAuthToken",2,b),Sg(this.k.N,a+"/token",{access_token:b},d,c)):(fg("Firebase.authWithOAuthToken",2,b,!1),Sg(this.k.N,a+"/token",b,d,c))};U.prototype.authWithOAuthToken=U.prototype.$f;
U.prototype.Wf=function(a,b){x("Firebase.authAnonymously",1,2,arguments.length);A("Firebase.authAnonymously",1,a,!1);fg("Firebase.authAnonymously",2,b,!0);Sg(this.k.N,"anonymous",{},b,a)};U.prototype.authAnonymously=U.prototype.Wf;
U.prototype.ag=function(a,b,c){x("Firebase.authWithPassword",2,3,arguments.length);fg("Firebase.authWithPassword",1,a,!1);gg("Firebase.authWithPassword",a,"email");gg("Firebase.authWithPassword",a,"password");A("Firebase.authWithPassword",2,b,!1);fg("Firebase.authWithPassword",3,c,!0);Sg(this.k.N,"password",a,c,b)};U.prototype.authWithPassword=U.prototype.ag;
U.prototype.te=function(a,b){x("Firebase.createUser",2,2,arguments.length);fg("Firebase.createUser",1,a,!1);gg("Firebase.createUser",a,"email");gg("Firebase.createUser",a,"password");A("Firebase.createUser",2,b,!1);this.k.N.te(a,b)};U.prototype.createUser=U.prototype.te;U.prototype.Ue=function(a,b){x("Firebase.removeUser",2,2,arguments.length);fg("Firebase.removeUser",1,a,!1);gg("Firebase.removeUser",a,"email");gg("Firebase.removeUser",a,"password");A("Firebase.removeUser",2,b,!1);this.k.N.Ue(a,b)};
U.prototype.removeUser=U.prototype.Ue;U.prototype.qe=function(a,b){x("Firebase.changePassword",2,2,arguments.length);fg("Firebase.changePassword",1,a,!1);gg("Firebase.changePassword",a,"email");gg("Firebase.changePassword",a,"oldPassword");gg("Firebase.changePassword",a,"newPassword");A("Firebase.changePassword",2,b,!1);this.k.N.qe(a,b)};U.prototype.changePassword=U.prototype.qe;
U.prototype.pe=function(a,b){x("Firebase.changeEmail",2,2,arguments.length);fg("Firebase.changeEmail",1,a,!1);gg("Firebase.changeEmail",a,"oldEmail");gg("Firebase.changeEmail",a,"newEmail");gg("Firebase.changeEmail",a,"password");A("Firebase.changeEmail",2,b,!1);this.k.N.pe(a,b)};U.prototype.changeEmail=U.prototype.pe;
U.prototype.We=function(a,b){x("Firebase.resetPassword",2,2,arguments.length);fg("Firebase.resetPassword",1,a,!1);gg("Firebase.resetPassword",a,"email");A("Firebase.resetPassword",2,b,!1);this.k.N.We(a,b)};U.prototype.resetPassword=U.prototype.We;})();


(function () {
	//Cant use || as assigning the same value to an unwritable property would throw an error
	if (!window.altspace) {
		window.altspace = {};
		window.altspace.inClient = false;
	}
	if (!window.altspace.utilities) {
		window.altspace.utilities = {};
	}

	// THREE is exposed locally by the UMD wrapper, but altspace-client.js
	// requires it to be global so export it here, once we
	if (!window.THREE) {
		window.THREE = THREE
	}
}());

/**
 * The Sync utility is currently based on Firebase. It provides a quick way 
 * to synchronize apps between users (even when they are running outside of 
 * AltspaceVR). 
 * During the SDK beta, please consider all data stored with the sync 
 * utility to be ephemeral (it may be cleared or clobbered at any time). 
 * You do not need a Firebase account to use the Sync utility.
 * 
 *
 * Refer to the [Firebase API documentation](https://www.firebase.com/docs/web/api/)
 * when working with the sync instance.
 * @module altspace/utilities/sync
 */
altspace.utilities.sync = (function () {
	var Firebase = window.Firebase;
	var inAltspace = altspace && altspace.inClient;
	var canonicalUrl = getCanonicalUrl();

	var instance;

	function dashEscape(keyName) {
		return keyName ? encodeURIComponent(keyName).replace(/\./g, '%2E').replace(/%[A-Z0-9]{2}/g, '-') : null;
	}

	function getCanonicalUrl() {
		var canonicalElement = document.querySelector('link[rel=canonical]');
		return canonicalElement ? canonicalElement.href : window.location.href;
	}

	function getInstance(params) {
		console.warn('altspace.utilities.sync.getInstance has been deprecated, please use connect instead.');
		return getInstanceRef(params);
	}

	function getInstanceRef(params) {
		var canonicalUrl = getCanonicalUrl();
		var url = new Url();

		params = params || {};

		var instanceId = params.instanceId || url.query['altspace-sync-instance'];
		var projectId = getProjectId(params.appId, params.authorId, canonicalUrl);

		var firebaseApp = new Firebase('https://altspace-apps.firebaseio.com/apps/examples/').child(projectId); //An example firebase to be used for testing. Data will be cleared periodically.
		firebaseApp.child('lastUrl').set(canonicalUrl);

		var firebaseInstance;

		if (instanceId) {
			firebaseInstance = firebaseApp.child('instances').child(instanceId);
		} else {
			firebaseInstance = firebaseApp.child('instances').push();
			instanceId = firebaseInstance.key();
			url.query['altspace-sync-instance'] = instanceId;
			window.location.href = url.toString();
		}
		instance = firebaseInstance;
		return firebaseInstance;
	}

	function getProjectId(appId, authorId, canonicalUrl) {
		return dashEscape(authorId || canonicalUrl) + ':' + dashEscape(appId || '');
	}

	function deprecatedAuthenticate(callback) {
		console.warn('altspace.utilities.sync.authenticate has been depreciated, please use connect instead.');
		var ref = instance || getInstance(params);
		ref.authAnonymously(function(error, authData) {
			if (error) {
				console.error('Authetication Failed!', error);
			} else {
				callback(authData);
			}
		}, {remember: 'sessionOnly'});
	}

	// TODO Removed authentication step for now, until we upgrade to the new Firebase auth.
	function authenticate(ref) {
		return new Promise(function(resolve, reject) {
			ref.authAnonymously(function(error, authData) {
				if (error) {
					console.error('Authetication Failed!', error);
					reject(error);
				} else {
					resolve(authData);
				}
			}, { remember: 'sessionOnly' });
		});
	}
	
	/**
	 * Retreived
	 * via [altspace.utilities.sync.connect]{@link module:altspace/utilities/sync#connect}.
	 * @class module:altspace/utilities/sync~Connection
	 * @memberof module:altspace/utilities/sync
	 */

	/**
		* (In-client only) A Firebase reference for the current user (on a per app basis). This can be used for things like a persistent inventory or personal highscores.
		* @instance
		* @member {Firebase} user
		* @memberof module:altspace/utilities/sync~Connection
		*/

	/**
		* A Firebase reference to the current instance of the app. 
		* This will change if the query paramater is removed through navigation, rebeaming, the space timing out, or other reasons. 
		* This can be used as an input to SceneSync
		* @instance
		* @member {Firebase} instance
		* @memberof module:altspace/utilities/sync~Connection
		*/

	/**
		* (In-client only) A Firebase reference for the current space. Especially useful if multiple apps / instances need to communicate inside the space.
		* @instance
		* @member {Firebase} space
		* @memberof module:altspace/utilities/sync~Connection
		*/

	/**
		* A Firebase reference for the app. 
		* This can be used for things like persistent high-scores, dynamic configuration, or inter-instance communication.
		* @instance
		* @member {Firebase} app
		* @memberof module:altspace/utilities/sync~Connection
		*/


	/**
	 * Connect to a sync session to obtain Firebase references that can be used for syncronization of real-time and persistent state.
	 * Returns a promise that will fufill with a [Connection]{@link module:altspace/utilities/sync~Connection}.
	 *
	 * @method connect
	 * @param {Object} config
	 * @param {String} config.authorId A unique identifier for yourself or your organization
	 * @param {String} config.appId The name of your app
	 * @param {String} [config.baseRefUrl] Override the base reference. Set this to use your own Firebase.
	 * @param {String} [config.instanceId] Override the instanceId. Can also be overriden using a query parameter.
	 * @param {String} [config.spaceId] Override the spaceId. Can also be overriden using a query parameter.
	 * @param {String} [config.userId] Override the userId. Can also be overriden using a query parameter.
	 * @return {Promise}
	 * @memberof module:altspace/utilities/sync
	 **/
	//todo clients
	function connect(config) {
		config = config || {};

		var url = new Url();

		// Our ref used for example apps. Data may be cleared periodically.
		var baseRefUrl = config.baseRefUrl || 'https://altspace-apps.firebaseio.com/apps/examples/';
		var baseRef = new Firebase(baseRefUrl);

		// Gather query paramaters (some may only be used as testing overrides)
		var instanceId = config.instanceId || url.query['altspace-sync-instance'];
		var spaceId = config.spaceId || url.query['altspace-sync-space'];
		var userId = config.userId || url.query['altspace-sync-user'];

		if (!config.appId || !config.authorId) {
			throw new Error('Both the appId and authorId must be provided to connect.');
		}

		var tasks = [];
		if (inAltspace) {
			if (!spaceId) tasks.unshift(altspace.getSpace());
			if (!userId) tasks.unshift(altspace.getUser());
		}

		function getRefs() {
			var refs = {};

			var projectId = getProjectId(config.appId, config.authorId, canonicalUrl);
			refs.app = baseRef.child(projectId).child('app');
			refs.space = spaceId ? refs.app.child('spaces').child(spaceId) : null;
			refs.user = userId ? refs.app.child('users').child(userId) : null;

			var instancesRef = refs.app.child('instances');
			if (instanceId) {
				refs.instance = instancesRef.child(instanceId);
			} else {
				refs.instance = instancesRef.push();
				instanceId = refs.instance.key();
			}
			return refs;
		}

		function updateUrl() {
			if (!url.query['altspace-sync-instance']) {
				url.query['altspace-sync-instance'] = instanceId;
				window.location.href = url.toString();
			}
		}

		return Promise.all(tasks).then(function (results) {
			if (inAltspace) {
				if (!spaceId) spaceId = results.pop().sid;
				if (!userId) userId = results.pop().userId;
			}

			spaceId = dashEscape(spaceId);
			userId = dashEscape(userId);
			instanceId = dashEscape(instanceId);

			var connection = getRefs();

			updateUrl();

			return connection;
		});
	}


	/**
	 * Returns a firebase instance, just as if you had called new Firebase()  
	 *
	 * By using syncInstance.parent() you can store cross-instance data like high scores. Likewise you can store persistent user data at syncInstance.parent().child([userId).
	 * @deprecated The connect function can do this and more! Please switch to using it instead. This function will be removed in the next major version
	 * @method getInstance
	 * @param {Object} params
	 * @param {String} params.appId An identifier for your app.
	 * @param {String} [params.instanceId] An id for a particular instance of
	 *  your app. Leave this blank if you would like to have one automatically generated and appended as a query string.
	 * @param {String} [params.authorId] An identifier for the author of the
	 *  app.
	 * @return {Firebase}
	 * @memberof module:altspace/utilities/sync
	 * @example
	 *  var syncInstance = altspace.utilities.sync.getInstance({
	 *      // All sync instances with the same instance id will share 
	 *      // properties. 
	 *      instanceId: yourInstanceId, 
	 *      // This helps to prevent collisions.
	 *      authorId: yourAuthorId  
	 *  });
	 */
	return {
		connect: connect,
		getInstance: getInstance,
		authenticate: deprecatedAuthenticate
	};
	
}());

/**
 * Utilities to help build AltspaceVR apps on CodePen.io.
 * @module altspace/utilities/codePen
 */
altspace.utilities.codePen = (function () {
	var exports = {};

	var Please = window.Please;
	var Url = window.Url;

	var name = 'VR CodePen';
	var inTile = window.name && window.name.slice(0, 4) === 'pen-';
	var inVR = !!window.altspace.inClient;
	var inCodePen = !!location.href.match('codepen.io/');

	function printDebugInfo() {
		console.log("In a tile: " + inTile);
		console.log("In VR: " + inVR);
	}

	/**
	 * Will stop code exection and post a message informing the user to 
	 * open the example in VR  
	 * @method ensureInVR
	 * @memberof module:altspace/utilities/codePen
	 */
	function ensureInVR() {
		if (inTile || !inVR) //inTile && inAltspace
		{
			var css = document.createElement("style");
			css.type = "text/css";
			css.innerHTML = "@import url(https://fonts.googleapis.com/css?family=Open+Sans:800);.altspace-info{text-align:center;font-family:'Open Sans',sans-serif;line-height:.5}.altspace-vr-notice{color:rgba(0,0,0,.7);font-size:5vw}.altspace-pen-name{font-size:7vw}";
			document.head.appendChild(css);

			document.body.style.background = Please.make_color({ seed: getPenId() });

			var info = document.createElement("div");
			info.className = "altspace-info";
			document.body.appendChild(info);

			var nameEl = document.createElement("span");
			nameEl.className = "altspace-pen-name";
			nameEl.innerHTML = '<p>' + name.toUpperCase() + '</p>';
			info.appendChild(nameEl);

			if (inTile) {
				var errorMsg = 'VR mode does not support preview tiles. Stopping code execution.';
				console.log('ERROR: ' + errorMsg);
				throw new Error(errorMsg);
			}

			if (!inVR) {

				var launchEl = document.createElement("span");
				launchEl.className = "altspace-vr-notice";
				launchEl.innerHTML = '<p>View</p>';
				info.insertBefore(launchEl, nameEl);

				var notice = document.createElement("span");
				notice.className = "altspace-vr-notice";
				notice.innerHTML = '<p>in <a href="http://altvr.com"> AltspaceVR </a></p>';
				info.appendChild(notice);


				var errorMsg = 'Not in VR mode. Stopping code execution.';
				if (inTile) {
					console.log('ERROR: ' + errorMsg);//thrown error message not displayed in console when inTile, log it
				}
				throw new Error(errorMsg);
			}
			return;

		}
	}

	/**
	 * Sets the name to be used by ensureInVR()  
	 * @method setName
	 * @param {String} name
	 * @memberof module:altspace/utilities/codePen
	 */
	function setName(n) {//TODO: A better method for this would be awesome
		name = n;
	}

	function getParsedUrl() {
		var canonicalElement = document.querySelector('link[rel=canonical]');
		var fullUrl = canonicalElement ? canonicalElement.href : window.location.href;
		return new Url(fullUrl);
	}


	/**
	 * Returns the pen ID, useful for setting the sync instanceId.
	 * @method getPenId
	 * @return {String}
	 * @memberof module:altspace/utilities/codePen
	 */
	function getPenId() {
		var url = getParsedUrl();
		var splitPath = url.path.split('/');
		var id = splitPath[splitPath.length - 1];
		return id;
	}

	/**
	 * Returns the pen author ID, useful for setting the sync authorId.
	 * @method getAuthorId
	 * @return {String}
	 * @memberof module:altspace/utilities/codePen
	 */
	function getAuthorId() {
		var url = getParsedUrl();
		var splitPath = url.path.split('/');
		var isTeam = splitPath[1] == 'team';
		var id = isTeam ? 'team-' + splitPath[2] : splitPath[1];
		return id;
	}

	return {
		inTile: inTile,
		inVR: inVR,
		inCodePen: inCodePen,
		ensureInVR: ensureInVR,
		setName: setName,
		getPenId: getPenId,
		getAuthorId: getAuthorId,
		printDebugInfo: printDebugInfo
	};
}());

window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};

/**
 * @module altspace/utilities
 */

/**
 * Simluation is a helper class that lets you quickly setup a three.js app with support for AltspaceVR. It creates a basic scene for you and starts the render and behavior loop.
 *
 * If all of your application logic is in behaviors, you do not need to create any additional requestAnimationFrame loops.
 *
 * It also automatically uses the WebGL renderer when running in a 
 * desktop browser and emulates cursor events with mouse clicks.
 * @class Simulation
 * @param {Object} [config] Optional parameters.
 * @param {Boolean} [config.auto=true] Automatically start the render loop.
 * @memberof module:altspace/utilities
 */
altspace.utilities.Simulation = function (config) {
	config = config || {};
	if (config.auto === undefined) config.auto = true;

	var exports = {};
	var scene = new THREE.Scene();
	var renderer;
	var camera;

	setup();

	function loop() {
		window.requestAnimationFrame(loop);

		if (scene.updateAllBehaviors)
			scene.updateAllBehaviors();

		renderer.render(scene, camera);
	}

	function setup() {
		function setupAltspace() {
			renderer = altspace.getThreeJSRenderer();
			camera = new THREE.PerspectiveCamera(); // TODO: change from shim to symbolic
		}

		function setupWebGL() {
			renderer = new THREE.WebGLRenderer({antialias: true});
			camera = new THREE.PerspectiveCamera();
			camera.position.z = 500;

			var resizeRender = function () {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};
			document.addEventListener("DOMContentLoaded", function (event) {
				document.body.style.margin = '0px';
				document.body.style.overflow = 'hidden';
				renderer.setClearColor('#035F72');
				var container = document.createElement('div');
				document.body.appendChild(container);
				container.appendChild(renderer.domElement);
			});
			window.addEventListener('resize', resizeRender);
			resizeRender();
			camera.fov = 45;
			camera.near = 1;
			camera.far = 2000;
			scene.add(camera);
			scene.add(new THREE.AmbientLight('white'));

			var shouldShimCursor = altspace && altspace.utilities && altspace.utilities.shims && altspace.utilities.shims.cursor;
			if (shouldShimCursor) altspace.utilities.shims.cursor.init(scene, camera);
		}

		if (altspace && altspace.inClient) {
			setupAltspace();
		} else {
			setupWebGL();
		}
	}

	if (config.auto) window.requestAnimationFrame(loop);


	/**
	 * The simulation scene.
	 * @readonly
	 * @instance
	 * @member {THREE.Scene} scene
	 * @memberof module:altspace/utilities.Simulation
	 */
	Object.defineProperty(exports, 'scene', {
		get: function () {
			return scene;
		}
	})

	/**
	 * The renderer being used.
	 * @readonly
	 * @instance
	 * @member {(THREE.WebGLRenderer|AltRenderer)} renderer
	 * @memberof module:altspace/utilities.Simulation
	 */
	Object.defineProperty(exports, 'renderer', {
		get: function () {
			return renderer;
		}
	})

	/**
	 * The camera being used by the WebGL renderer.
	 * @readonly
	 * @instance
	 * @member {Three.Camera} camera
	 * @memberof module:altspace/utilities.Simulation
	 */
	Object.defineProperty(exports, 'camera', {
		get: function () {
			return camera;
		},
		set: function (value) {
			camera = value;
		}
	})
	return exports;
}

window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};


altspace.utilities.multiloader = (function(){
	var loader;
	var TRACE;
	var baseUrl = '';
	var crossOrigin = '';//assigned to THREE.MTLLoader.crossOrigin

	function LoadRequest(){
		//To create loadRequst: new MultiLoader.LoadRequest()

		var objUrls = [];//Paths to model geometry file, in Wavefront OBJ format.
		var mtlUrls = [];//Paths to model materials file, in Wavefront MTL format.
		var objects = [];//objects[i] is result of loader.load(objUrl[i], mtlUrl[i])
		var error;//String indicating loading error with at least one file.
		var objectsLoaded = 0;//Used internally to determine when loading complete.

		return {
			objUrls: objUrls,
			mtlUrls: mtlUrls,
			objects: objects,
			error: error,
			objectsLoaded: objectsLoaded
		};

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
		init: init,
		load: load,
		LoadRequest: LoadRequest,
	};

}());

/**
 * @author gavanwilhite / http://gavanwilhite.com
 */

/**
 * The AltspaceDK includes a Behaviors shim that adds Behavior capabilities to 
 * Three.js.
 * It adds methods to Three.js' Scene and Object3D classes which allow you to 
 * add, remove, retrieve and use Behaviors.
 *
 * @namespace THREE
 */

/**
 * The AltspaceSDK adds Behavior capabilites to Three.js' Scene class.
 * @class Scene
 * @memberof THREE
 */

/**
 * Update the behaviors of all the objects in this Scene.
 * @instance
 * @method updateAllBehaviors 
 * @memberof THREE.Scene
 */
THREE.Scene.prototype.updateAllBehaviors = function () {

	var now = performance.now();
	var lastNow = this.__lastNow || now;

	var deltaTime = now - lastNow;

	var self = this;

	//gather objects first so that behaviors can change the hierarchy during traversal without incident
	var objectsWithBehaviors = [];

	this.traverse(function (object3d) {

		if (object3d.__behaviorList) {
			objectsWithBehaviors.push(object3d);
		}

	});

	for (var i = 0, max = objectsWithBehaviors.length; i < max; i++) {
		object3d = objectsWithBehaviors[i];
		object3d.updateBehaviors(deltaTime, self);
	}

	this.__lastNow = now;

}

/**
 * The AltspaceSDK adds Behavior capabilites to Three.js' Object3D class.
 * @class Object3D
 * @memberof THREE
 */

/**
 * Adds the given behavior to this object.
 * @instance
 * @method addBehavior 
 * @param {Behavior} behavior Behavior to add.
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.addBehavior = function()
{
	this.__behaviorList = this.__behaviorList || [];
	Array.prototype.push.apply(this.__behaviorList, arguments);
}

/**
 * Adds the given behaviors to this object.
 * @instance
 * @method addBehaviors
 * @param {...Behavior} behavior Behavior to add.
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.addBehaviors = function()
{
	this.__behaviorList = this.__behaviorList || [];
	Array.prototype.push.apply(this.__behaviorList, arguments);
}

/**
 * Removes the given behavior from this object. The behavior is disposed if
 * possible.
 * @instance
 * @method removeBehavior 
 * @param {...Behavior} behavior Behavior to remove.
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.removeBehavior = function(behavior)
{
	var i = this.__behaviorList.indexOf(behavior);
	if (i !== -1) {
		this.__behaviorList.splice(i, 1);
		try {

			if (behavior.dispose) behavior.dispose.call(behavior, this);

		} catch (error) {
			
			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this);
			console.groupEnd();

		}
	}
}

/**
 * Removes all behaviors from this object. The behaviors are disposed if
 * possible.
 * @instance
 * @method removeAllBehaviors
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.removeAllBehaviors = function ()
{
	if (!this.__behaviorList || this.__behaviorList.length === 0) return null;

	for (var i = 0, max = this.__behaviorList.length; i < max; i++) {
		var behavior = this.__behaviorList[i];

		try {

			if (behavior.dispose) behavior.dispose.call(behavior, this);

		} catch (error) {

			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this);
			console.groupEnd();

		}
	}
}

/**
 * Retrieve a behavior by type.
 * @instance
 * @method getBehaviorByType
 * @param {String} type 
 * @returns {Behavior}
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.getBehaviorByType = function(type) {
	if (!this.__behaviorList || this.__behaviorList.length === 0) return null;

	for (var i = 0, max = this.__behaviorList.length; i < max; i++) {
		if (this.__behaviorList[i].type === type)
			return this.__behaviorList[i];
	}
}

/**
 * Update behaviors on this object.
 * @instance
 * @method updateBehaviors
 * @param {Number} deltaTime Elapsed time in milliseconds
 * @memberof THREE.Object3D
 */
THREE.Object3D.prototype.updateBehaviors = function(deltaTime, scene) {

	if (!this.__behaviorList || this.__behaviorList.length === 0) return;

	var toInit = [];
	var toUpdate = this.__behaviorList.slice(); // prevent mutation of the behavior list during this loop

	for (var i = 0, max = this.__behaviorList.length; i < max; i++) {

		var behavior = this.__behaviorList[i];
		if (!behavior.__isInitialized) toInit.push(behavior);

	}

	//Awake
	for (var i = 0, max = toInit.length; i < max; i++) {

		var behavior = toInit[i];
		try {

			if (behavior.awake) behavior.awake.call(behavior, this, scene);

		} catch (error) {

			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this);
			console.groupEnd();

		}

	}

	//Start
	for (var i = 0, max = toInit.length; i < max; i++) {

		var behavior = toInit[i];
		try {

			if (behavior.start) behavior.start.call(behavior);

		} catch (error) {

			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this);
			console.groupEnd();

		}
		behavior.__isInitialized = true;

	}

	//Update
	for (var i = 0, max = toUpdate.length; i < max; i++) {

		var behavior = toUpdate[i];
		try {

			if (behavior.update) behavior.update.call(behavior, deltaTime);

		} catch (error) {

			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this);
			console.groupEnd();

		}

	}

}



altspace = window.altspace || {};
altspace.utilities = altspace.utilities || {};
altspace.utilities.shims = altspace.utilities.shims || {};
/**
 * Detects mouse move/up/down events, raycasts to find intersected objects, 
 * then dispatches cursor move/up/down/enter/leave events that mimics 
 * Altspace events.
 * @module altspace/utilities/shims/cursor
 */
altspace.utilities.shims.cursor = (function () {
	//TODO: Support non-full window apps

	var scene;
	var camera;
	var domElem;

	var overObject;

	var raycaster = new THREE.Raycaster();

	/**
	 * Initializes the cursor module 
	 * @static
	 * @method init
	 * @param {THREE.Scene} scene
	 * @param {THREE.Camera} camera - Camera used for raycasting.
	 * @param {Object} [options] - An options object
	 * @param {THREE.WebGLRenderer} [options.renderer] - If supplied, applies cursor movement to render target 
	 *	instead of entire client
	 * @memberof module:altspace/utilities/shims/cursor
	 */
	function init(_scene, _camera, _params) {
		if (!_scene || !_scene instanceof THREE.Scene) {
			throw new TypeError('Requires THREE.Scene argument');
		}
		if (!_camera || !_camera instanceof THREE.Camera) {
			throw new TypeError('Requires THREE.Camera argument');
		}
		scene = _scene;
		camera = _camera;

		p = _params || {};
		domElem = p.renderer && p.renderer.domElement || window;

		domElem.addEventListener('mousedown', mouseDown, false)
		domElem.addEventListener('mouseup', mouseUp, false)
		domElem.addEventListener('mousemove', mouseMove, false)
	}

	function mouseDown(event) {

		var intersection = findIntersection(event);
		if (!intersection || !intersection.point) return;

		var cursorEvent = createCursorEvent('cursordown', intersection);
		intersection.object.dispatchEvent(cursorEvent);
	}

	function mouseUp(event) {
		var intersection = findIntersection(event);

		var cursorEvent = createCursorEvent('cursorup', intersection);

		if (intersection) {
			intersection.object.dispatchEvent(cursorEvent);
		} else {
			scene.dispatchEvent(cursorEvent);
		}
	}

	function mouseMove(event) {
		var intersection = findIntersection(event);

		var cursorEvent = createCursorEvent('cursormove', intersection);//TODO improve and don't fire only on scene
		scene.dispatchEvent(cursorEvent);

		var object = intersection ? intersection.object : null;
		if (overObject != object) {
			if (overObject) {
				cursorEvent = createCursorEvent('cursorleave', intersection);
				overObject.dispatchEvent(cursorEvent);
			}

			if (object) {
				cursorEvent = createCursorEvent('cursorenter', intersection);
				object.dispatchEvent(cursorEvent);
			}

			overObject = object;
		}
	}

	function createCursorEvent(type, intersection) {
		return {
			type: type,
			bubbles: true,
			target: intersection ? intersection.object : null,
			ray: {
				origin: raycaster.ray.origin.clone(),
				direction: raycaster.ray.direction.clone()
			},
			point: intersection ? intersection.point.clone() : null
		}
	}

	function findIntersection(mouseEvent) {
		var mouse = new THREE.Vector2();
		mouse.x = (mouseEvent.offsetX / (domElem.width || domElem.innerWidth)) * 2 - 1;
		mouse.y = -(mouseEvent.offsetY / (domElem.height || domElem.innerHeight)) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		var intersections = raycaster.intersectObjects(scene.children, true);
		return intersections.length > 0 ? intersections[0] : null;

	}

	return {
		init: init,
	};

}());


/**
 * The Altspace SDK adds event bubbling to Three.js' events system.
 * Simply include the SDK in your app and add a bubbling property to your event to take advantage of this feature.
 * 
 * AltspaceVR cursor events always make use of this bubbling shim.
 *
 * @example
 * var parent = new THREE.Object3D();
 * parent.addEventListener('custom', function () {
 *     console.log('received custom event');
 * });
 * var child = new THREE.Object3D();
 * parent.add(child);
 * child.dispatchEvent({type: 'custom', bubbles: true});
 * // Console log shows 'received custom event'
 *
 * @module altspace/utilities/shims/bubbling
 */
( function() {

	if (!THREE) return;

	if (window.altspace && window.altspace.inAltspace) return;

	THREE.EventDispatcher.prototype.dispatchEvent = dispatchEvent;
	THREE.Object3D.prototype.dispatchEvent = dispatchEvent;

	function dispatchEvent( event ) {

		var shouldStopPropagation;
		var shouldStopPropagationImmediately;

		if ( event.bubbles ) {

			event.currentTarget = this;

			event.stopPropagation = function () {

				shouldStopPropagation = true;

			}

			event.stopImmediatePropagation = function () {

				shouldStopPropagationImmediately = true;

			}

		}

		if ( this._listeners ) {

			var listeners = this._listeners;
			var listenerArray = listeners[ event.type ];

			if ( listenerArray ) {

				event.target = event.target || this;

				var array = [];
				var length = listenerArray.length;

				for ( var i = 0; i < length; i ++ ) {

					array[ i ] = listenerArray[ i ];

				}

				for ( var i = 0; i < length; i ++ ) {

					array[ i ].call( this, event );

					if ( shouldStopPropagationImmediately ) return;

				}

			}

		}


		if ( event.bubbles && this.parent && this.parent.dispatchEvent && ! shouldStopPropagation ) {

			dispatchEvent.call( this.parent, event );

		}

	}

}() );

/**
 * @module altspace/utilities/behaviors
 */
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The Bob behavior adds a bobbing animation to an object
 *
 * @class Bob
 * @param {Object} [config]
 * @param {Boolean} [config.shouldRotate=true] Whether the animation should include
 *  rotation.
 * @param {Boolean} [config.shouldMove=true] Whether the animation should
 *  include movement.
 * @memberof module:altspace/utilities/behaviors
 **/
altspace.utilities.behaviors.Bob = function (config) {
	var object3d;

	config = config || {};

	if (config.shouldRotate === undefined) config.shouldRotate = true;
	if (config.shouldMove === undefined) config.shouldMove = true;

	var offsetPosition;
	var lastBobPosition = new THREE.Vector3();
	//TODO: Rotation

	var nowOffset = Math.random() * 10000;

	function awake(o) {
		object3d = o;
		offsetPosition = object3d.position.clone();
	}

	function update(deltaTime) {
		var nowInt = Math.floor(performance.now()) + nowOffset;

		if (config.shouldMove) {
			if (!lastBobPosition.equals(object3d.position)) offsetPosition.copy(object3d.position);

			object3d.position.y = offsetPosition.y + Math.sin(nowInt / 800) * 3;
			object3d.position.x = offsetPosition.x + Math.sin(nowInt / 500) * 5;
			lastBobPosition.copy(object3d.position);
		}

		if (config.shouldRotate) {
			object3d.rotation.x = Math.sin(nowInt / 500) / 15;
		}
	}

	return { awake: awake, update: update };
};

window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * A behavior that changes the color of an object when the cursor interacts with it.
 * @class ButtonStateStyle
 * @param {Object} [config] Optional parameters.
 * @param {THREE.Color} [config.originalColor] Base material color.
 * @param {Number} [config.overBrightness=1.5] Material brightness when cursor
 *	is over button.
 * @param {Number} [config.downBrightness=0.5] Material brightness when cursor
 *	is clicked.
 * @memberof module:altspace/utilities/behaviors
 */
altspace.utilities.behaviors.ButtonStateStyle = function (config) {
	var object3d;
	var scene;
	var originalColor;
	var modifiedColor = new THREE.Color();

	config = config || {};
	var overBrightness = config.overBrightness || 1.5;
	var downBrightness = config.downBrightness || 0.5;

	function changeBrightness(brightness) {
		modifiedColor.set(originalColor);
		modifiedColor.multiplyScalar(brightness);
		modifiedColor.r = THREE.Math.clamp(modifiedColor.r, 0, 1);
		modifiedColor.g = THREE.Math.clamp(modifiedColor.g, 0, 1);
		modifiedColor.b = THREE.Math.clamp(modifiedColor.b, 0, 1);
		object3d.material.color = modifiedColor;
	}

	function cursorLeave() {
		object3d.removeEventListener('cursorleave', cursorLeave);
		changeBrightness(1.0);
	}

	function cursorEnter() {
		changeBrightness(overBrightness);
		object3d.addEventListener('cursorleave', cursorLeave);
	}

	function cursorUp(event) {
		scene.removeEventListener('cursorup', cursorUp);
		object3d.addEventListener('cursorenter', cursorEnter);
		if (event.target === object3d) {
			changeBrightness(overBrightness);
			object3d.addEventListener('cursorleave', cursorLeave);
		} else {
			changeBrightness(1.0);
		}
	}
	function cursorDown() {
		scene.addEventListener('cursorup', cursorUp);
		object3d.removeEventListener('cursorleave', cursorLeave);
		object3d.removeEventListener('cursorenter', cursorEnter);
		changeBrightness(downBrightness);
	}

	function awake(o, s) {
		object3d = o;
		scene = s;
		originalColor = config.originalColor || object3d.material.color;
		object3d.addEventListener('cursorenter', cursorEnter);
		object3d.addEventListener('cursordown', cursorDown);
	}

	function dispose() {
		object3d.removeEventListener('cursorenter', cursorEnter);
		object3d.removeEventListener('cursorleave', cursorLeave);
		object3d.removeEventListener('cursorup', cursorUp);
		object3d.removeEventListener('cursordown', cursorDown);
	}

	return { awake: awake, dispose: dispose, type: 'ButtonStateStyle' };
};

window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

//idea: API for symbolic camera from altspace? altspace.getThreeJSCenterCamera();
//idea: offset (drag from bottom of piece). Workaround if you reparent

//TODO: GSAP Draggable
/**
 * A behavior that makes an object draggable along a plane.
 * @class Drag
 * @param {Object} [config] Specify the axes along which the object can be 
 *  dragged.
 *  E.g. To constraint th object to an XY plane: `{x: true, y: true}`  
 *  Each axis can also be an object specifying the minimum and maximum limits
 *  of the constraint. E.g. `{x: {min: -10, max: 20}, y: true}`  
 *  **Note:** Currently you must specify exactly two axes.
 * @memberof module:altspace/utilities/behaviors
 */
altspace.utilities.behaviors.Drag = function (config) {
	//space: view, local, world, sphere
	//gridSnap, cursorSnap
	//config: x: true, y: true, z: false, defaultDistance: 1000

	config = config || {};

	if (config.space === undefined) config.space = 'world';//TODO others
	if (config.x === undefined) config.x = false;
	if (config.y === undefined) config.y = false;
	if (config.z === undefined) config.z = false;
	if (config.cursorSnap === undefined) config.cursorSnap = true;//TODO false

	var inX = !!config.x;
	var inY = !!config.y;
	var inZ = !!config.z;
	var min = new THREE.Vector3(
		config.x.min !== undefined ? config.x.min : Number.NEGATIVE_INFINITY,
		config.y.min !== undefined ? config.y.min : Number.NEGATIVE_INFINITY,
		config.z.min !== undefined ? config.z.min : Number.NEGATIVE_INFINITY
	);
	var max = new THREE.Vector3(
		config.x.max !== undefined ? config.x.max : Number.POSITIVE_INFINITY,
		config.y.max !== undefined ? config.y.max : Number.POSITIVE_INFINITY,
		config.z.max !== undefined ? config.z.max : Number.POSITIVE_INFINITY
	);

	var object3d;
	var scene;
	var sync;
	var intersector;
	var dragOffset = new THREE.Vector3();
	var raycaster = new THREE.Raycaster();
	raycaster.linePrecision = 3;

	//if (THREE.REVISION !== '72') throw new Error('Drag requires three.js revision 72'); //TODO: Do we need a revision check?

	function awake(o, s) {
		object3d = o;
		scene = s;
		sync = object3d.getBehaviorByType('Object3DSync');
		makeIntersector();
		scene.add(intersector);//TODO: see if I can remove it from the scene. Might not req 72.
	}

	function makeIntersector() {
		var extent = 10000;
		var plane = new THREE.PlaneGeometry(extent, extent);

		function makeXY() {
			plane.rotateY(Math.PI);
		}
		function makeXZ() {
			plane.rotateX(Math.PI / 2);
		}
		function makeYZ() {
			plane.rotateY(Math.PI / 2);
		}
		function makeViewAligned() {
			throw new Error('Not implemented');
		}

		var axisCount = inX + inY + inZ; // implicit cast to integers

		if (axisCount === 3) {

			throw new Error('Arbitrary dragging currently unsupported. Please lock at least one axis.');

		} else if (axisCount === 2) {

			if (inX && inY) {
				makeXY();
			} else if (inX && inZ) {
				makeXZ();
			} else if (inY && inZ) {
				makeYZ();
			}

		} else if (axisCount === 1) {

			throw new Error('Single axis dragging currently unsupported.');
			//TODO: make possible, possibly via view-aligned plane 

		} else {
			throw new Error('Invalid axis configuration');
		}
		var material = new THREE.MeshBasicMaterial({ color: 'purple' });
		material.side = THREE.DoubleSide;
		intersector = new THREE.Mesh(plane, material);
		intersector.visible = false;// ensures other raycasters don't hit our intersector
		intersector.material.visible = false;// ensures we never see flicker during temp visibility
	}

	function getWorldPosition(obj) {
		obj.updateMatrixWorld();
		var vec = new THREE.Vector3();
		vec.setFromMatrixPosition(obj.matrixWorld);
		return vec;
	}

	function vec2str(vec) {
		function shortNum(num) {
			return Math.floor(num * 100) / 100;
		}
		return 'x: ' + shortNum(vec.x) + ', y: ' + shortNum(vec.y) + ', z: ' + shortNum(vec.z);
	}

	function startDrag(event) {
		scene.addEventListener('cursorup', stopDrag);
		scene.addEventListener('cursormove', moveDrag);

		//Remember difference between center of object and drag point. 
		//Otherwise, object appears to 'jump' when selected, moving so its
		//center is directly until the cursor. We allow drag on edge of object.
		raycaster.set(event.ray.origin, event.ray.direction);
		var hit = raycaster.intersectObject(object3d, true)[0];
		if (!hit) return;
		var dragPoint = hit.point.clone();
		var objectCenterPoint = getWorldPosition(object3d).clone();
		dragOffset.copy(dragPoint).sub(objectCenterPoint);

		//Move to drag point (not object center), where raycast hits the object.
		intersector.position.copy(dragPoint);
		intersector.updateMatrixWorld();// necessary for raycast, TODO: Make GH issue
	}

	function moveDrag(event) {

		if (sync && !sync.isMine) sync.takeOwnership();

		//find intersection
		intersector.visible = true;// allow our intersector to be intersected
		raycaster.set(event.ray.origin, event.ray.direction);
		var intersection = raycaster.intersectObject(intersector, true)[0];
		intersector.visible = false;// disallow our intersector to be intersected

		if (!intersection) return;

		//New position is intersection point minus offset. Need offset since
		//user probably won't click on exact center of object to drag it.
		var targetWorldPosition = new THREE.Vector3();
		targetWorldPosition.copy(intersection.point).sub(dragOffset);
		//But maintain the original y position of the object.
		targetWorldPosition.y = getWorldPosition(object3d).y;

		//constrain target position
		targetWorldPosition.clamp(min, max);

		//move object
		object3d.parent.updateMatrixWorld();
		var targetLocalPosition = object3d.parent.worldToLocal(targetWorldPosition);//TODO: Test with nested objects
		object3d.position.set(
			config.x ? targetLocalPosition.x : object3d.position.x,
			config.y ? targetLocalPosition.y : object3d.position.y,
			config.z ? targetLocalPosition.z : object3d.position.z
		);

	}

	function stopDrag() {
		scene.removeEventListener('cursorup', stopDrag);
		scene.removeEventListener('cursormove', moveDrag);
	}

	function start() {
		object3d.addEventListener('cursordown', startDrag);
	}

	return { awake: awake, start: start };
};

/**
 * @module altspace/utilities/behaviors
 */
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * Allows an object to be moved, rotated, and scaled using a gamepad controller.
 * Left stick left / right and up / down moves object in the X-Y plane.
 * Clicking left stick enters left alt mode, where movement is in X-Z plane.
 * Clicking left stick again exits left alt mode.
 * Right stick left / right rotates object clockwise / counterclockwise (y axis).
 * Rifht stick up / down rotates object away forwards / backwards (x axis).
 * Clicking right stick enters right alt mode, where left / right tumbles object (z axis).
 * Clicking right stick again exits right alt mode.
 * D-pad up / down scales object.
 * Back / reset button resets object to its original position and rotation.
 *
 * @param {Boolean} [config.position=true] Whether object's position can be changed.
 * @param {Boolean} [config.rotation=true] Whether object's rotation can be changed.
 * @param {Boolean} [config.scale=true] Whether object's scale can be changed.
 *
 * @class GamepadControls
 * @memberof module:altspace/utilities/behaviors
 **/
altspace.utilities.behaviors.GamepadControls = function (config) {
	var object3d;
	var gamepad;
	var scene;
	var sync;

	var isAltModeR= false;
	var isAltModeL= false;
	var prevAltButtonR = false;
	var prevAltButtonL = false;
	var isInitialized = false;

	var originalObj;//used to reset
	var tolerance = 0.2;//ignore stick deadzone

	config = config || {};
	if (config.position === undefined) config.position = true;
	if (config.rotation === undefined) config.rotation = true;
	if (config.scale === undefined) config.scale = true;

	function awake(o, s) {

		object3d = o;
		scene = s;
		sync = object3d.getBehaviorByType('Object3DSync');
		originalObj = object3d.clone();
		gamepad = getGamepad();
		if (gamepad) {
			console.log('Gamepad detected: ' + gamepad.id);
		} else {
			var intervalID = setInterval(function() {
				gamepad = getGamepad();
				if (gamepad) {
					console.log('Gamepad connected: ' + gamepad.id);
					clearInterval(intervalID);
				}
			}, 500);
		}

		scene.addEventListener('cursordown', function(e) {
			//preventDefault only works when app has focus, so call after initial click
			if (gamepad && !isInitialized) {
				preventDefault(gamepad);
				isInitialized = true;
			}
		});

	}

	function getGamepad() {
		if (altspace && altspace.inClient) {
			gamepads = altspace.getGamepads();
		} else {
			//Gamepad API works in Chrome and Firefox browsers only
			//https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API
			gamepads = navigator.getGamepads();
		}
		if (gamepads.length > 0) {
			for (var i=0; i < gamepads.length; i++) {
				var g = gamepads[i];
				if (g && g.axes  && g.axes.length === 4 && g.buttons && g.buttons.length === 16) {
					if (altspace && altspace.inClient) preventDefault(g);
					return g;//return first valid gamepad
				}
			}
		}
		return undefined;
	}

	function preventDefault(g) {
		var axes = [];
		var buttons = [];
		for (var i=0; i > g.buttons; i++) buttons[i] = false;
		for (var i=0; i > g.axes; i++) axes[i] = false;
		if (config.position) {
			axes[0] = true;
			axes[1] = true;
			buttons[10] = true;
		}
		if (config.rotation) {
			axes[2] = true;
			axes[3] = true;
			buttons[11] = true;
		}
		if (config.scale) {
			buttons[12] = true;
			buttons[13] = true;
		}
		buttons[8] = true;
		g.preventDefault(axes, buttons);
	}

	function update(deltaTime) {
		if ((!altspace || !altspace.inClient) && window.chrome && gamepad) {
			gamepad = getGamepad();//On Chrome, need to poll for updates.
		}
		if (!gamepad) return;

		//For axis and button numbers see: https://w3c.github.io/gamepad/  
		var isResetButton = gamepad.buttons[8].pressed;//reset / back button
		if (isResetButton) {
			if (!sync.isMine) sync.takeOwnership();
			object3d.position.copy(originalObj.position);
			object3d.rotation.copy(originalObj.rotation);
			object3d.scale.copy(originalObj.scale);
			return;
		}

		if (config.position) {
			var isAltButtonL = gamepad.buttons[10].pressed;//left stick button
			if (prevAltButtonL && !isAltButtonL) isAltModeL = !isAltModeL;//button released
			prevAltButtonL = isAltButtonL;

			var leftStickX = gamepad.axes[0];//left / right
			var leftStickY = gamepad.axes[1];//up / down

			var isMove = Math.abs(leftStickX) > tolerance || Math.abs(leftStickY) > tolerance;
			if (isMove && !sync.isMine) sync.takeOwnership();

			var moveDistance = 200 * (deltaTime/1000);// 200 units per second
			if (!isAltModeL && Math.abs(leftStickX) > tolerance) {
				object3d.position.x += moveDistance * leftStickX;
			}
			if (!isAltModeL && Math.abs(leftStickY) > tolerance) {
				object3d.position.z += moveDistance * leftStickY;
			}
			if (isAltModeL && Math.abs(leftStickX) > tolerance) {
				object3d.position.x += moveDistance * leftStickX;
			}
			if (isAltModeL && Math.abs(leftStickY) > tolerance) {
				object3d.position.y += moveDistance * -leftStickY;
			}
		}

		if (config.rotation) {
			var isAltButtonR = gamepad.buttons[11].pressed;//right stick button
			if (prevAltButtonR && !isAltButtonR) isAltModeR = !isAltModeR;//button released
			prevAltButtonR = isAltButtonR;

			var rightStickX = gamepad.axes[2];//left / right
			var rightStickY = gamepad.axes[3];//up / down

			var isRotate = Math.abs(rightStickX) > tolerance || Math.abs(rightStickY) > tolerance;
			if (isRotate && !sync.isMine) sync.takeOwnership();

			var rotateAngle = Math.PI * (deltaTime/1000);// 180 degrees per second
			if (!isAltModeR && Math.abs(rightStickX) > tolerance) {
				object3d.rotation.y += rotateAngle * rightStickX;
			}
			if (!isAltModeR && Math.abs(rightStickY) > tolerance) {
				object3d.rotation.x += rotateAngle * rightStickY;
			}
			if (isAltModeR && Math.abs(rightStickX) > tolerance) {
				object3d.rotation.z += rotateAngle * -rightStickX;
			}
		}

		if (config.scale) {
			var scaleChange = 10 * (deltaTime/1000);// 10 units per second
			var dpadUp = gamepad.buttons[12].pressed;//d-pad up
			var dpadDown = gamepad.buttons[13].pressed;//d-pad down

			var isScale = gamepad.buttons[12].pressed || gamepad.buttons[13].pressed;
			if (isScale && !sync.isMine) sync.takeOwnership();

			var prev = object3d.scale;
			var v3 = new THREE.Vector3(1, 1, 1);
			v3.multiplyScalar(scaleChange);
			if (dpadUp) object3d.scale.add(v3);
			if (dpadDown) {
				if (prev.x > v3.x && prev.y > v3.y && prev.z > v3.z) {//Don't go negative.
					object3d.scale.sub(v3);
				}
			}
		}

	}

	return { awake: awake, update: update };
};


//Change color of an object when cursor hovers over it.
window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * Changes the color of an object when cursor hovers over it.
 * @class HoverColor
 * @param {Object} [config] Optional parameters.
 * @param {String} [config.event='cursorenter'] Specify the name of event which
 *  triggers the color change.  Default is 'cursorenter' for a hover effect.
 * @param {THREE.Color} [config.color=THREE.Color('yellow')] A THREE.Color value that will be applied to the object's
 *  material.
 * @memberof module:altspace/utilities/behaviors
 */
altspace.utilities.behaviors.HoverColor = function(config){

	config = config || {};

	//Default is to trigger color change on cursorenter/cursorleave events,
	//also support triggering on cursordown/cursorup events.
	if (config.event === undefined) config.event = 'cursorenter';
	if (config.event !== 'cursorenter' && config.event !== 'cursordown') {
		throw Error('Expected config.event "cursorenter" or "cursordown"');
	}
	if (config.color === undefined) config.color = new THREE.Color('yellow');

	var object3d;
	var cursordownObject;
	var cursorenterObject;
	var scene;


	function awake(o, s) {
		object3d = o;
		scene = s;
		object3d.addEventListener('cursordown', cursordown);
		scene.addEventListener('cursorup', cursorupScene);
		if (config.event === 'cursorenter') {
			object3d.addEventListener('cursorenter', cursorenter);
			object3d.addEventListener('cursorleave', cursorleave);
		}
	}

	function cursordown(event){
		cursordownObject = object3d;
		if (config.event === 'cursordown' ){
			setColor(cursordownObject);
		}
	}

	function cursorenter(event){
		//ignore hover events if a different object is selected,
		//for example during a drag we don't want to change highlight
		if (cursordownObject && cursordownObject !== object3d){
			return;
		} 
		if (cursorenterObject){
			unsetcolor(cursorenterObject);
		}
		cursorenterObject = object3d;
		setColor(object3d);
	}

	function cursorleave(event){
		if (cursorenterObject === object3d){
			cursorenterObject = null;
			unsetColor(object3d);
		}
	}

	function cursorupScene(event){
		if (config.event === 'cursordown' && cursordownObject ){
			unsetColor(cursordownObject);
		}
		cursordownObject = null;
	}

	function setColor(o){
		if (o.material && o.material.color){
			o.userData.origColor = o.material.color;
			o.material.color = config.color;  
			//Not strictly needed but seems to make updating faster in Altspace.
			if (o.material) o.material.needsUpdate = true;
		} 
		for (var i = 0; i < o.children.length; i++){
			setColor(o.children[i], config.color);//recursively apply to children
		}
	}

	function unsetColor(o){
		if (o.material && o.material.color){
			if (!o.userData.origColor){
				console.error('Cannot unsetColor, no userData.origColor for object', o);
				return;
			}
			o.material.color = o.userData.origColor;
			if (o.material) o.material.needsUpdate = true;
		} 
		for (var i = 0; i < o.children.length; i++){
			unsetColor(o.children[i]);
		}
	}

	return {
		awake: awake,
		//no update method, event-driven
	};

};

window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The SceneSync behavior manages the synchronization of an entire scene.
 *
 * @class SceneSync
 * @param {Firebase} syncInstance
 * @param {Object} [config]
 * @param {Object} [config.instantiators] A dictionary of instantiation 
 *  callbacks by syncType. Instantiators are called on every client whenever an instantiation call is made. Instantiators are passed an initialization
 *  data object and the syncType. They should return an Object3D with an 
 *  Object3DSync behavior.
 * @param {Object} [config.destroyers] (Optional) A dictionary of destroy 
 *  callbacks by syncType. Destroyers are called on every client whenever an destroy call is made. If no destroyer is provided, a default one will be use
 *  which will remove the object from its parent and dispose its geometry, material, and texture. 
 *  If you return true from a custom destroyer, the default destroyer will also be called.
 * @param {Function} [config.ready] A callback that is called after 
 *  checking to see if the instance has already been initialized. The callback is passed a boolean that 
 *  is true if this is the first callback that has been called for this sync instance.
 *  This is primarily useful for setting up any objects that should only be created once for an instance, and is not necessary otherwise.
 * @memberof module:altspace/utilities/behaviors
 **/
window.altspace.utilities.behaviors.SceneSync = function (instanceRef, config) {
	var sceneRef = instanceRef.child('scene');
	var clientsRef = instanceRef.child('clients');

	config = config || {};
	var instantiators = config.instantiators || {};
	var destroyers = config.destroyers || {};

	var autoSendRateMS = 100;

	var syncBehaviors = [];
	var objectForKey = {};
	var keyForUuid = {};

	var clientId;
	// there should always be one master client in the room. For now it will be the longest person online.
	var masterClientId;

	function autoSendAll() {
		for (var i = 0, max = syncBehaviors.length; i < max; i++) {
			syncBehaviors[i].autoSend();
		}
	}

	function awake(o, s) {
		setInterval(autoSendAll, autoSendRateMS);

		var scene = s;

		// temporary way of having unique identifiers for each client
		clientId = scene.uuid;
		clientsRef.on("value", function (snapshot) {
			var clientIds = snapshot.val();

			if (!clientIds) return;

			masterClientKey = Object.keys(clientIds)[0];
			masterClientId = clientIds[masterClientKey];
		});
		// add our client ID to the list of connected clients, 
		// but have it be automatically removed by firebase if we disconnect for any reason
		clientsRef.push(clientId).onDisconnect().remove();

		instanceRef.child('initialized').once('value', function (snapshot) {
			var shouldInitialize = !snapshot.val();
			snapshot.ref().set(true);
			if (config.ready) {
				config.ready(shouldInitialize);
			}
		});
		

		sceneRef.on('child_added', onInstantiate.bind(this));
		sceneRef.on('child_removed', onDestroy.bind(this));
	}

	/**
	 * Instantiate an object by syncType.
	 * @instance
	 * @method instantiate
	 * @param {String} syncType Type of object to instantiate.
	 * @param {Object} initData An object containing initialization data, passed
	 *  to the instantiator.
	 * @param {Boolean} destroyOnDisconnect If the object should be destroyed
	 *  across all synced instance when the instantiating instance disconnects.
	 * @memberof module:altspace/utilities/behaviors.SceneSync
	 */
	function instantiate(syncType, initData, destroyOnDisconnect) {
		initData = initData || {};
		var objectRef = sceneRef.push({ syncType: syncType, initData: initData },
			function (error) { if (error) throw Error('Failed to save to Firebase', error) }
		);
		if (destroyOnDisconnect) {
			objectRef.onDisconnect().remove();//send remvoe_child to remote clients
		}
		//instantiation done, local child_added callback happens syncronously with push
		var object = objectForKey[objectRef.key()];
		object.getBehaviorByType('Object3DSync').takeOwnership();
		return object;
	}

	function onInstantiate(snapshot) {

		var data = snapshot.val();
		var key = snapshot.key();

		var instantiator = instantiators[data.syncType];

		if (!instantiator) {
			console.warn('No instantiator found for syncType: ' + data.syncType);
			return;
		}

		var object3d = instantiator(data.initData, data.syncType);
		if (!object3d) {
			console.error(data.syncType + '.create must return an Object3D');
			return;
		}
		objectForKey[key] = object3d;
		keyForUuid[object3d.uuid] = key;

		var syncBehavior = object3d.getBehaviorByType('Object3DSync');
		if (!syncBehavior) {
			console.error(data.syncType + ' instantiator must return an Object3D with an Object3DSync behavior');
			return;
		}

		syncBehaviors.push(syncBehavior);
		syncBehavior.link(snapshot.ref(), this);
	}

	/**
	 * Destroy a synced object across instances.
	 * @instance
	 * @method destroy
	 * @param {Object} object3d The object to destroy.
	 * @memberof module:altspace/utilities/behaviors.SceneSync
	 */
	function destroy(object3d) {
		var key = keyForUuid[object3d.uuid];
		if (!key) {
			console.warn('Failed to find key for object3d to be destroyed', object3d);
			return;
		}
		sceneRef.child(key).remove(function (error) {
			if (error) console.warn('Failed to remove from Firebase', error);
		});
		sceneRef.child(key).off();//detach all callbacks
	}

	function onDestroy(snapshot) {
		var data = snapshot.val();
		var key = snapshot.key();
		var object3d = objectForKey[key];
		if (!object3d) {
			console.warn('Failed to find object matching deleted key', key);
			return;
		}
		var syncType = data.syncType;
		if (!syncType) {
			console.warn('No syncType found for object being destroyed', object3d);
			return;
		}

		function defaultDestroyer(object3d) {

			// remove all behaviors including this one
			object3d.removeAllBehaviors();

			// remove from scene or parent
			if (object3d.parent) {
				object3d.parent.remove(object3d);
			}

			if (object3d.geometry) {
				object3d.geometry.dispose();
			}

			if (object3d.material) {
				if (object3d.material.map) {
					object3d.material.map.dispose();
				}
				object3d.material.dispose();
			}
		}

		var customDestroyer = destroyers[syncType]
		var shouldDefaultDestroy = !customDestroyer;

		if (customDestroyer) {

			// returning true from a destroyer will additionally invoke the default destroyer
			shouldDefaultDestroy = customDestroyer(object3d);
		}

		if (shouldDefaultDestroy) defaultDestroyer(object3d);

		//remove from our local bookkeeping
		delete objectForKey[key];
		delete keyForUuid[object3d.uuid];
	}

	var exports = {
		awake: awake,
		instantiate: instantiate,
		destroy: destroy,
		type: 'SceneSync'
	};

	/**
	 * Interval at which an object's position/rotation/scale data is sent to Firebase,
	 * in milliseconds.
	 * @readonly
	 * @instance
	 * @member {number} autoSendRateMS
	 * @memberof module:altspace/utilities/behaviors.SceneSync
	 */
	Object.defineProperty(exports, 'autoSendRateMS', {
		get: function () { return autoSendRateMS; }
	});

	/**
	 * True if this client is the master, false otherwise. Master is generally the client that 
	 * has been in the room the longest.
	 * @readonly
	 * @instance
	 * @member {boolean} isMasterClient
	 * @memberof module:altspace/utilities/behaviors.SceneSync
	 */
	Object.defineProperty(exports, 'isMasterClient', {
		get: function () { return masterClientId === clientId; }
	});

	/**
	 * UUID of the current client. 
	 * @readonly
	 * @instance
	 * @member {string} clientId
	 * @memberof module:altspace/utilities/behaviors.SceneSync
	 */
	Object.defineProperty(exports, 'clientId', {
		get: function () { return clientId; }
	});

	/**
	 * Firebase reference for the 'clients' child location. Can be used by app to listen
	 * to clients entering and leaving the room (but generally should not be modified by apps).
	 * @readonly
	 * @instance
	 * @member {Firebase} clientsRef
	 * @memberof module:altspace/utilities/behaviors.SceneSync
	 */
	Object.defineProperty(exports, 'clientsRef', {
		get: function () { return clientsRef; }
	});
	return exports;
};

window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

/**
 * The Spin behavior adds a spinning animation to an object.
 *
 * @class Spin
 * @param {Object} [config]
 * @param {Number} [config.speed=0.0001] Rotation speed in radians per 
 *  millisecond
 * @memberof module:altspace/utilities/behaviors
 **/
altspace.utilities.behaviors.Spin = function (config) {

	config = config || {};

	if (config.speed === undefined) config.speed = 0.0001;

	var object3d;

	function awake(o) {
		object3d = o;
	}

	function update(deltaTime) {
		object3d.rotation.y += config.speed * deltaTime;
	}

	return { awake: awake, update: update };
};

window.altspace = window.altspace || {};
window.altspace.utilities = window.altspace.utilities || {};
window.altspace.utilities.behaviors = window.altspace.utilities.behaviors || {};

altspace.utilities.behaviors.TouchpadRotate = function (config) {
	config = config || {};

	var object3d;
	var scene;

	var startingRotation;

	var activelyRotating = false;

	function awake(o, s) {
		object3d = o;
		scene = s;

		altspace.addEventListener('touchpadup', onTouchpadUp);
		altspace.addEventListener('touchpaddown', onTouchpadDown);
		altspace.addEventListener('touchpadmove', onTouchpadMove);
	}

	function onTouchpadUp(event) {
		activelyRotating = false;
	}

	function onTouchpadDown(event) {
		activelyRotating = true;
		startingRotation = object3d.rotation.clone();
	}

	var lastDisplacementX = 0;

	var runningCount = 5;
	var runningAverageVelocityX = 0;

	function onTouchpadMove(event) {
		var deltaX = event.displacementX - lastDisplacementX;
		object3d.rotation.set(startingRotation.x, startingRotation.y + event.displacementX / 300, startingRotation.z);

		runningAverageVelocityX = ((runningAverageVelocityX * runningCount) + deltaX / 300) / (runningCount + 1);
		lastDisplacementX = event.displacementX;
	}

	function update(deltaTime) {
		if (!activelyRotating && Math.abs(runningAverageVelocityX) > 0.01) {
			object3d.rotation.y += runningAverageVelocityX;
			runningAverageVelocityX *= 0.97;
		}
	}

	function start() {
	}

	return { awake: awake, start: start, update: update };
};

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator/runtime");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel/polyfill is allowed");
}
global._babelPolyfill = true;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"core-js/shim":256,"regenerator/runtime":258}],2:[function(require,module,exports){
module.exports = require("./lib/polyfill");

},{"./lib/polyfill":1}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":10}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/map"), __esModule: true };
},{"core-js/library/fn/map":11}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":12}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":13}],7:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],8:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":5}],9:[function(require,module,exports){
module.exports = require("babel-core/polyfill");

},{"babel-core/polyfill":2}],10:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":22,"../../modules/es6.array.from":62,"../../modules/es6.string.iterator":66}],11:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
module.exports = require('../modules/$.core').Map;
},{"../modules/$.core":22,"../modules/es6.map":64,"../modules/es6.object.to-string":65,"../modules/es6.string.iterator":66,"../modules/es7.map.to-json":68,"../modules/web.dom.iterable":69}],12:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":44}],13:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":22,"../../modules/es6.object.to-string":65,"../../modules/es6.symbol":67}],14:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],15:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],16:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":37}],17:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":18,"./$.wks":60}],18:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],19:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , hide         = require('./$.hide')
  , redefineAll  = require('./$.redefine-all')
  , ctx          = require('./$.ctx')
  , strictNew    = require('./$.strict-new')
  , defined      = require('./$.defined')
  , forOf        = require('./$.for-of')
  , $iterDefine  = require('./$.iter-define')
  , step         = require('./$.iter-step')
  , ID           = require('./$.uid')('id')
  , $has         = require('./$.has')
  , isObject     = require('./$.is-object')
  , setSpecies   = require('./$.set-species')
  , DESCRIPTORS  = require('./$.descriptors')
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./$":44,"./$.ctx":23,"./$.defined":24,"./$.descriptors":25,"./$.for-of":29,"./$.has":32,"./$.hide":33,"./$.is-object":37,"./$.iter-define":40,"./$.iter-step":42,"./$.redefine-all":48,"./$.set-species":50,"./$.strict-new":53,"./$.uid":59}],20:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = require('./$.for-of')
  , classof = require('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":17,"./$.for-of":29}],21:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , global         = require('./$.global')
  , $export        = require('./$.export')
  , fails          = require('./$.fails')
  , hide           = require('./$.hide')
  , redefineAll    = require('./$.redefine-all')
  , forOf          = require('./$.for-of')
  , strictNew      = require('./$.strict-new')
  , isObject       = require('./$.is-object')
  , setToStringTag = require('./$.set-to-string-tag')
  , DESCRIPTORS    = require('./$.descriptors');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    C = wrapper(function(target, iterable){
      strictNew(target, C, NAME);
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)$.setDesc(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$":44,"./$.descriptors":25,"./$.export":27,"./$.fails":28,"./$.for-of":29,"./$.global":31,"./$.hide":33,"./$.is-object":37,"./$.redefine-all":48,"./$.set-to-string-tag":51,"./$.strict-new":53}],22:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],23:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":14}],24:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],25:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":28}],26:[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":44}],27:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":22,"./$.ctx":23,"./$.global":31}],28:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],29:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":16,"./$.ctx":23,"./$.is-array-iter":35,"./$.iter-call":38,"./$.to-length":57,"./core.get-iterator-method":61}],30:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":44,"./$.to-iobject":56}],31:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],32:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],33:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":44,"./$.descriptors":25,"./$.property-desc":47}],34:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":18}],35:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":43,"./$.wks":60}],36:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":18}],37:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],38:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":16}],39:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":44,"./$.hide":33,"./$.property-desc":47,"./$.set-to-string-tag":51,"./$.wks":60}],40:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":44,"./$.export":27,"./$.has":32,"./$.hide":33,"./$.iter-create":39,"./$.iterators":43,"./$.library":46,"./$.redefine":49,"./$.set-to-string-tag":51,"./$.wks":60}],41:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":60}],42:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],43:[function(require,module,exports){
module.exports = {};
},{}],44:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],45:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":44,"./$.to-iobject":56}],46:[function(require,module,exports){
module.exports = true;
},{}],47:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],48:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":49}],49:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":33}],50:[function(require,module,exports){
'use strict';
var core        = require('./$.core')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":44,"./$.core":22,"./$.descriptors":25,"./$.wks":60}],51:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":44,"./$.has":32,"./$.wks":60}],52:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":31}],53:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],54:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":24,"./$.to-integer":55}],55:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],56:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":24,"./$.iobject":34}],57:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":55}],58:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":24}],59:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],60:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":31,"./$.shared":52,"./$.uid":59}],61:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":17,"./$.core":22,"./$.iterators":43,"./$.wks":60}],62:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":23,"./$.export":27,"./$.is-array-iter":35,"./$.iter-call":38,"./$.iter-detect":41,"./$.to-length":57,"./$.to-object":58,"./core.get-iterator-method":61}],63:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":15,"./$.iter-define":40,"./$.iter-step":42,"./$.iterators":43,"./$.to-iobject":56}],64:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.1 Map Objects
require('./$.collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./$.collection":21,"./$.collection-strong":19}],65:[function(require,module,exports){

},{}],66:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":40,"./$.string-at":54}],67:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , DESCRIPTORS    = require('./$.descriptors')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , $fails         = require('./$.fails')
  , shared         = require('./$.shared')
  , setToStringTag = require('./$.set-to-string-tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isArray        = require('./$.is-array')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./$.library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./$":44,"./$.an-object":16,"./$.descriptors":25,"./$.enum-keys":26,"./$.export":27,"./$.fails":28,"./$.get-names":30,"./$.global":31,"./$.has":32,"./$.is-array":36,"./$.keyof":45,"./$.library":46,"./$.property-desc":47,"./$.redefine":49,"./$.set-to-string-tag":51,"./$.shared":52,"./$.to-iobject":56,"./$.uid":59,"./$.wks":60}],68:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Map', {toJSON: require('./$.collection-to-json')('Map')});
},{"./$.collection-to-json":20,"./$.export":27}],69:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":43,"./es6.array.iterator":63}],70:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],71:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./$.wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./$.hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./$.hide":99,"./$.wks":151}],72:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./$.is-object":106,"dup":16}],73:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./$.to-object')
  , toIndex  = require('./$.to-index')
  , toLength = require('./$.to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , $$    = arguments
    , end   = $$.length > 2 ? $$[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./$.to-index":144,"./$.to-length":147,"./$.to-object":148}],74:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./$.to-object')
  , toIndex  = require('./$.to-index')
  , toLength = require('./$.to-length');
module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , $$     = arguments
    , $$len  = $$.length
    , index  = toIndex($$len > 1 ? $$[1] : undefined, length)
    , end    = $$len > 2 ? $$[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./$.to-index":144,"./$.to-length":147,"./$.to-object":148}],75:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./$.to-iobject')
  , toLength  = require('./$.to-length')
  , toIndex   = require('./$.to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"./$.to-index":144,"./$.to-iobject":146,"./$.to-length":147}],76:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./$.ctx')
  , IObject  = require('./$.iobject')
  , toObject = require('./$.to-object')
  , toLength = require('./$.to-length')
  , asc      = require('./$.array-species-create');
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./$.array-species-create":77,"./$.ctx":85,"./$.iobject":102,"./$.to-length":147,"./$.to-object":148}],77:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var isObject = require('./$.is-object')
  , isArray  = require('./$.is-array')
  , SPECIES  = require('./$.wks')('species');
module.exports = function(original, length){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return new (C === undefined ? Array : C)(length);
};
},{"./$.is-array":104,"./$.is-object":106,"./$.wks":151}],78:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./$.cof":79,"./$.wks":151,"dup":17}],79:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],80:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"./$":114,"./$.ctx":85,"./$.defined":86,"./$.descriptors":87,"./$.for-of":95,"./$.has":98,"./$.hide":99,"./$.is-object":106,"./$.iter-define":110,"./$.iter-step":112,"./$.redefine-all":128,"./$.set-species":133,"./$.strict-new":137,"./$.uid":150,"dup":19}],81:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"./$.classof":78,"./$.for-of":95,"dup":20}],82:[function(require,module,exports){
'use strict';
var hide              = require('./$.hide')
  , redefineAll       = require('./$.redefine-all')
  , anObject          = require('./$.an-object')
  , isObject          = require('./$.is-object')
  , strictNew         = require('./$.strict-new')
  , forOf             = require('./$.for-of')
  , createArrayMethod = require('./$.array-methods')
  , $has              = require('./$.has')
  , WEAK              = require('./$.uid')('weak')
  , isExtensible      = Object.isExtensible || isObject
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for frozen keys
var frozenStore = function(that){
  return that._l || (that._l = new FrozenStore);
};
var FrozenStore = function(){
  this.a = [];
};
var findFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
FrozenStore.prototype = {
  get: function(key){
    var entry = findFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findFrozen(this, key);
  },
  set: function(key, value){
    var entry = findFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = id++;      // collection id
      that._l = undefined; // leak store for frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(anObject(key))){
      frozenStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that._i] = value;
    } return that;
  },
  frozenStore: frozenStore,
  WEAK: WEAK
};
},{"./$.an-object":72,"./$.array-methods":76,"./$.for-of":95,"./$.has":98,"./$.hide":99,"./$.is-object":106,"./$.redefine-all":128,"./$.strict-new":137,"./$.uid":150}],83:[function(require,module,exports){
'use strict';
var global         = require('./$.global')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , redefineAll    = require('./$.redefine-all')
  , forOf          = require('./$.for-of')
  , strictNew      = require('./$.strict-new')
  , isObject       = require('./$.is-object')
  , fails          = require('./$.fails')
  , $iterDetect    = require('./$.iter-detect')
  , setToStringTag = require('./$.set-to-string-tag');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO;
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        strictNew(target, C, NAME);
        var that = new Base;
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    IS_WEAK || instance.forEach(function(val, key){
      BUGGY_ZERO = 1 / key === -Infinity;
    });
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$.export":90,"./$.fails":92,"./$.for-of":95,"./$.global":97,"./$.is-object":106,"./$.iter-detect":111,"./$.redefine":129,"./$.redefine-all":128,"./$.set-to-string-tag":134,"./$.strict-new":137}],84:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],85:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./$.a-function":70,"dup":23}],86:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24}],87:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"./$.fails":92,"dup":25}],88:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":97,"./$.is-object":106}],89:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./$":114,"dup":26}],90:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , hide      = require('./$.hide')
  , redefine  = require('./$.redefine')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)redefine(target, key, out);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":84,"./$.ctx":85,"./$.global":97,"./$.hide":99,"./$.redefine":129}],91:[function(require,module,exports){
var MATCH = require('./$.wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./$.wks":151}],92:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],93:[function(require,module,exports){
'use strict';
var hide     = require('./$.hide')
  , redefine = require('./$.redefine')
  , fails    = require('./$.fails')
  , defined  = require('./$.defined')
  , wks      = require('./$.wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , original = ''[KEY];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, exec(defined, SYMBOL, original));
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return original.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return original.call(string, this); }
    );
  }
};
},{"./$.defined":86,"./$.fails":92,"./$.hide":99,"./$.redefine":129,"./$.wks":151}],94:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./$.an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./$.an-object":72}],95:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"./$.an-object":72,"./$.ctx":85,"./$.is-array-iter":103,"./$.iter-call":108,"./$.to-length":147,"./core.get-iterator-method":152,"dup":29}],96:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"./$":114,"./$.to-iobject":146,"dup":30}],97:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],98:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],99:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./$":114,"./$.descriptors":87,"./$.property-desc":127,"dup":33}],100:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":97}],101:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],102:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"./$.cof":79,"dup":34}],103:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"./$.iterators":113,"./$.wks":151,"dup":35}],104:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"./$.cof":79,"dup":36}],105:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./$.is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./$.is-object":106}],106:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],107:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./$.is-object')
  , cof      = require('./$.cof')
  , MATCH    = require('./$.wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./$.cof":79,"./$.is-object":106,"./$.wks":151}],108:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./$.an-object":72,"dup":38}],109:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"./$":114,"./$.hide":99,"./$.property-desc":127,"./$.set-to-string-tag":134,"./$.wks":151,"dup":39}],110:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"./$":114,"./$.export":90,"./$.has":98,"./$.hide":99,"./$.iter-create":109,"./$.iterators":113,"./$.library":116,"./$.redefine":129,"./$.set-to-string-tag":134,"./$.wks":151,"dup":40}],111:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"./$.wks":151,"dup":41}],112:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],113:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],114:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],115:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"./$":114,"./$.to-iobject":146,"dup":45}],116:[function(require,module,exports){
module.exports = false;
},{}],117:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],118:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],119:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],120:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":79,"./$.global":97,"./$.task":143}],121:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":114,"./$.fails":92,"./$.iobject":102,"./$.to-object":148}],122:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":84,"./$.export":90,"./$.fails":92}],123:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject')
  , isEnum    = $.isEnum;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = $.getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./$":114,"./$.to-iobject":146}],124:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var $        = require('./$')
  , anObject = require('./$.an-object')
  , Reflect  = require('./$.global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = $.getNames(anObject(it))
    , getSymbols = $.getSymbols;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./$":114,"./$.an-object":72,"./$.global":97}],125:[function(require,module,exports){
'use strict';
var path      = require('./$.path')
  , invoke    = require('./$.invoke')
  , aFunction = require('./$.a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that  = this
      , $$    = arguments
      , $$len = $$.length
      , j = 0, k = 0, args;
    if(!holder && !$$len)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = $$[k++];
    while($$len > k)args.push($$[k++]);
    return invoke(fn, args, that);
  };
};
},{"./$.a-function":70,"./$.invoke":101,"./$.path":126}],126:[function(require,module,exports){
module.exports = require('./$.global');
},{"./$.global":97}],127:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],128:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"./$.redefine":129,"dup":48}],129:[function(require,module,exports){
// add fake Function#toString
// for correct work wrapped methods / constructors with methods like LoDash isNative
var global    = require('./$.global')
  , hide      = require('./$.hide')
  , SRC       = require('./$.uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./$.core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  if(typeof val == 'function'){
    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    val.hasOwnProperty('name') || hide(val, 'name', key);
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./$.core":84,"./$.global":97,"./$.hide":99,"./$.uid":150}],130:[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],131:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],132:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":114,"./$.an-object":72,"./$.ctx":85,"./$.is-object":106}],133:[function(require,module,exports){
'use strict';
var global      = require('./$.global')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":114,"./$.descriptors":87,"./$.global":97,"./$.wks":151}],134:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"./$":114,"./$.has":98,"./$.wks":151,"dup":51}],135:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"./$.global":97,"dup":52}],136:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":70,"./$.an-object":72,"./$.wks":151}],137:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],138:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"./$.defined":86,"./$.to-integer":145,"dup":54}],139:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./$.is-regexp')
  , defined  = require('./$.defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./$.defined":86,"./$.is-regexp":107}],140:[function(require,module,exports){
// https://github.com/ljharb/proposal-string-pad-left-right
var toLength = require('./$.to-length')
  , repeat   = require('./$.string-repeat')
  , defined  = require('./$.defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength)return S;
  if(fillStr == '')fillStr = ' ';
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};
},{"./$.defined":86,"./$.string-repeat":141,"./$.to-length":147}],141:[function(require,module,exports){
'use strict';
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./$.defined":86,"./$.to-integer":145}],142:[function(require,module,exports){
var $export = require('./$.export')
  , defined = require('./$.defined')
  , fails   = require('./$.fails')
  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec){
  var exp  = {};
  exp[KEY] = exec(trim);
  $export($export.P + $export.F * fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  }), 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./$.defined":86,"./$.export":90,"./$.fails":92}],143:[function(require,module,exports){
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":79,"./$.ctx":85,"./$.dom-create":88,"./$.global":97,"./$.html":100,"./$.invoke":101}],144:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./$.to-integer":145}],145:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"dup":55}],146:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"./$.defined":86,"./$.iobject":102,"dup":56}],147:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"./$.to-integer":145,"dup":57}],148:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"./$.defined":86,"dup":58}],149:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./$.is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./$.is-object":106}],150:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"dup":59}],151:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"./$.global":97,"./$.shared":135,"./$.uid":150,"dup":60}],152:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"./$.classof":78,"./$.core":84,"./$.iterators":113,"./$.wks":151,"dup":61}],153:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , $export           = require('./$.export')
  , DESCRIPTORS       = require('./$.descriptors')
  , createDesc        = require('./$.property-desc')
  , html              = require('./$.html')
  , cel               = require('./$.dom-create')
  , has               = require('./$.has')
  , cof               = require('./$.cof')
  , invoke            = require('./$.invoke')
  , fails             = require('./$.fails')
  , anObject          = require('./$.an-object')
  , aFunction         = require('./$.a-function')
  , isObject          = require('./$.is-object')
  , toObject          = require('./$.to-object')
  , toIObject         = require('./$.to-iobject')
  , toInteger         = require('./$.to-integer')
  , toIndex           = require('./$.to-index')
  , toLength          = require('./$.to-length')
  , IObject           = require('./$.iobject')
  , IE_PROTO          = require('./$.uid')('__proto__')
  , createArrayMethod = require('./$.array-methods')
  , arrayIndexOf      = require('./$.array-includes')(false)
  , ObjectProto       = Object.prototype
  , ArrayProto        = Array.prototype
  , arraySlice        = ArrayProto.slice
  , arrayJoin         = ArrayProto.join
  , defineProperty    = $.setDesc
  , getOwnDescriptor  = $.getDesc
  , defineProperties  = $.setDescs
  , factories         = {}
  , IE8_DOM_DEFINE;

if(!DESCRIPTORS){
  IE8_DOM_DEFINE = !fails(function(){
    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
  });
  $.setDesc = function(O, P, Attributes){
    if(IE8_DOM_DEFINE)try {
      return defineProperty(O, P, Attributes);
    } catch(e){ /* empty */ }
    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
    if('value' in Attributes)anObject(O)[P] = Attributes.value;
    return O;
  };
  $.getDesc = function(O, P){
    if(IE8_DOM_DEFINE)try {
      return getOwnDescriptor(O, P);
    } catch(e){ /* empty */ }
    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
  };
  $.setDescs = defineProperties = function(O, Properties){
    anObject(O);
    var keys   = $.getKeys(Properties)
      , length = keys.length
      , i = 0
      , P;
    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
    return O;
  };
}
$export($export.S + $export.F * !DESCRIPTORS, 'Object', {
  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $.getDesc,
  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  defineProperty: $.setDesc,
  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
  defineProperties: defineProperties
});

  // IE 8- don't enum bug keys
var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
            'toLocaleString,toString,valueOf').split(',')
  // Additional keys for getOwnPropertyNames
  , keys2 = keys1.concat('length', 'prototype')
  , keysLen1 = keys1.length;

// Create object with `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = cel('iframe')
    , i      = keysLen1
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict.prototype[keys1[i]];
  return createDict();
};
var createGetKeys = function(names, length){
  return function(object){
    var O      = toIObject(object)
      , i      = 0
      , result = []
      , key;
    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while(length > i)if(has(O, key = names[i++])){
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };
};
var Empty = function(){};
$export($export.S, 'Object', {
  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  getPrototypeOf: $.getProto = $.getProto || function(O){
    O = toObject(O);
    if(has(O, IE_PROTO))return O[IE_PROTO];
    if(typeof O.constructor == 'function' && O instanceof O.constructor){
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  },
  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  create: $.create = $.create || function(O, /*?*/Properties){
    var result;
    if(O !== null){
      Empty.prototype = anObject(O);
      result = new Empty();
      Empty.prototype = null;
      // add "__proto__" for Object.getPrototypeOf shim
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : defineProperties(result, Properties);
  },
  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
});

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }
  return factories[len](F, args);
};

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
$export($export.P, 'Function', {
  bind: function bind(that /*, args... */){
    var fn       = aFunction(this)
      , partArgs = arraySlice.call(arguments, 1);
    var bound = function(/* args... */){
      var args = partArgs.concat(arraySlice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
    };
    if(isObject(fn.prototype))bound.prototype = fn.prototype;
    return bound;
  }
});

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * fails(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
$export($export.P + $export.F * (IObject != Object), 'Array', {
  join: function join(separator){
    return arrayJoin.call(IObject(this), separator === undefined ? ',' : separator);
  }
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
$export($export.S, 'Array', {isArray: require('./$.is-array')});

var createArrayReduce = function(isRight){
  return function(callbackfn, memo){
    aFunction(callbackfn);
    var O      = IObject(this)
      , length = toLength(O.length)
      , index  = isRight ? length - 1 : 0
      , i      = isRight ? -1 : 1;
    if(arguments.length < 2)for(;;){
      if(index in O){
        memo = O[index];
        index += i;
        break;
      }
      index += i;
      if(isRight ? index < 0 : length <= index){
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
      memo = callbackfn(memo, O[index], index, this);
    }
    return memo;
  };
};

var methodize = function($fn){
  return function(arg1/*, arg2 = undefined */){
    return $fn(this, arg1, arguments[1]);
  };
};

$export($export.P, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: $.each = $.each || methodize(createArrayMethod(0)),
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: methodize(createArrayMethod(1)),
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: methodize(createArrayMethod(2)),
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: methodize(createArrayMethod(3)),
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: methodize(createArrayMethod(4)),
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: createArrayReduce(false),
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: createArrayReduce(true),
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: methodize(arrayIndexOf),
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
    if(index < 0)index = toLength(length + index);
    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
    return -1;
  }
});

// 20.3.3.1 / 15.9.4.4 Date.now()
$export($export.S, 'Date', {now: function(){ return +new Date; }});

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(this))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./$":114,"./$.a-function":70,"./$.an-object":72,"./$.array-includes":75,"./$.array-methods":76,"./$.cof":79,"./$.descriptors":87,"./$.dom-create":88,"./$.export":90,"./$.fails":92,"./$.has":98,"./$.html":100,"./$.invoke":101,"./$.iobject":102,"./$.is-array":104,"./$.is-object":106,"./$.property-desc":127,"./$.to-index":144,"./$.to-integer":145,"./$.to-iobject":146,"./$.to-length":147,"./$.to-object":148,"./$.uid":150}],154:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./$.export');

$export($export.P, 'Array', {copyWithin: require('./$.array-copy-within')});

require('./$.add-to-unscopables')('copyWithin');
},{"./$.add-to-unscopables":71,"./$.array-copy-within":73,"./$.export":90}],155:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./$.export');

$export($export.P, 'Array', {fill: require('./$.array-fill')});

require('./$.add-to-unscopables')('fill');
},{"./$.add-to-unscopables":71,"./$.array-fill":74,"./$.export":90}],156:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./$.export')
  , $find   = require('./$.array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./$.add-to-unscopables')(KEY);
},{"./$.add-to-unscopables":71,"./$.array-methods":76,"./$.export":90}],157:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./$.export')
  , $find   = require('./$.array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./$.add-to-unscopables')(KEY);
},{"./$.add-to-unscopables":71,"./$.array-methods":76,"./$.export":90}],158:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"./$.ctx":85,"./$.export":90,"./$.is-array-iter":103,"./$.iter-call":108,"./$.iter-detect":111,"./$.to-length":147,"./$.to-object":148,"./core.get-iterator-method":152,"dup":62}],159:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"./$.add-to-unscopables":71,"./$.iter-define":110,"./$.iter-step":112,"./$.iterators":113,"./$.to-iobject":146,"dup":63}],160:[function(require,module,exports){
'use strict';
var $export = require('./$.export');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./$.fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , $$     = arguments
      , $$len  = $$.length
      , result = new (typeof this == 'function' ? this : Array)($$len);
    while($$len > index)result[index] = $$[index++];
    result.length = $$len;
    return result;
  }
});
},{"./$.export":90,"./$.fails":92}],161:[function(require,module,exports){
require('./$.set-species')('Array');
},{"./$.set-species":133}],162:[function(require,module,exports){
'use strict';
var $             = require('./$')
  , isObject      = require('./$.is-object')
  , HAS_INSTANCE  = require('./$.wks')('hasInstance')
  , FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = $.getProto(O))if(this.prototype === O)return true;
  return false;
}});
},{"./$":114,"./$.is-object":106,"./$.wks":151}],163:[function(require,module,exports){
var setDesc    = require('./$').setDesc
  , createDesc = require('./$.property-desc')
  , has        = require('./$.has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';
// 19.2.4.2 name
NAME in FProto || require('./$.descriptors') && setDesc(FProto, NAME, {
  configurable: true,
  get: function(){
    var match = ('' + this).match(nameRE)
      , name  = match ? match[1] : '';
    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
    return name;
  }
});
},{"./$":114,"./$.descriptors":87,"./$.has":98,"./$.property-desc":127}],164:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"./$.collection":83,"./$.collection-strong":80,"dup":64}],165:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./$.export')
  , log1p   = require('./$.math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./$.export":90,"./$.math-log1p":118}],166:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./$.export');

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

$export($export.S, 'Math', {asinh: asinh});
},{"./$.export":90}],167:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./$.export":90}],168:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./$.export')
  , sign    = require('./$.math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./$.export":90,"./$.math-sign":119}],169:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./$.export":90}],170:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./$.export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./$.export":90}],171:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./$.export');

$export($export.S, 'Math', {expm1: require('./$.math-expm1')});
},{"./$.export":90,"./$.math-expm1":117}],172:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./$.export')
  , sign      = require('./$.math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./$.export":90,"./$.math-sign":119}],173:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./$.export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum   = 0
      , i     = 0
      , $$    = arguments
      , $$len = $$.length
      , larg  = 0
      , arg, div;
    while(i < $$len){
      arg = abs($$[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./$.export":90}],174:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./$.export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./$.fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./$.export":90,"./$.fails":92}],175:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./$.export":90}],176:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./$.export');

$export($export.S, 'Math', {log1p: require('./$.math-log1p')});
},{"./$.export":90,"./$.math-log1p":118}],177:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./$.export":90}],178:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./$.export');

$export($export.S, 'Math', {sign: require('./$.math-sign')});
},{"./$.export":90,"./$.math-sign":119}],179:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./$.export')
  , expm1   = require('./$.math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./$.fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./$.export":90,"./$.fails":92,"./$.math-expm1":117}],180:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./$.export')
  , expm1   = require('./$.math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./$.export":90,"./$.math-expm1":117}],181:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./$.export":90}],182:[function(require,module,exports){
'use strict';
var $           = require('./$')
  , global      = require('./$.global')
  , has         = require('./$.has')
  , cof         = require('./$.cof')
  , toPrimitive = require('./$.to-primitive')
  , fails       = require('./$.fails')
  , $trim       = require('./$.string-trim').trim
  , NUMBER      = 'Number'
  , $Number     = global[NUMBER]
  , Base        = $Number
  , proto       = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF  = cof($.create(proto)) == NUMBER
  , TRIM        = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? new Base(toNumber(it)) : toNumber(it);
  };
  $.each.call(require('./$.descriptors') ? $.getNames(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), function(key){
    if(has(Base, key) && !has($Number, key)){
      $.setDesc($Number, key, $.getDesc(Base, key));
    }
  });
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./$.redefine')(global, NUMBER, $Number);
}
},{"./$":114,"./$.cof":79,"./$.descriptors":87,"./$.fails":92,"./$.global":97,"./$.has":98,"./$.redefine":129,"./$.string-trim":142,"./$.to-primitive":149}],183:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./$.export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./$.export":90}],184:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./$.export')
  , _isFinite = require('./$.global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./$.export":90,"./$.global":97}],185:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./$.export');

$export($export.S, 'Number', {isInteger: require('./$.is-integer')});
},{"./$.export":90,"./$.is-integer":105}],186:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./$.export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./$.export":90}],187:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./$.export')
  , isInteger = require('./$.is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./$.export":90,"./$.is-integer":105}],188:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./$.export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./$.export":90}],189:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./$.export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./$.export":90}],190:[function(require,module,exports){
// 20.1.2.12 Number.parseFloat(string)
var $export = require('./$.export');

$export($export.S, 'Number', {parseFloat: parseFloat});
},{"./$.export":90}],191:[function(require,module,exports){
// 20.1.2.13 Number.parseInt(string, radix)
var $export = require('./$.export');

$export($export.S, 'Number', {parseInt: parseInt});
},{"./$.export":90}],192:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":90,"./$.object-assign":121}],193:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});
},{"./$.is-object":106,"./$.object-sap":122}],194:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./$.to-iobject');

require('./$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./$.object-sap":122,"./$.to-iobject":146}],195:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./$.object-sap')('getOwnPropertyNames', function(){
  return require('./$.get-names').get;
});
},{"./$.get-names":96,"./$.object-sap":122}],196:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('getPrototypeOf', function($getPrototypeOf){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./$.object-sap":122,"./$.to-object":148}],197:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./$.is-object":106,"./$.object-sap":122}],198:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./$.is-object":106,"./$.object-sap":122}],199:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./$.is-object":106,"./$.object-sap":122}],200:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./$.export');
$export($export.S, 'Object', {is: require('./$.same-value')});
},{"./$.export":90,"./$.same-value":131}],201:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":122,"./$.to-object":148}],202:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
  };
});
},{"./$.is-object":106,"./$.object-sap":122}],203:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(it) : it;
  };
});
},{"./$.is-object":106,"./$.object-sap":122}],204:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":90,"./$.set-proto":132}],205:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./$.classof')
  , test    = {};
test[require('./$.wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./$.redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./$.classof":78,"./$.redefine":129,"./$.wks":151}],206:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $export    = require('./$.export')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same-value')
  , SPECIES    = require('./$.wks')('species')
  , speciesConstructor = require('./$.species-constructor')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.descriptors')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./$":114,"./$.a-function":70,"./$.an-object":72,"./$.classof":78,"./$.core":84,"./$.ctx":85,"./$.descriptors":87,"./$.export":90,"./$.for-of":95,"./$.global":97,"./$.is-object":106,"./$.iter-detect":111,"./$.library":116,"./$.microtask":120,"./$.redefine-all":128,"./$.same-value":131,"./$.set-proto":132,"./$.set-species":133,"./$.set-to-string-tag":134,"./$.species-constructor":136,"./$.strict-new":137,"./$.wks":151}],207:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./$.export')
  , _apply  = Function.apply;

$export($export.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  }
});
},{"./$.export":90}],208:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $         = require('./$')
  , $export   = require('./$.export')
  , aFunction = require('./$.a-function')
  , anObject  = require('./$.an-object')
  , isObject  = require('./$.is-object')
  , bind      = Function.bind || require('./$.core').Function.prototype.bind;

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$export($export.S + $export.F * require('./$.fails')(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      if(args != undefined)switch(anObject(args).length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = $.create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./$":114,"./$.a-function":70,"./$.an-object":72,"./$.core":84,"./$.export":90,"./$.fails":92,"./$.is-object":106}],209:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var $        = require('./$')
  , $export  = require('./$.export')
  , anObject = require('./$.an-object');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./$.fails')(function(){
  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    try {
      $.setDesc(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$":114,"./$.an-object":72,"./$.export":90,"./$.fails":92}],210:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./$.export')
  , getDesc  = require('./$').getDesc
  , anObject = require('./$.an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = getDesc(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./$":114,"./$.an-object":72,"./$.export":90}],211:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./$.export')
  , anObject = require('./$.an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./$.iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./$.an-object":72,"./$.export":90,"./$.iter-create":109}],212:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var $        = require('./$')
  , $export  = require('./$.export')
  , anObject = require('./$.an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return $.getDesc(anObject(target), propertyKey);
  }
});
},{"./$":114,"./$.an-object":72,"./$.export":90}],213:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./$.export')
  , getProto = require('./$').getProto
  , anObject = require('./$.an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./$":114,"./$.an-object":72,"./$.export":90}],214:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var $        = require('./$')
  , has      = require('./$.has')
  , $export  = require('./$.export')
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./$":114,"./$.an-object":72,"./$.export":90,"./$.has":98,"./$.is-object":106}],215:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./$.export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./$.export":90}],216:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./$.export')
  , anObject      = require('./$.an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./$.an-object":72,"./$.export":90}],217:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./$.export');

$export($export.S, 'Reflect', {ownKeys: require('./$.own-keys')});
},{"./$.export":90,"./$.own-keys":124}],218:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./$.export')
  , anObject           = require('./$.an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$.an-object":72,"./$.export":90}],219:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./$.export')
  , setProto = require('./$.set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$.export":90,"./$.set-proto":132}],220:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var $          = require('./$')
  , has        = require('./$.has')
  , $export    = require('./$.export')
  , createDesc = require('./$.property-desc')
  , anObject   = require('./$.an-object')
  , isObject   = require('./$.is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = $.getDesc(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = $.getProto(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    $.setDesc(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./$":114,"./$.an-object":72,"./$.export":90,"./$.has":98,"./$.is-object":106,"./$.property-desc":127}],221:[function(require,module,exports){
var $        = require('./$')
  , global   = require('./$.global')
  , isRegExp = require('./$.is-regexp')
  , $flags   = require('./$.flags')
  , $RegExp  = global.RegExp
  , Base     = $RegExp
  , proto    = $RegExp.prototype
  , re1      = /a/g
  , re2      = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW = new $RegExp(re1) !== re1;

if(require('./$.descriptors') && (!CORRECT_NEW || require('./$.fails')(function(){
  re2[require('./$.wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
      : CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
  };
  $.each.call($.getNames(Base), function(key){
    key in $RegExp || $.setDesc($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  });
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./$.redefine')(global, 'RegExp', $RegExp);
}

require('./$.set-species')('RegExp');
},{"./$":114,"./$.descriptors":87,"./$.fails":92,"./$.flags":94,"./$.global":97,"./$.is-regexp":107,"./$.redefine":129,"./$.set-species":133,"./$.wks":151}],222:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
var $ = require('./$');
if(require('./$.descriptors') && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./$.flags')
});
},{"./$":114,"./$.descriptors":87,"./$.flags":94}],223:[function(require,module,exports){
// @@match logic
require('./$.fix-re-wks')('match', 1, function(defined, MATCH){
  // 21.1.3.11 String.prototype.match(regexp)
  return function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  };
});
},{"./$.fix-re-wks":93}],224:[function(require,module,exports){
// @@replace logic
require('./$.fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  };
});
},{"./$.fix-re-wks":93}],225:[function(require,module,exports){
// @@search logic
require('./$.fix-re-wks')('search', 1, function(defined, SEARCH){
  // 21.1.3.15 String.prototype.search(regexp)
  return function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  };
});
},{"./$.fix-re-wks":93}],226:[function(require,module,exports){
// @@split logic
require('./$.fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  // 21.1.3.17 String.prototype.split(separator, limit)
  return function split(separator, limit){
    'use strict';
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined
      ? fn.call(separator, O, limit)
      : $split.call(String(O), separator, limit);
  };
});
},{"./$.fix-re-wks":93}],227:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":83,"./$.collection-strong":80}],228:[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $at     = require('./$.string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./$.export":90,"./$.string-at":138}],229:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./$.export')
  , toLength  = require('./$.to-length')
  , context   = require('./$.string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./$.fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , $$   = arguments
      , endPosition = $$.length > 1 ? $$[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./$.export":90,"./$.fails-is-regexp":91,"./$.string-context":139,"./$.to-length":147}],230:[function(require,module,exports){
var $export        = require('./$.export')
  , toIndex        = require('./$.to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res   = []
      , $$    = arguments
      , $$len = $$.length
      , i     = 0
      , code;
    while($$len > i){
      code = +$$[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./$.export":90,"./$.to-index":144}],231:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./$.export')
  , context  = require('./$.string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./$.fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./$.export":90,"./$.fails-is-regexp":91,"./$.string-context":139}],232:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"./$.iter-define":110,"./$.string-at":138,"dup":66}],233:[function(require,module,exports){
var $export   = require('./$.export')
  , toIObject = require('./$.to-iobject')
  , toLength  = require('./$.to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl   = toIObject(callSite.raw)
      , len   = toLength(tpl.length)
      , $$    = arguments
      , $$len = $$.length
      , res   = []
      , i     = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < $$len)res.push(String($$[i]));
    } return res.join('');
  }
});
},{"./$.export":90,"./$.to-iobject":146,"./$.to-length":147}],234:[function(require,module,exports){
var $export = require('./$.export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.export":90,"./$.string-repeat":141}],235:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./$.export')
  , toLength    = require('./$.to-length')
  , context     = require('./$.string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./$.fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , $$     = arguments
      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./$.export":90,"./$.fails-is-regexp":91,"./$.string-context":139,"./$.to-length":147}],236:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./$.string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./$.string-trim":142}],237:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"./$":114,"./$.an-object":72,"./$.descriptors":87,"./$.enum-keys":89,"./$.export":90,"./$.fails":92,"./$.get-names":96,"./$.global":97,"./$.has":98,"./$.is-array":104,"./$.keyof":115,"./$.library":116,"./$.property-desc":127,"./$.redefine":129,"./$.set-to-string-tag":134,"./$.shared":135,"./$.to-iobject":146,"./$.uid":150,"./$.wks":151,"dup":67}],238:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , redefine     = require('./$.redefine')
  , weak         = require('./$.collection-weak')
  , isObject     = require('./$.is-object')
  , has          = require('./$.has')
  , frozenStore  = weak.frozenStore
  , WEAK         = weak.WEAK
  , isExtensible = Object.isExtensible || isObject
  , tmp          = {};

// 23.3 WeakMap Objects
var $WeakMap = require('./$.collection')('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return frozenStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this._i];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = frozenStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./$":114,"./$.collection":83,"./$.collection-weak":82,"./$.has":98,"./$.is-object":106,"./$.redefine":129}],239:[function(require,module,exports){
'use strict';
var weak = require('./$.collection-weak');

// 23.4 WeakSet Objects
require('./$.collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./$.collection":83,"./$.collection-weak":82}],240:[function(require,module,exports){
'use strict';
var $export   = require('./$.export')
  , $includes = require('./$.array-includes')(true);

$export($export.P, 'Array', {
  // https://github.com/domenic/Array.prototype.includes
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./$.add-to-unscopables')('includes');
},{"./$.add-to-unscopables":71,"./$.array-includes":75,"./$.export":90}],241:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"./$.collection-to-json":81,"./$.export":90,"dup":68}],242:[function(require,module,exports){
// http://goo.gl/XkBrjD
var $export  = require('./$.export')
  , $entries = require('./$.object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./$.export":90,"./$.object-to-array":123}],243:[function(require,module,exports){
// https://gist.github.com/WebReflection/9353781
var $          = require('./$')
  , $export    = require('./$.export')
  , ownKeys    = require('./$.own-keys')
  , toIObject  = require('./$.to-iobject')
  , createDesc = require('./$.property-desc');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , setDesc = $.setDesc
      , getDesc = $.getDesc
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i){
      D = getDesc(O, key = keys[i++]);
      if(key in result)setDesc(result, key, createDesc(0, D));
      else result[key] = D;
    } return result;
  }
});
},{"./$":114,"./$.export":90,"./$.own-keys":124,"./$.property-desc":127,"./$.to-iobject":146}],244:[function(require,module,exports){
// http://goo.gl/XkBrjD
var $export = require('./$.export')
  , $values = require('./$.object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./$.export":90,"./$.object-to-array":123}],245:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./$.export')
  , $re     = require('./$.replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./$.export":90,"./$.replacer":130}],246:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Set', {toJSON: require('./$.collection-to-json')('Set')});
},{"./$.collection-to-json":81,"./$.export":90}],247:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./$.export')
  , $at     = require('./$.string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./$.export":90,"./$.string-at":138}],248:[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $pad    = require('./$.string-pad');

$export($export.P, 'String', {
  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./$.export":90,"./$.string-pad":140}],249:[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $pad    = require('./$.string-pad');

$export($export.P, 'String', {
  padRight: function padRight(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./$.export":90,"./$.string-pad":140}],250:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./$.string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
});
},{"./$.string-trim":142}],251:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./$.string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
});
},{"./$.string-trim":142}],252:[function(require,module,exports){
// JavaScript 1.6 / Strawman array statics shim
var $       = require('./$')
  , $export = require('./$.export')
  , $ctx    = require('./$.ctx')
  , $Array  = require('./$.core').Array || Array
  , statics = {};
var setStatics = function(keys, length){
  $.each.call(keys.split(','), function(key){
    if(length == undefined && key in $Array)statics[key] = $Array[key];
    else if(key in [])statics[key] = $ctx(Function.call, [][key], length);
  });
};
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
           'reduce,reduceRight,copyWithin,fill');
$export($export.S, 'Array', statics);
},{"./$":114,"./$.core":84,"./$.ctx":85,"./$.export":90}],253:[function(require,module,exports){
require('./es6.array.iterator');
var global      = require('./$.global')
  , hide        = require('./$.hide')
  , Iterators   = require('./$.iterators')
  , ITERATOR    = require('./$.wks')('iterator')
  , NL          = global.NodeList
  , HTC         = global.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype
  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);
},{"./$.global":97,"./$.hide":99,"./$.iterators":113,"./$.wks":151,"./es6.array.iterator":159}],254:[function(require,module,exports){
var $export = require('./$.export')
  , $task   = require('./$.task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./$.export":90,"./$.task":143}],255:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./$.global')
  , $export    = require('./$.export')
  , invoke     = require('./$.invoke')
  , partial    = require('./$.partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./$.export":90,"./$.global":97,"./$.invoke":101,"./$.partial":125}],256:[function(require,module,exports){
require('./modules/es5');
require('./modules/es6.symbol');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.number.constructor');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.iterator');
require('./modules/es6.array.species');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-left');
require('./modules/es7.string.pad-right');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.regexp.escape');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/js.array.statics');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/$.core');
},{"./modules/$.core":84,"./modules/es5":153,"./modules/es6.array.copy-within":154,"./modules/es6.array.fill":155,"./modules/es6.array.find":157,"./modules/es6.array.find-index":156,"./modules/es6.array.from":158,"./modules/es6.array.iterator":159,"./modules/es6.array.of":160,"./modules/es6.array.species":161,"./modules/es6.function.has-instance":162,"./modules/es6.function.name":163,"./modules/es6.map":164,"./modules/es6.math.acosh":165,"./modules/es6.math.asinh":166,"./modules/es6.math.atanh":167,"./modules/es6.math.cbrt":168,"./modules/es6.math.clz32":169,"./modules/es6.math.cosh":170,"./modules/es6.math.expm1":171,"./modules/es6.math.fround":172,"./modules/es6.math.hypot":173,"./modules/es6.math.imul":174,"./modules/es6.math.log10":175,"./modules/es6.math.log1p":176,"./modules/es6.math.log2":177,"./modules/es6.math.sign":178,"./modules/es6.math.sinh":179,"./modules/es6.math.tanh":180,"./modules/es6.math.trunc":181,"./modules/es6.number.constructor":182,"./modules/es6.number.epsilon":183,"./modules/es6.number.is-finite":184,"./modules/es6.number.is-integer":185,"./modules/es6.number.is-nan":186,"./modules/es6.number.is-safe-integer":187,"./modules/es6.number.max-safe-integer":188,"./modules/es6.number.min-safe-integer":189,"./modules/es6.number.parse-float":190,"./modules/es6.number.parse-int":191,"./modules/es6.object.assign":192,"./modules/es6.object.freeze":193,"./modules/es6.object.get-own-property-descriptor":194,"./modules/es6.object.get-own-property-names":195,"./modules/es6.object.get-prototype-of":196,"./modules/es6.object.is":200,"./modules/es6.object.is-extensible":197,"./modules/es6.object.is-frozen":198,"./modules/es6.object.is-sealed":199,"./modules/es6.object.keys":201,"./modules/es6.object.prevent-extensions":202,"./modules/es6.object.seal":203,"./modules/es6.object.set-prototype-of":204,"./modules/es6.object.to-string":205,"./modules/es6.promise":206,"./modules/es6.reflect.apply":207,"./modules/es6.reflect.construct":208,"./modules/es6.reflect.define-property":209,"./modules/es6.reflect.delete-property":210,"./modules/es6.reflect.enumerate":211,"./modules/es6.reflect.get":214,"./modules/es6.reflect.get-own-property-descriptor":212,"./modules/es6.reflect.get-prototype-of":213,"./modules/es6.reflect.has":215,"./modules/es6.reflect.is-extensible":216,"./modules/es6.reflect.own-keys":217,"./modules/es6.reflect.prevent-extensions":218,"./modules/es6.reflect.set":220,"./modules/es6.reflect.set-prototype-of":219,"./modules/es6.regexp.constructor":221,"./modules/es6.regexp.flags":222,"./modules/es6.regexp.match":223,"./modules/es6.regexp.replace":224,"./modules/es6.regexp.search":225,"./modules/es6.regexp.split":226,"./modules/es6.set":227,"./modules/es6.string.code-point-at":228,"./modules/es6.string.ends-with":229,"./modules/es6.string.from-code-point":230,"./modules/es6.string.includes":231,"./modules/es6.string.iterator":232,"./modules/es6.string.raw":233,"./modules/es6.string.repeat":234,"./modules/es6.string.starts-with":235,"./modules/es6.string.trim":236,"./modules/es6.symbol":237,"./modules/es6.weak-map":238,"./modules/es6.weak-set":239,"./modules/es7.array.includes":240,"./modules/es7.map.to-json":241,"./modules/es7.object.entries":242,"./modules/es7.object.get-own-property-descriptors":243,"./modules/es7.object.values":244,"./modules/es7.regexp.escape":245,"./modules/es7.set.to-json":246,"./modules/es7.string.at":247,"./modules/es7.string.pad-left":248,"./modules/es7.string.pad-right":249,"./modules/es7.string.trim-left":250,"./modules/es7.string.trim-right":251,"./modules/js.array.statics":252,"./modules/web.dom.iterable":253,"./modules/web.immediate":254,"./modules/web.timers":255}],257:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],258:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : new Promise(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":257}],259:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Symbol = require('babel-runtime/core-js/symbol')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

if (!window.altspace) {
	window.altspace = {};
}
if (!window.altspace.utilities) {
	window.altspace.utilities = {};
}
if (!window.altspace.utilities.behaviors) {
	window.altspace.utilities.behaviors = {};
}

require('babel/polyfill');
var containerMax = _Symbol('containerMax'),
    containerMin = _Symbol('containerMin'),
    object3D = _Symbol('object3D'),
    boundingBox = _Symbol('boundingBox'),
    origMatrix = _Symbol('origMatrix'),
    origMatrixAutoUpdate = _Symbol('origMatrixAutoUpdate'),
    parent = _Symbol('parent'),
    enclosure = _Symbol('enclosure'),
    origParentBoundingBoxes = new _Map();

/**
 * The Layout behavior allows you to position objects easily. You can 
 * position an object relative to its parent (either the Scene or a 
 * another object) by using a position specifier for each of the axes.
 * The position specifier can be one of 'min', 'center' or 'max'. The default
 * specifier is 'center'. You can also add a modifier to the position in pixels
 * ('min+5'), a percentage ('min+10%') or meters ('min+1m'). Finally, you can 
 * choose the location of the anchor on the object you are trying to position 
 * by using the 'my' parameter.
 * You must specify at least one axis on the 'at' parameter.
 *
 * @example
 * // Position the top of the cube at 1.5 meters above the bottom of its parent.
 * cube.addBehavior(new altpsace.utilities.behaviors.Layout({
 *	   my: {y: 'max'}, 
 *	   at: {y: 'min+1.5m'}
 * });
 *
 * @class Layout
 * @memberof module:altspace/utilities/behaviors
 * @param {Object} config
 * @param {Object} config.at An object containing the axes and position 
 *  specifiers. At least one axis must be specificed. E.g. `{x: 'min', y: 'max-5%'}`
 * @param {Object} [config.my] An object containing the axes and position
 *  specifiers for the layout anchor.
 **/

var Layout = (function () {
	function Layout(_ref) {
		var _ref$my = _ref.my;
		var my = _ref$my === undefined ? {} : _ref$my;
		var at = _ref.at;

		_classCallCheck(this, Layout);

		this.my = my;
		this.at = at;
	}

	// TODO-BP Ideally these would be private methods.

	_createClass(Layout, [{
		key: 'getAxisSettings',
		value: function getAxisSettings(axis, axisValue, min, max) {
			axisValue = axisValue || 'center';
			axisValue = /(\w+)([-+].+)?/.exec(axisValue);
			var position = axisValue[1];
			var offsetSetting = axisValue[2];
			var offset = parseFloat(offsetSetting) || 0;
			if (offsetSetting && offsetSetting.endsWith('%')) {
				offset = offset / 100 * (max[axis] - min[axis]);
			} else if (offsetSetting && offsetSetting.endsWith('m')) {
				console.log(offset, this[enclosure]);
				offset = offset * this[enclosure].pixelsPerMeter;
				console.log(offset);
			}
			return {
				position: position,
				offset: offset
			};
		}
	}, {
		key: 'getAnchorOffset',
		value: function getAnchorOffset(axis, axisValue) {
			var max = this[boundingBox].max;
			var min = this[boundingBox].min;

			var _getAxisSettings = this.getAxisSettings(axis, axisValue, min, max);

			var position = _getAxisSettings.position;
			var offset = _getAxisSettings.offset;

			if (position === 'max') {
				return -max[axis] + offset;
			} else if (position === 'min') {
				return -min[axis] + offset;
			} else if (position === 'center') {
				return offset;
			} else {
				throw new Error(axisValue + ' is an invalid layout position for ' + axis);
			}
		}
	}, {
		key: 'doLayout',
		value: function doLayout() {
			var _this = this;

			_Array$from('xyz').forEach(function (axis) {
				var _getAxisSettings2 = _this.getAxisSettings(axis, _this.at[axis], _this[containerMin], _this[containerMax]);

				var position = _getAxisSettings2.position;
				var offset = _getAxisSettings2.offset;

				var anchorOffset = _this.getAnchorOffset(axis, _this.my[axis]);
				if (position === 'max') {
					_this[object3D].position[axis] = _this[containerMax][axis] + offset + anchorOffset;
				} else if (position === 'min') {
					_this[object3D].position[axis] = _this[containerMin][axis] + offset + anchorOffset;
				} else if (position === 'center') {
					_this[object3D].position[axis] = offset + anchorOffset;
				} else {
					throw new Error(_this.at[axis] + ' is an invalid layout position for ' + axis);
				}
			});

			if (this[parent]) {
				// Restore the original parent transform
				this[parent].matrix = this[origMatrix];
				this[parent].updateMatrixWorld(true);
				this[parent].matrixAutoUpdate = this[origMatrixAutoUpdate];
			}
		}
	}, {
		key: 'awake',
		value: function awake(_object3D) {
			var _this2 = this;

			this[object3D] = _object3D;
			this[boundingBox] = new THREE.Box3().setFromObject(this[object3D]);

			// TODO Listen for resize events on the enclosure
			altspace.getEnclosure().then(function (_enclosure) {
				_this2[enclosure] = _enclosure;
				if (_this2[object3D].parent instanceof THREE.Scene) {
					var hw = _this2[enclosure].innerWidth / 2,
					    hh = _this2[enclosure].innerHeight / 2,
					    hd = _this2[enclosure].innerDepth / 2;
					_this2[containerMax] = new THREE.Vector3(hw, hh, hd);
					_this2[containerMin] = new THREE.Vector3(-hw, -hh, -hd);
					_this2.doLayout();
				} else {
					var objWorldScale = _this2[object3D].getWorldScale();
					_this2[boundingBox].min.divide(objWorldScale);
					_this2[boundingBox].max.divide(objWorldScale);

					_this2[parent] = _this2[object3D].parent;

					_this2[origMatrix] = _this2[parent].matrix.clone();
					_this2[origMatrixAutoUpdate] = _this2[parent].matrixAutoUpdate;

					// We want to use the un-transormed anchor of the parent.
					// Reset the parent matrix so that we can get the original bounding box.
					_this2[parent].matrixAutoUpdate = false;
					_this2[parent].matrix.identity();

					var parentBoundingBox = undefined;
					if (origParentBoundingBoxes.has(_this2[parent].uuid)) {
						parentBoundingBox = origParentBoundingBoxes.get(_this2[parent].uuid);
					} else {
						_this2[parent].remove(_this2[object3D]);
						parentBoundingBox = new THREE.Box3().setFromObject(_this2[parent]);
						_this2[parent].add(_this2[object3D]);
						origParentBoundingBoxes.set(_this2[parent].uuid, parentBoundingBox);
					}

					_this2[containerMax] = parentBoundingBox.max;
					_this2[containerMin] = parentBoundingBox.min;
					_this2.doLayout();
				}
			});
		}
	}]);

	return Layout;
})();

window.altspace.utilities.behaviors.Layout = Layout;
},{"babel-runtime/core-js/array/from":3,"babel-runtime/core-js/map":4,"babel-runtime/core-js/symbol":6,"babel-runtime/helpers/class-call-check":7,"babel-runtime/helpers/create-class":8,"babel/polyfill":9}]},{},[259]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":5}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":6}],3:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],4:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":1}],5:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":34}],6:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":12,"../modules/es6.object.to-string":56,"../modules/es6.promise":57,"../modules/es6.string.iterator":58,"../modules/web.dom.iterable":59}],7:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],8:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],9:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":27}],10:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":11,"./$.wks":53}],11:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],12:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],13:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":7}],14:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],15:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":18}],16:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":20,"./$.is-object":27}],17:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":12,"./$.ctx":13,"./$.global":20}],18:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],19:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":9,"./$.ctx":13,"./$.is-array-iter":26,"./$.iter-call":28,"./$.to-length":51,"./core.get-iterator-method":54}],20:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],21:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],22:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":34,"./$.descriptors":15,"./$.property-desc":37}],23:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":20}],24:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],25:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":11}],26:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":33,"./$.wks":53}],27:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],28:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":9}],29:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":34,"./$.hide":22,"./$.property-desc":37,"./$.set-to-string-tag":43,"./$.wks":53}],30:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":34,"./$.export":17,"./$.has":21,"./$.hide":22,"./$.iter-create":29,"./$.iterators":33,"./$.library":35,"./$.redefine":39,"./$.set-to-string-tag":43,"./$.wks":53}],31:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":53}],32:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],33:[function(require,module,exports){
module.exports = {};
},{}],34:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],35:[function(require,module,exports){
module.exports = true;
},{}],36:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":11,"./$.global":20,"./$.task":48}],37:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],38:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":39}],39:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":22}],40:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],41:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":34,"./$.an-object":9,"./$.ctx":13,"./$.is-object":27}],42:[function(require,module,exports){
'use strict';
var core        = require('./$.core')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":34,"./$.core":12,"./$.descriptors":15,"./$.wks":53}],43:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":34,"./$.has":21,"./$.wks":53}],44:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":20}],45:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":7,"./$.an-object":9,"./$.wks":53}],46:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],47:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":14,"./$.to-integer":49}],48:[function(require,module,exports){
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":11,"./$.ctx":13,"./$.dom-create":16,"./$.global":20,"./$.html":23,"./$.invoke":24}],49:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],50:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":14,"./$.iobject":25}],51:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":49}],52:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],53:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":20,"./$.shared":44,"./$.uid":52}],54:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":10,"./$.core":12,"./$.iterators":33,"./$.wks":53}],55:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":8,"./$.iter-define":30,"./$.iter-step":32,"./$.iterators":33,"./$.to-iobject":50}],56:[function(require,module,exports){

},{}],57:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $export    = require('./$.export')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same-value')
  , SPECIES    = require('./$.wks')('species')
  , speciesConstructor = require('./$.species-constructor')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.descriptors')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./$":34,"./$.a-function":7,"./$.an-object":9,"./$.classof":10,"./$.core":12,"./$.ctx":13,"./$.descriptors":15,"./$.export":17,"./$.for-of":19,"./$.global":20,"./$.is-object":27,"./$.iter-detect":31,"./$.library":35,"./$.microtask":36,"./$.redefine-all":38,"./$.same-value":40,"./$.set-proto":41,"./$.set-species":42,"./$.set-to-string-tag":43,"./$.species-constructor":45,"./$.strict-new":46,"./$.wks":53}],58:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":30,"./$.string-at":47}],59:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":33,"./es6.array.iterator":55}],60:[function(require,module,exports){
'use strict';

// Returns a Promise that resovles static when a steamvr controller is found

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

function getController(hand) {
	var findGamepad = function findGamepad(resolve, reject) {
		var gamepad = altspace.getGamepads().find(function (g) {
			return g.mapping === 'steamvr' && g.hand === hand;
		});
		if (gamepad) {
			console.log("SteamVR input device found", gamepad);
			resolve(gamepad);
		} else {
			console.log("SteamVR input device not found trying again in 500ms...");
			setTimeout(findGamepad, 500, resolve, reject);
		}
	};

	return new _Promise(findGamepad);
}

/**
 * The SteamVRInput behavior manages SteamVR input devices. It should be added
 * to the ThreeJS scene and is required to use [SteamVRTrackedObject]{@link module:altspace/utilities/behaviors.SteamVRTrackedObject}
 *
 * @class SteamVRInput
 * @memberof module:altspace/utilities/behaviors
 *
 * @prop {Gamepad} leftController the left SteamVR [Gamepad]{@link module:altspace~Gamepad} or undefined if one has not yet been found
 * @prop {Gamepad} rightController the right SteamVR [Gamepad]{@link module:altspace~Gamepad} or undefined if one has not yet been found
 * @prop {Gamepad} firstController the first SteamVR [Gamepad]{@link module:altspace~Gamepad}  or undefined if none have yet been found
 *
 * @prop {Promise} leftControllerPromise a promise that resolves once the left SteamVR input device is found
 * @prop {Promise} rightControllerPromise a promise that resolves once the right SteamVR input device is found
 * @prop {Promise} firstControllerPromise a promise that resolves once any SteamVR input device is found
 */

var SteamVRInputBehavior = (function () {
	function SteamVRInputBehavior() {
		_classCallCheck(this, SteamVRInputBehavior);

		this.type = 'SteamVRInput';
	}

	_createClass(SteamVRInputBehavior, [{
		key: 'awake',
		value: function awake() {
			var _this = this;

			this.leftControllerPromise = getController(SteamVRInputBehavior.LEFT_CONTROLLER);
			this.rightControllerPromise = getController(SteamVRInputBehavior.RIGHT_CONTROLLER);
			this.firstControllerPromise = _Promise.race([this.leftControllerPromise, this.rightControllerPromise]);

			this.leftControllerPromise.then(function (controller) {
				_this.leftController = controller;
			});
			this.rightControllerPromise.then(function (controller) {
				_this.rightController = controller;
			});
			this.firstControllerPromise.then(function (controller) {
				_this.firstController = controller;

				var blockedAxes = controller.axes.map(function () {
					return false;
				});
				var blockedButtons = controller.buttons.map(function () {
					return false;
				});

				blockedButtons[SteamVRInputBehavior.BUTTON_TRIGGER] = true;
				blockedButtons[SteamVRInputBehavior.BUTTON_TOUCHPAD] = true;

				controller.preventDefault(blockedAxes, blockedButtons);
			});
		}
	}]);

	return SteamVRInputBehavior;
})();

SteamVRInputBehavior.BUTTON_TRIGGER = 0;
SteamVRInputBehavior.BUTTON_GRIP = 1;
SteamVRInputBehavior.BUTTON_TOUCHPAD = 2;
SteamVRInputBehavior.BUTTON_DPAD_UP = 3;
SteamVRInputBehavior.BUTTON_DPAD_RIGHT = 4;
SteamVRInputBehavior.BUTTON_DPAD_DOWN = 5;
SteamVRInputBehavior.BUTTON_DPAD_LEFT = 6;

SteamVRInputBehavior.AXIS_TOUCHPAD_X = 0;
SteamVRInputBehavior.AXIS_TOUCHPAD_Y = 1;

SteamVRInputBehavior.FIRST_CONTROLLER = 'first';
SteamVRInputBehavior.LEFT_CONTROLLER = 'left';
SteamVRInputBehavior.RIGHT_CONTROLLER = 'right';

window.altspace.utilities.behaviors.SteamVRInput = SteamVRInputBehavior;
},{"babel-runtime/core-js/promise":2,"babel-runtime/helpers/class-call-check":3,"babel-runtime/helpers/create-class":4}]},{},[60]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":4}],2:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],3:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":1}],4:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":5}],5:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],6:[function(require,module,exports){
'use strict';

/**
 * The SteamVRTrackedObject behavior updates an objects position and rotation to
 * match the location of a SteamVR input device.
 *
 * A [SteamVRInput]{@link module:altspace/utilities/behaviors.SteamVRInput} behavior
 * must be on the scene containing this object for it to function properly.
 *
 * @class SteamVRTrackedObject
 *
 * @param {Object} [config]
 * @param {string} [config.hand="first"] the input device to track. Eitehr SteamVRInput.LEFT_CONTROLLER, SteamVRInput.RIGHT_CONTROLLER, or SteamVRInput.FIRST_CONTROLLER
 * @memberof module:altspace/utilities/behaviors
 */

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var SteamVRTrackedObjectBehavior = (function () {
	function SteamVRTrackedObjectBehavior(_ref) {
		var _ref$hand = _ref.hand;
		var hand = _ref$hand === undefined ? 'first' : _ref$hand;

		_classCallCheck(this, SteamVRTrackedObjectBehavior);

		this._hand = hand;
	}

	_createClass(SteamVRTrackedObjectBehavior, [{
		key: 'awake',
		value: function awake(object3d, scene) {
			this._object3d = object3d;
			this._scene = scene;

			this._steamVRInput = this._scene.getBehaviorByType('SteamVRInput');
		}
	}, {
		key: 'update',
		value: function update() {
			var controller = this._steamVRInput[this._hand + "Controller"];
			var object3d = this._object3d;

			if (controller) {
				var _controller$position = controller.position;
				var x = _controller$position.x;
				var y = _controller$position.y;
				var z = _controller$position.z;

				object3d.position.set(x, y, z);

				var _controller$rotation = controller.rotation;
				var x = _controller$rotation.x;
				var y = _controller$rotation.y;
				var z = _controller$rotation.z;
				var w = _controller$rotation.w;

				object3d.quaternion.set(x, y, z, w);
			}
		}
	}]);

	return SteamVRTrackedObjectBehavior;
})();

window.altspace.utilities.behaviors.SteamVRTrackedObject = SteamVRTrackedObjectBehavior;
},{"babel-runtime/helpers/class-call-check":2,"babel-runtime/helpers/create-class":3}]},{},[6]);

(function () {

	var version = '0.18.0';

	if (window.altspace && window.altspace.requestVersion) {
		window.altspace.requestVersion(version);
	}

}());

return altspace;

}));
