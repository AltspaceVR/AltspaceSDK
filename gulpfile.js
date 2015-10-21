/**
 * Notes on gulp that were compiled during hte development of this build script can be found here:
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

    jsdoc = require('gulp-jsdoc'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    return gulp.start('altspace_js');
});

var docfiles = [
    'src/utilities/**/*.js',
    '!src/utilities/**/*.es6.js',
    'README.md'
];

gulp.task('watch', ['altspace_js', 'doc'], function () {
    gulp.watch('./version.json', ['altspace_js']);
    gulp.watch('./examples/**/*.js', ['altspace_js']);
    gulp.watch('./src/**/*.js', ['altspace_js']);
    gulp.watch('./lib/**/*.js', ['altspace_js']);
    gulp.watch('./tests/**/*.js', ['altspace_js']);
    gulp.watch(docfiles, {verbose: true}, ['doc']);
});

gulp.task('altspace_js', function () {
    var cwd = './';
    var version = JSON.parse(fs.readFileSync(cwd + '/package.json')).version;
    console.log('version');
    console.log(version);

    gulp.src([
        './**/*.es6.js'
    ])
        .pipe(babel({optional: ['runtime']}))
        .pipe(rename(function (path) {
            path.basename = path.basename.replace('.es6', '');
        }))
        .pipe(gulp.dest('./'));

    browserify(
        './examples/living-room/living-room.js'
    )
        .bundle()
        .pipe(vsource('living-room-main.js'))
        .pipe(vbuffer())
        .pipe(gulp.dest('./examples/living-room/'));

    return orderedMerge([
        gulp.src([
            './lib/Please.js',//TODO: Put these elsewhere because of window clobbering, esp url.js
            './lib/url.js',
            './lib/firebase.js',
            //'./lib/TweenLite.min.js',

            './src/shim-core.js',

            './src/utilities/sync.js',
            './src/utilities/codepen.js',
            './src/utilities/simulation.js',

            './src/utilities/shims/behaviors.js',
            './src/utilities/shims/cursor.js',
            './src/utilities/shims/bubbling.js',

            './src/utilities/behaviors/SceneSync.js',
            './src/utilities/behaviors/Object3DSync.js',
            './src/utilities/behaviors/Bob.js',
            './src/utilities/behaviors/ButtonStateStyle.js',
            './src/utilities/behaviors/Drag.js',
            './src/utilities/behaviors/Spin.js',
        ], { cwd: cwd }),
        browserify(
            './src/utilities/behaviors/Layout.js'
        )
            .bundle()
            .pipe(vsource('Layout.js'))
            .pipe(vbuffer()),
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
        .pipe(gulp.dest('./dist/', { cwd: cwd }))
        //.pipe(gulp.dest('./dist/latest', { cwd: cwd }))
        //.pipe(gulp.dest('./dist/' + version + '/', { cwd: cwd }))
        .pipe(print());
});

gulp.task('doc', ['altspace_js'], function () {
    var argv = yargs.option(
        'clientjs',
        {
            describe: 'Path to the directory containing altspace-client.js',
            demand: true
        }
    ).argv
    if (argv.clientjs) {
        docfiles.push(argv.clientjs + '/*.js');
    }
    return gulp.src(docfiles)
        .pipe(jsdoc('./doc', {
            path: path.resolve('node_modules/minami'),
            default: {
                outputSourceFiles: false
            }
        }, {
            plugins: ['plugins/markdown']
        }));
});
