'use strict';

const { series, parallel, watch, src, dest } = require('gulp');

const $               = require('gulp-load-plugins')();
const browserSync     = require('browser-sync').create();
const autoprefixer    = require('autoprefixer');
const cssnano         = require("cssnano");
const discardComments = require("postcss-discard-comments");

$.sass.compiler    = require('node-sass');

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  proccess'ina "assets/sass/*.scss" failus
//  iškviečiame per CMD:
//  > gulp sass ..............vienkartinis SASS'o failų sugeneravimas
//  > gulp sassWatch .........SASS'o failų watch'inimas ir generavimas kai yra pasikeitimų
//  > gulp sassWatchSync .....SASS'o failų watch'inimas ir generavimas, bei browser-sync
//
////////////////////////////////////////////////////////////////////////////////////////

// const sass_src      = ['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss', { base: '..' }];
// const sass_src      = ['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss'];
const sass_src      = ['docs/assets/sass/master.scss'];

// const sass_srcWatch = [...sass_src, '../libs/frontend/docs/assets/sass/*.scss', '!../libs/frontend/docs/assets/sass/*--*.scss'];
const sass_srcWatch = ['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss',
                       '../libs/frontend/docs/assets/sass/*.scss', '!../libs/frontend/docs/assets/sass/*--*.scss'];
const sass_dest     =  'docs/assets/sass';
// const sass_dest     =  'docs/assets/sass.css';




