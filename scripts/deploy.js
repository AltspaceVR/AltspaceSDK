/**
 * Notes on gulp that were compiled during the development of this build script can be found here:
 * https://docs.google.com/document/d/1ikgmMnOGGbyTu9ggs7NSDByLrXCfX6Ll0F0JbT1CwZ0/edit?usp=sharing
 **/

const gulp = require('gulp'),

	yargs = require('yargs'),
	fs = require('fs'),
	path = require('path'),
	rename = require('gulp-rename'),

	awspublish = require('gulp-awspublish'),
	bump = require('gulp-bump'),
	del = require('del'),
	git = require('gulp-git'),
	release = require('conventional-github-releaser'),
	runsequence = require('run-sequence'),
	shell = require('gulp-shell'),
	aws = require('aws-sdk'),

	awsRegion = 'us-west-1',
	awsAccessKey = 'AKIAJEGF6GH26BCU7VYA',
	s3Path = '/libs/altspace.js',
	targetRemote = 'origin';

var version;

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
