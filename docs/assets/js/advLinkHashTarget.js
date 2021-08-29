
import { siteGlobals } from "./site-globals.js";

const targetCssClass = 'pseCls-target' + siteGlobals.addedByJsSign;

//-------------------------------------------------------------------------
// sega klikinį event'ą linkams, kuriems reikia jų tekstą pridėti prie hašo
//-------------------------------------------------------------------------
// pvz. faile yra:
//   <h2>Išvados</h2>
// ir tame pačiame faile yra:
//   <a href="#(h2)">Išvados</a>
// paklikinus šį linką nuskrūlins ir pažymės tą heading'ą
//-------------------------------------------------------------------------

export function segtiClickHandlerLokaliemsLinkams() {
  // console.group("segtiClickHandlerLokaliemsLinkams()");
  // document.location.hash = "aaa"

  $(` a[href*="#("] `)
    .filter(` a[href$=")"] `)
    // .filter((index, elm) => {
    //   console.log("elm ==", elm);
    //
    //   const lnkHrf = $(elm).attr('href');
    //   console.log("lnkHrf ==", lnkHrf);
    //
    //   // const res = /^#\([^)]+\)\s*$/.test( lnkHrf );
    //   const res = /#\([^)]+\)\s*$/.test( lnkHrf );
    //   console.log("res ==", res);
    //
    //   return res;
    //   // return $(this).attr('href').search(/^#\([^)]+\)$/);
    // })
    .click((event) => {
      event.stopPropagation();

      console.group("Click Handler");

      const lnkElm = event.target;
      console.log("lnkElm =", lnkElm);
      console.log("lnkElm.pathname =", lnkElm.pathname);
      console.log("lnkElm.hash =", lnkElm.hash);
      console.log("lnkElm.href =", lnkElm.href);

      // const lnkTxt = $lnkElm.text().match(/^\s*(\S.+?\S)\s*$/)[1];
      // const lnkTxt = $lnkElm.text().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      const lnkTxt = $(lnkElm).text().trim();
      // const lnkTxt = $lnkElm.text();

      console.log('$(lnkElm).text() = "' + $(lnkElm).text() + '"');
      console.log('lnkTxt = "' + lnkTxt + '"');

      document.location.assign(lnkElm.href + lnkTxt);

      console.groupEnd();
      return false;
    });

  // console.groupEnd();
}

/**
 *  tik pakrovus failą nuskrūlina ir pažymi adreso heše sutargintą tagą
 *  nuskrūlina ir pažymi pirmą suselektintą tagą su nurodytu tekstu
 *
 *  ---------------------------------------------------
 *  UŽKLAUSOS HAŠO SINTAKSĖ Nr. 1 su CSS selector'iais:
 *  ---------------------------------------------------
 *    @bendrai:
 *      užklausos hašas:
 *        #(hx|<css-selector>)<tekstas-suselektintame-tage>
 *          hx == h1, h2, h3, h4, h5, h6
 *          h  <<< SENASIS
 *      atitinka jQuery:
 *         $("jquery-selekšonas:contains('tekstas-suselektintame-tage')")
 *    @konkrečiai:
 *      užklausos hašas:
 *        #(h)kažkoks tekstas
 *      atitinka jQuery:
 *        $(":header:contains('kažkoks tekstas')")
 *    @pvz.:
 *       failo hešas:
 *           #(h2)Išvados
 *       faile yra:
 *           <h2>Išvados</h2>
 *       prie jo turi nuskrūlinti ir pažymėti
 *  -----------------------------------------------
 *  UŽKLAUSOS HAŠO SINTAKSĖ Nr. 2 PILNAS jQuery'as:
 *  -----------------------------------------------
 *    @bendrai:
 *      #$<jquery-sentence>
 *    @pvz.:
 *      #$("dt").filter(":contains('specifikacija')")
 *      #$("dt").eq(3)
 *     atitinka jQuery:
 *        $
 * -------------------------------------------------------------------------
 */

export function scrollToTargetFromUrlHash() {
  'use strict';
  const urlHash = document.location.hash;
  console.log('urlHash == "' + urlHash + '"');
  if (! urlHash) return;

  let scrollTrgElm;

  console.group("scrollToTargetFromUrlHash()");

  const urlPath = document.location.pathname;
  console.log("urlPath", urlPath);

  const urlFile = urlPath.match(/[^/]+$/)[0];
  console.log("urlFile", urlFile);

  const hashEncoded = urlHash.substring(1);
  console.log("hashEncoded = " + hashEncoded);
  const hashDecoded = decodeURI(hashEncoded);
  console.log("hashDecoded = " + hashDecoded);

  //-------------------------------------------------------------------------
  // užklausos-adreso hašas: #(hx|<css-selector>)<visas-tekstas-suselektintame-tage>
  //-------------------------------------------------------------------------

  // let reRes = hashDecoded.match(/^\(([^)]+)\)(.+)$/);
  // let reRes = hashDecoded.match(/^\(([^)]+)\)\s*([^\s]+)\s*$/);
  let reRes = hashDecoded.match(/^\(([^)]+)\)(.+)$/);
  console.log("reRes", reRes);

  if (reRes) {
    console.warn("užklausos-adreso hašas: #(hx|<css-selector>)<visas-tekstas-suselektintame-tage>");
    const hashSel = reRes[1];
    const hashTxt = reRes[2].trim();

    // const trgJqSel = (hashSel === 'h') ? 'h1, h2, h3, h4, h5, h6' : hashSel;
    const trgJqSel = (/^hx?$/.test(hashSel)) ? 'h1, h2, h3, h4, h5, h6' : hashSel;
    console.log("trgJqSel", trgJqSel);

    console.groupCollapsed("scrollTrgElm filter");

    scrollTrgElm = $(trgJqSel).filter((index, elm) => {
      console.log("elm", elm);
      let txt = $(elm).text();
      // console.log('txt == "' + txt + '"');
      // txt = txt.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
      // console.log('txt == "' + txt + '"');
      return txt === hashTxt;
    });

    console.groupEnd();
  }

  //-------------------------------------------------------------------------
  // užklausos-adreso hašas: #$<jquery-selekšonas>
  //-------------------------------------------------------------------------

  // testavimui url hash:
  // #$("dt").filter(":contains('specifikacija')")

  else if (hashDecoded.substring(0,1) === '$') {
    console.warn("užklausos-adreso hašas: #$<jquery-selekšonas>");
    // const hashJq = hashDecoded.substring(1);
    const hashJq = hashDecoded;
    console.log("hashJq ==", hashJq);
    scrollTrgElm = eval(hashJq); // VEIKIA !!!
    // scrollTrgElm = jQuery.globalEval(hashJq); // NEVEIKIA !!!
    // scrollTrgElm = new Function(hashJq)();      // NEVEIKIA !!!
  }

  //-------------------------------------------------------------------------
  //
  //-------------------------------------------------------------------------

  $("." + targetCssClass).removeClass(targetCssClass);
  console.log("scrollTrgElm == ", scrollTrgElm);

  if (scrollTrgElm && scrollTrgElm.length >= 1) {
    scrollTrgElm = scrollTrgElm.eq(0);
    scrollTrgElm.addClass(targetCssClass);

    $(document).scrollTop(scrollTrgElm.offset().top - 10);
    // scrollTrgElm.get(0).scrollIntoView();
  }

  console.groupEnd();
}


