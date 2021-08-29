'use strict';

const { series, parallel, watch, src, dest } = require('gulp');

const $            = require('gulp-load-plugins')();
const print        = $.print.default;
const autoprefixer = require('autoprefixer');

//--- pasirenkame kokią SASS'o implementaciją naudoti ---------------------------------
// $.sass.compiler    = require('node-sass');
$.sass.compiler    = require('sass');

// const cssnano         = require("cssnano");
// const discardComments = require("postcss-discard-comments");

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # bendri failų keliai
//
////////////////////////////////////////////////////////////////////////////////////////

// const html_srcWatch = ["site/{,test.szm/}*.{htm?(l),php}"];

const files_html       = ["./site/*.htm?(l)"];
const folder_html      =  "./site";

// sass main

const folder_sass_main = 'site/assets/sass';
const folder_sass_mainLibs  = 'site/assets/sass?(.szm|.enhanced)';

const files_sass_mainLibs       = [folder_sass_mainLibs + '/*.scss'];
const files_sass_mainLibs_watch = [...files_sass_mainLibs, '!' + folder_sass_mainLibs + '/*--*.scss'];

// sass pvz

const folder_sass_pvz = 'site/assets/sass.pvz';
const files_sass_pvz = ['site/assets/sass.pvz/*.scss', '!site/assets/sass.pvz/*--*.scss'];

// sass test

const folder_sass_test = 'site/assets/sass.test';
const files_sass_test = ['site/assets/sass.test/*.scss', '!site/assets/sass.test/*--*.scss'];

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # test glob
//
////////////////////////////////////////////////////////////////////////////////////////

function testGlob(cb) {
  // return src(files_sass_mainLibs)
  return src(files_sass_mainLibs_watch)
    .pipe(print());
  cb();
}

exports.testGlob = testGlob;

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  proccess'ina: assets/sass/*.scss
//  iškviečiame per CMD:
//  > gulp sass ..............vienkartinis SASS'o failų sugeneravimas
//  > gulp sassWatch .........SASS'o failų watch'inimas ir generavimas kai yra pasikeitimų
//
////////////////////////////////////////////////////////////////////////////////////////

// const sass_src      = files_sass_mainLibs_watch;
const sass_src      = ['site/assets/sass/master.scss'];
// const sass_src      = ['site/assets/sass/master.dev.scss'];
// const sass_src      = ['site/assets/sass/master.utilities.scss'];
// const sass_src      = ['site/assets/sass/master-dreamweaver.scss'];

function sassCompile(cb) {

  // console.log("$.sass.info = " + $.sass.info);

  return src(sass_src)
  // .pipe($.sourcemaps.init({largeFile: true}))
    .pipe($.sourcemaps.init())

    // The exported identityMap method allows you to generate a full valid source map encoding no changes
    // (slower, only for Javascript and CSS) instead of the default empty source map (no mappings, fast).
    // Use this option if you get missing or incorrect mappings, e.g. when debugging.
    // .pipe($.sourcemaps.identityMap())

    //----------------------------------------------------------------------------------
    // priklausomai kokia SASS'o implementacijama naudojama, galimi skirtingi kompiliavimai
    //----------------------------------------------------------------------------------

    //--- šitą galima naudoti tik su sass package, greičiau veikia, nes: ---------------
    //--- Note however that by default, renderSync() is more than twice as fast as render(),
    //--- due to the overhead of asynchronous callbacks.
    .pipe($.sass.sync({
      outputStyle: 'expanded',         // nested, expanded, compact, compressed
    }).on('error', $.sass.logError))

    //--- šitas tinka ir sass package, ir node-sass package -------------------------------------------------------------------------------
    // .pipe($.sass({
    //   outputStyle: 'expanded',         // nested, expanded, compact, compressed
    // }).on('error', $.sass.logError))

    //----------------------------------------------------------------------------------

    .pipe($.postcss([autoprefixer()]))
    // .pipe($.postcss([autoprefixer, cssnano]))
    // .pipe($.postcss([discardComments({ removeAll: true })])) //<<< pašalina ir /*! */
    // .pipe($.postcss([discardComments()]))                    //<<< palieka tik /*! */
    // .pipe($.postcss([discardComments(), autoprefixer()])) // << atrodo veikia gerai

    .pipe($.sourcemaps.write('.'))
    .pipe(dest(folder_sass_main));
  cb();
}

function sassWatch(cb) {
  watch(files_sass_mainLibs_watch, sassCompile);
  cb();
}

exports.sass = sassCompile;
exports.sassWatch = sassWatch;
// exports.sassWatch = series(sass, sassWatch);

