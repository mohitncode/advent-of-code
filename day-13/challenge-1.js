"use strict";
var input = document.body.textContent.trim(),
    instructions = input.split('\n'),
    happinessMap = {};

for (var i = 0, len = instructions.length; i < len; i++) {
  var invitees = getInvitees(instructions[i]),
      happinessLevel = getHappinessLevel(instructions[i]);

  mapHappinessLevel(invitees, happinessLevel);
}

function getInvitees(instruction) {
  var invitees = [],
      words = instruction.match(/\w+/gmi);

  invitees.push(words[0]);
  invitees.push(words[words.length - 1]);

  return invitees;
}

function getHappinessLevel(instruction) {
  var unitsRegex = /(\d+)(?= happiness units)/gmi,
      happinessUnits = instruction.match(unitsRegex)[0],
      happinessGained = /gain/gmi,
      happinessLost = /lose/gmi;

  if (happinessGained.test(instruction)) {
    return parseInt(happinessUnits);
  } else if (happinessLost.test(instruction)) {
    return -parseInt(happinessUnits);
  }
}

function mapHappinessLevel(invitees, happinessLevel) {
  var invitee1 = invitees[0],
      invitee2 = invitees[1];

  if (happinessMap[invitee1] === undefined) {
    happinessMap[invitee1] = {};
  }

  happinessMap[invitee1][invitee2] = happinessLevel;
}