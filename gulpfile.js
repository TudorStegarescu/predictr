var browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
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

    input  = {
      'javascript': ['./node_modules/angular/angular.js',
                     './bower_components/firebase/firebase.js',
                     './node_modules/angular-ui-router/release/angular-ui-router.min.js',
                     './node_modules/angularfire/dist/angularfire.min.js',
                     './node_modules/angular-animate/angular-animate.min.js',
                     './node_modules/angular-aria/angular-aria.min.js',
                     './node_modules/angular-material/angular-material.min.js',
                     './node_modules/angular-messages/angular-messages.min.js',
                     'src/*.js',
                     'src/**/*.js'],
      'css' : ['./node_modules/angular-material/angular-material.min.css',
               './node_modules/font-awesome/css/font-awesome.css',
               './src/assets/css/app.css'
      ]
    },

    output = {
      'javascript': 'src/'
    };

    gulp.task('clean', function() {
      return del(['coverage', '.tmp', 'dist', 'src/bundle.js']);
    });

    gulp.task('css', function () {
      gulp.src(input.css)
        .pipe(concatCss("styles/bundle.css"))
        .pipe(gulp.dest('src'));
    });

    gulp.task('scripts', function() {
      gulp.src(input.javascript)
          .pipe(concat('./bundle.js'))
          .pipe(gulp.dest('src'))
    });

    gulp.task('watch', function() {
      watch(['src/auth/*.js', 'src/user/*.js'], function () {
        gulp.start('scripts');
      });
    });

    gulp.task('test', function(){
      env({vars: {ENV:'Test'}});
      gulp.src('tests/*.js', {read: false})
      .pipe(gulpMocha({reporter: 'nyan'}))
    });

    gulp.task('default', ['scripts']);
