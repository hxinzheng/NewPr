const webpack = require("webpack")
const process = require('process')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const base = path.resolve(__dirname, "../")


const common_libs = [
  'babel-polyfill',
  'axios',
  'inline-style-prefixer',
  'react',
  'react-dom',
  'qs',
  'url-parse',
  'redux',
  'react-redux',
  'redbox-react',
  'react-tap-event-plugin',
  'react-router-dom',
  'redux-persist',
  'redux-thunk',
  'md5',
  'underscore',
  'animated',

]

const common_rules = [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: ['babel-loader'], // 'babel-loader' is also a legal name to reference
  }, {
    test: /\.styl$/,
    use: ['style-loader',
      {
        loader: 'css-loader',
        options: { importLoaders: 1 } //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('postcss-px2rem')({ remUnit: 75 }),
            require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions'] })
          ]
        }
      },
      'stylus-loader'
    ]
  },
  {
    test: /\.(sass|scss)$/,
    use: ['style-loader',
      {
        loader: 'css-loader',
        options: { importLoaders: 1 } //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('postcss-px2rem')({ remUnit: 75 }),
            require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions'] })
          ]
        }
      },
      'sass-loader'
    ]
  },
  {
    test: /\.(png|gif|jpg|jpeg|ico)$/,
    exclude: /(node_modules|bower_components)/,
    //use: 'file-loader?name=[name].[ext]&outputPath=//img.58cdn.com.cn/crop/zcm/image/&publicPath=', //./||//img.58cdn.com.cn/crop/zcm/image/
    use: 'file-loader?name=[name].[ext]&outputPath=/&publicPath=//img.58cdn.com.cn/crop/zcm/lottery',
  },
  {
    test: /\.less$/,
    use: ['style-loader',
      {
        loader: 'css-loader',
        options: { importLoaders: 1 } //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('postcss-px2rem')({ remUnit: 75 }),
            require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions'] })
          ]
        }
      },
      'less-loader'
    ]
  },
  {
    test: /\.css$/,
    use: ['style-loader',
      {
        loader: 'css-loader',
        options: { importLoaders: 1 } //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('postcss-px2rem')({ remUnit: 75 }),
            require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions'] })
          ]
        }
      }
    ]
  },
  {
    test: /\.(eot|ttf|svg|woff|otf)$/,
    use: [
      {
        loader: 'file-loader',
      }
    ]
  }
]


function dll_config_production(entry) {
  return {
    entry: {
      'react': common_libs
    },
    output: {
      path: path.join(base, "dist/prod"),
      filename: "js/[name].js",
      library: "[name]_100"
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      // new webpack.DllPlugin({
      //   path: path.resolve(base, 'dist/prod/js/[name]-manifest.json'),
      //   name: '[name]_100',
      // }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
}


function dll_config() {
  return {
    entry: {
      'react': common_libs
    },
    output: {
      path: path.join(base, "dist/dev/js"),
      filename: "[name].js",
      library: "[name]_[hash]"
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.resolve(base, 'dist/dev/js/[name]-manifest.json'),
        name: '[name]_[hash]',
      }),
    ]
  }
}

function dev_config(entry, options) {
  const defaultOptions = {
  }
  const conf = {
    devtool: "#source-map",
    entry: ['babel-polyfill', path.resolve(base, 'src/entry/', entry)],
    output: {
      path: path.resolve(base, "dist/dev"),
      filename: 'js/'+entry + ".js"
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.resolve(base, 'dist/dev/js/react-manifest.json'))
      })
    ],
    module: {
      rules: common_rules
    },
    resolve: {
      modules: ['node_modules', path.resolve(base, 'src')]
    }
  }

  return conf
}

function release_config(entry, manifestversion, options) {
  const defaultOptions = {
  }
  const conf = {
    entry: {
      [entry]: [path.resolve(base, 'src/entry/', entry)]
    },
    output: {
      path: path.resolve(base, "dist/prod"),
      filename: "js/" + entry + "_[chunkhash].js",
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.resolve(base, 'manifest/' + manifestversion + '/react-manifest.json')),
      }),
      new HtmlWebpackPlugin({
        filename: entry+'.html',
        template: path.resolve(base,'file-templates/prod/',entry+'.html'),
        inject: true
      }),
      new BundleAnalyzerPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
      rules: common_rules
    },
    resolve: {
      modules: ['node_modules', path.resolve(base, 'src')]
    }
  }

  return conf
}


module.exports = {
  dll_config,
  dev_config,
  release_config,
  dll_config_production
}