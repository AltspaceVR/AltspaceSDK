var
	fs = require('fs'),
	gulp = require('gulp'),
	del = require('del'),
	merge = require('merge-stream'),
	webpackStream = require('webpack-stream'),
	replace = require('gulp-replace');

function versionAndPack(filename, webpackPlugins) {
	return gulp.src('./src/index.js')
		.pipe(webpackStream({
			output: {
				filename: filename
			},
			plugins: webpackPlugins,
			devtool: 'inline-source-map'
		}))
		.pipe(replace('AFRAME_ALTSPACE_VERSION', version))
		.pipe(gulp.dest('./dist/'));
}

gulp.task('clean:dist', function () {
	return del(['./dist/*.js']);
});
gulp.task('dist', ['clean:dist'], function () {
	version = JSON.parse(fs.readFileSync('./package.json')).version;
	console.log('version', version);
	return merge(
		versionAndPack('aframe-altspace-component.js'),
		versionAndPack(
			'aframe-altspace-component.min.js',
			[
				new webpackStream.webpack.optimize.UglifyJsPlugin(),
				new webpackStream.webpack.optimize.OccurrenceOrderPlugin()
			]
		)
	);
});
