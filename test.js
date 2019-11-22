const { deepEqual } = require('./index');
const assert = require('assert')

const a = { a: [{ c: 1 }, 3], b: 1, c: { a: 1 } };
const b = { a: [{ c: 1 }, 3], c: { a: 1 } };

const compare = function (val1, val2) {
  return val1 === val2;
};


const res = deepEqual(a, b, compare);
console.log(res);
