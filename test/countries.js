'use strict';
var countryInfo = require('..');
var countries  = countryInfo.getAllCountries();
var getCountryInfoByCode = countryInfo.getCountryInfoByCode;
var getCountryInfoByName = countryInfo.getCountryInfoByName;
var getCurrencyInfoByCode = countryInfo.getCurrencyInfoByCode;
var getLanguageInfoByCode = countryInfo.getLanguageInfoByCode;

var  assert = require('assert');

describe('countries', function () {

  describe('all', function () {
    it('should be array', function () {
      assert( Array.isArray(countries) );
    });
  });

  describe('alpha2', function () {
    it('should find USA', function () {
      assert.equal( getCountryInfoByCode('BE').name, 'Belgium');
      assert.equal( getCountryInfoByCode('US').name, 'United States');
    });
    it('should prefer assigned alpha2 country codes', function () {
      assert.equal( getCountryInfoByCode('SK').name, 'Slovakia');
      assert.equal( getCountryInfoByCode('BY').name, 'Belarus');
    });
  });

  describe('alpha3', function () {
    it('should find France', function () {
      assert.equal( getCountryInfoByCode('FRA').name, 'France');
      assert.deepEqual( getCountryInfoByCode('FRA').currencies, ['EUR']);
    });
  });

  describe('case insenetive alpha2', function () {
    it('should find USA', function () {
      assert.equal( getCountryInfoByCode('Be').name, 'Belgium');
      assert.equal( getCountryInfoByCode('Us').name, 'United States');
    });
    it('should prefer assigned alpha2 country codes', function () {
      assert.equal( getCountryInfoByCode('Sk').name, 'Slovakia');
      assert.equal( getCountryInfoByCode('bY').name, 'Belarus');
    });
  });

  describe('case insenitive alpha3', function () {
    it('should find France', function () {
      assert.equal( getCountryInfoByCode('FrA').name, 'France');
      assert.deepEqual( getCountryInfoByCode('fRA').currencies, ['EUR']);
    });
  });

  describe('search by country name', function () {
    it('should find France', function () {
      assert.equal( getCountryInfoByName('france').alpha2, 'FR');
      assert.deepEqual( getCountryInfoByName('frAnce').currencies, ['EUR']);
    });
  });

  describe('check each country has correct form', function () {
    countries.forEach(function (country) {
      describe(country.name, function () {
        it('should have a status', function () {
          assert( country.status );
        });
        it('should have correctly formed alpha2 and alpha3', function () {
          assert(country.alpha2.match(/^[A-Z]{2}$/), 'alpha2 correctly formed - ' + country.alpha2);
          if (country.alpha3.length) {
            assert(country.alpha3.match(/^[A-Z]{3}$/), 'alpha3 correctly formed - ' + country.alpha3);
          }
        });
      });
    });
  });

  describe('check currencies for each country', function () {
    countries.forEach(function (country) {
      describe(country.alpha2, function () {
        country.currencies.forEach(function (currency) {
          it(currency, function () {
            assert( getCurrencyInfoByCode(currency), 'unknown currency ' + currency + ' for ' + country.alpha2 );
          });
        });
      });
    });
  });

  describe('check specific country currencies', function () {
    it('Latvian currency should be EUR', function () {
      assert.deepEqual( getCountryInfoByCode('LV').currencies, ['EUR']);
    });
  });

  describe('check emoji for a specific country', function () {
    it('Finland emoji should be the flag', function () {
      assert.deepEqual( getCountryInfoByCode('FI').emoji, String.fromCharCode(55356, 56811, 55356, 56814));
    });
  });

  describe('check languages for each country', function () {
    countries.forEach(function (country) {
      describe(country.alpha2, function () {
        country.languages.forEach(function (language) {
          it(language, function () {
            assert( getLanguageInfoByCode(language), 'unknown language ' + language + ' for ' + country.alpha2 );
          });
        });
      });
    });
  });
});
