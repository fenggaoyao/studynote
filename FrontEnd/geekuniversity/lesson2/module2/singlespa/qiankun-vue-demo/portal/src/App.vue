<template>
  <div id="portal-app">
    <Tips />
    <Layout v-if="showSubApp" />
    <!-- 如果没有登录信息 需要 进入router-view 登录页 -->
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Tips from './Layout/components/Tips'
import Cookies from 'js-cookie'
import { changeLiveWH, pageIsClose } from '@/utils'
import Layout from '@/Layout'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  components: { Tips, Layout },
  computed: {
    ...mapGetters(['showSubApp'])
  },
  created () {
    // 监听浏览器关闭 清除 登录 cookie
    pageIsClose()
    // 3d模型
    const live2d = Cookies.get('live2d') || 'haruto'
    const live2dOpts = Cookies.get('live2dOpts')? JSON.parse(Cookies.get('live2dOpts')) : { show: true, position: 'left', width: 120, height: 220 }
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: `${window.location.origin}/live2dw/`,
        pluginJsPath: 'lib/',
        pluginModelPath: `live2d-widget-model-${live2d}/assets/`,
        tagMode: false,
        debug: false,
        model: {  jsonPath: `${window.location.origin}/live2dw/live2d-widget-model-${live2d}/assets/${live2d}.model.json`},
        // display: { position: 'bottom', width: 150, height: 300 },
        display: { position: 'left', width: 120, height: 220, ...live2dOpts },
        mobile: { show: false },
        log: false,
      })
      if (!live2dOpts.show) {
        changeLiveWH('')
      }
    }, 100)
  }
}
</script>
