const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html模板
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽取css插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包前清理文件夹
const postcssNormalize = require('postcss-normalize') // 允许css文件中用@import引入其他css文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css文件
const TerserPlugin = require('terser-webpack-plugin') // 压缩js文件

const shouldMap = true // 是否强制需要映射map文件设置成false 生产环境不产生sourcemap文件提高构建速度

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: '../' }
    },
    {
      loader: 'css-loader',
      options: {
        ...cssOptions,
        sourceMap: shouldMap
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'), // 修复css flex相关布局的bug
          require('postcss-preset-env')({
            // 添加兼容性前缀注意要设置package.json的browserslist
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          }),
          postcssNormalize()
        ],
        sourceMap: shouldMap
      }
    }
  ]
  if (preProcessor) {
    loaders.push({
      loader: 'resolve-url-loader', // 让scss生成的源文件地址正确
      options: {
        sourceMap: shouldMap
      }
    }, preProcessor)
  }
  return loaders
}

// 这里是插件
const getPlugins = e => {
  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: e.template, // 模板路径
      favicon: path.resolve('public/favicon.ico'),
      title: e.title,
      hash: true, // 引入的js会带上hash参数,
      minify: {
        removeAttributeQuotes: true, // 去掉双引号html
        collapseInlineTagWhitespace: true, // 折叠html成一行
        minifyCSS: true // 压缩内联css
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    })
  ]
  return plugins
}

const defaultConfigs = require('./production.config.json')

module.exports = defaultConfigs.map(e => env => {
  return {
    devtool: shouldMap ? 'source-map' : '', // 最新版用这个
    // 下列优化项
    optimization: {
      minimize: true, // 启用/禁用多进程并行运行，不设置true下面无效
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            // parser: safePostCssParser,
            map:
              shouldMap
                ? {
                  // 不生成内联映射,这样配置就会生成一个source-map文件
                  inline: false,
                  // 向css文件添加source-map路径注释
                  // 如果没有此项压缩后的css会去除source-map路径注释
                  annotation: true
                }
                : false
          },
          cssProcessorPluginOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }]
          }
        }),
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            keep_classnames: shouldMap,
            keep_fnames: shouldMap,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: true, // 启用/禁用多进程并行运行提高构建速度
          extractComments: false, // 防止生成LICENSE.txt文件
          sourceMap: shouldMap // 生产源码映射文件
        })
      ]
    },
    mode: env, // 两种模式一种development开发，一种production生产
    entry: e.entry, // 入口
    output: {
      filename: 'js/[name].js', // 写成bundle.[hash].js会将文件名hash化  bundle.[hash:8].js只有8位hash
      chunkFilename: 'js/[name].js',
      publicPath: '',
      path: path.resolve(
        __dirname,
        `../dist/${e.name}`
      ) // 设置输出目录
    },
    performance: {
      hints: false// 消除打包时单文件过大警告
    },
    plugins: getPlugins(e),
    module: {
      rules: [
        {
          test: /\.css$/,
          // 先写的后执行
          use: getStyleLoaders({ importLoaders: 1 }),
          sideEffects: true
        },
        {
          test: /\.less$/,
          use: getStyleLoaders(
            { importLoaders: 3 },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ),
          sideEffects: true
        },
        {
          test: /\.(scss|sass)$/,
          use: getStyleLoaders({ importLoaders: 3 }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }),
          sideEffects: true
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/], // 图片loader
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]',
            publicPath: '../'
          }
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader']
        }
      ]
    },
    resolve: {
      // 引入文件时忽略后缀名
      extensions: ['.js', '.jsx', '.json'],
      // 设置别名
      alias: {
        fish: '@sdp.nd/fish' // 这样配置后fish  可以指向 @sdp.nd/fish 目录
      }
    }
  }
})
