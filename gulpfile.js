'use strict';

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

var gulp = require('gulp');
var fs = require('fs');
var del = require('del');

/**
 *  This will load all js files in the gulp-tasks directory
 */
fs.readdirSync('gulp-tasks').forEach(function(file) {
  require('./gulp-tasks/' + file);
});

gulp.task('clean', function() {
  return del(['coverage', '.tmp', 'dist']);
});

gulp.task('default', gulp.series('clean', gulp.parallel(['server:default', 'client:default'])));
gulp.task('test', gulp.parallel(['server:test']));
gulp.task('dist', gulp.series('clean', gulp.parallel(['server:dist', 'client:dist'])));