//--------------------------------------------------------------------------------------
// web-http server gulp-connect
//--------------------------------------------------------------------------------------

//--- dabar nereikalingas
// function sassReload_connect(cb) {
//   sass().pipe($.connect.reload());
//   cb();
// }

// @PVZ:
// function build (done) {
//   generateFilesAsync()
//     .then(() => {
//       // **/*.ext is a glob of generated files
//       src('**/*.ext', { read: false })
//         .on('finish', done)
//         .pipe(connect.reload())
//     })
// }

// @PVZ:
// function watchTask (done) {
//   watch('public').on('change', (filepath) =>
//     src(filepath, { read: false }).pipe(connect.reload()))
//   done()
// }

function sassWatch_connect(cb) {
  // watch(files_sass_mainLibs_watch, sass).on(
  //   'change',
  //   (filepath) => src(filepath, { read: false }).pipe($.connect.reload())
  // );
  watch(files_sass_mainLibs_watch).on(
    'change',
    (filepath) => {
      sassCompile().pipe(src(filepath, { read: false })).pipe($.connect.reload())
    }
  );
  // watch(files_sass_mainLibs_watch, sassReload_connect); // SASS'as generuojamas, bet neatnaujina naršyklės
  // watch(files_html, connect_htmlReload); // deja vieną kartą įvykdžius, pradeda kartoti be galo
  cb();
}

// exports.sassWatch_connect = series(connect_init, sassWatch_connect);
exports.sassWatch_connect = parallel(connect_init, sassWatch_connect);

//--------------------------------------------------------------------------------------
// web-http server browser-sync
//--------------------------------------------------------------------------------------

function sassReload_browserSync_stream(cb) {
  // return sassCompile().pipe(browserSync.stream());
  sassCompile().pipe(browserSync.stream({match: '**/*.css'})); // https://stackoverflow.com/a/31245911
  cb();
}

function sassWatch_browserSync(cb) {
  // watch(files_sass_mainLibs_watch,
  //   //--- turėtų veikti, bet neveikia — SASS'as generuojamas, bet neatnaujina naršyklės
  //   // sassReload_browserSync_stream
  //
  //   //--- VEIKIA !!!
  //   series(sassCompile, browserSync_reload)
  // );

  //--- kartais reload'ina, kartais ne !!!
  // watch(files_sass_mainLibs_watch, sassCompile).on('change', browserSync_reload);

  watch(files_sass_mainLibs_watch).on(
    'change',
    //--- VEIKIA !!!
    series(sassCompile, browserSync_reload),

    //--- SASS'as generuojamas, bet neatnaujina naršyklės
    // (filepath) => {
    //   // sassCompile().pipe(src(filepath, { read: false })).pipe(browserSync.stream({match: '**/*.css'}))
    //   sassCompile().pipe(browserSync.stream({match: '**/*.css'}))
    // }
  );

  cb();

  // @PVZ:
  // // Compile sass into CSS & auto-inject into browsers
  // gulp.task('sass', function() {
  //   return gulp.src("app/scss/*.scss")
  //     .pipe(sass())
  //     .pipe(gulp.dest("app/css"))
  //     .pipe(browserSync.stream());
  // });
}

// exports.sassWatch_browserSync = series(browserSync_init, watch(files_sass_mainLibs_watch, sassReload_browserSync_stream));
exports.sassWatch_browserSync = series(browserSync_init, sassWatch_browserSync);
// exports.sassWatch_browserSync = parallel(browserSync_init, sassWatch_browserSync);

// const watch = () => gulp.watch(paths.scripts.src, gulp.series(scripts, reload));

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # sassPvz
//
////////////////////////////////////////////////////////////////////////////////////////

function sassPvz(cb) {
  return src(files_sass_pvz)
    // .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'expanded', //nested, expanded, compact, compressed
    }).on('error', $.sass.logError))
    .pipe($.postcss([autoprefixer()]))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest(folder_sass_pvz));
  cb();
}

function sassPvzWatch(cb) {
  watch(files_sass_pvz, sassPvz);
  cb();
}

function sassPvzReload_browserSync(cb) {
  sassPvz().pipe(browserSync.stream());
  cb();
}

function sassPvzWatch_browserSync(cb) {
  watch(files_sass_pvz, sassPvzReload_browserSync);
  watch(files_html).on('change', browserSync.reload);
  cb();
}

exports.sassPvz = sassPvz;
exports.sassPvzWatch = series(sassPvz, sassPvzWatch);
exports.sassPvzWatch_browserSync = series(browserSync_init, sassPvzWatch_browserSync);

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # sassTest
//
////////////////////////////////////////////////////////////////////////////////////////

