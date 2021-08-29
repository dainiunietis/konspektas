'use strict';

// https://github.com/thecodercoder/frontend-boilerplate

// @USAGE:
// HTML:
//   <link rel="stylesheet" href="dist/style.css?cb=1572492103778">

const { src, dest, watch, series, parallel } = require('gulp');
var replace = require('gulp-replace');

// Cachebust
function cacheBustTask(){
  var cbString = new Date().getTime();
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}










