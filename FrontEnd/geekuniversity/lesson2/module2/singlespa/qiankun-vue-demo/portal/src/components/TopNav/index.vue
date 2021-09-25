<template>
  <div class="portal-top-nav" v-if="subApp && subApp.length">
    <el-tabs v-model="activeName" @tab-click="tabsClick" ref="tabs">
      <el-tab-pane
        v-for="item of subApp"
        :data-appMenus="item.appMenus"
        :key="item.appPrefix"
        :name="item.appPrefix"
      >
        <span slot="label">
          <i style="margin-right: 2px;" v-if="item.icon" :class="item.icon"></i>{{item.appName}}
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-dropdown class="drapdown-top-nav" trigger="click" size="small" @command="(e, a) => handleCommand(e, a)">
      <div class="sub-app-list">
        <div class="text">
          子应用列表<i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :data-appMenus="item.appMenus"
            :command="item.appPrefix"
            v-for="item of subApp"
            :key="item.appPrefix"
            :class="{'active': activeName === item.appPrefix}"
          >
            <i style="margin-right: 2px;" v-if="item.icon" :class="item.icon"></i>{{item.appName}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </div>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from '@/router'
import { Loading } from 'element-ui'
export default {
  name: 'TopNav',
  data() {
    return {
      activeName: ''  // 标记第几个应用  以appPrefix为标记
    }
  },
  computed: {
    ...mapGetters(['subApp', 'addRouters'])
  },
  watch: {
    $route(to,from) {
      let appPrefix = to.meta.appPrefix? to.meta.appPrefix : ''
      let lastPrefix = sessionStorage.getItem("subAppPrefix", true)
      sessionStorage.setItem('subAppPrefix', appPrefix, true)
      if (appPrefix) {
        let index = this.subApp.findIndex(item => item.appPrefix === appPrefix)
        let appMenus = this.subApp[index].appMenus
        this.setActiveSubApp()
        if (appPrefix !== lastPrefix && lastPrefix) {
          this.changeSiderbar(appPrefix, appMenus, to.path)
        }
      }
    }
  },
  mounted() {
    this.setActiveSubApp()
    this.$nextTick(() => this.transformBugFix())
  },
  methods: {
    ...mapActions(['generateRoutes']),
    // 设置首次激活子应用
    setActiveSubApp() {
      const subAppPrefix = sessionStorage.getItem("subAppPrefix", true)
      let activeName
      if (subAppPrefix) {
        let index = this.subApp.findIndex(item => item.appPrefix === subAppPrefix)
        activeName = this.subApp[index].appPrefix
      } else {
        activeName = this.subApp[0].appPrefix
      }
      this.activeName = activeName
    },
    goto(title, href) {
      // 切换子应用的loading
      if (window.$portalLoading) {
        window.$portalLoading.close()
        window.$portalLoading = null
      }
      window.$portalLoading = Loading.service({
        lock: true,
        text: '正在加载应用中...',
        target: document.getElementsByClassName('app-main')[0],
        spinner: 'el-icon-loading',
        color: '#fff',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      window.history.pushState({}, title, href)
    },
    getFirstPath(child) {  // 递归出第一个path
      if (!child.noDisplay && !child.hidden) {
        let path = child.path
        if (child.children && child.children.length) {
          path = this.getFirstPath(child.children[0])
        }
        return path
      }
    },
    changeSiderbar(appPrefix, appMenus, path, tabsIndex) {
      let newPath
      if (path) {
        newPath = path
      } else {
        // 第一个递归
        for (let i = 0; i < appMenus.length; i ++) {
          newPath = this.getFirstPath(appMenus[i])
          if (newPath) break
        }
        // newPath = this.getFirstPath(appMenus[0])
        newPath = newPath.indexOf(appPrefix) !== -1? newPath: appPrefix+newPath
      }
      // 更换左侧 路由信息
      this.generateRoutes(appMenus).then(() => {
        // 动态添加新路由
        router.addRoutes(this.addRouters)
        // 存储 当前应用的 前缀 用于刷新时  能定位到
        sessionStorage.setItem('subAppPrefix', appPrefix, true)
        sessionStorage.setItem('refreshApp', appPrefix, true)
        if (/\/$/.test(newPath)) {
          newPath = newPath.substring(0, newPath.length-1)
        }
        this.goto(appPrefix, newPath)
      })
      // 覆盖 tabs组件的 移动机制
      this.transformBugFix(tabsIndex)
      // if (tabsIndex && tabsIndex == 9 && tabsIndex == this.subApp.length - 1) 
    },
    tabsClick(e) {
      if (sessionStorage.getItem("subAppPrefix", true) === this.activeName) return
      // 跳转 激活应用
      const appPrefix = e.name
      const appMenus = e.$attrs['data-appMenus']
      this.changeSiderbar(appPrefix, appMenus, null, e.index)
    },
    transformBugFix(tabsIndex) {
      const wrap = this.$refs.tabs.$el
      const iscrollObj = wrap.getElementsByClassName('el-tabs__nav')[0]
      const wrapWidth = parseFloat(this.getWidth(wrap))
      const iscrollObjWidth = parseFloat(this.getWidth(iscrollObj))
       //  只有可以移动的时候才覆盖 移动机制
      if (wrapWidth < iscrollObjWidth) {
        let a = 0
        if (!tabsIndex) {
          tabsIndex = this.subApp.findIndex(item => item.appPrefix === this.activeName)
          a = 50
        }
        let translateNum
        if (tabsIndex == 0) {  // tabs第一个
          translateNum = 0
        } else if (tabsIndex == this.subApp.length - 1) {  // tabs最后一个
          translateNum = iscrollObjWidth - wrapWidth + parseFloat(iscrollObj.children[parseInt(tabsIndex) + 1].clientWidth / 2) + a
        } else {  // 中间的
          const { offsetWidth, offsetLeft } = iscrollObj.children[parseInt(tabsIndex) + 1]
          translateNum = offsetWidth + offsetLeft - (wrapWidth +32 )/2
        }
        setTimeout(() => {
          iscrollObj.style.transform = `translateX(-${translateNum}px)`
        }, 0)
      }
    },
    getWidth(obj) {
      if (obj.style.width) {
        return obj.style.width
      } else {
        return window.getComputedStyle? window.getComputedStyle(obj, null).width: obj.currentStyle.width
      }
    },
    handleCommand(command, e) {
      if (sessionStorage.getItem("subAppPrefix", true) === command) return
      this.activeName = command
      const appPrefix = command
      const appMenus = e.$attrs['data-appMenus']
      this.changeSiderbar(appPrefix, appMenus, null, e.index)
    }
  }
}
</script>

<style lang="less" scoped>
.portal-top-nav {
  flex: 1;
  overflow-y: hidden;
  overflow-x: auto;
  margin-left: 20px;
  /deep/ .el-tabs__nav-prev, /deep/ .el-tabs__nav-next {
    line-height: 64px;
    font-weight: bold;
    font-size: 16px;
  }
  /deep/ .el-tabs__content {
    display: none
  }
  /deep/ .el-tabs__active-bar {
    right: -7px!important;
    height: 4px!important;
  }
  /deep/ .el-tabs__nav {
    margin-right: 7px;
  }
}
.drapdown-top-nav {
  display: none;
  .sub-app-list {
    width: 100px;
    height:64px;
    display: flex;
    align-items: center;
    margin-left: 2px;
    .text {
      cursor: pointer;
      position: relative;
      background: rgba(235, 238, 241, 0.7);
      box-shadow: 0 0 8px rgba(204, 204, 204, 0.9);
      height: 46px;
      padding: 0 20px;
      border-radius: 25px;
      line-height: 46px;
      .el-icon-caret-bottom {
        position: absolute;
        right: 4px;
        top: 17px;
        font-size: 12px;
      }
    }
  }
}
@media screen and (max-width: 774px) {
  .drapdown-top-nav {
    display: block;
  }
  .portal-top-nav .el-tabs {
    display: none!important
  }
}
</style>
