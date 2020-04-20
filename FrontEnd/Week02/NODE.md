
# [编程语言通识](Language.md)
 
# JavaScript

## JS 词法、类型

### 预备知识：
 - [Unicode与JavaScript详解](http://www.ruanyifeng.com/blog/2014/12/unicode.html)
 - [unicode](https://www.fileformat.info/info/unicode/) 字符集
 - [中文字符](https://www.fileformat.info/info/unicode/block/cjk_unified_ideographs/index.htm)
 - [Blocks](https://www.fileformat.info/info/unicode/block/index.htm) 编码组


```javascript
'冯'.codePointAt(); \\20911  能够正确处理 4 个字节储存的字符，返回一个字符的码点,用for...of循环，因为它会正确识别 32 位的 UTF-16 字符
'冯'.charCodeAt(0); \\20911  返回前两个字节和后两个字节的值，针对UTF16编码
可用 `String.fromCharCode(20911)` \\冯 
转十六进制 使用20911 .toString(16) \\51af
HTML Entity (decimal)  	&#20911;
HTML Entity (hex)   	&#x51af;


`'\t'.codePointAt()`
\\ codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
function is32Bit(c) {
return c.codePointAt(0) > 0xFFFF;
}
is32Bit("𠮷") // true
is32Bit("a") // fals

```


* javascript 如何处理 emoji 字符
* 为什么不要用中文做变量名, 如何更安全使用中文作为变量名
* "厉".codePointAt(0).toString(16)

```js
var \u5389\u5389=1
console.log('厉害')
```



  - 0 ~ U+007F：常用拉丁字符
    - `String.fromCharCode(num)`
  - U+4E00 ~ U+9FFF：CJK ChineseJapaneseKorean三合一
    - 有一些增补区域（extension）
  -  U+0000 - U+FFFF：[BMP]([https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84](https://zh.wikipedia.org/wiki/Unicode字符平面映射)) 基本平面

- [Categories](https://www.fileformat.info/info/unicode/category/index.htm)

  - [space空格系列](https://www.fileformat.info/info/unicode/category/Zs/list.htm)

- 实践

  - 中文变量名

    因涉及到文件的编码保存方式，使用 `\u十六进制unicode`转译（`'厉'.codeCodeAt().toString(16)`）

### Atom 词

#### InputElement

- whiteSpace

  可查阅 unicode [space列表](https://www.fileformat.info/info/unicode/category/Zs/list.htm)

  - Tab：制表符（打字机时代：制表时隔开数字很方便）
  - VT：纵向制表符
  - FF: FormFeed
  - SP: Space （推荐）
  - NBSP: NO-BREAK SPACE（和 SP 的区别在于不会断开、不会合并）
  - ...


- LineTerminator 换行符

  - LF: Line Feed `\n`
  - CR: Carriage Return `\r`
  - ...

- Comment 注释

- Token 记号：一切有效的东西

  - Punctuator: 符号 用于构成代码结构 比如 `> = < }`
  - Keywords：比如 `await`、`break`... 不能用作变量名，但像 getter 里的 `get`就是个例外
    - Future reserved Keywords: `eum`
  - IdentifierName：标识符，可以以字母、_ 或者 $ 开头，代码中用来标识**[变量](https://developer.mozilla.org/en-US/docs/Glossary/variable)、[函数](https://developer.mozilla.org/en-US/docs/Glossary/function)、或[属性](https://developer.mozilla.org/en-US/docs/Glossary/property)**的字符序列
    - 变量名：不能用 Keywords
    - 属性：可以用 Keywords
  - Literal: 直接量
      * NumericLiteral
      * StringLiteral
      * Template `` 


  * Type
    - Number
      - DecimalLiteral
        - 0
        - 0.
        - .2
        - 1e3
      - BinaryIntegerLiteral
        - 0b111
      - OctalIntergerLiteral
        - 0o10
      - HexIntergerLiteral
        - 0xFF

    - 存储 Uint8Array、Float64Array
     
    - 实践
      - 关于浮点数表示[计算例子](Decial.md)
      - Number.MAX_SAFE_INTEGER.toString(16) "1fffffffffffff"
      - 比较浮点是否相等：Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
      - 如何快捷查看一个数字的二进制：(97).toString(2)
      - Sign(1)  Exponent(11)  Fraction(52)
      

    - String
      - Character 字符
      - Code Point 码点
      - Encoding  
        - unicode编码 - utf
          - utf-8 可变长度 （控制位的用处）
      - Grammar
        - `''`、`""`、``` `
    - Boolean
    - Null
    - Undefind

小作业

- 写一个正则 匹配所有Number直接量
- 完成 UTF8__Encoding 的函数
```js

var code='严'.charCodeAt(0).toString(2);
code.replace(/(?!^)(?=(\d{6})+$)/g,',').split(','); // "100,111000,100101"
 
var writeUTF = function (str, isGetBytes) {
      var back = [];
      var byteSize = 0;
      for (var i = 0; i < str.length; i++) {
          var code = str.charCodeAt(i);
          if (0x00 <= code && code <= 0x7f) {
                byteSize += 1;
                back.push(code);
          } else if (0x80 <= code && code <= 0x7ff) {
                byteSize += 2;
                back.push((192 | (31 & (code >> 6))));
                back.push((128 | (63 & code)))
          } else if ((0x800 <= code && code <= 0xd7ff) 
                  || (0xe000 <= code && code <= 0xffff)) {
                byteSize += 3;
                back.push((224 | (15 & (code >> 12))));
                back.push((128 | (63 & (code >> 6))));
                back.push((128 | (63 & code)))
          }
       }
       for (i = 0; i < back.length; i++) {
            back[i] &= 0xff;
       }
       if (isGetBytes) {
            return back
       }
       if (byteSize <= 0xff) {
            return [0, byteSize].concat(back);
       } else {
            return [byteSize >> 8, byteSize & 0xff].concat(back);
        }
}

var readUTF = function (arr) {
    if (typeof arr === 'string') {
        return arr;
    }
    var UTF = '', _arr = this.init(arr);
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2)
            }
            UTF += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1
        } else {
            UTF += String.fromCharCode(_arr[i])
        }
    }
    return UTF
}

writeUTF('严',true).map(item=>item.toString(16)).join(' ')


  function encodeUtf8(text) {
            const code = encodeURIComponent(text);
            const bytes = [];
            for (var i = 0; i < code.length; i++) {
                const c = code.charAt(i);
                if (c === '%') {
                    const hex = code.charAt(i + 1) + code.charAt(i + 2);
                    const hexVal = parseInt(hex, 16);
                    bytes.push(hexVal);
                    i += 2;
                } else bytes.push(c.charCodeAt(0));
            }
            return bytes;
        }

        function decodeUtf8(bytes) {
            var encoded = "";
            for (var i = 0; i < bytes.length; i++) {
                encoded += '%' + bytes[i].toString(16);
            }
            return decodeURIComponent(encoded);
        }
        var array = encodeUtf8('ab热cd!');
        console.log(array); // 打印 [97, 98, 231, 131, 173, 99, 100, 33] 
        var content = decodeUtf8(array);
        console.log(content); // 打印 ab热cd!

```

对应的C#使用示例如下：
```C#
var bytes = System.Text.Encoding.UTF8.GetBytes("ab热cd!");
// 以下循环将打印 97 98 231 131 173 99 100 33
foreach (var b in bytes)
    Console.Write(b + " ");
Console.Write("\n");
var content = System.Text.Encoding.UTF8.GetString(bytes);
Console.WriteLine(content);  // 打印 ab热cd!
````


- 写一个正则表达式来匹配字符串

```javascript
'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'
```


- 讲师提供：
    - <https://home.unicode.org/>
    - <https://www.fileformat.info/info/unicode/>
  - 学员提供：
    - 计算浮点数的一个工具：[ https://github.com/camsong/blog/issues/9](https://github.com/camsong/blog/issues/9)
  - 有助于你理解的知识：
    - 正则表达式：[ https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
    - 揭秘 0.1 + 0.2 != 0.3 <https://www.barretlee.com/blog/2016/09/28/ieee754-operation-in-js/>
    - ASCII，Unicode 和 UTF-8 ：[ http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

  ## 参考名词：

  - [字符集](https://zh.wikipedia.org/zh/%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81)：字符编码（英语：Character encoding）、字集码是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8 位组或者电脉冲），以便文本在计算机中存储和通过通信网络的传递。常见的例子包括将拉丁字母表编码成摩斯电码和 ASCII。其中，ASCII 将字母、数字和其它符号编号，并用 7 比特的二进制来表示这个整数。通常会额外使用一个扩充的比特，以便于以 1 个字节的方式存储。在计算机技术发展的早期，如 ASCII（1963 年）和 EBCDIC（1964 年）这样的字符集逐渐成为标准。但这些字符集的局限很快就变得明显，于是人们开发了许多方法来扩展它们。对于支持包括东亚 CJK 字符家族在内的写作系统的要求能支持更大量的字符，并且需要一种系统而不是临时的方法实现这些字符的编码。
  - [Unicode ](https://zh.wikipedia.org/zh-hans/Unicode)：中文：万国码、国际码、统一码、单一码。是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。
  - [ASCII ](https://zh.wikipedia.org/wiki/ASCII)：（American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统。它主要用于显示现代英语，而其扩展版本延伸美国标准信息交换码则可以部分支持其他西欧语言，并等同于国际标准 ISO/IEC 646。美国信息交换标准代码是这套编码系统的传统命名，互联网号码分配局现在更倾向于使用它的新名字 US-ASCII[2]。美国信息交换标准代码是美国电气和电子工程师协会里程碑之一。
  - Token：记号、标记。JS 里有效的输入元素都可以叫 Token。
  - [NBSP ](https://zh.wikipedia.org/wiki/%E4%B8%8D%E6%8D%A2%E8%A1%8C%E7%A9%BA%E6%A0%BC)：不换行空格（英语：no-break space，NBSP）是空格字符，用途是禁止自动换行。HTML 页面显示时会自动合并多个连续的空白字符（whitespace character），但该字符是禁止合并的，因此该字符也称作“硬空格”（hard space、fixed space）。Unicode 码点为：U+00A0 no-break space。
  - [零宽空格](https://zh.wikipedia.org/zh-hans/%E9%9B%B6%E5%AE%BD%E7%A9%BA%E6%A0%BC)：（zero-width space, ZWSP）是一种不可打印的 Unicode 字符，用于可能需要换行处。在 HTML 页面中，零宽空格可以替代。但是在一些网页浏览器（例如 Internet Explorer 的版本 6 或以下）不支持零宽空格的功能。