import store from "./store";

console.log(">>>>>>", process.env.VUE_APP_PERFORMANCE);
const microApps = [
  {
    name: "performance",
    entry: process.env.VUE_APP_PERFORMANCE,
    activeRule: "/performance",
  },
  {
    name: "error",
    entry: process.env.VUE_APP_ERROR,
    activeRule: "/error",
  },
  {
    name: "event",
    entry: process.env.VUE_APP_EVENT,
    activeRule: "/event",
  },
];

const apps = microApps.map((item) => {
  return {
    ...item,
    container: "#subapp-viewport", // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState, // 下发getGlobalState方法
    },
  };
});

export default apps;
