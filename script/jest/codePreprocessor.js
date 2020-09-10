const crypto = require('crypto')
const { createTransformer } = require('babel-jest')
const getBabelCommonConfig = require('./getBabelCommonConfig')
const pkg = require('../../package.json')

module.exports = {
  process (src, path, ...rest) {
    global.__clearBabelAntdPlugin && global.__clearBabelAntdPlugin(); // eslint-disable-line
    const babelConfig = getBabelCommonConfig()
    babelConfig.plugins = []

    babelConfig.plugins.push([
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'fish',
        libraryDirectory: '../../components'
      }
    ])

    const isJavaScript = path.endsWith('.js') || path.endsWith('.jsx')

    const babelJest = createTransformer(babelConfig)
    const fileName = isJavaScript ? path : 'file.js'
    return babelJest.process(src, fileName, ...rest)
  },

  getCacheKey (...args) {
    return crypto
      .createHash('md5')
      .update('\0', 'utf8')
      .update('\0', 'utf8')
      .update(pkg.version)
      .digest('hex')
  }
}
