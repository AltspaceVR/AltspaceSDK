/**
 * Based on https://gist.github.com/danharper/3ca2273125f500429945 but upgraded to add tsify
 */
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var tsify = require("tsify");
var watchify = require('watchify');
var babel = require('babelify');
var concat = require("gulp-concat");
var addsrc = require("gulp-add-src");
var browserSync = require('browser-sync').create();
var bundle = function(bundler) {
    bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('Main.class.ts'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write())
        .pipe(addsrc(['./node_modules/three/build/three.min.js','../dist/altspace.js']))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream({once: true}));
};

var compile = function(shouldWatch){
    var bundler = watchify(browserify('./src/Main.class.ts', { debug: true }).plugin(tsify, { target: 'es2015'  }).transform(babel, {
        presets: ['es2015'],
        extensions: ['.ts']
    }), { poll: true });
    if (shouldWatch) {
        bundler.on('update', function() {
            bundle(bundler);
        });
    }
    bundle(bundler);
};
var compileIndex = function(){
    require('fs').writeFileSync('dist/index.html', `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Example</title>
            <script src="index.js"></script>
        </head>
        <body>
        
        </body>
        </html>
    `);
};
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() {   return compile(true); });
gulp.task('index', function() {   return compileIndex(); });

gulp.task('default', ['watch','browser-sync','index']);