const path = require('path')
const webpack = require("webpack")
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')



const common_rules = [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: ['babel-loader'], // 'babel-loader' is also a legal name to reference
  },
  {
    test: /\.css$/,
    use: ExtractCssChunks.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            // modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }
      ]
    })
  },
  {
    test: /\.styl$/,
    use: ExtractCssChunks.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            // modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [
              require('postcss-px2rem')({ remUnit: 75 }),
              require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions'] })
            ]
          }
        },
        {
          loader: 'stylus-loader'
        }
      ]
    })
  },
  // {
  //   test: /\.styl$/,
  //   use: ['style-loader',
  //     {
  //       loader: 'css-loader',
  //       options: { importLoaders: 1, sourceMap: true } //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
  //     },
  //     {
  //       loader: 'postcss-loader',
  //       options: {
  //         sourceMap: true,
  //         plugins: [
  //           require('postcss-px2rem')({ remUnit: 75 }),
  //           require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions'] })
  //         ]
  //       }
  //     },
  //     'stylus-loader'
  //   ]
  // },
  {
    test: /\.(png|gif|jpg|jpeg|ico)$/,
    exclude: /(node_modules|bower_components)/,
    //use: 'file-loader?name=[name].[ext]&outputPath=//img.58cdn.com.cn/crop/zcm/image/&publicPath=', //./||//img.58cdn.com.cn/crop/zcm/image/
    use: 'file-loader?name=[name].[ext]&outputPath=/&publicPath=//img.58cdn.com.cn/crop/zcm/lottery',
  },
  // {
  //   test: /\.css$/,
  //   use: ['style-loader',
  //     {
  //       loader: 'css-loader',
  //       options: { importLoaders: 1 } //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
  //     },
  //     {
  //       loader: 'postcss-loader',
  //       options: {
  //         plugins: [
  //           require('postcss-px2rem')({ remUnit: 75 }),
  //           require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions'] })
  //         ]
  //       }
  //     }
  //   ]
  // },
  {
    test: /\.(eot|ttf|svg|woff|otf)$/,
    use: [
      {
        loader: 'file-loader',
      }
    ]
  }
]


const conf = {
  name: "client",
  devtool: 'eval',
  target: "web",
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/'
  },
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/main.js')
  ],
  resolve: {
    extensions: ['.js', '.css', '.styl']
  },
  plugins: [
    new WriteFilePlugin(),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  module: {
    rules: common_rules
  }
}


module.exports = conf