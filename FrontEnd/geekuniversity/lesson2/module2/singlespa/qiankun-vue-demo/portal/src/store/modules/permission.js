import { asyncRouterMap, constantRouterMap } from '@/router'
import { appInfos } from '@/appInfos'
const formatterRoutes = (menu, appPrefix, appName) => {
  const accessedRoutes = []
  menu.map(item => {
    // if (!item.noDisplay) {
      const defaultOpt = {
        path: appPrefix + item.path,
        meta: {
          title: item.menuName,
          icon: item.icon,
          appName,
          appPrefix
        },
        hidden: item.hidden,
        noDisplay: item.noDisplay
      }
      if (
        item.children &&
        Object.prototype.toString.call(item.children) === '[object Array]' &&
        item.children.length
      ) {
        accessedRoutes.push({
          ...defaultOpt,
          alwaysShow: true,
          children: formatterRoutes(item.children, appPrefix, appName)
        })
      } else {
        accessedRoutes.push({...defaultOpt})
      }
    // }
  })
  return accessedRoutes
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    showSubApp: false,
    // isShow404: false,
    subApp: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    UPDATE_ROUTERS: (state, routers) => {
      state.routers = constantRouterMap
      state.addRouters = []
    },
    SET_SHOW_TRUE: (state) => {
      state.showSubApp = true
    },
    // SET_SHOW_404: (state, flag) => {
      // state.isShow404 = flag
    // },
    SET_SUB_APP: (state, subapp) => {
      state.subApp = [...subapp]
    }
  },
  actions: {
    generateRoutes({ commit }, menus) {
      return new Promise(resolve => {
        // 动态加入 路由  等真实接口 要排除一些权限路由不显示 以及一些 不显示在 左侧栏的 路由
        // asyncRouterMap
        // 先取第一个
        const accessedRoutes = [...menus]
        accessedRoutes.push(...asyncRouterMap)
        console.log('accessedRoutes', accessedRoutes)
        // 检测 appInfos和accessedRoutes 是否一致 抛出异常
        if (!accessedRoutes.length) {
          throw '请确保菜单管理中配置了子应用的菜单信息'
        }
        const path = accessedRoutes[0].path.split('/')[1]

        let flag = appInfos.findIndex(item => item.name === path)
        if (flag === -1) {
          throw `请确保appInfos里的name字段和菜单管理中配置的应用前缀一致`
        }

        // 清除以前的动态路由
        const addRouters = [...this.getters.addRouters]
        if (addRouters && addRouters.length) {
          commit('UPDATE_ROUTERS', addRouters)
        }
        commit('SET_ROUTERS', accessedRoutes)
        resolve()
      })
    },
    generateSubApp({ commit }, menus) {
      return new Promise(resolve => {
        const newMenus = []
        menus.map(item => {
          // 对子应用做权限判断  。。。。。
          // if (!item.noDisplay) {  // 如果有权限  则添加
            newMenus.push({ ...item, appMenus: formatterRoutes(item.appMenus, item.appPrefix, item.appName) })
          // }
        })
        commit('SET_SUB_APP', newMenus)
        resolve()
      })
      
    },
    setShowTrue({ commit }) {
      commit('SET_SHOW_TRUE')
    },
    // setShow404({ commit }, flag) {
      // commit("SET_SHOW_404", flag)
    // }
  }
}

export default permission
