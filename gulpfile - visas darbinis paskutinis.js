
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

/////////////////////////////////////////////////////////////////////////////////////////////

// var sassTestinisPathSrc   = ['site/assets/sass.test/*.scss','!site/assets/sass.test/*--*.scss'];
// var sassTestinisPathWatch = [...sassTestinisPathSrc];
// var sassTestinisPathDest  = 'site/assets/sass.test.css';

var sassPath_src      = ['site/assets/sass/*.scss','!site/assets/sass/*--*.scss'];
var sassPath_srcWatch = [...sassPath_src];
// var sassPath_srcWatch = [...sassPath_src, '../libs/frontend/site/assets/sass/*.scss', '!../libs/frontend/site/assets/sass/*--*.scss'];
var sassPath_dest =      'site/assets/sass.css';

// var sassPvzPath_src = ['site/assets/sass.pvz/*.scss','!site/assets/sass.pvz/*--*.scss'];
// var sassPvzPath_dest = 'site/assets/sass.pvz.css';

/////////////////////////////////////////////////////////////////////////////////////////////

// gulp.task('default', ['serve']);
// gulp.task('sass:watch-all', ['sass:watch', 'sass-mokykla:watch', 'sass-pvz:watch']);

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
// browser-sync su SASS'o failų proccess'inimu
//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

// // npm install -g browser-sync
// // npm install browser-sync --save-dev

// // gulp.task('serve', ['browserSync','serve-sass','serve-sass-pvz'], function() {
// gulp.task('serve', ['browserSync','serve-sass'], function() {
//   gulp.watch(sassPath_srcWatch, ['serve-sass']);
//   // gulp.watch(sassPvzPath_src, ['serve-sass-pvz']);
//   gulp.watch(["site/*.html", "site/*.htm"]).on('change', browserSync.reload);
// });

// gulp.task('serve-sass', function() {
//   // console.log(sassPath_src);

//   // gulp.src('src/**/*.js')
//   //   .pipe(sourcemaps.init({largeFile: true}))

//   // return gulp.src(sassPath_src, { base: 'site' })
//   return gulp.src(sassPath_src)
//     .pipe($.sourcemaps.init())
//       .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
//       // .pipe($.cssnano())       <<< minimizavimas veikia
//       // .pipe($.sourcemaps.write({includeContent: false}))
//       // .pipe($.sourcemaps.init({loadMaps: true, largeFile: true}))
//       // .pipe($.sourcemaps.init({largeFile: true}))
//       // .pipe($.sourcemaps.init())
//       .pipe($.autoprefixer())
//     .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
//     // .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return sourcePath; } }))
//     // .pipe($.sourcemaps.write())
//     .pipe(gulp.dest(sassPath_dest))
//     .pipe(browserSync.stream());
// });

// gulp.task('serve-sass-pvz', function() {
//   // console.log(sassPath_src);
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

// gulp.task('browserSync', function() {
//   browserSync.init({
//     //--------------------------------------------
//     // browserSync'as sukuria savo serverį
//     //--------------------------------------------
//     // server: {
//     //   baseDir: 'site',
//     //   directory: true    // Serve files from the app directory with directory listing
//     // },
//     //--------------------------------------------
//     // nukreipimas į esantį serverį
//     //--------------------------------------------
//     // proxy: "http://konspektas.local",
//     // port: 3010,
//     // ui: { port: 3011 }
//     //--------------------------------------------
//     open: 'external',
//     host: 'konspektas.local',
//     proxy: "konspektas.local",
//     port: 8080
//     //--------------------------------------------
//   });
//   // browserSync.init({
//   //   server: "./site"
//   // });
// });

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
// proccess'ina SASS'o failus — iškviečiame per CMD:
// > gulp sass:watch
// kai norime tik SASS'o failų generavimo
//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

