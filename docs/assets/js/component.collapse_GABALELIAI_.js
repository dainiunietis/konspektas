

$(window).on("load", function() {
  //console.log("viskas pasikrovė");

  function component_collapse_savas_locdep_postConfig() {
    if (typeof component_collapse_savas_locdep !== 'undefined') {
      console.log("component_collapse_savas_locdep —— jau yra");
      component_collapse_savas_locdep.hideAll();
    }
    else {
      console.log("component_collapse_savas_locdep —— dar nėra");
      setTimeout(function() {component_collapse_savas_locdep_postConfig()}, 500);
    }
  }

  component_collapse_savas_locdep_postConfig();
});



	//////////////////////////////////////////////////////////////////////////
	//
  //   (Nuo čia prasideda konstruktoriaus įvykdomas kodas, t. y. kai sukuriamas objekto kintamasis)
	//
	//////////////////////////////////////////////////////////////////////












