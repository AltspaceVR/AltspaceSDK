(function () {
'use strict';

var isImplemented = function () {
	var map, iterator, result;
	if (typeof Map !== 'function') { return false; }
	try {
		// WebKit doesn't support arguments and crashes
		map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
	} catch (e) {
		return false;
	}
	if (String(map) !== '[object Map]') { return false; }
	if (map.size !== 3) { return false; }
	if (typeof map.clear !== 'function') { return false; }
	if (typeof map.delete !== 'function') { return false; }
	if (typeof map.entries !== 'function') { return false; }
	if (typeof map.forEach !== 'function') { return false; }
	if (typeof map.get !== 'function') { return false; }
	if (typeof map.has !== 'function') { return false; }
	if (typeof map.keys !== 'function') { return false; }
	if (typeof map.set !== 'function') { return false; }
	if (typeof map.values !== 'function') { return false; }

	iterator = map.entries();
	result = iterator.next();
	if (result.done !== false) { return false; }
	if (!result.value) { return false; }
	if (result.value[0] !== 'raz') { return false; }
	if (result.value[1] !== 'one') { return false; }

	return true;
};

var validValue$1 = function (value) {
	if (value == null) { throw new TypeError("Cannot use null or undefined"); }
	return value;
};

var value = validValue$1;

var clear$1 = function () {
	value(this).length = 0;
	return this;
};

var isImplemented$2 = function () {
	var sign = Math.sign;
	if (typeof sign !== 'function') { return false; }
	return ((sign(10) === 1) && (sign(-20) === -1));
};

var shim = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) { return value; }
	return (value > 0) ? 1 : -1;
};

var index$1 = isImplemented$2()
	? Math.sign
	: shim;

var sign = index$1;
var abs$1 = Math.abs;
var floor$1 = Math.floor;

var toInteger$1 = function (value) {
	if (isNaN(value)) { return 0; }
	value = Number(value);
	if ((value === 0) || !isFinite(value)) { return value; }
	return sign(value) * floor$1(abs$1(value));
};

var toInteger = toInteger$1;
var max = Math.max;

var toPosInteger = function (value) { return max(0, toInteger(value)); };

var toPosInt = toPosInteger;
var value$1    = validValue$1;
var indexOf = Array.prototype.indexOf;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var abs = Math.abs;
var floor = Math.floor;

var eIndexOf$1 = function (searchElement/*, fromIndex*/) {
	var this$1 = this;

	var i, l, fromIndex, val;
	if (searchElement === searchElement) { //jslint: ignore
		return indexOf.apply(this, arguments);
	}

	l = toPosInt(value$1(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) { fromIndex = 0; }
	else if (fromIndex >= 0) { fromIndex = floor(fromIndex); }
	else { fromIndex = toPosInt(this.length) - floor(abs(fromIndex)); }

	for (i = fromIndex; i < l; ++i) {
		if (hasOwnProperty.call(this$1, i)) {
			val = this$1[i];
			if (val !== val) { return i; } //jslint: ignore
		}
	}
	return -1;
};

var create = Object.create;
var getPrototypeOf$1 = Object.getPrototypeOf;
var x = {};

var isImplemented$4 = function (/*customCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf
	  , customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') { return false; }
	return getPrototypeOf$1(setPrototypeOf(customCreate(null), x)) === x;
};

var map = { function: true, object: true };

var isObject$1 = function (x) {
	return ((x != null) && map[typeof x]) || false;
};

var create$1 = Object.create;
var shim$4;

if (!isImplemented$4()) {
	shim$4 = shim$2;
}

var create_1 = (function () {
	var nullObject, props, desc;
	if (!shim$4) { return create$1; }
	if (shim$4.level !== 1) { return create$1; }

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim$4, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create$1((prototype === null) ? nullObject : prototype, props);
	};
}());

var isObject      = isObject$1;
var value$2         = validValue$1;
var isPrototypeOf = Object.prototype.isPrototypeOf;
var defineProperty = Object.defineProperty;
var nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined };
var validate;

validate = function (obj, prototype) {
	value$2(obj);
	if ((prototype === null) || isObject(prototype)) { return obj; }
	throw new TypeError('Prototype must be null or an object');
};

var shim$2 = (function (status) {
	var fn, set;
	if (!status) { return null; }
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) { delete self.nullPolyfill.__proto__; }
			if (prototype === null) { prototype = self.nullPolyfill; }
			obj.__proto__ = prototype;
			if (isNullBase) { defineProperty(self.nullPolyfill, '__proto__', nullDesc); }
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}((function () {
	var x = Object.create(null), y = {}, set
	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) { }
		if (Object.getPrototypeOf(x) === y) { return { set: set, level: 2 }; }
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) { return { level: 2 }; }

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) { return { level: 1 }; }

	return false;
}())));

var index$3 = isImplemented$4()
	? Object.setPrototypeOf
	: shim$2;

var validCallable = function (fn) {
	if (typeof fn !== 'function') { throw new TypeError(fn + " is not a function"); }
	return fn;
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var isImplemented$6 = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') { return false; }
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};

var isImplemented$8 = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};

var keys$1 = Object.keys;

var shim$7 = function (object) {
	return keys$1(object == null ? object : Object(object));
};

var index$9 = isImplemented$8()
	? Object.keys
	: shim$7;

var keys  = index$9;
var value$3 = validValue$1;
var max$1 = Math.max;

var shim$5 = function (dest, src/*, …srcn*/) {
	var arguments$1 = arguments;

	var error, i, l = max$1(arguments.length, 2), assign;
	dest = Object(value$3(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) { error = e; }
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments$1[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) { throw error; }
	return dest;
};

var index$7 = isImplemented$6()
	? Object.assign
	: shim$5;

var forEach = Array.prototype.forEach;
var create$2 = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) { obj[key] = src[key]; }
};

