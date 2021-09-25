import './edit.less'

import Vue from 'vue'
import utils from 'utils'
import ComponentPanel from 'components/platform/ComponentPanel/ComponentPanel'
import EditorPanel from 'components/platform/EditorPanel/EditorPanel'
import PropertyPanel from 'components/platform/PropertyPanel/PropertyPanel'
import ToolMenu from 'components/platform/ToolMenu/ToolMenu'
import api from 'api'

export default {
  created () {
    let me = this
    let mid = utils.getQueryString('modelId')
    this.$root.modelId = mid

    api.getModel(mid).then(result => {
      if (result.result.model_detail) {
        let content = result.result.model_detail
        if (content) {
          me.pageData = content
        }
        me.hideLoading()
      }
    })

    eventHub.$on('publish-page', function (mod) {
      this.showLoading = true
    })
  },

  data () {
    return {
      showLoading: false,
      role: 'manager',
      username: 'admin',
      pageData: {}
    }
  },

  methods: {
    showLeft () {
      this.$refs.leftScreen.style.flex = '0 0 300px'
    },
    hideLeft () {
      this.$refs.leftScreen.style.flex = '0 0 0'
    }
  },

  render (h) {
    return (
      <div class='edit-page'>
        <div class='header'>
          <a class='back-menu' href='#/'>
            <span class='logo'>
              <img src='/static/images/deer.svg' />
            </span>
          </a>
          <div class='tools-menu'>
            <ToolMenu />
          </div>
        </div>
        <div class='fulll-screen' ref='fs'>
          <div class='left-screen' ref='leftScreen'>
            <ComponentPanel />
          </div>
          <div class='center-screen'>
            <EditorPanel modelData={this.pageData} />
          </div>
          <div class='right-screen'>
            <PropertyPanel />
          </div>
          <div class='view-tool' >
            <span>视图：</span>
            <span class='three-colum' on-click={this.showLeft}><i /><i /><i /></span>
            <span class='two-colum' on-click={this.hideLeft}><i /><i /></span>
          </div>
        </div>
      </div>
    )
  },

  mounted () {
    this.$refs.fs.style.height = window.innerHeight - 70 + 'px'
  }
}
