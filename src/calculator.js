#!/usr/bin/env node

/**
 * Basic arithmetic calculator CLI.
 * Supports the following operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <number1> <number2>');
  console.log('Operations: add, subtract, multiply, divide');
  console.log('Examples:');
  console.log('  node src/calculator.js add 5 3');
  console.log('  node src/calculator.js subtract 10 4');
  console.log('  node src/calculator.js multiply 6 7');
  console.log('  node src/calculator.js divide 20 4');
}

function parseNumber(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`Invalid ${label}: ${value}`);
  }

  return number;
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
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const [operation, leftValue, rightValue] = args;

  try {
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
};