var normalizeOptions = function (options/*, …options*/) {
	var result = create$2(null);
	forEach.call(arguments, function (options) {
		if (options == null) { return; }
		process(Object(options), result);
	});
	return result;
};

// Deprecated

var isCallable = function (obj) { return typeof obj === 'function'; };

var str = 'razdwatrzy';

var isImplemented$10 = function () {
	if (typeof str.contains !== 'function') { return false; }
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};

var indexOf$1 = String.prototype.indexOf;

var shim$9 = function (searchString/*, position*/) {
	return indexOf$1.call(this, searchString, arguments[1]) > -1;
};

var index$11 = isImplemented$10()
	? String.prototype.contains
	: shim$9;

var index$5 = createCommonjsModule(function (module) {
'use strict';

var assign        = index$7
  , normalizeOpts = normalizeOptions
  , isCallable$$1    = isCallable
  , contains      = index$11

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable$$1(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable$$1(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};
});

var index$13 = createCommonjsModule(function (module, exports) {
'use strict';

var d        = index$5
  , callable = validCallable

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) { data[type] = listener; }
	else if (typeof data[type] === 'object') { data[type].push(listener); }
	else { data[type] = [data[type], listener]; }

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) { return this; }
	data = this.__ee__;
	if (!data[type]) { return this; }
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) { data[type] = listeners[i ? 0 : 1]; }
				else { listeners.splice(i, 1); }
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var arguments$1 = arguments;
	var this$1 = this;

	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) { return; }
	listeners = this.__ee__[type];
	if (!listeners) { return; }

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) { args[i - 1] = arguments$1[i]; }

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this$1, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments$1[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;
});

var validTypes = { object: true, symbol: true };

var isImplemented$12 = function () {
	var symbol;
	if (typeof Symbol !== 'function') { return false; }
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) { return false; }
	if (!validTypes[typeof Symbol.toPrimitive]) { return false; }
	if (!validTypes[typeof Symbol.toStringTag]) { return false; }

	return true;
};

var isSymbol$1 = function (x) {
	if (!x) { return false; }
	if (typeof x === 'symbol') { return true; }
	if (!x.constructor) { return false; }
	if (x.constructor.name !== 'Symbol') { return false; }
	return (x[x.constructor.toStringTag] === 'Symbol');
};

var isSymbol = isSymbol$1;

var validateSymbol$1 = function (value) {
	if (!isSymbol(value)) { throw new TypeError(value + " is not a symbol"); }
	return value;
};

