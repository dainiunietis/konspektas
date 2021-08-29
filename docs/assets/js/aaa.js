
function kazkas2() {

}

kazkas2()

////////////////////////////////////////////////////////////////////////////
////
///   INKARŲ INDIKACIJA
//
/////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  var filename = document.location.pathname.match(/[^/]+$/)[0];
  var hash = document.location.hash.substring(1);
  // var markColor =
  var markTargetTagCss = {
    outline: 'dashed 2px hsla(180, 100%, 50%, 1)',
    background: 'hsla(180, 100%, 50%, 0.06)'
  }; //dashed dashed double
  //	var specSep = "~";
  // var sepPos = hash.indexOf(specSep);
	/**
	 * tik pakrovus failą nuskrūlina ir pažymi adreso heše sutargintą tagą
	 *
	 * UŽKLAUSOS HAŠO SINTAKSĖ Nr. 1 SUPAPRASTINTA headin'ė:
	 *    bendrai:
	 *       užklausos hašas:
	 *          #(jquery-selekšonas)tekstas-suselektintame-tage
	 *       atitinka jQuery:
	 *          $("jquery-selekšonas:contains('tekstas-suselektintame-tage')")
	 *    konkrečiai:
	 *       užklausos hašas:
	 *          #(h)kažkoks tekstas
	 *       atitinka jQuery:
	 *          $(":header:contains('kažkoks tekstas')")
	 *    ką daro:
	 *       nuskrūlina ir pažymi pirmą suselektintą tagą su nurodytu tekstu
	 *    pvz.:
	 *       failo hešas:
	 *           #(h2)Išvados
	 *       faile yra:
	 *           <h2>Išvados</h2>
	 *       prie jo turi nuskrūlinti ir pažymėti
	 *
	 * UŽKLAUSOS HAŠO SINTAKSĖ Nr. 2 PILNAS jQuery'as:
	 *       #$jquery-selekšonas
	 *    atitinka jQuery:
	 *       $
	 *
	 *    ką daro:
	 *
	 */
  var doScroll = 1, txt;
  if (hash != "") {
    var targetElem;
    var match = /^\(([^\)]+)\)(.+)$/.exec(hash);
    if (match) {
      //
      // užklausos-adreso hašas: #(h|h1..h6)tekstas-suselektintame-tage
      //
      var sel = match[1] == 'h' ? ':header' : match[1];
      targetElem = $(sel).filter(function () { //+ ":contains('" + match[2] + "')"
        txt = $(this).text();
        console.log('>>> "' + txt + '"');
        // txt = txt.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
        txt = txt.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
        console.log('>>> "' + txt + '"');
        console.log(' ');
        return txt == match[2];
      });
    }
    else if (hash.substr(0, 1) == '$') {
      //
      // užklausos-adreso hašas: #$jquery-selekšonas
      //
      var jqhash = hash.substring(1);
      targetElem = $(jqhash);
    }
    else {
      //
      // galbūt užklausos-adreso hašas: #tekstas
      //
      try {
        targetElem = $("#" + hash);
      }
      catch (e) {
        console.log('Blogas hašo targetas-ID: ' + hash);
        //alert('Blogas hašo targetas-ID: ' + hash)
      }
      if (targetElem) {
        // skrūlinimas daromas defaultiškai, o su CSS pažymi elementą pakrovus dokumentą, kurio id nurodytas užklausoje, pvz.: kazkas.htm#naujienos
        targetElem.eq(0).css(markTargetTagCss);
        doScroll = 0;
      }
    }
    targetElem.eq(0).css(markTargetTagCss);
    if (doScroll) $(document).scrollTop(targetElem.eq(0).offset().top - 10);
    // if (doScroll) $('html').scrollTop(targetElem.eq(0).offset().top - 10);
  }
	/**
	 *  sega klikinį event'ą lokaliems linkams su hašu, pvz.:
	 *  faile yra:
	 *    <h2>Išvados</h2>
	 *  ir tame pačiame faile yra:
	 *    <a href="#(h2)">Išvados</a>
	 *  paklikinus šį linką nuskrūlins ir pažymės tą heading'ą
	 */
  $('a[href*="#"]').click(function () {
    var elm = $(this);
    // elm.css('background-color','red')
    var href = elm.attr('href');
    var match = /^([^#]*)#\((\w+)\)$/.exec(href);
    if (match) {
      if (match[1] == '' || match[1] == filename) {
        var linkText = $(this).text();
        var $targElm = $(match[2]).filter(function () {
          if ($(this).text() == linkText) return true;
        }).eq(0).css(markTargetTagCss)[0];
        $targElm.scrollIntoView();
        //$targElm.scrollTop($targElm.scrollTop());
      }
    }
    else {
      $("[id='" + href.substring(1) + "']").css(markTargetTagCss);
    }
  });
	/**
	 *  keičiamas linkų į kitus failus su hašu ir spec. žymėjimu atributas href, pvz.:
	 *  faile kazkas.htm yra:
	 *      <h2>Išvados</h2>
	 *  norint iš kito failo sutarginti šį heading'ą, jame turi būti linkas:
	 *      <a href="../../_assets/js/kazkas.htm#(h2)">Išvados</a>
	 *  skriptas jį turi pakeisti:
	 *      <a href="../../_assets/js/kazkas.htm#(h2)Išvados">Išvados</a>
	 */
  $('a[href*="#"]').map(function (index, domElm) {
    var elm = $(this);
    var href = elm.attr('href');
    var match = /^([^#]+)#\([^#]+\)$/.exec(href);
    if (match && match[1] != filename) {
      elm.attr('href', match[0] + elm.text())
    }
  });
});




