'use strict';

// Take the csv files and convert them to standard format

var parse = require('csv-parse/sync').parse;
var stringify = require('csv-stringify/sync').stringify;

var firstHeader = process.argv[2];

// read in the CSV
var input = process.stdin;
var chunks = [];

input.on('data', function (chunk) {
  chunks.push(chunk);
});

input.on('end', function () {
  var output = parse(Buffer.concat(chunks), { columns: true });

  output.sort(function (a, b) {
    var x = a[firstHeader].toLowerCase();
    var y = b[firstHeader].toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });

  var headers = Object.keys(output[0]);
  var remaining = headers.filter(function (header) { return header !== firstHeader; });
  var columns = [firstHeader].concat(remaining.sort());

  process.stdout.write(stringify(output, { header: true, columns: columns }));
});
