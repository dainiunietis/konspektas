
import { siteGlobals } from '../js/site-globals.js';

////////////////////////////////////////////////////////////////////////////
//
//  # .c-pvs--addBtnViewportFixFit
//
/////////////////////////////////////////////////////////////////////////

export function addBtnViewportFixFit() {
  $(".c-pvs--addBtnViewportFixFit").append(
    $("<button>Užfiksuoti viewport'e</button>").click((event) => {

      // console.log('this = ' + this)
      // console.log('event.target = ' + event.target)
      // console.log('trg = ' + trg)

      let trg = event.target
      let stl = trg.parentElement.style
      // console.log('stl.position = ' + stl.position)
      if (stl.position === 'fixed')
        stl.cssText = ''
      else
        stl.cssText = 'position: fixed; top: 10px; left: 10px; width: calc(100% - 20px); background: hsl(0, 0%, 100%, .9)'
    })
  )
}



// let elmStl = this.parentElement.style
// //console.log('elmStl = ' + elmStl)
// //let elmCst = elmStl.cssText
// //console.log('elmCst = ' + elmCst)
//
// //elmCst = 'position: fixed; top: 10px; left: 10px; width: 90%'
//
// console.log('elmStl.position = ' + elmStl.position)
//
// if (elmStl.position == 'fixed')
//   elmStl.cssText = ''
// else
//   elmStl.cssText = 'position: fixed; top: 10px; left: 10px; width: 90%'

//if (elmStl.position == 'fixed')
//  elmCst = ''
//else
//  elmCst = 'position: fixed; top: 10px; left: 10px; width: 90%'


//let elmStl = this.parentElement.style
//console.log(elmStl.position);
//elmStl.position = 'fixed'
//elmStl.top = '10px'
//elmStl.left = '10px'
//elmStl.width = '90%'
//console.log(elmStl.position);

//let nodeList = this.parentElement.childNodes;
//for (let i = 0; i < nodeList.length; i++) {
  //console.log(nodeList[i]);




