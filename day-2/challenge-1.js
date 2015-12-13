"use strict";
var fs = require('fs');
var readline = require('readline').createInterface({
  input: fs.createReadStream('challenge-in.txt')
});

var totalWrappingPaperInFeet = 0;

readline.on('line', function (line) {
   totalWrappingPaperInFeet += getWrappingPaperInFeet(line);
});

readline.on('close', function () {
   console.log('Total wrapping paper required is ' + totalWrappingPaperInFeet + ' square feet');
});

function getWrappingPaperInFeet(line) {
  var wrappingPaper = 0;
  var input = line.split("x");

  for (var i = 0; i < input.length; i++) {
    input[i] = parseInt(input[i]);
  }

  input = input.sort(numericSort);
  var l = input[0];
  var b = input[1];
  var h = input[2];
  var leastPaper = l * b;

  wrappingPaper = (2*(leastPaper + b*h + l*h) + leastPaper);

  return wrappingPaper;
}

function numericSort(a, b) {
  return a - b;
}