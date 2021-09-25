<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <el-scrollbar wrap-class="main-scroll" view-style="height: 100%;" wrap-style="overflow-x: hidden;" style="height: 100%; z-index: 2"> -->
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <navbar />
        <!-- 快捷标签组 -->
        <breadcrumb />
        <el-scrollbar wrap-class="main-scroll" view-style="display: flex; flex-direction: column; width: 100%;height: 100%;" wrap-style="overflow-x: hidden;" style="height: 100%; z-index: 2">
          <app-main/>
        </el-scrollbar>
      </div>
      <drawer>
        <user-settings/>
      </drawer>
      <!-- <update-record/> -->
      <el-backtop target=".main-scroll" :bottom="100"/>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Sidebar, Navbar, AppMain } from './components'
import Breadcrumb from '@/components/Breadcrumb'
import ResizeMixin from './mixin/ResizeHandler'
import Drawer from '@/components/Drawer'
import UserSettings from './components/UserSettings'
// import UpdateRecord from '@/views/components/UpdateRecord'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Drawer,
    UserSettings,
    Breadcrumb,
    // UpdateRecord
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(['sidebar', 'device']),
    classObj() {
      if (!this.sidebar.opened) {
        let beforeClass = document.body.className 
        document.body.className = beforeClass + ' sidebar_loading'
      } else {
        let beforeClass = document.body.className
        let classArr = beforeClass.split(' ')
        let newArr = classArr.filter(item => item !== 'sidebar_loading')
        document.body.className = newArr.join(' ')
      }
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
