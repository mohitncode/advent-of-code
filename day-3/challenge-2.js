"use strict";
var fs = require('fs');
var readline = require('readline').createInterface({
  input: fs.createReadStream('challenge-in.txt')
});

var totalUniqueHousesVisited = 0,
    visitedCoordinates = {};

readline.on('line', function (line) {
  var numberOfHouses = getHousesWithAtLeastOnePresent(line);
  console.log('Total unique houses visited = ' + numberOfHouses);
});

function getHousesWithAtLeastOnePresent(line) {
  var startingXPos = 0,
      startingYPos = 0,
      roboSantaCurrentXPos = startingXPos,
      roboSantaCurrentYPos = startingYPos,
      santaCurrentXPos = startingXPos,
      santaCurrentYPos = startingYPos,
      currentXPos = null,
      currentYPos = null,
      LEFT = '<',
      RIGHT = '>',
      UP = '^',
      DOWN = 'v';

  markHouseVisited(startingXPos, startingYPos);
  var inputLength = line.length;
  for (var i = 0; i < inputLength; i++) {
    var direction = line.charAt(i);
    var selectedSanta = whichSantasTurn(i);

    // Determine which santa's turn it is
    if (selectedSanta === 'santa') {
      currentXPos = santaCurrentXPos;
      currentYPos = santaCurrentYPos;
    } else if (selectedSanta === 'roboSanta') {
      currentXPos = roboSantaCurrentXPos;
      currentYPos = roboSantaCurrentYPos;
    }

    if (direction === LEFT) {
      currentXPos--;
    } else if (direction === RIGHT) {
      currentXPos++;
    } else if (direction === UP) {
      currentYPos++;
    } else if (direction === DOWN) {
      currentYPos--;
    }

    // Copy back the coordinates into independent
    if (selectedSanta === 'roboSanta') {
      roboSantaCurrentXPos = currentXPos;
      roboSantaCurrentYPos = currentYPos;
    } else if (selectedSanta === 'santa') {
      santaCurrentXPos = currentXPos;
      santaCurrentYPos = currentYPos;
    }

    var currentCoordinates = currentXPos + ',' + currentYPos;

    // If node has not been visited already, set gifts distributed to
    // one. And add it to the total number of houses visited.
    if (!isHouseVisited(currentCoordinates)) {
        markHouseVisited(currentXPos, currentYPos);
    }
  }

  return totalUniqueHousesVisited;
}

function whichSantasTurn(i) {
  if (i % 2 === 0) {
    return 'roboSanta';
  } else {
    return 'santa';
  }
}

function isHouseVisited(coordinates) {
  return (visitedCoordinates[coordinates] !== null && visitedCoordinates[coordinates] !== undefined);
}

function markHouseVisited(x, y) {
  visitedCoordinates[x + ',' + y] = 1;
  totalUniqueHousesVisited++;
}