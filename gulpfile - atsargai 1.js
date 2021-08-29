
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();

var browserSync  = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');

/////////////////////////////////////////////////////////////////////////////////////////////

var sassMainPath_src      = ['site/assets/sass/*.scss','!site/assets/sass/*--*.scss'];
var sassMainPath_srcWatch = [...sassMainPath_src, '../libs/frontend/site/assets/sass/*.scss', '!../libs/frontend/site/assets/sass/*--*.scss'];
// var sassMainPath_srcWatch = [...sassMainPath_src];
var sassMainPath_dest     =  'site/assets/sass.css';

var sassPvzPath_src   = ['site/assets/sass.pvz/*.scss','!site/assets/sass.pvz/*--*.scss'];
var sassPvzPath_dest  =  'site/assets/sass.pvz.css';

/////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['sass-main:watch']);
// gulp.task('default', ['serve']);
// gulp.task('sass:watch-all', ['sass:watch', 'sass-mokykla:watch', 'sass-pvz:watch']);

/////////////////////////////////////////////////////////////////////////////////////////////
// browser-sync su SASS'o failų proccess'inimu
/////////////////////////////////////////////////////////////////////////////////////////////

// gulp.task('serve', ['browserSync','serve-sass','serve-sass-pvz'], function() {
gulp.task('serve', ['browserSync','serve-sass'], function() {
  gulp.watch(sassMainPath_srcWatch, ['serve-sass']);
  // gulp.watch(sassPvzPath_src, ['serve-sass-pvz']);
  gulp.watch(["site/*.html", "site/*.htm"]).on('change', browserSync.reload);
});




// gulp.task('serve-sass-pvz', function() {
//   // console.log(sassMainPath_src);
//   return gulp.src(sassPvzPath_src)
//     .pipe($.sourcemaps.init())
//     .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
//     // .pipe($.cssnano())       <<< minimizavimas veikia
//     .pipe($.sourcemaps.write({includeContent: false}))
//     .pipe($.sourcemaps.init({loadMaps: true}))
//     .pipe($.autoprefixer())
//     .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass.pvz/' + sourcePath; } }))
//     .pipe(gulp.dest(sassPvzPath_dest))
//     .pipe(browserSync.stream());
// });

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

/////////////////////////////////////////////////////////////////////////////////////////////
// proccess'ina SASS'o failus — iškviečiame per CMD:
// > gulp sass            <<< kai norime vienkartinio SASS'o failų sugeneravimo
// > gulp sass:watch      <<< kai norime SASS'o failų watch'inimo ir generavimo kai yra pasikeitimų
/////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass-main:watch', ['sass-main'], function() {
  gulp.watch(sassMainPath_srcWatch, ['sass-main']);
});

gulp.task('sass-main', function() {
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
});

gulp.task('sass-main-sync', function() {
  // console.log();

  // gulp.src('src/**/*.js')
  //   .pipe(sourcemaps.init({largeFile: true}))

  // return gulp.src(sassMainPath_src, { base: 'site' })
  return gulp.src(sassMainPath_src)
    .pipe($.sourcemaps.init())
      .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
      // .pipe($.cssnano())       <<< minimizavimas veikia
      // .pipe($.sourcemaps.write({includeContent: false}))
      // .pipe($.sourcemaps.init({loadMaps: true, largeFile: true}))
      // .pipe($.sourcemaps.init({largeFile: true}))
      // .pipe($.sourcemaps.init())
      .pipe($.autoprefixer())
    .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
    // .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return sourcePath; } }))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest(sassMainPath_dest))


    .pipe(browserSync.stream());
});



