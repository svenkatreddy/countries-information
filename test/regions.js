'use strict';

var countryInfo = require('..');
var countries = countryInfo.getAllCountries();
var regions = countryInfo.getAllRegions();
var getCountryInfoByCode = countryInfo.getCountryInfoByCode;
var assert = require('assert');

describe('regions', function () {

  describe("check region's countries are known", function () {
    Object.keys(regions).forEach(function (name) {
      var region = regions[name];
      describe(name, function () {
        region.countries.forEach(function (country) {
          it(country, function () {
            assert(getCountryInfoByCode(country), 'unknown country code: ' + country);
          });
        });
      });
    });
  });

  describe("check region countries exist", function () {
    var countriesAssigned = [];

    Object.keys(regions).forEach(function (name) {
      regions[name].countries.forEach(function (country) {
        countriesAssigned.push(country);
      });
    });

    var seen = {};
    var duplicates = countriesAssigned.filter(function (value) {
      if (seen[value]) {
        return true;
      }
      seen[value] = true;
      return false;
    });
    if (duplicates.length > 0) { console.log('duplicated: ', duplicates); }

    it("are not duplicated", function () {
      assert(duplicates.length === 0);
    });
  });

  describe("check all assigned countries are in regions", function() {
    var countriesAssigned = [];
    var countriesAvailable = [];

    Object.keys(regions).forEach(function (name) {
      regions[name].countries.forEach(function (country) {
        countriesAssigned.push(country);
      });
    });

    countries.forEach(function (country) {
      if (country.status === "assigned") {
        countriesAvailable.push(country.alpha2);
      }
    });

    var difference = countriesAvailable.filter(function (code) {
      return countriesAssigned.indexOf(code) === -1;
    });
    if (difference.length > 0) { console.log('unused: ', difference); }

    it("are all used", function () {
      assert(difference.length === 0);
    });

  });
});
