






// gulp.task('sass', function() {
//   /*var AUTOPREFIXER_BROWSERS = [
//     'ie >= 10',
//     'ie_mob >= 10',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23',
//     'ios >= 7',
//     'android >= 4.4',
//     'bb >= 10'
//   ];*/
//   return gulp.src('site/assets/sass/*.scss')
//     .pipe($.sourcemaps.init())
//     .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
//     // .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
//     .pipe($.autoprefixer())
//     //--------------------------------------------------------------------------------------
//     // sourcemap'as išsaugomas pačiame *.css faile
//     //--------------------------------------------------------------------------------------
//     // .pipe($.sourcemaps.write())
//     .pipe($.sourcemaps.write({
//       //-- kad devtools'ų Elements panelėje būtų teisinga nuoroda į *.scss failą
//       //-- čia nurodomas kelias nuo *.css.map iki *.scss
//       mapSources: function(sourcePath) {
//         return '../sass/' + sourcePath;
//         // return sourcePath;
//         // return '../g3g2g/';
//       }
//      }))
//     //--------------------------------------------------------------------------------------
//     // veikiantis variantas su sourcemap'o išsaugojimu atskirame *.map faile
//     //--------------------------------------------------------------------------------------
//     // .pipe($.sourcemaps.write('../sass.css.maps', {
//     //   //-- kad devtools'ų Elements panelėje būtų teisinga nuoroda į *.scss failą
//     //   //-- čia nurodomas kelias nuo *.css.map iki *.scss
//     //   mapSources: function(sourcePath) {
//     //     return '../sass/' + sourcePath;
//     //   }
//     //  }))
//     //--------------------------------------------------------------------------------------
//     .pipe(gulp.dest('site/assets/sass.css'));
// });


//----------------------------------------------------------------------------------
// pagal: https://github.com/ByScripts/gulp-sample
//----------------------------------------------------------------------------------
// gulp.task('doesWork', function () {
//   gulp.src('./src/sample.scss')
//     .pipe(sourcemaps.init())
//     .pipe(sass())
//     .pipe(sourcemaps.write({includeContent: false}))
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(autoprefixer())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./dest/doesWork'))
// });
//----------------------------------------------------------------------------------





//-------------------------------------- NEveikia ------------------------------------------
//   Error: Cannot find module 'jshint/src/cli'
// at Function.Module._resolveFilename (module.js:469:15)
// at Function.Module._load (module.js:417:25)
// at Module.require (module.js:497:17)
// at require (internal/module.js:20:19)
// at Object.<anonymous> (D:\webdev\konspektas\node_modules\gulp-jshint\src\extract.js:1:79)
// at Module._compile (module.js:570:32)
// at Object.Module._extensions..js (module.js:579:10)
// at Module.load (module.js:487:32)
// at tryModuleLoad (module.js:446:12)
// at Function.Module._load (module.js:438:3)
//------------------------------------------------------------------------------------------

// suinstaliuota:
// > npm install --save-dev gulp-jshint jshint-stylish

// gulp.task('jshint', function() {
//   return gulp.src('site/assets/js/*.js')
//     .pipe($.jshint())
//     .pipe($.jshint.reporter('jshint-stylish'));
// });
//
// // configure which files to watch and what tasks to use on file changes
// gulp.task('jshint:watch', function() {
//   gulp.watch('site/assets/js/*.js', ['jshint']);
// });

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪


//-- Debug: You can check which browsers are selected and which properties will be prefixed:
// var info = autoprefixer().info();
// console.log(info);

//------------------------------------------------------------------------------------------

// gulp.task('hello', function() {
//   console.log('Hello iš Gulpo');
// });

// // create a default task and just log a message
// gulp.task('default', function() {
//   return gutil.log('Gulp is running!')
// });

//▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪






// gulp.task('watch', function() {
//   gulp.watch('site/assets/sass/*.scss', ['sass']);
//   gulp.watch('site/assets/sass.mokykla/*.scss', ['sass-mokykla']);
//   // gulp.watch('site/assets/js/*.js', ['jshint']);
// });

// var gutil = require('gulp-util');
// var sass = require('gulp-sass');
//
//
// gulp.task('sass', function() {
//    return gulp.src('site/assets/sass/*.scss')
//    // return gulp.src('site/assets/sass/*.scss', {base: 'site/assets'})
//    // gulp.src(['src/test.js', 'src/testdir/test2.js'], { base: 'src' })
//    .pipe($.sourcemaps.init())
//    .pipe($.sass().on('error', $.sass.logError))
//    // .pipe(sass.sync().on('error', sass.logError))
//
//    // .pipe($.sourcemaps.write('../sass.css.maps'))
//
//    // .pipe($.sourcemaps.write('../sass.css.maps', {
//    //    sourceMappingURL: function(file) {
//    //       // return 'https://aaa.com/' + file.relative + '.map';
//    //       return '../sass.css.maps/' + file.relative + '.map';
//    //    }
//    // }))
//
//     .pipe($.sourcemaps.write('../sass.css.maps', {
//       mapSources: function(sourcePath) {
//         // source paths are prefixed with '../src/'
//         return '../sass/' + sourcePath;
//       }
//     }))
//
//    // .pipe($.sourcemaps.write('.', {includeContent: false, sourceRoot: '../sass'}))
//    // .pipe($.sourcemaps.write('.'))
//    // .pipe($.sourcemaps.write())
//    .pipe(gulp.dest('site/assets/sass.css'));
// });
//
// gulp.task('sass:watch', function() {
//   gulp.watch('site/assets/sass/*.scss', ['sass']);
// });



// var sourcemaps = require('gulp-sourcemaps');

// gulp.task('sass', function () {
//  return gulp.src('./sass/**/*.scss')
//   .pipe(sourcemaps.init())
//   .pipe(sass().on('error', sass.logError))
//   .pipe(sourcemaps.write('./maps'))
//   .pipe(gulp.dest('./css'));
// });




// gulp.task('sass', function () {
//   return gulp.src('./sass/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });



// browserSync.init({
//   server: "./site"
// });
// browserSync.stream();

// // Static server
// gulp.task('browser-sync', function() {
//   browserSync.init({
//     server: {
//       baseDir: "./site"
//     }
//   });
// });



gulp.task('serve-sass', function() {
  console.log(pathSass_scss);
  return gulp.src(pathSass_scss)
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputstyle: 'compressed'}).on('error', $.sass.logError))
    // .pipe($.cssnano())       <<< minimizavimas veikia
    .pipe($.sourcemaps.write({
      mapSources: function(sourcePath) {
        return '../sass/' + sourcePath;
      }
    }))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(pathSass_css))
    .pipe(browserSync.stream());
});



















