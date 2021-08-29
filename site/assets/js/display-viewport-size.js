/*
  https://www.codementor.io/@ricardozea/100-responsive-typography-system-using-a-modular-scale-s5rhft58g
  Script to display the viewport size when working on responsive stuff.
  Adpted to vanilla JS by: Taylor Hunt - https://codepen.io/tigt/
*/

document.addEventListener("DOMContentLoaded", function() {
  let el = document.createElement("output");
  document.body.append(el);

  Object.assign(el.style, {
    position: "fixed",
    bottom: "3px",
    right: "3px",
    background: "red",
    color: "white",
    padding: "2px 5px",
    borderRadius: "3px",
    fontSize: "17px",
    // fontFamily: "Envy Code R",
    // fontFamily: "Consolas",
    // fontFamily: "InputMonoCondensed",
    // fontFamily: "Iosevka Heavy",
    // fontFamily: "Source Sans Pro Black",
    fontFamily: "Source Sans Pro Semibold",
    opacity: 0.7
  });

  function updateOutput() {
    let html = document.documentElement;
    el.value = html.clientWidth + " × " + html.clientHeight;
  }

  window.addEventListener("resize", updateOutput);
  updateOutput();
});

