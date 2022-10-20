const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!(arr instanceof Array)) throw Error(`'arr' parameter must be an instance of the Array!`);
  if (!arr.length) return [];
  let transfArr = arr.slice(0);
  let controlCheck = false;
  for (let i = 0; i < transfArr.length; i++) {
    switch (transfArr[i]) {
      case '--discard-next': {
        if (transfArr[i + 1]) {
          delete transfArr[i+1];
        }
        controlCheck = true;
        break;
      }
      case '--discard-prev': {
        if (transfArr[i - 1]) {
          delete (transfArr[i-1]);
        }
        controlCheck = true;
        break;
      }
      case '--double-next': {
        if (transfArr[i + 1]) {
          transfArr.splice(i, 1, transfArr[i + 1]);
          i -= 1;
        }
        controlCheck = true;
        break;
      }
      case '--double-prev': {
        if (transfArr[i - 1]) {
          transfArr.splice(i, 1, transfArr[i - 1]);
          i -= 2;
        }
        controlCheck = true;
        break;
      }
    }
  }
  if (!controlCheck) return arr;
  return transfArr.filter(elem => typeof(elem) === 'number');
}

module.exports = {
  transform
};


