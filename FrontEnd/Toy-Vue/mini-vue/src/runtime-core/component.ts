export function createComponentInstance(vnode, parent, suspense) {
  // 继承父组件实例上的 appContext，如果是根组件，则直接从根 vnode 中取。
  const appContext =
    (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    // 组件唯一 id
    uid: uid++,
    // 组件 vnode
    vnode,
    // 父组件实例
    parent,
    // app 上下文
    appContext,
    // vnode 节点类型
    type: vnode.type,
    // 根组件实例
    root: null,
    // 新的组件 vnode
    next: null,
    // 子节点 vnode
    subTree: null,
    // 带副作用更新函数
    update: null,
    // 渲染函数
    render: null,
    // 渲染上下文代理
    proxy: null,
    // 带有 with 区块的渲染上下文代理
    withProxy: null,
    // 响应式相关对象
    effects: null,
    // 依赖注入相关
    provides: parent ? parent.provides : Object.create(appContext.provides),
    // 渲染代理的属性访问缓存
    accessCache: null,
    // 渲染缓存
    renderCache: [],
    // 渲染上下文
    ctx: EMPTY_OBJ,
    // data 数据
    data: EMPTY_OBJ,
    // props 数据
    props: EMPTY_OBJ,
    // 普通属性
    attrs: EMPTY_OBJ,
    // 插槽相关
    slots: EMPTY_OBJ,
    // 组件或者 DOM 的 ref 引用
    refs: EMPTY_OBJ,
    // setup 函数返回的响应式结果
    setupState: EMPTY_OBJ,
    // setup 函数上下文数据
    setupContext: null,
    // 注册的组件
    components: Object.create(appContext.components),
    // 注册的指令
    directives: Object.create(appContext.directives),
    // suspense 相关
    suspense,
    // suspense 异步依赖
    asyncDep: null,
    // suspense 异步依赖是否都已处理
    asyncResolved: false,
    // 是否挂载
    isMounted: false,
    // 是否卸载
    isUnmounted: false,
    // 是否激活
    isDeactivated: false,
    // 生命周期，before create
    bc: null,
    // 生命周期，created
    c: null,
    // 生命周期，before mount
    bm: null,
    // 生命周期，mounted
    m: null,
    // 生命周期，before update
    bu: null,
    // 生命周期，updated
    u: null,
    // 生命周期，unmounted
    um: null,
    // 生命周期，before unmount
    bum: null,
    // 生命周期, deactivated
    da: null,
    // 生命周期 activated
    a: null,
    // 生命周期 render triggered
    rtg: null,
    // 生命周期 render tracked
    rtc: null,
    // 生命周期 error captured
    ec: null,
    // 派发事件方法
    emit: null,
  };
  // 初始化渲染上下文
  instance.ctx = { _: instance };
  // 初始化根组件指针
  instance.root = parent ? parent.root : instance;
  // 初始化派发事件方法
  instance.emit = emit.bind(null, instance);
  return instance;
}

export function setupComponent(instance) {
  const { props, children, shapeFlag } = instance.vnode;
  // 判断是否是一个有状态的组件
  const isStateful = shapeFlag & 4;

  initProps(instance, props, isStateful, isSSR);
  // 初始化 插槽
  initSlots(instance, children);

  // 源码里面有两种类型的 component
  // 一种是基于 options 创建的
  // 还有一种是 function 的
  // 这里处理的是 options 创建的
  // 叫做 stateful 类型
  // 初始化 props

  // 设置有状态的组件实例
  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined;
  return setupResult;
}

function initProps() {
  // todo
  console.log("initProps");
}

function initSlots() {
  // todo
  console.log("initSlots");
}

function setupStatefulComponent(instance) {
  const Component = instance.type;
  // 创建渲染代理的属性访问缓存
  instance.accessCache = {};
  // 创建渲染上下文代理
  //我们把组件中不同状态的数据存储到不同的属性中
  //比如存储到 setupState、ctx、data、props 中。
  //我们在执行组件渲染函数的时候，
  //为了方便用户使用，会直接访问渲染上下文 instance.ctx 中的属性，
  //所以我们也要做一层 proxy，
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  // 2. 调用 setup
  // 判断处理 setup 函数
  const { setup } = Component;
  // 应该传入 props 和 setupContext
  const setupResult = instance.setup && instance.setup(instance.props);

  // 3. 处理 setupResult
  handleSetupResult(instance, setupResult);
}

