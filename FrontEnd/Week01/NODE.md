# 知识体系与工程体系 [返回](../../README.md)

## 1、知识体系
   ### JavaScript
**编程语言的一般规律：用一定的词法和语法，表达一定语义，从而操作运行时。**  
![avatar](https://static001.geekbang.org/resource/image/6a/9b/6aec0a09381a2f74014ec604ef99c19b.png)

[JS](Js.md)执行过程我们则需要按照从大结构到小结构的角度讲解，从最顶层的程序与模块、事件循环和微任务，到函数、再到语句级的执行。  
我们从粗到细地了解执行过程。实例部分，对 JavaScript 来说类似基础库，JavaScipt 的内置对象多达 150 以上， 
![avatar](https://static001.geekbang.org/resource/image/6c/d0/6cb1df319bbc7c7f948acfdb9ffd99d0.png)
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
