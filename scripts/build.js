'use strict';

const gulp = require('gulp'),
	jsdoc = require('gulp-jsdoc3'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	print = require('gulp-print'),
	g_replace = require('gulp-replace'),
	rename = require('gulp-rename'),
	markdown = require('gulp-markdown'),
	prepend = require('gulp-insert').prepend,

	rollup = require('rollup-stream'),
	buble = require('rollup-plugin-buble'),
	r_replace = require('rollup-plugin-replace'),
	node_resolve = require('rollup-plugin-node-resolve'),

	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	orderedMerge = require('ordered-merge-stream'),
	merge = require('merge-stream'),

	libpath = require('path'),
	del = require('del'),
	version = require('../package.json').version;

function r(...args){
	return libpath.resolve(__dirname, ...args);
}

const build_configs = {
	rollup: {
		entry: r('../src/index.js'),
		format: 'iife',
		context: 'window',
		external: ['firebase', 'urllib', 'please', 'threejs'],
		globals: {
			firebase: 'Firebase',
			urllib: 'Url',
			please: 'Please',
			threejs: 'THREE'
		},
		plugins: [buble(), node_resolve({jsnext: true, main: true}), r_replace({
			delimiters: ['{{', '}}'],
			values: {
				SDK_VERSION: version
			}
		})]
	},
	jsdoc_js: {
		opts: {
			recurse: true,
			destination: r('../doc/js'),
			readme: r('../src/README.md'),
			template: r('../node_modules/minami')
		},
		plugins: ["plugins/markdown"],
		templates: {
			default: {
				outputSourceFiles: false,
				layoutFile: r('../node_modules/minami/tmpl/layout.tmpl')
			}
		}
	},
	jsdoc_aframe: {
		opts: {
			recurse: true,
			destination: r("../doc/aframe"),
			readme: r("../src/components/README.md"),
			template: r("../node_modules/minami")
		},
		plugins: ["plugins/markdown"],
		templates: {
			default: {
				outputSourceFiles: false,
				layoutFile: r("../node_modules/minami/tmpl/layout.tmpl")
			}
		}
	},
	markdown: {
		gfm: true
	}
};

gulp.task('watch', ['altspace_js', 'doc'], function () {
	gulp.watch('./package.json', ['altspace_js']);
	gulp.watch('./src/**/*.js', ['altspace_js']);
	gulp.watch('./lib/**/*.js', ['altspace_js']);
});

gulp.task('altspace_js', () =>
{
	// pack the various es2015 modules into a transpiled iife
	return orderedMerge([
		// tack our dependencies onto the end
		gulp.src([
			'../lib/firebase.min.js',
			'../lib/Please.min.js',
			'../lib/url.min.js'
		]),

		rollup(build_configs.rollup)
			.pipe(source('altspace.js'))
			.pipe(buffer())
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

/*
* The documentation tasks. Each step in the pipe uses a different concurrency
* management paradigm, so they each have to go into their own subtask. Initial
* attempts to put them in one were unsuccessful.
*/
gulp.task('del-doc', () => {
	return del(r('../doc'), {force: true});
});

gulp.task('jsdoc-js', ['del-doc'], (done) => {
	gulp.src(['../src/**/*.js', '!../src/components/*.js'])
		.pipe(jsdoc(build_configs.jsdoc_js, done));
});

gulp.task('jsdoc-aframe', ['del-doc'], (done) => {
	gulp.src(['../src/components/*.js'])
		.pipe(jsdoc(build_configs.jsdoc_aframe, done));
});

gulp.task('compile-doc-index', ['del-doc'], () => {
	return gulp.src('../README.template.md')
		.pipe(markdown(build_configs.markdown))
		.pipe(prepend('<link rel="stylesheet" href="js/styles/jsdoc-default.css"/>\n'))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('../doc/'));
});

gulp.task('version-docs', ['jsdoc-js','jsdoc-aframe','compile-doc-index'], () => {
	return gulp.src('../doc/**/*.html')
		.pipe(g_replace('{{SDK_VERSION}}', version))
		.pipe(gulp.dest('../doc/'))
});

gulp.task('version-readme', () => {
	return gulp.src('../README.template.md')
		.pipe(g_replace('{{SDK_VERSION}}', version))
		.pipe(rename('README.md'))
		.pipe(gulp.dest('../'))
});

gulp.task('doc', ['version-docs','version-readme']);
