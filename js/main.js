function getRandomInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * Math.abs(max - min + 1)) + min;
}

// getRandomInRange source: developer.mozilla.org

function checkStringLength(string, maxLength) {
  if (string.length > maxLength) {
    return false;
  }
  return true;
}

console.log(checkStringLength('hello, world!', getRandomInRange(0, 140)));

// this line was added to surpass the "unused variables" error
