<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logo">
      <router-link to="/">
        <div>
          <svg-icon icon-class="theme" class="act-color" style="font-size: 24px; margin: 0 auto"/>
        </div>
        <div>
          <p>中后台</p>
          <p>the singleSpa project</p>
        </div>
      </router-link>
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="activeMenu"
      :collapse="isCollapse"
      :collapse-transition="false"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item
        v-for="route in permission_routers"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    activeMenu() {
      const { meta, path } = this.$route
      var newPath
      // 判断是否开头和结尾都有 / 用于子应用类 点击跳转路由时  能匹配上 activeMenu
      if (/\/$/.test(path)) {
        newPath = path.substring(0, path.length-1)
      }
      // if set path, the sidebar will highlight the path you set
      return meta.activeMenu || newPath || path
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  > a {
    display: flex !important;
    height: 116px;
    justify-content: center;
    align-items: center;
    .act-color {
      font-size: 55px;
    }
    > div {
      &:first-child {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        text-align: center;
        line-height: 70px;
        img {
          width: 48px;
        }
      }
      &:last-child {
        width: 180px;
        padding-left: 10px;
        border-radius: 50%;
        > p {
          margin: 0;
          padding-top: 5px;
          line-height: 20px;
          &:first-child {
            font-size: 20px;
            font-weight: bold;
            padding-left: 7px;
          }
          &:last-child {
            font-size: 16px;
            transform: scale(0.9);
          }
        }
      }
    }
  }
}
</style>
