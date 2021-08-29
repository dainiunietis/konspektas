
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

/////////////////////////////////////////////////////////////////////////////////////////////

var sassPath_src      = ['site/assets/sass/*.scss','!site/assets/sass/*--*.scss'];
var sassPath_srcWatch = [...sassPath_src];
// var sassPath_srcWatch = [...sassPath_src, '../libs/frontend/site/assets/sass/*.scss', '!../libs/frontend/site/assets/sass/*--*.scss'];
var sassPath_dest =      'site/assets/sass.css';

/////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass:watch', ['sass'], function() {
  gulp.watch(sassPath_srcWatch, ['sass']);
});

/////////////////////////////////////////////////////////////////////////////////////////////
//
// standartinis
//
/////////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function() {
  return gulp.src(sassPath_src)
    //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
    .pipe($.sourcemaps.init())
      //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // outputStyle: nested, expanded, compact, compressed
      .pipe($.sass({outputStyle: 'compact'}).on('error', $.sass.logError))
      //––– autoprefixer –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      .pipe($.autoprefixer())
    //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    //–– sukuria atskirą map'o failą
    // .pipe($.sourcemaps.write('.', { mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
    // .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
    .pipe($.sourcemaps.write())
    //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe(gulp.dest(sassPath_dest));
});

/////////////////////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function() {
  return gulp.src(sassPath_src)
    //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
    .pipe($.sourcemaps.init())
      //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // outputStyle: nested, expanded, compact, compressed
      .pipe($.sass({outputStyle: 'compact'}).on('error', $.sass.logError))
      //––– autoprefixer –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      .pipe($.sourcemaps.write({includeContent: false}))
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.autoprefixer())
    //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe($.sourcemaps.write())
    //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe(gulp.dest(sassPath_dest));
});

/////////////////////////////////////////////////////////////////////////////////////////////
//
// autoprefixer po sourcemaps.write()
//
//////////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function() {
  return gulp.src(sassPath_src)
    //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
    .pipe($.sourcemaps.init())
      //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      // outputStyle: nested, expanded, compact, compressed
      .pipe($.sass({outputStyle: 'compact'}).on('error', $.sass.logError))
      //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      .pipe($.sourcemaps.write())
    //––– autoprefixer –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe($.autoprefixer({browsers: ['last 2 versions']}))
    .pipe($.if(['*.css', '!*.map'], $.autoprefixer()))   //<<< nebandžiau
    //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe(gulp.dest(sassPath_dest));
});


/////////////////////////////////////////////////////////////////////////////////////////////
//
// atrodo nebandžiau
//
//////////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function() {
  return gulp.src(sassPath_src)
    //––– SASS –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe($.sass({outputstyle: 'compressed', sourcemap: true}).on('error', $.sass.logError))
    //––– sourcemap'ų inicializacija, toliau sourcemap'us palaikantys gulp'o plugin'ai –––––––––––––––––
    .pipe($.sourcemaps.init({loadMaps: true}))
      //––– autoprefixer –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
      .pipe($.autoprefixer())
    //––– sourcemap'ų įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe($.sourcemaps.write())
    //––– CSS failo įrašymas –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    .pipe(gulp.dest(sassPath_dest));
});
