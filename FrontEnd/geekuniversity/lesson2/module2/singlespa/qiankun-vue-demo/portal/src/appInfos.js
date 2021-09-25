const genActiveRule = routerPrefix => {
  return location => location.pathname.startsWith(routerPrefix)
}

const appInfos = process.env.NODE_ENV === 'production'
// href 地址 请填写 子项目 package.json里的name 字段
  ? [  // 生产环境 子应用 配置项
    // 整个微服务采用了 browserhistory模式
    // ======= 单独部署 ====== 
    //  填写 项目url 地址 如 https://aistatic.huiqulx.com
    // =======  部署在 主应用下的目录里  ====== 
    // 如 /subapp/sub-app2/ 文件夹内 请填写 /subapp/sub-app2/index.html
    // ------- 修改 vue.config.js 中的publicPath
    // 部署的时候 如果在根目录下 请填写 process.env.VUE_APP_BASE_PATH
    // 如果在二级目录里 请填写 对应的 二级目录  如 /subapp/sub-app2/
    // 如果单独部署 直接填写 url地址 如 https://aistatic.huiqulx.com/ 
    // 单独部署 请注意 是 history 路由模式 请 nginx 支持 
    // 如果 部署在主应用 目录下 如 /subapp/sub-app2/ 文件夹内 请填写 /subapp/sub-app2/index.html
    { name: 'sub-app1', entry: '/subapp/sub-app1/index.html', href: '/sub-app1' },
    { name: 'sub-app2', entry: '/subapp/sub-app2/index.html', href: '/sub-app2' },
    { name: 'sub-app3', entry: 'https://aistatic-dev.huiqulx.com/activity/index.html', href: '/sub-app3' },
    { name: 'sub-app4', entry: 'https://aistatic.huiqulx.com/activity1/index.html', href: '/sub-app4' },
  ]
  : [  // 开发环境 子应用 配置项
    { name: 'sub-app1', entry: '//localhost:8081', href: '/sub-app1' },
    { name: 'sub-app2', entry: '//localhost:8082', href: '/sub-app2' },
    { name: 'sub-app3', entry: '//localhost:8083', href: '/sub-app3' },
    { name: 'sub-app4', entry: '//localhost:8084', href: '/sub-app4' },
  ]
// 如果 编辑  子应用信息异常 抛出 错误
for (let i = 0; i < appInfos.length; i++) {
  if ('/' + appInfos[i].name !== appInfos[i].href) {
    throw  `${appInfos[i].name}子应用: 请保证name字段和href字段 一致 例子 name: sub-app1 href: /sub-app1`
  } else if (!appInfos[i].entry) {
    throw `${appInfos[i].name}子应用: 请填写 entry字段， 如不明白 请联系 csj`
  }
}

export { appInfos, genActiveRule }
