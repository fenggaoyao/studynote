import fetch from 'isomorphic-fetch'
import 'es6-promise/auto'

const POSITION_INITIAL = 'initial'

const utils = {
  getQueryString (name) {
    var reg = new RegExp('(?:\\?|&)' + name + '=([^&]*)(?:&|$)', 'i')
    var r = window.location.href.match(reg)
    if (r != null) return decodeURIComponent(r[1])
    return ''
  },

    // 获取url中所有的参数
  getParams (url) {
    var vars = {}, hash, hashes, i
    url = url || window.location.href
        // 没有参数的情况
    if (url.indexOf('?') == -1) {
      return vars
    }
    hashes = url.slice(url.indexOf('?') + 1).split('&')
    for (i = 0; i < hashes.length; i++) {
      if (!hashes[i] || hashes[i].indexOf('=') == -1) {
        continue
      }
      hash = hashes[i].split('=')
      if (hash[1]) {
        vars[hash[0]] = (hash[1].indexOf('#') != -1) ? hash[1].slice(0, hash[1].indexOf('#')) : hash[1]
      }
    }
    return vars
  },

  getCookie (name) {
    var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg)) { return unescape(arr[2]) } else { return null }
  },

  toCSS (obj) {
    let style = {}
    style = utils.toPositonSizeCSS(obj)
    style = Object.assign(style, utils.toAnimateCSS(obj))
    style = Object.assign(style, utils.toFontCSS(obj))

    obj.color && (style['color'] = obj.color)
    obj.link && (style['link'] = obj.link)
    obj.border && (style['border'] = obj.border)
    obj.borderRadius && (style['border-radius'] = obj.borderRadius + 'px')
    obj.color && (style['color'] = obj.color)
    obj.opacity && (style['opacity'] = obj.opacity)
    obj.boxShadow && (style['box-shadow'] = obj.boxShadow)
    obj.rotate && (style['transform'] = 'rotate(' + this.rotate + 'deg)')
    obj.background && (style['background'] = obj.background)
    if (obj.lineHeight) {
      if (obj.lineHeight > 9) {
        style['line-height'] = obj.lineHeight + 'px'
      } else {
        style['line-height'] = obj.lineHeight
      }
    }
    obj.padding && (style['padding'] = obj.padding)
    obj.margin && (style['margin'] = obj.margin)
    return style
  },

  toFackeCSS () {
    let obj = {}
    obj.position = 'static'
    obj.marginTop = 0
    obj.marginRight = 0
    obj.marginBottom = 0
    obj.marginLeft = 0
    obj.paddingLeft = 0
    obj.paddingRight = 0
    obj.paddingTop = 0
    obj.paddingBottom = 0
    obj.paddingTop = 0
    obj.width = '100%'
    return obj
  },

  toPositonSizeCSS (obj) {
    let style = {}
    if (obj.display) {
      if (obj.position) {
        let trbl = utils.parsePosition(obj.position);
        (trbl.left || trbl.left === 0) && (style.left = utils.getValue(trbl.left));
        (trbl.right || trbl.right === 0) && (style.right = utils.getValue(trbl.right));
        (trbl.top || trbl.top === 0) && (style.top = utils.getValue(trbl.top));
        (trbl.bottom || trbl.bottom === 0) && (style.bottom = utils.getValue(trbl.bottom))
      }
      obj.zIndex && (style['z-index'] = obj.zIndex)
    }
        // obj.width != 0 && (style.width = utils.getValue(obj.width));
    obj.width && (style.width = utils.getValue(obj.width))
    obj.height != 0 && (style.height = utils.getValue(obj.height))
    return style
  },

  toAnimateCSS (obj) {
    let style = {}
    if (obj.animation) {
      let ans = obj.animation.split(' ')
      if (ans.length == 3) {
        style.animationDelay = (ans[1] || 0) + 'S'
        style.animationIterationCount = ans[2] || 'infinite'
      }
    }
    return style
  },

  toFontCSS (obj) {
    let style = {}
    obj.fontSize && (style['font-size'] = obj.fontSize + 'px')
    obj.textAlign && (style['text-align'] = obj.textAlign)
    obj.fontWeight && (style['font-weight'] = obj.fontWeight)
    obj.fontStyle && (style['font-style'] = obj.fontStyle)
    obj.textDecoration && (style['text-decoration'] = obj.textDecoration)
    obj.textShadow && (style['text-shadow'] = obj.textShadow)
    return style
  },

  parsePosition (position) {
    if (position) {
      let pos = position.replace(/px/g, '').split(' ')
      if (pos.length === 4) {
        const top = parseInt(pos[0])
        const right = parseInt(pos[1])
        const bottom = parseInt(pos[2])
        const left = parseInt(pos[3])
        return {
          top: top >= 0 ? top : POSITION_INITIAL,
          right: right >= 0 ? right : POSITION_INITIAL,
          bottom: bottom >= 0 ? bottom : POSITION_INITIAL,
          left: left >= 0 ? left : POSITION_INITIAL
        }
      }
    }
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },

  getValue (val) {
    if (val || val == 0) {
      val += ''
      if (val.indexOf('px') !== -1 ||
                val.indexOf('rem') !== -1 ||
                val.indexOf('%') !== -1) {
        return val
      } else {
        return val + 'px'
      }
    }
    return undefined
  },

  toProps (arr) {
    let props = {}
    arr.map(item => {
      if (item.component != 'split') {
        props[item.name] = {
          type: item.type,
          default: item.default,
          require: item.require
        }
      }
    })
    return props
  },

  toWatch (arr) {
    let watch = {}
    arr.map(item => {
      if (item.component != 'split') {
        watch[item.name] = function (val, oldVal) {
          this.update && this.update(item.name, val)
        }
      }
    })
    return watch
  },

  toData (arr, context) {
    return arr.map(item => {
      if (item.component != 'split' && item.component != 'none') {
        item.value = context[item.name]
      }
      return item
    })
  },

  toProps (arr) {
    let props = {}
    arr.map(item => {
      if (item.component != 'split') {
        props[item.name] = {
          type: item.type,
          default: item.default,
          require: item.require
        }
      }
    })
    return props
  },

  toFormData (arr) {
    let props = {}
    arr.map(item => {
      if (item.component != 'split' && item.component != 'none') {
        props[item.name] = item.value
      }
    })
    return {formData: props}
  },

  require (url) {
    return new Promise((resolve, reject) => {
      const doc = document
      const head = doc.head || (doc.getElementsByTagName('head')[0] || doc.documentElement)
      const node = doc.createElement('script')
      node.onload = onload
      node.async = true
      node.src = url
      head.appendChild(node)
      node.onload = () => {
        resolve()
      }
    })
  },

  requireImg (url) {
    let img = new Image()
    img.onload = () => {
      img = null
    }
    img.src = url
  },

    // 将统计参数加到地址中
  addSakParam (url, data) {
    var search = url.match(/\?(?:[^#]*|$)/)
    var hash = url.match(/#(?:[^?]*|$)/) || ''
    var origin = url.replace(search, '').replace(hash, '')
    var params = {}
    if (search) {
      var paramsStr = search[0].slice(1).split('&')
      for (var i = 0; i < paramsStr.length; i++) {
        var kvs = paramsStr[i].split('=')
        params[kvs[0]] = kvs[1]
      }
    }
    for (var k in data) {
      params[k] = data[k]
    }
    var newParamStr = []
    for (var key in params) {
      newParamStr.push(key + '=' + params[key])
    }
    var newSearch = '?' + newParamStr.join('&')
    return origin + newSearch + hash
  },

  login () {
    location.href = 'https://uuap.inwaimai.baidu.com/ucenter/userlogin?redirect_url=http%3A%2F%2Fh5.inwaimai.baidu.com'
  },

  handlerError (res, context) {
    if (res.errer_no == '10001') {
      utils.login()
    } else {
      context.alert(res.errer_msg)
    }
  }
}

export default utils