var d$1              = index$5;
var validateSymbol = validateSymbol$1;
var create$3 = Object.create;
var defineProperties$1 = Object.defineProperties;
var defineProperty$1 = Object.defineProperty;
var objPrototype = Object.prototype;
var NativeSymbol;
var SymbolPolyfill;
var HiddenSymbol;
var globalSymbols = create$3(null);
var isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create$3(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) { ++postfix; }
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty$1(objPrototype, name, d$1.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) { return; }
			ie11BugWorkaround = true;
			defineProperty$1(this, name, d$1(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) { throw new TypeError('TypeError: Symbol is not a constructor'); }
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
var polyfill$2 = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) { throw new TypeError('TypeError: Symbol is not a constructor'); }
	if (isNativeSafe) { return NativeSymbol(description); }
	symbol = create$3(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties$1(symbol, {
		__description__: d$1('', description),
		__name__: d$1('', generateName(description))
	});
};
defineProperties$1(SymbolPolyfill, {
	for: d$1(function (key) {
		if (globalSymbols[key]) { return globalSymbols[key]; }
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d$1(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) { if (globalSymbols[key] === s) { return key; } }
	}),

	// If there's native implementation of given symbol, let's fallback to it
	// to ensure proper interoperability with other native functions e.g. Array.from
	hasInstance: d$1('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d$1('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d$1('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d$1('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d$1('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d$1('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d$1('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d$1('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d$1('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d$1('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d$1('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties$1(HiddenSymbol.prototype, {
	constructor: d$1(SymbolPolyfill),
	toString: d$1('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties$1(SymbolPolyfill.prototype, {
	toString: d$1(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d$1(function () { return validateSymbol(this); })
});
defineProperty$1(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d$1('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') { return symbol; }
	return symbol.toString();
}));
defineProperty$1(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d$1('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty$1(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d$1('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty$1(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d$1('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

var index$15 = isImplemented$12() ? Symbol : polyfill$2;

var toString = Object.prototype.toString;
var id = toString.call((function () { return arguments; }()));

var isArguments$1 = function (x) { return (toString.call(x) === id); };

var toString$1 = Object.prototype.toString;
var id$1 = toString$1.call('');

var isString$1 = function (x) {
	return (typeof x === 'string') || (x && (typeof x === 'object') &&
		((x instanceof String) || (toString$1.call(x) === id$1))) || false;
};

var isArguments    = isArguments$1;
var isString       = isString$1;
var iteratorSymbol = index$15.iterator;
var isArray = Array.isArray;

var isIterable$1 = function (value) {
	if (value == null) { return false; }
	if (isArray(value)) { return true; }
	if (isString(value)) { return true; }
	if (isArguments(value)) { return true; }
	return (typeof value[iteratorSymbol] === 'function');
};

var isIterable = isIterable$1;

var validIterable = function (value) {
	if (!isIterable(value)) { throw new TypeError(value + " is not iterable"); }
	return value;
};

var assign$1 = index$7;
var value$5  = validValue$1;

var copy$1 = function (obj) {
	var copy = Object(value$5(obj));
	if (copy !== obj) { return copy; }
	return assign$1({}, obj);
};

var callable$5 = validCallable;
var value$6    = validValue$1;
var bind$1 = Function.prototype.bind;
var call$3 = Function.prototype.call;
var keys$2 = Object.keys;
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

var _iterate = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value$6(obj));
		callable$5(cb);

		list = keys$2(obj);
		if (compareFn) {
			list.sort((typeof compareFn === 'function') ? bind$1.call(compareFn, obj) : undefined);
		}
		if (typeof method !== 'function') { method = list[method]; }
		return call$3.call(method, list, function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) { return defVal; }
			return call$3.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

var forEach$2 = _iterate('forEach');

var callable$4 = validCallable;
var forEach$1  = forEach$2;
var call$2 = Function.prototype.call;

var map$2 = function (obj, cb/*, thisArg*/) {
	var o = {}, thisArg = arguments[2];
	callable$4(cb);
	forEach$1(obj, function (value, key, obj, index) {
		o[key] = call$2.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};

var copy       = copy$1;
var map$1        = map$2;
var callable$3   = validCallable;
var validValue$3 = validValue$1;
var bind = Function.prototype.bind;
var defineProperty$3 = Object.defineProperty;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var define;

define = function (name, desc, bindTo) {
	var value = validValue$3(desc) && callable$3(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (hasOwnProperty$1.call(this, name)) { return value; }
		desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
		defineProperty$3(this, name, desc);
		return this[name];
	};
	return dgs;
};

var autoBind$1 = function (props/*, bindTo*/) {
	var bindTo = arguments[1];
	return map$1(props, function (desc, name) {
		return define(name, desc, bindTo);
	});
};

var clear$3    = clear$1;
var assign   = index$7;
var callable$2 = validCallable;
var value$4    = validValue$1;
var d$2        = index$5;
var autoBind = autoBind$1;
var Symbol$2   = index$15;
var defineProperty$2 = Object.defineProperty;
var defineProperties$2 = Object.defineProperties;
var Iterator$1;

var index$17 = Iterator$1 = function (list, context) {
	if (!(this instanceof Iterator$1)) { return new Iterator$1(list, context); }
	defineProperties$2(this, {
		__list__: d$2('w', value$4(list)),
		__context__: d$2('w', context),
		__nextIndex__: d$2('w', 0)
	});
	if (!context) { return; }
	callable$2(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties$2(Iterator$1.prototype, assign({
	constructor: d$2(Iterator$1),
	_next: d$2(function () {
		var i;
		if (!this.__list__) { return; }
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) { return i; }
		}
		if (this.__nextIndex__ < this.__list__.length) { return this.__nextIndex__++; }
		this._unBind();
	}),
	next: d$2(function () { return this._createResult(this._next()); }),
	_createResult: d$2(function (i) {
		if (i === undefined) { return { done: true, value: undefined }; }
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d$2(function (i) { return this.__list__[i]; }),
	_unBind: d$2(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) { return; }
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d$2(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d$2(function (index) {
		if (index >= this.__nextIndex__) { return; }
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty$2(this, '__redo__', d$2('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) { this.__redo__[i] = ++redo; }
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d$2(function (index) {
		var i;
		if (index >= this.__nextIndex__) { return; }
		--this.__nextIndex__;
		if (!this.__redo__) { return; }
		i = this.__redo__.indexOf(index);
		if (i !== -1) { this.__redo__.splice(i, 1); }
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) { this.__redo__[i] = --redo; }
		}, this);
	}),
	_onClear: d$2(function () {
		if (this.__redo__) { clear$3.call(this.__redo__); }
		this.__nextIndex__ = 0;
	})
})));

defineProperty$2(Iterator$1.prototype, Symbol$2.iterator, d$2(function () {
	return this;
}));
defineProperty$2(Iterator$1.prototype, Symbol$2.toStringTag, d$2('', 'Iterator'));

var array = createCommonjsModule(function (module) {
'use strict';

var setPrototypeOf = index$3
  , contains       = index$11
  , d              = index$5
  , Iterator       = index$17

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) { return new ArrayIterator(arr, kind); }
	Iterator.call(this, arr);
	if (!kind) { kind = 'value'; }
	else if (contains.call(kind, 'key+value')) { kind = 'key+value'; }
	else if (contains.call(kind, 'key')) { kind = 'key'; }
	else { kind = 'value'; }
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) { setPrototypeOf(ArrayIterator, Iterator); }

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') { return this.__list__[i]; }
		if (this.__kind__ === 'key+value') { return [i, this.__list__[i]]; }
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});
});

var string = createCommonjsModule(function (module) {
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

'use strict';

var setPrototypeOf = index$3
  , d              = index$5
  , Iterator       = index$17

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) { return new StringIterator(str); }
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) { setPrototypeOf(StringIterator, Iterator); }

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) { return; }
		if (this.__nextIndex__ < this.__length__) { return this.__nextIndex__++; }
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) { return char; }
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) { return char + this.__list__[this.__nextIndex__++]; }
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});
});

var isArguments$4    = isArguments$1;
var isString$4       = isString$1;
var ArrayIterator  = array;
var StringIterator = string;
var iterable       = validIterable;
var iteratorSymbol$1 = index$15.iterator;

var get$1 = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol$1] === 'function') { return obj[iteratorSymbol$1](); }
	if (isArguments$4(obj)) { return new ArrayIterator(obj); }
	if (isString$4(obj)) { return new StringIterator(obj); }
	return new ArrayIterator(obj);
};

