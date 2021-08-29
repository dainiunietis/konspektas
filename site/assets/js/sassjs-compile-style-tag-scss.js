
// import { Sass } from '../node_modules/sass.js/dist/sass.js';
// import { siteGlobals } from './site-globals.js';
// import { docReady } from './utils.events.js';
// import { loadCssFile } from './utils.load-files.js';
// import { escapeRegExp } from './utils.regexp.js';
// import { timeoutWhenVarExists } from './utils.timeout.js';

////////////////////////////////////////////////////////////////////////////
//
//  #
//
/////////////////////////////////////////////////////////////////////////

/**
 * @VEIKIMAS:
 *  - paimamas pirmasis <style type="text/scss">, jo turinys su'compile'inamas
 *    į CSS, tas CSS prijugiamas prie HTML dokumento per į <head> pridėtą <style> tagą
 *
 *  - tago <style type="text/scss"> naršyklė net nebando pritaikyti dėl nežinomo type="text/scss"
 *
 *  @USAGE:
 *    <script src="assets/node_modules/sass.js/dist/sass.js"></script>
 *    <script type="module">
 *      import { sassjsCompileStyleTagScss } from './assets/js/sassjs-compile-style-tag-scss.js';
 *      sassjsCompileStyleTagScss();
 *    </script>
 *
 */

export function sassjsCompileStyleTagScss() {
  const sass = new Sass();

  const scssSource = document.querySelector("style[type='text/scss']").innerText;
  const scssSource_innerHTML = document.querySelector("style[type='text/scss']").innerHTML;
  const scssSource_textContent = document.querySelector("style[type='text/scss']").textContent;
  console.log("scssSource = ", scssSource);
  console.log("scssSource_innerHTML = ", scssSource_innerHTML);
  console.log("scssSource_textContent = ", scssSource_textContent);

  // let cssSource;
  sass.compile(scssSource, function(cssSource) {
    // cssSource = result;
    console.log("cssSource = ", cssSource);
    document.head.appendChild(document.createElement('style')).textContent = cssSource.text;
  });
}



