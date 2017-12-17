const fs = require('fs')
const webpack = require("webpack")
const process = require('process')
const path = require('path')
const base = path.resolve(__dirname, "../")

const res = p => path.resolve(__dirname, p)

const nodeModules = res('../node_modules')
const entry = res('../server/render.js')
const output = res('../buildServer')
const WriteFilePlugin = require('write-file-webpack-plugin')

const externals = fs
    .readdirSync(nodeModules)
    .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
    .reduce((externals, mod) => {
        externals[mod] = `commonjs ${mod}`
        return externals
    }, {})

externals['react-dom/server'] = 'commonjs react-dom/server'

const common_rules = [
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'], // 'babel-loader' is also a legal name to reference
    },
    {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
            //   modules: true,
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
      },
    // {
    //     test: /\.styl$/,
    //     exclude: /node_modules/,
    //     use: ['style-loader',
    //         {
    //             loader: 'css-loader/locals',
    //             options: { importLoaders: 1, sourceMap: true } //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
    //         },
    //         {
    //             loader: 'postcss-loader',
    //             options: {
    //                 sourceMap: true,
    //                 plugins: [
    //                     require('postcss-px2rem')({ remUnit: 75 }),
    //                     require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions'] })
    //                 ]
    //             }
    //         },
    //         'stylus-loader'
    //     ]
    // },
    {
        test: /\.(png|gif|jpg|jpeg|ico)$/,
        exclude: /(node_modules|bower_components)/,
        //use: 'file-loader?name=[name].[ext]&outputPath=//img.58cdn.com.cn/crop/zcm/image/&publicPath=', //./||//img.58cdn.com.cn/crop/zcm/image/
        use: 'file-loader?name=[name].[ext]&outputPath=/&publicPath=//img.58cdn.com.cn/crop/zcm/lottery',
    },
    {
        test: /\.css$/,
        use: [
            {
                loader: 'css-loader/locals',
                options: {
                    // modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                }
            },
            {
                loader: 'stylus-loader'
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


const conf = {
    name: "server",
    devtool: 'eval',
    target: "node",
    entry: [entry],
    externals,
    output: {
        path: output,
        filename: '[name].js',
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.js', '.css', '.styl']
    },
    plugins: [
        new WriteFilePlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
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