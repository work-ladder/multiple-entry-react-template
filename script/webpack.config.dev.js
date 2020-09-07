const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html模板
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽取css插件
const postcssNormalize = require('postcss-normalize') // 允许css文件中用@import引入其他css文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css文件
const safePostCssParser = require('postcss-safe-parser') // 查找并修复 CSS 语法错误(网上这么写的)暂时没发现有什么用
const portfinder = require('portfinder')// 检查端口是否被占用
const apiMocker = require('mocker-api') // mock工具可以热更新比json-server好用
let configs = []
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
      loader: 'resolve-url-loader',
      options: {
        sourceMap: shouldMap
      }
    }, preProcessor)
  }
  return loaders
}

// 这里是多页应用配置
const getPlugins = env => {
  const plugins = [
    ...configs.map(
      e =>
        new HtmlWebpackPlugin({
          template: e.template, // 模板路径
          filename: `${e.name}/index.html`, // 输出的html文件名和位置
          favicon: path.resolve('public/favicon.ico'),
          title: e.title,
          hash: true, // 引入的js会带上hash参数,
          inject: e.inject,
          chunks: [e.name],
          minify: {
            removeAttributeQuotes: true, // 去掉双引号html
            collapseInlineTagWhitespace: true, // 折叠html成一行
            minifyCSS: true // 压缩内联css
          }
        })
    ),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin() // 热更新只能在开发环境中使用
  ]
  return plugins
}

module.exports = async env => {
  const port = await portfinder.getPortPromise({
    port: 8000, // 起始端口号
    stopPort: 9000 // 最大端口号
  }) // 这里检查到端口被占用自动+1 默认端口8000
  const entry = {}
  configs = require('./development.config.json')
  configs.forEach(e => {
    entry[e.name] = e.entry
  })
  return {
    devServer: {
      before (app) {
        apiMocker(app, path.resolve('./mock/mocker.js'))
      },
      // 开发服务器配置
      stats: 'errors-only',
      open: true, // 打开浏览器
      overlay: true, // 出现编译器错误或警告时，在浏览器中显示全屏覆盖。默认禁用。如果只想显示编译器错误
      port, // 端口号
      progress: true, // 加进度条,会在控制台显示一堆信息，可以去掉
      disableHostCheck: true, // 防止ie报警
      openPage: `${configs[0].name}/index.html`, // 需要打开的页面
      // https:true,//启用https一般不用
      // contentBase:"./dist",//入口文件夹，可以不写默认dist,别的目录名需要写
      compress: true // 设置开启压缩
    },
    devtool: 'cheap-module-eval-source-map', // 最新版用这个
    // 下列优化项
    optimization: {
      minimize: true, // 启用/禁用多进程并行运行，不设置true下面无效
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldMap && {
              // 不生成内联映射,这样配置就会生成一个source-map文件
              inline: false,
              // 向css文件添加source-map路径注释
              // 如果没有此项压缩后的css会去除source-map路径注释
              annotation: true
            }
          },
          cssProcessorPluginOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }]
          }
        })
      ]
    },
    mode: env, // 两种模式一种development开发，一种production生产
    entry, // 入口
    output: {
      filename: 'js/[name].js', // 写成bundle.[hash].js会将文件名hash化  bundle.[hash:8].js只有8位hash
      chunkFilename: 'js/[name].js',
      publicPath: '/',
      path: path.resolve(
        __dirname,
        'dist'
      ) // 设置输出目录
    },
    plugins: getPlugins(env),
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
      extensions: ['.js', '.jsx', '.json']
      // 设置别名
      // alias: {
      //   fish: '@sdp.nd/fish' // 这样配置后fish  可以指向 @sdp.nd/fish 目录
      // }
    }
  }
}
