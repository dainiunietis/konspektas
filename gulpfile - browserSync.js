
// Calling .create() means you get a unique reference & allows
// you to create multiple servers or proxies.

// create an unnamed instance
var bs = require("browser-sync").create();

// create a named instance
var bs = require("browser-sync").create('My server');

// create multiple
var bs1 = require("browser-sync").create('Server 1');
var bs2 = require("browser-sync").create('Server 2');

//================================================================================

// https://github.com/BrowserSync/browser-sync/issues/646

gulp.task('browserSync', function() {
  browserSync.init({
    open: 'external',
    host: 'project.dev',
    proxy: 'project.dev', // or project.dev/app/
    port: 3000
  });
});

// options: {
//     watchTask: true,
//     open: 'external',
//     host: 'example.dev',
//     proxy: "example.dev",
//     port: 3000,
// }

// For Mamp, the below settings work:
// Default Apache port: 80
//   open: 'external',
//   host: 'domain.dev',
//   proxy: "domain.dev",
//   port: 8080,

// options: {
//   open: 'external',
//     host: 'mydoman.com',
//     proxy: {
//     target: "https:mydomain.com:8989",
//   },
//   port: 3000
// }








