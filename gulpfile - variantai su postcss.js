















// gulp.task('styles', function(){
//   /*add this*/
//   var processors = [autoprefixer, cssnano];

//   gulp.src(['src/css/*.scss'])
//     .pipe(plumber({ errorHandler: function (error) { console.log(error.message); this.emit('end'); }}))
//     .pipe(sass())
//     //.pipe(autoprefixer('last 2 versions')) /*remove*/
//     .pipe(postcss(processors)) /*add*/
//     .pipe(gulp.dest('assets/css/'))
//     .pipe(rename({suffix: '.min'}))
//     // .pipe(minifycss()) /*remove*/
//     .pipe(gulp.dest('assets/css/'))
//     .pipe(browserSync.reload({stream:true}))
// });

