var browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    supertest = require('supertest'),
    tsify = require('tsify'),
    paths = {
        pages: ['src/*.html']
    };

gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('src'));
});

gulp.task('browserify', ['copyHtml'], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/app.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform("babelify")
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src'));
});

gulp.task('default', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function(){
    console.log('restarting');
  });
});

gulp.task('test', function(){
  env({vars: {ENV:'Test'}});
  gulp.src('tests/*.js', {read: false})
      .pipe(gulpMocha({reporter: 'nyan'}))
});
