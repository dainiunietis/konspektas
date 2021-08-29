'use strict';

const sasszm_src      = ['docs/assets/sass.szm/*.scss', '!docs/assets/sass.szm/*--*.scss', '!docs/assets/sass.szm/*_*.scss'];

// const sasszm_srcWatch = ['docs/assets/sass?(.test.szm)/*.scss','!docs/assets/sass?(.test.szm)/*--*.scss'];
// const sasszm_srcWatch = [...sasszm_src, '../libs/frontend/docs/assets/sass/*.scss', '!../libs/frontend/docs/assets/sass/*--*.scss'];

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





