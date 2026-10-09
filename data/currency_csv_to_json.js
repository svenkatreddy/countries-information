'use strict';

// Take the csv and convert to json and tidy it up so that it is consistent.

var path = require('path');
var fs = require('fs');
var parse = require('csv-parse/sync').parse;

function main() {
  return import('canonical-json').then(function (mod) {
    var canonicalJSON = mod.default;

    // read in the CSV
    var csvFile = path.join(__dirname, 'currencies.csv');
    var output = parse(fs.readFileSync(csvFile), { columns: true });

    output.forEach(function (record) {
      // convert decimals to a number
      record.decimals = parseInt(record.decimals, 10);
    });

    // sort by code
    output.sort(function (a, b) {
      if (a.code < b.code) { return -1; }
      if (a.code > b.code) { return 1; }
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
