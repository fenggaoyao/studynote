const { name } = require('./package.json')
module.exports = {
  // 关闭 eslint 检测
  lintOnSave: false,
  // 生产环境不生成sourcemap文件
  productionSourceMap: false,
  filenameHashing: true,
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === 'development'?
    process.env.VUE_APP_BASE_PATH : '/subapp/sub-app1/',

  chainWebpack: config => {
    config
      /**
       * 删除懒加载模块的prefetch，降低带宽压力
       * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
       * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
       */
      .plugins
        .delete('prefetch')
      .end()
      .optimization
        .minimize(true) // 压缩代码
        .splitChunks({ chunks: 'all' })  // 分割代码
      .end()
      // 开发环境配置
      .devServer
        .disableHostCheck(true)
        .headers({  // 确保 主项目能fetch 避免跨域
          'Access-Control-Allow-Origin': '*'
        })
      .end()
      // 把子应用打包成 umd 库格式
      .output
        .library(`${name}-[name]`)
        .libraryTarget('umd')
        .jsonpFunction(`webpackJsonp_${name}`)
  }
}
