'use strict';

// Take the csv and convert to json and tidy it up so that it is consistent.

var path = require('path');
var fs = require('fs');
var parse = require('csv-parse/sync').parse;

var countriesFilename = 'countries.csv';
var deletedCountriesFilename = 'deleted_countries.csv';


function readFile(filename) {
  var csvFile = path.join(__dirname, filename);
  return parse(fs.readFileSync(csvFile), { columns: true });
}

function main() {
  return import('canonical-json').then(function (mod) {
    var canonicalJSON = mod.default;

    var output = readFile(countriesFilename).concat(readFile(deletedCountriesFilename));

    output.sort(function (a, b) {
      if (a.alpha2 < b.alpha2) { return -1; }
      if (a.alpha2 > b.alpha2) { return 1; }
      return 0;
    });

    // strip out fields that are not ready yet
    output.forEach(function (country) {
      delete country.ccTLD;
    });

    // change the appropriate fields to be an array
    ['currencies', 'countryCallingCodes', 'languages'].forEach(function (key) {
      output.forEach(function (country) {
        country[key] = country[key] ? country[key].split(',') : [];
      });
    });

    // print out results to stdout
    console.log(canonicalJSON(output, null, 2));
  });
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
