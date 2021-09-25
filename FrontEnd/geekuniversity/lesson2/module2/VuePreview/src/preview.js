import './pages/App/app.less'
import './pages/App/animate.css'

import Vue from 'vue'
import Preview from 'components/platform/Preview/Preview'
import Utils from './utils'
import mixin from './mixin'

Vue.mixin({
  methods: Object.assign(mixin, {
    isEditMode () {
      return false
    }
  })
})

window.eventHub = new Vue()
const app = new Vue({
  mounted () {
    var deviceWidth = document.documentElement.clientWidth
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
  },
  render (h) {
    return (
      <div class='prebody'>
        <Preview modelId={Utils.getQueryString('modelId')} widgetId={Utils.getQueryString('widgetId')} />
      </div>
    )
  },
  el: '#app'
})
