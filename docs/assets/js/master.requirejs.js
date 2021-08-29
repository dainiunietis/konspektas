
// alert("assets/js/master.requirejs.js");

////////////////////////////////////////////////////////////////////////////
////
///   CONFIGURATION OPTIONS
//
/////////////////////////////////////////////////////////////////////////

requirejs.config({
	baseUrl: 'assets/js',
	paths: {
    vendor: '../js.vendor',
    bower: '../bower_components'
    // jquery: '../bower_components/jquery/dist/jquery.min'
  },
  map: {
    '*': {
      'css': 'bower/require-css/css'
    }
  }
});

////////////////////////////////////////////////////////////////////////////
////
///   dreamweaver-design-time.js
//
/////////////////////////////////////////////////////////////////////////

// requirejs(["dreamweaver-design-time"], function() {
// });

////////////////////////////////////////////////////////////////////////////
////
///   component.figure
//
/////////////////////////////////////////////////////////////////////////

// requirejs(["component.figure"], function() {
//   // alert("pasikrovė ir įvykdytas: \nsite/assets/js/component.figure.js")
// });

////////////////////////////////////////////////////////////////////////////
////
///   Puslapio pavadinimą <h1> kopijuoti į <title>
//
/////////////////////////////////////////////////////////////////////////

// requirejs(["set-page-title"], function() {
// });

////////////////////////////////////////////////////////////////////////////
////
///   puslapio heading'ų turinio generavimas
//
/////////////////////////////////////////////////////////////////////////

// konspektas\docs\~jsApp.toc.ndabas-jquery-toc.html

// requirejs(["../../assets.~jsApp/node_modules/jquery.toc/jquery.toc.js"], () => {
//   $(() => {
//     $("#page-toc").toc({content: "body", headings: "h2, h3, h4, h5, h6"});
//
//     // $('.initiator').hover(function(e) {
//     //   $('.receiver').trigger(e.type);
//     // })
//
//     // $( "p" ).click(function( event ) {
//     //   alert( event.currentTarget === this ); // true
//     // });
//
//     // // generuoja hover'į ant kito tago
//     // // !!! deja su .trigger() sugeneruoti eventai neįtraukia CSS :hover !!!
//     // $("#page-toc li:has(ul) > a").hover((e) => {
//     //   const trgElm = e.currentTarget;
//     //   // console.log(trgElm);
//     //   // console.log($("ul", trgElm).get(0));
//     //   // console.log($("ul", trgElm).first());
//     //   console.log($("ul", $(trgElm).parent()).first());
//     //   $("ul", $(trgElm).parent()).first().trigger(e.type);
//     // });
//
//     // console.log($("#page-toc li").not("#page-toc li > ul"));
//     // $("#page-toc li").not("#page-toc li > ul")
//
//   });
// });

//-------------------------------------------------------------------------
// !!! deja neveikia su vienodais heading'ais !!!
//-------------------------------------------------------------------------

// requirejs(["vendor/jquery.tableofcontents-0.8.min"], function() {
//   // alert("pasikrovė ir įvykdytas: \nsite/assets/js.vendor/jquery.tableofcontents-0.8.min.js")
//   $(() => {
//     $(".c-sidePanel--toc > *").tableOfContents(null,{startLevel:2,depth:5})
//   });
// });

////////////////////////////////////////////////////////////////////////////
////
///   assets/js/images-enhance.js
//
/////////////////////////////////////////////////////////////////////////

// requirejs(["images"], function() {
//   // alert("pasikrovė ir įvykdytas: \nsite/assets/js/images-enhance.js")
// });

////////////////////////////////////////////////////////////////////////////
////
///   assets/js/advLinkHashTarget.js
//
/////////////////////////////////////////////////////////////////////////

// requirejs(["inkaru-indikacija"], function() {
// });

