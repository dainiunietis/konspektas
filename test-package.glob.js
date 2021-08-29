'use strict';

let glob = require("glob");

// glob('site/?(test.szm)/*aaa*.{html,php}', function (err, files) {
// glob('site/?(test.szm)/*aaa*.{htm?(l),php,txt}', function (err, files) {
// glob('site/{,test.szm/}*aaa*.{htm?(l),php,txt}', function (err, files) {
glob('site/{,test.szm/}*.{html,php}', function (err, files) {
// glob('site/*.{htm?(l), php}', function (err, files) {
  if (err) {
    console.log(err);
  } else {
    // a list of paths to javaScript files in the current working directory
    console.log(files);
  }
});

// // options is optional
// glob("**/*.js", options, function (er, files) {
//   console.log(files)
//
//   // files is an array of filenames.
//   // If the `nonull` option is set, and nothing
//   // was found, then files is ["**/*.js"]
//   // er is an error object or null.
// });


