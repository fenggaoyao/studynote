import './componentPanel.less'

import utils from 'utils'
import ComponentList from 'components/platform/ComponentList/ComponentList'
import IconMenu from 'components/platform/ToolMenu/IconMenu'
import {Tabs, TabPane} from 'element-ui'
import api from 'api'

export default {
  components: {
    'el-tabs': Tabs,
    'el-tab-pane': TabPane
  },
  methods: {
    getMineWidget () {
      let me = this
      api.getWidgetList().then(result => {
        if (result.error_no == 0) {
          me.mineWidgets = result.result.widget_list.map(item => {
            return {
              image: item.widget_image,
              title: item.widget_name,
              name: item.widget_content.name,
              path: item.widget_content.path,
              componentData: item.widget_content
            }
          })
        }
      })
    },
    getMineComponent () {
      let me = this
      api.getComponentList().then(result => {
        if (result.error_no == 0) {
          me.mineComponents = result.result.component_list.map(item => {
            return {
              title: item.component_discription,
              name: item.component_name,
              path: item.component_path
            }
          })
        }
      })
    },
    commonTabClick (tab, event) {
      this.commonTab = tab.name
    },
    businessTabClick (tab, event) {
      this.businessTab = tab.name
    },
    mineTabClick (tab, event) {
      this.mineTab = tab.name
    }

  },

  data () {
    return {
      common: [
        {
          name: 'xp-image',
          title: '图片',
          path: 'common/Image/Image',
          icon: 'i-image'
        },
        {
          name: 'xp-text',
          title: '文字',
          path: 'common/Text/Text',
          icon: 'i-text'
        },
        {
          name: 'xp-block',
          title: '块',
          path: 'common/Block/Block',
          icon: 'i-block'
        },
        {
          name: 'xp-grid',
          title: '栅格',
          path: 'common/Grid/Grid',
          icon: 'i-grid'
        },
        {
          name: 'xp-tab',
          title: 'Tab',
          path: 'common/Tab/Tab',
          icon: 'i-tab'
        },
        {
          name: 'xp-iscroll',
          title: '滑动区',
          path: 'common/IScroll/IScroll',
          icon: 'i-iscroll'
        },
        {
          name: 'xp-button-group',
          title: '按钮组',
          path: 'common/ButtonGroup/ButtonGroup',
          icon: 'i-buttongroup'
        },
        {
          name: 'xp-qrcode',
          title: '二维码',
          path: 'common/Qrcode/Qrcode',
          icon: 'i-qrcode'
        },
        {
          name: 'xp-audio',
          title: '音频',
          path: 'common/Audio/Audio',
          icon: 'i-audio'
        }
      ],
      form: [
        {
          name: 'xp-input',
          title: '文本框',
          path: 'common/InputText/InputText'
        },
        {
          name: 'xp-text',
          title: '下拉列表',
          path: 'common/InputSelect/InputSelect'
        },
        {
          name: 'xp-upload',
          title: '图片上传',
          path: 'common/InputUpload/InputUpload'
        },
        {
          name: 'xp-commit',
          title: '提交',
          path: 'common/InputCommit/InputCommit'
        }
      ],
      commonBusiness: [
        {
          name: 'xp-share',
          title: '分享',
          path: 'business/Share/Share'
        },
        {
          name: 'xp-share-button',
          title: '分享按钮',
          path: 'business/ShareButton/ShareButton'
        }
      ],
      commonBusinessQA: [
        {
          name: 'xp-paper',
          title: '试卷',
          path: 'business/QA/Paper'
        },
        {
          name: 'xp-question',
          title: '问题',
          path: 'business/QA/Question'
        },
        {
          name: 'xp-question-image',
          title: '图片问题',
          path: 'business/QA/QuestionImage'
        },
        {
          name: 'xp-answer',
          title: '答案',
          path: 'business/QA/Answer'
        },
        {
          name: 'xp-tongzhishu',
          title: '录取通知书',
          path: 'business/QA/Tongzhishu'
        }
      ],
      pinzhiBusiness: [
        {
          name: 'xp-product-data-provider',
          title: '质享商品容器',
          path: 'upload/pinzhi/ProductDataProvider/ProductDataProvider'
        },
        {
          name: 'xp-product-card-1x1',
          title: '质享商品卡片1x1',
          path: 'upload/pinzhi/ProductCard1x1/ProductCard1x1'
        },
        {
          name: 'xp-product-card-1x1-big',
          title: '质享商品卡片1x1大图',
          path: 'upload/pinzhi/ProductCard1x1Big/ProductCard1x1Big'
        },
        {
          name: 'xp-product-card-1x2',
          title: '质享商品卡片1x2',
          path: 'upload/pinzhi/ProductCard1x2/ProductCard1x2'
        },
        {
          name: 'xp-shop-cart',
          title: '质享购物车',
          path: 'upload/pinzhi/ShopCart/ShopCart'
        },
        {
          name: 'xp-random-answer',
          title: '随机答案',
          path: 'upload/pinzhi/RandomAnswer/RandomAnswer'
        },
        {
          name: 'xp-zongji-game',
          title: '质享粽子游戏',
          path: 'upload/pinzhi/ZongziGame/ZongziGame'
        }
      ],
      zhinanBusiness: [
        {
          name: 'xp-article-data-provider',
          title: '指南文章容器',
          path: 'upload/zhinan/ArticleDataProvider/ArticleDataProvider'
        },
        {
          name: 'xp-article-card-1x1',
          title: '指南文章卡片1x1',
          path: 'upload/zhinan/ArticleCard1x1/ArticleCard1x1'
        },
        {
          name: 'xp-article-card-1x2',
          title: '指南文章卡片1x2',
          path: 'upload/zhinan/ArticleCard1x2/ArticleCard1x2'
        },
        {
          name: 'xp-cater-card-1x2',
          title: '指南餐饮卡片1x2',
          path: 'upload/zhinan/CaterCard1x2/CaterCard1x2'
        },
        {
          name: 'xp-valentines-day-location',
          title: '情人节定位',
          path: 'upload/zhinan/ValentinesDayLocation/ValentinesDayLocation'
        },
        {
          name: 'xp-april-activity-share',
          title: '4月活动-分享',
          path: 'upload/zhinan/AprilActivity/Share'
        },
        {
          name: 'xp-april-activity-provinces',
          title: '4月活动-省列表',
          path: 'upload/zhinan/AprilActivity/Provinces'
        }
      ],
      shopBusiness: [
        {
          name: 'xp-product-data-provider',
          title: '商超商品容器',
          path: 'upload/pinzhi/ProductDataProvider/ProductDataProvider'
        },
        {
          name: 'xp-product-card-1x1',
          title: '商超商品卡片1x1',
          path: 'upload/pinzhi/ProductCard1x1/ProductCard1x1'
        },
        {
          name: 'xp-product-card-1x2',
          title: '商超商品卡片1x2',
          path: 'upload/pinzhi/ProductCard1x2/ProductCard1x2'
        }
      ],
      mineComponents: [],
      mineWidgets: [],

      commonTab: 'commonComponent1',
      businessTab: 'commonComponent2',
      mineTab: 'mineComponent'
    }
  },

  created () {
    let me = this
    eventHub.$on('xp-widget-save', (data) => {
      let node = me.$root.curComData
      let newNode = {
        cid: 0,
        title: '',
        name: 'root',
        path: '/',
        props: {},
        children: [node]
      }
      api.addWidget({
        widget_name: node.title,
        widget_path: '/',
        widget_content: JSON.stringify(newNode),
        widget_doc: 'http://www.baidu.com',
        widget_image: '',
        widget_category: '1',
        widget_discription: '1',
        widget_is_public: '1',  // 1:共享0:不共享
        widget_is_common: '1'  // 1：通用0：不通用
      })
            .then(result => {
              if (result.error_no == 0) {
                api.snapShot(result.result.widget_id, 'widget').then(res => {
                  if (res.error_no == 0) {
                    api.updateWidget({
                      widget_id: result.result.widget_id,
                      widget_image: res.result.url
                    }).then(ires => {
                    })
                  } else {
                    utils.handleError(res, this)
                  }
                })
                me.getMineWidget()
              }
            })
    })

    eventHub.$on('xp-add-component', (data) => {
      me.getMineComponent()
    })

    me.getMineWidget()
    me.getMineComponent()
  },

  render (h) {
    return (
      <div class='componentPanel'>
        <div class='notice-area'>
          <IconMenu />
        </div>
        <div class='panel'>
          <el-tabs type='border-card' value={this.commonTab} on-tab-click={this.commonTabClick}>
            <el-tab-pane label='通用基础组件库' name='commonComponent1'>
              <ComponentList data={this.common} />
            </el-tab-pane>
            <el-tab-pane label='表单库' name='formComponent'>
              <ComponentList data={this.form} />
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class='panel'>
          <p>通用业务组件库</p>
          <el-tabs type='border-card' value={this.businessTab} on-tab-click={this.businessTabClick}>
            <el-tab-pane label='通用' name='commonComponent2'>
              <ComponentList data={this.commonBusiness} />
            </el-tab-pane>

            <el-tab-pane label='质享' name='pinzhiComponent'>
              <ComponentList data={this.pinzhiBusiness} />
            </el-tab-pane>

            <el-tab-pane label='指南' name='zhinanComponent'>
              <ComponentList data={this.zhinanBusiness} />
            </el-tab-pane>

            <el-tab-pane label='商超' name='cComponent'>
              <ComponentList data={this.shopBusiness} />
            </el-tab-pane>

            <el-tab-pane label='问答' name='qaComponent'>
              <ComponentList data={this.commonBusinessQA} />
            </el-tab-pane>

          </el-tabs>
        </div>

        <div class='panel'>
          <p>我的组件库</p>
          <el-tabs type='border-card' value={this.mineTab} on-tab-click={this.mineTabClick}>
            <el-tab-pane label='组件' name='mineComponent'>
              <ComponentList data={this.mineComponents} />
            </el-tab-pane>

            <el-tab-pane label='组合件' name='component'>
              <ComponentList data={this.mineWidgets} type='widget' />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    )
  },

  beforeDestroy () {
    eventHub.$off('xp-widget-save')
    eventHub.$off('xp-add-component')
  }

}
