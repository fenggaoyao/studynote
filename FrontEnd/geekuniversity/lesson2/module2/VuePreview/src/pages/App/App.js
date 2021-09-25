import '../../css/theme-default/lib/index.css'
import '../../css/icomoon/style.css'
import './app.less'
import './animate.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import mixin from '../../mixin'
import filters from '../../filter'

Vue.use(VueRouter)

Vue.mixin({
  methods: Object.assign(mixin, {
    isEditMode () {
      return true
    }
  })
})

Object.keys(filters).forEach(function (key, index, arr) {
  const filter = filters[key]
  Vue.filter(key, filter)
})

const app = {
  render (h) {
    this.showLoading()
    return (
      <div id='app'>
        <div class='body-container' ref='bd'>
          <transition name='fade' mode='out-in'>
            <router-view class='router' />
          </transition>
        </div>
        <div class='footer'>copyright 百度外卖</div>
      </div>
    )
  }
}

export default Vue.component('App', resolve => {
  resolve(app)
})
