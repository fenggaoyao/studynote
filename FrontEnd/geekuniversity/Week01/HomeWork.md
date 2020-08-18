# 作业

### 1: [预习作业](WarmingUp.md)

### 2： 读ECMA规范
- 基础类型(7种)  String number null underfine object bool symbol 
- 语言类型7种
  - List 和 Record： 用于描述函数传参过程。
  - Set：主要用于解释字符集等。
  - Completion Record：用于描述异常、跳出等语句执行过程。
  - Reference：用于描述对象属性访问、delete 等。
  - Property Descriptor：用于描述对象的属性。
  - Lexical Environment 和 Environment Record：用于描述变量和作用域。
  - Data Block：用于描述二进制数据。 
- [详细目录]((ecma.md))

### 3: 把面向对象这个概念用追溯法写一篇博文
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


###  4: 把课上老师的脑图里的这些实体补全
- [entity链接](entity.html)
- [etity例子](entityDemo.md)
- [Tag](tag.html)





###  5：把库里边的 URL 解析代码写一下
```js
   var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]-))?(?:\?([^#]-))?(?:#(.-))?$/;

```

###  6：如果你要写一本关于整个前端开发的书，请你列出你的目录。

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


###  7：如何在互联网上获取信息
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