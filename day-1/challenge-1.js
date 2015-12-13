"use strict";
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('challenge-in.txt')
});

rl.on('line', findSantasFloor);

function findSantasFloor(input) {
  var currentFloor = 0;
  var goOneUp = '(';
  var goOneDown = ')';

  for (var i = 0; i < input.length; i++) {
    if (input.charAt(i) === goOneUp) {
      currentFloor++;
    } else if (input.charAt(i) === goOneDown) {
      currentFloor--;
    }
  }

  console.log('Current floor = ' + currentFloor);
  return currentFloor;
}