<template>
  <transition name="fade" mode="out-in">
    <div v-if="showBox" class="other_login_wrap" @click.stop="handleClose">
      <div class="other_login_box">
        <!-- 登录方式容器 -->
        <div id="login_container"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "OtherLogin",
  data() {
    return {
      showBox: false
    }
  },
  methods: {
    handleClose(e) {
      if (e.target.className === 'other_login_wrap') {
        this.showBox = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.other_login_wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .6);
  z-index: 9999;
  .other_login_box {
    position: relative;
    top: 50%;
    width: 400px;
    // height: 300px;
    margin: -200px auto 0;
    border-radius: 10px;
    // background: #f3f5f7;
    background: rgba(243,245,247, .6);
    // box-shadow: 0px 0px 20px 1px #ccc;
    #login_container {
      width: 100%;
      height: 400px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
@media screen and (max-width: 500px){
  .other_login_box {
    width: 100%!important;
  }
}
</style>
