
gulp.src(['src/**/*.js'])
  .pipe(sourcemaps.init())
  .pipe(babel())
  // Remove relativeSourcemapsSource used for sourcemaps 1
  //.pipe(relativeSourcemapsSource({ dest: 'dist' }))
  .pipe(sourcemaps.write('.', {
    includeContent: false,
    // Change '.' used with relativeSourcemapsSource to '../src';
    // sourcemaps 2 will make paths of dist/**/*.js relative to
    // the directory you get from dist to - to src
    sourceRoot: '../src'
  }))
  .pipe(gulp.dest('dist'));

