'use strict';

var continents = require('./data/continents');
var regions = require('./data/regions');
var allCountries = require('./data/countries.json');
var allCurrencies = require('./data/currencies.json');
var allLanguages = require('./data/languages.json');

var getSymbol = require('currency-symbol-map');


var searchObjectforString = function (searchterm, data, property1, property2) {
  var searchItem = searchterm.toLowerCase();
  var found = false;

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var match1 = item[property1] ? item[property1].toLowerCase() : '';
    var match2 = item[property2] ? item[property2].toLowerCase() : '';
    var statusCode = item.status || '';

    if (((searchItem === match1) || (searchItem === match2)) && statusCode !== 'deleted') {
      found = item;
      break;
    }
  }

  return found;
};


for (var c = 0; c < allCurrencies.length; c++) {
  var currency = allCurrencies[c];
  // If the symbol isn't available, default to the currency code
  var symbol = getSymbol(currency.code);
  if (symbol === '?') {
    symbol = currency.code;
  }

  currency.symbol = symbol;
}

var callingCountries = { all: [] };

var allCallingCodes = allCountries.reduce(function (codes, country) {
  if (country.countryCallingCodes && country.countryCallingCodes.length) {
    callingCountries.all.push(country);

    callingCountries[country.alpha2] = country;
    callingCountries[country.alpha3] = country;

    country.countryCallingCodes.forEach(function (code) {
      if (codes.indexOf(code) === -1) {
        codes.push(code);
      }
    });
  }
  return codes;
}, []);

delete callingCountries['']; // remove empty alpha3s

allCallingCodes.sort(function (a, b) {
  var parse = function (str) { return parseInt(str, 10); };
  var splitA = a.split(' ').map(parse);
  var splitB = b.split(' ').map(parse);

  if (splitA[0] < splitB[0]) {
    return -1;
  } else if (splitA[0] > splitB[0]) {
    return 1;
  } else {
    // Same - check split[1]
    if (splitA[1] === undefined && splitB[1] !== undefined) {
      return -1;
    } else if (splitA[1] !== undefined && splitB[1] === undefined) {
      return 1;
    } else if (splitA[1] < splitB[1]) {
      return -1;
    } else if (splitA[1] > splitB[1]) {
      return 1;
    } else {
      return 0;
    }
  }
});

var getAllCountries = function () {
  return allCountries;
};

var getAllCurrencies = function () {
  return allCurrencies;
};

var getAllLanguages = function () {
  return allLanguages;
};

var getAllCallingCodes = function () {
  return allCallingCodes;
};

var getAllCallingCountries = function () {
  return callingCountries;
};

var getAllRegions = function () {
  return regions;
};

var getAllContinents = function () {
  return continents;
};

var getCountryInfoByCode = function (code) {
  return searchObjectforString(code, allCountries, 'alpha2', 'alpha3');
};

var getCountryInfoByName = function (name) {
  return searchObjectforString(name, allCountries, 'name');
};

var getCurrencyInfoByCode = function (code) {
  return searchObjectforString(code, allCurrencies, 'code');
};

var getLanguageInfoByCode = function (code) {
  return searchObjectforString(code, allLanguages, 'alpha2', 'alpha3');
};

var getLanguageInfoByBibliographic = function (code) {
  return searchObjectforString(code, allLanguages, 'bibliographic');
};


module.exports = {
  getAllCountries: getAllCountries,
  getAllCurrencies: getAllCurrencies,
  getAllLanguages: getAllLanguages,
  getAllCallingCodes: getAllCallingCodes,
  getAllCallingCountries: getAllCallingCountries,
  getAllContinents: getAllContinents,
  getAllRegions: getAllRegions,
  getCountryInfoByCode: getCountryInfoByCode,
  getCountryInfoByName: getCountryInfoByName,
  getCurrencyInfoByCode: getCurrencyInfoByCode,
  getLanguageInfoByCode: getLanguageInfoByCode,
  getLanguageInfoByBibliographic: getLanguageInfoByBibliographic,
};
