
//////////////////////////////////////////////////////////////////////////////////
//
//   *.css pakrovimas su JS — savi vienetiniai
//
//////////////////////////////////////////////////////////////////////////////

//---------------------- VEIKIANTIS variantas su kintamaisiais ir kiek ilgesnis

// let link  = document.createElement('link');
// link.rel  = 'stylesheet';
// link.type = 'text/css';
// link.href = "../assets/sass/master.css";
// link.onload = function() {
//  alert("Pasikrovė:\n../assets/sass/master.css")
// }
// document.getElementsByTagName('head')[0].appendChild(link);

//---------------------- VEIKIANTIS variantas be kintamųjų ir trumpesnis

// document.getElementsByTagName('head')[0].appendChild(
//   Object.assign(document.createElement('link'), {rel: "stylesheet", type: "text/css", href: "../assets/sass/master.css"})
// );

//////////////////////////////////////////////////////////////////////////////////
//
//  # *.css pakrovimas su JS
//
//////////////////////////////////////////////////////////////////////////////

// function loadCssFile(href, callback){
export function loadCssFile(href) {

  // avoid duplicates
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].href == href) {
      return;
    }
  }

  let head = document.getElementsByTagName('head')[0];

  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  link.media = "screen,print"; // all

  // Loaded successfully
  link.onload = function () {
    console.log('sėkmingai pakrautas-prijungtas — ' + href);
  };
  // if (callback) {
  //   link.onload = function () {
  //     callback()
  //   }
  // }

  // Loading failed
  link.onerror = function () {
    console.log('nepakrautas-neprijungtas — ' + href);
  };

  head.appendChild(link);
}

//////////////////////////////////////////////////////////////////////////////////
//
//  # *.js pakrovimas su JS
//
//////////////////////////////////////////////////////////////////////////////

// <script src="assets/node_modules/jquery/dist/jquery.min.js"></script>
// <script data-main="assets/js/master.requirejs.js" src="assets/js.vendor/requirejs/require.js"></script>
// <script type="module" src="assets/js/master.js"></script>

export function loadJsFile(src) {

  // avoid duplicates
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].src == src) {
      return;
    }
  }

  let head = document.getElementsByTagName('head')[0];

  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.src = src;
  link.media = "screen,print"; // all

  // Loaded successfully
  link.onload = function () {
    console.log('sėkmingai pakrautas-prijungtas — ' + src);
  };
  // if (callback) {
  //   link.onload = function () {
  //     callback()
  //   }
  // }

  // Loading failed
  link.onerror = function () {
    console.log('nepakrautas-neprijungtas — ' + src);
  };

  head.appendChild(link);
}

//////////////////////////////////////////////////////////////////////////////////
//
//  #
//
//////////////////////////////////////////////////////////////////////////////

