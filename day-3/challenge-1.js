var fs = require('fs');
var readline = require('readline').createInterface({
  input: fs.createReadStream('challenge-in.txt')
});

readline.on('line', function (line) {
    var numberOfHouses = getHousesWithAtLeastOnePresent(line);
    console.log('Total unique houses visited = ' + numberOfHouses);
});

function getHousesWithAtLeastOnePresent(line) {
  var startingXPos = 0,
      startingYPos = 0,
      currentXPos = startingXPos,
      currentYPos = startingYPos,
      totalUniqueHousesVisited = 1,
      visitedCoordinates = {},
      LEFT = '<',
      RIGHT = '>',
      UP = '^',
      DOWN = 'v';

  var inputLength = line.length;
  visitedCoordinates[startingXPos + ',' + startingYPos] = 1;
  for (var i = 0; i < inputLength; i++) {
    var direction = line.charAt(i);
    if (direction === LEFT) {
      currentXPos--;
    } else if (direction === RIGHT) {
      currentXPos++;
    } else if (direction === UP) {
      currentYPos++;
    } else if (direction === DOWN) {
      currentYPos--;
    }

    var currentCoordinates = currentXPos + ',' + currentYPos;

    // If node has not been visited already, set gifts distributed to
    // one. And add it to the total number of houses visited.
    if (visitedCoordinates[currentCoordinates] === null
      || visitedCoordinates[currentCoordinates] === undefined) {
        visitedCoordinates[currentCoordinates] = 1;
        totalUniqueHousesVisited++;

    } else {
      visitedCoordinates[currentCoordinates]++;
    }
  }

  return totalUniqueHousesVisited;
}