# 编程语言通识

## 按语法分类

* 非形式语言
  * 中文
* 形式语言
  * 0型: 无限制文法
    * 等号左边不止一个 <a><b> ::= "c"
  * 1型: 上下文相关文法
    * "a"<b>"c"::="a""x""c"
  * 2型: 上下文无关文法
    * js, 大部分情况是上下文无关
  * 3型: 正则文法
    * 限制表达能力

### 产生式 BNF

练习:

```

"a"
"b"
<Program>: = ("a"+ | <Program> "b"+)+


整数连加
"+"
<Number>: "0" | "1" ... "9"
<Decimal>: "0" | (("1" ~ "9") <Number>+)
<Expression>: <Decimal> ("+" <Decimal>)+
<Expression>: Deciamal | (<Expression> "+" <Decimal>)

四则运算
<PrimaryExpression> = <DecimalNumber> |
"(" <LogicalExpression> ")"


<MultiplicativeExpression> = <PrimaryExpression> |
<MultiplicativeExpression> "*" <PrimaryExpression>|
<MultiplicativeExpression> "/" <PrimaryExpression>


<AdditiveExpression> = <MultiplicativeExpression> |
<AdditiveExpression> "+" <MultiplicativeExpression>|
<AdditiveExpression> "-" <MultiplicativeExpression>

逻辑判断
<LogicalExpression> = <AdditiveExpression> |
<LogicalExpression> "||" <AdditiveExpression> |
<LogicalExpression> "&&" <AdditiveExpression>

```

终结符, 如: "+"
非终结符: 如:  <LogicalExpression>


// 例子：2*(1+2)||2  [测试地址]( https://pegjs.org/online)
[JAVASCRIPT AST VISUALIZER](https://resources.jointjs.com/demos/javascript-ast)


正则的回溯指的是什么

## 图灵完备性

[wiki](https://zh.wikipedia.org/wiki/%E5%9C%96%E9%9D%88%E5%AE%8C%E5%82%99%E6%80%A7)

* 命令式 -- 图灵机
  * goto
  * if while
* 声明式 -- lambda
  * 递归
  * 分治

## 类型系统

* 动态静态
* 强类型弱类型
* 复合类型
* 子类型
  * 逆变/协变

## 机器语言

![avatar](https://static001.geekbang.org/resource/image/a2/a2/a20dec9ec8a84c8519dd1c4a18c2dda2.jpg)
  - [二进制编译](compiler.md)
