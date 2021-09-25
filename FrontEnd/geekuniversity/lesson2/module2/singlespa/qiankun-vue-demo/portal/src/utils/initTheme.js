import Cookies from 'js-cookie'

const theme = Cookies.get('theme') || 'blackgold'

export const getCSSString = (url) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText.replace(/@font-face{[^}]+}/, ''))
      }
    }
    xhr.open('GET', url)
    xhr.send()
  })
}

if (theme) {
  document.body.className = theme + '-theme'
  getCSSString(`${window.location.origin}/theme/${theme}-theme/index.css`)
  .then(css => {
    const styleTag = document.createElement('style')
    styleTag.type = 'text/css'
    styleTag.innerText = css
    styleTag.id = theme + '-theme-style_'
    styleTag.className = 'portal_add_themestyle'
    // document.body.appendChild(styleTag)
    document.body.insertBefore(styleTag, document.body.childNodes[0])
  })
}
