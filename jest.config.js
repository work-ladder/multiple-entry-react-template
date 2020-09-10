module.exports = {
  verbose: true,
  moduleNameMapper: {
    style$: '<rootDir>/__mocks__/styleMock.js',
    '\\.[scss|less]$': '<rootDir>/__mocks__/styleMock.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'scss'],
  testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node'],
  testRegex: '/test/.*.test.jsx?$',
  transform: {
    '\\.jsx?$': './script/jest/codePreprocessor'
  },
  transformIgnorePatterns: [
    '/dist/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)' // Ignore modules without es dir
  ],
  testURL: 'http://localhost'
}