function sassTest(cb) {
  return src(files_sass_test)
    // .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'expanded', //nested, expanded, compact, compressed
    }).on('error', $.sass.logError))
    .pipe($.postcss([autoprefixer()]))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest(folder_sass_test));
  cb();
}

function sassTestWatch(cb) {
  watch(files_sass_test, sassTest);
  cb();
}

function sassTestReload_browserSync(cb) {
  sassTest().pipe(browserSync.stream());
  cb();
}

function sassTestWatch_browserSync(cb) {
  watch(files_sass_test, sassTestReload_browserSync);
  watch(files_html).on('change', browserSync.reload);
  cb();
}

exports.sassTest = sassTest;
exports.sassTestWatch = series(sassTest, sassTestWatch);
exports.sassTestWatch_browserSync = series(browserSync_init, sassTestWatch_browserSync);

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # html
//
////////////////////////////////////////////////////////////////////////////////////////

function htmlWatch_connect(cb) {
  watch(files_html).on(
    'change',
    (filepath) => {
      src(filepath, { read: false }).pipe($.connect.reload())
    }
  );
  cb();
}

function htmlWatch_browserSync(cb) {
  watch(files_html).on('change', browserSync.reload);
  cb();
}

exports.htmlWatch_connect = parallel(connect_init, htmlWatch_connect);

exports.htmlWatch_browserSync = series(browserSync_init, htmlWatch_browserSync);
// exports.htmlWatch_browserSync = parallel(browserSync_init, htmlWatch_browserSync);

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # web-http server with browser-sync !!! NEBEVYSTOMAS !!!
//
/////////////////////////////////////////////////////////////////////////////////////////

const browserSync  = require('browser-sync').create();

function browserSync_init(cb) {
  browserSync.init({

    // https://stackoverflow.com/a/31245911
    // You can just inject the changes instead of having to force a full browser refresh on SASS compile if you like.
    injectChanges: true,

    // https://stackoverflow.com/a/31414436
    // The BrowserSync Twitter account suggested that I set the "online" option to true, and...it seems to have worked!
    online: true,

    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // browserSync'as sukuria savo serverį
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // server: {
    //   baseDir: 'site',
    //   port: 8000,
    //   directory: true    // Serve files from the app directory with directory listing
    // },
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // nukreipimas į esantį serverį
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // proxy: "http://konspektas.local",
    // port: 3010,
    // ui: { port: 3011 }
    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // open: 'external', // <<< ??? šitas sukuria adresą atidaryti tinklapį kitiems iš interneto
    proxy: "konspektas.local",
    host: 'konspektas.local',
    port: 8000
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  });
  // browserSync.init({
  //   server: "./site"
  // });
  cb();
}

function browserSync_reload(cb) {
  browserSync.reload();
  cb();
}

function browserSync_stream(cb) {
  browserSync.stream({match: '**/*.css'});
  cb();
}

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # web-http server with gulp-connect
//
/////////////////////////////////////////////////////////////////////////////////////////

function connect_init(cb) {

  // $.connect.server({
  //   root: './site',
  //   name: 'konspektas',  // webdev
  //   port: 8888,
  //   livereload: true
  // }, function () { this.server.on('close', cb) });

  $.connect.server({
    name: 'konspektas',  // webdev
    root: './site',
    host: 'konspektas.local',
    port: 8000,
    // port: 80, //...................defaultinis, nereikia visai nurodyti naršyklės adrese
    livereload: true,
    // open: true,
  });

  // $.connect.server({
  //   root: './site',
  //   name: 'konspektas',  // webdev
  //   port: 8888,
  //   livereload: true
  // });

  cb();
}

// function connect_htmlReload(cb) {
//   return src(files_html)
//     .pipe(dest(folder_html))
//     .pipe($.connect.reload());
//   cb();
// }

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  # default
//
/////////////////////////////////////////////////////////////////////////////////////////

const siteWatch_browserSync = series(browserSync_init, parallel(sassWatch_browserSync, htmlWatch_browserSync));
exports.siteWatch_browserSync = siteWatch_browserSync;

exports.default =
  // series(connect_init, parallel(sassWatch_connect, htmlWatch_connect))
  siteWatch_browserSync
  // parallel(connect_init, sassWatch_connect, htmlWatch_connect)
  // series(browserSync_init, parallel(sassWatch_browserSync, htmlWatch_browserSync))
;

// exports.default = parallel(
//   // sassWatch,
//   parallel(connect_init, sassWatch_connect, htmlWatch_connect)
//   // series(browserSync_init, sassWatch_browserSync)
// );












