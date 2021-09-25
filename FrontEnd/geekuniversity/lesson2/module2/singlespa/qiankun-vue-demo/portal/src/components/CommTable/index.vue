
<!--
 * search 配置组件参数
 * table配置组件参数介绍：
 * props: {
 *    data 数据入参
 *    columns 配置
 *    childType  存在子列表的时候使用，该字段为子列表的字段名称，默认order, 多级子list传入数组
 *    query 需要分页时传入
 *    singleSelected 是否开启单选，默认false
 * }
 * columns: {
 *    label 表头显示名称
 *    width 宽度
 *    prop 字段名称，单字段传String,多字段传Array['a', 'b']
 *    separator 多字段实现分隔符，默认'/'，只在多字段生效
 *    fixed 定位
 *    type 'selection' checkbox选择框外部组件通过@multipleSelection获取选中值，'num' 用于改变数字字体
 *    pre 前缀
 *    suf 后缀
 *    index: true  索引，传入true时生效
 *    renderHeader(h, row, index) renderHeader函数
 *    render(h, row, index) render函数
 *    [
 *      {...}   子列表使用方式，内部配置同上
 *    ]
 * }
 -->
<template>
  <div class="table-box">
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
    <el-table
      v-loading="loading"
      :element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      ref="table"
      :key="key"
      :data="data"
      :highlight-current-row="singleSelected"
      :expand-row-keys="expandList"
      :row-key="row => row.id"
      :show-summary="showSummary"
      :summary-method="param => summaryMethod(getSummaries, param)"
      :row-class-name="rowClassName"
      stripe
      border
      style="width: 100%"
      @current-change="(currentRow, oldCurrentRow) => $emit('selected', currentRow, oldCurrentRow)"
      @selection-change="val => $emit('multipleSelection', val)"
      @sort-change="row => $emit('sort-change', row)"
    >
      <template
        v-for="({label, prop, className, width, fixed, type, pre = '', suf = '', separator = '/', dayjs: format , _renderHeader, _child, _childType, _render, index: _i, _multiHeadData, sort = []}, index) in tableRow"
      >
        <el-table-column
          v-if="_multiHeadData"
          :label="_multiHeadData.label"
          :key="index"
          class-name="muliti-header-th">
          <muliti-header :type="type" :data="_multiHeadData.children" :sort="sort"/>
        </el-table-column>
        <el-table-column
          v-else-if="showSummary"
          :key="index"
          :prop="prop"
          :label="label"
          :width="width"
          :fixed="fixed || false"
          :class-name="type === 'num' ? 'price-font': ''"
          align="center"
        >
          <template slot-scope="{row, $index}">
            <template v-if="_render">
              {{ createNode('_render_'+$index, _render(row, $index)) }}
              <slot :name="'_render_'+$index"/>
            </template>
            <template v-else-if="type === 'operation'">
              <slot :row="Object.assign({}, row, {$index})"/>
            </template>
            <template v-else>
              <div class="cell" style="text-align: center;">
                {{ `${pre}${row[prop]}${suf}` }}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="!_child && !type && !pre && !suf && !Array.isArray(prop) && prop !== 'operation' && type !== 'selection' && !format && !_renderHeader && !_render"
          :key="index"
          :prop="prop"
          :class-name="className"
          :label="label"
          :type="_i ? 'index' : ''"
          :width="width || 'auto'"
          :fixed="fixed || false"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <div class="child-list">
              <span :class="row[prop] ? '':'is-empty' ">{{ row[prop] || 'N/A' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="type === 'expand'"
          :type="type"
          :key="index"
          :label="label"
          :class-name="className"
          :width="width || 'auto'"
          :fixed="fixed || false"
          show-overflow-tooltip
        >
          <template slot-scope="{row, $index}">
            <template v-if="_render">
              {{ createNode('_render_'+$index, _render(row, $index)) }}
              <slot :name="'_render_'+$index"/>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="type === 'selection' && !_child"
          :key="index"
          :width="width || 55"
          :fixed="fixed || false"
          :type="type"
        />
        <el-table-column
          v-else-if="type === 'index'"
          :key="index"
          :label="label || false"
          :width="width || 55"
          :fixed="fixed || false"
          :type="type"
        />
        <el-table-column
          v-else
          :key="index"
          :label="label"
          :class-name="className"
          :width="width || 'auto'"
          :fixed="fixed || false"
        >
          <template slot="header" slot-scope="{row, $index}">
            {{ _renderHeader ? createNode('_render-header_'+$index, _renderHeader(row, $index)) : label }}
            <slot :name="'_render-header_'+$index"/>
          </template>
          <template slot-scope="{row, $index}">
            <template v-if="!_child">
              <template v-if="_render">
                {{ createNode('_render_'+$index, _render(row, $index)) }}
                <slot :name="'_render_'+$index"/>
              </template>
              <template v-else-if="Array.isArray(prop)">
                <span
                  v-for="(v, index) in prop"
                  :key="index"
                  :class="{'price-font': type === 'num'}"
                >{{ row[v] }}{{ index !== prop.length - 1 ? separator : '' }}</span>
              </template>
              <template v-else-if="type === 'operation'">
                <slot :row="Object.assign({}, row, {$index})"/>
              </template>
              <template v-else-if="type === 'num'">
                <span class="price-font">{{ pre }}{{ row[prop] || 0 }}{{ suf }}</span>
              </template>
              <template v-else-if="format">
                <span>{{ dayjs(row[prop]).format(format) }}</span>
              </template>
              <template v-else>
                <span>{{ pre }}{{ row[prop] }}{{ suf }}</span>
              </template>
            </template>
            <template v-else>
              <el-checkbox-group v-model="childCheckList[$index]" style="font-size: 14px;" @change="i => handleChildChanged(i, $index)">
                <div
                  v-for="(child, index) in getList(row, _childType)"
                  :key="child.id"
                  :style="{height: child.rowNum * 33 + 'px', lineHeight: child.rowNum * 33 + 'px'}"
                  class="child-list"
                >
                  <template v-if="_render">
                    {{ createNode('_render_'+index, _render(child, index)) }}
                    <slot :name="'_render_'+index"/>
                  </template>
                  <template v-else-if="type === 'selection'">
                    <el-checkbox :label="child">{{ null }}</el-checkbox>
                  </template>
                  <template v-else-if="type === 'operation'">
                    <slot :row="child"/>
                  </template>
                  <template v-else-if="format">
                    <div>{{ dayjs(child[prop]).format(format) }}</div>
                  </template>
                  <template v-else-if="Array.isArray(prop)">
                    <div :title="setTitle(child, prop)">
                      <span
                        v-for="(v, index) in prop"
                        :key="index"
                        :class="{'price-font': type === 'num'}"
                      >{{ child[v] }}{{ index !== prop.length - 1 ? separator : '' }}</span>
                    </div>
                  </template>
                  <span v-else-if="whetherEmpty(child[prop])" class="is-empty">N/A</span>
                  <template v-else-if="type">
                    <div class="price-font">{{ pre }}{{ child[prop] }}{{ suf }}</div>
                  </template>
                  <template v-else>
                    <div :title="child[prop]">{{ child[prop] }}</div>
                  </template>
                </div>
              </el-checkbox-group>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-box-footer">
      <slot name="footer"/>
    </div>
    <el-pagination
      v-if="query.pageSize"
      :total="query.total"
      :current-page="query.pageNum"
      :page-size="query.pageSize"
      :layout="query.pageLayout || 'slot, total, sizes, prev, pager, next, jumper'"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import MulitiHeader from './MulitiHeader'
import { deepClone } from '@/utils'
import dayjs from 'dayjs'
export default {
  name: 'PortalCommTable',
  components: {
    MulitiHeader
  },
  filters: {
    formatNum(val) {
      const num = val && val.match(/\d+/g)
      if (!Array.isArray(num)) return val
      num.forEach(v => {
        const n = String(v)
        val = val.replace(v, n.toLocaleString())
      })
      return val
    }
  },
  props: {
    formOpts: {
      type: Object,
      default: null
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    childType: {
      type: [String, Array],
      default: 'order'
    },
    loading: {
      type: Boolean | String,
      default: false
    },
    query: {
      type: Object,
      default: null
    }, 
    singleSelected: {
      type: Boolean,
      default: false
    },
    expandList: {
      type: Array,
      default: () => []
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    summaryMethod: {
      type: Function,
      default: (fn, param) => fn(param)
    },
    summaryData: {
      type: Object,
      default: () => null
    },
    rowClassName: {
      type: Function,
      default: () => {}
    }
  },
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
      },
      key: 1,
      tableRow: [],
      childCheckList: [] // 子child checkbox
    }
  },
  computed: {
    setTitle(data, field) {
      return (data, field) => {
        let str = ''
        // eslint-disable-next-line no-return-assign
        field.forEach(f => str += data[f] + '/')
        return str.substr(0, str.length - 1)
      }
    },
    // 解决单项数据流修改报错问题
    
  },
  watch: {
    columns: {
      deep: true,
      immediate: true,
      handler() {
        this.tableRow = [...this.columns]
        this.hasChildren(this.tableRow)
        this.tableRow.forEach((item, index) => {
          if (item.renderHeader && typeof item.renderHeader === 'function') {
            item._renderHeader = (row, index) => item.renderHeader(this.$createElement, row, index)
          }
          if (item.render && typeof item.render === 'function') {
            item._render = (row, index) => item.render(this.$createElement, row, index)
          }
          if (item.header) {
            item._multiHeadData = this.multiHeade(JSON.parse(JSON.stringify(item.header)))
          }
        })
        this.key = this.key + 1
      }
    },
    data: {
      deep: true,
      handler() {
        this.data.forEach(() => {
          this.childCheckList.push([])
        })
      }
    },
  },
  methods: {
    dayjs,
    createNode(key, vnode) {
      this.$slots[key] = vnode
    },
    // setCurrentRow(row) {
      // console.log(row)
      // this.$refs.table.setCurrentRow(row)
    // },
    handleChildChanged(list, index) {
      this.$emit('childMultipleSelection', list, index)
    },
    hasChildren(list, i = 1) {
      list.forEach((item, index) => {
        if (Array.isArray(item)) {
          item.forEach((v, ind) => {
            if (Array.isArray(v)) {
              this.hasChildren(item, ++i)
            } else {
              v._child = i
              if (Array.isArray(this.childType)) {
                v._childType = this.childType.slice(0, i)
              } else {
                v._childType = [this.childType]
              }
            }
          })
          list.splice(index, 1, ...item)
        }
      })
    },
    whetherEmpty(prop) {
      return prop === null || prop === ''
    },
    getList(data, type = []) {
      const t = deepClone(type)
      if (!Array.isArray(t)) return
      if (t.length === 1) {
        if (Array.isArray(data)) {
          return [].concat(...data.map(item => item[t]))
        }
        return data[t]
      } else {
        const list = data[t.splice(0, 1)]
        list.forEach(item => {
          this.$set(item, 'rowNum', item.children.length)
        })
        return this.getList(list, t)
      }
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (this.summaryData && column.property) {
          sums[index] = this.summaryData[column.property].toLocaleString()
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            return isNaN(value) ? prev : prev + curr
          }, 0)
          sums[index] = (this.columns[index].pre ? this.columns[index].pre : '') + sums[index].toLocaleString()
        } else {
          sums[index] = ' '
        }
      })
      return sums
    },
    multiHeade(data) {
      const res = { children: [] }
      for (const [label, child] of Object.entries(data)) {
        res.label = label
        let i = 0
        for (const key in child) {
          const value = child[key]
          i++
          if (Object.prototype.toString.call(value) === '[object Object]') {
            const c = this.multiHeade({ [key]: value })
            c.id = i
            res.children.push(c)
          } else {
            const [field = value, formatter] = Array.isArray(value) ? value : []
            res.children.push({
              id: i,
              label: key,
              prop: field,
              formatter
            })
          }
        }
      }
      return res
    },
    handleCurrentChange(val, param = { fn: 'fetchData', query: 'query'}) {
      let that
      if (this.fetchData) {
        that = this
      } else if (this.$parent && this.$parent.fetchData) {
        that = this.$parent
      }
      const { fn, query } = param
      that[query].pageNum = val
      that[fn] && that[fn]()
    },
    handleSizeChange(val, param = { fn: 'fetchData', query: 'query'}) {
      let that
      if (this.fetchData) {
        that = this
      } else if (this.$parent && this.$parent.fetchData) {
        that = this.$parent
      }
      const { fn, query } = param
      that[query].pageSize = val
      that[fn] && that[fn]()
    },
    // search 相关方法
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

<style lang="less">
.table-box {
  .price-font {
    font-size: 16px;
  }
}
</style>
<style lang="less" scoped>
.table-box {
  .el-pagination {
    &:first-of-type {
      margin-top: 0;
    }
    .price-font {
      padding-right: 15px;
    }
  }
  > div {
    .child-list {
      height: 33px;
      line-height: 33px;
      position: relative;
      .is-empty {
        font-size: 12px;
      }
      > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:not(:last-child)::before {
        content: "";
        position: absolute;
        left: -10px;
        bottom: -1px;
        width: calc(100% + 20px);
        height: 1px;
        background: #eee;
      }
    }
  }
  &-footer {
    margin-top: 13px;
  }
  &-title {
    &-left {
      display: flex;
      align-items: flex-start;
      .tit {
        text-align: center;
      }
    }
    &-right {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    .tit {
      margin: 0 10px 10px 0;
      padding: 0 10px;
      line-height: 33px;
      background: #eaeaea;
      border-radius: 3px;
      display: flex;
      align-items: center;
      > span:first-child {
        color: #707070;
        &:not(:only-of-type) {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
