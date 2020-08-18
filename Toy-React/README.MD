# 实现Toy-React
## 7月20日第一节课
 1、课堂完成项目构建，依赖导入,webpack构建，react组件设计和完成。 
  react= 组件化+jsx+vdom
  - 理解React组件化基本概念
  - 学习vdom的实现思路
  - 编写突破自我的代码


 复习：理解组件化思想 
 对象：Properties,Methods,Inherit
 组件：Properties,Methods,Inherit，Attribute（带有声明式编程），Config（全局的能力）&State（组件内部状态的变化）,Event（从组件接收东西）,LifeCyle（定义组件的方式）,Children（能够以树型结构描述界面）
  每个Node都设计成javascript对象，它通过jsx语法，重点是通过createElement()方法创建组装出来 
  - 要创建多少个对象,(多少个Node节点)  
  - 创建对象要重点弄清楚传入参数，分别是type,attribute,...children。对应那个哪些值  
  - 创建出来对象 要不是ElementWrapper（对应createElement创建对象），就是TextWrapper（对应createTextNode创建对象）  
  - 每一个对象都有mountTo方法（即挂载到Element,最终挂载到document.body上），重点是ElementWrapper具有setAttribute,appendChild方法。
  ## 7月21日第二节课
   完成setState，和update()方法，利用document.createRange()实现


  ## 7月22日第三节课
    完成虚拟dom
    1、是否同一节点
      - 比较类型
      - 比较每个属性、名字、keys长度，
    2、是否同一树结构
      -  判断树节点
      -  孩子节点数目
      -  再遍历孩子节点，递归当前算法
    3、替换算法
      - 如果同一颗树，返回
      - 当前节点是否相同，不相对，则将新节点mountTO旧节点上
        否则遍历前孩子节点，递归当前算法


