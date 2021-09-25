import Vue from "vue";
import singleSpaVue from "single-spa-vue";
import router from "./router";

import App from "./App.vue";

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
          */
        },
      });
    },
  },
});

export function bootstrap() {
  console.log("page bootstrap>>>");
  return vueLifecycles.bootstrap();
}

export function mount(props) {
  console.log("page mount>>>");
  return vueLifecycles.mount(props);
}

export function unmount() {
  console.log("page unmount>>>");
  return vueLifecycles.unmount();
}

window.addEventListener("single-spa:before-mount-routing-event", (evt) => {
  console.log("page>>>>>>>>before-mount-routing-event>>>>", evt);
});
