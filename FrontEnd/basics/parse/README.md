# 解析

1、创建上下文
2、开始，getCursor(context)

```javascript

export interface Position {
  offset: number // from start of file
  line: number
  column: number
}

function getCursor(context: ParserContext): Position {
  const { column, line, offset } = context;
  return { column, line, offset };
}
```

3、match
const match = /^<\/?([a-z][^\t\r\n\f />]\*)/i.exec(context.source);
4、前进到所到的地方
advanceBy(context, match[0].length);

// 前进代码到标签文本后面的空白字符后
advanceSpaces(context);

// 解析标签中的属性，并前进代码到属性后
let props = parseAttributes(context, type);

// 判断是否自闭合标签
isSelfClosing = startsWith(context.source, '/>');

if (type === 1 /_ End _/ && isSelfClosing) {
// 结束标签不应该是自闭和标签
emitError(context, 4 /_ END_TAG_WITH_TRAILING_SOLIDUS _/);
}

# parseTag

parseTag 最终返回的值就是一个描述标签节点的对象，其中 type 表示它是一个标签节点，tag 表示标签名，tagType 表示标签的类型，content 表示文本的内容，isSelfClosing 表示是否是一个闭合标签，loc 表示文本的代码开头和结束的位置信息，children 是标签的子节点数组，会先初始化为空。

# parseAttributes

# parseElement

HTML 的嵌套结构的解析过程，就是一个递归解析元素节点的过程，为了维护父子关系，当需要解析子节点时，我们就把当前节点入栈，子节点解析完毕后，我们就把当前节点出栈，因此 ancestors 的设计就是一个栈的数据结构，整个过程是一个不断入栈和出栈的过程。

# 创建 AST 根节点

# 指令转换

```javascript
return [
  [
    transformOnce,
    transformIf,
    transformFor,
    transformExpression,
    transformSlotOutlet,
    transformElement,
    trackSlotScopes,
    transformText,
  ],
  {
    on: transformOn,
    bind: transformBind,
    model: transformModel,
  },
];
```

transform 上下文、遍历 AST 节点、静态提升以及创建根代码生成节点。
遍历 AST 节点的过程很关键，因为核心的转换过程就是在遍历中实现的：

Vue.js 内部大概内置了八种转换函数，分别处理指令、表达式、元素节点、文本节点等不同的特性。

对于一个组件节点而言，如果它有子节点，则说明是组件的插槽，另外还会有对一些内置组件比如 KeepAlive、Teleport 的处理逻辑。
