const { createTransformer } = require('babel-jest')

module.exports = {
  process (src, path, ...rest) {
    const babelConfig = {}
    babelConfig.plugins = []

    babelConfig.plugins.push([
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'fish',
        libraryDirectory: 'lib'
      }
    ])

    const isJavaScript = path.endsWith('.js') || path.endsWith('.jsx')

    const babelJest = createTransformer(babelConfig)
    const fileName = isJavaScript ? path : 'file.js'
    return babelJest.process(src, fileName, ...rest)
  }
}
