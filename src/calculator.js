#!/usr/bin/env node

/**
 * Basic arithmetic calculator CLI.
 * Supports the following operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - exponentiation
 * - square root
 */

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <number1> <number2>');
  console.log('Operations: add, subtract, multiply, divide, modulo, power, sqrt');
  console.log('Examples:');
  console.log('  node src/calculator.js add 5 3');
  console.log('  node src/calculator.js subtract 10 4');
  console.log('  node src/calculator.js multiply 6 7');
  console.log('  node src/calculator.js divide 20 4');
  console.log('  node src/calculator.js modulo 10 3');
  console.log('  node src/calculator.js power 2 5');
  console.log('  node src/calculator.js sqrt 9');
}

function parseNumber(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`Invalid ${label}: ${value}`);
  }

  return number;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root is not defined for negative numbers.');
  }

  return Math.sqrt(n);
}

function calculate(operation, left, right) {
  switch (operation.toLowerCase()) {
    case 'add':
    case '+':
      return left + right;
    case 'subtract':
    case 'sub':
    case '-':
      return left - right;
    case 'multiply':
    case 'mul':
    case '*':
      return left * right;
    case 'divide':
    case 'div':
    case '/':
      if (right === 0) {
        throw new Error('Cannot divide by zero.');
      }
      return left / right;
    case 'modulo':
    case 'mod':
    case '%':
      return modulo(left, right);
    case 'power':
    case 'pow':
    case '^':
      return power(left, right);
    case 'sqrt':
    case 'squareroot':
      return squareRoot(left);
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2 || args.length > 3) {
    printUsage();
    process.exit(1);
  }

  const [operation, leftValue, rightValue] = args;

  try {
    if (operation === 'sqrt' || operation === 'squareRoot') {
      const value = parseNumber(leftValue, 'number');
      const result = squareRoot(value);
      console.log(`${value} sqrt = ${result}`);
      return;
    }

    const left = parseNumber(leftValue, 'first number');
    const right = parseNumber(rightValue, 'second number');
    const result = calculate(operation, left, right);

    console.log(`${left} ${operation} ${right} = ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    printUsage();
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('calculator.js')) {
  main();
}

module.exports = {
  calculate,
  parseNumber,
  printUsage,
  main,
  modulo,
  power,
  squareRoot,
};
