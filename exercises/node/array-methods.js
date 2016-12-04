// your source array
var source = [1, 2, 3, 4, 5];

// Using Array's filter, map and reduce
// for each of the values in `source`
// 1. Take only the odd numbers
// 2. Multiply them by 3
// 3. Add them together

var result = source
  .filter((value) => value % 2 !== 0)
  .map((value) => value * 3)
  .reduce((a, b) => a + b);
  //.add().operators().here()

console.assert(result === 27, `${result} should be 27`);
console.log('SUCCESS!', result);
