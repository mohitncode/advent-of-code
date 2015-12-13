"use strict";
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('challenge-in.txt')
});

rl.on('line', getBasementCharPosition);

function getBasementCharPosition(input) {
  var currentFloor = 0;
  var goOneUp = '(';
  var goOneDown = ')';
  var charPosition = null;

  for (var i = 0; i < input.length; i++) {
    if (input.charAt(i) === goOneUp) {
      currentFloor++;
    } else if (input.charAt(i) === goOneDown) {
      currentFloor--;
    }

    if (currentFloor === -1) {
      // Return the POSITION if santa has entered the basement
      charPosition = i + 1;
      break;
    }
  }

  console.log('Santa has entered basement at position ' + charPosition);
  return charPosition;
}