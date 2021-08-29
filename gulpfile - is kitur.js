


gulp.task('css:dev', function () {
  return gulp.src('public/css/core.scss')
      .pipe(sass({sourcemap: true, sourcemapPath: '../scss'}))
      .on('error', function (error) {
          console.error(error);
          this.emit('end');
      })
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(autoprefix({
          browsers: ['last 2 versions']
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('public/build/css/'))
      .pipe(livereload({auto: false}));
});


// D:\webdev\sites.test.preconfigured\web-starter-kit-0.6.5\gulpfile.babel.js

// Compile and automatically prefix stylesheets
// gulp.task('styles', () => {
//   const AUTOPREFIXER_BROWSERS = [
//     'ie >= 10',
//     'ie_mob >= 10',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23',
//     'ios >= 7',
//     'android >= 4.4',
//     'bb >= 10'
//   ];

  // For best performance, don't add Sass partials to `gulp.src`
/*  return gulp.src([
    'app/styles/!**!/!*.scss',
    'app/styles/!**!/!*.css'
  ])
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('.tmp/styles'));
});*/


// D:\webdev\sites.test.preconfigured\web-starter-kit-0.6.5\gulpfile.babel.js
// Watch files for changes & reload
/*
gulp.task('serve', ['scripts', 'styles'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app'],
    port: 3000
  });

gulp.watch(['app/!**!/!*.html'], reload);
gulp.watch(['app/styles/!**!/!*.{scss,css}'], ['styles', reload]);
gulp.watch(['app/scripts/!**!/!*.js'], ['lint', 'scripts', reload]);
gulp.watch(['app/images/!**!/!*'], reload);
});
*/


//============================================================================
// https://browsersync.io/docs/gulp
//============================================================================
// // Static Server + watching scss/html files
// gulp.task('serve', ['sass'], function() {
//   browserSync.init({
//     server: "./site"
//   });
//   gulp.watch("app/scss/*.scss", ['sass']);
//   gulp.watch("app/*.html").on('change', browserSync.reload);
// });
//
// // Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//   return gulp.src("app/scss/*.scss")
//     .pipe(sass())
//     .pipe(gulp.dest("app/css"))
//     .pipe(browserSync.stream());
// });
//============================================================================


// // Static Server + watching scss/html files
// gulp.task('serve', ['sass'], function() {
//   browserSync.init({
//     server: "./site"
//   });
//   gulp.watch("app/scss/*.scss", ['sass']);
//   gulp.watch("app/*.html").on('change', browserSync.reload3);
// });

// // Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//   return gulp.src("app/scss/*.scss")
//     .pipe(sass())
//     .pipe(gulp.dest("app/css7"))
//     .pipe(browserSync.stream());
// });



