function sass(cb) {
  // Handle source files from different directories
  // Use the base option on gulp.src to make sure all files are relative to a common base directory.
  // gulp.src(['src/test.js', 'src/testdir/test2.js'], { base: 'src' })
  // return src(sass_src, { base: '..' })
  return src(sass_src)
    //–––  –––––––––––––––––
    // .pipe($.plumber({ errorHandler: function (error) { console.log(error.message); this.emit('end'); }}))
    .pipe($.plumber())
    //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
    .pipe($.sourcemaps.init({largeFile: true}))
    // .pipe($.sourcemaps.init())
      //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // The exported identityMap method allows you to generate a full valid source map encoding no changes
      // (slower, only for Javascript and CSS) instead of the default empty source map (no mappings, fast).
      // Use this option if you get missing or incorrect mappings, e.g. when debugging.
      .pipe($.sourcemaps.identityMap())
      //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // outputStyle: nested, expanded, compact, compressed
      .pipe($.sass({
        outputStyle: 'expanded',
        // sourceMapRoot: 'docs/assets/sass'
        // sourceMapRoot: '../sass'
        // includePaths: ['docs/assets/sass']
      }).on('error', $.sass.logError))
      //––– stripCssComments –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // !!! VEIKIA, BET SUGRIAUNA SOURCEMAP'Ą !!!
      // preserve: true - Preserve important comments /*! */.
      // preserve: false - Strip all comments.
      // .pipe($.stripCssComments({preserve: true}))
      //––– postcss plūgai –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      //···································································
      // bandžiau padaryti, kad būtų pritaikytas nurodytas optimisation'as
      // o ne visi, ir nereikalingus išjunginėti, BET NEPAVYKO
      //···································································
      // .pipe($.postcss([cssnano]))
      // .pipe($.postcss([cssnano(
      //   { discardComments: { removeAll: true } }
      // )]))
      // .pipe($.postcss([cssnano({
      //   preset: ['default', {
      //     discardComments: {
      //       // removeAll: true,
      //     }
      //   }]
      // })]))
      //···································································
      .pipe($.postcss([autoprefixer()]))
      // .pipe($.postcss([autoprefixer, cssnano]))
      // .pipe($.postcss([discardComments({ removeAll: true })])) //<<< pašalina ir /*! */
      // .pipe($.postcss([discardComments(), autoprefixer()])) // << atrodo veikia gerai
      //––– sourcemap'ų ... –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      .pipe($.sourcemaps.mapSources(function(sourcePath, file) { return '../sass/' + sourcePath; }))
    //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // .pipe($.sourcemaps.write())
    // .pipe($.sourcemaps.write('../sass.maps'))
    .pipe($.sourcemaps.write('.'))
    // .pipe($.sourcemaps.write('.'))
    //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe(dest(sass_dest));
  cb();
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ne pilnai veikiantis "inline source maps":
//  - SASS'o failų kelius naršyklės dev tool'suose rodo teisingus
//  - bet nėra map'inimo į dev tool'sų workspace lokalius failus
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// function sass(cb) {
//   return src(sass_src)
//     .pipe($.sourcemaps.init())
//       .pipe($.sass({outputStyle: 'compact'}).on('error', $.sass.logError))
//       .pipe($.sourcemaps.mapSources(function(sourcePath, file) { return '../sass/' + sourcePath; }))
//     .pipe($.sourcemaps.write())
//     .pipe(dest(sass_dest));
//   cb();
// }
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function sassWatch(cb) {
  watch(sass_srcWatch, sass);
  cb();
}

function sassSync(cb) {
  sass()
    .pipe(browserSync.stream());
  cb();
}

function sassWatchSync(cb) {
  watch(sass_srcWatch, sassSync);
  cb();
}

exports.sass = sass;
exports.sassWatch = series(sass, sassWatch);
exports.sassWatchSync = series(BrowserSyncInit, sassSync, sassWatchSync);

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # visų tinklapio failų generavimas-watch'inimas ir browser-sync
//
/////////////////////////////////////////////////////////////////////////////////////////

// gulp.task('docs-sync:watch', gulp.parallel('browserSync', function() {
//   gulp.watch(sass_srcWatch, gulp.series('sass-main-sync'));
//   gulp.watch(sassPvzPath_src,       gulp.series('sass-pvz-sync'));
//   gulp.watch(sassTestPath_src,      gulp.series('sass-test-sync'));
//   gulp.watch(sassMokyklaPath_src,   gulp.series('sass-mokykla-sync'));
//   gulp.watch(["docs/*.html", "docs/*.htm"]).on('change', browserSync.reload);
// }));

// function siteWatch(cb) {
//   watch(sass_srcWatch, sassSync);
//
//   // watch(sassPvzPath_src,       gulp.series('sass-pvz-sync'));
//   // watch(sassTestPath_src,      gulp.series('sass-test-sync'));
//   // watch(sassMokyklaPath_src,   gulp.series('sass-mokykla-sync'));
//
//   cb();
// }

function htmlWatchSync(cb) {
  watch(["docs/*.html", "docs/*.htm", "docs/*.php"]).on('change', browserSync.reload);
  cb();
}

const siteWatch = parallel(
  series(sass, sassWatch)
);

const siteWatchSync = series(BrowserSyncInit,
  parallel(
    // series(sassSync, sassWatchSync),
    sassWatchSync,
    // series(sassPvzSync, sassPvzWatchSync),
    htmlWatchSync
  )
);

exports.siteWatch     = siteWatch;
exports.siteWatchSync = siteWatchSync;

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  browser-sync
//
/////////////////////////////////////////////////////////////////////////////////////////

function BrowserSyncInit(cb) {
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
  cb();
};

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # default
//
/////////////////////////////////////////////////////////////////////////////////////////

exports.default = siteWatchSync;


// gulp.task('default', ['sass-main:watch']);
// gulp.task('default', ['docs-sync:watch']);

// // gulp.task('default', gulp.series(gulp.parallel('docs-sync:watch')));
// gulp.task('default', gulp.series('docs-sync:watch', function() {
//   console.log("777 777 777");
// }));

// gulp.task('t', gulp.series(function(done) {
//   console.log("777");
//   done();
// }));







/////////////////////////////////////////////////////////////////////////////////////////////
//
//  assets/sass.pvz/
//
/////////////////////////////////////////////////////////////////////////////////////////

// var sassPvzPath_src   = ['docs/assets/sass.pvz/*.scss','!docs/assets/sass.pvz/*--*.scss'];
// var sassPvzPath_dest  =  'docs/assets/sass.pvz.css';
//
// gulp.task('sass-pvz-sync', function() {
//   return gulp.src(sassPvzPath_src)
//     .pipe($.plumber({ errorHandler: function (error) { console.log(error.message); this.emit('end'); }}))
//     //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
//     .pipe($.sourcemaps.init())
//     //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     // outputStyle: nested, expanded, compact, compressed
//     .pipe($.sass({outputStyle: 'compact'}))
//     //––– stripCssComments –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     // preserve: true - Preserve important comments /*! */.
//     // preserve: false - Strip all comments.
//     // .pipe($.stripCssComments({preserve: false}))
//     //––– postcss plūgai –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     // .pipe($.postcss([autoprefixer, cssnano({discardComments: {removeAll: true}})]))
//     // .pipe($.postcss([autoprefixer, cssnano]))
//     .pipe($.postcss([autoprefixer]))
//     //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     .pipe($.sourcemaps.write())
//     //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     .pipe(gulp.dest(sassPvzPath_dest))
//     .pipe(browserSync.stream());
// });

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  assets/sass.test/
//
/////////////////////////////////////////////////////////////////////////////////////////

// var sassTestPath_src   = ['docs/assets/sass.test/*.scss','!docs/assets/sass.test/*--*.scss'];
// var sassTestPath_dest  =  'docs/assets/sass.test.css';
//
// gulp.task('sass-test-sync', function() {
//   return gulp.src(sassTestPath_src)
//     .pipe($.plumber({ errorHandler: function (error) { console.log(error.message); this.emit('end'); }}))
//     //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
//     .pipe($.sourcemaps.init())
//     //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     // outputStyle: nested, expanded, compact, compressed
//     .pipe($.sass({outputStyle: 'compact'}))
//     //––– stripCssComments –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     // preserve: true - Preserve important comments /*! */.
//     // preserve: false - Strip all comments.
//     // .pipe($.stripCssComments({preserve: false}))
//     //––– postcss plūgai –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     // .pipe($.postcss([autoprefixer, cssnano({discardComments: {removeAll: true}})]))
//     // .pipe($.postcss([autoprefixer, cssnano]))
//     .pipe($.postcss([autoprefixer]))
//     //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     .pipe($.sourcemaps.write())
//     //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     .pipe(gulp.dest(sassTestPath_dest))
//     .pipe(browserSync.stream());
// });

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  assets/sass.mokykla/
//
/////////////////////////////////////////////////////////////////////////////////////////

// var sassMokyklaPath_src   = ['docs/assets/sass.mokykla/*.scss','!docs/assets/sass.mokykla/*--*.scss'];
// var sassMokyklaPath_dest  =  'docs/assets/sass.mokykla.css';
//
// gulp.task('sass-mokykla-sync', function() {
//   return gulp.src(sassMokyklaPath_src)
//     .pipe($.plumber({ errorHandler: function (error) { console.log(error.message); this.emit('end'); }}))
//     //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
//     .pipe($.sourcemaps.init())
//     //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     // outputStyle: nested, expanded, compact, compressed
//     .pipe($.sass({outputStyle: 'compact'}))
//     //––– stripCssComments –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     // preserve: true - Preserve important comments /*! */.
//     // preserve: false - Strip all comments.
//     // .pipe($.stripCssComments({preserve: false}))
//     //––– postcss plūgai –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     // .pipe($.postcss([autoprefixer, cssnano({discardComments: {removeAll: true}})]))
//     // .pipe($.postcss([autoprefixer, cssnano]))
//     .pipe($.postcss([autoprefixer]))
//     //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     .pipe($.sourcemaps.write())
//     //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//     .pipe(gulp.dest(sassMokyklaPath_dest))
//     .pipe(browserSync.stream());
// });



