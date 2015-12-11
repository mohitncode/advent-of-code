var rl = require('readline').createInterface({
  input: require('fs').createReadStream('challenge-in.txt')
});

var oldPassword = null;

rl.on('line', function (line) {
  oldPassword = line;
});

rl.on('close', function() {
  // Calculate old expired password from the input again
  oldPassword = generatePassword();
  console.log('Next secure password is ' + generatePassword());
});

function generatePassword() {
  var password = oldPassword;

  // While all the password requirements are not satisfied, increment the current password
  do {
    password = getNextPassword(password);
  } while (containsBlackListedCharacters(password) || !containsTwoLetterPairs(password)
      || !containsThreeConsecutiveLetters(password) || password.length !== 8);

  return password;
}

function containsBlackListedCharacters(input) {
  var blacklistRegex = /i|o|l/gmi;
  return blacklistRegex.test(input);
}

function containsTwoLetterPairs(input) {
  var letterPairRegex = /([a-z])\1+/gmi;
  return (letterPairRegex.test(input) && input.match(letterPairRegex).length >= 2);
}

function containsThreeConsecutiveLetters(input) {
  var currentChar = null,
      lookahead1 = null,
      lookahead2 = null;

  for (var i = 0, len = input.length; i < len - 2; i++) {
    currentChar = input.charCodeAt(i);
    lookahead1 = input.charCodeAt(i + 1);
    lookahead2 = input.charCodeAt(i + 2);

    if ((lookahead1 - currentChar === 1) && (lookahead2 - lookahead1) === 1) {
      return true;
    }
  }

  return false;
}

function getNextPassword(password) {
  var newPassword = '',
      cascadeCarry = true,
      previousChar = 'a';

  for (var i = password.length - 1; i >= 0; i--) {
    if (previousChar === 'a' && cascadeCarry) {
      newPassword = incrementChar(password.charAt(i)) + newPassword;
      previousChar = incrementChar(password.charAt(i));
      cascadeCarry = true;
    } else {
      newPassword = password.charAt(i) + newPassword;
      previousChar = password.charAt(i);
      cascadeCarry = false;
    }
  }

  return newPassword;
}

function incrementChar(character) {
  if (character === 'z') {
    return 'a';
  } else if (character === 'h' || character === 'k' || character === 'n') {
    // Increment the char by two in these cases as the next character will definitely
    // be one from the blacklist
    return String.fromCharCode(character.charCodeAt(0) + 2);
  } else {
    return String.fromCharCode(character.charCodeAt(0) + 1);
  }
}