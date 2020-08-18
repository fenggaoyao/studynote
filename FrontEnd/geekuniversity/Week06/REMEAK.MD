# 解析HMTL CSS

解析HTML 三种类型
type: 'text',  
type: 'element',  
type: 'endTag', 遇到Styles结束标签，加入CSSRules，计算layout（top） (正常流位置不一样，现简单处理)

 let mainSize, mainStart, mainEnd, mainSign, mainBase,
      crossSize, crossStart, crossEnd, crossSign, crossBase;

## Element
type 、children、attributes、parentNode、previousElementSibling、tagName、computedStyle
计算css为什么要放在创建元素的时候？早点计算利于后面计算和显示
```javascript
 {
	type: 'element',
	children: [],
	attributes: [],
	parentNode: {
	},
	previousElementSibling: {	
	},
	tagName: 'div',
	computedStyle: {
		flex: {
			value: '1',
			specificity: [Array]
		},
		backgroundColor: {
			value: 'rgb(223,0,232)',
			specificity: [Array]
		}
	}
}
```

## 浏览器复杂选择器
