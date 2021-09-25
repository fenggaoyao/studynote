<template>
  <transition name="fade" mode="out-in">
    <div v-if="showBox" class="phone-login-box" @click.stop="handleClose">
      <div class="phone-box">
        <p class="title">手机登录</p>
        <el-form
          ref="phoneForm"
          :model="phoneForm"
          class="phone-form"
          auto-complete="off"
          label-position="left"
        >
          <el-form-item prop="phoneNum">
            <span class="svg-container">
              <svg-icon icon-class="phone" color="#d9b77c"/>
            </span>
            <el-input
              v-model="phoneForm.phoneNum"
              name="phoneNum"
              type="text"
              auto-complete="off"
              placeholder="请输入手机号"
            />
          </el-form-item>
          <el-form-item prop="code">
            <span class="svg-container">
              <svg-icon icon-class="code" color="#d9b77c"/>
            </span>
            <el-input
              v-model="phoneForm.code"
              name="code"
              type="text"
              auto-complete="off"
              placeholder="请输入短信验证码"
            />
            <el-button class="get-phone-code" @click.stop="getCode">{{time?`${time} s`: `获取验证码`}}</el-button>
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
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PhoneLogin',
  props: {
    redirect: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showBox: false,
      loading: false,
      phoneForm: {
        phoneNum: '',  // 手机号
        code: '',  // 手机验证码
      },
      timer: null,
      time: 0,
    }
  },
  methods: {
    // 获取短信验证码
    getCode() {
      if (this.time) return
      // 调取获取短信验证码接口
      this.time = 60
      this.timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          window.clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    handleClose(e) {
      if (e.target.className === 'phone-login-box') {
        this.showBox = false
        if (this.timer) {
          window.clearInterval(this.timer)
          this.timer = null
          this.time = 0
        }
      }
    },
    handleLogin() {
      if (this.loading) return  // 防止重复点击登录
      // 主动校验 避免 每次 在 输入框输入 就校验
      const { phoneNum, code } = this.phoneForm
      this.loading = true
      if (!phoneNum || !(/^1[3456789]\d{9}$/.test(phoneNum))) {
        this.$message.error({
          message: '请输入正确的手机号',
          duration: 1000
        })
        this.loading = false
        return false
      }
      if (!code) {
        this.$message.error({
          message: '请输入短信验证码',
          duration: 1000
        })
        this.loading = false
        return false
      }

      //  -------模拟
      this.$store.dispatch('login', { username: 'admin', password: 'admin' }).then(() => {
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
    }
  },
  beforeDestroy() {
    if (this.timer) {
      window.clearInterval(this.timer)
      this.timer = null
      this.time = 0
    }
  }
}
</script>

<style lang="less" scoped>
@bg: #fff;
@dark_gray: #889aa4;
@light_color: #d9b77c;
@cursor: #fff;
@virtual_color: #be9966;
.phone-login-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8000;
  background: rgba(0, 0, 0, .6);
  .phone-box {
    width: 400px;
    height: 400px;
    background: #f3f5f7;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -200px;
    .title {
      color: #be9966;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      line-height: 70px;
    }
  }
}
@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .phone-box .el-input input {
    color: @cursor;
    &::first-line {
      color: @light_color;
    }
  }
}
.phone-form {
  padding: 0 40px 0;
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
    position: relative;
    .get-phone-code {
      position: absolute;
      right: 0;
      top: 0;
      height: 47px;
    }
    &:hover {
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
  .svg-container {
    padding-left: 15px;
    color: @dark_gray;
    width: 30px;
    display: inline-block;
  }
}
@media screen and (max-width: 500px) {
  .phone-box {
    width: 100%!important
  }
}

</style>
