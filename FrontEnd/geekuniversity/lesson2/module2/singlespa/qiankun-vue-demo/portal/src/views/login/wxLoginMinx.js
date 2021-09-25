/**
 * 微信扫码登录
 */
export default {
  data() {
    return {
      wx_redirect_uri: 'http://www.mogujie.com/oauth/callback/weixin/mogujie', //
      WXAPPID: 'wx4530e35e8a9fc5cd',   // 微信开发者id 
    }
  },
  methods: {
    wxLogin() {  // 微信扫码登录
      // 显示容器
      this.$refs['otherLogin'].showBox = true
      this.$nextTick(() => {
        // 修改微信二维码样式
        const content = `
          body { display: flex; align-items: center;justify-content: center;}
          .impowerBox .qrcode {width: 210px;}
          .impowerBox .title {display: none!important;}
          .impowerBox .info {width: 200px; color: #d9b77c!important}
          .impowerBox .status_browser p:last-child { display: none!important }
          .status_icon {display: none}
          .impowerBox .status {text-align: center;}
        `
        //记住一定要注明文件类型是css
        const blob = new Blob([content],{type: "text/css;charset=utf-8"})
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        const that = this
        reader.onload = function(e) {
          new WxLogin({
            self_redirect: false, //true将页面跳转放在ifream里面   false直接跳转到要跳转的页面
            id: "login_container",
            appid: that.WXAPPID,
            scope: "snsapi_login",
            redirect_uri: that.wx_redirect_uri, // 回调地址
            state: "WX_STATE",
            style: "black",
            href: e.currentTarget.result//data:text/css;charset=utf-8;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30uaW1wb3dlckJveCAudGl0bGUge2Rpc3BsYXk6IG5vbmU7fS5pbXBvd2VyQm94IC5pbmZvIHt3aWR0aDogMjAwcHg7fQ==
          })
        }
        // new WxLogin({
          // self_redirect: false,
          // id: "login_container", 
          // appid: this.WXAPPID, 
          // scope: "snsapi_login", 
          // redirect_uri: this.wx_redirect_uri,
          // state: "WX_STATE",
          // style: "black",
          // href: "data:text/css;base64,JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5JXVGRjAxLmltcG93ZXJCb3glMjAucXJjb2RlJTIwJTdCd2lkdGglM0ElMjAxNjBweCUzQiU3RCUwQS5pbXBvd2VyQm94JTIwLnRpdGxlJTIwJTdCZGlzcGxheSUzQSUyMG5vbmUlMjFpbXBvcnRhbnQlM0IlN0QlMEEuaW1wb3dlckJveCUyMC5pbmZvJTIwJTdCd2lkdGglM0ElMjAyMDBweCUzQiU3RCUwQS5zdGF0dXNfaWNvbiUyMCU3QmRpc3BsYXklM0ElMjBub25lJTdEJTBBLmltcG93ZXJCb3glMjAuc3RhdHVzJTIwJTdCdGV4dC1hbGlnbiUzQSUyMGNlbnRlciUzQiU3RCUyMA=="
        // })
      })
    }
  }
}