var fs = require('fs');
var crypto = require('crypto');
var readline = require('readline').createInterface({
  input: fs.createReadStream('challenge-in.txt')
});

readline.on('line', function (line) {
    var adventCoin = mineAdventCoins(line);
    console.log('Advent coin = ' + adventCoin);
});

function mineAdventCoins(input) {
  var coinRegEx = /^000000/gi,
      seedNumber = 0,
      coinValue = input + seedNumber,
      coinHash = mine(coinValue);

  // WHile coin hash does not start with the given prefix, keep mining
  while (!coinRegEx.test(coinHash)) {
    seedNumber++;
    coinValue = input + seedNumber;
    coinHash = mine(coinValue);
  }

  return seedNumber;
}

function mine(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}