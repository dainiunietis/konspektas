
import { siteGlobals } from './site-globals.js';

export default function componentFigure(){
  //-- <figure class="figure--code">
  //-- 	<pre><code>var vardas = "Petras"</code></pre>
  //-- 	<figcaption>Kas tai</figcaption>
  //-- </figure>
  $("figure > pre").parent().addClass("figure--code" + siteGlobals.addedByJsSign)
}

