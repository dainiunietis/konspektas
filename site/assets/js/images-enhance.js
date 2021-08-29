
/*****************************************************************************
idėja tokia, img'ai būna 2 tipų:
	be atributų:
		<img src="*.png"> —
	su atributais:
		<img src="*.png" width="100">
		<img src="*.png" height="100">
		<img src="*.png" width="100" height="100">
*******************************************************************************/

export default function imagesEnhance() {
  $("img").css({cursor: "ne-resize"}).click(function(){ // pointer crosshair col-resize e-resize ew-resize n-resize ne-resize
    var img = $(this);
    //
    // img'o atributai width ir height
    //
    if (img.attr("width") || img.attr("height")) {
      // img'as yra SU atributais width ir/ar height
      // console.log(img.data());
      img.data("width", img.attr("width"));
      img.data("height", img.attr("height"));
      // console.log(img.data());
      img.removeAttr("height width");
    }
    else if (img.data("width") || img.data("height")) {
      // img'as turi data's ir yra be atributų width ir height — grąžiname juos
      // alert("YRA data'os");
      img.attr("width", img.data("width"));
      img.attr("height", img.data("height"));
      img.removeData("width height");
    }

    // console.log("");

    //
    // img'o CSS'as
    //
    var style = img.prop('style');
    // console.log('img.prop(style) == ', style)

    if (style.maxWidth == "") {
      // alert("IMG'as nekeistas");
      img.css({ "max-width": "none", "z-index": "3000", "position": "relative" });
      // img.css("max-width: none; z-index: 1");
    }
    else {
      // alert("IMG'as keistas");
      img.css({ "max-width": "", "z-index": "", "position": "" });
    }
  });
}









