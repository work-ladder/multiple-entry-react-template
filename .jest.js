module.exports = {
  verbose: true,
//   setupFiles: ['./tests/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'scss'],
  testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node'],
  transform: {
    '\\.tsx?$': './script/jest/codePreprocessor',
    '\\.js$': './script/jest/codePreprocessor',
    '\\.(jpg|png|gif|svg)$': './scripts/jest/imagePreprocessor',
  },
  testRegex: "/test/.*.test.jsx?$",
  transformIgnorePatterns:[
    '/dist/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  testURL: 'http://localhost',
};
