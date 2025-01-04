const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  if (!str || str.length < 1) {
    return '';
  }

  let result = '';
  let currentChar = str[0];
  let count = 1;

  for (let i = 1; i < str.length; i += 1) {
    if (currentChar === str[i]) {
      count++;
    } else {
      result += count > 1 ? count + currentChar : currentChar;
      currentChar = str[i];
      count = 1;
    }
  }
  result += count > 1 ? count + currentChar : currentChar;
  return result;
}

module.exports = {
  encodeLine
};
