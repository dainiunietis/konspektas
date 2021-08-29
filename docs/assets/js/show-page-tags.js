
export function showDfn() {
  $("<button>išvesti &lt;dfn&gt;</button>")
    // .css("position: fixed; bottom: 5px; right: 5px; font-size: 1.3em")
    // .css({ position: "fixed", bottom: "5px", right: "5px", fontSize: "1.3em", zIndex: 10000 })
    .css({ position: "fixed", bottom: "5px", right: "5px", opacity: .4, zIndex: 10000 })
    .on("click",() => {
      // console.log($("dfn").get()) // !!! VEIKIA !!!

      // console.log(
      //   $("dfn").get().forEach(elm => console.log(elm))
      // ); // !!! VEIKIA !!!

      console.log(
        // $("dfn").get().forEach(elm => console.log(elm, elm.textContent))
        // $("dfn").get().forEach(elm => console.dirxml(elm, elm.textContent))
        // $("dfn").get().forEach(elm => console.table(elm, elm.textContent))
        // $("dfn").get().forEach(elm => console.info(elm, elm.textContent))

        $("dfn").get().forEach(elm => {
          // console.group("");
          // console.log(elm.textContent);
          // console.log(elm);
          // console.groupEnd();

          // console.group(elm.textContent);
          console.groupCollapsed(elm.textContent);
          console.info(elm);
          console.groupEnd();
        })

      ); // !!! VEIKIA !!!

      // $( "li" ).each(function( index ) {
      //   console.log( index + ": " + $( this ).text() );
      // });
      // $("dfn").each(index => {
      //   // console.log( index + ": " + $( this ).text() );
      //   // console.info(this)
      //   console.log(this)
      //   // let txt = $(this).text();
      //   // console.log(`${index}: ${txt}`);
      // });

      // console.info($("dfn"))
    })
    .appendTo("body");

  // const elmBtn = $("<button>").css("position:fixed; bottom:5px; right:5px; font-size:1.3em").on("click",() => {
  //   console.info($("dfn"))
  // });
  // $("body").append(elmBtn);

  // const elmBtn = document.createElement("button");
  // elmBtn.onclick =
  // // const buttonas = document.body.appendChild();
  // for (let elmDfn of document.querySelectorAll("dfn")) {
  // }

  //----------------------------------------------------------------------
  //
  //----------------------------------------------------------------------

}





