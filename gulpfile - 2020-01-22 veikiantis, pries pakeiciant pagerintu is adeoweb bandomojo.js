'use strict';

const { series, parallel, watch, src, dest } = require('gulp');

const $               = require('gulp-load-plugins')();
const browserSync     = require('browser-sync').create();
const autoprefixer    = require('autoprefixer');
const print           = require('gulp-print').default;
// const cssnano         = require("cssnano");
// const discardComments = require("postcss-discard-comments");

$.sass.compiler    = require('node-sass');

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  proccess'ina: assets/sass/*.scss
//  iškviečiame per CMD:
//  > gulp sass ..............vienkartinis SASS'o failų sugeneravimas
//  > gulp sassWatch .........SASS'o failų watch'inimas ir generavimas kai yra pasikeitimų
//  > gulp sassWatchSync .....SASS'o failų watch'inimas ir generavimas, bei browser-sync
//
////////////////////////////////////////////////////////////////////////////////////////

const sass_src      = ['docs/assets/sass/master.scss'];
// const sass_src      = ['docs/assets/sass/test*.scss'];
// const sass_src      = ['docs/assets/sass/master.scss', 'docs/assets/sass/test*.scss'];
// const sass_src      = ['docs/assets/sass/master.scss','docs/assets/sass/master-dreamweaver.scss'];
// const sass_src      = ['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss','!docs/assets/sass/*_*.scss'];
// const sass_src      = ['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss'];
// const sass_src      = ['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss', { base: '..' }];

// const sass_srcWatch = [...sass_src, '../libs/frontend/docs/assets/sass/*.scss', '!../libs/frontend/docs/assets/sass/*--*.scss'];
const sass_srcWatch = ['docs/assets/sass?(.szm)/*.scss','!docs/assets/sass?(.szm)/*--*.scss'];
// const sass_srcWatch = ['docs/assets/sass/*.scss', 'docs/assets/sass.zm/*.scss'];

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
      // .pipe($.sourcemaps.identityMap())
      //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      .pipe($.sass({
        outputStyle: 'expanded', //nested, expanded, compact, compressed
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
      // .pipe($.postcss([autoprefixer()]))
      // .pipe($.postcss([autoprefixer, cssnano]))
      // .pipe($.postcss([discardComments({ removeAll: true })])) //<<< pašalina ir /*! */
      // .pipe($.postcss([discardComments()]))                    //<<< palieka tik /*! */
      // .pipe($.postcss([discardComments(), autoprefixer()])) // << atrodo veikia gerai
      //––– sourcemap'ų ... –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // .pipe($.sourcemaps.mapSources(function(sourcePath, file) { return '../sass/' + sourcePath; }))
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
//  proccess'ina: assets/sass.szm/*.scss
//  iškviečiame per CMD:
//  > gulp sasszm ..............vienkartinis SASS'o failų sugeneravimas
//
/////////////////////////////////////////////////////////////////////////////////////////

const sasszm_src      = ['docs/assets/sass.szm/*.scss', '!docs/assets/sass.szm/*--*.scss', '!docs/assets/sass.szm/*_*.scss'];
// const sasszm_srcWatch = ['docs/assets/sass.szm/*.scss','!docs/assets/sass.szm/*--*.scss'];
const sasszm_dest     =  'docs/assets/sass.szm';

function sasszm(cb) {
  return src(sasszm_src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init({largeFile: true}))
    .pipe($.sass({
      outputStyle: 'expanded', //nested, expanded, compact, compressed
    }).on('error', $.sass.logError))
    .pipe($.postcss([autoprefixer()]))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest(sasszm_dest));
  cb();
}

// function sasszmWatch(cb) {
//   watch(sasszm_srcWatch, sasszm);
//   cb();
// }
//
// function sasszmSync(cb) {
//   sasszm()
//     .pipe(browserSync.stream());
//   cb();
// }
//
// function sassWatchSync(cb) {
//   watch(sasszm_srcWatch, sasszmSync);
//   cb();
// }

exports.sasszm = sasszm;
// exports.sasszmWatch = series(sasszm, sasszmWatch);
// exports.sasszmWatchSync = series(BrowserSyncInit, sasszmSync, sassWatchSync);

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  assets/sass.pvz/
//
/////////////////////////////////////////////////////////////////////////////////////////

const sassPvz_src      = ['docs/assets/sass.pvz/*.scss','!docs/assets/sass.pvz/*--*.scss'];
const sassPvz_dest     =  'docs/assets/sass.pvz';

function sassPvz(cb) {
  return src(sassPvz_src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'expanded', //nested, expanded, compact, compressed
    }).on('error', $.sass.logError))
    .pipe($.postcss([autoprefixer()]))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest(sassPvz_dest));
  cb();
}

function sassPvzWatch(cb) {
  watch(sassPvz_src, sassPvz);
  cb();
}

function sassPvzSync(cb) {
  sassPvz()
    .pipe(browserSync.stream());
  cb();
}

function sassPvzWatchSync(cb) {
  watch(sassPvz_src, sassPvzSync);
  cb();
}

exports.sassPvz = sassPvz;
exports.sassPvzWatch = series(sassPvz, sassPvzWatch);
exports.sassPvzWatchSync = series(BrowserSyncInit, sassPvzSync, sassPvzWatchSync);

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

const html_srcWatch = ["docs/{,test.szm/}*.{htm?(l),php}"];

function htmlWatchSync(cb) {
  watch(html_srcWatch).on('change', browserSync.reload);
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

exports.htmlWatchSync = series(BrowserSyncInit, htmlWatchSync);
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
}

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