function handleSetupResult(instance, setupResult) {
  // setup 返回值不一样的话，会有不同的处理
  // 1. 看看 setupResult 是个什么
  if (typeof setupResult === "function") {
    // 如果返回的是 function 的话，那么绑定到 render 上
    // 认为是 render 逻辑
    // setup(){ return ()=>(h("div")) }
    instance.render = setupResult;
  } else if (typeof setupResult === "object") {
    // 返回的是一个对象的话
    // 先存到 setupState 上
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance) {
  // 给 instance 设置 render

  // 先取到用户设置的 component options
  const Component = instance.type;

  if (!instance.render) {
    // todo
    // 调用 compile 模块来编译 template
    // Component.render = compile(Component.template, {
    //     isCustomElement: instance.appContext.config.isCustomElement || NO
    //   })
  }
  currentInstance = instance;
  instance.render = Component.render;

  applyOptions(instance, Component);
  currentInstance = null;
}

function applyOptions() {
  // 兼容 vue2.x
  // todo
}

const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const {
      ctx,
      setupState,
      data,
      props,
      accessCache,
      type,
      appContext,
    } = instance;
    if (key[0] !== "$") {
      // setupState / data / props / ctx
      // 渲染代理的属性访问缓存中
      const n = accessCache[key];
      if (n !== undefined) {
        // 从缓存中取
        switch (n) {
          case 0 /* SETUP */:
            return setupState[key];
          case 1 /* DATA */:
            return data[key];
          case 3 /* CONTEXT */:
            return ctx[key];
          case 2 /* PROPS */:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 0;
        // 从 setupState 中取数据
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 1;
        // 从 data 中取数据
        return data[key];
      } else if (
        type.props &&
        hasOwn(normalizePropsOptions(type.props)[0], key)
      ) {
        accessCache[key] = 2;
        // 从 props 中取数据
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 3;
        // 从 ctx 中取数据
        return ctx[key];
      } else {
        // 都取不到
        accessCache[key] = 4;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    // 公开的 $xxx 属性或方法
    if (publicGetter) {
      return publicGetter(instance);
    } else if (
      // css 模块，通过 vue-loader 编译的时候注入
      (cssModule = type.__cssModules) &&
      (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      // 用户自定义的属性，也用 `$` 开头
      accessCache[key] = 3;
      return ctx[key];
    } else if (
      // 全局定义的属性
      ((globalProperties = appContext.config.globalProperties),
      hasOwn(globalProperties, key))
    ) {
      return globalProperties[key];
    } else if (
      process.env.NODE_ENV !== "production" &&
      currentRenderingInstance &&
      key.indexOf("__v") !== 0
    ) {
      if (data !== EMPTY_OBJ && key[0] === "$" && hasOwn(data, key)) {
        // 如果在 data 中定义的数据以 $ 开头，会报警告，因为 $ 是保留字符，不会做代理
        warn(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved ` +
            `character and is not proxied on the render context.`
        );
      } else {
        // 在模板中使用的变量如果没有定义，报警告
        warn(
          `Property ${JSON.stringify(key)} was accessed during render ` +
            `but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      // 给 setupState 赋值
      setupState[key] = value;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      // 给 data 赋值
      data[key] = value;
    } else if (key in instance.props) {
      // 不能直接给 props 赋值
      process.env.NODE_ENV !== "production" &&
        warn(
          `Attempting to mutate prop "${key}". Props are readonly.`,
          instance
        );
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      // 不能给 Vue 内部以 $ 开头的保留属性赋值
      process.env.NODE_ENV !== "production" &&
        warn(
          `Attempting to mutate public property "${key}". ` +
            `Properties starting with $ are reserved and readonly.`,
          instance
        );
      return false;
    } else {
      // 用户自定义数据赋值
      ctx[key] = value;
    }
    return true;
  },
};
