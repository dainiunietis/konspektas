
////////////////////////////////////////////////////////////////////////////
////
///   CONFIGURATION OPTIONS
//
/////////////////////////////////////////////////////////////////////////

/*-----------------------------   PVZ   ------------------------------
 require.config({
 baseUrl: "/another/path",
 paths: {
 "some": "some/v1.0"
 },
 waitSeconds: 15
 });

 require( ["some/module", "my/module", "a.js", "b.js"],
 function(someModule,    myModule) {
 //This function will be called when all the dependencies
 //listed above are loaded. Note that this function could
 //be called before the page is loaded.
 //This callback is optional.
 }
 );
 ---------------------------------------------------------------------
 requirejs.config({
 //except, if the module ID starts with "app",
 //load it from the js/app directory. paths
 //config is relative to the baseUrl, and
 //never includes a ".js" extension since
 //the paths config could be for a directory.
 paths: {
 app: '../app'
 }
 });
 ---------------------------------------------------------------------*/

// requirejs.config({
//   baseUrl: 'js/lib',
//   paths: {
//     // the left side is the module ID,
//     // the right side is the path to
//     // the jQuery file, relative to baseUrl.
//     // Also, the path should NOT include
//     // the '.js' file extension. This example
//     // is using jQuery 1.9.0 located at
//     // js/lib/jquery-1.9.0.js, relative to
//     // the HTML page.
//     jquery: 'jquery-1.9.0'
//   }
// });

////////////////////////////////////////////////////////////////////////////
////
///   HELP PVZ
//
/////////////////////////////////////////////////////////////////////////

/*-----------------------------   PVZ   ------------------------------
 requirejs(["helper/util"], function(util) {
 //This function is called when scripts/helper/util.js is loaded.
 //If util.js calls define(), then this function is not fired until
 //util's dependencies have loaded, and the util argument will hold
 //the module value for "helper/util".
 });
 ---------------------------------------------------------------------*/

// requirejs(["_TEST"]); // veikia
////////////////////////////////////////////////////////////////////////
/////// abu veikia default'iškai be requirejs.config > baseUrl keitimo
// requirejs(["assets/js/_TEST.js"]);
// requirejs(["../js/_TEST"]);
////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////
////
///   puslapio heading'ų turinio generavimas
//
/////////////////////////////////////////////////////////////////////////

// load: 'http://common-resources.local/_js/_libs/jquery/plugins/toc/jquery.tableofcontents-0.8.min.js',
// load: '../common-resources/_js/jquery.tableofcontents-0.8.min.js',
// load: 'file:///D:/Dropbox/Public/konspektas/common-resources/_js/jquery.tableofcontents-0.8.min.js',
// D:\Dropbox\Public\konspektas\_common-resources\_js
// yepnope({
// 	load: '/_js/vendors/jquery.tableofcontents-0.8.min.js',
// 	complete: function() {
// 		$("#Lay-ControlPanel-Toc2").tableOfContents(null,{startLevel:2,depth:5})
// 	}
// });

// alert('veikia "_assets/js/master.requirejs.js"');
// alert('"_assets/js/master.requirejs.js" \n  requirejs.baseUrl == ' + requirejs.baseUrl);

// requirejs(["../js.vendor/jquery.tableofcontents-0.8.min"], function() {

// $(document).ready(function(){
// 	$("#Lay-ControlPanel-Toc2").tableOfContents(null,{startLevel:2,depth:5})
// });


// });




// //--------------------------------------------------------------------------
// // kartais atnaujinus puslapį kodas neformatuojamas
// //--------------------------------------------------------------------------
// // $(document).ready(function(){
// // color-brewer solarized-light dark mono-blue tomorrow
// requirejs(["css!vendor/highlight-js/styles/atelier-heath-light", "vendor/highlight-js/highlight.pack"], function(){
//   // alert("pasikrovė ir įvykdytas: \nbower/highlight-js/src/highlight");
//   // console.log(hljs);
//
//   // hljs.initHighlightingOnLoad();
//   $(document).ready(function(){
//     // alert("$(document).ready()")
//     hljs.initHighlighting();
//   });
//
//   // setTimeout(function(){
//   //   console.error(hljs);
//   //   hljs.initHighlightingOnLoad();
//   // }, 200);
//
// });
// // });
// //--------------------------------------------------------------------------


















