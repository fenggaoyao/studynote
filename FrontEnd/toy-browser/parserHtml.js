const { addCSSRules, computeCSS } = require('./css');
const { layout } = require('./layout');

const EOF=Symbol("EOF") //enf of file
let currentToken = null
let currentAttribute = null
let currentTextNode = null
let stack = [{type: 'document', children: []}]

function emit(token) {
    let top = stack[stack.length - 1]
  
    if (token.type === 'text') {
      if (currentTextNode === null) {
        currentTextNode = {
          type: 'text',
          content: ''
        };
        top.children.push(currentTextNode);
      }
      currentTextNode.content += token.content;
    }
    else if (token.type === 'startTag') {
      let element = {
        type: 'element',
        children: [],
        attributes: [],
        parentNode: top,
        previousElementSibling: null
      }
  
      element.tagName = token.tagName
  
      const usedProperties = ['type', 'tagName', 'isSelfClosing']
      for (let p in token) {
        if (token.hasOwnProperty(p) && !usedProperties.includes(p)) {
          element.attributes.push({
            name: p,
            value: token[p]
          })
        }
      }
  
      if (top.children.length > 0) {
        for (let i = top.children.length - 1; i >= 0; --i) {
          if (top.children[i].type !== 'text') {
            element.previousElementSibling = top.children[i];
            break;
          }
        }
      }
  
      // 计算css为什么要放在创建元素的时候？
      // 早点计算利于后面计算和显示
      computeCSS(element);
  
      top.children.push(element);
  
      if (!token.isSelfClosing) {
        stack.push(element)
      } 
  
      currentTextNode = null
    }
    else if (token.type === 'endTag') {
      if (top.tagName !== token.tagName) {
        throw new Error('Tag start end mis match')
      } else {
        //遇到style标签时，执行添加css规则的操作
        if (top.tagName === 'style') {
          addCSSRules(top.children[0].content);
        }
        layout(top);

        stack.pop()
      }
      currentTextNode = null
    }
  }

function data(c){   
    if (c === '<') {
        return tagOpen
      } else if (c === EOF) {
        emit({
          type: 'EOF'
        })
      } else {
        emit({
          type: 'text',
          content: c
        })
        return data
      }
}

function tagOpen(c){
    if (c === '/') {
        return endTagOpen
      } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
          type: 'startTag',
          tagName: ""
        }
        return tagName(c)
      } else {
    
      }
}
function endTagOpen(c){
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
          type: 'endTag',
          tagName: ''
        }
        return tagName(c)
      } else if (c === '>') {
    
      } else if (c === EOF) {
    
      } else {
    
      }
}
function tagName(c){
    // \t 水平制表符  \n 回车换行 \f换页
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
      } else if (c === '/') {
        return selfClosingStartTag
      } else if (c.match(/^[A-Z]$/)) {
        currentToken.tagName += c.toLowerCase()
        return tagName
      } else if (c === '>') {
        emit(currentToken)
        return data
      } else {
        currentToken.tagName += c
        return tagName
      }
}
function beforeAttributeName(c){
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
      } else if (c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c)
      } else if (c === '=') {
    
      } else {
        currentAttribute = {
          name: '',
          value: ''
        }
        return attributeName(c)
      }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
      return afterAttributeName(c)
    } else if (c === '=') {
      return beforeAttributeValue
    } else if (c === '\u0000') {
  
    } else if (c === '\"' || c === "'" || c === '<') {
  
    } else {
      currentAttribute.name += c
      return attributeName
    }
  }
  
  function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
      afterAttributeName
    } else if (c === '/') {
      return selfClosingStartTag
    } else if (c === '=') {
      return beforeAttributeValue
    } else if (c === '>') {
      emit(currentToken)
      return data
    } else if (c === EOF) {
  
    } else {
      currentAttribute = {
        name: '',
        value: ''
      }
      return attributeName(c)
    }
  }
  
  function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
      return beforeAttributeValue
    } else if (c === "\"") {
      return doubleQuotedAttributeValue
    } else if (c === "\'") {
      return singleQuotedAttributeValue
    } else if (c === '>') {
  
    } else {
      return UnquotedAttributeValue(c)
    }
  }
  
  function doubleQuotedAttributeValue(c) {
    if (c === '"') {
      return afterQuotedAttributeValue
    } else if (c === '&') {
  
    } else if (c === EOF) {
  
    } else {
      currentAttribute.value += c
      return doubleQuotedAttributeValue
    }
  }
  
  function singleQuotedAttributeValue(c) {
    if (c === "'") {
      return afterQuotedAttributeValue
    } else if (c === '&') {
  
    } else if (c === EOF) {
  
    } else {
      currentAttribute.value += c
      return doubleQuotedAttributeValue
    }
  }
  
  function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
      currentToken[currentAttribute.name] = currentAttribute.value
      return beforeAttributeName
    } else if (c === '/') {
      currentToken[currentAttribute.name] = currentAttribute.value
      return selfClosingStartTag
    } else if (c === '>') {
      currentToken[currentAttribute.name] = currentAttribute.value
      emit(currentToken)
      return data
    } else if (c === '\u0000') {
  
    } else if (c === "\"" || c === "'" || c === "<" || c === "=" || c === "`") {
  
    } else if (c === EOF) {
  
    } else {
      currentAttribute.value += c
      return UnquotedAttributeValue
    }
  }
  
  function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\f\n ]$/)) {
      currentToken[currentAttribute.name] = currentAttribute.value
      return beforeAttributeName
    } else if (c === '/') {
      currentToken[currentAttribute.name] = currentAttribute.value
      return selfClosingStartTag
    } else if (c === '>') {
      currentToken[currentAttribute.name] = currentAttribute.value
      emit(currentToken)
      return data
    } else {
  
    }
  }
  
  function selfClosingStartTag(c) {
    if (c === '>') {
      currentToken.isSelfClosing = true
      emit(currentToken)
      return data
    } else if (c === "EOF") {
  
    } else {
  
    }
  }


module.exports.parseHTML=function(html){
    let state=data;
    for(let c of html){
        state=state(c)
    }
    state(EOF)
    return stack[0]
}