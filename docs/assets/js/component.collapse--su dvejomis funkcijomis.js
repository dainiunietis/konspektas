
var jsClassHiddenFlag = "JS_GENER_CLASS_hiddenFlag";

///////////////////////////////////////////
//
//   Visiems collapse'ams prisega collapse'inį pliusą
//
///////////////////////////////////////

function component_collapse_initBlocks(collapseBlockClass) {
	$("<div>+</div>")
		.css({position: "absolute", top: "-4px", right: "3px", "font-size": "2em", "font-family": "Consolas", cursor: "pointer"})
		//.appendTo($('.collapse-savas-locdep > *:first-child'))
		// .appendTo($('.collapse-savas-locdep')) //prependTo()
		.insertAfter($("." + collapseBlockClass + " > *:first-child")) 
		// .appendTo($('section.Command').children().first())
		.click(function(event) {
			var collapseRoot = $(this).parent();
			var hideableTags = collapseRoot.children('*:nth-child(1n+3)');
			// hideableTags.css({border: "3px red dotted"});
			if (collapseRoot.hasClass(jsClassHiddenFlag))
				hideableTags.show();
			else
				hideableTags.hide();
			collapseRoot.toggleClass(jsClassHiddenFlag);
			// event.stopPropagation();
			// event.stopImmediatePropagation();
			return false; // šitas sustabdo event bubble
		});
}

///////////////////////////////////////////
//
//   
//
///////////////////////////////////////

function component_collapse_initGlobalControl(collapseBlockClass) {
	/*-----------------------------------------------------------------------------
	<div class="side-fixed-panel side-fixed-panel--right">
		<input type="checkbox" id="component-collapse-checkbox"/>
		<label for="component-collapse-checkbox">slėpti aprašymus</label>
	</div>
	-------------------------------------------------------------------------------*/
	//////
	/////  Sukuriame HTML'ą
	////
	if ($(".side-fixed-panel.side-fixed-panel--right").length == 0) $('<div class="side-fixed-panel side-fixed-panel--right">').appendTo("body");
	$(".side-fixed-panel.side-fixed-panel--right").append('<input type="checkbox" id="component-collapse-checkbox"/><label for="component-collapse-checkbox">slėpti aprašymus</label>');
	// $('<div class="side-fixed-panel side-fixed-panel--right"><input type="checkbox" id="component-collapse-checkbox"/><label for="component-collapse-checkbox">slėpti aprašymus</label></div>').appendTo("body");
	//////
	/////  prisegame valdymą checkbox'ui
	////
	$('#component-collapse-checkbox').change(function() {
		var collapseRoots = $("." + collapseBlockClass);
		var collapseHideable = collapseRoots.children('*:nth-child(1n+3)');
		if ($(this).is(':checked')) {
			collapseHideable.hide();
			collapseRoots.addClass(jsClassHiddenFlag);
		}
		else {
			collapseHideable.show();
			collapseRoots.removeClass(jsClassHiddenFlag);
		}
	});
}

///////////////////////////////////////////
//
//   
//
///////////////////////////////////////

$(document).ready(function(){
	component_collapse_initBlocks("collapse-savas-locdep");
	component_collapse_initGlobalControl("collapse-savas-locdep");
});






// var doHide = $(this).is(':checked');
// $('section.Command').each(function(){
// 	$(this).
// })

// $('#isAgeSelected').click(function () {
//     $("#txtAge").toggle(this.checked);
// });
// <input type="checkbox" id="isAgeSelected"/>
// <div id="txtAge" style="display:none">Age is something</div>​

// if ($('#isAgeSelected').is(':checked')) {
//     $("#txtAge").show();
// } else {
//     $("#txtAge").hide();
// }
