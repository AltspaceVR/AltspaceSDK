/**
 * Notes on gulp that were compiled during the development of this build script can be found here:
 * https://docs.google.com/document/d/1ikgmMnOGGbyTu9ggs7NSDByLrXCfX6Ll0F0JbT1CwZ0/edit?usp=sharing
 **/

const gulp = require('gulp'),
	awspublish = require('gulp-awspublish'),
	release = require('conventional-github-releaser'),
	runsequence = require('run-sequence'),

	awsRegion = 'us-west-1',
	awsAccessKey = 'AKIAJEGF6GH26BCU7VYA',
	s3Path = '/libs/altspace.js',
	targetRemote = 'origin';

// require other file
const build = require('./build');

var version;

// ### Publish tasks ###

gulp.task('release', function (done) {
	release({ type: 'oauth', token: process.env.githubtoken }, done);
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
