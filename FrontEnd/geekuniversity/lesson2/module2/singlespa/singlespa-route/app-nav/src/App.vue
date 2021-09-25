<template>
  <div id="app">
    <NavMenu @change="change" />
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";

export default {
  name: "App",
  props: {
    singleSpa: {
      type: Object,
    },
  },
  components: {
    NavMenu,
  },
  methods: {
    change(hash) {
      console.log(this.hash);
      if (this.singleSpa) {
        // this.singleSpa.navigateToUrl(`/#/page/${hash}`);
        history.pushState({ state: hash }, hash, `/#/page/${hash}`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
