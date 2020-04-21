# 知识体系与工程体系 [返回](../../README.md)

## 1、知识体系
   ### JavaScript
**编程语言的一般规律：用一定的词法和语法，表达一定语义，从而操作运行时。**  
![avatar](https://static001.geekbang.org/resource/image/6a/9b/6aec0a09381a2f74014ec604ef99c19b.png)

执行过程我们则需要按照从大结构到小结构的角度讲解，从最顶层的程序与模块、事件循环和微任务，到函数、再到语句级的执行。我们从粗到细地了解执行过程。实例部分，对 JavaScript 来说类似基础库，JavaScipt 的内置对象多达 150 以上，考虑到我们即使逐次讲解也必定不如 MDN 更加细致全面，所以我们会从应用和机制的角度，挑选其中几个体系来讲解。  


   ### HTML
 1、标签做一些分类  文档元信息 语言相关 链接 替换 表单 表格
 2、 HTML 的语法和几个重要的语言机制：实体、命名空间。
![avatar](https://static001.geekbang.org/resource/image/41/62/4153891927afac7f4c21ccf6a141f062.png)

   ### CSS

  大到小介绍 CSS 的各种语法结构，比如 @rule、选择器、单位等等。功能部分，我们大致可以分为布局、绘制和交互类。  
  ![avatar](https://static001.geekbang.org/resource/image/cb/cb/cbb6d198ccfb95af4906eeb0581333cb.png)

   ### 浏览器实现原理与API
   浏览器部分我们会先介绍下浏览器的实现原理，这是我们深入理解 API 的基础。  
   ，按照解析、构建 DOM 树、计算 CSS、渲染、合成和绘制的流程来讲解浏览器的工作原理。  
   W3C 零散的标准中挑选几个大块的 API 来详细讲解，主要有：事件、DOM、CSSOM 几个部分，它们分别覆盖了交互、语义和可见效果，这是我们工作中用到的主要内容。     
   ![avatar](https://static001.geekbang.org/resource/image/cb/cb/cbb6d198ccfb95af4906eeb0581333cb.png)

## 2、工程体系

### 前端技能

- 领域知识
- 前端知识
  - HTML
  - CSS
  - JavaScript
  - API
- 三大能力
  - 编程能力（解决**难**的问题，能否做出来）
  - 架构能力（解决**大**的问题，能否支持大规模）
  - 工程能力（解决**人**的问题，多人如何做）

### 职业规划

- 职业发展路径：成长  -->  成就  -->  晋升  -->  成长

### 成就

- 业务型成就：
  - 业务目标：理解公司的核心目标；将目标转化成指标
  - 技术方案：业务指标到技术指标的转换；形成纸面方案，完成小规模试验
  - 实施方案：确定实施目标，参与人；管理实施进度；
  - 结果评估：数据采集、数据报表；向上级汇报

- 技术型成就：
  - 目标：公认的技术难点
  - 实施方案：依靠扎实的编程能力、架构能力形成解决方案
  - 结果：解决问题

- 工程型成就：
  - 目标：质量、效率
  - 实施方案：规章制度；库；工具；系统；
  - 结果：线上监控

### 数据驱动的思考方式

目标 --> 现状 --> 方案 --> 实施 --> 结果 --> 目标

### 以数据驱动获取成就

  - 目标（分析目标，定数据指标）
  - 现状（采集数据，建数据展示系统）
  - 方案（设计技术方案，预估数据）
  - 实施（小规模试验，推广全公司落地，形成制度）
  - 结果（统计最终效果，汇报）

### 3、工程化

- 工具链
  - init - 脚手架
  - run - 本地调试
  - test - 单元测试
  - publish - 发布

- 持续集成
  - CS
    - Daily Build
    - Build Verification Test
  - BS
    - Check-in Build
    - Lint + Rule Check

### 架构

- 客户端架构
  - 解决软件需求规模带来的复杂性

- 服务端架构
  - 解决大量用户访问带来的复杂性

- 前端架构
  - 库：有复用价值的代码
    - URL
    - AJAX
    - ENV

  - 组件:UI上多次出现的元素
    - 轮播、TAB

  - 模块：经常被使用的业务区块
    - 登录

## 作业

### 1: [预习作业](WarmingUp.md)

- [读ECMA规范](ecma.md)

###  2: 把面向对象这个概念用追溯法写一篇博文


###  3: 把课上老师的脑图里的这些实体补全
- [entity链接](entity.html)
- [etity例子](entityDemo.md)
- [Tag](tag.html)
- [JS知识](Js.md)


###  4: 你能不能在 ECMA 中找到所有的类型（Type）
- 基础类型(7种)  String number null underfine object bool symbol 
- 语言类型7种
  - List 和 Record： 用于描述函数传参过程。
  - Set：主要用于解释字符集等。
  - Completion Record：用于描述异常、跳出等语句执行过程。
  - Reference：用于描述对象属性访问、delete 等。
  - Property Descriptor：用于描述对象的属性。
  - Lexical Environment 和 Environment Record：用于描述变量和作用域。
  - Data Block：用于描述二进制数据。 

###  5：把库里边的 URL 解析代码写一下
```js
   var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]-))?(?:\?([^#]-))?(?:#(.-))?$/;

```

###  5：如果你要写一本关于整个前端开发的书，请你列出你的目录。

- 前端发展史
- 前端基础——HTML、CSS
- JavaScript
- 计算机网络 
- V8及其他浏览器内核 
- JavaScript常用设计模式 
- ES6、ES.Next发展
- 前端框架MVC与MVVM 
- 移动开发与混合开发 
- 小程序与跨端方案
- node初识 
- 前端工程化——工具链、自动化
- web安全及前端集成


###  6：如何在互联网上获取信息
```js

Array.prototype.map.call(document.querySelectorAll(".element"), e=>e.innerText);
Array.prototype.map.call($0.querySelectorAll('code'),e=>e.innerText).join('\n')

\\ 获取Css 属性

var iframe = document.createElement("iframe");

document.body.appendChild(iframe);

iframe.src = "https://www.w3.org/TR/2019/WD-css-lists-3-20190425/"

function happen(element, type){
  return new Promise(resolve => {
    element.addEventListener(type, resolve, {once: true})
  })
}

happen(iframe, "load").then(function(){
  Array.prototype.map.call(document.querySelectorAll("#container li[data-tag~=css] h2"), e=> e.children[0].href + " |\t" + e.children[0].textContent).join("\n")
  console.log(iframe.contentWindow);
})
async function start(){  
  for(let standard of  Array.prototype.slice.call(document.querySelectorAll("#container li[data-tag~=css] h2:not(.Retired):not(.GroupNote)"))) {
   console.log(standard.children[0].href);
   var output = []
    iframe.src = standard.children[0].href;
    await happen(iframe, "load");
    var properties = Array.prototype.map.call(iframe.contentWindow.document.querySelectorAll(".propdef [data-dfn-type=property]"), e => e.childNodes[0].textContent);
    if(properties.length){
        output.push(standard.children[0].textContent + " | " + properties.join(", "));
        console.log(output.join("\n"))
    };     
  }  
}
start();

```
## 扩展学习
- ["编译系统透视：图解编译原理"](https://weread.qq.com/web/reader/9c632ee05ce2c79c6f5eaadkc81322c012c81e728d9d180)
- https://www.w3.org/
- http://w3school.com/
- [whatwg网站比较纯粹，知识体系的分类挺好](https://whatwg.org/)
- [谷歌学术搜索-很权威](https://scholar.google.com/)
- [MDN可以查资料但内容不是最新不够权威](https://developer.mozilla.org/)
- https://docs.microsoft.com/
- https://developer.apple.com/
- QCon：全球软件开发大会（ https://qcon.infoq.cn/2020/beijing/）
- Closure：闭包（ https://en.wikipedia.org/wiki/Closure_(computer_programming) ）
- https://www.ecma-international.org/
- [前端考点](https://github.com/gnosis23/hello-world-blog/issues/33)

## 参考链接：
- https://fed.taobao.org/blog/taofed/do71ct/fed-learning-quizzes-apply/?spm=taofed.blogs.blog-list.9.44fe5ac8p6qg66
- https://tools.ietf.org/html/rfc3986
- https://svn.apache.org/repos/asf/labs/webarch/trunk/uri/rev-2002/issues.html
- https://tools.ietf.org/
- https://github.com/spritejs/spritejs
- https://spritejs.org/#/
