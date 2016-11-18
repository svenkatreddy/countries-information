'use strict';

var assert     = require('assert'),
    _          = require('underscore');

var countryInfo = require('..');
var currencies  = countryInfo.getAllCurrencies();
var getCurrencyInfoByCode = countryInfo.getCurrencyInfoByCode;

describe('currencies', function () {

  describe('all', function () {
    it('should be array', function () {
      assert( _.isArray(currencies) );
    });
  });

  describe('code', function () {
    it('should find USD', function () {
      assert.equal( getCurrencyInfoByCode('USD').name, 'United States dollar');
    });
  });

  describe('formatting', function () {
    it("decimals should be numbers", function () {
      assert(_.isNumber( getCurrencyInfoByCode('USD').decimals));
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

    it('should find AED (has no symbol)', function () {
      assert.equal( getCurrencyInfoByCode('AED').symbol, 'AED');
    });

  });

});
