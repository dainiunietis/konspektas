
// console.log("assets/js/master.js — BEGIN");

import { siteGlobals } from './site-globals.js';
import { docReady } from './utils.events.js';
import { loadCssFile } from './utils.load-files.js';
import { escapeRegExp } from './utils.regexp.js';
// import { timeoutWhenVarExists } from './utils.timeout.js';
import { includeHtmlFileFragment } from './include-html-file-fragment.js';

////////////////////////////////////////////////////////////////////////////
//
//  # include-html-file-fragment.js
//
/////////////////////////////////////////////////////////////////////////

$(() => {
  includeHtmlFileFragment();
});

////////////////////////////////////////////////////////////////////////////
//
//  # <del tabindex="0">
//
/////////////////////////////////////////////////////////////////////////

$(() => {
  $('del:not([tabindex])').attr('tabindex', 0);
});

////////////////////////////////////////////////////////////////////////////
//
//  # set-page-title.js
//
/////////////////////////////////////////////////////////////////////////

import { setPageTitle } from './set-page-title.js';

$(() => {
  setPageTitle();
});

////////////////////////////////////////////////////////////////////////////
//
//  # advLinkHashTarget.js
//
/////////////////////////////////////////////////////////////////////////

import { segtiClickHandlerLokaliemsLinkams, scrollToTargetFromUrlHash } from './advLinkHashTarget.js';

$(() => {
  segtiClickHandlerLokaliemsLinkams();
  scrollToTargetFromUrlHash();
});

$(window).bind('hashchange', () => {
  scrollToTargetFromUrlHash();
});

////////////////////////////////////////////////////////////////////////////
//
//  # .c-sidePanel--left
//
/////////////////////////////////////////////////////////////////////////

//-----------------------------------------------------------------------
//
//-----------------------------------------------------------------------

import jqueryToc from '../js.vendor/jquery.toc.js';

jqueryToc();

$(() => {
  $("#page-toc").toc({content: "body", headings: "h2, h3, h4, h5, h6"});
});

//-----------------------------------------------------------------------
//
//-----------------------------------------------------------------------

import {
  sidePanelLeft_pageToc_filteringInit,
  sidePanelLeft_showHideHotkey,
  sidePanelLeft_closePanelOnClick,
  sidePanelLeft_indicateVisible_init
} from './sidePanelLeft.js';

$(() => {
  sidePanelLeft_closePanelOnClick();
  sidePanelLeft_pageToc_filteringInit();
  sidePanelLeft_showHideHotkey();
  sidePanelLeft_indicateVisible_init();
});

////////////////////////////////////////////////////////////////////////////
//
//  #
//
/////////////////////////////////////////////////////////////////////////

import imagesEnhance from './images-enhance.js';

$(() => {
  imagesEnhance();
});

////////////////////////////////////////////////////////////////////////////
//
//  #
//
/////////////////////////////////////////////////////////////////////////

import sutkatuSuvestine from './sutkatu-suvestine.js';

$(() => {
  sutkatuSuvestine();
});

////////////////////////////////////////////////////////////////////////////
//
//  # component.collapse.js
//
/////////////////////////////////////////////////////////////////////////

import componentCollapse_class from './component.collapse.js';

//------------------------------------------ objekto kintamojo sukūrimas

// variantas: export-import
// export const componentCollapse = new componentCollapse_class("o-collapse-locdep");

// variantas: sukuriant globalų kintamajį
window.componentCollapse = new componentCollapse_class("o-collapse-locdep");

//----------------------------------------------------------- DOM initas

$(function() {
  componentCollapse.initDOM();
});

////////////////////////////////////////////////////////////////////////////
//
//  # component.collapse-2.js
//
/////////////////////////////////////////////////////////////////////////

import { cpntCollapse_init } from './component.collapse-2.js';

$(() => {
  cpntCollapse_init();
});

////////////////////////////////////////////////////////////////////////////
//
//  #
//
/////////////////////////////////////////////////////////////////////////

import componentFigure from './component.figure.js';

$(() => {
  componentFigure();
});

////////////////////////////////////////////////////////////////////////////
//
//  # add-css-class.js
//
/////////////////////////////////////////////////////////////////////////

import addCssClass from './add-css-class.js';

docReady((event) => {
  addCssClass();
});

////////////////////////////////////////////////////////////////////////////
//
//  # show-page-tags.js
//
/////////////////////////////////////////////////////////////////////////

import { showDfn } from './show-page-tags.js';

$(() => {
  showDfn();
});

////////////////////////////////////////////////////////////////////////////
//
//  #
//
/////////////////////////////////////////////////////////////////////////

import { addBtnViewportFixFit } from '../sass.szm/components.pvs.js'

docReady((evt) => {
  addBtnViewportFixFit()
})

////////////////////////////////////////////////////////////////////////////
//
//  -# tocbot
//
/////////////////////////////////////////////////////////////////////////

// import { Tocbot } from '../node_modules/tocbot/dist/tocbot.min.js';
//
// docReady((event) => {
//
//   loadCssFile('assets/node_modules/tocbot/dist/tocbot.css');
//
//   // $("#Lay-ControlPanel-Toc2").tableOfContents(null,{startLevel:2,depth:5})
//
//   Tocbot.init({
//     // Where to render the table of contents.
//     tocSelector: '#Lay-ControlPanel-Toc2',
//     // Where to grab the headings to build the table of contents.
//     contentSelector: 'body',
//     // Which headings to grab inside of the contentSelector element.
//     headingSelector: 'h2, h3, h4, h5, h6',
//     // For headings inside relative or absolute positioned containers within content.
//     hasInnerContainers: true,
//   });
// });

////////////////////////////////////////////////////////////////////////////
//
//  -# firstandthird/toc
//
/////////////////////////////////////////////////////////////////////////

// import toc from '../node_modules/@firstandthird/toc/dist/toc.js';
//
// $('#Lay-ControlPanel-Toc2').toc({
//   'selectors': 'h1,h2,h3', //elements to use as headings
//   'container': 'body', //element to find all selectors in
//   'smoothScrolling': true, //enable or disable smooth scrolling on click
//   'prefix': 'toc', //prefix for anchor tags and class names
//   'onHighlight': function(el) {}, //called when a new section is highlighted
//   'highlightOnScroll': true, //add class to heading that is currently in focus
//   'highlightOffset': 100, //offset to trigger the next headline
//   'anchorName': function(i, heading, prefix) { //custom function for anchor name
//     return prefix+i;
//   },
//   'headerText': function(i, heading, $heading) { //custom function building the header-item text
//     return $heading.text();
//   },
//   'itemClass': function(i, heading, $heading, prefix) { // custom function for item class
//     return $heading[0].tagName.toLowerCase();
//   }
// });













//----------------------------------------------------------------------
// console.log("assets/js/master.js — END");
