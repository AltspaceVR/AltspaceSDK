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

    jsdoc = require('gulp-jsdoc'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),

    awspublish = require('gulp-awspublish'),
    bump = require('gulp-bump'),
    git = require('gulp-git'),
    prompt = require('gulp-prompt'),
    release = require('conventional-github-releaser'),
    runsequence = require('run-sequence'),
    shell = require('gulp-shell'),
    aws = require('aws-sdk');

var awsRegion = 'us-west-1';
var awsAccessKey = 'AKIAJEGF6GH26BCU7VYA';
var s3Path = '/test/altspace.js';
var targetRemote = 'origin';

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
            './src/utilities/multiloader.js',

            './src/utilities/shims/behaviors.js',
            './src/utilities/shims/cursor.js',
            './src/utilities/shims/bubbling.js',

            './src/utilities/behaviors/Bob.js',
            './src/utilities/behaviors/ButtonStateStyle.js',
            './src/utilities/behaviors/Drag.js',
            './src/utilities/behaviors/GamepadControls.js',
            './src/utilities/behaviors/HoverColor.js',
            './src/utilities/behaviors/Object3DSync.js',
            './src/utilities/behaviors/SceneSync.js',
            './src/utilities/behaviors/Spin.js',
            //'./src/utilities/behaviors/Grab.js',
            './src/utilities/behaviors/TouchpadRotate.js'
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

gulp.task('publish-precheck', function (done) {
    var checkEnv = function (varName) {
        if (!process.env[varName]) {
            var message = varName + ' environment variable required.';
            throw new Error(message);
        }
    };

    git.fetch(targetRemote, '', function (err) {
        if (err) { done(err); return; }
        git.status(function (err, stdout) {
            if (err) { done(err); }
            if (stdout.indexOf('On branch master') === -1) {
                done('Must publish from master.'); return;
            }
            if (stdout.indexOf("up-to-date with '" + targetRemote + "/master'") === -1) {
                done('Branch or remote is out of date.'); return;
            }
            if (stdout.indexOf('Changes') !== -1) {
                done('Commit or discard all changes before you publish.'); return;
            }
            checkEnv('githubtoken');
            // checkEnv('awssecretkey');
            done();
        });
    });
});
gulp.task('bump', function () {
    var argv = require('yargs')
        .option('bump', {
            choices: ['major', 'minor', 'patch'],
            default: 'patch'})
        .argv;
    return gulp.src('package.json')
        .pipe(prompt.confirm('Are you sure you want to publish a new version?'))
        .pipe(bump({type: argv.bump}))
        .pipe(gulp.dest('.'))
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
gulp.task('push-tags', function (done) {
    git.push(targetRemote , 'master', {args: '--tags'}, done);
});
gulp.task('push-master', function (done) {
    git.push(targetRemote , 'master', done);
});
gulp.task('push-gh-pages', function (done) {
    git.push(targetRemote , 'master:gh-pages', {args: '-f'}, done);
});
gulp.task('release', function (done) {
    release({type: 'oauth', token: process.env.githubtoken}, {preset: 'jquery'}, done);
});
gulp.task('publish-npm', function (done) {
    var task = shell.task('npm publish', {verbose: true})
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
        params: {Bucket: 'sdk.altvr.com'}
    });
    var getFiles = function (versionDir) {
        return gulp.src('dist/**')
            .pipe(rename(function (path) {
                if (path.dirname === '.') { path.dirname = ''; }
                path.dirname = s3Path + '/' + versionDir + '/' + path.dirname;
            }));
    };
    return merge(getFiles('latest'), getFiles(version))
        .pipe(publisher.publish())
        .pipe(awspublish.reporter());
});
gulp.task('invalidate-aws', function (done) {
    var cloudfront = new aws.CloudFront({
        region: awsRegion,
        accessKeyId: awsAccessKey,
        secretAccessKey: process.env.awssecretkey
    });
    cloudfront.createInvalidation({
        DistributionId: 'E2PD2TV7TP1TIP',
        InvalidationBatch: {
            CallerReference: version,
            Paths: {
                Quantity: 1, 
                Items: [
                    s3Path + '/latest*'
                ]
            }
        }
    }, done);
});
gulp.task('publish', function (done) {
    runsequence(
        'publish-precheck',
        // 'bump',
        // 'altspace_js',
        // 'doc',
        // 'add',
        // 'commit',
        // 'tag',
        // 'push-master',
        // 'push-tags',
        // 'push-gh-pages',
        // 'release',
        // 'publish-npm',
        // 'publish-aws',
        // 'invalidate-aws',
        done);
});
