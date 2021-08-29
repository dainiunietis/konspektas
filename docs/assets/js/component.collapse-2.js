
/*
<div data-cpnt-collapse="hide">  <<< pakrovus puslapį sukoliapsinamas
  <p>...</p>         <<< liks matomas
  ...                <<< slepiama
</div>

<div data-cpnt-collapse="show">  <<< pakrovus puslapį NEsukoliapsinamas
  ...
</div>
*/

// const componentId = "component_collapse_2";
const cpntAttr = "data-cpnt-collapse";

const attrSelHide = `[${cpntAttr}="hide"]`;
const attrSelShow = `[${cpntAttr}="show"]`;

export function cpntCollapse_init() {
  $(`${attrSelHide} > :first-child, ${attrSelShow} > :first-child`)
    .click(event => {

      // console.log("this = ", this);
      // console.log("event.target = ", event.target);
      console.log("event.delegateTarget = ", event.delegateTarget);

      const $root = $(event.delegateTarget).parent();
      // console.log("$root = ", $root);

      if ($root.is(attrSelHide)) {
        $root.attr(cpntAttr, "show");
      }
      else {
        $root.attr(cpntAttr, "hide");
      }

      return false; // šitas sustabdo event bubble
    });
}




