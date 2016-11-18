var countryInfo = require('..'),
    languages  = countryInfo.getAllLanguages(),
    getLanguageInfoByCode = countryInfo.getLanguageInfoByCode,
    getLanguageInfoByBibliographic = countryInfo.getLanguageInfoByBibliographic,
    currencies = require('..').currencies,
    assert     = require('assert'),
    _          = require('underscore');

describe('languages', function () {

  describe('all', function () {
    it('should be array', function () {
      assert( _.isArray(languages) );
    });
  });

  describe('alpha2', function () {
    it('should find English and German', function () {
      assert.equal( getLanguageInfoByCode('en').name, 'English');
      assert.equal( getLanguageInfoByCode('de').name, 'German');
    });
  });

  describe('alpha3', function () {
    it('should find English and German', function () {
      assert.equal( getLanguageInfoByCode('eng').name, 'English');
      assert.equal( getLanguageInfoByCode('deu').name, 'German');
      assert.equal( getLanguageInfoByBibliographic('ger').name, 'German');
    });
  });

});
