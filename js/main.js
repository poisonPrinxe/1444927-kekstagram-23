function getRandomInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// getRandomInRange source: developer.mozilla.org

function checkStringLength(string, maxLength) {
  if (string.length > maxLength) {
    return false;
  }
  return true;
}
