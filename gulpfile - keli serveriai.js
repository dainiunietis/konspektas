
var browserSync = require("browser-sync");

var bs1 = browserSync.create("proxy1");
var bs2 = browserSync.create("proxy2");

bs1.init({
  proxy: "http://mylocal.dev",
  port: 3010,
  ui: {
    port: 3011
  }
});
bs2.init({
  proxy: "http://mylocal.dev",
  port: 3012,
  ui: {
    port: 3013
  }
});
























