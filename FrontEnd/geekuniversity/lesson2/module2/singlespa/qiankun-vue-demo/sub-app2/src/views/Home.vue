<template>
  <div class="home">
    <div id="nav">
      第二个子项目
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <span @click.stop="go">测试主框架404页面</span>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    go() {
      this.$router.push({ path: '/aboutaaa' })
    }
  }
}
</script>

<style lang="less" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

