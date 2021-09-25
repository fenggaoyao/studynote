import { registerApplication, start } from "single-spa";
import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine,
} from "single-spa-layout";
const template = document.querySelector("#single-spa-template");

const layoutData = {
  props: {
    authToken: "78sf9d0fds89-0fysdiuf6sf8",
    userInfo: {
      name: "hello",
    },
  },
};
const resolvedRoutes = constructRoutes(template, layoutData);
console.log(resolvedRoutes);

const applications = constructApplications({
  routes: resolvedRoutes,
  loadApp: (app) => import(`./${app.name}/src/main.js`),
});
const layoutEngine = constructLayoutEngine({
  routes: resolvedRoutes,
  applications: applications,
});
console.log(applications);
applications.forEach(registerApplication);

// registerApplication(
//   "app-nav",
//   () => import("./app-nav/src/main.js"),
//   () => (location.pathname === "/nav" ? false : true)
// );

// registerApplication(
//   "app-page",
//   () => import("./app-page/src/main.js"),
//   () => (location.pathname === "/page" ? false : true)
// );

layoutEngine.activate();
start();

window.addEventListener("single-spa:before-app-change", (evt) => {
  console.log("before-app-change>>>", evt);
});
window.addEventListener("single-spa:before-routing-event", (evt) => {
  console.log("before-routing-event>>>>", evt, evt.detail.newAppStatuses);
});
window.addEventListener("single-spa:before-mount-routing-event", (evt) => {
  console.log("before-mount-routing-event>>>>", evt);
});

// const mountedAppNames = singleSpa.getMountedApps();
// console.log(mountedAppNames);

// const appNames = singleSpa.getAppNames();
// console.log(appNames);

// const status = singleSpa.getAppStatus("app1");
// console.log(status); // one of many statuses (see list below). e.g. MOUNTED
