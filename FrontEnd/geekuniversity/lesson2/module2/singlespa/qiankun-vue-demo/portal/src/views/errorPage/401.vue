<template>
  <div class="portal-errPage-container">
    <el-row class="errPage-container-content">
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限访问该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>
            或者你可以
            <span @click.stop="return_page">回首页</span>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img @click="dialogVisible = true" :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="随便看" :modal-append-to-body="false">
      <img :src="ewizardClap" class="pan-img">
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'
import { mapGetters } from 'vuex'
export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['subApp']),
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
      console.log(path)
      this.$router.push({path})
    }
  }
}
</script>
