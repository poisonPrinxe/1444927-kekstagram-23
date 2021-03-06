function getRandomInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min === max) {
    return min;
  }
  return Math.floor(Math.random() * Math.abs(max - min + 1)) + min;
}

// getRandomInRange source: developer.mozilla.org

export {getRandomInRange};
