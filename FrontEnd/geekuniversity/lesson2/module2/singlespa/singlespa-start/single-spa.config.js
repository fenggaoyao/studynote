import { registerApplication, start } from "single-spa";

registerApplication(
  "app-nav",
  () => import("./app-nav/src/main.js"),
  () => (location.pathname === "/nav" ? false : true),
  {}
);

registerApplication(
  "app-page",
  () => import("./app-page/src/main.js"),
  () => (location.pathname === "/page" ? false : true)
);

start();
