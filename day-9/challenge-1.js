"use strict";
var input = document.body.textContent.trim(),
    lines = input.split('\n'),
    cities = [],
    graph = {},
    minimumDistance = 0;

for (var i in lines) {
  var cityList = getCities(lines[i]),
      distance = getDistance(lines[i]);

  for (var i in cityList) {
    if (cities.indexOf(cityList[i]) === -1) {
      cities.push(cityList[i]);
    }
  }

  mapDistanceBetweenCities(cityList[0], cityList[1], distance);
}

var startingCity = cities[0],
    nextCity = null;

do {
  visitCity(startingCity);
  nextCity = getNearestCity(startingCity);

  minimumDistance += graph[startingCity][nextCity];
  startingCity = nextCity;
} while (cities.length > 1);

function getCities(line) {
  var string = line.substring(0, line.indexOf(" = "));
  return string.split(" to ");
}

function getDistance(line) {
  return Number(line.match(/\d+/gmi)[0]);
}

function mapDistanceBetweenCities(city1, city2, distance) {
  if (graph[city1] === undefined) {
    graph[city1] = {};
  }

  if (graph[city2] === undefined) {
    graph[city2] = {};
  }

  graph[city1][city2] = distance;
  graph[city2][city1] = distance;
}

function getNearestCity(city) {
  var connectedCities = graph[city],
      nearestCity = null;
  for (var i in connectedCities) {
    if (nearestCity === null || connectedCities[i] < connectedCities[nearestCity]) {
      if (!isCityVisited(i)) {
        nearestCity = i;
      }
    }
  }

  return nearestCity;
}

function isCityVisited(city) {
  // If cities array does not contain the city, then it implies,
  // it has been marked as visited
  if (city === null) {
    return false;
  }
  return (cities.indexOf(city) === -1);
}

function visitCity(city) {
  // Remove city from list of unvisited cities
  cities.splice(cities.indexOf(city), 1);
}