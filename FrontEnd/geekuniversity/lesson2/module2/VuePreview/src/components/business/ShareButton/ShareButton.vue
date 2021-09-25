<template>
  <div class="compo-share-button" :style="cssText" @click="doShare">
    <img :src="imgSrc">
  </div>
</template>

<script>
import Utils from 'utils'

const config = [
  {
    name: 'imgSrc',
    title: '图片地址',
    type: String,
    default: '',
    require: true,
    component: 'InputUpload'
  },
  {
    name: 'shareUrl',
    title: '分享地址',
    type: String,
    default: '',
    require: false,
    component: 'InputText'
  },
  {
    name: 'width',
    title: '宽度',
    type: Number,
    require: false,
    component: 'InputNumber'
  },
  {
    name: 'height',
    title: '高度',
    type: Number,
    default: 0,
    require: false,
    component: 'InputNumber'
  },
  {
    name: 'margin',
    title: '外边距',
    type: String,
    default: '',
    require: false,
    component: 'InputLRTB'
  }
];

export default {
  name: 'xp-share-button',
  props: Utils.toProps(config),
  methods: {
    doShare() {
      let me = this;
      let si = window._global_share || {};
      let url = 'http://waimai.baidu.com/static/h5/index.html?modelId=' + Utils.getQueryString('modelId');
      if (window.WMApp) {
        let params = {};
        let pinfo = {
          'imageUrl': si.image,          // 图片
          'title': si.title,             // 分享标题
          'description': si.description, // 分享描述
          'linkUrl': this.shareUrl || url, // 链接
          'shareType': 0 // 0表示链接分享
        };
        //"微信朋友圈":
        params.WXTimelineShare = Object.assign(pinfo, {
          linkUrl: url + '&from=weixin'
        });
        //"微信好友":
        params.WXSessionShare = pinfo;
        //"复制链接":
        params.TextCopyShare = pinfo;
        //"微博":
        params.WeiboShare = pinfo;
        //"QQ空间":
        params.QQZoneShare = pinfo;
        //"QQ好友":
        params.QQSessionShare = pinfo;
        window.WMApp.share.universalShare(params);

      } else if (window.BNJS) {
        let pfs = [];
        //"微信朋友圈":
        pfs.push('weixin_timeline');
        //"微信好友":
        pfs.push('weixin_session');
        //"复制链接":
        pfs.push('copylink');
        //"微博":
        pfs.push('sinaweibo');
        //"QQ空间":
        pfs.push('qq_zone');
        //"QQ好友":
        pfs.push('qq_friend');
        window.BNJS.ui.share({
          title: me.title,
          content: me.description,
          imgUrl: me.image,
          platforms: pfs,
          url: shareUrl || url,
          onSuccess: function() {
          },
          onFail: function() {
          }
        });
      } else if (me.isWeixin()) {
        this.weixinShare()
      }
    },

    weixinShare() {
      let mask = document.createElement('div')
      mask.className = 'weixin-layer'
      let img = document.createElement('img')
      img.src = 'https://img.waimai.baidu.com/pb/5f13d0636f0fe6f47b15c69f2375ab9946@f_png,q_80'
      mask.appendChild(img)

      mask.addEventListener('click', (e) => {
        document.body.removeChild(mask);
      })
      document.body.appendChild(mask);
    }

  },

  computed: {
    cssText() {
      return Utils.toCSS(this);
    }
  }

}
</script>

<style lang="less-loader">
.compo-share-button {
  img {
    width: 100%;
  }
}

.weixin-layer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: right;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  img{
    width: 80%;
  }
}
</style>