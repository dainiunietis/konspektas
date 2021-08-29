
////////////////////////////////////////////////////////////////////////////
//
//  #
//
/////////////////////////////////////////////////////////////////////////

export const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

////////////////////////////////////////////////////////////////////////////
//
//  #
//
/////////////////////////////////////////////////////////////////////////

// https://lea.verou.me/2018/06/easy-dynamic-regular-expressions-with-tagged-template-literals-and-proxies/

// @USAGE:
// And now we can try it in the console, both with and without flags!
//   > regexp.gi`^${'/*'}([\\S\\s]+?)${'*/'}`;
//   < /^\/\*([\S\s]+?)\*\//gi
//   > regexp`^${'/*'}([\\S\\s]+?)${'*/'}`;
//   < /^\/\*([\S\s]+?)\*\//

const _regexp = (flags, strings, ...values) => {
  let pattern = strings[0] + values.map((v, i) => escapeRegExp(v) + strings[i+1]).join("");
  return RegExp(pattern, flags);
};

const regexp = new Proxy(_regexp.bind(undefined, ""), {
  get: (t, property) => _regexp.bind(undefined, property)
});

////////////////////////////////////////////////////////////////////////////
//
//  # Ignoring whitespace in Javascript regular expression patterns
//
/////////////////////////////////////////////////////////////////////////

//-------------------------------------------------------------------------
//
//-------------------------------------------------------------------------

// var a = RegExp(
//   "^" +
//   "[\\d]+" +  // This is a comment
//   "$"
// );

//-------------------------------------------------------------------------
//
//-------------------------------------------------------------------------

// const rePatt = new RegExp(
//   /foo/.source +
//   /[\d+]/.source +       // kas nors
//   /bar/.source
// );

//-------------------------------------------------------------------------
//
//-------------------------------------------------------------------------

/**
 * @USAGE:
 *   regexp`
 *   foo
 *   [\d+]
 *   bar
 *   `;
 * */

export function regexpStr(parts) {
  // I'm ignoring support for ${} placeholders for brevity,
  // but full implementation should escape them.

  // Note that `.raw` allows use of \d instead of \\d.
  return new RegExp(parts.raw.join('').replace(/\s+/g,''));
}











