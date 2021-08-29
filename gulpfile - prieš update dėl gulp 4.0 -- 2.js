
/*
// https://codeburst.io/switching-to-gulp-4-0-271ae63530c0

// < gulp@4.0
gulp.task('a', ['b', 'c'], function () {
  // do something
});

// >= gulp@4.0
gulp.task('a', gulp.series(gulp.parallel('b', 'c'), function () {
  // do something
}));

// kad "stop using anonymous functions", kas patartina, nes
// "They print <anonymous> when run and aren’t very useful when viewing task metadata"
gulp.task('a', gulp.series(gulp.parallel('b', 'c'), function a () {
  // do something
}));

// tas pats
var a = function () {
  // do some stuff
};
gulp.task('a', gulp.series(gulp.parallel(b, c), a));
*/

var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();

var browserSync  = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');

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
    //   baseDir: 'docs',
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
  //   server: "./docs"
  // });
});

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  proccess'ina assets/sass/*.scss failus — iškviečiame per CMD:
//  > gulp sass-main            <<< kai norime vienkartinio SASS'o failų sugeneravimo
//  > gulp sass-main:watch      <<< kai norime SASS'o failų watch'inimo ir generavimo kai yra pasikeitimų
//
////////////////////////////////////////////////////////////////////////////////////////

var sassMainPath_src      = ['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss'];
var sassMainPath_srcWatch = [...sassMainPath_src, '../libs/frontend/docs/assets/sass/*.scss', '!../libs/frontend/docs/assets/sass/*--*.scss'];
var sassMainPath_dest     =  'docs/assets/sass.css';

gulp.task('sass-main', taskBody_sassMain);

gulp.task('sass-main:watch', gulp.series('sass-main', function() {
  gulp.watch(sassMainPath_srcWatch, gulp.series('sass-main'));
}));

/////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass-main-sync', gulp.series(function() {
  taskBody_sassMain()
    .pipe(browserSync.stream());
}));

gulp.task('sass-main-sync:watch', gulp.series('browserSync','sass-main-sync', function() {
  gulp.watch(sassMainPath_srcWatch, gulp.series('sass-main-sync'));
}));

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

var sassPvzPath_src   = ['docs/assets/sass.pvz/*.scss','!docs/assets/sass.pvz/*--*.scss'];
var sassPvzPath_dest  =  'docs/assets/sass.pvz.css';

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

var sassTestPath_src   = ['docs/assets/sass.test/*.scss','!docs/assets/sass.test/*--*.scss'];
var sassTestPath_dest  =  'docs/assets/sass.test.css';

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

var sassMokyklaPath_src   = ['docs/assets/sass.mokykla/*.scss','!docs/assets/sass.mokykla/*--*.scss'];
var sassMokyklaPath_dest  =  'docs/assets/sass.mokykla.css';

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
//  # docs-sync:watch — visų tinklapio failų generavimas-watch'inimas ir browser-sync
//
/////////////////////////////////////////////////////////////////////////////////////////

// gulp.task('docs-sync:watch', ['browserSync','sass-main-sync','sass-pvz-sync'], function() {
// gulp.task('docs-sync:watch', gulp.series(gulp.parallel('browserSync')), function() {
gulp.task('docs-sync:watch', gulp.parallel('browserSync', function() {
  gulp.watch(sassMainPath_srcWatch, gulp.series('sass-main-sync'));
  gulp.watch(sassPvzPath_src,       gulp.series('sass-pvz-sync'));
  gulp.watch(sassTestPath_src,      gulp.series('sass-test-sync'));
  gulp.watch(sassMokyklaPath_src,   gulp.series('sass-mokykla-sync'));
  gulp.watch(["docs/*.html", "docs/*.htm"]).on('change', browserSync.reload);
}));

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # default
//
/////////////////////////////////////////////////////////////////////////////////////////

// gulp.task('default', ['sass-main:watch']);
// gulp.task('default', ['docs-sync:watch']);

// gulp.task('default', gulp.series(gulp.parallel('docs-sync:watch')));
gulp.task('default', gulp.series('docs-sync:watch', function() {
  console.log("777 777 777");
}));

// gulp.task('t', gulp.series(function(done) {
//   console.log("777");
//   done();
// }));








