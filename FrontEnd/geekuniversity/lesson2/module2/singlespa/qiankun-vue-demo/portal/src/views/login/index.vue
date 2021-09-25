<template>
  
  <div class="login-container">
    <div class="login-box">
      <div class="left">
        <div class="con">
          <p class="welcome">
            欢迎来到
            <svg-icon icon-class="welcome" color="#d9b77c"/>
          </p>
          <h1 class="name">中惠旅中台</h1>
        </div>
      </div>
      <div class="right">
        <el-form
          ref="loginForm"
          :model="loginForm"
          class="login-form"
          auto-complete="off"
          label-position="left"
        >
          <h1 class="sub_name">中惠旅中台</h1>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" color="#d9b77c"/>
            </span>
            <el-input
              v-model="loginForm.username"
              name="username"
              type="text"
              auto-complete="off"
              placeholder="请输入用户名"
            />
            <span class="virtual-border"></span>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" color="#d9b77c"/>
            </span>
            <el-input
              v-model="loginForm.password"
              :type="passwordType"
              name="password"
              auto-complete="off"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span class="virtual-border"></span>
            <span class="show-pwd" @click="showPwd">
              <svg-icon v-if="passwordType==='password'" icon-class="eye" color="#d9b77c"/>
              <svg-icon v-else icon-class="open_eye" color="#d9b77c"/>
            </span>
          </el-form-item>
          <el-form-item class="forget-pwd-btn">
            <el-button type="text" @click.stop="forgetPass">忘记密码？</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login-btn"
              @click.native.prevent="handleLogin"
            >登 录</el-button>
          </el-form-item>
        </el-form>
        <div class="login-new-line">
          <span>第三方登录</span>
        </div>
        <div class="login-in-way">
          <ul class="clearfix">
            <li class="in-way-dd" @click.stop="ddLogin">
              <div class="recommd">推荐</div>
              <div class="item">
                <i style="color: #1296DB" class="zht-icon-shejiaodingding"></i>
              </div>
              <span>钉钉登录</span>
            </li>
            <li class="in-way-wx" @click.stop="wxLogin">
              <div class="item">
                <i style="width: 24px; color: #23BF36" class="zht-icon-icon-weixin"></i>
              </div>
              <span>微信登录</span>
            </li>
            <li class="in-way-sj" @click.stop="sjLogin">
              <div class="item">
                <i style="width: 24px; color: #FF9100" class="zht-icon-icon-shouji"></i>
              </div>
              <span>手机登录</span>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
    <!-- 其他登录方式 容器 -->
    <other-login ref="otherLogin" />
    <!-- 手机登录方式 容器 -->
    <phone-login ref="phoneLogin" :redirect="redirect" />
  </div>
</template>

<script>
import OtherLogin from './otherLogin'
import PhoneLogin from './phoneLogin'
import ddLoginMinx from './ddLoginMinx'
import wxLoginMinx from './wxLoginMinx'
import sjLoginMinx from './sjLoginMinx'

export default {
  name: 'Login',
  components: { OtherLogin, PhoneLogin },
  mixins: [ddLoginMinx, wxLoginMinx, sjLoginMinx],
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    forgetPass() {
      console.log('忘记密码')
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
    },
    handleLogin() {
      if (this.loading) return  // 防止重复点击登录
      // 主动校验 避免 每次 在 输入框输入 就校验
      const { username, password } = this.loginForm
      this.loading = true
      if (!username.trim().length) {
        this.$message.error({
          message: '请输入用户名',
          duration: 1000
        })
        this.loading = false
        return false
      }
      if (password.length < 5 || password.length > 20) {
        this.$message.error({
          message: '请输入5-20位密码',
          duration: 1000
        })
        this.loading = false
        return false
      }
      // 登录
      this.$store.dispatch('login', this.loginForm).then(() => {
        this.loading = false
        this.$message.success({
          message: '登录成功',
          duration: 1000,
          onClose: () => {
            this.$router.push({ path: this.redirect || '/' })
          }
        })
      }).catch(err => {
        this.loading = false
        this.$message.error({
          message: err || '验证错误， 请重新登录',
          duration: 1500
        })
      })
    },
  }
}
</script>

