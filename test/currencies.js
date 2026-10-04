'use strict';

var assert     = require('assert');

var countryInfo = require('..');
var currencies  = countryInfo.getAllCurrencies();
var getCurrencyInfoByCode = countryInfo.getCurrencyInfoByCode;

describe('currencies', function () {

  describe('all', function () {
    it('should be array', function () {
      assert( Array.isArray(currencies) );
    });
  });

  describe('code', function () {
    it('should find USD', function () {
      assert.equal( getCurrencyInfoByCode('USD').name, 'United States dollar');
    });
  });

  describe('formatting', function () {
    it("decimals should be numbers", function () {
      assert(typeof getCurrencyInfoByCode('USD').decimals === 'number');
    });
  });

  describe('symbols', function () {
    it('should find $', function () {
      assert.equal( getCurrencyInfoByCode('USD').symbol, '$');
    });
    it('should find ¥', function () {
      assert.equal( getCurrencyInfoByCode('JPY').symbol, '¥');
    });
    it('should find R', function () {
      assert.equal( getCurrencyInfoByCode('ZAR').symbol, 'R');
    });

    it('should find the AED symbol', function () {
      assert.equal( getCurrencyInfoByCode('AED').symbol, 'د.إ');
    });

  });

});
