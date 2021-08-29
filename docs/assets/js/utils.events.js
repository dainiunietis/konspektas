
//////////////////////////////////////////////////////////////////////////
//
//  # docReady()
//
//////////////////////////////////////////////////////////////////////

// https://learnwithparam.com/blog/vanilla-js-equivalent-of-jquery-ready/

// @USAGE:
// docReady(function() {
//   // your code here
// });
// docReady((event) => {
//   //the event occurred
// });

// function docReady(callbackFunc) {
export function docReady(callbackFunc) {
  if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        // remove the listener, to make sure it isn't fired in future
        document.detachEvent("onreadystatechange", arguments.callee);
        callbackFunc();
      }
    });
  }
}

// if (
//   document.readyState === "complete" ||
//   (document.readyState !== "loading" && !document.documentElement.doScroll)
// ) {
//   callback();
// } else {
//   document.addEventListener("DOMContentLoaded", callback);
// }

// document.attachEvent("onreadystatechange", function(){
//   // check if the DOM is fully loaded
//   if(document.readyState === "complete"){
//     // remove the listener, to make sure it isn't fired in future
//     document.detachEvent("onreadystatechange", arguments.callee);
//     // The actual handler...
//   }
// });

//////////////////////////////////////////////////////////////////////////
//
//  # debounce()
//
//////////////////////////////////////////////////////////////////////

// https://www.joshwcomeau.com/snippets/javascript/debounce/

// When you scroll the page, or resize the window, or move your mouse,
// the browser captures dozens and dozens of events per second.
//
// In many cases, you don`t need to capture every single intermediate step;
// you`re only interested in capturing the end state (when the user finishes
// scrolling, or finishes resizing the window).
//
// Debouncing is a strategy that lets us improve performance by waiting until a
// certain amount of time has passed before triggering an event. When the user
// stops triggering the event, our code will run.
//
// In some cases, this isn`t necessary. But, if any network requests are involved,
// or if the DOM changes (eg. re-rendering a component), this technique can
// drastically improve the smoothness of your application.



/**
 * @USAGE:
 * const handleMouseMove = debounce((ev) => {
 *   // Do stuff with the event!
 * }, 250);
 *
 * window.addEventListener('mousemove', handleMouseMove);
 */

export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}








