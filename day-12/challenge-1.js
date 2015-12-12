var input = document.body.textContent.trim(),
    inputObj = JSON.parse(input),
    sum = 0;

traverse(inputObj);

console.log('Sum is ' + sum);

function traverse(inputObj) {
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