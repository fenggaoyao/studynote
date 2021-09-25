import './propertyPanel.less'

import Vue from 'vue'
import PageBodyProperty from 'components/common/PageBody/PageBodyProperty'
import api from 'api'
import Panel from 'components/common/Panel/Panel'
import Animation from './Animation'
import {Tabs, TabPane, Message} from 'element-ui'

const iconCopy = require('../../../images/icon-copy.svg')
const iconDelete = require('../../../images/icon-delete.svg')
const iconSave = require('../../../images/icon-save.svg')

export default {
  name: 'xp-property-panel',
  components: {
    XpPageBodyProperty: PageBodyProperty,
    Panel: Panel,
    'xp-animation': Animation,
    'el-tabs': Tabs,
    'el-tab-pane': TabPane
  },

  data () {
    return {
      componentsData: [],
      animateData: [],
      activeTab: 'model',
      modelName: '',
      title: ''
    }
  },

  created () {
    let me = this
    eventHub.$on('show-component-property', function (mod) {
      me.componentsData = []
      Vue.nextTick(() => {
        let clas = require('../../' + mod.path + 'Property')
        if (clas.default) {
          clas = clas.default
        }
        Vue.component(clas.name, clas)
        me.componentsData = [{
          cid: mod.cid,
          title: mod.title,
          name: clas.name,
          path: mod.path,
          module: clas,
          props: mod.props
        }]
        me.animateData = [{
          cid: mod.cid,
          title: mod.title,
          name: Animation.name,
          path: '',
          module: Animation,
          props: {
            cid: mod.cid,
            animate: mod.props.animation
          }
        }]
        me.title = mod.title
      })
      me.activeTab = 'component'
    })

    eventHub.$on('show-body-property', function (mod) {
      me.componentsData = [{
        cid: 0,
        title: mod.title,
        name: PageBodyProperty.name,
        path: '',
        module: PageBodyProperty,
        props: mod.props
      }]
      me.animateData = [{
        cid: 0,
        title: mod.title,
        name: Animation.name,
        path: '',
        module: Animation,
        props: {
          cid: 0,
          animate: mod.props.animation
        }
      }]
      me.title = mod.title
      me.activeTab = 'component'
    })

    eventHub.$on('show-model-property', function (modName) {
      me.modelName = modName
    })
  },

  render (h) {
    let me = this
    return (
      <div class='property-panel'>
        <el-tabs type='border-card' on-tab-click={this.tabClick} active-name={this.activeTab}>
          <el-tab-pane label='模版属性' name='model' class='tab-body'>
            <div class='model-property'>
              <div class='line-item'>
                <span class='label'>模版名称</span>
                <input class='input-item' type='text' placeholder='请输入模版名称' value={this.modelName} on-change={this.valueChange} />
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label='组件属性' name='component'>
            {me.componentsData.length
                            ? <div class='propertyPanel'>
                              <div class='component-tool'>
                                <a on-click={this.compoCopy}><img src={iconCopy} />复制</a>
                                <a on-click={this.compoRemove}><img src={iconDelete} />移除</a>
                                <a on-click={this.compoSave}><img src={iconSave} />保存为组合件</a>
                              </div>
                              <div class='line-item'>
                                <span class='label'>组件名称</span>
                                <input class='input-item' type='text' placeholder='请输入组件名称' value={this.title} on-change={this.titleChange} />
                              </div>
                              <div class='split' />
                              {
                                    this.componentsData.map(function (item) {
                                      return (
                                            h(item.name, {attrs: {'cid': item.cid}, props: item.props}, me.$slots.default)
                                      )
                                    })
                                }
                            </div>

                            : <div class='propertyPanel'>
                                未选中组件
                            </div>
                        }
          </el-tab-pane>

          <el-tab-pane label='动画属性' name='animation'>
            {
                            this.animateData.map(function (item) {
                              return (
                                    h(item.name, {attrs: {'cid': item.cid}, props: item.props}, me.$slots.default)
                              )
                            })
                        }
          </el-tab-pane>
        </el-tabs>
      </div>
    )
  },

  methods: {
    tabClick (e) {
      this.activeTab = e.name
    },

    valueChange (e) {
      let tar = e.target
      if (!tar.value) {
        Message({
          message: '名称不能为空',
          type: 'warning'
        })
        return
      }
      api.updateModel({
        model_id: this.$root.modelId,
        model_name: tar.value
      }).then(result => {
        Message({
          message: '更新成功',
          type: 'warning'
        })
      })
    },

    titleChange (e) {
      let v = e.target.value
      if (v.trim()) {
        eventHub.$emit('xp-com-rename', v.trim())
      }
    },

    compoCopy (e) {
      eventHub.$emit('xp-com-copy')
    },

    compoRemove () {
      eventHub.$emit('xp-com-delete')
    },

    compoSave () {
      eventHub.$emit('xp-widget-save')
    }
  },

  beforeDestroy () {
    eventHub.$off('show-property')
    eventHub.$off('show-body-property')
    eventHub.$off('show-model-property')
  }

}