var isArguments$3 = isArguments$1;
var callable$1    = validCallable;
var isString$3    = isString$1;
var get         = get$1;
var isArray$1 = Array.isArray;
var call$1 = Function.prototype.call;
var some = Array.prototype.some;

var forOf$1 = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray$1(iterable) || isArguments$3(iterable)) { mode = 'array'; }
	else if (isString$3(iterable)) { mode = 'string'; }
	else { iterable = get(iterable); }

	callable$1(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		some.call(iterable, function (value) {
			call$1.call(cb, thisArg, value, doBreak);
			if (broken) { return true; }
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) { char += iterable[++i]; }
			}
			call$1.call(cb, thisArg, char, doBreak);
			if (broken) { break; }
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call$1.call(cb, thisArg, result.value, doBreak);
		if (broken) { return; }
		result = iterable.next();
	}
};

var forEach$4 = Array.prototype.forEach;
var create$4 = Object.create;

var primitiveSet = function (arg/*, …args*/) {
	var set = create$4(null);
	forEach$4.call(arguments, function (name) { set[name] = true; });
	return set;
};

var iteratorKinds = primitiveSet('key',
	'value', 'key+value');

var iterator$1 = createCommonjsModule(function (module) {
'use strict';

var setPrototypeOf    = index$3
  , d                 = index$5
  , Iterator          = index$17
  , toStringTagSymbol = index$15.toStringTag
  , kinds             = iteratorKinds

  , defineProperties = Object.defineProperties
  , unBind = Iterator.prototype._unBind
  , MapIterator;

MapIterator = module.exports = function (map, kind) {
	if (!(this instanceof MapIterator)) { return new MapIterator(map, kind); }
	Iterator.call(this, map.__mapKeysData__, map);
	if (!kind || !kinds[kind]) { kind = 'key+value'; }
	defineProperties(this, {
		__kind__: d('', kind),
		__values__: d('w', map.__mapValuesData__)
	});
};
if (setPrototypeOf) { setPrototypeOf(MapIterator, Iterator); }

MapIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(MapIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') { return this.__values__[i]; }
		if (this.__kind__ === 'key') { return this.__list__[i]; }
		return [this.__list__[i], this.__values__[i]];
	}),
	_unBind: d(function () {
		this.__values__ = null;
		unBind.call(this);
	}),
	toString: d(function () { return '[object Map Iterator]'; })
});
Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
	d('c', 'Map Iterator'));
});

