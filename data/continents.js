'use strict';

var regions = require('./regions.js');
var continents = {};

continents.asia = {
  name: 'Asia',
  regions: ['centralAsia', 'southernAsia', 'southeastAsia', 'eastAsia', 'westernAsia'],
  countries: [
    regions.centralAsia.countries,
    regions.southernAsia.countries,
    regions.southeastAsia.countries,
    regions.eastAsia.countries,
    regions.westernAsia.countries
  ]
  .flat()
  .sort()
};

continents.africa = {
  name: 'Africa',
  regions: ['centralAfrica', 'northAfrica', 'southernAfrica', 'eastAfrica', 'westAfrica'],
  countries: [
      regions.centralAfrica.countries,
      regions.northAfrica.countries,
      regions.southernAfrica.countries,
      regions.eastAfrica.countries,
      regions.westAfrica.countries
  ]
  .flat()
  .sort()
};

continents.northAmerica = {
  name: 'North America',
  regions: ['centralAmerica', 'northernAmerica', 'caribbean'],
  countries: [
    regions.centralAmerica.countries,
    regions.northernAmerica.countries,
    regions.caribbean.countries
  ]
  .flat()
  .sort()
};

continents.southAmerica = {
  name: 'South America',
  regions: ['southAmerica'],
  countries: [
    regions.southAmerica.countries
  ]
  .flat()
  .sort()
}

continents.antartica = {
  name: 'Antartica',
  regions: ['antartica'],
  countries: [
    regions.antartica.countries
  ]
  .flat()
  .sort()
}

continents.europe = {
  name: 'Europe',
  regions: ['northernEurope', 'southernEurope', 'easternEurope', 'westernEurope'],
  countries: [
    regions.northernEurope.countries,
    regions.southernEurope.countries,
    regions.easternEurope.countries,
    regions.westernEurope.countries
  ]
  .flat()
  .sort()
}

continents.oceania = {
  name: 'Oceania',
  regions: ['australia', 'melanesia', 'micronesia', 'polynesia'],
  countries: [
    regions.australia.countries,
    regions.melanesia.countries,
    regions.micronesia.countries,
    regions.polynesia.countries
  ]
  .flat()
  .sort()
};

module.exports = continents;
