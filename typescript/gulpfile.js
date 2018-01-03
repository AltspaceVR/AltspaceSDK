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
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var bundle = function(bundler) {
    bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('Main.class.ts'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write())
        .pipe(rename('index.js'))
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
            <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js"></script>
            <script src="https://sdk.altvr.com/libs/altspace.js/2.6.1/altspace.js"></script>
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