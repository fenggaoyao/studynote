<template>
  <div class="apply-box">
    <portal-search-form
      :formOpts="formOpts"
      @btnsClick="btnsClick"
    />
    
    <portal-comm-table
      :loading="loading"
      :data="dataList"
      :columns="columns"
      :query="query"
      @multipleSelection="multipleSelection"
      :rowClassName="rowClassName"
    >
      <template slot-scope="{row}">
        <slot :id="row.id">
          <el-button
            type="text"
            @click="goInfo(row)"
          >查看</el-button>
        </slot>
      </template>
    </portal-comm-table>
  </div>
</template>

<script>
export default {
  name: 'ApplyList',
  data() {
    return {
      loading: false,
      query: {
        pageSize: 30,
        pageNum: 1,
        total: 12,
        queryPo: {

        }
      },
      columns: [
        // 展开行示列
        {
          type: 'expand',
          render: (h, row, index) => {
            return h('span', {
              props: {
                // type: 'haha'
              },
              on: {
                click: () => console.log(this)
              }
            }, row.address)
          }
        },
        // 多选事件
        { 
          type: 'selection'
        },
        
        {
          label: '学员姓名',
          width: 150,
          render: (h, row) => {
            return h('el-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => alert(`点击了${row.name}`)
              }
            }, row.name)
          }
        },
        // 多表头应用
        {  
          header: {
            多表头应用: {
              二级表头: { 学院编号: 'no' },
              了解方式: 'knownChannleLabel',
              // 地址: 'address',
              地址: ['address', (row, column, cellValue, index) => column.address]
            }
          }
        },
        { 
          label: '空数据显示', prop: 'attendClassNumber'
        },
        { label: '性别', prop: 'sex', width: 60 },
        { label: '出生日期', prop: 'birthday', width: 120, dayjs: 'YYYY-MM-DD' },
        { label: '就读年级', prop: 'gradelable', width: 100 },
        { label: '就读学校', prop: 'oldAttendClassName' },
        { label: '联系电话', prop: 'mobile', width: 130 },
        { label: '所属校区', prop: 'campusName', width: 160 },
        { label: '操作人', prop: 'courseCounselorName', width: 100 },
        { label: '已结课/在读/已支付/总数', prop: ['inSession', 'beReading', 'paid', 'sum'], width: 175, type: 'num' },
        { label: '操作', type: 'operation', fixed: 'right', width: 100 }
      ],
      dataList: [],
      formOpts: {
        // inline: tru
        form: [
          { type: 'text', key: 'username', value: '', label: '输入框', placeholder: '姓名'},
          {
            type: 'select',
            key: 'region',
            value: '',
            label: '下拉框',
            placeholder: '请输入活动区域',
            list: [
              { value: 1, label: '上海' },
              { value: 2, label: '北京' },
            ]
          },
          {
            type: 'datePicker',
            key: 'date',
            value: ''
          },
          {
            type: 'btn',
            icon: 'el-icon-search',
            label: '查询'
          },
          {
            type: 'btn',
            icon: 'el-icon-plus',
            label: '新增'
          },
          {
            type: 'btn',
            icon: 'el-icon-refresh',
            label: '清空查询条件',
            clear: true
          }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  activated() {
    this.fetchData()
  },
  methods: {
    // 控制行的类名
    rowClassName(row) {
      let res = []
      if (!row.row.address) {  // 控制展开行内是否有内容 是否显示
        res.push('row-expand-cover')
      }
      return res.join(' ')
    },
    multipleSelection(e) {
      console.log('多选信息',e)
    },
    goInfo(row) {
      this.$router.push({ path: `/foreground/apply/student/${row.id}/classQuery` })
    },
    btnsClick(label, queryPo) {
      if (label === '查询') {
        console.log(queryPo)
        this.query.queryPo = { ...this.query.queryPo, ...queryPo }
        this.query.pageNum = 1
        this.fetchData()
      } else if (label === '清空查询条件') {
        this.query.queryPo = { }
        this.fetchData()
      } else if (label === '新增') {
        alert('新增')
      }
    },
    fetchData() {
      // 请求数据接口.....
      const list = [{
        address: '不知道',
        attendClassNumber: null,
        beReading: 1,
        birthday: '2008-08-05T16:00:00.000+0000',
        campusName: 'xxx',
        courseCounselorName: '张静',
        gradelable: '五年级',
        id: 'asdasdasdsad',
        inSession: 0,
        knownChannleLabel: '朋友介绍',
        mobile: '123',
        name: '哈哈哈',
        no: '123',
        oldAttendClassName: '小学',
        sum: 3,
        whetherBoy: true
      },{
        address: '',
        attendClassNumber: null,
        beReading: 1,
        birthday: '2008-08-05T16:00:00.000+0000',
        campusName: 'xxx',
        courseCounselorName: '张静',
        gradelable: '五年级',
        id: 'asdasdasdsad1',
        inSession: 0,
        knownChannleLabel: '朋友介绍',
        mobile: '123',
        name: '哈哈哈',
        no: '123',
        oldAttendClassName: '小学',
        sum: 3,
        whetherBoy: true
      },]
      //  模拟请求
      this.loading = '加载中...'
      setTimeout(() => {
        this.dataList = list.map(item => {
          item.sex = item.whetherBoy ? '男' : '女'
          return item
        })
        this.loading = false
      }, 800)
      
    }
  }
}
</script>

<style lang="less" scoped>
.apply-box {
  .price-font {
    font-size: 16px;
  }
}
</style>
