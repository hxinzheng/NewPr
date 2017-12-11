const webpack = require("webpack")
const process = require('process')
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const base = path.resolve(__dirname, "../")
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')


const common_libs = [
    'babel-polyfill',
    'react',
    'react-dom',
    'qs',
    'url-parse',
    'redux',
    'react-redux',
    'react-tap-event-plugin',
    'react-router-dom',
    'md5',
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
                options: { importLoaders: 1, sourceMap : true } //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap : true,
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


const conf = {
    devtool: "#source-map",
    entry:  ['react-hot-loader/patch', path.resolve(base, 'src/main.js')],
    output: {
        path: path.resolve(base, "build/dev"),
        publicPath : "/",
        filename: 'js/app.js'
    },
    devServer: {
        contentBase: [path.resolve(__dirname, '../build/dev'), path.resolve(__dirname, "../static")],
        hot: true,
        host : "0.0.0.0",
        port : 3001,
        index : "index.html",
        setup : (app) => {
            app.get("/data", (req,res) => {
                const list = [{name : 'ramroll'}, {name : 'tony'}, {name : "stczar"}]
                res.send(JSON.stringify(list))
            })
        }
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
        // new webpack.DllReferencePlugin({
        //     context: process.cwd(),
        //     manifest: require(path.resolve(base, 'build/dev/js/react-manifest.json'))
        // })
        // new BrowserSyncPlugin({
        //     // browse to http://localhost:3000/ during development, 
        //     // ./public directory is being served 
        //     host: '0.0.0.0',
        //     port: 3006,
        //     proxy : "http://localhost:3001"
        // })
    ],
    module: {
        rules: common_rules
    },
    resolve: {
        modules: ['node_modules', path.resolve(base, 'src')]
    }
}


module.exports = conf