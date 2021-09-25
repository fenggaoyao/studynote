# 中后台微服务 子应用接入 教程
***************
## 开发环境 配置

### 先在主项目 src/appInfos.js 配置 子项目路径和名称和唯一识别符 (可在基础模块中 编辑信息也行)
```
  { name: 'sub-app1', entry: '//localhost:8081', href: '/sub-app1' }
```
***  其中name 属性为 package.json 里的 name字段 *** 
***  href 为 / + name字段 *** 
***  entry 为 本地开发的 端口 *** 
*** vue.config.js 里配置 publicPath: process.env.VUE_APP_BASE_PATH ***
**************
## 生成环境 部署
### 独立部署 即部署在自己的服务器

** 需将服务器开启跨域 允许 请求静态文件 **
```
修改 主项目 src/appInfos.js (可在基础模块中 编辑信息也行)
{ name: 'sub-app3', entry: 'https://aistatic-dev.huiqulx.com/activity/index.html', href: '/sub-app3' },
```
*** 部署在二级目录时, /activity/ 为 二级目录名 ***
```
vue.config.js 里需配置 publicPath:  process.env.NODE_ENV === 'development'?
    process.env.VUE_APP_BASE_PATH : '/activity/'
```

### 部署  部署在 主应用下的二级目录
```
修改 主项目 src/appInfos.js (可在基础模块中 编辑信息也行)
{ name: 'sub-app2', entry: '/subapp/sub-app2/index.html', href: '/sub-app2' }
```
```
vue.config.js 里需配置 publicPath:  process.env.NODE_ENV === 'development'?
    process.env.VUE_APP_BASE_PATH : 'subapp/sub-app2/'
```


### 新增 storage命名空间 
#### 主应用中  一律在最后一个参数加一个true  子应用正常用即可
```
  主应用中 
  存值 sesstionStorage.setItem('a', 'b', true)
  // 会自动在key上添加 `主应用:a` 作为key
  取值 sesstionStorage.getItem('a', true)
  清除 值 sessionStorage.removeItem('a', true)
  清空 
    sessionStorage.clear(true)  // 清除所有sessionStorage 包括子应用的
    sessionStorage.clear('self')  // 清除主应用的 sessionStorage
  子应用中 
  存值 sessionStorage.setItem('a', 'b')  
  // 会自动在key上添加 '应用名:a' 作为key
  取值 sessionStorage.getItem('a')
  清除 值 sessionStorage.removeItem('a')
  清空 sessionStorage.clear()   // 只清空当前应用的 sessionStorage

localStorage 一样
```