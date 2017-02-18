'use strict';

const gulp = require('gulp'),
	jsdoc = require('gulp-jsdoc3'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	print = require('gulp-print'),

	rollup = require('rollup-stream'),
	buble = require('rollup-plugin-buble'),
	r_replace = require('rollup-plugin-replace'),

	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	orderedMerge = require('ordered-merge-stream'),

	libpath = require('path'),
	del = require('del'),
	version = require('../package.json').version;;

function r(...args){
	return libpath.resolve(__dirname, ...args);
}

gulp.task('altspace_js', () =>
{
	// pack the various es2015 modules into a transpiled iife
	return orderedMerge([
		rollup({
			entry: r('../src/index.js'),
			format: 'iife',
			moduleName: 'altspace',
			external: ['firebase', 'urllib', 'please', 'threejs'],
			globals: {
				firebase: 'Firebase',
				urllib: 'Url',
				please: 'Please',
				threejs: 'THREE'
			},
			plugins: [buble(), r_replace({
				delimiters: ['{{', '}}'],
				values: {
					SDK_VERSION: version
				}
			})]
		})
			.pipe(source('altspace.js'))
			.pipe(buffer()),

		// tack our dependencies onto the end
		gulp.src([
			'firebase.min.js',
			'Please.min.js',
			'url.min.js'
		].map(f => r('../lib', f)))
	])

	// output non-minified source
	.pipe(concat('altspace.js'))
	.pipe(gulp.dest(r('../dist')))
	.pipe(print())

	// generate minified file
	.pipe(uglify())
	.pipe(concat('altspace.min.js'))
	.pipe(gulp.dest(r('../dist')))
	.pipe(print());
});

gulp.task('del-doc', function () {
	return del('doc');
});

gulp.task('doc', () =>
{
	// generate js docs

	// generate aframe docs

	// compile readme template to doc/index.html

	// do version replace on doc/**/*.html

	// copy readme template to readme.md, do version replace
});
