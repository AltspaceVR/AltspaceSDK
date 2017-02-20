'use strict';

const gulp = require('gulp'),
	jsdoc = require('gulp-jsdoc3'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	print = require('gulp-print'),
	g_replace = require('gulp-replace'),
	rename = require('gulp-rename'),
	markdown = require('gulp-markdown'),

	rollup = require('rollup-stream'),
	buble = require('rollup-plugin-buble'),
	r_replace = require('rollup-plugin-replace'),

	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	orderedMerge = require('ordered-merge-stream'),
	merge = require('merge-stream'),

	libpath = require('path'),
	del = require('del'),
	version = require('../package.json').version;;

function r(...args){
	return libpath.resolve(__dirname, ...args);
}

const build_configs = {
	rollup: {
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
	}
};

gulp.task('altspace_js', () =>
{
	// pack the various es2015 modules into a transpiled iife
	return orderedMerge([
		rollup(build_configs.rollup)
			.pipe(source('altspace.js'))
			.pipe(buffer()),

		// tack our dependencies onto the end
		gulp.src([
			'../lib/firebase.min.js',
			'../lib/Please.min.js',
			'../lib/url.min.js'
		])
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
	return del(r('../doc'), {force: true});
});

gulp.task('doc', done =>
{
	function JSDocPromise(files, config){
		return new Promise((resolve, reject) => {
			gulp.src(files).pipe(jsdoc(config, resolve));
		});
	}

	// jsdoc doesn't like not being last in line, promises are the workaround
	Promise.all([
		JSDocPromise(['../src/**/*.js', '!../src/components/*.js'], build_configs.jsdoc_js),
		JSDocPromise(['../src/components/*.js'], build_configs.jsdoc_aframe)
	]).then(() => {
		merge(
			// compile readme template to doc/index.html
			gulp.src('../README.template.md')
				.pipe(markdown())
				.pipe(rename('index.html'))
				.pipe(gulp.dest('../doc/'))

				// do version replace on doc/**/*.html
				.pipe(gulp.src('../doc/**/*.html'))
				.pipe(g_replace('{{SDK_VERSION}}', version))
				.pipe(gulp.dest('../doc/')),

			// generate readme from template
			gulp.src('../README.template.md')
				.pipe(g_replace('{{SDK_VERSION}}', version))
				.pipe(rename('README.md'))
				.pipe(gulp.dest('../'))
		).on('end', done);
	});
});
