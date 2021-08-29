
import { siteGlobals } from "./site-globals.js";

// GALIMA NAUDOTI:
// https://www.npmjs.com/package/html-include-element
// https://github.com/github/include-fragment-element/

////////////////////////////////////////////////////////////////////////////
//
//  #
//
/////////////////////////////////////////////////////////////////////////

/**
 * @USAGE:
 * <p>
 *   <a data-incHtmFleFrg href="tas.htm#anas">įterpiama pakrovimo metu</a>
 * </p>
 */

const moduleId = "incHtmFleFrg";
const targLinkParentClassName = moduleId + siteGlobals.addedByJsSign;

export function includeHtmlFileFragment() {

  $(`a[data-${moduleId}]`).each((idx, elm) => {
    // console.log(elm);
    // console.dir(elm);

    // link.protocol + link.hostname + link.pathname
    const fileUrl = elm.pathname;
    const hashId = elm.hash;

    const elmParent = elm.parentElement;
    elmParent.classList.add(targLinkParentClassName);
    elmParent.setAttribute("tabindex", "0");

    $("<div>")
      .insertAfter(elmParent)
      .load(fileUrl + " " + hashId, () => {});
  });

  const elmStyle = document.createElement("style");
  elmStyle.append(`
    :root {
      /*--clr: 120, 61%, 34%;*/
      --clrBase${targLinkParentClassName}: 266, 90%;
    }
    .${targLinkParentClassName} {
      background: hsl(var(--clrBase${targLinkParentClassName}), 35%, .25);
      border-radius: 15px;
      text-align: center;
      font-size: .5em;
      padding: .4em 0 .3em;
      transition: all .5s;
    }
    .${targLinkParentClassName}:is(:hover, :focus) {
      background: hsl(var(--clrBase${targLinkParentClassName}), 30%, .9);
      font-size: 1.2em;
    }

    .${targLinkParentClassName} a {
      color: hsl(var(--clrBase${targLinkParentClassName}), 30%, .8);
      text-decoration: none;
    }
    .${targLinkParentClassName}:is(:hover, :focus) a {
      background: none;
      color: hsl(var(--clrBase${targLinkParentClassName}), 95%, .9);
    }

    .${targLinkParentClassName}:is(:hover, :focus),
    .${targLinkParentClassName}:is(:hover, :focus) + * {
      outline: 4px dotted hsl(var(--clrBase${targLinkParentClassName}), 30%, 1);
      outline-offset: 4px;
    }
  `);
  document.head.appendChild(elmStyle);
}



// $(document.head).append(`<style>
//   :root {
//     /*--clr: 120, 61%, 34%;*/
//     --clr${targLinkParentClassName}: 204, 50%, 15%;
//   }
//
//   .${targLinkParentClassName} {
//     background: hsl(var(--clr${targLinkParentClassName}), .2);
//     border-radius: 15px;
//     text-align: center;
//     font-size: .8em;
//     padding: .3em;
//   }
//
//   .${targLinkParentClassName} a {
//     color: hsl(var(--clr${targLinkParentClassName}), 1);
//   }
//
//   .${targLinkParentClassName}:hover {
//   }
//
//   .${targLinkParentClassName}:is(:hover, :focus),
//   .${targLinkParentClassName}:is(:hover, :focus) + * {
//     outline: 2px dotted hsl(var(--clr${targLinkParentClassName}), 1);
//     outline-offset: 4px;
//   }
// </style>`);



// // const p = document.createElement("p").append("aaa");
// const p = document.createElement("p");
// p.append("aaa");
// document.body.appendChild(p);

// document.body.appendChild(
//   document.createElement("p")
// );



// document.head.appendChild(document.createElement("p").append(`aaa`));



// $(elm).append("div").load(fileUrl + " " + hashId);
// $("<div>").appendTo(elm).load(fileUrl + " " + hashId);
// const link = elm.querySelector("a");
// .prepend(elm.parentElement);
// .prepend("<i>zzz</i>");

// $.get(fileUrl, data => {
//   const frg = $(data).find(hashId).text();
//   console.log(frg);
// });



/*

.${targLinkParentClassName}:hover, .${targLinkParentClassName}:hover + * {
  outline: 2px dotted hsla(var(--clr), 1);
  outline-offset: 3px;
}


.${targLinkParentClassName}:is(:hover, :focus),
.${targLinkParentClassName}:is(:hover, :focus) + * {
  outline: 2px dotted hsla(var(--clr), 1);
  outline-offset: 3px;
}

.${targLinkParentClassName} + * {
  outline: 1px dotted red;
  outline-offset: 3px;
}
.${targLinkParentClassName}:hover, .${targLinkParentClassName}:hover + *,  {

*/



////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// <!--  <script>getHtmlFileFrg("css.module.grid-layout~big-test-demos-to-include.htm","#explicit-implicit-grid-variations")</script>-->
// <script>
// // aaaa("css.module.grid-layout~big-test-demos-to-include.htm","#explicit-implicit-grid-variations")
//
// // docReady((event) => {
// //   aaaa("css.module.grid-layout~big-test-demos-to-include.htm","#explicit-implicit-grid-variations")
// // });
//
// </script>
//
// <!--
// <div>
//   <div id="incExtFileFrg-explicit-implicit-grid-variations">
//     įterpiama pakrovimo metu iš — css.module.grid-layout~big-test-demos-to-include.htm #explicit-implicit-grid-variations</div>
//   <script>
//     $("#incExtFileFrg-explicit-implicit-grid-variations").load("css.module.grid-layout~big-test-demos-to-include.htm #incExtFileFrg-explicit-implicit-grid-variations");
//   </script>
// </div>
// -->

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

/*
<div>
  <div id=""></div>
  <script>
  $("#incExtFileFrg-explicit-implicit-grid-variations").load("css.module.grid-layout~big-test-demos-to-include.htm #incExtFileFrg-explicit-implicit-grid-variations");
  </script>
</div>
*/

// export function getHtmlFileFrg(fileUrl, frgId) {
//
//   // document.write(`<div id=""></div>`)
//   // $("#incExtFileFrg-explicit-implicit-grid-variations").load("css.module.grid-layout~big-test-demos-to-include.htm #incExtFileFrg-explicit-implicit-grid-variations");
//
//   // $(`*[data-incHtmlFileFrg] > a`).
//
//   $.get( fileUrl, data => {
//     // $( ".result" ).html( data );
//     alert( "getHtmlFileFrg() == " + data );
//   });
//
//
//   // $( "form" ).on( "submit", function( event ) {
//   //   event.preventDefault();
//   //   console.log( $( this ).serialize() );
//   // });
//   //
//   // $.get( "test.php", function( data ) {
//   //   alert( "Data Loaded: " + data );
//   // });
//   //
//   // $.get( "ajax/test.html", function( data ) {
//   //   $( ".result" ).html( data );
//   //   alert( "Load was performed." );
//   // });
//
// }
