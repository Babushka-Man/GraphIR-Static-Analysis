const { expect } = require('chai');
const { readCsv, getSamplePath, checkSourceToSinkFile, assertRelationsExist } = require('./test-helper');

describe('If Sample - Dependency Detection', () => {
  const sampleName = 'if_sample';
  const samplePath = getSamplePath(sampleName);

  it('should have sourceToSink.csv file', () => {
    expect(checkSourceToSinkFile(sampleName)).to.be.true;
  });

  it('should contain expected source-to-sink relations', () => {
    const rows = readCsv(`${samplePath}/sourceToSink.csv`);
    const expectedRelations = [
      ['getUserInput', '7', 'sendToSink', '0', '19'],
    ];
    assertRelationsExist(rows, expectedRelations);
  });
});
