/**
 * Notes on gulp that were compiled during hte development of this build script can be found here:
 * https://docs.google.com/document/d/1ikgmMnOGGbyTu9ggs7NSDByLrXCfX6Ll0F0JbT1CwZ0/edit?usp=sharing
 **/

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    print = require('gulp-print'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    merge = require('merge-stream'),
    orderedMerge = require('ordered-merge-stream'),
    replace = require('gulp-replace'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    return gulp.start('altspace_js');
});

gulp.task('watch', ['altspace_js'], function () {
    gulp.watch('./version.json', ['altspace_js']);
    gulp.watch('./src/**/*.js', ['altspace_js']);
    gulp.watch('./lib/**/*.js', ['altspace_js']);
});

gulp.task('altspace_js', function () {
    var cwd = './';
    var version = JSON.parse(fs.readFileSync(cwd + '/package.json')).version;
    console.log('version');
    console.log(version);

    return orderedMerge([
    gulp.src([
            './lib/Please.js',//TODO: Put these elsewhere because of window clobbering, esp url.js
            './lib/url.js',
            './lib/firebase.js',

            './src/shim-core.js',

            './src/utilities/sync.js',
            './src/utilities/codepen.js',
            './src/utilities/simulation.js',

            './src/utilities/shims/behaviors.js',
            './src/utilities/shims/cursor.js',
            './src/utilities/shims/bubbling.js',

            './src/utilities/behaviors/Bob.js',
            './src/utilities/behaviors/ButtonStateStyle.js',
            './src/utilities/behaviors/Drag.js',
            './src/utilities/behaviors/Spin.js',
            './src/utilities/behaviors/SceneSync.js',
            './src/utilities/behaviors/Object3DSync.js',
    ], { cwd: cwd }),
    gulp.src(
        './src/version.js', { cwd: cwd })
            .pipe(replace("VERSION", "'" + version + "'"))
    ])
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('altspace.min.js'))
        .pipe(uglify())
        .on('error', function (e) {
            console.log(e);
        })
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./bin/latest', { cwd: cwd }))
        .pipe(gulp.dest('./bin/' + version + '/', { cwd: cwd }))
        .pipe(print());
});