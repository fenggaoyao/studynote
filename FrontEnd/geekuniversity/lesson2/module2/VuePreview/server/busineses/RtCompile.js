var path = require('path')
const webpack = require('webpack')
const utils = require('../../vue.loader.utils')

const vueConfig = {
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: [
        'iOS >= 7',
        'Android >= 4.0',
        'last 2 Chrome versions',
        'last 2 Safari versions'
      ]
    })
  ],
  loaders: utils.cssLoaders({ sourceMap: false, extract: true })
}

export default function (req, res, next) {
  let source = path.join(__dirname, '../../upload/component/QA/Question.vue')
  let distPath = path.join(__dirname, '../../static/h5/components/cache/QA')
  let dist = path.join(
    __dirname,
    '../../static/h5/components/cache/QA/Question.compiled.js'
  )
  let distVue = path.join(
    __dirname,
    '../../static/h5/components/cache/QA/Question.vue.js'
  )

  // browserify(source)
  //     .transform(vueify)
  //     .bundle()
  //     .pipe(fs.createWriteStream(distVue))

  let config = {
    entry: {
      RtComponent: [source] // 源文件
    },
    output: {
      path: distPath, // 输出目录
      filename: compo.name + '.js', // 文件名
      publicPath: '',
      library: compo.name,
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loaders: 'vue-loader',
          options: vueConfig
        },
        {
          test: /\.js$/,
          loaders: 'babel-loader',
          exclude: [
            path.join(__dirname, './node_modules/'),
            path.join(__dirname, './buildBase/')
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          loaders: 'url-loader',
          query: {
            limit: 8192,
            name: '[name].[ext]'
            // name: './images/[name].[ext]?[hash:8]'
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'autoprefixer-loader?{browsers:["iOS >= 7","Android >= 4.0","last 2 Chrome versions","last 2 Safari versions"]}'
          ]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader?sourceMap']
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader?sourceMap']
        },
        {
          test: /\.woff(\?t=\d+)?$/,
          use: ['url-loader?limit=10000&mimetype=application/font-woff']
        },
        {
          test: /\.woff2(\?t=\d+)?$/,
          use: ['url-loader?limit=10000&mimetype=application/font-woff']
        },
        {
          test: /\.ttf(\?t=\d+)?$/,
          use: ['url-loader?limit=10000&mimetype=application/octet-stream']
        },
        {
          test: /\.eot(\?t=\d+)?$/,
          use: ['file-loader']
        },
        {
          test: /\.svg(\?t=\d+)?$/,
          use: ['url-loader?limit=10000&mimetype=image/svg+xml']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue: 'vue/dist/vue.js'
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false
      })
    ]
  }
  console.log('start compile...')

  // 运行webpack，编辑vue里的style部分
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err)
    }
    console.log('compile success')
    res.json({
      error_no: 0,
      error_msg: '',
      result: {
        js: distFile // 不带.js后缀
      }
    })
  })
}
