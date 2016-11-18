'use strict';

var _ = require('underscore');
var continents = require('./data/continents');
var regions = require('./data/regions');
var allCountries = require('./data/countries.json');
var allCurrencies = require('./data/currencies.json');
var allLanguages = require('./data/languages.json');

var getSymbol = require('currency-symbol-map');


const searchObjectforString = (searchterm, data, property1, property2) => {
  const searchItem = searchterm.toLowerCase();
  let found = false;
  _.each(data, function (item) {
    const match1 = item[property1] ? item[property1].toLowerCase() : '';
    const match2 = item[property2] ? item[property2].toLowerCase() : '';
    const statusCode = item.status || '';
    
    if( ((searchItem === match1) || (searchItem === match2)) && statusCode !== "deleted") {
       found = item;
       return false; 
    }
  });
  return found;
};


_.each(allCurrencies, function (currency) {
  //If the symbol isn't available, default to the currency code
  var symbol = getSymbol(currency.code);
  if (symbol == '?') {
    symbol = currency.code;
  }

  currency.symbol = symbol;
  //exports.currencies[currency.code] = currency;
});

// Note that for the languages there are several entries with the same alpha3 -
// eg Dutch and Flemish. Not sure how to best deal with that - here whichever
// comes last wins.
_.each(allLanguages, function (language) {
  //exports.languages[language.alpha2] = language;
  //exports.languages[language.bibliographic] = language;
  //exports.languages[language.alpha3] = language;
});

/*exports.lookup = lookup({
    countries: allCountries,
    currencies: allCurrencies,
    languages: allLanguages
});*/

var callingCountries = {all: []};

var allCallingCodes = _.reduce(allCountries, function (codes, country) {
  if (country.countryCallingCodes && country.countryCallingCodes.length) {
    callingCountries.all.push(country);

    callingCountries[country.alpha2] = country;
    callingCountries[country.alpha3] = country;

    _.each(country.countryCallingCodes, function (code) {
      if (codes.indexOf(code) == -1) {
        codes.push(code);
      }
    });
  }
  return codes;
}, []);

delete callingCountries['']; // remove empty alpha3s

allCallingCodes.sort(function (a, b) {
  var parse = function (str) { return parseInt(str) };
  var splitA = _.map(a.split(' '), parse);
  var splitB = _.map(b.split(' '), parse);

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

const getAllCountries = () => {
  return allCountries;
};

const getAllCurrencies = () => {
  return allCurrencies;
};

const getAllLanguages = () => {
  return allLanguages;
};

const getAllCallingCodes = () => {
  return allCallingCodes;
};

const getAllCallingCountries = () => {
  return callingCountries;
};

const getAllRegions = () => {
  return regions;
};

const getAllContinents = () => {
  return continents;
};

const getCountryInfoByCode = (code) => {
 return searchObjectforString(code, allCountries, 'alpha2', 'alpha3');
};

const getCountryInfoByName = (name) => {
 return searchObjectforString(name, allCountries, 'name');
};

const getCurrencyInfoByCode = (code) => {
  return searchObjectforString(code, allCurrencies, 'code');
};

const getLanguageInfoByCode = (code) => {
  return searchObjectforString(code, allLanguages, 'alpha2', 'alpha3');
};

const getLanguageInfoByBibliographic = (code) => {
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
