/**
 * 整体项目设置相关的 store
 */

import Cookies from 'js-cookie'
import { setTheme, setLive2d } from '@/utils'

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus')
        ? !!+Cookies.get('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    device: 'desktop',
    drawer: false,
    themeColor: Cookies.get('themeColor') || '',
    theme: Cookies.get('theme') || 'blackgold',
    live2d: Cookies.get('live2d') || 'haruto',
    live2dOpts: Cookies.get('live2dOpts')?JSON.parse(Cookies.get('live2dOpts')) : { show: true, position: 'left', width: 120, height: 220 },
    // themePicker: '',
    sex: [{ value: false, label: '女' }, { value: true, label: '男' }]
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_DRAWER: (state, opened = true) => {
      state.drawer = opened
    },
    CHANGE_THEME: (state, theme = state.theme) => {
      Cookies.set('theme', theme)
      state.theme = theme
      setTheme(theme)
    },
    CHANGE_THEME_COLOR: (state, color) => {
      Cookies.set('themeColor', color)
      state.themeColor = color
    },
    CHANGE_LIVE2D(state, live2d) {
      state.live2d = live2d
      Cookies.set('live2d', state.live2d)
      setLive2d(live2d)
    },
    CHANGE_LIVE2DOPTS(state, opts) {
      state.live2dOpts = { ...state.live2dOpts, ...opts }
      Cookies.set('live2dOpts', JSON.stringify(state.live2dOpts))
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    toggleDrawer({ commit }, opened) {
      commit('TOGGLE_DRAWER', opened)
    },
    changeTheme({ commit }, { theme }) {
      return commit('CHANGE_THEME', theme)
    },
    changeThemeColor({ commit }, color) {
      return commit('CHANGE_THEME_COLOR',color)
    },
    changeLive2d({ commit }, live2d) {
      return commit('CHANGE_LIVE2D', live2d)
    },
    changeLive2dOpts({ commit }, opts) {
      return commit('CHANGE_LIVE2DOPTS', opts)
    }
  }
}

export default app