gulp.task('sass', function() {
  return gulp.src(sassPath_src)
  // .pipe($.sourcemaps.init({largeFile: true}))
  .pipe($.sourcemaps.init())
    //––––––––––––––––––––––––––––––––––––––––––– toliau sourcemap'us palaikantys gulp'o plugin'ai –––

    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // SASS
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    // outputStyle: nested, expanded, compact, compressed
    .pipe($.sass({outputStyle: 'compact'}).on('error', $.sass.logError))
    // .pipe($.sourcemaps.write({includeContent: false}))
    // .pipe($.sourcemaps.init({loadMaps: true}))

    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // autoprefixer
    //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    // .pipe($.autoprefixer())
    // .pipe($.if(['*.css', '!*.map'], $.autoprefixer()))

    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer())

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // sourcemap'ų įrašymas
  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  //––– sukuria atskirą map'o failą –––
  // .pipe($.sourcemaps.write('.', { mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
  // .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
  .pipe($.sourcemaps.write())

  .pipe(gulp.dest(sassPath_dest));
});

// You just need to execute autoprefixer before sourcemap.

// gulp.task('sass', function() {
//   gulp.src('app/styles/sass/*.scss')
//     .pipe(sourcemaps.init())
//         .pipe(sass())
//     .pipe(sourcemaps.write())
//     .pipe(autoprefixer({browsers: ['last 2 versions']}))
//     .pipe(gulp.dest('app/styles/css'));
// });

// gulp.src(…)
//   .pipe($.sourcemaps.init())
//   .pipe($.sass({
//     precision: 10,
//     errLogToConsole: true,
//     // indentedSyntax: true, → Sass Syntax
//     outputStyle: 'nested'
//   }))
//   .pipe($.sourcemaps.write('.'))
//   .pipe($.if(['*.css', '!*.map'], $.autoprefixer()))
//   .pipe(gulp.dest(…));

// gulp.task('sass', function() {
//   return gulp.src(sassPath_src)
//     .pipe($.sass({outputstyle: 'compressed', sourcemap: true, sourcemapPath: '../sass.css'}).on('error', $.sass.logError))
//     .pipe($.sourcemaps.init({loadMaps: true}))
//     .pipe($.autoprefixer())
//     .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass/' + sourcePath; } }))
//     // .pipe($.sourcemaps.write())
//     .pipe(gulp.dest(sassPath_dest));
// });

gulp.task('sass:watch', ['sass'], function() {
  gulp.watch(sassPath_srcWatch, ['sass']);
});

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
// proccess'ina pvz SASS'o failus
//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

// gulp.task('sass-pvz', function() {
//   return gulp.src('site/assets/sass.pvz/*.scss')
//     .pipe($.sourcemaps.init())
//     .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
//     .pipe($.sourcemaps.write({includeContent: false}))
//     .pipe($.sourcemaps.init({loadMaps: true}))
//     .pipe($.autoprefixer())
//     .pipe($.sourcemaps.write({ mapSources: function(sourcePath) { return '../sass.pvz/' + sourcePath; } }))
//     .pipe(gulp.dest('site/assets/sass.pvz.css'));
// });

// gulp.task('sass-pvz:watch', function() {
//   gulp.watch('site/assets/sass.pvz/*.scss', ['sass-pvz']);
// });

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
// proccess'ina testinius-mokomuosius SASS'o failus
//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪

// gulp.task('sass-mokykla', function() {
//   return gulp.src('site/assets/sass.mokykla/*.scss')
//     // .pipe($.sourcemaps.init())
//     .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
//     // .pipe($.sourcemaps.write({
//     //   mapSources: function(sourcePath) {
//     //     return '../sass/' + sourcePath;
//     //   }
//     //  }))
//     .pipe($.autoprefixer())
//     .pipe(gulp.dest('site/assets/sass.mokykla.css'));
// });

// gulp.task('sass-mokykla:watch', function() {
//   gulp.watch('site/assets/sass.mokykla/*.scss', ['sass-mokykla']);
// });

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪







