'use strict';

const gulp = require('gulp'),
	jsdoc = require('gulp-jsdoc3'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),

	rollup = require('rollup-stream'),
	buble = require('rollup-plugin-buble'),
	r_replace = require('rollup-plugin-replace'),

	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	orderedMerge = require('ordered-merge-stream'),

	libpath = require('path'),
	version = require('../package.json').version;;

function r(...args){
	return libpath.resolve(__dirname, ...args);
}

gulp.task('altspace_js', () =>
{
	return orderedMerge([
		rollup({
			entry: r('../src/index.js'),
			format: 'iife',
			moduleName: 'altspace',
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
			})],
			sourceMap: true
		})
			.pipe(source('altspace.js'))
			.pipe(buffer()),
		gulp.src([
			'firebase.min.js',
			'Please.min.js',
			'url.min.js'
		].map(f => r('../lib', f)))
	])
	.pipe(sourcemaps.init({loadMaps: true})),
	.pipe(concat('altspace.js'))
	.pipe(gulp.dest(r('../dist')));
});
