import { createRenderer } from "./../runtime-core/renderer";
export const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    // 如组件对象没有定义 render 函数和 template 模板，
    //则取容器的 innerHTML 作为组件模板内容
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    // clear content before mounting
    container.innerHTML = "";
    const proxy = mount(container);
    container.removeAttribute("v-cloak");
    container.setAttribute("data-v-app", "");
    return proxy;
  };

  return app;
};

function ensureRenderer() {
  return (
    renderer || (renderer = createRenderer<Node, Element>(rendererOptions))
  );
}

const rendererOptions = extend({ patchProp, forcePatchProp }, nodeOps);

function normalizeContainer(container: Element | string): Element | null {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (__DEV__ && !res) {
      warn(`Failed to mount app: mount target selector returned null.`);
    }
    return res;
  }
  return container;
}
