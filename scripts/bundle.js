'use strict';

const libpath = require('path'),
	fs = require('mz/fs'),
	rollup = require('rollup'),
 	buble = require('rollup-plugin-buble'),
	replace = require('rollup-plugin-replace'),
	uglify = require('rollup-plugin-uglify'),
	version = require('../package.json').version;

function r(...args){
	return libpath.resolve(__dirname, ...args);
}

let depPaths = [r('../lib/firebase.min.js'), r('../lib/url.min.js'), r('../lib/please.min.js')];
let depBundle = '';

// load dependencies
let depsResolved =
	Promise.all(
		depPaths.map(p => fs.readFile(p))
	)
	.catch(err => { console.error(err); })

	// create dependency bundle
	.then(results => {
		depBundle = results.join('\n');
	});

// start the non-minified build
depsResolved.then(() =>
{
	return rollup.rollup({
		entry: r('..','src','index.js'),
		context: 'window',
		external: ['firebase', 'urllib', 'please'],
		plugins: [buble(), replace({
			delimiters: ['{{', '}}'],
			values: {
				SDK_VERSION: version
			}
		})]
	});
})
.catch(e => { console.error(e); })

.then(bundle =>
{
	// generate bundle file
	let result = bundle.generate({
		format: 'iife',
		moduleName: 'altspace',
		globals: {
			firebase: 'Firebase',
			urllib: 'Url',
			please: 'Please'
		}
	});

	// adjust sourcemap line numbers w.r.t. dependencies
	//console.log(result.map);

	let plainOutFile = r('..','dist','altspace.js');

	// output altspace.js
	fs.writeFile(
		plainOutFile,
		[depBundle, result.code].join('\n'),
		err => {
			if(err)
				console.error(err);
			else
				console.log(plainOutFile);
		}
	);
});


// start the minified build
depsResolved.then(() =>
{
	return rollup.rollup({
		entry: r('..','src','index.js'),
		context: 'window',
		external: ['firebase', 'urllib', 'please'],
		plugins: [buble(), replace({
			delimiters: ['{{', '}}'],
			values: {
				SDK_VERSION: version
			}
		}), uglify()]
	});
})
.catch(e => { console.error(e); })

.then(bundle =>
{
	// generate bundle file
	let result = bundle.generate({
		format: 'iife',
		moduleName: 'altspace',
		globals: {
			firebase: 'Firebase',
			urllib: 'Url',
			please: 'Please'
		}
	});

	// adjust sourcemap line numbers w.r.t. dependencies
	//console.log(result.map);

	let plainMinFile = r('..','dist','altspace.min.js');

	// output altspace.js
	fs.writeFile(
		plainMinFile,
		[depBundle, result.code].join('\n'),
		err => {
			if(err)
				console.error(err);
			else
				console.log(plainMinFile);
		}
	);
});
