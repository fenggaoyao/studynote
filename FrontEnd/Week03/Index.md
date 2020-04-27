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
| Unary  |  delete a.b<br /> void foo()<br /> typeof a<br /> +a<br /> <br />a<br /> ~a<br /> !a<br /> await a   |
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
| Category | Content | | Describe |
| --- | --- |  --- | 
|简单语句 | a= 1+2;<br /> ; <br /> debugger; <br />throw a; <br />continue label;<br /> break label;<br/> return 1+2;| |
|块Block语句| {  } | 与对象区别；作用域； type:normal，顺序执行  当执行到非normal语句（break,continue,return throw）就不执行下去了  |
|Iteration|  while(); <br />do while( );<br /> for( ; ;)<br /> for(  in ) <br /> for(  of )<br /> for await (of) |  in(eumerable; of(Symbol.Iterator))  |
|标签 循环 break continue| label;iteration;continue;break  |  [[type]]:break continue; value:--;  target:label  |   |
|Try| try{}catch{变量} finally{} | 除了throw语句还有产生throw效果(type:throw): 运行时错误  ExpressionStatement   |
|声明| function ;function**; aysnc function ; async function**; class ,var let const import export||
## Type Convertion
![avatar](https://static001.geekbang.org/resource/image/71/20/71bafbd2404dc3ffa5ccf5d0ba077720.jpg)


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