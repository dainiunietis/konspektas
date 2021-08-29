'use strict';

const sasszm_src      = ['site/assets/sass.szm/*.scss', '!site/assets/sass.szm/*--*.scss', '!site/assets/sass.szm/*_*.scss'];

// const sasszm_srcWatch = ['site/assets/sass?(.test.szm)/*.scss','!site/assets/sass?(.test.szm)/*--*.scss'];
// const sasszm_srcWatch = [...sasszm_src, '../libs/frontend/site/assets/sass/*.scss', '!../libs/frontend/site/assets/sass/*--*.scss'];

const sasszm_dest     =  'site/assets/sass.szm';

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





