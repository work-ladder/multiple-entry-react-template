module.exports = {
  verbose: true,
  moduleNameMapper: {
    '^fish': '/node_modules/@sdp.nd/fish',
    '\\.[scss|less]$': '<rootDir>/__mocks__/styleMock.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'scss'],
  testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node'],
  testRegex: '/test/.*.test.jsx?$',
  transformIgnorePatterns: [
    '/dist/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)' // Ignore modules without es dir
  ],
  testURL: 'http://localhost'
}
