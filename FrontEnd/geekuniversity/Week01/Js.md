## Token
输入
- InputElement
  - WhiteSpace 所有 Unicode 都能在 js 中用
  - LineTerminator
  - Comment
  - Token
    - Identifier 变量名
    - Keywords if else
    - Punctuator 标点
    - NumericLiteral 0.1 0.2 直接量
    - StringLiteral ''
    - RegularExpressionLiteral //
    - Template ``


## syntax
- A2-A5 从小到大 词到句到结构到模块

```js
if (a<100)
  b += a++

if statement
  expression
  statement
    expression
      =
        b
        expression
          =
```
语法对应语义
1个语法结构对应1个语义
e.g. if 语句


## reference
```js
a.b = 3

delete a.b -> reference -> 3
delete 3
```
## job quene
- 浏览器引擎
   - EnqueueJob
- 塞入代码 
  - InitializeHostDefinedRealm
- 初始化 执行上下文
- RunJobs
- 运行

执行过程
```js
Job
  Script/Module
    Promise
      Function
        Statement
          Expression
            Literal(Atom)
            Identifier(Atom)
```
