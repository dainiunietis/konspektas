
// alert("assets/js/add-css-class.js");

import { siteGlobals } from './site-globals.js';

export default function addCssClass() {
  //----------------------------------------------------------------------
  // .figure--dl
  // figure > figcaption + dl
  //----------------------------------------------------------------------

  // const elmfigure = document.querySelectorAll("figure");
  const DlsInFig = document.querySelectorAll("figure > figcaption:first-child + dl, figure > figcaption:first-child + div > dl");
  for (let elm of DlsInFig) {
    //-- use the classList API to remove and add classes
    // div.classList.remove("foo");
    // div.classList.add("anotherclass");
    elm.closest('figure').classList.add("figure--dl" + siteGlobals.addedByJsSign);
  }

  //----------------------------------------------------------------------
  // .blockquote--citeSource
  // blockquote > p:last-child > a
  //----------------------------------------------------------------------

  const bqs = document.querySelectorAll("blockquote");
  for (let bq of bqs) {
    // console.log(bq)
    // console.dir(bq)
    // console.info(bq)
    // if (bq.matches('blockquote > p:last-child > a[href]:only-child')) {
    const lastPonlyChildA = bq.querySelector('blockquote > p:last-child > a[href]:only-child');
    if (lastPonlyChildA) {
      // console.info(bq)
      // console.info(lastPonlyChildA)
      // console.info(lastPonlyChildA.parentElement)

      let yraTextNodeNonEmpty = false;
      for (let lastP of lastPonlyChildA.parentElement.childNodes) {
        if (lastP.nodeType === Node.TEXT_NODE && lastP.nodeValue.trim().length > 0) {
          // console.log("yra tekstinis node'as ir nėra vien tik whitespace'ai")
          // console.info(lastP)
          yraTextNodeNonEmpty = true;
        }
      }
      if (yraTextNodeNonEmpty) continue

      // const node0 = lastPonlyChildA.parentElement.childNodes[0];
      //
      // // element.nodeValue.trim().length != 0
      // if (node0.nodeType === Node.TEXT_NODE && node0.nodeValue.trim().length > 0) {
      //   console.log("pirmas node'as yra tekstinis ir nėra whitespace'ai")
      //   continue;
      // }
      //
      // const node1 = lastPonlyChildA.parentElement.childNodes[1];
      //
      // if (node1.nodeType === Node.TEXT_NODE && node1.nodeValue.trim().length > 0) {
      //   console.log("antras node'as yra tekstinis ir nėra whitespace'ai")
      //   continue;
      // }
      //
      // const node2 = lastPonlyChildA.parentElement.childNodes[2];
      //
      // if (node2.nodeType === Node.TEXT_NODE && node2.nodeValue.trim().length > 0) {
      //   console.log("antras node'as yra tekstinis ir nėra whitespace'ai")
      //   continue;
      // }

      bq.classList.add("blockquote--citeSource" + siteGlobals.addedByJsSign);
    }
  }
}





