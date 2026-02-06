#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Parse command-line arguments
const args = process.argv.slice(2);
let testPattern = 'tests/dependency_detection/*.test.js';

// Support: npm test big_sample
if (args.length > 0) {
  testPattern = `tests/dependency_detection/${args[0]}.test.js`;
}

// Run mocha with the determined pattern
const mocha = spawn('mocha', [testPattern], {
  stdio: 'inherit',
  cwd: __dirname
});

mocha.on('exit', (code) => {
  process.exit(code);
});
