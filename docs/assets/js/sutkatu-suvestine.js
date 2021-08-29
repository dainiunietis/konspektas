
export default function sutkatuSuvestine() {

  var SecComBodyTagsHidden = "JSgenerClass_SectionCommandBodyTagsHidden";

  // <p id="command_BHjumpToBracket" class="doc-command"><kbd>ctrl+[</kbd> / <kbd>ctrl+]</kbd></p>
  // $('p>kbd').parent().addClass('doc-command');
  // $('p>kbd').parent().filter(function(){
  // 	if ($(this).hasClass('Note')) return false;
  // 	else return true;
  // }).addClass('doc-command');


  // <p><a href="#command_packBH_jumpToBracket"><kbd>ctrl+[</kbd> / <kbd>ctrl+]</kbd></a></p>
  $('a[href^="#editCmd-"]').each(function() {
    var secId = $(this).attr('href'); //.substr(1)
    // console.log($(secId))
    var targetSecClone = $(secId).clone().attr('id','').addClass('c-editor-command--link');
    // console.log(targetSecClone)
    var firstElemInTarget = targetSecClone.children().first();
    // console.log(firstElemInTarget)
    firstElemInTarget.after($('<a></a>').attr('href',secId));
    firstElemInTarget.next().append(firstElemInTarget);
    $(this).after(targetSecClone).css('display','none');

    // $(this).after($(secId).clone());

    // <section class="Command" id="command_packBH_jumpToBracket">
    // 	<h1><kbd>ctrl+[</kbd> / <kbd>ctrl+]</kbd></h1>
    // 	<p>[Tools &gt; ... &gt; <strong>Jump to Left Bracket</strong> / <strong>Jump to Right Bracket</strong>]</p>
    // 	<p>Kursorius naviguoja tarp  aktyvaus bracket'o kairiojo ir dešniojo simbolių <kbd>eee</kbd>.</p>
    // </section>

    // .find('a')
    // .text('jQuery')
    // .attr('href', 'http://www.jquery.com');

    // <div class="container">
    // <h2>Greetings</h2>
    // <div class="inner">Hello</div>
    // <div class="inner">Goodbye</div>
    // </div>

    // $('.inner').after('<p>Test</p>');

    // <div class="container">
    // <h2>Greetings</h2>
    // <div class="inner">Hello</div>
    // <p>Test</p>
    // <div class="inner">Goodbye</div>
    // <p>Test</p>
    // </div>

    // $('.hello').clone().appendTo('.goodbye');

    // $(<bazinis-selektas>).append(<įterpiamas-selektas>)
  });

  // ----------------

  // <div id="Lay-RightControlPanel" class="Lay-ControlPanel">
  // 	<input type="checkbox" id="checkbox-hideDescriptions"/>
  // 	<label for="checkbox-hideDescriptions">slėpti aprašymus</label>
  // </div>

  // $('#checkbox-hideDescriptions').change(function(){
  // 	var targElms = $('section.Command>*:nth-child(1n+2)');
  // 	if ($(this).is(':checked')) {
  // 		targElms.hide();
  // 		targElms.parent().addClass(SecComBodyTagsHidden)
  // 	}
  // 	else{
  // 		targElms.show();
  // 		targElms.parent().removeClass(SecComBodyTagsHidden)
  // 	}

  // 	// var doHide = $(this).is(':checked');
  // 	// $('section.Command').each(function(){
  // 	// 	$(this).
  // 	// })

  // 	// $('#isAgeSelected').click(function () {
  // 	//     $("#txtAge").toggle(this.checked);
  // 	// });
  // 	// <input type="checkbox" id="isAgeSelected"/>
  // 	// <div id="txtAge" style="display:none">Age is something</div>​

  // 	// if ($('#isAgeSelected').is(':checked')) {
  // 	//     $("#txtAge").show();
  // 	// } else {
  // 	//     $("#txtAge").hide();
  // 	// }
  // });


  // --------------------------


  // position: absolute; top: 0px; right: 0px;
  // $('section.Command').prepend($("<div>+</div>").css("position: absolute; top: 0px; right: 0px; font-size: 1.5em;"))

  // $("<div>+</div>")
  // 	.css( {position: "absolute", top: "-4px", right: "3px", "font-size": "2em", "font-family": "Consolas", cursor: "pointer"} )
  // 	.appendTo($('section.Command > *:first-child'))
  // 	// .appendTo($('section.Command').children().first())
  // 	.click(function(event) {
  // 		var bodyTags = $(this).parent().parent().children('*:nth-child(1n+2)');
  // 		if ($(this).parent().parent().hasClass(SecComBodyTagsHidden))
  // 			bodyTags.show();
  // 		else
  // 			bodyTags.hide();
  // 		$(this).parent().parent().toggleClass(SecComBodyTagsHidden);
  // 		// event.stopPropagation();
  // 		// event.stopImmediatePropagation();
  // 		return false; // šitas sustabdo event bubble
  // 	});

  // --------------------------


// $("p").click(function(event){
// event.stopPropagation();
//   // do something
// });

// elements
//     .addClass( "foo" )
//     .children()
//         .html( "hello" )
//     .end()
//     .appendTo( "body" );



  // $('section.Command').click(function() {
  // 	var bodyTags = $(this).children('*:nth-child(1n+2)');
  // 	if ($(this).hasClass(SecComBodyTagsHidden))
  // 		bodyTags.show();
  // 	else
  // 		bodyTags.hide();
  // 	$(this).toggleClass(SecComBodyTagsHidden);
  // });


  // $('section.Command').hover(
  // 	function(){
  // 		$(this).children('*:nth-child(1n+2)').css('background-color','red')
  // 	},
  // 	function(){
  // 		// $(this).find("span:last").remove();
  // 	}
  // );



  // $("li").hover(
  // function () {
  // $(this).append($("<span> ***</span>"));
  // },
  // function () {
  // $(this).find("span:last").remove();
  // }
  // );




  // $("select").change(function () {
  // var str = "";
  // $("select option:selected").each(function () {
  // str += $(this).text() + " ";
  // });
  // $("div").text(str);
  // })
  // .change();







  // <p><a href="#command_packBH_jumpToBracket"><kbd>ctrl+[</kbd> / <kbd>ctrl+]</kbd></a></p>
  // $('a[href=^"#command_"]>kbd').parent().addClass('anchor-doc-command');

  // ;css('background-color','red')

  // $('p>kbd').map(function(index,domEl) {
  // 	$(domEl).offsetParent().addClass('doc-command')
  // })

  // $('p').map(function(index,domEl) {
  // 	// var $p
  // 	$(domEl)

  // })

}


























