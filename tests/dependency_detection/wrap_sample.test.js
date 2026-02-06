const { expect } = require('chai');
const { readCsv, getSamplePath, checkSourceToSinkFile, assertRelationsExist } = require('./test-helper');

describe('Wrap Sample - Dependency Detection', () => {
  const sampleName = 'wrap_sample';
  const samplePath = getSamplePath(sampleName);

  it('should have sourceToSink.csv file', () => {
    expect(checkSourceToSinkFile(sampleName)).to.be.true;
  });

  it('should contain expected source-to-sink relations', () => {
    const rows = readCsv(`${samplePath}/sourceToSink.csv`);
    const expectedRelations = [
      ['getUserInput', '8', 'sendToSink', '1', '30']
    ];
    assertRelationsExist(rows, expectedRelations);
  });
});
