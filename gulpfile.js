/**
 * Notes on gulp that were compiled during the development of this build script can be found here:
 * https://docs.google.com/document/d/1ikgmMnOGGbyTu9ggs7NSDByLrXCfX6Ll0F0JbT1CwZ0/edit?usp=sharing
 **/

var gulp = require('gulp'),

	yargs = require('yargs'),
	fs = require('fs'),
	path = require('path'),

	print = require('gulp-print'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	babel = require('gulp-babel'),

	vsource = require('vinyl-source-stream'),
	vbuffer = require('vinyl-buffer'),
	browserify = require('browserify'),

	uglify = require('gulp-uglify'),
	merge = require('merge-stream'),
	orderedMerge = require('ordered-merge-stream'),
	replace = require('gulp-replace'),
	wrapUmd = require('gulp-wrap-umd'),

	jsdoc = require('gulp-jsdoc3'),
	jshint = require('gulp-jshint'),
	sourcemaps = require('gulp-sourcemaps'),

	awspublish = require('gulp-awspublish'),
	bump = require('gulp-bump'),
	del = require('del'),
	git = require('gulp-git'),
	prompt = require('gulp-prompt'),
	release = require('conventional-github-releaser'),
	runsequence = require('run-sequence'),
	shell = require('gulp-shell'),
	aws = require('aws-sdk');

var awsRegion = 'us-west-1';
var awsAccessKey = 'AKIAJEGF6GH26BCU7VYA';
var s3Path = '/libs/altspace.js';
var targetRemote = 'origin';

var version;

var docfiles = [
	'src/utilities/**/*.js',
	'!src/utilities/**/*.es6.js',
	'README.md'
];

gulp.task('transpile_es6', function () {
	return gulp.src([
		'./**/*.es6.js'
	])
		.pipe(babel({ optional: ['runtime'] }))
		.pipe(rename(function (es6Path) {
			es6Path.basename = es6Path.basename.replace('.es6', '');
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('altspace_js', ['transpile_es6'], function () {
	var cwd = './';
	version = JSON.parse(fs.readFileSync(cwd + '/package.json')).version;
	console.log('version', version);

	browserify(
		'./examples/living-room/living-room.js'
	)
		.bundle()
		.pipe(vsource('living-room-main.js'))
		.pipe(vbuffer())
		.pipe(gulp.dest('./examples/living-room/'));

	return orderedMerge([
		browserify(
			'./src/utilities/shims/OBJMTLLoader.js'
		)
			.bundle()
			.pipe(vsource('OBJMTLLoader.js'))
			.pipe(vbuffer()),
		browserify(
			'./src/utilities/behaviors/Object3DSync.js'
		)
			.bundle()
			.pipe(vsource('Object3DSync.js'))
			.pipe(vbuffer()),
		gulp.src([
			'./lib/Please.js', // TODO: Put these elsewhere because of window clobbering, esp url.js
			'./lib/url.js',
			'./lib/firebase.js',

			'./src/shim-core.js',

			'./src/utilities/sync.js',
			'./src/utilities/codepen.js',
			'./src/utilities/simulation.js',
			'./src/utilities/multiloader.js',

			'./src/utilities/shims/behaviors.js',
			'./src/utilities/shims/cursor.js',
			'./src/utilities/shims/bubbling.js',

			'./src/utilities/behaviors/Bob.js',
			'./src/utilities/behaviors/ButtonStateStyle.js',
			'./src/utilities/behaviors/Drag.js',
			'./src/utilities/behaviors/GamepadControls.js',
			'./src/utilities/behaviors/HoverColor.js',
			'./src/utilities/behaviors/HoverScale.js',
			'./src/utilities/behaviors/JointCollisionEvents.js',
			'./src/utilities/behaviors/SceneSync.js',
			'./src/utilities/behaviors/Spin.js',
			'./src/utilities/behaviors/TouchpadRotate.js'
		], { cwd: cwd }),
		browserify(
			'./src/utilities/behaviors/Layout.js'
		)
			.bundle()
			.pipe(vsource('Layout.js'))
			.pipe(vbuffer()),
		browserify(
			'./src/utilities/behaviors/SteamVRInput.js'
		)
			.bundle()
			.pipe(vsource('SteamVRInput.js'))
			.pipe(vbuffer()),
		browserify(
			'./src/utilities/behaviors/SteamVRTrackedObject.js'
		)
			.bundle()
			.pipe(vsource('SteamVRTrackedObject.js'))
			.pipe(vbuffer()),
		gulp.src(
			'./src/version.js', { cwd: cwd })
			.pipe(replace('VERSION', "'" + version + "'"))
	])
		.pipe(concat('altspace.js'))
		.pipe(wrapUmd({
			namespace: 'altspace',
			deps: [
				{ name: 'three', globalName: 'THREE', paramName: 'THREE' }
			],
			exports: 'altspace'
		}))
		.pipe(gulp.dest('./dist/', { cwd: cwd }))
		.pipe(sourcemaps.init())
		.pipe(concat('altspace.min.js'))
		.pipe(uglify())
		.on('error', function (e) {
			console.log(e);
		})
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/', { cwd: cwd }))
		.pipe(print());
});

// ### Publish tasks ###

gulp.task('publish-precheck', function (done) {
	var checkEnv = function (varName) {
		if (!process.env[varName]) {
			var message = varName + ' environment variable required.';
			done(message);
			return false;
		}
		return true;
	};

	git.fetch(targetRemote, '', function (err) {
		if (err) { done(err); return; }
		git.status(function (statusErr, stdout) {
			if (statusErr) { done(statusErr); return; }
			if (stdout.indexOf('On branch master') === -1) {
				done('Must publish from master.'); return;
			}
			if (stdout.indexOf("up-to-date with '" + targetRemote + "/master'") === -1) {
				done('Branch or remote is out of date.'); return;
			}
			if (stdout.indexOf('Changes') !== -1) {
				done('Commit or discard all changes before you publish.'); return;
			}
			if (!checkEnv('githubtoken')) { return; }
			if (!checkEnv('awssecretkey')) { return; }
			done();
		});
	});
});
gulp.task('bump', function () {
	var argv = require('yargs')
		.option('bump', {
			choices: ['major', 'minor', 'patch'],
			default: 'patch' })
		.argv;
	return gulp.src('package.json')
		.pipe(bump({ type: argv.bump }))
		.pipe(gulp.dest('.'));
});
gulp.task('bump-readme', function (done) {
	version = JSON.parse(fs.readFileSync('./package.json')).version;
	del('README.md').then(function () {
		gulp.src('README.md.template')
			.pipe(replace('VERSION', version))
			.pipe(rename('README.md'))
			.pipe(gulp.dest('.'))
			.on('end', done);
	});
});
gulp.task('add', function () {
	return gulp.src('.').pipe(git.add());
});
gulp.task('commit', function () {
	version = JSON.parse(fs.readFileSync('./package.json')).version;
	return gulp.src('.').pipe(git.commit('Bump release v' + version));
});
gulp.task('tag', function (done) {
	git.tag('v' + version, 'Release v' + version, done);
});
gulp.task('push-tag', function (done) {
	git.push(targetRemote, 'master', { args: 'v' + version }, done);
});
gulp.task('push-master', function (done) {
	git.push(targetRemote, 'master', done);
});
gulp.task('push-gh-pages', function (done) {
	git.push(targetRemote, 'master:gh-pages', { args: '-f' }, done);
});
gulp.task('release', function (done) {
	release({ type: 'oauth', token: process.env.githubtoken }, done);
});
gulp.task('publish-npm', function (done) {
	var task = shell.task('npm publish', { verbose: true });
	task(function (error) {
		if (error) {
			console.error(error.message, error.stderr);
		}
		done(error);
	});
});
gulp.task('publish-aws', function () {
	var publisher = awspublish.create({
		region: awsRegion,
		accessKeyId: awsAccessKey,
		secretAccessKey: process.env.awssecretkey,
		params: { Bucket: 'sdk.altvr.com' }
	});
	return gulp.src('dist/**')
		.pipe(rename(function (distPath) {
			if (distPath.dirname === '.') { distPath.dirname = ''; }
			distPath.dirname = s3Path + '/' + version + '/' + distPath.dirname;
		}))
		.pipe(publisher.publish())
		.pipe(awspublish.reporter());
});

// ### Main tasks ###

gulp.task('default', function () {
	return gulp.start('altspace_js');
});

gulp.task('del-doc', function () {
	return del('doc');
});

gulp.task('doc', ['altspace_js', 'bump-readme'], function (done) {
	var argv = yargs.option(
		'clientjs',
		{
			describe: 'Path to the directory containing altspace-client.js',
			demand: false
		}
	).argv;

	if (!argv.clientjs) {
		argv.clientjs = '../UnityClient/js/src';
	}

	docfiles.push(argv.clientjs + '/*.js');
	docfiles.push(argv.clientjs + '/apis/*.js');
	gulp.src(docfiles)
		.pipe(jsdoc({
			opts: {
				destination: './doc',
				template: './node_modules/minami'
			},
			plugins: ['plugins/markdown'],
			templates: {
				default: {
					outputSourceFiles: false,
					layoutFile: './node_modules/minami/tmpl/layout.tmpl'
				}
			}
		}, done));
});

gulp.task('watch', ['altspace_js', 'doc'], function () {
	gulp.watch('./version.json', ['altspace_js']);
	gulp.watch('./examples/**/*.js', ['altspace_js']);
	gulp.watch('./src/**/*.js', ['altspace_js']);
	gulp.watch('./lib/**/*.js', ['altspace_js']);
	gulp.watch('./tests/**/*.js', ['altspace_js']);
	gulp.watch(docfiles, { verbose: true }, ['doc']);
});

gulp.task('publish', function (done) {
	runsequence(
		'publish-precheck',
		'bump',
		'bump-readme',
		'altspace_js',
		'del-doc',
		'doc',
		'add',
		'commit',
		'tag',
		'push-master',
		'push-tag',
		'push-gh-pages',
		'release',
		'publish-npm',
		'publish-aws',
		done);
});
