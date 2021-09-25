<template>
  <section :class="{ 'app-main': true, 'not-home': key !== '/index' }">
    <router-view v-if="key.indexOf('/portal-login') ===-1"></router-view>
    <!-- 子应用 -->
    <!-- 加载错误子应用页面 -->
    <portalErrorApp v-show="errorApp"/>
    <!-- 加载成功子应用页面 -->
    <div ref="animateApp" v-show="!errorApp" v-html="appContent"></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import singleSpa from '@/singleSpa'
import portalErrorApp from './portalErrorApp'
export default {
  name: 'AppMain',
  mixins: [ singleSpa ],
  components: { portalErrorApp },
  computed: {
    ...mapGetters(['device']),
    // ...mapGetters(['isShow404']),
    key() {
      const { fullPath, meta: { animation = true } } = this.$route
      return animation ? fullPath : ''
    }
  },
  watch: {
    device(val) {
      if (val === 'mobile') {
        let beforeClass = document.body.className 
        document.body.className = beforeClass + ' mobile_loading'
      } else if (val === 'desktop') {
        let beforeClass = document.body.className
        let classArr = beforeClass.split(' ')
        let newArr = classArr.filter(item => item !== 'mobile_loading')
        document.body.className = newArr.join(' ')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.opacity {
  opacity: 0
}
.app-main {
  width: calc(100% - 44px);
  position: relative;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>

<style lang="less">
.app_load_loading {
  position: fixed!important;
  left: 282px!important;
  top: 116px!important;
  bottom: 22px!important;
  width: calc(100vw - 304px);
  border-radius: 6px;
}
.mobile_loading .app_load_loading {
  width: calc(100vw - 44px);
  left: 22px!important
  
}
.sidebar_loading .app_load_loading {
  left: 58px!important;
  width: calc(100vw - 80px);
}
.app-main {
  &.not-home {
    margin-bottom: 22px !important;
    > div:first-of-type{
      flex-grow: 1;
    }
    .not-boxshadow{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      > .boxshadow:not(:first-of-type){
        flex-grow: 1;
      }
    }
    > div:not(.not-boxshadow),
    > div.not-boxshadow .boxshadow{
      padding: 22px;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      background: rgba(255, 255, 255, 0.65);
      border-radius: 6px;

    }
  }
}
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
//   .fixed-header {
//     padding-right: 15px;
//   }
// }
</style>
