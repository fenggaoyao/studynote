# 表达式、语句与对象

| Grammer | Runtime |
| --- | --- | 
| Grammer Tree VS Priority | Type Convertion |
| Left hand Side & Right Hand Side |  |
| 简单语句 <br/> 组合语句 <br/> 声明  | Completion Record(type:normal break,continue,return throw；<br /> value: <br /> target) <br /> Lexical Environment  |

## 表达式
| Category | Content |
| --- | --- | 
| Memeber |  a.b <br /> a[b] <br /> foo`string` <br /> super.b <br /> super["b"] <br /> new target <br /> new foo() |
|Call| foo() <br /> super() <br /> foo()['b'] <br /> foo().b <br /> foo()`abc`|
| Update  |  a++ <br /> a--<br />  --a <br /> ++a  |
| Unary  |  delete a.b<br /> void foo()<br /> typeof a<br /> +a <br />a<br /> ~a<br /> !a<br /> await a   |
| Exponental  | **   |
| Multiplicative  |  * / %   |
| Additive  |  +-  |
| Shift  | >> <<  >>>   |
| RelationShip  |  <> <=  >=  instanceof in   | 
|Equality | == != === !== |
|Bitwise | &(按位与运算)  ^(按位异或运算) &#124; (按位或运算)|
|Logical |  && &#124;&#124; |
|Conditional | ?: |

## 语句
| Category | Content |  Describe |
| --- | --- |  --- | 
|简单语句 | a= 1+2;<br /> ; <br /> debugger; <br />throw a; <br />continue label;<br /> break label;<br/> return 1+2;| |
|块Block语句| {  } | 与对象区别；作用域； type:normal，顺序执行  当执行到非normal语句（break,continue,return throw）就不执行下去了  |
|Iteration|  while(); <br />do while( );<br /> for( ; ;)<br /> for(  in ) <br /> for(  of )<br /> for await (of) |  in(eumerable; of(Symbol.Iterator))  |
|标签 循环 break continue| label;iteration;continue;break  |  [[type]]:break continue; value:--;  target:label  |   |
|Try| try{}catch{变量} finally{} | 除了throw语句还有产生throw效果(type:throw): 运行时错误  ExpressionStatement   |
|声明| function ;function*; aysnc function ; async function*; class ,var let const import export||
## Type Convertion
![avatar](https://static001.geekbang.org/resource/image/71/20/71bafbd2404dc3ffa5ccf5d0ba077720.jpg)
![avatar](https://cdn.nlark.com/yuque/0/2020/png/382504/1588008238437-d19bc0a9-8248-48bc-8aec-5490859dad6a.png)
## 对象
 我们不应该到语言描述干扰，在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则

 K-V：Symbol String  -> Data(数据属性 value writeable enumrable configuration )
  Accessor（访问器属性 get set enumerable configurable）
  
### Object API/Grammar
  - {}.[]  Object.defineProperty
  - Object.create/ Object.setPrototypeOf / Object.getPrototypeOf
  - new /class /extends
  - new /function /prototype

### Function Object
   Object.prototype , call(函数对象), constructor(构造器对象)
### Special Object
  [盘点JavaScript中对象内部属性和方法](JavaScript_Object.md)

### Object与Function原型
Fuction函数对象，它来源Function.prototype，同时具有构造器[[Contruct]]与[[Call]]。
通过[[contruct]]创建对象，实例对象.__proto__ === 构造函数.prototype // ①
实例对象的实例方法来自构造函数constructor,比如function Foo(){this.a=1}  Foo.prototype.b=2，构造函数就是Foo
new操作相当于var obj={};Foo.prototype.Call(obj);return obj;
重点是区分别是
Function.protoType:"length", "name", "arguments", "caller", "constructor", "apply", "bind", "call", "toString" 
Object.protoType:"constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"


![avatar](https://image-static.segmentfault.com/814/496/814496966-594c0322580c7_articlex)

## 课后作业：

- 函数 convertStringToNumber
- 以及函数 convertNumberToString


## 参考链接：

- 讲师提供：
  - <https://jsfiddle.net/pLh8qeor/19/>
- 学员提供：
  - 运算符优先级：[ https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

## 参考名词：

- LeftHandSideExpression：ECMA-262.pdf 201 页 12.3
- UpdateExpression：ECMA-262.pdf 178 页 11.9.1
- [IIFE ](https://zh.wikipedia.org/wiki/%E7%AB%8B%E5%8D%B3%E8%B0%83%E7%94%A8%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)：Immediately-invoked Function Expressions 立即执行的函数表达式
- [别人笔记](https://www.yuque.com/u221766/xgl0mb/fo37kh)