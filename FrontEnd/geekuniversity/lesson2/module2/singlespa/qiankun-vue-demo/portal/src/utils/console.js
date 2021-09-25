import store from '@/store'
const getNamespace = () => {
  const pathname = window.location.pathname.split('/')[1]
  const subApp = store.getters.subApp
  const a = subApp.find(item => item.appPrefix.indexOf(pathname) !== -1 || pathname.indexOf(item.appPrefix)!== -1)
  if (a && a.appName) return a.appName + ': '
  else return ''
}
export default (target) => {
  return new Proxy(target, {
    get: (_, p) => {
      return (...args) => {
        return target[p](`${getNamespace()}`, ...args)
      }
    },
  })
}
