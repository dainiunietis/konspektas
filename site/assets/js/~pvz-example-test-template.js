
// import { dom_stringToFragment } from './utils.dom';

//---------------------------------------------------------------------------

const htmlKadDarytuTOC = `
<script src="assets/node_modules/jquery/dist/jquery.min.js"></script>
<script data-main="assets/js/master.requirejs.js" src="assets/js.vendor/requirejs/require.js"></script>
<script type="module" src="assets/js/master.js"></script>
<div class="c-sidePanel c-sidePanel--left">
  <nav class="c-navTree">
    <ul>
      <li><a href="index_.html">pradžia </a></li>
    </ul>
  </nav>
  <!--<hr>-->
  <nav class="c-sidePanel__toc c-navTree c-navTree--numbered" aria-label="page table of content">
    <ul id="page-toc"></ul>
  </nav>
</div>
`;

// const htmlKadDarytuTOC = `<script src="assets/js/temp-1.js"></script>`;

//---------------------------------------------------------------------------

// !!! VEIKIA !!! js failai VYKDOMI

document.write(htmlKadDarytuTOC);

//---------------------------------------------------------------------------

// !!! VEIKIA, js failai NEvykdomi !!!

// let tpl = document.createElement('template');
// tpl.innerHTML = htmlKadDarytuTOC;
// // console.log(tpl.content);
// document.body.prepend(tpl.content);
//
// // document.body.prepend(dom_stringToFragment(htmlKadDarytuTOC));

//---------------------------------------------------------------------------

// !!! VEIKIA, js failai NEvykdomi !!!

// // document.body.insertAdjacentHTML('afterbegin', htmlKadDarytuTOC);
// document.body.insertAdjacentHTML('afterbegin', "<p>aaa</p>");

//---------------------------------------------------------------------------







// const divElm = document.createElement("div");
// divElm.innerHTML = htmlKadDarytuTOC;


// console.log(domFragment.childNodes);
// element.insertAdjacentHTML(position, text);
// document.body.appendChild(domFragment);


// var tpl = document.createElement('template');
// tpl.innerHTML = '<tr><td>Hello</td><td>world</td></tr>';
// document.querySelector('table').appendChild(tpl.content);
