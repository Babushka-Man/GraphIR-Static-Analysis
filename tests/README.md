# Test Running Guide

This project uses Mocha as the test framework with custom test running capabilities.

## Running Tests

### Run All Tests
```bash
npm test
```

### Run a Single Test File
Simply pass the test name (without `.test.js` extension):

```bash
npm test big_sample
```

This will run the test file `tests/dependency_detection/big_sample.test.js`.

## Examples

- Run all tests: `npm test`
- Run big_sample tests: `npm test big_sample`
- Run basic_sample tests: `npm test basic_sample`
- Run array_sample tests: `npm test array_sample`

## Test Structure

Tests are located in `tests/dependency_detection/`:
- `array_sample.test.js`
- `basic_sample.test.js`
- `big_sample.test.js`
- `if_sample.test.js`
- `object_function_mutation_sample.test.js`
- `ternary_if_sample.test.js`
- `wrap_sample.test.js`

## How It Works

The custom test runner (`test.js`) parses command-line arguments and dynamically determines which test files to run from `tests/dependency_detection/`. If no test name is provided, all tests are executed.
