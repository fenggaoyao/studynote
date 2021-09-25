//  引入 全局 需要的 样式文件
import 'normalize.css/normalize.css'  // reset css
import 'animate.css'  // 动画 css
// 以下俩种css加载顺序不能换  有覆盖样式
import '@/styles/index.less'  // global style
import '@/utils/initTheme' // init theme

import '@/utils/storageNameSpace'  // 存储 命名空间

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './icons' // icon
import './errorLog' // error log
import './permission' // permission control

import Toast from './components/Toast/index.js'

Vue.use(ElementUI, { size: 'small' })
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
