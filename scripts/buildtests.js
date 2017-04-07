const gulp = require('gulp'),
	rollup = require('rollup'),
	buble = require('rollup-plugin-buble');

gulp.task('default', () =>
{
	return rollup.rollup({
		entry: '../tests/src/index.js',
		plugins: [buble()]
	}).then(function (bundle) {
		bundle.write({
			dest: '../tests/bundle.js'
		});
	});
});

