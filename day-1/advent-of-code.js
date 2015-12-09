// Level 1-1
function findSantasFloor(input) {
  var currentFloor = 0;
  var goOneUp = '(';
  var goOneDown = ')';

  for (var i = 0; i < input.length; i++) {
    if (input.charAt(i) === goOneUp) {
      currentFloor++;
    } else if (input.charAt(i) === goOneDown) {
      currentFloor--;
    }
  }

  return currentFloor;
}

// Level 1-2
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

  return charPosition;
}
