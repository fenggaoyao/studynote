# 表达式和语句

| Grammer | Runtime |
| --- | --- | 
| Grammer Tree VS Priority | Type Convertion |
| Left hand Side & Right Hand Side |  |


## Memeber
- a.b
- a[b]
- foo`string`
- super.b
- super["b"]
- new target
- new foo()

## Call
- foo()
- super()
- foo()['b']
- foo().b
- foo()`abc`

## update
- a++
- a--
- --a
- ++a
  
## Unary

- delete a.b
- void foo()
- typeof a
- +a
- -a
- ~a
- !a
- await a

# Exponental

- **

## Multiplicative
"*" / %
  

## Additive
+-

## Shift
 >> <<  >>>

## RelationShip
<> <=  >=  instanceof in 

## Equality
== != === !==
## Bitwise
&(按位与运算)  ^(按位异或运算) | (按位或运算)

## Logical
&& ||

## Conditional
?:


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