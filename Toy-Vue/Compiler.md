# Compiler

baseOptions:Web平台相关配置，创建编译器时传入

# 编译的入口
1、Parse流程：解析模板字符串为ast
```javascript
ast:{
    type: //普通节点，表达式节点，文本节点
    tag:
    attrsList:
    attrsMap:
    parent:
    children:
    plain:   
}

```
2 优化、标记静态节点和静态根

3、生成render函数
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners

6-10节详细讲解编译html

2、优化语法树
3、生成代码

Vue.js	也是利⽤函数柯⾥化技巧把基础的编译过程函数抽出来，通过createCompilerCreator(baseCompile)		的⽅式把真正编译的过程和其它逻辑如对编译配置处理、缓存处理等剥离开