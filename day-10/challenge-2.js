var rl = require('readline').createInterface({
  input: require('fs').createReadStream('challenge-in.txt')
});

var input = null,
    iterations = 50;

rl.on('line', function (line) {
  input = line;
});

rl.on('close', function() {
  var i = 0,
      output = input;

  while (i < iterations) {
    output = lookAndSay(output);
    i++;
  }

  console.log('After 40 iterations, output length is ' + output.length);
});

function lookAndSay(input) {
  var numGroupRegex = /(\d)\1*/gmi,
      output = '',
      inputGroups = input.match(numGroupRegex);

  for (var i = 0, len = inputGroups.length; i < len; i++) {
    output += inputGroups[i].length + inputGroups[i].charAt(0);
  }

  return output;
}