const urlLoader = require('url-loader');
const svgRegex = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
const svgOptions = {
  limit: 10000,
  minetype: 'image/svg+xml',
};

const imageOptions = {
  limit: 10000,
};

module.exports = {
  process(src, filename) {
    const instance = {
      resourcePath: filename,
    };
    if (svgRegex.test(filename)) {
      instance.query = svgOptions;
    } else {
      instance.query = imageOptions;
    }
    const result = urlLoader.call(instance, src);
    return result;
  },
};
