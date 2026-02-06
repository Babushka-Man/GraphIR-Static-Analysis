const { expect } = require('chai');
const { readCsv, getSamplePath, checkSourceToSinkFile, assertRelationsExist } = require('./test-helper');

describe('Basic Sample - Dependency Detection', () => {
  const sampleName = 'basic_sample';
  const samplePath = getSamplePath(sampleName);

  it('should have sourceToSink.csv file', () => {
    expect(checkSourceToSinkFile(sampleName)).to.be.true;
  });

  it('should contain expected source-to-sink relations', () => {
    const rows = readCsv(`${samplePath}/sourceToSink.csv`);
    const expectedRelations = [
      ['getUserInput', '8', 'sendToSink', '1', '26'],
      ['getUserInput', '8', 'sendToSink', '0', '25']
    ];
    assertRelationsExist(rows, expectedRelations);
  });
});
