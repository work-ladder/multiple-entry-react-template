module.exports = {
  verbose: true,
  moduleNameMapper: {
    fish: '@sdp.nd/fish',
    '\\.[scss|less]$': '<rootDir>/__mocks__/styleMock.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'scss'],
  testRegex: '/test/.*.test.jsx?$',
  transform: {
    '\\.jsx?$': './script/jest/codePreprocessor'
  },
  testURL: 'http://localhost'
}
