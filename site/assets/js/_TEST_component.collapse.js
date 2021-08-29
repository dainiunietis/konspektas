
var aaa = 'agooo';

function Component_collapse_savas_locdep(collapseBlockClass) {

	// var jsClassHiddenFlag = "JS_GENER_CLASS_hiddenFlag";
	var this_ = this;
	var componentId = "component_collapse_savas_locdep";
	var collapseRootAll_dom;
	var collapseChildsHideAll_dom;

	this.hideAll = function() {
		collapseChildsHideAll_dom.hide();
		collapseRootAll_dom.data("component_collapse_hidden", "true");
	}

	this.showAll = function() {
		collapseChildsHideAll_dom.show();
		collapseRootAll_dom.data("component_collapse_hidden", "false");
	}

	//////////////////////////////////////////////////////////////////////////
	//
	//   Pradinė inicializacija, sukuriame pagrindinius DOM'o elementų kintamuosius (Nuo čia prasideda konstruktoriaus įvykdomas kodas, t. y. kai sukuriamas objekto kintamasis)
	//
	//////////////////////////////////////////////////////////////////////

	collapseRootAll_dom = $("." + collapseBlockClass);
	if (collapseRootAll_dom.length == 0) return;
	collapseChildsHideAll_dom = collapseRootAll_dom.children('*:nth-child(1n+2)');
	// console.log(collapseChildsHideAll_dom);

	//////////////////////////////////////////////////////////////////////////
	//
	//   Visiems collapse'ams prisega collapse'inį pliusą
	//
	//////////////////////////////////////////////////////////////////////

	$("<div>+</div>")
		.css({position: "absolute", top: "-4px", right: "3px", "font-size": "2em", "font-family": "Consolas", cursor: "pointer"})
		//.appendTo($('.collapse-savas-locdep > *:first-child'))
		// .appendTo($('.collapse-savas-locdep')) //prependTo()
		// .insertAfter($("." + collapseBlockClass + " > *:first-child"))
		// .appendTo($('section.Command').children().first())
		.insertAfter(collapseRootAll_dom.children(':first-child'))
		.click(function(event) {
			var collapseRoot = $(this).parent();
			var hideChilds = collapseRoot.children('*:nth-child(1n+3)');
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

	//////////////////////////////////////////////////////////////////////////
	//
	//   Sukuriame valdymo checkbox'ą ir padedame į .side-fixed-panel.side-fixed-panel--right
	//
	//////////////////////////////////////////////////////////////////////

	/*-----------------------------------------------------------------------------
	<div class="side-fixed-panel side-fixed-panel--right">
		<input type="checkbox" id="componentId + -checkbox"/>
		<label for="componentId + -checkbox">slėpti aprašymus</label>
	</div>
	-------------------------------------------------------------------------------*/
	if ($(".side-fixed-panel.side-fixed-panel--right").length == 0) $('<div class="side-fixed-panel side-fixed-panel--right">').appendTo("body");
	$(".side-fixed-panel.side-fixed-panel--right").append('<input type="checkbox" id="' + componentId + '-checkbox"/><label for="' + componentId + '-checkbox">slėpti collapse\'ų turinį</label>');
	// $('<div class="side-fixed-panel side-fixed-panel--right"><input type="checkbox" id="component-collapse-checkbox"/><label for="component-collapse-checkbox">slėpti aprašymus</label></div>').appendTo("body");

	//////////////////////////////////////////////////////////////////////////
	//
	//   prisegame valdymą checkbox'ui
	//
	//////////////////////////////////////////////////////////////////////

	$('#' + componentId + '-checkbox').change(function() {
		if ($(this).is(':checked')) {
			this_.hideAll();
		}
		else {
			this_.showAll();
		}
	});
}

//////////////////////////////////////////////////////////////////////////
//
//   Įvykdome pasikrovus puslapiui
//
//////////////////////////////////////////////////////////////////////

$(document).ready(function() {
	component_collapse_savas_locdep = new Component_collapse_savas_locdep("o-collapse-locdep");
});

/* šitą galima padėti puslapyje, kad pasikrovus visi collapse'ai susi'collapse'intų:

(document).ready(function() {
	component_collapse_savas_locdep.hideAll();
});

*/
