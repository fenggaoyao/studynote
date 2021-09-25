import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./public-path";
Vue.config.productionTip = false;
Vue.use(ElementUI, { size: "small" });

let instance = null;
const { name } = require("../package.json");
function render() {
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}
// 判断 package.json 字段和 router的 base字段一致不
const { base, mode } = router.options;
if (window.__POWERED_BY_QIANKUN__) {
  if (mode !== "history") {
    throw "在此子应用中router.js 中开启 browserhistory，不懂联系csj";
  } else if ("/" + name !== base) {
    throw "请保证router.js 中 base字段与 package.json字段一致 如 /sub-app1 不懂联系csj";
  }
}
// 确保独立运行
window.__POWERED_BY_QIANKUN__ || render();

export async function bootstrap(props = {}) {
  // console.log('sub-app1 加载中')
  // 父应用传递的值 挂载vue原型上
  Vue.prototype.parentData = { ...props.data };
  // 父应用传递的 方法 挂载原型上
  Vue.prototype.parentFns = props.fns;
}

export async function mount() {
  // console.log('sub-app1 加载完毕', props)
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
}
