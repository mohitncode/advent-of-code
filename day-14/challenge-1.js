"use strict";
var input = document.body.textContent.trim().split('\n'),
    raceTime = 2503,
    participants = [],
    raceProgress = {};

for (var i in input) {
  participants.push(getParticipant(input[i]));
}

for (var i = 0; i < raceTime; i++) {
  for (var j in participants) {
    var reindeer = participants[j];

    if (raceProgress[reindeer.name] === undefined) {
      raceProgress[reindeer.name] = 0;
    }

    raceProgress[reindeer.name] += reindeer.tick();
  }
}

console.log('Winner is ' + getWinner());

function getWinner() {
  var maxDistance = 0,
      winner = null;

  for (var i in raceProgress) {
    if (raceProgress[i] > maxDistance) {
      maxDistance = raceProgress[i];
      winner = i;
    }
  }

  return winner;
}

function getParticipant(line) {
  var nameRegex = /\w+(?= can)/gmi,
      attrRegex = /\d+/gmi,
      name = line.match(nameRegex),
      attributes = line.match(attrRegex),
      speed = parseInt(attributes[0]),
      stamina = parseInt(attributes[1]),
      restTime = parseInt(attributes[2]);

  return new Reindeer(name, speed, stamina, restTime);
}

function Reindeer(name, speed, stamina, restTime) {
  this.name = name;
  this.speed = speed;
  this.stamina = stamina;
  this.restTime = restTime;
  this.isResting = false;
  this.currentRestTime = 0;
  this.runTime = 0;

  this.tick = function() {
    if (this.isResting) {
      this.currentRestTime++;

      if (this.currentRestTime === this.restTime) {
        this.isResting = false;
        this.currentRestTime = 0;
      }

      return 0;
    } else {
      this.runTime++;

      if (this.runTime === this.stamina) {
        this.isResting = true;
        this.runTime = 0;
      }

      return this.speed;
    }
  };
}