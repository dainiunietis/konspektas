
// console.log("site/assets/js/component.collapse.js — BEGIN");

/*
// šitą galima padėti puslapyje, kad pasikrovus visi collapse'ai susi'collapse'intų:
$(function() {
  componentCollapse.hideAllSafe();
});
*/

// export async function componentCollapse_class(collapseBlockClass) {
export default function componentCollapse_class(collapseBlockClass) {

  // console.log("Component_collapse_savas_locdep() — new");

  // var jsClassHiddenFlag = "JS_GENER_CLASS_hiddenFlag";
  let this_ = this;
  let componentId = "component_collapse_savas_locdep";
  let collapseRootAll_dom;
  let collapseChildsHideAll_dom;

  let domInitCompleted = false;
  // this.domInitCompleted = false;

  let hideAllOnLoad = false;

  this.hideAllSafe = function() {
    if (domInitCompleted) {
      // console.log("Component_collapse_savas_locdep.hideAllSafe() \niš karto");
      this_.hideAll();
    }
    else {
      // console.log("Component_collapse_savas_locdep.hideAllSafe() \nhideAllOnLoad = true");
      hideAllOnLoad = true;
    }

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
    if (collapseRootAll_dom.length === 0) return;
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

    if ($(".side-fixed-panel.side-fixed-panel--right").length === 0) $('<div class="side-fixed-panel side-fixed-panel--right">').appendTo("body");
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

    // console.log("Component_collapse_savas_locdep() — DOM'o inicializacija baigta");
    domInitCompleted = true;
    if (hideAllOnLoad) this_.hideAll();
  };
}



// console.log("site/assets/js/component.collapse.js — END");
