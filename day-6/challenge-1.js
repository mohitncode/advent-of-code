"use strict";
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('challenge-in.txt')
});

var MAX_LENGTH = 1000,
    lightsMap = {},
    TURN_ON = "turn on",
    TURN_OFF = "turn off",
    TOGGLE = "toggle";

initializeLightMap();

rl.on('line', function (line) {
  var instruction = parseInstruction(line);
  var ranges = getRanges(line);

  // Execute the parsed instruction for the specified range
  executeInstruction(instruction, ranges);
});

rl.on('close', function() {
  console.log('Lights lit after executing the instructions is ' + getLitLightsCount());
});

function getLitLightsCount() {
  var litLights = 0;
  for (var i in lightsMap) {
    var arr = lightsMap[i];
    for (var j = 0, len = arr.length; j < len; j++) {
      if (arr[j]) {
        litLights++;
      }
    }
  }

  return litLights;
}

function executeInstruction(instruction, range) {
  var columnStart = range[2],
      columnEnd = range[3];

  while (columnStart <= columnEnd) {
    var rowStart = range[0],
        rowEnd = range[1];

    while (rowStart <= rowEnd) {
      if (instruction === TURN_ON) {
        lightsMap[rowStart][columnStart] = true;
      } else if (instruction === TURN_OFF) {
        lightsMap[rowStart][columnStart] = false;
      } else if (instruction === TOGGLE) {
        lightsMap[rowStart][columnStart] = !lightsMap[rowStart][columnStart];
      }

      rowStart++;
    }
    columnStart++;
  }
}

function initializeLightMap() {
  for (var i = 0; i < MAX_LENGTH; i++) {
    var arr = new Array(MAX_LENGTH);
    for (var j = 0, len = arr.length; j < len; j++) {
      // Set to false to indicate that the lights are off.
      arr[j] = false;
    }
    lightsMap[i] = arr;
  }
}

function parseInstruction(instruction) {
  var x = instruction.match(TURN_ON) || instruction.match(TURN_OFF) || instruction.match(TOGGLE);
  return x[0];
}

function getRanges(input) {
  var range = [],
      rangeRegex = /(\d)+,(\d)+/gi,
      rangeString = input.match(rangeRegex),
      startingRange = rangeString[0].split(','),
      endRange = rangeString[1].split(',');

  for (var i = 0; i < 2; i++) {
    range.push(parseInt(startingRange[i]));
    range.push(parseInt(endRange[i]));
  }

  return range;
}
