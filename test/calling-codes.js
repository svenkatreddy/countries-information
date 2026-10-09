var callingCodesInfo = require('..'),
    callingCodes = callingCodesInfo.getAllCallingCodes(),
    countries    = require('..').getAllCountries(),
    callingCountries = require('..').getAllCallingCountries(),
    assert       = require('assert');

describe('calling codes', function () {

  describe('list of all calling codes', function () {
    countries.forEach(function (country) {
      if (country.countryCallingCodes && country.countryCallingCodes.length) {
        it('should contain codes for ' + country.name, function () {
          assert(
            country.countryCallingCodes.every(function (code) {
              return callingCodes.indexOf(code) > -1
            })
          )
        });
      }
    });
  });

  describe('callingCountries', function () {

    // console.log(callingCountries);
    it('should contain countries with calling codes', function () {
      assert( callingCountries.BE );
    });

    it('should not contain countries without calling codes', function () {
      assert( !callingCountries.CP, 'Clipperton Island');
      assert( !callingCountries[''], 'empty string' );
    });

  });

});
