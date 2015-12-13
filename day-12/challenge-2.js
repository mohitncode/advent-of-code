"use strict";
var input = document.body.textContent.trim(),
    inputObj = JSON.parse(input),
    sum = 0;

traverse(inputObj);

console.log('Sum is ' + sum);

function traverse(inputObj) {
  // Pre-flight the object to see if it contains the value red
  if (Array.isArray(inputObj) || !containsValueRed(inputObj)) {
    for (var i in inputObj) {
      var currentObject = inputObj[i];

      // If current object is of type array or object recursively traverse it
      if (Array.isArray(currentObject) || typeof currentObject === 'object') {
        traverse(currentObject);
      } else if (!isNaN(parseInt(currentObject))) {
        sum += parseInt(currentObject);
      }
    }
  }
}

function containsValueRed(object) {
  // An alternate approach would be to simply stringify the object and perform
  // a regex match for 'red'. However that would also flag any keys containing
  // the key 'red' which would be a false positive.
  for (var i in object) {
    if (object[i] === 'red') {
      return true;
    }
  }

  return false;
}