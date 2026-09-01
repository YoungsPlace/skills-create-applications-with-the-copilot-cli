const test = require('node:test');
const assert = require('node:assert/strict');

const { calculate, parseNumber } = require('../calculator.js');

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

test('unsupported operations throw an error', () => {
  assert.throws(() => calculate('modulo', 10, 3), /Unsupported operation/);
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
