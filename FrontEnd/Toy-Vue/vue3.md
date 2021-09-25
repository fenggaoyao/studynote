# composition Api

Fragment Teleport suspense

根组件

# 渲染函数

动静分离 动态节点 v-if v-for
生成聪明的渲染函数
静态提升，节点结构根据 v-if 和 v-for 切分出 block，block 内部节点结构石不变的，我们直接把动态节点维护在一个数组里即可

服务端编译：虚拟节点 转向=> 向 Buffer 推字符串 异步 ssr_render。代码比较好
客户端编译

# reative

Ref:包装一下，使得可追踪
WatchEffect

考虑生命周期函数 onMounted onUnmounted

//
parse html,生成 ast 语法树，基于 type，props，children 生成 render 函数，
经 h 函数，createVnode 生成 Vnode
组件 vnode 生成 instance 实例,
instance 实例

# instance ctx

// expose internal instance for proxy handlers
// expose public properties

TypeScript 的操作符：非空断言操作符 !。
