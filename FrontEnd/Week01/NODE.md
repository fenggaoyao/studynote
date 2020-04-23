# 知识体系与工程体系 [返回](../../README.md)

## 1、知识体系
   ### JavaScript
**编程语言的一般规律：用一定的词法和语法，表达一定语义，从而操作运行时。**  
![avatar](https://static001.geekbang.org/resource/image/6a/9b/6aec0a09381a2f74014ec604ef99c19b.png)

[JS](Js.md)执行过程我们则需要按照从大结构到小结构的角度讲解，从最顶层的程序与模块、事件循环和微任务，到函数、再到语句级的执行。  
我们从粗到细地了解执行过程。实例部分，对 JavaScript 来说类似基础库，JavaScipt 的内置对象多达 150 以上， 
![avatar](ttps://static001.geekbang.org/resource/image/6c/d0/6cb1df319bbc7c7f948acfdb9ffd99d0.png])
所以我们会从应用和机制的角度，文本处理（String、Regex）,数字与日期(number和string),索引集合（Array TypeArray等）、映射对象（map set workmap）、结构数据、控制对象（promise） 


   ### HTML
 1、标签做一些分类  文档元信息 语言相关 链接 替换 表单 表格  
 2、 HTML 的语法和几个重要的语言机制：实体、命名空间。
![avatar](https://static001.geekbang.org/resource/image/41/62/4153891927afac7f4c21ccf6a141f062.png)

   ### CSS

  大到小介绍 CSS 的各种语法结构，比如 @rule、选择器、单位等等。功能部分，我们大致可以分为布局、绘制和交互类。  
  ![avatar](https://static001.geekbang.org/resource/image/cb/cb/cbb6d198ccfb95af4906eeb0581333cb.png)

   ### 浏览器实现原理与API
   浏览器部分我们会先介绍下浏览器的实现原理，这是我们深入理解 API 的基础。  
   按照解析、构建 DOM 树、计算 CSS、渲染、合成和绘制的流程来讲解浏览器的工作原理。  
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

## 3 作业

### 1: [预习作业](WarmingUp.md)

- [读ECMA规范](ecma.md)

###  2: 把面向对象这个概念用追溯法写一篇博文
最早，大概是 1967 年的时候，艾伦（Alan Kay）提出了这么一个称为“对象”的抽象概念和基于它的面向对象编程（object-oriented programming），这也成为他所发明的 Smalltalk 这个语言中的核心概念之一。  
然而，回顾这段历史，这个所谓的“对象”的抽象概念中，只包含了数据和行为两部分，分别称为状态保存和消息发送，再进一步说今天讲的
属性与方法，并且，在这个基础上，有了这些状态（或称为数据）的局部保存、保护和隐藏等概念，也就是我们现在说的对象成员的可见性问题  
这里没有继承，也没有多态，最早出现所谓对象，其实只是数据的封装  
所以你会看到最近十余年来，无数的业界大师、众多的语言流派对所谓的“继承”，以及与此相关的“多态”特性发起非难。追根溯源，就在于这两个概念并非是“面向对象”思想的必然产物，因而它们的存在将有可能增加系统抽象的复杂性。 

其实所谓的“某某编程思想”，**本质上就是在说两个东西：一个，是在编程中怎么管理数据，另一个则是怎么组织逻辑**。  
而结构化，又或者说具体到“数据结构”，无非是在说将系统中的数据用统一的、确切的、有限的数据样式给管理起来。这些样式，小到一个位（bit）、一个字节（byte），大到一个库（Database）、一个节点（Node），都是对数据加以规划的结果。
编程的思想，在机器指令的编码与数据集群的管理里面，都是如出一辙的。在所有的这些思想的背后，都有一个核心的问题：  

**如何抽象“一堆”的数据，使得它们能被方便和有效地管理。**
连续与不连续关系，统一通过一个函数找到，对于索引数据数据，就是找到索引，关联数组（不可索引的块）

数组（Array class）是一种对象（Object class）；  
对象本质上是关联数组（Associative array）。  


语言和宿主的基础设施由对象来提供，并且JavaScript程序即是一系列互相通讯的对象集合”。  
 > 对象这一概念在人类的幼儿期形成，这远远早于我们编程逻辑中常用的值、过程等概念。在幼年期，我们总是先认识到某一个苹果能吃（这里的某一个苹果就是一个对象），继而认识到所有的苹果都可以吃（这里的所有苹果，就是一个类），再到后来我们才能意识到三个苹果和三个梨之间的联系，进而产生数字“3”（值）的概念。
如果我们从运行时角度来谈论对象，就是在讨论JavaScript实际运行中的模型，这是由于任何代码执行都必定绕不开运行时的对象模型。  
从运行时的角度看，可以不必受到这些“基于类的设施”的困扰，这是因为任何语言运行时类的概念都是被弱化的。对JavaScript来说，属性并非只是简单的名称和值，JavaScript用一组特征（attribute）来描述属性（property）.具有高度动态性的属性集合。
V8 实现对象存储时，并没有完全采用字典的存储方式，这主要是出于性能的考量。因为字典是非线性的数据结构，查询效率会低于线性的数据结构，V8 为了提升存储和查找效率，采用了一套复杂的存储策略。
隐藏属性：在这里我们把对象中的数字属性称为**排序属性**，称为elements,而字符串属性，称为**常规属性**，称为 properties（直接存储到对象本身，默认是10个，多了就保存在常规属性），另外还有map属性、___proto__属性

看待对象另一个视角：在 JavaScript 中，还有一个看待对象的不同视角，这就是用对象来模拟函数和构造器。事实上，JavaScript 为这一类对象预留了私有字段机制，并规定了抽象的函数对象与构造器对象的概念。函数对象的定义是：具有[[call]]私有字段的对象，构造器对象的定义是：具有私有字段[[construct]]的对象。JavaScript 用对象模拟函数的。
JavaScript 用对象模拟函数的设计代替了一般编程语言中的函数，它们可以像其它语言的函数一样被调用、传参。任何宿主只要提供了“具有[[call]]私有字段的对象”，就可以被 JavaScript 函数调用语法支持。

在 ES6 之后 => 语法创建的函数仅仅是函数，它们无法被当作构造器使用，


###  3: 把课上老师的脑图里的这些实体补全
- [entity链接](entity.html)
- [etity例子](entityDemo.md)
- [Tag](tag.html)



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
