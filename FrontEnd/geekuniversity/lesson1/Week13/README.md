# 2、Proxy双向绑定

参考Vue的Reactive的写法，Reactive({})方法实现返回proxy，主要代理handler的get,set方法

- Effect()方法定义handle,里面调用属性的get方法，则当此对象和属性增临时对象，然后Effect此对象属性handler增加一个全局map里面  
- 当代理对象属性发生变化,即调用set方法，即在全局的map方法取出来此属性的handler,然后调用handler

如何实现双向绑定呢  
 1、定义一个reactive对象
 2、在Effect定义一个dom对象的赋值操作，即数据流从Javascript对象到UI的DOM对象
 3、实现从UI到javascript对象，则通过addEventListener('input',(event=>{event.target.value}))进行赋值  

 