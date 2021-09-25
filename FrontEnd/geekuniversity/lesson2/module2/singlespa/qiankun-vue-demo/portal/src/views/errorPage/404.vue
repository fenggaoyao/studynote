<template>
  <div class="portal-wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/404_images/404.png" alt="404">
        <img class="pic-404__child left" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="@/assets/404_images/404_cloud.png" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确或点击以下按钮返回主页~</div>
        <div @click.stop="return_page" class="bullshit__return-home">返回首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Page404',
  computed: {
    ...mapGetters(['subApp']),
    message() {
      return '这个页面好像不见了......'
    }
  },
  methods: {
    getFirstPath(child) {  // 递归出第一个path
      if (!child.noDisplay && !child.hidden) {
        let path = child.path
        if (child.children && child.children.length) {
          path = this.getFirstPath(child.children[0])
        }
        return path
      }
    },
    return_page() {
      let subAppPrefix = sessionStorage.getItem('refreshApp', true)
      let menus
      if (subAppPrefix) {
        let index = this.subApp.findIndex(item => item.appPrefix === subAppPrefix)
        menus = this.subApp[index]
      } else {
        menus = this.subApp[0]
      }
      let path
      for (let i = 0; i < menus.appMenus.length; i++) {
        path = this.getFirstPath(menus.appMenus[i])
        if (path) break
      }
      if (/\/$/.test(path)) {
        path = path.substring(0, path.length-1)
      }
      this.$router.push({path})
    }
  }
}
</script>