////////////////////////////////////////////////////////////////////////////
////
///   assets/js/component.collapse.js
//
/////////////////////////////////////////////////////////////////////////

// requirejs(["component.collapse"], function() {
// });

////////////////////////////////////////////////////////////////////////////
////
///
//
/////////////////////////////////////////////////////////////////////////

// requirejs(["sutkatu-suvestine"], function() {
//   // alert("pasikrovė ir įvykdytas: \nsite/assets/js/component.figure.js")
// });

// <script src="assets/js/sutkatu-suvestine.js"></script>

////////////////////////////////////////////////////////////////////////////
////
///   kodo formatavimas-spalvinimas
//
/////////////////////////////////////////////////////////////////////////

/**
 * # Formatavimas-spalvinimas su highlightjs.org
 *
 * ## Kaip įjungiamas formatavimas-spalvinimas
 *
 * https://highlightjs.org/usage/
 * https://highlightjs.org/static/demo/  <<< pasirinkti spalvinimo schemą
 *
 * <pre><code>
 *     prog. kalbą nustato: "it tries to detect the language automatically"
 * <pre><code class="html || lang-html || language-html">
 *     formatuoja su nurodyta prog. kalba
 * <pre><code class="nohighlight">
 *     neformatuoja
 */

// requirejs([
//   // "css!vendor/highlight-js/styles/agate",
//   // "css!vendor/highlight-js/styles/androidstudio",
//   // "css!vendor/highlight-js/styles/arduino-light",
//   // "css!vendor/highlight-js/styles/arta",
//   // "css!vendor/highlight-js/styles/ascetic",
//   // "css!vendor/highlight-js/styles/atelier-cave-dark",
//   // "css!vendor/highlight-js/styles/atelier-cave-light",
//   // "css!vendor/highlight-js/styles/atelier-dune-dark",
//   // "css!vendor/highlight-js/styles/atelier-dune-light",
//   // "css!vendor/highlight-js/styles/atelier-estuary-dark",
//   // "css!vendor/highlight-js/styles/atelier-estuary-light",
//   // "css!vendor/highlight-js/styles/atelier-forest-dark",
//   // "css!vendor/highlight-js/styles/atelier-forest-light",
//   // "css!vendor/highlight-js/styles/atelier-heath-dark",
//   // "css!vendor/highlight-js/styles/atelier-heath-light",
//   // "css!vendor/highlight-js/styles/atelier-lakeside-dark",
//   // "css!vendor/highlight-js/styles/atelier-lakeside-light",
//   // "css!vendor/highlight-js/styles/atelier-plateau-dark",
//   // "css!vendor/highlight-js/styles/atelier-plateau-light",
//   // "css!vendor/highlight-js/styles/atelier-savanna-dark",
//   // "css!vendor/highlight-js/styles/atelier-savanna-light",
//   // "css!vendor/highlight-js/styles/atelier-seaside-dark",
//   // "css!vendor/highlight-js/styles/atelier-seaside-light",
//   // "css!vendor/highlight-js/styles/atelier-sulphurpool-dark",
//   // "css!vendor/highlight-js/styles/atelier-sulphurpool-light",
//   // "css!vendor/highlight-js/styles/atom-one-dark",
//   // "css!vendor/highlight-js/styles/atom-one-light",
//   // "css!vendor/highlight-js/styles/brown-paper",
//   // "css!vendor/highlight-js/styles/codepen-embed",
//   // "css!vendor/highlight-js/styles/color-brewer",
//   // "css!vendor/highlight-js/styles/darcula",
//   // "css!vendor/highlight-js/styles/dark",
//   // "css!vendor/highlight-js/styles/darkula",
//   // "css!vendor/highlight-js/styles/default",
//   // "css!vendor/highlight-js/styles/docco",
//   // "css!vendor/highlight-js/styles/dracula",
//   // "css!vendor/highlight-js/styles/far",
//   // "css!vendor/highlight-js/styles/foundation",
//   // "css!vendor/highlight-js/styles/github",
//   // "css!vendor/highlight-js/styles/github-gist",
//   // "css!vendor/highlight-js/styles/googlecode",
//   // "css!vendor/highlight-js/styles/grayscale",
//   // "css!vendor/highlight-js/styles/gruvbox-dark",
//   // "css!vendor/highlight-js/styles/gruvbox-light",
//   // "css!vendor/highlight-js/styles/hybrid",
//   // "css!vendor/highlight-js/styles/hopscotch",
//   // "css!vendor/highlight-js/styles/idea",
//   // "css!vendor/highlight-js/styles/ir-black",
//   // "css!vendor/highlight-js/styles/kimbie.dark",
//   // "css!vendor/highlight-js/styles/kimbie.light",
//   // "css!vendor/highlight-js/styles/magula",
//   // "css!vendor/highlight-js/styles/mono-blue",
//   // "css!vendor/highlight-js/styles/monokai",
//   // "css!vendor/highlight-js/styles/monokai-sublime",
//   // "css!vendor/highlight-js/styles/obsidian",
//   // "css!vendor/highlight-js/styles/ocean",
//   // "css!vendor/highlight-js/styles/paraiso-dark",
//   // "css!vendor/highlight-js/styles/paraiso-light",
//   // "css!vendor/highlight-js/styles/pojoaque",
//   // "css!vendor/highlight-js/styles/purebasic",
//   // "css!vendor/highlight-js/styles/qtcreator_dark",
//   "css!vendor/highlight-js/styles/qtcreator_light",
//   // "css!vendor/highlight-js/styles/railscasts",
//   // "css!vendor/highlight-js/styles/rainbow",
//   // "css!vendor/highlight-js/styles/routeros",
//   // "css!vendor/highlight-js/styles/school-book",
//   // "css!vendor/highlight-js/styles/solarized-dark",
//   // "css!vendor/highlight-js/styles/solarized-light",
//   // "css!vendor/highlight-js/styles/sunburst",
//   // "css!vendor/highlight-js/styles/tomorrow",
//   // "css!vendor/highlight-js/styles/tomorrow-night",
//   // "css!vendor/highlight-js/styles/tomorrow-night-blue",
//   // "css!vendor/highlight-js/styles/tomorrow-night-bright",
//   // "css!vendor/highlight-js/styles/tomorrow-night-eighties",
//   // "css!vendor/highlight-js/styles/vs",
//   // "css!vendor/highlight-js/styles/vs2015",
//   // "css!vendor/highlight-js/styles/xcode",
//   // "css!vendor/highlight-js/styles/xt256",
//   // "css!vendor/highlight-js/styles/zenburn",
//   "vendor/highlight-js/highlight.pack"], function(){
//   $(document).ready(function(){
//     // hljs.initHighlighting();
//
//     // hljs.configure({useBR: true});
//     $(document).ready(function() {
//       $('pre code').each(function(i, block) {
//         hljs.highlightBlock(block);
//       });
//     });
//   });
// });

//--- iš bower_components nesuveikė ---
// requirejs(["css!bower/highlight-js/src/styles/color-brewer", "bower/highlight-js/src/highlight"], function() {
//   alert("pasikrovė ir įvykdytas: \nbower/highlight-js/src/highlight")
//   hljs.initHighlightingOnLoad();
// });

/**
 * # Formatavimas-spalvinimas su prism.js
 */

//----------- iš bower_components nesuveikė ----------------
// requirejs(["css!bower/prism/themes/prism-twilight", "bower/prism/prism"], function() {
//   // alert("pasikrovė ir įvykdytas: \nsite/assets/js/component.figure.js")
// });

// requirejs(["css!vendor/prism/prism", "vendor/prism/prism"], function() {
//   // alert("pasikrovė ir įvykdytas: \nsite/assets/js/component.figure.js")
// });








