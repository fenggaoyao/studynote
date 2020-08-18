# CSS排版
Inline_formatting_context(IFC)   --从左到右排列
block formatting context(BFC)  -- 从上到下排列
•
## line-box
width: content-box
 
margin > border > padding> content


**一个line-box如果有内容， 基线就在最后一行文字的下边缘， 如果没有内容，基线就在盒的下边缘**
解决方案：
让line-box的基线一直保持在盒子上/下/中， 不能按照 文字来对齐
如何做：
如果元素存在   display: inline-block; 一定要 配合上 vertical-align: bottom/top; 或  vertical-align: middle;

inline-box 配合一个vertical-bottom：bottom/top/middle使用,保证最高元素行高对齐，对齐方式 （有无超过line-height)

总结
如果 存在一个子元素的高度，超过了整行的行高(line-height)，则始终是拿最高的元素来作为行高的，并且始终保证最高的元素的对齐方式是正确的, 
如果子元素都没有超过当前行的line-height，则行高就是line-height

Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline 
Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“ 
vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线

## float clear
float样式最原始的意义就是实现 文字与元素环绕

当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。

清除浮动元素之间的联系-clear
## margin

前提：只会发生在BFC
margin:留白可以重复使用，只要满足情况就可以
产生多少个BFC
图中生成了两个BFC，最外层 div是一个BFC，  style="overflow: hidden;" 的div又是一个BFC

总结
能容纳正常流的都会产生BFC，但正常流的容器设置了 overflow:visible 就不会产生BFC,就会产生边距折叠
flex里面的每个item都是BFC，互相之间不会出现边距折叠
## BFC

从上往下排的块状盒子

一个正常流里面就可能有一个BFC，和多个IFC
block-level 表示可以被放入bfc 的东西
block-container 表示可以容纳bfc 的东西
block-box = block-level + block-container
block-box 如果 overflow 是 visible， 那么就跟父bfc合并

flex inline-flex :(Flex-container,里面flex-item是block-container,正常流)
table inline-table
grid inline-grid
block inline-block  (block-container 表示可以容纳bfc 的东西)


大家请记住下面这个表现原则：如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。
block-level 表示可以被放入 bfc
block-container 表示可以容纳 bfc
block-box = block-level + block-container
block-box 如果 overflow 是 visible， 那么就跟父 bfc 合并    