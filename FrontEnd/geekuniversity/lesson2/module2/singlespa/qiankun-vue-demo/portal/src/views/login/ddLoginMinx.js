/**
 * 钉钉扫码登录
 */
import { getUrlParam } from '@/utils'
export default {
  data() {
    return {
      redirect_uri: '',
      DDAPPID: 'xxxxx', // 钉钉开发者id  需填写自己的  且配置安全域名
    }
  },
  mounted() {
    // cons
    this.getDdInfo()
  },
  methods: {
    // 获取钉钉信息
    getDdInfo() {
      var ddCode = getUrlParam("state"); 
      if (ddCode === 'DD_STATE') {  // 判断是钉钉扫码进来的
        // 获取 钉钉临时授权 code  去拿用户信息
        const code = getUrlParam('code')
        // 去后端请求 数据  再调用户信息的首页
        console.log(code)
        // 模拟 已拿到钉钉用户信息 登录
        this.$store.dispatch('login', { username: 'admin', password: 'admin' }).then(() => {
          this.$message.success({
            message: '登录成功',
            duration: 1000,
            onClose: () => {
              this.$router.push({ path: '/' })
            }
          })
        }).catch(err => {
          this.$message.error({
            message: err || '验证错误， 请重新登录',
            duration: 1500
          })
        })
      }
    },
    // 钉钉登录方式
    ddLogin() {
      // 显示容器
      this.$refs['otherLogin'].showBox = true
      this.$nextTick(() => {
        this.redirect_uri = window.location.origin // 获取来源路径
        const goto = encodeURIComponent(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.DDAPPID}&response_type=code&scope=snsapi_login&state=DD_STATE&redirect_uri=${this.redirect_uri}`)
        DDLogin({
          id: "login_container", //这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
          goto, //请参考注释里的方式
          style: "border:none;background-color:transparent;margin: 0 auto",
          width : "365",
          height: "325",
        })
        this.listenDDCb()
      })
    },
    // 监听钉钉扫码之后的返回
    listenDDCb() {
      const hanndleMessage = function (e) {
        const origin = e.origin
        if(origin == "https://login.dingtalk.com") {//判断是否来自ddLogin扫码事件。
          const loginTmpCode = e.data //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          // 构造并跳转到如下链接
          let url = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.DDAPPID}&response_type=code&scope=snsapi_login&state=DD_STATE&redirect_uri=${this.redirect_uri}&loginTmpCode=${loginTmpCode}`
          window.location.href = url
        }
      }
      if (typeof window.addEventListener != 'undefined') {
        window.addEventListener('message', hanndleMessage, false)
      } else if (window.attachEvent != 'undefined') {
        window.attachEvent('onmessage', hanndleMessage)
      }
    }
  }
}