"use strict";
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('challenge-in.txt')
});

var niceStringsCount = 0;

rl.on('line', function (line) {
  if (!isNaughty(line)) {
    if (containsAtLeastThreeVowels(line) && containsDuplicateSubsqeuentLetters(line)) {
      niceStringsCount++;
    }
  }
});

rl.on('close', function() {
  console.log('Total number of nice lines = ' + niceStringsCount);
});

function isNaughty(line) {
	var naughtyRegExp = /ab|cd|pq|xy/gi;
	return naughtyRegExp.test(line);
}

function containsAtLeastThreeVowels(line) {
  var vowelsRegExp = /a|e|i|o|u/gi;
  if (vowelsRegExp.test(line)) {
    return line.match(vowelsRegExp).length >= 3;
  }
  return false;
}

function containsDuplicateSubsqeuentLetters(line) {
  var previousChar = line.charAt(0);

  for (var i = 1, len = line.length; i < len; i++) {
    var currentChar = line.charAt(i);
    if (currentChar === previousChar) {
      return true;
    } else {
      previousChar = currentChar;
    }
  }

  return false;
}
