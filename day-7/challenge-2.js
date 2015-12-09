var rl = require('readline').createInterface({
  input: require('fs').createReadStream('challenge-in.txt')
});

var instructionsArray = [],
    circuitMap = {},
    AND = 'AND',
    OR = 'OR',
    NOT = 'NOT',
    LSHIFT = 'LSHIFT',
    RSHIFT = 'RSHIFT',
    ASSIGNMENT = 'ASSIGNMENT',
    UNARY = 'unary',
    BINARY = 'binary',
    CONVERSION_MASK = 65535;

rl.on('line', function (line) {
  instructionsArray.push(line);
});

// Assign wire b the value of 3176 as that is the previous computed signal of a.

rl.on('close', function() {
  instructionsArray[3] = '3176 -> b';
  do {
    for (var i = 0; i < instructionsArray.length; i++) {
      if (instructionsArray.length > 0 && executeInstruction(instructionsArray[i])) {
        instructionsArray.splice(i, 1);

        // Since instruction is spliced at the specified index, the next instruction
        // moves up by 1
        if (i > 0) {
          i--;
        }
      }
    }
  }
  while (!isCircuitMapFullyDefined())

  console.log('circuitMap[\'a\'] = ' + circuitMap['a']);
});

function executeInstruction(line) {
  var instruction = parseInstruction(line),
      instructionType = getOperatorType(instruction),
      line = line.replace(/\s/gi, '').split('->'),
      output = line[line.length - 1];

  if (instructionType === UNARY) {
    var operand = line[0].split(instruction).filter(Boolean)[0];
    operand = getOperand(operand);

    if (!isNullOrUndefined(operand)) {
      switch (instruction) {
        case ASSIGNMENT:
          circuitMap[output] = maskTo16Bits(operand); 
          break;
        case NOT:
          circuitMap[output] = maskTo16Bits(~ operand);
          break;
      }
      return true;
    } else {
      if (!isNumberOperand(operand) && !isNullOrUndefined(operand)) {
        circuitMap[operand] = null;
      }
      if(!isNullOrUndefined(output)) {
        circuitMap[output] = null;
      }
      return false;
    }
  } else if (instructionType === BINARY) {
    var operands = line[0].split(instruction).filter(Boolean),
        operand1 = getOperand(operands[0]),
        operand2 = getOperand(operands[1]);

    if (!isNullOrUndefined(operand1) && !isNullOrUndefined(operand2)) {
      switch (instruction) {
        case AND:
          circuitMap[output] = maskTo16Bits(operand1 & operand2);
          break;
        case OR:
          circuitMap[output] = maskTo16Bits(operand1 | operand2);
          break;
        case LSHIFT:
          circuitMap[output] = maskTo16Bits(operand1 << operand2);
          break;
        case RSHIFT:
          circuitMap[output] = maskTo16Bits(operand1 >>> operand2);
          break;
      }
      return true;
    } else {
      if (!isNumberOperand(operand1) && !isNullOrUndefined(operand1)) {
        circuitMap[operand1] = null;
      }

      if (!isNumberOperand(operand2) && !isNullOrUndefined(operand2)) {
        circuitMap[operand2] = null;
      }

      if (!isNullOrUndefined(output)) {
        circuitMap[output] = null;
      }
      return false;
    }
  }
}

function isNumberOperand(operand) {
  var isNumberRegex = /(\d)+/gi;
  return isNumberRegex.test(operand);
}


function parseInstruction(line) {
  var operatorRegex = /AND|OR|LSHIFT|RSHIFT|NOT/gi,
      operator = null;

  if (operatorRegex.test(line)) {
    operator = line.match(operatorRegex)[0];
  } else {
    operator = 'ASSIGNMENT';
  }

  return operator;
}

function getOperand(operand) {
  if (operand !== null && operand !== undefined) {
    if (isNumberOperand(operand)) {
      return Number(operand);
    } else {
      return circuitMap[operand];
    }
  }

  return undefined;
}

function getOperatorType(operator) {
  var operatorType = null;
  switch (operator) {
    case AND:
    case OR:
    case LSHIFT:
    case RSHIFT:
      operatorType = BINARY;
      break;
    case NOT:
    case ASSIGNMENT:
      operatorType = UNARY;
      break;
    default:
  }

  return operatorType;
}

function maskTo16Bits(input) {
  return input & CONVERSION_MASK;
}

function isCircuitMapFullyDefined() {
  var flag = false;
  for (var i in circuitMap) {
    if (!isNullOrUndefined(circuitMap[i])) {
      flag = true;
    } else {
      flag = false;
      break;
    }
  }

  return flag;
}

function isNullOrUndefined(input) {
  return (input === undefined || input === null);
}