
export function timeoutWhenVarExists(varas, callbackFunc, repeat = 10) {
  if (repeat === 0) return;
  if (typeof varas !== 'undefined') {
    console.log("timeoutWhenVarExists() —— varas jau yra");
    callbackFunc();
  } else {
    console.log("timeoutWhenVarExists() —— varas dar nėra");
    setTimeout(function () {
      timeoutWhenVarExists(varas, callbackFunc, --repeat)
    }, 500);
  }
}











