# Unicode

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


作业：[utf8.js ](https://github.com/gnosis23/Frontend-01-Template/blob/master/week02/utf8.js)