const path = require('path');
const Glob = require('Glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { NODE_ENV, PUBLIC_PATH } = require('../config');

require('nodemon')('./dyson_services/index.js');

let entry = require('./entry');
let vendor = NODE_ENV !== 'production' ? { vendor: ['jquery', 'bootstrap', 'bootstrap/dist/css/bootstrap.css'] } : {}

module.exports = {
    context: path.resolve(__dirname, '..', 'app'),
    entry: entry.reduce((total, current) => { return Object.assign(total, current.js) }, vendor),
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: NODE_ENV === 'development' ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
        publicPath: PUBLIC_PATH,
        pathinfo: NODE_ENV === 'development'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'app')
        }
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    publicPath: '../',
                    // 则这里的 publicPath 作用于css里面的图片的对外路径，和css里面字体的对外路径
                    // 不作用于link标签的href属性
                    // 如果设置 图片loader的publicPath，则会覆盖css里面 图片的对外路径
                    // 如果设置 字体loader的publicPath，则会覆盖css里面 字体的对外路径
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: 'postcss.config.js',
                                ctx: {
                                    autoprefixer: {browsers: ['> 1%']}
                                }
                            }
                        }
                    }],
                })
            },
            {
                test: /\.html$/,
                use: [{
                        loader: "html-withimg-loader",
                        options: {
                            // exclude: /image/,//排除image目录
                            min: false,//默认会去除html中的换行符，配置min=false可不去除
                            deep: false,//将关闭include语法嵌套子页面的功能
                        }
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ['img:data-src'],
                            interpolate: true,//为 ES6 模板字符串启用插值语法
                            minimize: false,
                            removeComments: false,
                            collapseWhitespace: false,
                        }
                    }]
            }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.join(__dirname, '..', 'app/assets/sprite/'),
                glob: '*.png'
            },
            target: {
                image: path.join(__dirname, '..', 'app/assets/img/_sprites.png'),
                css: [
                    [path.join(__dirname, '..', 'app/assets/css/_sprites.css'), {
                        format: 'handlebars_based_template'
                    }]
                ]
            },
            apiOptions: {
                cssImageRef: '../img/_sprites.png'
            },
            customTemplates: {
                'handlebars_based_template': path.join(__dirname, '..', 'handlebarsStr.css.handlebars')
            },
            spritesmithOptions: {
                padding: 10
            }
        }),
        ...entry.map((current) => {
            return current.html
        }).map((current) => {
            return new HtmlWebpackPlugin(current)
        }),
        // new webpack.DllReferencePlugin({
        //     manifest: require('../dll_modules/dll-manifest.json')
        // }),
        // new AddAssetHtmlPlugin([{
        //     filepath: path.join(__dirname, '..', 'dll_modules', 'dll.js'),
        //     hash: true,
        //     outputPath: 'vendor',
        //     publicPath: './vendor/',
        //     includeSourcemap: false
        //     // 默认为true。 当设置为true时，add-asset-html-plugin 会查找js的sourceMap文件
        // }])
    ]
}


