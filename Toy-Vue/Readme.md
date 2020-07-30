# composition Api

Fragment Teleport suspense


根组件
# 渲染函数
动静分离  动态节点v-if  v-for
生成聪明的渲染函数
静态提升，节点结构根据v-if和v-for切分出block，block内部节点结构石不变的，我们直接把动态节点维护在一个数组里即可

服务端编译：虚拟节点 转向=> 向Buffer推字符串 异步 ssr_render。代码比较好
客户端编译


# reative 

Ref:包装一下，使得可追踪
WatchEffect

考虑生命周期函数 onMounted onUnmounted