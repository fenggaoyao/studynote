import { createApp } from "vue";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
import { createRouter, createWebHashHistory } from "vue-router";

let instance = null;

function render(props = {}) {
  const { container, routerBase } = props;

  const router = createRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    history: createWebHashHistory(),
    routes,
  });

  instance = createApp(App)
    .use(store)
    .use(router)
    .mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  //   commonStore.globalRegister(store);
  // 模拟登录后，存储用户信息到global module
  //   const userInfo = { name: "我是独立运行时名字叫张三" }; // 假设登录后取到的用户信息
  //   store.commit("global/setGlobalState", { user: userInfo });
  render();
}

export async function bootstrap() {
  console.log("[subapp performance] vue app bootstraped");
}

export async function mount(props) {
  console.log("[subapp performance] props from main framework", props);
  //   commonStore.globalRegister(store, props);
  render(props);
}

export async function unmount() {
  console.log("[subapp performance] vue app bootstraped");
  console.log(">>instance>>>", instance.unmount);
  // instance.unmount();
  instance.$el.innerHTML = "";
  instance = null;
}
