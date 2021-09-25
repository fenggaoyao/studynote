<!-- 
** 表单组件
* inline 表单内联还是块 默认内联
-->
<template>
  <el-form
    v-if="formOpts"
    class="select-tools"
    :inline="typeof(formOpts.inline)==='boolean' && formOpts.inline === false?formOpts.inline:true"
    ref="form"
  >
    <template v-for="item of formOpts.form">
      <!-- 输入框 -->
      <el-form-item
        v-if="item.type==='text'"
        :label="item.label"
        :key="item.key"
      >
        <el-input clearable v-model="item.value" :placeholder="item.placeholder" />
      </el-form-item>
      <!-- 下拉框 -->
      <el-form-item
        v-else-if="item.type==='select'"
        :key="item.key"
        :label="item.label"
      >
        <el-select clearable v-model="item.value" :placeholder="item.placeholder">
          <el-option
            v-for="selectItem of item.list"
            :key="selectItem.value"
            :label="selectItem.label"
            :value="selectItem.value"
          />
        </el-select>
      </el-form-item>
      <!-- 日期选择框 -->
      <el-form-item v-else-if="item.type==='datePicker'" :key="item.key">
        <el-date-picker
          v-model="item.value"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
       
      <!-- 按钮 -->
      <el-form-item v-else-if="item.type === 'btn'" :key="item.label">
        <el-button
          :icon="item.icon"
          :type="item.color || 'primary'"
          @click="btnsClick(item.label, item.clear)"
        >
          {{item.label}}
        </el-button>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
export default {
  name: 'PortalSearchForm',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  props: {
    formOpts: {
      type: Object,
      default: null
    }
  },
  methods: {
    btnsClick(label, clear) {
      let queryPo
      if (clear) {
        let form = this.$parent.formOpts.form
        form.map(item => {
          item.value = ''
        })
      } else {
        queryPo = this.formatterQuery(this.formOpts.form)
      }
      this.$emit('btnsClick', label, queryPo)
    },
    formatterQuery(form) {
      form = [ ...form ]
      let queryPo = {}
      for (let item of form) {
        if (item.type !== 'btn' && item.type !== 'clearBtn') {
          queryPo[item.key] = item.value
        }
      }
      return queryPo
    }
  }
}
</script>

<style lang="less" scoped>
@inp-bg: rgba(#fff, 0.8);
.select-tools .el-date-editor.el-input {
  width: 184px !important;
}

.select-tools .cascader-multiple .el-input{
  width: 378px !important;
}
.select-tools {
  margin-bottom: 10px;
  > .tips{
    width: 103px;
    line-height: 32px;
    background: #f5f7fa;
    padding-left: 10px;
  }
  /deep/ .el-form-item {
    margin-bottom: 4px!important;
    .el-form-item__label {
      width: auto!important;
      padding: 0 6px;
    }
    .el-date-editor:not(.is-active) {
      background: @inp-bg;
      input {
        background: @inp-bg;
      }
    }
    .el-date-editor--daterange {
      border: 1px solid #ebebeb;
    }
    .el-input-number{
      width: 81px;
      .el-input {
        width: auto;
        .el-input__inner{
          padding: 0 35px 0 5px !important;
        }
      }
    }
    .el-select,
    .el-input {
      width: 184px;
      input {
        &:not(:focus) {
          border: 1px solid #ebebeb;
          background: @inp-bg;
        }
      }
    }
  }
  
}
</style>
