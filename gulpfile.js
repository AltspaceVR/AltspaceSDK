var path = require('path'),
	gulp = require('gulp'),
	jsdoc = require('gulp-jsdoc');

var docfiles = [
	'utilities/**/*.js',
	'README.md'
];

gulp.task('watch', ['doc'], function () {
	return gulp.watch(docfiles, {verbose: true}, ['doc']);
});

gulp.task('doc', function () {
	return gulp.src(docfiles)
		.pipe(jsdoc('./doc', {
			path: path.resolve('node_modules/minami')
		}));
});
