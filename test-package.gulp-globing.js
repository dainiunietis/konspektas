'use strict';

const { series, parallel, watch, src, dest } = require('gulp');
// const $ = require('gulp-load-plugins')();
const print = require('gulp-print').default;

function testGulpGlobing() {

  // const srcFiles = src(['site/assets/sass/*.scss','!site/assets/sass/*--*.scss','!site/assets/sass/*_*.scss']);
  // return src(['site/assets/sass/*.scss','!site/assets/sass/*--*.scss','!site/assets/sass/*_*.scss'])

  // src(['site/assets/sass{,.zm}/*color*.scss'])   // <<< abu daro tą patį
  // src(['site/assets/sass?(.zm)/*color*.scss'])      // <<<

  src(['**/*.js'])      // <<<

    // .pipe($.plumber())
    .pipe(print());

}

testGulpGlobing();







