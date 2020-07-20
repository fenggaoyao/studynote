# 实现Toy-React
## 7月20日第一节课
 1、课堂完成项目构建，依赖导入,webpack构建，react组件设计和完成。  

 复习：理解组件化思想  
  每个Node都设计成javascript对象，它通过jsx语法，重点是通过createElement()方法创建组装出来 
  - 要创建多少个对象,(多少个Node节点)  
  - 创建对象要重点弄清楚传入参数，分别是type,attribute,...children。对应那个哪些值  
  - 创建出来对象 要不是ElementWrapper（对应createElement创建对象），就是TextWrapper（对应createTextNode创建对象）  
  - 每一个对象都有mountTo方法（即挂载到Element,最终挂载到document.body上），重点是ElementWrapper具有setAttribute,appendChild方法。
  
  
  
 
