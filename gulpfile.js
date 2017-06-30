const gulp = require('gulp');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const utilities = require('gulp-util');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
let buildProduction = utilities.env.production;


gulp.task('concatInterface', () => {
  return gulp.src(['js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('browserify', ['concatInterface'], () => {
  return browserify({entries: ['./tmp/allConcat.js']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['browserify'], () => {
  return gulp.src('./build/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bowerJS', () => {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bowerCSS', () => {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['bowerJS', 'bowerCSS']);


gulp.task('build', ['clean'], () => {
  if (buildProduction) {
    gulp.start('minifyScripts')
  } else {
    gulp.start('browserify');
  }
  gulp.start('bower');
  gulp.start('cssBuild');
});

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
  gulp.watch('js/*.js', ['jsBuild']);
  gulp.watch('sass/*.sass', ['cssBuild']);
  gulp.watch('*.html', ['htmlBuild']);
  gulp.watch('bower.json', ['bowerBuild']);
});

gulp.task('htmlBuild', () => browserSync.reload());

gulp.task('bowerBuild', ['bower'], () => browserSync.reload());

gulp.task('jsBuild', ['browserify', 'jshint'], () => browserSync.reload());

gulp.task('cssBuild', () => {
  return gulp.src('sass/*.sass')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
});

gulp.task('jshint', () => {
  return gulp.src(['js/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('clean', () => del(['build', 'tmp']));