<style lang="less" scoped>
@bg: #fff;
@dark_gray: #889aa4;
@light_color: #d9b77c;
@cursor: #fff;
@virtual_color: #be9966;
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
    &::first-line {
      color: @light_color;
    }
  }
}

.login-container {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: url(../../assets/images/slider-2.jpg) no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  .login-box {
    width: 60%;
    height: 400px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -200px;
    overflow: hidden;
    border-radius: 10px;
    .left {
      float: left;
      height: 100%;
      width: calc(100% - 400px);
      background: rgba(70, 79, 94, 0.8);
      position: relative;
      color: #be9966;
      &:before {
        content: ' ';
        background: url(../../assets/images/slider-2.jpg) center center;
        filter: blur(8px);
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin-top: -30px;
      }
      .con {
        position: relative;
        z-index: 7700;
        width: 80%;
        margin: 0 auto;
        top: 50%;
        transform: translate(0 , -50%);
      }
      .welcome {
        font-size: 20px;
        line-height: 40px;
        font-weight: bold;
        margin: 0;
        &:after {
          content: ' ';
          display: block;
          width: 100%;
          height: 1px;
          background: #be9966;
          border-radius: 1px;
        }
      }
      .name {
        font-size: 24px;
        margin: 0;
        line-height: 60px;
      }
    }
    .right {
      position: relative;
      z-index: 7800;
      float: left;
      width: 400px;
      height: 100%;
      background: #f3f5f7;
      .sub_name {
        display: none;
        text-align: center;
        color: #be9966;
        margin: 30px 0;
      }
    }





    .login-new-line {
      width: 100%;
      height: 1px;
      margin: 24px auto 0;
      background: linear-gradient(90deg, rgba(217,183,124, 0) 0%, rgba(217,183,124, 1) 50%, rgba(217,183,124, 0) 100%);
      position: relative;
      span {
        width: 120px;
        display: block;
        height: 20px;
        line-height: 20px;
        background: #f3f5f7;
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        font-size: 13px;
        font-weight: bold;
        color: @light_color;
        text-align: center;
        letter-spacing:1px;
      }
    }
    .login-in-way {
      display: flex;
      justify-content: center;
      margin: 40px auto 0;
      ul {
        width: 232px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        color: @light_color;
        font-weight: bold;
        width: 64px;
        float: left;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        &:nth-child(2) {
          margin: 0 20px;
        }
        .item {
          width: 40px;
          height: 40px;
          border: 1px solid #ccc;
          border-radius: 50%;
          box-sizing: border-box;
          text-align: center;
          margin: 0 auto 8px;
          i {
            line-height: 40px;
            font-size: 28px;
          }
        }
        &:hover {
          i {
            color: #f3f5f7!important;
          }
        }
        &.in-way-dd {
          position: relative;
          .recommd {
            font-size: 12px;
            font-weight: 400;
            color: #fff;
            line-height: 20px;
            position: absolute;
            top: -30px;
            left: 10px;
            width: 40px;
            height: 20px;
            background: #1296DB;
            border-radius: 10px;
            &::after {
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              border: 6px solid transparent;
              border-top-color: #1296DB;
              bottom: -12px;
              left: 15px;
            }
          }
          &:hover {
            .item {
              background: #1296DB;
              border-color: #1296DB!important;
            }
          }
        }
        &.in-way-wx:hover {
          .item {
            background: #23BF36;
            border-color: #23BF36!important;
          }
        }
        &.in-way-sj:hover {
          .item {
            background: #FF9100;
            border-color: #FF9100!important;
          }
        }
      }
    }
  }


  .login-form {
    padding: 40px 40px 0;
    box-sizing: border-box;
    /deep/ .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 13px;
        color: @light_color;
        height: 47px !important;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px @bg inset !important;
          -webkit-text-fill-color: @light_color !important;
        }
        &::placeholder {
          color: @light_color;
        }
      }
    }

    .el-form-item {
      .virtual-border {
        position: absolute;
        z-index: -1;
        top: -2px;
        height: 50px;
        left: 50%;
        transform: translate(-50%, 0);
        border-top:1px solid @virtual_color;
        border-bottom: 1px solid @virtual_color;
        width: 0;
      }
      &:hover {
        .virtual-border {
          animation: virtualBorder .3s both;
        }
        .svg-container svg {
          color: @virtual_color!important;
        }
        /deep/ input {
          color: @virtual_color;
          &::placeholder {
            color: @virtual_color
          }
        }
      }
      background: @bg;
      border-radius: 30px;
      color: @light_color;
      margin-bottom: 18px;
      button {
        font-size: 16px;
        border-radius: 30px;
        border: 0px;
        height: 52px;
      }
      &.forget-pwd-btn {
        // margin-top: -10px;
        transform: translate(0 , -20px);
        height: 20px;
        border: 0;
        text-align: right;
        margin-bottom: 0;
        background: transparent;
        button {
          height: 20px;
          background: transparent;
          color: @light_color;
        }
      }
    }
  }
  .svg-container {
    padding-left: 15px;
    color: @dark_gray;
    width: 30px;
    display: inline-block;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-btn {
    width: 100%;
    background: linear-gradient(to bottom right, #e4c384, #be9966);
    box-shadow: 0 0 10px #ccc;
    &:hover {
      background: linear-gradient(to top, #be9966, #e4c384);
    }
    &:active {
      background: linear-gradient(#be9966, #be9966);
    }
  }
}
@media screen and (max-width: 923px){
  .login-container .login-box {
    .name {
      width: 24px;
      margin: 0 auto!important;
      line-height: 30px!important;
    }
    .welcome {
      display: none;
    }
  }
}
@media screen and (max-width: 665px){
  .login-container .login-box {
    .right {
      width: 100%!important;
    }
  }
}
@media screen and (max-width: 665px){
  .login-container .login-box {
    .right {
      width: 100%!important;
    }
  }
}
@media screen and (max-width: 500px){
  .login-in-way .item {
    border: 1px solid #be9966!important;
  }
  .login-container .login-box {
    width: 100%;
    height: 100%;
    top: 0;
    margin-top: 0;
    border-radius: 0;
    .left{
      display: none;
    }
    .right {
      background: rgba(0,0,0,.65)!important;
    }
    .login-new-line span {
      background: transparent!important
    }
  }
  .login-form .el-form-item {
    margin-bottom: 32px!important;
  }
  .sub_name {
    display: block!important;
  }
}
@keyframes virtualBorder {
  0% {
    width: 0;
  }
  75% {
    width: 75%;
  }
  77% {
    width: 77%;
    border-radius: 0
  }
  78% {
    width: 78%;
    border-radius: 1px
  }
  79% {
    width: 79%;
    border-radius: 2px
  }
  80% {
    width: 80%;
    border-radius: 3px;
  }
  81% {
    width: 81%;
    border-radius: 4px;
  }
  82% {
    width: 82%;
    border-radius: 5px;
  }
  83% {
    width: 83%;
    border-radius: 6px;
  }
  84% {
    width: 84%;
    border-radius: 7px;
  }
  85% {
    width: 85%;
    border-radius: 8px;
  }
  86% {
    width: 86%;
    border-radius: 9px;
  }
  87% {
    width: 87%;
    border-radius: 10px;
  }
  88% {
    width: 88%;
    border-radius: 11px;
  }
  89% {
    width: 89%;
    border-radius: 12px;
  }
  90% {
    width: 90%;
    border-radius: 13px
  }
  92% {
    width: 92%;
    border-radius: 15px
  }
  95% {
    width: 95%;
    border-radius: 17px;
  }
  97% {
    width: 97%;
    border-radius: 19px
  }
  100% {
    border-radius: 22px;
    width: 100%;
    // border-left-color:  #be9966;
    // border-right-color:  #be9966;
  }
}
</style>
