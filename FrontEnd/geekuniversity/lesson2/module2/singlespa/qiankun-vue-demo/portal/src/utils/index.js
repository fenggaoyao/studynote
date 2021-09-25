import store from '@/store'
import { getCSSString } from './initTheme'
import { removeToken } from './auth'
// 监听浏览器关闭 和刷新
export function pageIsClose() {
  let _beforeUnload_time = 0,
      _gap_time = 0
  //是否是火狐浏览器
  const is_fireFox = navigator.userAgent.indexOf("Firefox")>-1
  window.onunload = function (){
    _gap_time = new Date().getTime() - _beforeUnload_time
    if(_gap_time <= 5) {
      // alert('浏览器关闭')
      removeToken()
    } else {
      // alert('浏览器刷新')
    }
  }
  window.onbeforeunload = function () {
    _beforeUnload_time = new Date().getTime()
    if(is_fireFox) { //火狐关闭执行
      removeToken()
    }
  }
}

export async function setTheme(theme) {
  const body = document.body
  const styleName = theme + '-theme-style'

  const styleList = body.getElementsByClassName('portal_add_themestyle')
  for (let item of styleList) {
    body.removeChild(item)
  }
  if (!document.querySelector('#' + styleName + '_')) {
    // 新增样式
    const newStyle = await getCSSString(`${window.location.origin}/theme/${theme}-theme/index.css`)
    const styleTag = document.createElement('style')
    styleTag.type = 'text/css'
    styleTag.id = styleName + '_'
    styleTag.innerText = newStyle
    styleTag.className = 'portal_add_themestyle'
    body.insertBefore(styleTag, body.childNodes[0])
    // body.appendChild(styleTag)
  }
  body.className = theme + '-theme'
}
// 设置模板角色
export function setLive2d(live2d) {
  setTimeout(() => {
    window.L2Dwidget.config.model = {  jsonPath: `${window.location.origin}/live2dw/live2d-widget-model-${live2d}/assets/${live2d}.model.json`}
    window.L2Dwidget.config.pluginModelPath = `live2d-widget-model-${live2d}/assets/`
    window.L2Dwidget.init()
  }, 100)
}
// 改变模板角色宽高
export function changeLiveWH(opts) {
  if (!opts) opts = { width: 0, height: 0 }
  setTimeout(() => {
    window.L2Dwidget.config.display = {...window.L2Dwidget.config.display, ...opts},
    window.L2Dwidget.init()
  }, 100)
}
// 离开当前页面提示
function leaveTips(e) {
  const event = window.event || e
  event.returnValue = '确定离开当前页面吗？'
}
// 增加离开当前页面提示事件
export function bindLeaveTips() {
  window.addEventListener('beforeunload', leaveTips)
}

// 删除离开当前页面提示事件
export function unbindLeaveTips() {
  window.removeEventListener('beforeunload', leaveTips)
}

// 判断是否是谷歌
export function isChrome(ver = 70) {
  const UA = window.navigator.userAgent.toLowerCase()
  const noChrome = ['msie/', 'trident/', 'firefox/', 'ubrowser/', 'opera/', 'bidubrowser/', 'metasr/', 'tencenttraveler/', 'qqbrowser/', 'maxthon/', 'edge/', 'micromessenger/']
  const types = Object.keys(window.navigator.mimeTypes).map(key => window.navigator.mimeTypes[key]).some(({ type }) => type.includes('chromium'))
  const version = UA.match(/chrome.*?\./)[0].match(/\d+/) >= ver
  const chrome = UA && /chrome\/\d+/.test(UA) && !noChrome.some(ua => UA.includes(ua)) && !types && version
  return chrome
}

/**
 * 检测浏览器是否放大
 * @param rsize  Boolean 是否返回具体放大数值
 */
export function detectZoom(rsize) {
  let ratio = 0
  const screen = window.screen
  const ua = navigator.userAgent.toLowerCase()

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth
  }

  if (ratio) {
    ratio = Math.round(ratio * 100)
  }

  return rsize ? ratio : ratio === 100
}

// 深拷贝
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
// 防抖
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}


// 获取url参数
export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
