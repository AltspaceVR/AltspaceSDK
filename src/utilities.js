'use strict';

function safeDeepSet(obj, keys, value)
{
	if(keys.length === 0)
		return value;
	else {
		obj[keys[0]] = safeDeepSet(obj[keys[0]] || {}, keys.slice(1), value);
		return obj;
	}
}

export { safeDeepSet };
