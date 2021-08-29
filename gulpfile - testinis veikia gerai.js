
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('default', ['sass.testinis:watch']);

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

var sassTestinisPathSrc   = ['docs/assets/sass.test/*.scss','!docs/assets/sass.test/*--*.scss'];
var sassTestinisPathWatch = [...sassTestinisPathSrc];
var sassTestinisPathDest  = 'docs/assets/sass.test.css';

gulp.task('sass.testinis', function() {
  return gulp.src(sassTestinisPathSrc)
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
    // .pipe($.sourcemaps.write({includeContent: false}))
    // .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.autoprefixer())
    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– sukuria atskirą map'o failą
    // .pipe($.sourcemaps.write('.', { mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass.test/' + sourcePath; } }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(sassTestinisPathDest));
});

gulp.task('sass.testinis:watch', ['sass.testinis'], function() {
  gulp.watch(sassTestinisPathWatch, ['sass.testinis']);
});

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––






