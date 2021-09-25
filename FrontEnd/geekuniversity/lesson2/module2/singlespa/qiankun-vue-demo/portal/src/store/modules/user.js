import { JSEncrypt } from 'jsencrypt'
// import { login, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { KEY } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const encryptor = new JSEncrypt()
encryptor.setPublicKey(KEY)
const user = {
  state: {
    token: getToken(),
    userInfo: {
      currentCampusNames: '总部',
      currentRoleId: '0ef60b0d745849f7af9a90d94c00300,f',
      currentRoleName: 'admin',
      id: '6',
      loginName: 'cg',
      menu: [],
      mobile: '18811117311',
      skinId: 'blackgold',
      staffNo: '111111',
      status: true,
      systemUpdateTime: '系统更新于 2020-02-20 08:07:14',
      updateBy: '超管',
      updateDate: '2020-02-20T10:46:59.000+0000',
      userName: '超管'
    },
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, menu) => {
      state.roles = menu
    }
  },

  actions: {
    // 登录
    login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password.trim()
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin' && password === 'admin') {
            const token = encryptor.encrypt('asasas')
            setToken(token)
            commit('SET_TOKEN', token)
            resolve()
          } else {
            reject('账号密码错误')
          }
        }, 800)
        
        // login(username, userInfo.password)
        //   .then(response => {
        //     const { authSignature } = response.data
        //     const token = encryptor.decrypt(authSignature)
        //     setToken(token)
        //     commit('SET_TOKEN', token)
        //     resolve()
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
      })
    },
    // 获取用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const userInfo = {
          currentCampusNames: '总部111',
          currentRoleId: '0ef60b0d745849f7af9a90d94c00300,f',
          currentRoleName: 'admin',
          id: '6',
          loginName: 'cg',
          menu: [  // 子应用与菜单
            {
              appName: '第一个子应用',
              appPrefix: '/sub-app1',
              icon: 'el-icon-bell',
              // noDisplay: true,  // 是否具有该权限
              // ...  一些其他的信息
              appMenus: [
                { 
                  menuName: '一级菜单首页',
                  path: '/',
                  icon: 'zht-icon-success',
                  // ...  权限等信息 
                },
                {
                  menuName: '一级菜单关于',
                  path: '/about',
                  icon: 'el-icon-user',
                  children: [
                    { menuName: '二级菜单', path: '/about/index',icon: 'el-icon-user' },
                    {
                      menuName:'二级菜单',
                      path: '/about/index/sub',
                      icon: 'el-icon-user',
                      hidden: true,
                      noDisplay: true
                    },
                  ]
                },
                {
                  menuName: '一级菜单哈哈',
                  path: '/home',
                  icon: 'el-icon-user',
                  noDisplay: true
                },
                {
                  menuName: '一级菜单lala',
                  path: '/lala',
                  icon: 'el-icon-user',
                  children: [
                    {
                      menuName: '二级菜单aaa',
                      path: '/lala/aaa',
                      icon: 'el-icon-user',
                      children: [
                        {
                          menuName: '三级菜单bbb',
                          path: '/lala/aaa/bbb',
                          icon: 'el-icon-user'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              appName: '第二个子应用',
              appPrefix: '/sub-app2',
              // noDisplay: true,
              appMenus: [
                {
                  menuName: '一级菜单',
                  path: '/',
                  icon: 'el-icon-user',
                  children: [
                    {
                      menuName: '二级菜单',
                      path: '/bbb',
                      icon: 'el-icon-user',
                    }
                  ]
                },
                {
                  menuName: '一级菜单',
                  path: '/about',
                  icon: 'el-icon-user'
                }
              ]
            },
            {
              appName: '第三个子应用',
              appPrefix: '/sub-app3',
              // noDisplay: true,
              appMenus: [
                {
                  menuName: '一级菜单',
                  path: '/',
                  icon: 'el-icon-user'
                },
                {
                  menuName: '一级菜单',
                  path: '/about',
                  icon: 'el-icon-user'
                }
              ]
            },
            {
              appName: '测试重连机制',
              appPrefix: '/sub-app4',
              // noDisplay: true,
              appMenus: [
                {
                  menuName: '1111',
                  path: '/',
                  icon: 'el-icon-user'
                },
                {
                  menuName: '2222',
                  path: '/about',
                  icon: 'el-icon-user'
                }
              ]
            },
          ],
          mobile: '18811117311',
          skinId: 'blackgold',
          staffNo: '111111',
          status: true,
          systemUpdateTime: '系统更新于 2020-02-20 08:07:14',
          updateBy: '超管',
          updateDate: '2020-02-20T10:46:59.000+0000',
          userName: '超管'
        }
        if (userInfo.menu && userInfo.menu.length) {
          commit('SET_ROLES', userInfo.menu)
          commit('SET_USERINFO', userInfo)
          resolve(userInfo)
        } else {
          reject()
        }
        // getUserInfo(state.token)
        //   .then(response => {
        //     const { userInfo } = response.data
        //     const { menu } = userInfo
        //     if (menu && menu.length) {
        //       // 验证返回的menu是否是一个非空数组
        //       commit('SET_ROLES', menu)
        //     } else {
        //       reject('getInfo: menu must be a non-null array !')
        //     }
        //     commit('SET_USERINFO', userInfo)
        //     resolve(response)
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
      })
    },
    // 动态修改权限
    changeRoles({ dispatch }) {
      return new Promise(async resolve => {
        const { data } = await dispatch('getUserInfo')
        resetRouter()
        const { menu, id } = data.userInfo
        const accessRoutes = await dispatch('generateRoutes', { id, menu }) // 动态修改权限后 重绘侧边菜单
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)
        resolve()
      })
    },
    // 登出
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token)
        //   .then(() => {
        //     commit('SET_TOKEN', '')
        //     commit('SET_ROLES', [])
        //     removeToken()
        //     resolve()
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
      })
    },
    // 前端 登出
    fedLogOut({ commit }) {
      return new Promise(resolve => {
        sessionStorage.clear(true)
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
