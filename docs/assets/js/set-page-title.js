
// Puslapio pavadinimą <h1> kopijuoti į <title>

export function setPageTitle() {
  // var docH1text = $("body > H1").get(0).text();
  var docH1text = $("body > H1:eq(0)").text();
  // $("head > title").text(docH1text + " § WebDev konspektas");
  $("head > title").text(docH1text + " ψ WebDev konspektas");
}

