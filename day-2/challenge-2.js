"use strict";
var fs = require('fs');
var readline = require('readline').createInterface({
  input: fs.createReadStream('challenge-in.txt')
});

var totalRibbonInFeet = 0;

readline.on('line', function (line) {
   totalRibbonInFeet += getRibbonInFeet(line);
});

readline.on('close', function () {
   console.log('Total ribbon required is ' + totalRibbonInFeet + ' square feet');
});

function getRibbonInFeet(line) {
  var ribbon = 0;
  var input = line.split("x");

  for (var i = 0; i < input.length; i++) {
    input[i] = parseInt(input[i]);
  }

  input = input.sort(numericSort);
  var l = input[0];
  var b = input[1];
  var h = input[2];
  var volume = l * b * h;
  var leastRibbon = 2 * (l + b);

  ribbon = (volume + leastRibbon);

  return ribbon;
}

function numericSort(a, b) {
  return a - b;
}