// Exports true if environment provides native `Map` implementation,
// whatever that is.

var isNativeImplemented = (function () {
	if (typeof Map === 'undefined') { return false; }
	return (Object.prototype.toString.call(new Map()) === '[object Map]');
}());

var clear          = clear$1;
var eIndexOf       = eIndexOf$1;
var setPrototypeOf = index$3;
var callable       = validCallable;
var validValue     = validValue$1;
var d              = index$5;
var ee             = index$13;
var Symbol$1         = index$15;
var iterator       = validIterable;
var forOf          = forOf$1;
var Iterator       = iterator$1;
var isNative       = isNativeImplemented;
var call = Function.prototype.call;
var defineProperties = Object.defineProperties;
var getPrototypeOf = Object.getPrototypeOf;
var MapPoly;

var polyfill = MapPoly = function (/*iterable*/) {
	var iterable = arguments[0], keys, values, self;
	if (!(this instanceof MapPoly)) { throw new TypeError('Constructor requires \'new\''); }
	if (isNative && setPrototypeOf && (Map !== MapPoly)) {
		self = setPrototypeOf(new Map(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) { iterator(iterable); }
	defineProperties(self, {
		__mapKeysData__: d('c', keys = []),
		__mapValuesData__: d('c', values = [])
	});
	if (!iterable) { return self; }
	forOf(iterable, function (value) {
		var key = validValue(value)[0];
		value = value[1];
		if (eIndexOf.call(keys, key) !== -1) { return; }
		keys.push(key);
		values.push(value);
	}, self);
	return self;
};

if (isNative) {
	if (setPrototypeOf) { setPrototypeOf(MapPoly, Map); }
	MapPoly.prototype = Object.create(Map.prototype, {
		constructor: d(MapPoly)
	});
}

ee(defineProperties(MapPoly.prototype, {
	clear: d(function () {
		if (!this.__mapKeysData__.length) { return; }
		clear.call(this.__mapKeysData__);
		clear.call(this.__mapValuesData__);
		this.emit('_clear');
	}),
	delete: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) { return false; }
		this.__mapKeysData__.splice(index, 1);
		this.__mapValuesData__.splice(index, 1);
		this.emit('_delete', index, key);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var this$1 = this;

		var thisArg = arguments[1], iterator, result;
		callable(cb);
		iterator = this.entries();
		result = iterator._next();
		while (result !== undefined) {
			call.call(cb, thisArg, this$1.__mapValuesData__[result],
				this$1.__mapKeysData__[result], this$1);
			result = iterator._next();
		}
	}),
	get: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) { return; }
		return this.__mapValuesData__[index];
	}),
	has: d(function (key) {
		return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
	}),
	keys: d(function () { return new Iterator(this, 'key'); }),
	set: d(function (key, value) {
		var index = eIndexOf.call(this.__mapKeysData__, key), emit;
		if (index === -1) {
			index = this.__mapKeysData__.push(key) - 1;
			emit = true;
		}
		this.__mapValuesData__[index] = value;
		if (emit) { this.emit('_add', index, key); }
		return this;
	}),
	size: d.gs(function () { return this.__mapKeysData__.length; }),
	values: d(function () { return new Iterator(this, 'value'); }),
	toString: d(function () { return '[object Map]'; })
}));
Object.defineProperty(MapPoly.prototype, Symbol$1.iterator, d(function () {
	return this.entries();
}));
Object.defineProperty(MapPoly.prototype, Symbol$1.toStringTag, d('c', 'Map'));

