const fs = require('fs');
const path = require('path');

/**
 * Read CSV file and return array of rows (as arrays)
 */
function readCsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .trim()
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => line.split('\t'));
}

/**
 * Read text file and return array of lines
 */
function readLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .trim()
    .split('\n')
    .filter(line => line.length > 0);
}

/**
 * Get sample directory path
 */
function getSamplePath(sampleName) {
  return path.join(__dirname, '..', '..', 'samples', 'dependency_detection', sampleName);
}

/**
 * Check if sourceToSink.csv exists and has content
 */
function checkSourceToSinkFile(sampleName) {
  const filePath = path.join(getSamplePath(sampleName), 'sourceToSink.csv');
  return fs.existsSync(filePath);
}

/**
 * Print CSV content for debugging
 */
function printCsvContent(sampleName) {
  const filePath = path.join(getSamplePath(sampleName), 'sourceToSink.csv');
  const rows = readCsv(filePath);
  console.log(`\n=== Actual CSV content for ${sampleName} ===`);
  rows.forEach((row, index) => {
    console.log(`Row ${index}: [${row.map(col => `'${col}'`).join(', ')}]`);
  });
  console.log('===\n');
}

/**
 * Assert that expected relations exist in actual rows
 */
function assertRelationsExist(actualRows, expectedRelations) {
  const missingRelations = [];
  
  expectedRelations.forEach(expected => {
    const found = actualRows.some(row =>
      row[0] === expected[0] &&
      row[1] === expected[1] &&
      row[2] === expected[2] &&
      row[3] === expected[3] &&
      row[4] === expected[4]
    );
    
    if (!found) {
      missingRelations.push(expected);
    }
  });
  
  if (missingRelations.length > 0) {
    let errorMsg = '\n✔ Expected relations:\n';
    errorMsg += '-------------------------------------------------------------------\n';
    missingRelations.forEach(rel => {
      errorMsg += `  ${rel.join('\t')}\n`;
    });
    errorMsg += '-------------------------------------------------------------------\n';
    errorMsg += '\n❌ Actual CSV content:\n';
    errorMsg += '-------------------------------------------------------------------\n';
    actualRows.forEach(row => {
      errorMsg += `  ${row.join('\t')}\n`;
    });
    errorMsg += '-------------------------------------------------------------------\n';
    throw new Error(errorMsg);
  }
}

module.exports = {
  readCsv,
  readLines,
  getSamplePath,
  checkSourceToSinkFile,
  printCsvContent,
  assertRelationsExist
};
