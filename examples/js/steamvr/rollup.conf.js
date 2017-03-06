const buble = require('rollup-plugin-buble'),
	node_resolve = require('rollup-plugin-node-resolve'),
	commonjs = require('rollup-plugin-commonjs');

export default {
	"entry": "src/index.js",
	"dest": "bundle.js",
	"format": "iife",
	"plugins": [
		buble(),
		node_resolve({jsnext: true, main: true}),
		commonjs({sourceMap: false})
	],

	"external": ["three", "altspace"],
	"globals": {
		three: 'THREE',
		altspace: 'altspace'
	}
};
