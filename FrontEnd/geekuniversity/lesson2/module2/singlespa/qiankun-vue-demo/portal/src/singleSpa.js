import {
  registerMicroApps,  // 注册子应用
  runAfterFirstMounted,  // 第一个子应用加载完毕
  setDefaultMountApp,  // 设置默认启动的子应用
  start,   // 启动
  addGlobalUncaughtErrorHandler,
  // removeGlobalUncaughtErrorHandler
} from 'qiankun'
import { mapGetters } from 'vuex'
import fetch from 'isomorphic-fetch'
import consoleProxy from '@/utils/console'
import { appInfos, genActiveRule } from './appInfos'
export default {
  name: 'master',
  watch: {
    $route(to,from) {
      if (to.path.split('/')[1] !== from.path.split('/')[1]) {  // 不是在同一个子应用中切换
        let key
        for (let a in this.retryTimer) {
          if (from.path.indexOf(a)!==-1) {
            key = a
            break
          }
        }
        if (key) {
          window.clearTimeout(this.retryTimer[key].timer)
          this.hideLoading()
          this.retryTimer[key].timer = null
        }
      }
      // 切换页面时  将 errorApp page取消
      if (this.errorApp) this.errorApp = false
      if (from.path.indexOf('/portal-login')!==-1) {  // 如果是从登陆页来的
        // 如果携带 重定向页面 则将重定向页面的子应用当做第一个子应用来加载 否则默认第一个子应用
        this.registerSubapp(from.query.redirect)
      }
      // 排除第一次就404 页面的情况 
      // 匹配上 且第一次注册 再 注册子应用 
      let flag = this.apps.some(item => to.path.indexOf(item.href) !== -1)
      if (flag && this.isFirstMount) this.registerSubapp(to.path)
    }
  },
  data () {
    // 传递给子应用的数据或者方法
    const parentThat = this
    const props = {
      data: {
        auth: false
      },
      fns: {
        portal_alert(txt) {
          // txt 子应用传递的值
          alert('父应用的方法:' + txt)
        },
        portal_logout() {
          parentThat.$store.dispatch('fedLogOut').then(() => {
            const fullPath = parentThat.$route.fullPath
            const path = fullPath ? `/portal-login?redirect=${fullPath}` : '/portal-login'
            parentThat.$router.push({ path })
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
      }
    }
    return {
      load404App: {},
      retryTimer: {},
      isFirstMount: true,
      tryRequestNum: 0,
      errorApp: false, // 遇到错误的子应用
      loading: null,
      appContent: null,
      apps: appInfos.map(app => {
        return {
          ...app,
          props,
          render: this.render,
          activeRule: genActiveRule(app.href)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['subApp'])
  },
  // 解决刷新 路由信息变化未触发的情况
  created () {
    let flag = this.apps.some(item => this.$route.path.indexOf(item.href) !== -1)
    if (flag && this.isFirstMount) this.registerSubapp(this.$route.path)
  },
  methods: {
    registerSubapp(redirect) {
      if (!window.__POWERED_BY_QIANKUN__) {
        this.isFirstMount = false
        this.showLoading()
        addGlobalUncaughtErrorHandler(this.globalError)
        this.initQiankun(redirect)
      } else {
        location.reload()
      }
    },
    globalError(e) {
      // 重置重连次数
      const curPath = this.$route.path.split('/')[1]
      if (this.retryTimer[curPath] && !this.retryTimer[curPath].timer) {  // 有子应用的错误机制
        this.tryRequestNum = 0
        this.request(this.retryTimer[curPath].url)
      }
      // 404 页面 再次提示
      if (this.load404App[curPath]) {
        this.request(this.load404App[curPath])
      }
    },
    // 自定义的 fetch钩子函数 用于子应用 试错机制
    request(url) {
      const that = this
      return new Promise((resolve, reject) => {
        fetch(url, {
          herders: {
            'Access-Control-Request-Method': '*'
          },
          referrerPolicy: 'origin-when-cross-origin'
        })
        .then(res => {
          const key = that.$route.path.split('/')[1]
          // 子应用未部署情况
          if (res.status == 404) {
            if (window.$portalLoading) {
              window.$portalLoading.close()
              window.$portalLoading = null
            }
            that.hideLoading()
            // 提示
            that.$message.error('填写正确的项目地址或者请部署子应用')
            // 将其url添加404url中 用于下次再点击提示
            that.load404App[key] = url
            resolve()  // 返回 状态给qiankun
          }
          // 重连机制 如果成功 需清除 重连列表
          that.tryRequestNum = 0
          if (that.retryTimer[key]) {
            window.clearTimeout(that.retryTimer[key].timer)
            delete that.retryTimer[key]
          }
          resolve(res)  // 返回子应用资源给 主应用 否则会一直 pending中...
        })  
        .catch(err => {  // 捕获 子应用加载错误
          // 重新加载
          // 设定超时时间  5s  5s 内如果加载不出来 则进行再次加载
          const key = that.$route.path.split('/')[1]
          if (that.tryRequestNum <= 3) {  // 重连三次
            let timer = setTimeout(() => {
              that.tryRequestNum ++
              if (window.$portalLoading) window.$portalLoading.setText(`正在重连子应用第${that.tryRequestNum}次`)
              if (that.loading) that.loading.setText(`正在重连子应用第${that.tryRequestNum}次`)
              that.request(url)
            }, 3000)
            that.retryTimer[key] = { timer, url }
          } else {
            if (window.$portalLoading) {
              window.$portalLoading.close()
              window.$portalLoading = null
            }
            that.hideLoading() 
            that.errorApp = true
            that.tryRequestNum = 0
          }
          // 返回加载失败 去除pending状态
          reject(err)
        })
      })
    },
    render ({ appContent, loading }) {
      this.appContent = appContent
    },
    showLoading() {
      if (this.loading) {
        this.loading.close()
        this.loading = null
      }
      this.loading = this.$loading({
        lock: false,
        text: '正在加载应用中...',
        target: document.getElementsByClassName('app-main')[0],
        spinner: 'el-icon-loading',
        color: '#fff',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'app_load_loading'
      })
    },
    hideLoading() {
      if (this.loading) {
        this.loading.close()
        this.loading = null
      }
    },
    initQiankun (redirect) {
      const { apps } = this
      registerMicroApps(
        apps,
        {
          beforeLoad: [
            app => {
            }
          ],
          beforeMount: [
            app => {
              // 应用之间切换动画
              setTimeout(() => {
                this.$refs['animateApp'].className = 'app_transform_enter'
              }, 500)
            }
          ],
          afterUnmount: [
            app => {
              
            }
          ],
          afterMount: [
            app => {
              if (window.$portalLoading) {
                window.$portalLoading.close()
                window.$portalLoading = null
              }
            }
          ],
          beforeUnmount: [
            app => {
              // 应用之间切换动画
              this.$refs['animateApp'].className = 'app_transform_leave'
            }
          ]
        },
        // 自定义fetch方法
        {
          fetch: this.request
        }
      )
      // 默认启动其第一个子应用
      // 默认加载 路由匹配的 应用 为第一应用  否则启动第一个应用
      let index
      if (!redirect) {
        redirect = this.subApp[0].appPrefix
      }
      index = apps.findIndex(item => redirect.indexOf(item.href) !== -1)
      const defaultApp = apps[index] || {}
      console.log(defaultApp, 'defaultApp')
      setDefaultMountApp(defaultApp.href)
      
      // 第一个子应用加载完毕
      runAfterFirstMounted(() => {
        this.hideLoading()
        console.info('first app mounted')
      })
      // 启动微服务
      const jsSandbox = true
      start({
        prefetch: false,  //是否开启预加载
        jsSandbox, // 是否开启沙箱
      })
      if (jsSandbox) {
        window.console = consoleProxy(window.console)
      }
    }
  }
}