"use strict";
var input = document.body.textContent.trim().split('\n'),
    totalOnDiskLength = 0,
    totalInMemoryLength = 0;

for (var i in input) {
  var line = input[i],
      parsedLine = eval(line);
  totalOnDiskLength += line.length;
  totalInMemoryLength += parsedLine.length;
}

console.log('Difference in on disk and in memory representation = ' + (totalOnDiskLength - totalInMemoryLength));