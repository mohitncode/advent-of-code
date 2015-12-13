"use strict";
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('challenge-in.txt')
});

var niceStringsCount = 0;

rl.on('line', function (line) {
  if (containsDuplicateLetterPair(line) && containsRepeatingLetters(line)) {
    niceStringsCount++;
  }
});

rl.on('close', function() {
  console.log('Total number of nice lines = ' + niceStringsCount);
});

function containsDuplicateLetterPair(line) {
  var letterPair = null,
      letterPairFirstIndex = null,
      letterPairLastIndex = null,
      notUsingOverlappingLetter = false;

  // Create a sliding window that checks for a two letter string instance
  for (var i = 0, len = line.length - 1; i < len; i++) {
    letterPair = line.substring(i, i + 2);
    letterPairFirstIndex = line.indexOf(letterPair);
    letterPairLastIndex = line.lastIndexOf(letterPair);

    // If the strings are using a common letter (for example the string "aaa")
    // then the first pair index and the last pair index will be different.
    // This check ensures that the difference between the indexes is greater than
    // 1. So "aaaa" will yield a difference of two but "aaa" will yield -1
    notUsingOverlappingLetter = (letterPairLastIndex - letterPairFirstIndex) > 1;

    if (letterPairFirstIndex !== letterPairLastIndex && notUsingOverlappingLetter) {
      return true;
    }
  }

  return false;
}

function containsRepeatingLetters(line) {
  var currentChar = null,
      lookahead = null;
  for (var i = 0, len = line.length - 2; i < len; i++) {
    currentChar = line.charAt(i);
    lookahead = line.charAt(i + 2);
    if (currentChar === lookahead) {
      return true;
    }
  }

  return false;
}
