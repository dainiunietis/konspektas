
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();

var browserSync  = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');

/////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['site-sync:watch']);
// gulp.task('default', ['sass-main:watch']);

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  visų tinklapio failų generavimas-watch'inimas ir browser-sync
//
/////////////////////////////////////////////////////////////////////////////////////////

// gulp.task('site-sync:watch', ['browserSync','sass-main-sync','sass-pvz-sync'], function() {
gulp.task('site-sync:watch', ['browserSync'], function() {
  gulp.watch(sassMainPath_srcWatch, ['sass-main-sync']);
  gulp.watch(sassPvzPath_src, ['sass-pvz-sync']);
  gulp.watch(sassTestPath_src, ['sass-test-sync']);
  gulp.watch(sassMokyklaPath_src, ['sass-mokykla-sync']);
  gulp.watch(["site/*.html", "site/*.htm"]).on('change', browserSync.reload);
});

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  proccess'ina assets/sass/*.scss failus — iškviečiame per CMD:
//  > gulp sass-main            <<< kai norime vienkartinio SASS'o failų sugeneravimo
//  > gulp sass-main:watch      <<< kai norime SASS'o failų watch'inimo ir generavimo kai yra pasikeitimų
//
////////////////////////////////////////////////////////////////////////////////////////

var sassMainPath_src      = ['site/assets/sass/*.scss','!site/assets/sass/*--*.scss'];
var sassMainPath_srcWatch = [...sassMainPath_src, '../libs/frontend/site/assets/sass/*.scss', '!../libs/frontend/site/assets/sass/*--*.scss'];
var sassMainPath_dest     =  'site/assets/sass.css';

gulp.task('sass-main:watch', ['sass-main'], function() {
  gulp.watch(sassMainPath_srcWatch, ['sass-main']);
});

gulp.task('sass-main', taskBody_sassMain);

/////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass-main-sync:watch', ['browserSync','sass-main-sync'], function() {
  gulp.watch(sassMainPath_srcWatch, ['sass-main-sync']);
});

gulp.task('sass-main-sync', function() {
  taskBody_sassMain()
  .pipe(browserSync.stream());
});

/////////////////////////////////////////////////////////////////////////////////////////////

function taskBody_sassMain() {
  return gulp.src(sassMainPath_src)
    .pipe($.plumber({ errorHandler: function (error) { console.log(error.message); this.emit('end'); }}))
    //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
    .pipe($.sourcemaps.init())
      //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // outputStyle: nested, expanded, compact, compressed
      .pipe($.sass({outputStyle: 'compact'}))
      //––– stripCssComments –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // preserve: true - Preserve important comments /*! */.
      // preserve: false - Strip all comments.
      // .pipe($.stripCssComments({preserve: false}))
      //––– postcss plūgai –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // .pipe($.postcss([autoprefixer, cssnano({discardComments: {removeAll: true}})]))
      // .pipe($.postcss([autoprefixer, cssnano]))
      .pipe($.postcss([autoprefixer]))
    //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe($.sourcemaps.write())
    //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe(gulp.dest(sassMainPath_dest));
}

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  assets/sass.pvz/
//
/////////////////////////////////////////////////////////////////////////////////////////

var sassPvzPath_src   = ['site/assets/sass.pvz/*.scss','!site/assets/sass.pvz/*--*.scss'];
var sassPvzPath_dest  =  'site/assets/sass.pvz.css';

gulp.task('sass-pvz-sync', function() {
  return gulp.src(sassPvzPath_src)
    .pipe($.plumber({ errorHandler: function (error) { console.log(error.message); this.emit('end'); }}))
    //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
    .pipe($.sourcemaps.init())
    //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // outputStyle: nested, expanded, compact, compressed
    .pipe($.sass({outputStyle: 'compact'}))
    //––– stripCssComments –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // preserve: true - Preserve important comments /*! */.
    // preserve: false - Strip all comments.
    // .pipe($.stripCssComments({preserve: false}))
    //––– postcss plūgai –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // .pipe($.postcss([autoprefixer, cssnano({discardComments: {removeAll: true}})]))
    // .pipe($.postcss([autoprefixer, cssnano]))
    .pipe($.postcss([autoprefixer]))
    //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe($.sourcemaps.write())
    //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe(gulp.dest(sassPvzPath_dest))
    .pipe(browserSync.stream());
});

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  assets/sass.test/
//
/////////////////////////////////////////////////////////////////////////////////////////

var sassTestPath_src   = ['site/assets/sass.test/*.scss','!site/assets/sass.test/*--*.scss'];
var sassTestPath_dest  =  'site/assets/sass.test.css';

gulp.task('sass-test-sync', function() {
  return gulp.src(sassTestPath_src)
    .pipe($.plumber({ errorHandler: function (error) { console.log(error.message); this.emit('end'); }}))
    //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
    .pipe($.sourcemaps.init())
    //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // outputStyle: nested, expanded, compact, compressed
    .pipe($.sass({outputStyle: 'compact'}))
    //––– stripCssComments –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // preserve: true - Preserve important comments /*! */.
    // preserve: false - Strip all comments.
    // .pipe($.stripCssComments({preserve: false}))
    //––– postcss plūgai –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // .pipe($.postcss([autoprefixer, cssnano({discardComments: {removeAll: true}})]))
    // .pipe($.postcss([autoprefixer, cssnano]))
    .pipe($.postcss([autoprefixer]))
    //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe($.sourcemaps.write())
    //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe(gulp.dest(sassTestPath_dest))
    .pipe(browserSync.stream());
});

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  assets/sass.mokykla/
//
/////////////////////////////////////////////////////////////////////////////////////////

var sassMokyklaPath_src   = ['site/assets/sass.mokykla/*.scss','!site/assets/sass.mokykla/*--*.scss'];
var sassMokyklaPath_dest  =  'site/assets/sass.mokykla.css';

gulp.task('sass-mokykla-sync', function() {
  return gulp.src(sassMokyklaPath_src)
    .pipe($.plumber({ errorHandler: function (error) { console.log(error.message); this.emit('end'); }}))
    //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
    .pipe($.sourcemaps.init())
    //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // outputStyle: nested, expanded, compact, compressed
    .pipe($.sass({outputStyle: 'compact'}))
    //––– stripCssComments –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // preserve: true - Preserve important comments /*! */.
    // preserve: false - Strip all comments.
    // .pipe($.stripCssComments({preserve: false}))
    //––– postcss plūgai –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // .pipe($.postcss([autoprefixer, cssnano({discardComments: {removeAll: true}})]))
    // .pipe($.postcss([autoprefixer, cssnano]))
    .pipe($.postcss([autoprefixer]))
    //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe($.sourcemaps.write())
    //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe(gulp.dest(sassMokyklaPath_dest))
    .pipe(browserSync.stream());
});

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  browser-sync
//
/////////////////////////////////////////////////////////////////////////////////////////

gulp.task('browserSync', function() {
  browserSync.init({
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // browserSync'as sukuria savo serverį
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // server: {
    //   baseDir: 'site',
    //   directory: true    // Serve files from the app directory with directory listing
    // },
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // nukreipimas į esantį serverį
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // proxy: "http://konspektas.local",
    // port: 3010,
    // ui: { port: 3011 }
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    open: 'external',
    host: 'konspektas.local',
    proxy: "konspektas.local",
    port: 8080
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  });
  // browserSync.init({
  //   server: "./site"
  // });
});



