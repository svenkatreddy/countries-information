# Countries information
  
  Get Country codes, languages, currency codes, emojis, phone codes, search counties and more (case insensitive).
  
  Goals of this project is to get any country information regardless how you search (case-sensitive, alias, with codes, names or any other param)

## Countries

  *  `getAllCountries` : This would return list of all counties
  *  `getCountryInfoByCode` : Get country info by code (case-insenitive) ( you can use either alpha 2 or alpha 3 code)
  *  `getCountryInfoByName` : Get country info by name (case-insenitive)

*Examples:*

``` javascript
var countriesInfo = require('countries-information');
console.log(countriesInfo.getAllCountries()); // this would print all countries list to console
```
    
``` javascript
var countriesInfo = require('countries-information');
console.log(countriesInfo.getCountryInfoByCode('IN')); // this would return country india info 
/* output
   {
    "alpha2": "IN",
    "alpha3": "IND",
    "countryCallingCodes": [
      "+91"
    ],
    "currencies": [
      "INR"
    ],
    "emoji": "🇮🇳",
    "ioc": "IND",
    "languages": [
      "eng",
      "hin"
    ],
    "name": "India",
    "status": "assigned"
  }
*/
```
    
``` javascript
var countriesInfo = require('countries-information');
console.log(countriesInfo.getCountryInfoByName('spain')); // this would return county info of spain
/* output
   {
    "alpha2": "ES",
    "alpha3": "ESP",
    "countryCallingCodes": [
      "+34"
    ],
    "currencies": [
      "EUR"
    ],
    "emoji": "🇪🇸",
    "ioc": "ESP",
    "languages": [
      "spa"
    ],
    "name": "Spain",
    "status": "assigned"
  }

*/
```

The data currently provided for each country is:

  * `name` The english name for the country
  * `alpha2` The [ISO 3166-1 alpha 2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code
  * `alpha3` The [ISO 3166-1 alpha 3](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) code
  * `status`: The ISO status of the entry - see below.
  * `currencies` An array of [ISO 4217 currency codes](http://en.wikipedia.org/wiki/ISO_4217) with the primary one first
  * `languages` An array of [ISO 639-2](http://en.wikipedia.org/wiki/ISO_639-2) codes for languages (may not be complete).
  * `countryCallingCodes` An array of the international call prefixes for this country.
  * `ioc` The [International Olympic Committee country code](http://en.wikipedia.org/wiki/List_of_IOC_country_codes)
  * `emoji` The emoji of country's flag.

## Currencies

  *  `getAllCurrencies` : This would return list of all currencies
  *  `getCurrencyInfoByCode` : Get currency info by code (case-insenitive)

*Examples:*

``` javascript
    var countriesInfo = require('countries-information');
    console.log(countriesInfo.getAllCurrencies()); // this would print all curriencies list to console
```
``` javascript
var countriesInfo = require('countries-information');
console.log(countriesInfo.getCurrencyInfoByCode('INR')); // this would return currency info of indian rupee
/* output
   {
    "code": "INR",
    "decimals": 2,
    "name": "Indian rupee",
    "number": "356"
   }
*/
```

It is not that useful to just have the currency code(s) for a country, so included is currency data too:

  * `name` The english name for the currency
  * `code` The [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) code
  * `number` The [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) number
  * `decimals` The number of decimal digits conventionally shown
  * `symbol` The currency symbol for the currency (e.g. ¥, $ etc.). Some symbols are not available, in which case
    `symbol` contains the ISO 4217 code.  Credit to [bengourley/currency-symbol-map](https://github.com/bengourley/currency-symbol-map)
    for the symbol database.

## Languages

  *  `getAllLanguages` : This would return list of all languages
  *  `getLanguageInfoByCode` : Get language info by code (case-insenitive) (you can search by alpha2 or alpha3 code)
  *  `getLanguageInfoByBibliographic` : Get langauge info by Bibliographic (case-insenitive)

*Examples:*

``` javascript
var countriesInfo = require('countries-information');
console.log(countriesInfo.getAllLanguages()); // this would print all counties list to console
```
    
``` javascript
var countriesInfo = require('countries-information');
console.log(countriesInfo.getLanguageInfoByCode('deu')); // this would return language info of german
/* output
   {
    "alpha2": "de",
    "alpha3": "deu",
    "bibliographic": "ger",
    "name": "German"
   }
*/
```
    
``` javascript
var countriesInfo = require('countries-information');
console.log(countriesInfo.getLanguageInfoByBibliographic('ger')); // this would return language info of german
/* output
   {
    "alpha2": "de",
    "alpha3": "deu",
    "bibliographic": "ger",
    "name": "German"
   }
*/
```

A list of languages provided by [ISO 639-2](http://en.wikipedia.org/wiki/ISO_639-2);

  * `name` The english name for the language
  * `alpha2` The two letter [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) code for the language (may be blank).
  * `alpha3` The three letter terminological [ISO 639-2](http://en.wikipedia.org/wiki/ISO_639-2) code for the language (may be blank).
  * `bibliograpic` The three letter bibliographic [ISO 639-2](http://en.wikipedia.org/wiki/ISO_639-2) code for the language (may be blank).


### Status notes

The `status` can be one of 'assigned', 'reserved', 'user assigned' or 'deleted'.

Assigned means that the code is properly in the ISO 3166 standard. Reserved means that the code is being prevented from being used. Deleted means that it has been deleted. User Assigned means that for some use cases it is required. Deleted means that it used to be in the standard but is now not.

See https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 for full details, especially the "User-assigned code elements" and "Reserved code elements" sections.

## Regions

Countries are ofter grouped into regions. The list of regions is by no means exhaustive, pull requests very welcome for additions.

  * `countries` An array of `alpha2` codes for the countries in this region.


## Installing

``` bash
npm install countries-information
```


## Future Plans

  * search country names with alias
  * get state info about each country

### Countries

  * Wikipedia links
  * Coordinates (centroid, bounding box, etc)

### Currencies

  * other currency that it is [pegged](http://en.wikipedia.org/wiki/Fixed_exchange_rate) to

## Using with webpack

As this code loads the data from JSON files you need to add the JSON loader to webpack:

``` bash
npm install json-loader --save-dev
```

and then include in your `webpack.config.js`:

``` javascript
// ...
   loaders: [
      // other loaders
      { test: /\.json$/, loader: 'json' },
  ],
// ...
```


## How to contribute

The final format is JSON, but it is easier to work with CSV. Hence in the `data`
folder there are CSV files and scripts that convert them to JSON. Please don't
edit the JSON directly, but do it via the CSV.

These are the steps required:

``` bash
# Clone the repo (or better your fork of it)
git clone https://github.com/OpenBookPrices/country-data.git
cd country-data

# install the dependencies
npm install .

# Edit the countries.csv
open data/countries.csv

# Convert the raw data (CSV or JS files) to JSON
make

# Run the tests
mocha

# If all is ok commit and push
git add .
git commit
git push

# Then send a pull request with your changes. Ideally use several small commits,
# and reference a source that backs up the change.
```


## Sources
https://github.com/OpenBookPrices/country-data
