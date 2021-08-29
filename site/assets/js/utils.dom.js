
//////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////

// @USAGE:
//   document.body.prepend(dom_stringToFragment(`
//   <p>aaa</p>
//   <p>bbb</p>
//   `));

export function dom_stringToFragment(str) {
  var tpl = document.createElement('template');
  tpl.innerHTML = str;
  return tpl.content;
}






