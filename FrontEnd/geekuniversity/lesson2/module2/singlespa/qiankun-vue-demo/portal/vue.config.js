const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')

// 运行命令环境 用于 config 区分开发和生成环境
const shell = require("shelljs")
const apiEnv = process.env.API_ENV
shell.cp(`./src/config/${apiEnv}.js`, "./src/config/index.js")

module.exports = {
  lintOnSave: false, // 关闭 eslint 检测
  productionSourceMap: false, // 生产环境不生成sourcemap文件
  configureWebpack: {
    // gzip压缩
    plugins: [
      new CompressionWebpackPlugin(
        {
          filename: info => {
            return `${info.path}.gz${info.query}`
          },
          algorithm: 'gzip', 
          threshold: 10240,
          // 对 js， css, svg 文件都采取 gzip压缩
          test: new RegExp('\\.(' + ['js', 'css', 'svg'].join('|') + ')$'),
          minRatio: 0.8,
          deleteOriginalAssets: false   // 删除原文件
        }
      )
    ],
    // 增加 项目类的别名
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, './src/assets'),
        '@commons': path.resolve(__dirname, './src/commons'),
        '@components': path.resolve(__dirname, './src/components'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@mixins': path.resolve(__dirname, './src/mixins'),
        '@routes': path.resolve(__dirname, './src/routes'),
        '@views': path.resolve(__dirname, './src/views')
      }
    }
  },
  chainWebpack: config => {
    // svg
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')

    // 项目 优化配置
    config
      /**
       * 删除懒加载模块的prefetch，降低带宽压力
       * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
       * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
       */
      .plugins
        .delete('prefetch')
      .end()
    if (process.env.NODE_ENV === 'production') {
      config
        .optimization
          .minimize(true) // js文件最小化处理
          .splitChunks({ chunks: 'all' }) // 分割代码
        .end()
        // .module
        //   .rule('images')   // 图片压缩
        //   .use('image-webpack-loader')
        //   .loader('image-webpack-loader')
        //   .options({ bypassOnDebug: true })
        // .end()
    }
  },
  // 开发环境配置
  devServer: {
    disableHostCheck: true,   // 关闭host check  方便ngrok等内网穿透工具
    //在本地服务器开启gzip，线上服务器 都支持gzip不需要设置
    before(app) {
      app.get(/.*.(js|css|svg)$/, (req, res, next) => {
        req.url = req.url + '.gz'
        res.set('Content-Encoding', 'gzip')
        next()
      })
    }
  }
}
