
/*
// šitą galima padėti puslapyje, kad pasikrovus visi collapse'ai susi'collapse'intų:

<div data-cpnt-collapse-hide>  <<< pakrovus puslapį sukoliapsinamas
  <p>...</p>         <<< liks matomas
  ...                <<< slepiama
</div>

<div data-cpnt-collapse-show>  <<< pakrovus puslapį NEsukoliapsinamas
  ...
</div>
*/

// const componentId = "component_collapse_2";
const attr_hide = "data-cpnt-collapse-hide";
const attr_show = "data-cpnt-collapse-show";

export function cpntCollapse_init() {

  // console.log();

  $(`*[${attr_hide}] > *:first-child, *[${attr_show}] > *:first-child`)
    .click(event => {

      // console.log("this = ", this);
      // console.log("event.target = ", event.target);
      // console.log("event.delegateTarget = ", event.delegateTarget);

      const $root = $(event.delegateTarget).parent();

      // console.log("$root = ", $root);

      // $('#myid')[0].hasAttribute("onclick")

      if ($root.is(`[${attr_hide}]`)) {
        $root.removeAttr(attr_hide);
        $root.attr(attr_show, "");
      }
      else if ($root.is(`[${attr_show}]`)) {
        $root.removeAttr(attr_show);
        $root.attr(attr_hide, "");
      }

      return false; // šitas sustabdo event bubble
    });
}