var index = isImplemented() ? Map : polyfill;

var behaviors = altspace.utilities.behaviors;
var simulation = new altspace.utilities.Simulation();
var scene = window.scene = simulation.scene;
var loader = new THREE.ColladaLoader();
var models = window.models = new index();

if (!altspace.getEnclosure) {
	altspace.getEnclosure = function () {return {
		then: function (callback) {
			callback({
				innerWidth: 24,
				innerHeight: 24,
				innerDepth: 24,
				pixelsPerMeter: 4,
			});
		}
	}};
}

altspace.getEnclosure().then(function (enclosure) {
	scene.add(new THREE.AxisHelper());

	var loadingComplete = function () {
		var modelScale;
		if (enclosure.innerWidth / enclosure.pixelsPerMeter > 2) {
			modelScale = enclosure.pixelsPerMeter * 0.8;
		}
		else {
			modelScale = 100;
		}
		window.modelScale = modelScale;
		window.enclosure = enclosure;
		var table = models.get('table');
		table.scale.multiplyScalar(modelScale);
		scene.add(table);
		table.addBehavior(new behaviors.Layout(
			{my: {x: 'max', z: 'max'}, at: {y: 'min', x: 'max', z: 'max'}}
		));

		var chair = models.get('chair');
		table.add(chair);
		chair.addBehavior(new behaviors.Layout(
			{at: {x: 'center+0.6', z: 'min'}}
		));

		chair = chair.clone();
		table.add(chair);
		chair.addBehavior(new behaviors.Layout(
			{at: {x: 'center-0.6', z: 'min'}}
		));

		var shelves = models.get('shelves');
		shelves.scale.multiplyScalar(modelScale);
		shelves.rotation.y = Math.PI / 2;
		scene.add(shelves);
		shelves.addBehavior(new behaviors.Layout(
			{my: {x: 'min'}, at: {x: 'min', y: 'min'}}
		));

		var stool = models.get('stool');
		shelves.add(stool);
		stool.addBehavior(new behaviors.Layout(
			{my: {x: 'max-0.1', z: 'min'}, at: {x: 'min', z: 'min'}}
		));

		var bench = models.get('bench');
		bench.scale.multiplyScalar(modelScale);
		scene.add(bench);
		bench.addBehavior(new behaviors.Layout(
			{my: {x: 'min', z: 'min'}, at: {x: 'min', y: 'min', z: 'min'}}
		));

		var plaque = models.get('plaque');
		plaque.scale.multiplyScalar(modelScale);
		plaque.rotation.y = Math.PI;
		scene.add(plaque);
		plaque.addBehavior(new behaviors.Layout(
			{at: {y: 'min+2m', z: 'max'}}
		));
	};

	var modelNames = [
		'table', 'shelves', 'bench', 'chair', 'stool', 'plaque'
	];
	var totalLoaded = 0;
	modelNames.forEach(function (modelName) {
		loader.load(("../models/living-room/" + modelName + ".dae"), function (collada) {
			models.set(modelName, collada.scene);
			totalLoaded++;
			if (totalLoaded === modelNames.length) {
				loadingComplete();
			}
		});
	});
});

if (simulation.camera) {
	simulation.camera.position.z = 20;
	simulation.camera.position.y = 20;
	var controls = new THREE.OrbitControls(simulation.camera);
}

}());
