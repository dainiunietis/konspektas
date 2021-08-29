

if (hashDecoded != "") {
  let targetElem;
  const match = /^\(([^)]+)\)(.+)$/.exec(hashDecoded);
  console.log("match", match);
  const trgJqSel = match[1]
  const trgTxt = match[2]

  if (match) {
    //
    // užklausos-adreso hašas: #(h|h1..h6)tekstas-suselektintame-tage
    //
    var sel = match[1] == 'h' ? ':header' : match[1];
    targetElem = $(sel).filter(function(){ //+ ":contains('" + match[2] + "')"
      txt = $(this).text();
      // console.log('>>> "' + txt + '"');
      // txt = txt.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
      txt = txt.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
      // console.log('>>> "' + txt + '"');
      // console.log(' ');
      return txt == match[2];
    });
  }
  else if (hashDecoded.substr(0,1) == '$') {
    //
    // užklausos-adreso hašas: #$jquery-selekšonas
    //
    var jqhash = hashDecoded.substring(1);
    targetElem = $(jqhash);
  }
  else {
    //
    // galbūt užklausos-adreso hašas: #tekstas
    //
    try {
      targetElem = $("#" + hashDecoded);
    }
    catch (e) {
      // console.log('Blogas hašo targetas-ID: ' + hashDecoded);
      //alert('Blogas hašo targetas-ID: ' + hash)
    }
    if (targetElem) {
      // skrūlinimas daromas defaultiškai, o su CSS pažymi elementą pakrovus dokumentą,
      // kurio id nurodytas užklausoje, pvz.: kazkas.htm#naujienos
      targetElem.eq(0).css(markTargetTagCss);
      doScroll = 0;
    }
  }
  targetElem.eq(0).css(markTargetTagCss);
  if (doScroll) $(document).scrollTop(targetElem.eq(0).offset().top - 10);
  // if (doScroll) $('html').scrollTop(targetElem.eq(0).offset().top - 10);
}


//-------------------------------------------------------------------------
// tik pakrovus failą nuskrūlina ir pažymi adreso heše sutargintą tagą
//-------------------------------------------------------------------------
// UŽKLAUSOS HAŠO SINTAKSĖ Nr. 1 SUPAPRASTINTA headin'ė:
//    bendrai:
//       užklausos hašas:
//          #(jquery-selekšonas)tekstas-suselektintame-tage
//       atitinka jQuery:
//          $("jquery-selekšonas:contains('tekstas-suselektintame-tage')")
//    konkrečiai:
//       užklausos hašas:
//          #(h)kažkoks tekstas
//       atitinka jQuery:
//          $(":header:contains('kažkoks tekstas')")
//    ką daro:
//       nuskrūlina ir pažymi pirmą suselektintą tagą su nurodytu tekstu
//    pvz.:
//       failo hešas:
//           #(h2)Išvados
//       faile yra:
//           <h2>Išvados</h2>
//       prie jo turi nuskrūlinti ir pažymėti
//
// UŽKLAUSOS HAŠO SINTAKSĖ Nr. 2 PILNAS jQuery'as:
//       #$jquery-selekšonas
//    atitinka jQuery:
//       $
//
//    ką daro:
//-------------------------------------------------------------------------



