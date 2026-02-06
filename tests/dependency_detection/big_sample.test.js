const { expect } = require('chai');
const { readCsv, getSamplePath, checkSourceToSinkFile, assertRelationsExist } = require('./test-helper');

describe('Big Sample - Dependency Detection', () => {
  const sampleName = 'big_sample';
  const samplePath = getSamplePath(sampleName);

  it('should have sourceToSink.csv file', () => {
    expect(checkSourceToSinkFile(sampleName)).to.be.true;
  });

  it('should contain expected source-to-sink relations', () => {
    const rows = readCsv(`${samplePath}/sourceToSink.csv`);
    const expectedRelations = [
      ['getUserInput', '12', 'sendToSink', '0', '91'],
      ['getUserInput', '12', 'sendToSink', '1', '93'],
      ['getUserInput2', '15', 'sendToSink2', '0', '96'],
      ['getUserInput2', '15', 'sendToSink2', '1', '97'],
      ['getUserInput', '12', 'sendToSink2', '0', '75'],
      ['getUserInput', '12', 'sendToSink2', '1', '82']
    ];
    assertRelationsExist(rows, expectedRelations);
  });
});
