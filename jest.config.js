module.exports = {
  verbose: true,
  moduleNameMapper: { '^antd/(.*)$': '<rootDir>\\node_modules\\@sdp.nd\\fish\\$1' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'scss'],
  testRegex: '/test/.*.test.jsx?$',
  transformIgnorePatterns: ['node_modules'],
  transform: {
    '\\.jsx?$': './script/jest/codePreprocessor',
    '\\.[scss|less]$': '<rootDir>/__mocks__/styleMock.js'
  },
  testURL: 'http://localhost'
}
