const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./vue.loader.utils');

const vueConfig = {
    preserveWhitespace: false,
    postcss: [
        require('autoprefixer')({
            browsers: ['last 5 versions']
        })
    ],
    loaders: utils.cssLoaders({ sourceMap: false })
}

var path = require('path');
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
// 模块导入
module.exports = {
    // 入口文件地址，不需要写完，会自动查找
    entry: {
        main: [
            path.join(__dirname, "./src/preview.js")
        ]
    },

    //输出位置
    output: {
        path: path.join(__dirname, './build'), //配置输出路径，文件地址，使用绝对路径形式
        filename: '[name].js',
        //关于filename 我们有个变量就是 [name] = entry的key  当然还有别的变量比如[id],[hash]等,大家可以自行发挥
        //我们也能把filename写成  filename : [name]/[name].[name].js 也是可以的
        //[name]这里是webpack提供的根据路口文件自动生成的名字
        publicPath: '/'
            // 公共文件生成的地址
    },
    // 加载器
    module: {
        // 加载器
        loaders: [
            // 解析.vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            // 转化ES6的语法
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, './node_modules/')
            },
            // 图片转化，小于200K自动转化为base64的编码
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    limit: 204800,
                    name: './images/[name].[ext]?[hash:8]'
                }
                //在这无论是直接loader 后面跟参数(像url跟参一样)url-loader?limit=8192,或者是后面跟着一个对象 query,都是可以的.类似get请求？
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },{
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?sourceMap'
            },{
                test: /\.woff(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?t=\d+)?$/,
                loader: "file-loader"
            }, {
                test: /\.svg(\?t=\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    // 这里我就只用到一个就是生成 独立的css文件,style嵌套在页面里的方式实在是丑得不行
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            'vue': 'vue/dist/vue.js',
            'components': path.join(__dirname, 'src/components'),
            'api': path.join(__dirname, 'isomorph/api'),
            'request': path.join(__dirname, 'isomorph/request'),
            'platform': path.join(__dirname, 'src/platform.js'),
            'utils': path.join(__dirname, 'src/utils.js'),
        }
    },
    // 开启source-map调试模式，webpack有多种source-map，在官网文档可以查到
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            inject: true
        })
    ]
};
