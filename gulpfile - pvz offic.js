
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Write inline source maps
// Inline source maps are embedded in the source file.
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Handle source files from different directories
// Use the base option on gulp.src to make sure all files are relative to a common base directory.
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
  gulp.src(['src/test.js', 'src/testdir/test2.js'], { base: 'src' })
  .pipe(sourcemaps.init())
  .pipe(plugin1())
  .pipe(plugin2())
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('dist'));
});

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// https://github.com/understrap/understrap/issues/268
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('sass', function () {
  var stream = gulp.src('./sass/*.scss')
    .pipe(plumber())
  .pipe(sourcemaps.init()) // add this
    .pipe(sass())
  .pipe(sourcemaps.write('./')) // add this
      .pipe(gulp.dest('./css'))
      .pipe(rename('custom-editor-style.css'))
      .pipe(gulp.dest('./css'));
  return stream;
});




