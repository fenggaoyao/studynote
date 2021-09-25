<template>
  <div class="user-settings">
    <div>
      <h3>主题设置</h3>
      <div class="theme-picker flex between">
        <h5>
          主题色
          <sup class="act-color">beta</sup>
        </h5>
        <theme-picker/>
      </div>
      <el-collapse v-model="collapseNames" accordion>
        <el-collapse-item title="界面皮肤" name="theme">
          <div class="change-theme">
            <theme/>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse v-model="L2DNames" accordion>
        <el-collapse-item title="模型角色" name="L2D">
          <div class="change-theme">
            <live2d />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    
    <div class="update-time">{{ userInfo.systemUpdateTime }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Theme from './Theme'
import ThemePicker from './ThemePicker'
import Live2d from './Live2d'
export default {
  components: {
    Theme,
    ThemePicker,
    Live2d
  },
  data() {
    return {
      collapseNames: 'roles',
      L2DNames: 'false'
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  }
}
</script>

<style lang="less">
.user-settings {
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  h5 {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .update-time{
    bottom: 10px;
    color: #ababab;
    font-size: 12px;
    text-align: center;
  }
  .theme-picker {
    margin-top: 23px;
    align-items: center;
    > div:last-child {
      margin-top: 0;
      height: 28px;
    }
    h5 {
      margin: 0;
    }
    sup {
      color: #444;
      font-weight: 100;
    }
  }
  .fast-nav {
    display: flex;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    h5 {
      margin: 0;
    }
  }
  .el-collapse {
    border: 0 !important;
    .el-collapse-item__header {
      font-weight: bold;
      font-size: 14px;
      color: #000;
      height: 30px;
      line-height: 30px;
      border: 0;
      i {
        line-height: 30px;
      }
    }
    .el-collapse-item__wrap {
      border: 0;
    }
    .el-collapse-item__content {
      padding: 10px 0;
    }
  }
  .change-theme {
    .el-scrollbar {
      height: calc(100vh - 215px);
    }
  }
  .el-radio-group {
    display: block !important;
    .el-radio-button {
      display: block;
      margin-bottom: 5px;
      &:focus:not(.is-focus):not(:active) {
        box-shadow: none;
      }
      .el-radio-button__inner {
        display: block;
        border: 1px solid #ddd;
        border-radius: 5px !important;
        padding: 5px;
        p {
          margin: 0;
          line-height: 16px;
          text-align: left;
        }
      }
      &.is-active {
        .el-radio-button__inner {
          border-color: transparent;
          box-shadow: none;
        }
      }
    }
  }
}
</style>
