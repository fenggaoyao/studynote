<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.meta.appName ? tag.meta.appName : '主应用'}} | {{ tag.title}}
        <span v-if="visitedViews.length > 1" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li v-if="visitedViews.length > 1" @click="closeSelectedTag(selectedTag)" >关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { mapGetters } from 'vuex'
export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    ...mapGetters(['subApp']),
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
    isActive(route) {
      let path = this.$route.path
      if (/\/$/.test(path)) {
        path = path.substring(0, path.length - 1)
      }
      return route.path === path
    },
    addViewTags() {
      const { meta, name } = this.$route
      if (meta.title && name !== '401' && name !== '404') {
        let newRoute = { ...this.$route }
        if (/\/$/.test(newRoute.path)) {
          newRoute.path = newRoute.path.substring(0, newRoute.path.length-1)
        }
        if (/\/$/.test(newRoute.fullPath)) {
          newRoute.fullPath = newRoute.fullPath.substring(0, newRoute.fullPath.length-1)
        }
        this.$store.dispatch('addView', newRoute)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      if (!tags) return
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      // console.log(view)
      // console.log(this.visitedViews)
      // if (this.visitedViews)
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            // console.log(213123123)
            // this.$router.push('/')
          }
        }
      })
    },
    // 关闭其他
    closeOthersTags() {
      // 排除 当前路由与即将跳转的路由一致 时 的报警信息
      if (this.selectedTag.path !== this.$route.path) this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      let subAppPrefix = sessionStorage.getItem('refreshApp', true)
      let menus
      if (subAppPrefix) {
        let index = this.subApp.findIndex(item => item.appPrefix === subAppPrefix)
        menus = this.subApp[index]
      } else {
        menus = this.subApp[0]
      }
      let path, appMenus = menus.appMenus
      for (let i = 0; i < appMenus.length; i++) {
        path = this.getFirstPath(appMenus[i])
        if (path) break
      }
      if (/\/$/.test(path)) {
        path = path.substring(0, path.length-1)
      }
      // 排除 当前页面即在 当前应用的首页  关闭所有 会重复跳转路由 添加不了 tagviews
      if (path !== this.$route.path) this.$router.push({ path })
      // 添加当前 tagsview
      this.addViewTags()
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY

      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    getFirstPath(child) {  // 递归出第一个path
      if (!child.noDisplay && !child.hidden) {
        let path = child.path
        if (child.children && child.children.length) {
          path = this.getFirstPath(child.children[0])
        }
        return path
      }
    },
  }
}
</script>

<style lang="less" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  margin-bottom: 10px;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border-radius: 3px;
      color: #495060;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      border: 1px solid #f3f5f7!important;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &:hover {
        background-color: #f3f5f7!important
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
