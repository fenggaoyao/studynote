# 热身【warming-up】

##### 1.编写一个 DOM 编辑器：可以自由地操作一个 iframe（空白）中的 DOM 结构，包括增、删、移动。
> 

##### 2.讲讲 position float display 各有哪些取值，它们互相之间会如何影响？
> [position:](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) static | relative | absolute | fixed | sticky  
> [float:](https://developer.mozilla.org/zh-CN/docs/CSS/float) none | left | right  
> [display:](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) inline | block | flex | table | grid ...   

##### 3.JavaScript 启动后，内存中有多少个对象？如何用代码来获得这些信息？
JavaScript对象的分类
- 宿主对象
- 内置对象
   - 固有对象：固有对象是由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。
   - 原生对象：使用构造器
   - 普通对象
  

- 三个值：Infinity、NaN、undefined，九个函数：
- eval
- isFinite
- isNaN
- parseFloat
- parseInt
- decodeURI
- decodeURIComponent
- encodeURI
- encodeURIComponent
- 一些构造器：
 - Array、Date、RegExp、Promise、Proxy、Map、WeakMap、Set、WeakSet、Function、Boolean、String、Number、Symbol、Object、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、ArrayBuffer、SharedArrayBuffer、DataView、Typed Array、Float32Array、Float64Array、Int8Array、Int16Array、Int32Array、UInt8Array、UInt16Array、UInt32Array、UInt8ClampedArray。
- 四个用于当作命名空间的对象：
 - Atomics JSON Math Reflect

```js
var set = new Set();
var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect];
objects.forEach(o => set.add(o));

for(var i = 0; i < objects.length; i++) {
    var o = objects[i]
    for(var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p)
        if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
            if(!set.has(d.value))
                set.add(d.value), objects.push(d.value);
        if( d.get )
            if(!set.has(d.get))
                set.add(d.get), objects.push(d.get);
        if( d.set )
            if(!set.has(d.set))
                set.add(d.set), objects.push(d.set);
    }
}
```

##### 4.HTML 的中，如何写一个值为 “a”=‘b’ 的属性值？
```js
const div = document.querySelector('div')
div.setAttribute('data', `"a"='b'`)
```

##### 5.编写一个快速排序代码，并且用动画演示它的过程

>  [快速排序动画](https://jtr354.github.io/Frontend-01-Template/warming-up/5-quick-sort/qucik-sort.html)