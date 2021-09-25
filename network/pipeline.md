Endpoint 对象代码中有两个关键类型属性分别是EndpointMetadataCollection 类型和RequestDelegate：

EndpointMetadataCollection：存储了Controller 和Action相关的元素集合，包含Action 上的Attribute 特性数据等
RequestDelegate ：存储了Action 也即委托，这里是每一个Controller 的Action 方法


再回过头来看看EndpointMiddleware 中间件和核心代码，EndpointMiddleware 的一大核心代码主要是执行Endpoint 的RequestDelegate 委托，也即Controller 中的Action 的执行

文章：https://www.cnblogs.com/jlion/p/12423301.html


1. 当访问一个Web 应用地址时，Asp.Net Core 是怎么执行到Controller 的Action的呢？
答：程序启动的时候会把所有的Controller 中的Action 映射存储到routeOptions 的集合中，Action 映射成Endpoint终结者 的RequestDelegate 委托属性，最后通过UseEndPoints 添加EndpointMiddleware 中间件进行执行，同时这个中间件中的Endpoint 终结者路由已经是通过Routing匹配后的路由。

2. EndPoint 跟普通路由又存在着什么样的关系？
答：Ednpoint 终结者路由是普通路由map 转换后的委托路由，里面包含了路由方法的所有元素信息EndpointMetadataCollection 和RequestDelegate 委托。

3. UseRouting() 、UseAuthorization()、UseEndpoints() 这三个中间件的关系是什么呢？
答：UseRouing 中间件主要是路由匹配，找到匹配的终结者路由Endpoint ；UseEndpoints 中间件主要针对UseRouting 中间件匹配到的路由进行 委托方法的执行等操作。
UseAuthorization 中间件主要针对 UseRouting 中间件中匹配到的路由进行拦截 做授权验证操作等，通过则执行下一个中间件UseEndpoints(),具体的关系可以看下面的流程图：


Kestrel是一款基于中间件来处理tcp连接的服务器，并内置了http(包含websocket、SignalR)解析中间件。
。也就是说，我们完全可以给kestrel添加其它中间件，用来处理非http的连接的业务场景，让kestrel使用一个端口支持多种协议或多协议一个端口一种协议的要求。


在kestrel世界里，也有一个IConnectionBuilder.Use(Func<ConnectionDelegate, ConnectionDelegate> middleware)，Func<ConnectionDelegate, ConnectionDelegate>就是kestrel的中间件

在kestrel中间件里，最重要的对象就是ConnectionDelegate，它等同于Func<ConnectionContext,Task>，我们可以理解为它就是一个Hanlder，传入连接上下文，剩下就是我们要干的工作了，而中间件是除了这个Handler之外，我们还能拿到一个叫next的Handler，我们可以选择是否调用它，如果不调用，流程终止。

ConnectionContext是kestrel的一个Tcp连接抽象，其核心属性是Transport，表示双工传输层的操作对象，另外提供Abort()方法用于服务端主动关闭连接。基于ConnectionContext，很容易实现一个自定义协议的tcp双工通讯服务器，相比从Socket写起，我们可能可以减少100倍代码量，而得到的是更高性能的服务。


https://www.cnblogs.com/kewei/p/12775469.html