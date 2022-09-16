const average = (arr) => {
  const sum = arr.reduce((sum, a) => sum + a, 0);
  const length = arr.length;
  const average = Math.round((sum / length) * 10) / 10;
  return average;
};

module.exports = {
  average,
};
