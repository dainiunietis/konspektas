
console.log("docs/assets/js/component.collapse--SENAS.js — BEGIN");

function Component_collapse_savas_locdep(collapseBlockClass) {

  console.log("Component_collapse_savas_locdep — new");

	// var jsClassHiddenFlag = "JS_GENER_CLASS_hiddenFlag";
	let this_ = this;
	let componentId = "component_collapse_savas_locdep";
	let collapseRootAll_dom;
	let collapseChildsHideAll_dom;

	let domInitCompleted = false;
	// this.domInitCompleted = false;

	this.hideAllSafe = function() {

    console.log("hideAllSafe()" + domInitCompleted);

    // if (domInitCompleted) {
    //   this_.hideAll();
    // }
    // else {
    //   let callback = function() {
    //     if (domInitCompleted) {
    //       console.log("component_collapse_savas_locdep —— jau yra");
    //       this_.hideAll();
    //     }
    //     else {
    //       console.log("component_collapse_savas_locdep —— dar nėra");
    //       setTimeout(function() {callback()}, 500);
    //     }
    //   };
    //   callback();
    // }

  };

	this.hideAll = function() {
    collapseChildsHideAll_dom.hide();
    collapseRootAll_dom.data("component_collapse_hidden", "true");
	};

	this.showAll = function() {
		collapseChildsHideAll_dom.show();
		collapseRootAll_dom.data("component_collapse_hidden", "false");
	};

  this.initDOM = function() {

    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // Pradinė inicializacija, sukuriame pagrindinius DOM'o elementų kintamuosius
    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    collapseRootAll_dom = $("." + collapseBlockClass);
    if (collapseRootAll_dom.length == 0) return;
    collapseChildsHideAll_dom = collapseRootAll_dom.children('*:nth-child(1n+2)');
    // console.log(collapseChildsHideAll_dom);

    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // Visiems collapse'ams prisega collapse'inį pliusą
    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    $("<div>+</div>")
      .css({position: "absolute", top: "-4px", right: "3px", "font-size": "1.7em", "font-family": "Consolas", cursor: "pointer"})
      //.appendTo($('.collapse-savas-locdep > *:first-child'))
      // .appendTo($('.collapse-savas-locdep')) //prependTo()
      // .insertAfter($("." + collapseBlockClass + " > *:first-child"))
      // .appendTo($('section.Command').children().first())
      .insertAfter(collapseRootAll_dom.children(':first-child'))
      .click(function(event) {
        let collapseRoot = $(this).parent();
        let hideChilds = collapseRoot.children('*:nth-child(1n+3)');
        // console.log(collapseChildsHideAll_dom);
        // hideChilds.css({border: "3px red dotted"});
        if (collapseRoot.data("component_collapse_hidden") == "true")	{
          hideChilds.show();
          collapseRoot.data("component_collapse_hidden", "false");
        }
        else {
          hideChilds.hide();
          collapseRoot.data("component_collapse_hidden", "true");
        }
        return false; // šitas sustabdo event bubble
      });

    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // Sukuriame valdymo checkbox'ą ir padedame į .side-fixed-panel.side-fixed-panel--right
    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    // <div class="side-fixed-panel side-fixed-panel--right">
    //   <input type="checkbox" id="componentId + -checkbox"/>
    //   <label for="componentId + -checkbox">slėpti aprašymus</label>
    // </div>

    if ($(".side-fixed-panel.side-fixed-panel--right").length == 0) $('<div class="side-fixed-panel side-fixed-panel--right">').appendTo("body");
    $(".side-fixed-panel.side-fixed-panel--right").append('<input type="checkbox" id="' + componentId + '-checkbox"/><label for="' + componentId + '-checkbox">slėpti collapse\'ų turinį</label>');
    // $('<div class="side-fixed-panel side-fixed-panel--right"><input type="checkbox" id="component-collapse-checkbox"/><label for="component-collapse-checkbox">slėpti aprašymus</label></div>').appendTo("body");

    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // prisegame valdymą checkbox'ui
    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    $('#' + componentId + '-checkbox').change(function() {
      if ($(this).is(':checked')) {
        this_.hideAll();
      }
      else {
        this_.showAll();
      }
    });

    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // fiksuojame, kad DOM'o inicializacija baigta
    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    domInitCompleted = true;
  };
}

//////////////////////////////////////////////////////////////////////////
//
//   objekto instance'o sukūrimas
//
//////////////////////////////////////////////////////////////////////

// component_collapse_savas_locdep = new Component_collapse_savas_locdep("o-collapse-locdep");

//////////////////////////////////////////////////////////////////////////
//
//   Įvykdome pasikrovus puslapiui
//
//////////////////////////////////////////////////////////////////////

//------------------------------------------------------------------------
// sprendimo variantas: plain JavaScript — the callback will not be executed if the event has already fired
//------------------------------------------------------------------------

// document.addEventListener("DOMContentLoaded", function(){
//   component_collapse_savas_locdep = new Component_collapse_savas_locdep("o-collapse-locdep");
// });

//------------------------------------------------------------------------
// sprendimo variantas: plain JavaScript — to make sure the callback is always run
//------------------------------------------------------------------------

// var component_collapse_savas_locdep_callback = function() {
//   console.log("callback");
//   component_collapse_savas_locdep = new Component_collapse_savas_locdep("o-collapse-locdep");
// };
//
// if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
//   console.log("aaa");
//   component_collapse_savas_locdep_callback();
// } else {
//   console.log("bbb");
//   document.addEventListener("DOMContentLoaded", component_collapse_savas_locdep_callback);
// }

//------------------------------------------------------------------------
// sprendimo variantas: jQuery virš v3.0
//------------------------------------------------------------------------

$(function() {
	// component_collapse_savas_locdep.initDOM();
});

//------------------------------------------------------------------------
// sprendimo variantas: jQuery virš v3.0 — DOM and all assets have loaded
//------------------------------------------------------------------------

// $(window).on("load", function(){
//   component_collapse_savas_locdep.initDOM();
// });

//------------------------------------------------------------------------
// sprendimo variantas: jQuery iki v3.0 -- NENAUDOTI
//------------------------------------------------------------------------

// $(document).ready(function() {
// 	component_collapse_savas_locdep = new Component_collapse_savas_locdep("o-collapse-locdep");
// });

//////////////////////////////////////////////////////////////////////////
//
//   šitą galima padėti puslapyje, kad pasikrovus visi collapse'ai susi'collapse'intų:
//
//////////////////////////////////////////////////////////////////////

/*
http://konspektas.local/js.event-page-ready-dom-loaded_pvz.htm

$(function() {
  component_collapse_savas_locdep.hideAllSafe();
});

document.addEventListener("DOMContentLoaded", function(){
  component_collapse_savas_locdep.hideAllSafe();
});

*/


console.log("docs/assets/js/component.collapse--SENAS.js — END");