export function scrollToTargetFromUrlHash() {
  const markTargetTagCss = {
    // outline: 'dotted 3px hsl(330deg 62% 50%)',
    // outline: 'solid 5px hsla(90,100%,50%,.3)',
    // outline: 'dotted 3px hsla(0,0%,0%,0.2)',
    // outline: 'dotted 2px hsla(240, 100%, 50%, 0.3)',

    // outline: 'dotted 2px hsla(330, 100%, 50%, 0.3)',
    // 'outline-offset': '-2px'

    outline: 'hsl(330deg 100% 50% / 70%) solid 2px',
    'outline-offset': '-2px',

    // boxShadow: '0px 0px 15px 3px hsl(330deg 62% 50%)',
    // background: 'hsla(180, 100%, 50%, 0.03)'
  };
  let doScroll = 1;
  let scrollTrgElm;
  // var specSep = "~";
  // var sepPos = hash.indexOf(specSep);

  console.group("scrollToTargetFromUrlHash()");

  const urlPath = document.location.pathname;
  console.log("urlPath", urlPath);

  const urlFile = urlPath.match(/[^/]+$/)[0];
  console.log("urlFile", urlFile);

  const urlHash = document.location.hash;
  console.log("urlHash", urlHash);
  if (! urlHash) return;

  const hashEncoded = urlHash.substring(1);
  console.log("hashEncoded = " + hashEncoded);
  const hashDecoded = decodeURI(hashEncoded);
  console.log("hashDecoded = " + hashDecoded);

  //-------------------------------------------------------------------------
  // užklausos-adreso hašas: #(h|<css-selector>)<tekstas-suselektintame-tage>
  //-------------------------------------------------------------------------

  // const match = /^\(([^)]+)\)(.+)$/.exec(hashDecoded);
  let reRes = hashDecoded.match(/^\(([^)]+)\)(.+)$/);
  console.log("reRes", reRes);

  if (reRes) {
    const hashSel = reRes[1];
    const hashTxt = reRes[2];

    // if (hashSel === 'h') let JqSel = 'h1, h2, h3, h4, h5, h6';
    const trgJqSel = (hashSel === 'h') ? 'h1, h2, h3, h4, h5, h6' : hashSel;
    console.log("trgJqSel", trgJqSel);

    console.group("scrollTrgElm filter");
    scrollTrgElm = $(trgJqSel).filter((index, elm) => {
      console.log("elm", elm);
      let txt = $(elm).text();
      console.log('txt == "' + txt + '"');
      // txt = txt.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
      txt = txt.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
      console.log('txt == "' + txt + '"');
      return txt === hashTxt;
    });
    console.groupEnd();
  }

  //-------------------------------------------------------------------------
  // užklausos-adreso hašas: #$<jquery-selekšonas>
  //-------------------------------------------------------------------------

  if (hashDecoded.substring(0,1) === '$') {
    const hashJqSel = hashDecoded.substring(1);
    console.log("hashJqSel ==", hashJqSel);
    scrollTrgElm = $(hashJqSel);
  }

  //-------------------------------------------------------------------------
  //
  //-------------------------------------------------------------------------

  if (scrollTrgElm.length >= 1) {
    console.log(scrollTrgElm);
    scrollTrgElm = scrollTrgElm.eq(0);

    $("." + targetCssClass).removeClass(targetCssClass);

    // scrollTrgElm.css(markTargetTagCss);
    scrollTrgElm.addClass(targetCssClass);

    if (doScroll) {
      $(document).scrollTop(scrollTrgElm.offset().top - 10);
      // if (doScroll) $('html').scrollTop(scrollTrgElm.eq(0).offset().top - 10);

      // scrollTrgElm.get(0).scrollIntoView();
    }
  }

  console.groupEnd();

  // else {
  //   //
  //   // galbūt užklausos-adreso hašas: #tekstas
  //   //
  //   try {
  //     scrollTrgElm = $("#" + hashDecoded);
  //   }
  //   catch (e) {
  //     // console.log('Blogas hašo targetas-ID: ' + hashDecoded);
  //     //alert('Blogas hašo targetas-ID: ' + hash)
  //   }
  //
  //   if (scrollTrgElm) {
  //     // skrūlinimas daromas defaultiškai, o su CSS pažymi elementą pakrovus dokumentą,
  //     // kurio id nurodytas užklausoje, pvz.: kazkas.htm#naujienos
  //     scrollTrgElm.eq(0).css(markTargetTagCss);
  //     doScroll = 0;
  //   }
  // }
}




  $(`a[href^="#("]`)
    .filter((index, elm) => {
      // return $(this).attr('href').search(/^#\([^)]+\)$/);

      console.log("elm", elm);
      console.log("test", /^#\([^)]+\)\s*$/.test( $(elm).attr('href') ));

      return /^#\([^)]+\)\s*$/.test( $(elm).attr('href') );
    })
    .click((event) => {
      console.group("Click Handler");

      console.log("this", this);
      // console.log("event", event);
      console.log("event.target", event.target);

      event.stopPropagation();

      const lnkElm = $(event.target);
      // lnkElm.css('background-color','red')
      const lnkHrf = lnkElm.attr('href');
      const lnkTxt = lnkElm.text();

      // const match = /^([^#]*)#\((\w+)\)$/.exec(href);
      const match = /^#\(([^)]+)\)\s*$/.exec(lnkHrf);
      console.log("match", match);
      const trgSel = match[1];

      console.log("trgSel", trgSel);


      document.location.hash =



      const trgElm = $(trgSel).filter((ind, elm) => {
        // console.log("this", this);
        // console.log("elm", elm);
        return $(elm).text() === lnkTxt;
      });

      console.log("trgElm", trgElm);

      // trgElm.get(0).scrollIntoView();
      // trgElm.css(markTargetTagCss);
    });





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
      console.group("Click Handler");

      // console.log("this", this);
      // console.log("event", event);
      // console.log("event.target", event.target);

      event.stopPropagation();

      const lnkElm = event.target;
      console.log("lnkElm ==", lnkElm);
      console.log("lnkElm.pathname ==", lnkElm.pathname);
      console.log("lnkElm.hash ==", lnkElm.hash);
      console.log("lnkElm.href ==", lnkElm.href);
      const $lnkElm = $(lnkElm);
      // $lnkElm.css('background-color','red')

      const lnkHrf = $lnkElm.attr('href');
      console.log("lnkHrf ==", lnkHrf);

      const lnkTxt = $lnkElm.text().match(/\s*(\S+)/)[1];
      console.log("lnkTxt ==", lnkTxt);

      // const match = /^([^#]*)#\((\w+)\)$/.exec(href);
      const reRes = /^(.*?)\??#(\([^)]+\))\s*$/.exec(lnkHrf);
      console.log("reRes", reRes);

      if (reRes) {
        const lnkHrf_path = reRes[1];
        console.log("lnkHrf_path", lnkHrf_path);
        const lnkHrf_hash = reRes[2];
        console.log("lnkHrf_hash", lnkHrf_hash);

        // document.location.hash = lnkHrf_hash;
        // document.location.hash = lnkElm.hash + lnkTxt;
        // document.location.pathname = lnkHrf_path;

        // document.location.href = lnkElm.href + lnkTxt;
        document.location.assign(lnkElm.href + lnkTxt);
      }

      console.groupEnd();
      return false;
    })











