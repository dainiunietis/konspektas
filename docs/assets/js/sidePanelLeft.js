
import { siteGlobals } from "./site-globals.js";
import { escapeRegExp } from './utils.regexp.js';

//-----------------------------------------------------------------------
//
//-----------------------------------------------------------------------

////////////////////////////////////////////////////////////////////////////
//
//  # sidePanelLeft_pageToc_filteringInit()
//
/////////////////////////////////////////////////////////////////////////

export function sidePanelLeft_closePanelOnClick() {
  $('.c-sidePanel--left a').on("click", (event) => {
    const panelShowClass = "c-sidePanel--left-show" + siteGlobals.addedByJsSign;
    $(".c-sidePanel--left").toggleClass(panelShowClass);
  });
}

////////////////////////////////////////////////////////////////////////////
//
//  # sidePanelLeft_pageToc_filteringInit()
//
/////////////////////////////////////////////////////////////////////////

export function sidePanelLeft_pageToc_filteringInit() {
  $('.c-sidePanel__toc').prepend('<input type="text" />');

  // $('.c-sidePanel__toc > input').on('keyup', function(event) {
// $('.c-sidePanel__toc > input').on('change', function(event) { // Note that change will only fire when the input element has lost focus.
  $('.c-sidePanel__toc > input').on('input', function(event) {
    event.stopPropagation();

    // console.log("event =", event);
    // console.log("this =", this);
    // console.log(`$(this).val() =`, $(this).val());

    let filterStr = $(this).val().toLowerCase();
    console.log(`filterStr = "%s"`, filterStr);
    // console.log($('#page-toc li > a').not(`:contains('${filterStr}')`).get());

    $('#page-toc a').each((ind, elm) => {
      // console.log("elm =", elm);
      const $a = $(elm);
      const $aTxt = $a.text();
      // console.log("$a.text() =", $a.text());

      if (! filterStr) {
        $a.html($aTxt);
        $a.show();
        return;
      }

      if ($aTxt.toLowerCase().indexOf(filterStr) > -1) {

        $a.html($aTxt.replaceAll(
          RegExp(escapeRegExp(filterStr), "gi")
          //, `<span class="page-toc-filterStr">$&</span>`)
          , `<span style="padding: .05em .1em .17em; margin: 0 -.1em; background: hsla(330,100%,50%,.3); color: var(--colorScheme-1HD2);">$&</span>`)
          // , `<span style="padding: .09em .1em .21em; margin: 0 -.1em; background: hsla(230,100%,40%,.4);">$&</span>`)
          // , `<span style="padding: .1em 0 .15em; background: var(--colorScheme-2H);">$&</span>`)
          // , `<span style="padding: .1em 0 .15em; background: var(--colorScheme-1HL2);">$&</span>`)
        );

        //--- veikia, tik neranda skirtingų case'ų
        // $a.html($aTxt.replaceAll(filterStr, `<span class="page-toc-filterStr">${filterStr}</span>`));

        // $a.html($aTxt.replace(RegExp(escapeRegExp(filterStr), "g"), '<span class="page-toc-filterStr">$1</span>'))

        // if (filterStr.length > 2) {
        // }

        // $a.show();
        $a.removeAttr("style");

        // $("h2:contains('cow')").html(function(_, html) {
        //   return html.replace(/(cow)/g, '<span class="smallcaps">$1</span>');
        // });

        // $( "div.demo-container" ).html(function() {
        //   var emphasis = "<em>" + $( "p" ).length + " paragraphs!</em>";
        //   return "<p>All new content for " + emphasis + "</p>";
        // });

      }
      else {
        // $a.hide();
        $a.css({
          'content-visibility': 'hidden',
          // height: 0,
          padding: 0,
        });
      }
    });

    //-----------------------------------------------------------------------
    // !!! VEIKIANTIS VARIANTAS !!! su case sensitive, nes:
    // :contains() — The text must have matching case to be selected
    //-----------------------------------------------------------------------
    // let filterStr = $(this).val();
    // $('#page-toc li > a')
    //   .not(`:contains('${filterStr}')`).hide().end()
    //   .filter(`:contains('${filterStr}')`).show();
    //-----------------------------------------------------------------------

    // var value = $(element).val().toLowerCase();
    // if ($(this).text().toLowerCase().search(value) > -1)

    // $('#theList > li:not(:contains(' + value + '))').hide();
    // $('#theList > li:contains(' + value + ')').show();

    // $('#page-toc li').show();
    // $('#page-toc li').not(':contains('+filterStr+')').hide();
  });
}

////////////////////////////////////////////////////////////////////////////
//
//  # show-hide .c-sidePanel--left on keydown
//
/////////////////////////////////////////////////////////////////////////

export function sidePanelLeft_showHideHotkey() {
  $("body").on("keydown", (event) => {
    // console.log(`event.which == ${event.which}`);
    const panelShowClass = "c-sidePanel--left-show" + siteGlobals.addedByJsSign;
    // 27 == Esc
    if (event.which === 27) {
      // console.log(`va va va`);
      $(".c-sidePanel--left").toggleClass(panelShowClass);
      //--- sufokusuojamas TOC filtravimo input'as
      if ($('.' + panelShowClass).length) {
        $('.c-sidePanel__toc > input').focus();
      }
      else {
        $('.c-sidePanel__toc > input').blur();
      }
    }
  });
}

////////////////////////////////////////////////////////////////////////////
//
//  # show-hide .c-sidePanel--left on keydown
//
/////////////////////////////////////////////////////////////////////////

export function sidePanelLeft_indicateVisible_init() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const classVisible = "c-navTree__visible" + siteGlobals.addedByJsSign;
      const selector = `.c-sidePanel__toc a[href="#${CSS.escape(id)}"]`;
      const elm = document.querySelector(selector);
      if (entry.intersectionRatio > 0) {
        // console.group("IntersectionObserver");
        // console.log("entry.target.id: " + id);
        // console.log("entry.intersectionRatio: " + entry.intersectionRatio);
        // console.groupEnd();
        elm.classList.add(classVisible);
      } else {
        elm.classList.remove(classVisible);
      }

      //------------------------------------------------------------------------------
      // VEIKIANTIS variantas
      //------------------------------------------------------------------------------
      // if (entry.intersectionRatio > 0) {
      //   document.querySelector(`.c-sidePanel__toc a[href="#${id}"]`)
      //     .setAttribute('style', 'color: hsl(255, 100%, 45%, 1); outline: solid 1px hsl(255, 100%, 45%, .2); outline-offset: -2px');
      // } else {
      //   document.querySelector(`.c-sidePanel__toc a[href="#${id}"]`).removeAttribute('style');
      // }
      //------------------------------------------------------------------------------

    });
  });

  document.querySelectorAll('h2, h3, h4, h5, h6').forEach((heading) => {
    observer.observe(heading);
  });
}

// window.addEventListener('DOMContentLoaded', () => {
//
//   const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       const id = entry.target.getAttribute('id');
//       if (entry.intersectionRatio > 0) {
//         document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
//       } else {
//         document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
//       }
//     });
//   });
//
//   // Track all sections that have an `id` applied
//   document.querySelectorAll('section[id]').forEach((section) => {
//     observer.observe(section);
//   });
//
// });






