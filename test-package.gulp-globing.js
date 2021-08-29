'use strict';

const { series, parallel, watch, src, dest } = require('gulp');
// const $ = require('gulp-load-plugins')();
const print = require('gulp-print').default;

function testGulpGlobing() {

  // const srcFiles = src(['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss','!docs/assets/sass/*_*.scss']);
  // return src(['docs/assets/sass/*.scss','!docs/assets/sass/*--*.scss','!docs/assets/sass/*_*.scss'])

  // src(['docs/assets/sass{,.zm}/*color*.scss'])   // <<< abu daro tą patį
  // src(['docs/assets/sass?(.zm)/*color*.scss'])      // <<<

  src(['**/*.js'])      // <<<

    // .pipe($.plumber())
    .pipe(print());

}

testGulpGlobing();







