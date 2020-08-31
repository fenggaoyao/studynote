import { ShapeFlags } from "../shared";

export const createVNode = function (
  type: any,
  props?: any = {},
  children?: string | Array<any>
) {
  if (props) {
    // 处理 props 相关逻辑，标准化 class 和 style
  }
  // 注意 type 有可能是 string 也有可能是对象
  // 如果是对象的话，那么就是用户设置的 options
  // type 为 stirng 的时候
  // createVNode("div")
  // type 为组件对象的时候
  // createVNode(App)
  const vnode = {
    el: null,
    component: null,
    key: props.key || null,
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type),
  };

  // 基于 children 再次设置 shapeFlag
  if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  } else if (typeof children === "string") {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  }
  // 标准化子节点，把不同数据类型的 children 转成数组或者文本类型
  normalizeChildren(vnode, children);

  return vnode;
};

// 基于 type 来判断是什么类型的组件
function getShapeFlag(type: any) {
  return typeof type === "string"
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT;
}
