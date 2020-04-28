# JavaScript 浮点数

JavaScript 中所有数字包括整数和小数都只有一种类型 — Number。它的实现遵循 IEEE 754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数（相关的还有float 32位单精度）。

这样的存储结构优点是可以归一化处理整数和小数，节省存储空间。

64位比特又可分为三个部分：

符号位S：第 1 位是正负数符号位（sign），0代表正数，1代表负数
指数位E：中间的 11 位存储指数（exponent），用来表示次方数
尾数位M：最后的 52 位是尾数（mantissa），超出的部分自动进一舍零


因为长度是11位，取值范围是 0~2047。但是科学计数法中的指数是可以为负数的，所以再减去一个中间数 1023

![avatar](https://user-images.githubusercontent.com/948896/31601625-1f199ad0-b220-11e7-9d46-bb48a470bedf.png)


![avatar](https://user-images.githubusercontent.com/948896/31601584-f65ed43e-b21f-11e7-8755-c99b48e5134c.png)


[标准例子](float.js),[测试](float.test.js)，涉及关于判断大小端


前52位能表示的最大值是下面这个（下面是52位+1位默认的1）：
parseInt("11111111111111111111111111111111111111111111111111111",2)
-> 9007199254740991 //即2^53-1
(VisualNumeric64)[http://alvarto.github.io/VisualNumeric64/0.1]
![avatar](https://image-static.segmentfault.com/e9/49/e9499ef1e1c9c901bc8db9348ebd9660_articlex)
从第2^53位开始，第一个进制被舍弃，这个时候，2^53+1==2^53，每两个值都会有一个值出现这种不精确的情形。再过N个值，会出现每4个值里面都有3个值不精确；再过M个值，会出现每2^K个值里有2^K-1个值不精确；以此类推……（小题目：这个N值是多少？）


## 原码、补码 反码
正数的补码是其本身，负数补码是除符号位,其余位取反加+1
![avatar](https://static001.geekbang.org/resource/image/d3/4f/d3788c6ecac1f8d8eee9552c7452ca4f.jpg)
计算机数据的溢出，就相当于取模(2^n-1+1)
i-j=(i-j)+(2^n-1+1)=i+(2^n-1-j+1)。
除了符号位之外按位取反。我们把 2^n-1-j 所对应的编码称为负数 -j 的反码  
-j 的反码加上 1 定义为 -j 的补码，就可以得到 i-j=i 的原码 +(-j 的补码)。  
溢出本来是计算机数据类型的一种局限性，但在负数的加法上，它倒是可以帮我们大忙。

以下作为其它练习参考

```js
var num = 0.1,
    result = [];
new Uint8Array(new Float64Array([num]).buffer).reverse().map(item => result.push(item.toString(2).padStart(8, '0')));
console.log(result.join(' '));
```

比如1314.1314，它的二进制表示
01000000 10010100 10001000 10000110 10001101 10111000 10111010 11000111。
开头是0，表示正数
中间11位是1000000 parseInt('10000001001',2),计算得到1033，则指数部分是1033-1023=10
尾数部分是1.0100100010001000011010001101101110001011101011000111 （注意是1.后面52位）
小数点往推后10位，则是10100100010.001000011010001101101110001011101011000111 

```js
function eachBinaryFloatPartToDecimal(binaryFloatPartArr) {
    return binaryFloatPartArr.map((currentValue, index) => {
        return Number(currentValue) * Math.pow(2, (-(index + 1)))
    })
}
/**
* 将二进制小数（包含整数部分和小数部分）转换为十进制数
* @param binaryNum 二进制数（可能是整数，也可能是小数）
*/
function binaryFloatToDecimal(binaryNum) {
    // 如果该二进制只有整数部分则直接用 parseInt(string, radix) 处理
    if (Number.isInteger(binaryNum)) {
        return parseInt(binaryNum, 2)
    } else {
        const binaryFloatNumArr = binaryNum.toString().split(".")

        // 将二进制整数转换为十进制数
        const binaryIntParStr = binaryFloatNumArr[0]
        const decimalIntPartNum = parseInt(binaryIntParStr, 2)

        // 将二进制小数部分转换为十进制数
        const binaryFloatPartArr = binaryFloatNumArr[1].split("")
        const eachDecimalFloatPartNum = eachBinaryFloatPartToDecimal(binaryFloatPartArr)
        const deciamlFloatPartNum = eachDecimalFloatPartNum.reduce((accumulator, currentValue) => { return accumulator + currentValue })
        return decimalIntPartNum + deciamlFloatPartNum
    }
}

console.log(binaryFloatToDecimal('10100100010.001000011010001101101110001011101011000111'))  

```
  - typedArray指的是:    
      * Int8Array(); 
      * Uint8Array(); 
      * Uint8ClampedArray();
      * Int16Array(); 
      * Uint16Array();
      * Int32Array(); 
      * Uint32Array(); 
      * Float32Array(); 
      * Float64Array();

  例子: 
```javascript
      定义一个拥有8个字节的内存空间
      var x = new ArrayBuffer(8)  
      var y = new Int8Array(x)
      给内存中的数组下标为0 2 7的元素赋值
      Int8Array(8) [1, 0, 4, 0, 0, 0, 0, 4]
      拷贝y到m
      var m = new Int16Array(y)
      Int16Array(8) [1, 0, 4, 0, 0, 0, 0, 4]
      创建一个新的类型化视图数组, 如果buffer里面已经有值, 按照小端字序的规则存储
      *** 分析: 16位的整数由2个字节组成, buffer是8个字节的内存, 所以16位整数需要4个字节来存储
      *** 0000000100000000 0000010000000000 0000000000000000  0000000000000100
      var m = new Int16Array(x)
      Int16Array(4) [1, 4, 0, 1024]
```











