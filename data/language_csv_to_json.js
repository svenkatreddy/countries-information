'use strict';

// Take the csv and convert to json and tidy it up so that it is consistent.

var path = require('path');
var fs = require('fs');
var parse = require('csv-parse/sync').parse;

function main() {
  return import('canonical-json').then(function (mod) {
    var canonicalJSON = mod.default;

    // read in the CSV
    var csvFile = path.join(__dirname, 'languages.csv');
    var output = parse(fs.readFileSync(csvFile), { columns: true });

    // sort by alpha3
    output.sort(function (a, b) {
      if (a.alpha3 < b.alpha3) { return -1; }
      if (a.alpha3 > b.alpha3) { return 1; }
      return 0;
    });

    // print out results to stdout
    console.log(canonicalJSON(output, null, 2));
  });
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
