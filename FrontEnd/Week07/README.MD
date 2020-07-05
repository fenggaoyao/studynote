这周主要是把 toy-browser 完成了，看着可视化的结果调试起来更加方便了。

剩下的是对css进行了大致分类。通过浏览器的角度来重新学习css有很大不同。


- @charset
- @import
- rules
 - @media
 - @page
 - rule

### At-rules

- @charset : https://www.w3.org/TR/css-syntax-3
- @import :  https://www.w3.org/TR/css-cascade-4
- @media :  https://www.w3.org/TR/css3-conditional
- @page :  https://www.w3.org/TR/css-page-3
- @counter-style : https://www.w3.org/TR/css-counter-styles-3
- @keyframes :  https://www.w3.org/TR/css-animations-1
- @font-face : https://www.w3.org/TR/css-fonts-3
- @supports : https://www.w3.org/TR/css3-conditional 
- @namespace :  https://www.w3.org/TR/css-namespaces-3


### 普通rules

 - selector : https://www.w3.org/TR/selectors-3/
 - key
    * Properties
    * Variables : https://www.w3.org/TR/css-variables
 - value : https://www.w3.org/TR/css-values-4
 
## 参考链接：

- <https://www.w3.org/TR/CSS21/grammar.html#q25.0>
- <https://www.w3.org/TR/css-syntax-3>
- <http://www.html-js.com/article/2402>
- 小实验收集：[ https://www.w3.org/TR/?tag=css](https://www.w3.org/TR/?tag=css)

## 参考名词：

- [BFC ](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)：块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

## 参考代码：
- 收集标准：

```javascript
var lis = document.getElementById("container").children
var result = [];
for(let li of lis) {
    if(li.getAttribute('data-tag').match(/css/))
        result.push({
            name:li.children[1].innerText,
            url:li.children[1].children[0].href
        })
}
console.log(result)
```

- 收集 CSS 属性相关标准：

```JavaScript
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);
function happen(element, event){
    return new Promise(function(resolve){
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}
void async function(){
    for(let standard of standards) {
        iframe.src = standard.url;
        console.log(standard.name);
        await happen(iframe, "load");
    }
}();
```