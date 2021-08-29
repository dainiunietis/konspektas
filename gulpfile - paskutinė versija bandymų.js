
var gulp = require('gulp');
// var sass   = require('gulp-sass');
// var jshint = require('gulp-jshint')
// var sourcemaps = require('gulp-sourcemaps')
// var autoprefixer = require('gulp-autoprefixer')
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

// var pathSass_scss = 'docs/assets/sass/*.scss';
var pathSass_scss = ['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss'];

// var pathSass_scss_watch = [...pathSass_scss, 'docs/assets/vendor/lib-frontend/sass/**/*.scss', '!docs/assets/vendor/lib-frontend/sass/**/*--*.scss'];
var pathSass_scss_watch = [...pathSass_scss, '../libs/frontend/docs/assets/sass/*.scss', '!../libs/frontend/docs/assets/sass/*--*.scss'];

// pathSass_scss_watch.push('docs/assets/vendor/lib-frontend/sass/**/*.scss', '!docs/assets/vendor/lib-frontend/sass/**/*--*.scss');
var pathSass_css = 'docs/assets/sass.css';
// var pathJs = 'docs/assets/sass/*.scss';

var pathSass_scss_pvz = ['docs/assets/sass.pvz/*.scss','!docs/assets/sass.pvz/*--*.scss'];
var pathSass_scss_pvz_css = 'docs/assets/sass.pvz.css';

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

// gulp.task('default', ['watch']);
gulp.task('default', ['serve']);

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

gulp.task('sass:watch-all', ['sass:watch', 'sass-mokykla:watch', 'sass-pvz:watch']);

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
// browser-sync su SASS'o failų proccess'inimu
//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

// npm install -g browser-sync
// npm install browser-sync --save-dev

// gulp.task('serve', ['browserSync','serve-sass','serve-sass-pvz'], function() {
gulp.task('serve', ['browserSync','serve-sass'], function() {
  gulp.watch(pathSass_scss_watch, ['serve-sass']);
  // gulp.watch(pathSass_scss_pvz, ['serve-sass-pvz']);
  gulp.watch(["docs/*.html", "docs/*.htm"]).on('change', browserSync.reload);
});

gulp.task('serve-sass', function() {
  // console.log(pathSass_scss);

  // gulp.src('src/**/*.js')
  //   .pipe(sourcemaps.init({largeFile: true}))

  // return gulp.src(pathSass_scss, { base: 'docs' })
  return gulp.src(pathSass_scss)
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
    .pipe(gulp.dest(pathSass_css))
    .pipe(browserSync.stream());
});

gulp.task('serve-sass-pvz', function() {
  // console.log(pathSass_scss);
  return gulp.src(pathSass_scss_pvz)
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
    // .pipe($.cssnano())       <<< minimizavimas veikia
    .pipe($.sourcemaps.write({includeContent: false}))
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass.pvz/' + sourcePath; } }))
    .pipe(gulp.dest(pathSass_scss_pvz_css))
    .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
  browserSync.init({
    //--------------------------------------------
    // browserSync'as sukuria savo serverį
    //--------------------------------------------
    // server: {
    //   baseDir: 'docs',
    //   directory: true    // Serve files from the app directory with directory listing
    // },
    //--------------------------------------------
    // nukreipimas į esantį serverį
    //--------------------------------------------
    // proxy: "http://konspektas.local",
    // port: 3010,
    // ui: { port: 3011 }
    //--------------------------------------------
    open: 'external',
    host: 'konspektas.local',
    proxy: "konspektas.local",
    port: 8080
    //--------------------------------------------
  });
  // browserSync.init({
  //   server: "./docs"
  // });
});

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
// proccess'ina SASS'o failus — iškviečiame per CMD:
// > gulp sass:watch
// kai norime tik SASS'o failų generavimo
//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

gulp.task('sass:watch', function() {
  // gulp.watch('docs/assets/sass/*.scss', ['sass']);
  gulp.watch(pathSass_scss_watch, ['sass']);
});

gulp.task('sass', function() {
  return gulp.src(pathSass_scss)
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
    .pipe($.sourcemaps.write({includeContent: false}))
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.autoprefixer())
    //----------------------------------------------------------------------------------
    // sukuria atskirą map'o failą
    //----------------------------------------------------------------------------------
    // .pipe($.sourcemaps.write('.', { mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
    //----------------------------------------------------------------------------------
    .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
    .pipe(gulp.dest(pathSass_css));
});

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
// proccess'ina pvz SASS'o failus
//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

gulp.task('sass-pvz', function() {
  return gulp.src('docs/assets/sass.pvz/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
    .pipe($.sourcemaps.write({includeContent: false}))
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass.pvz/' + sourcePath; } }))
    .pipe(gulp.dest('docs/assets/sass.pvz.css'));
});

gulp.task('sass-pvz:watch', function() {
  gulp.watch('docs/assets/sass.pvz/*.scss', ['sass-pvz']);
});

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
// proccess'ina testinius-mokomuosius SASS'o failus
//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

gulp.task('sass-mokykla', function() {
  return gulp.src('docs/assets/sass.mokykla/*.scss')
    // .pipe($.sourcemaps.init())
    .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
    // .pipe($.sourcemaps.write({
    //   mapSources: function(sourcePath) {
    //     return '../sass/' + sourcePath;
    //   }
    //  }))
    .pipe($.autoprefixer())
    .pipe(gulp.dest('docs/assets/sass.mokykla.css'));
});

gulp.task('sass-mokykla:watch', function() {
  gulp.watch('docs/assets/sass.mokykla/*.scss', ['sass-mokykla']);
});

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪


