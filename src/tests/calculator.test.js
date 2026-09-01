const test = require('node:test');
const assert = require('node:assert/strict');

const { calculate, parseNumber, modulo, power, squareRoot } = require('../calculator.js');

test('addition supports basic integer sums', () => {
  assert.equal(calculate('add', 2, 3), 5);
  assert.equal(calculate('+', 2, 3), 5);
});

test('addition handles decimal values', () => {
  assert.equal(calculate('add', 2.5, 3.25), 5.75);
});

test('subtraction supports basic integer difference', () => {
  assert.equal(calculate('subtract', 10, 4), 6);
  assert.equal(calculate('-', 10, 4), 6);
});

test('subtraction handles negative results', () => {
  assert.equal(calculate('subtract', 2, 9), -7);
});

test('multiplication supports integer products', () => {
  assert.equal(calculate('multiply', 45, 2), 90);
  assert.equal(calculate('*', 45, 2), 90);
});

test('multiplication handles decimals', () => {
  assert.equal(calculate('multiply', 1.5, 2), 3);
});

test('division supports exact integer quotients', () => {
  assert.equal(calculate('divide', 20, 5), 4);
  assert.equal(calculate('/', 20, 5), 4);
});

test('division handles fractional results', () => {
  assert.equal(calculate('divide', 7, 2), 3.5);
});

test('division by zero throws an error', () => {
  assert.throws(() => calculate('divide', 10, 0), /Cannot divide by zero/);
  assert.throws(() => calculate('/', 10, 0), /Cannot divide by zero/);
});

test('modulo returns the remainder of division', () => {
  assert.equal(modulo(10, 3), 1);
  assert.equal(calculate('modulo', 10, 3), 1);
  assert.equal(calculate('%', 10, 3), 1);
});

test('modulo by zero throws an error', () => {
  assert.throws(() => modulo(10, 0), /Cannot divide by zero/);
  assert.throws(() => calculate('modulo', 10, 0), /Cannot divide by zero/);
});

test('power computes exponentiation', () => {
  assert.equal(power(2, 5), 32);
  assert.equal(calculate('power', 2, 5), 32);
  assert.equal(calculate('^', 2, 5), 32);
});

test('squareRoot computes valid roots', () => {
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(16), 4);
  assert.equal(calculate('sqrt', 9, 0), 3);
});

test('squareRoot rejects negative numbers', () => {
  assert.throws(() => squareRoot(-9), /Square root is not defined for negative numbers/);
});

test('extended calculator examples from the image', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(power(2, 3), 8);
  assert.equal(squareRoot(16), 4);
  assert.equal(calculate('modulo', 5, 2), 1);
  assert.equal(calculate('power', 2, 3), 8);
  assert.equal(calculate('sqrt', 16, 0), 4);
});

test('square root handles edge cases', () => {
  assert.equal(squareRoot(0), 0);
  assert.equal(squareRoot(1), 1);
  assert.throws(() => squareRoot(-1), /Square root is not defined for negative numbers/);
  assert.throws(() => calculate('sqrt', -1, 0), /Square root is not defined for negative numbers/);
});

test('unsupported operations throw an error', () => {
  assert.throws(() => calculate('factorial', 5, 0), /Unsupported operation/);
  assert.throws(() => calculate('sqrt', -9, 0), /Square root is not defined for negative numbers/);
});

test('parseNumber converts valid numeric strings to numbers', () => {
  assert.equal(parseNumber('42', 'first number'), 42);
  assert.equal(parseNumber('3.14', 'first number'), 3.14);
});

test('parseNumber rejects invalid numeric strings', () => {
  assert.throws(() => parseNumber('abc', 'first number'), /Invalid first number/);
  assert.throws(() => parseNumber('NaN', 'first number'), /Invalid first number/);
});

test('example arithmetic from the basic calculator image', () => {
  assert.equal(calculate('add', 2, 3), 5);
  assert.equal(calculate('subtract', 10, 4), 6);
  assert.equal(calculate('multiply', 45, 2), 90);
  assert.equal(calculate('divide', 20, 5), 4);
});
