<template>
    <div class="compo-tongzhishu" :style="cssText">
      <img :src="background"/>
      <div class="name">{{text}}</div>
      <div class="btn-area">
        <div class="btn btn-top" @click="doShare"><p>分享通知书</p></div>
        <div class="btn" @click="gotoPaper"><p>再答一遍</p></div>
      </div>
      <div v-if="showMask" class="weixin-layer" @click="hideMask">
          <img src="https://img.waimai.baidu.com/pb/d053b821777fc065fbf873be335e2346fb@f_png,q_80"/>
      </div>
    </div>
</template>

<script>
import Utils from 'utils'

const config = [
    {
        name: 'background',
        title: '背景图片',
        type: String,
        default: '',
        require: true,
        component: 'InputUpload'
    },
    {
        name: 'paramName',
        title: '参数名称',
        type: String,
        default: 'uname',
        require: true,
        component: 'InputText'
    }
];

export default {
    name: 'xp-urlParam',
    components: {
    },
    props: Utils.toProps(config),
    data() {
      return {
        text: Utils.getQueryString(this.paramName),
        showMask: false
      };
    },
    computed: {
      cssText(){
          let style =  {
              "color": this.color, 
              "font-size": this.fontSize + 'px',
          };
          return style;
      }
    },
    methods: {
      doShare() {
          if(this.isWeixin()){
              this.showMask = true;
          }
          eventHub.$emit('share', location.href);
          this.newSak({
              daSrc: 'share.click',
              daAct: 'click',
          });
      },

      gotoPaper() {
          this.newSak({
              daSrc: 'redo.click',
              daAct: 'click',
          });
          this.changePage('https://waimai.baidu.com/static/h5/index.html?modelId=14966565608&t=1496766193618')
      },
      hideMask() {
          this.showMask = false;
      }
    },
    mounted() {
        if(this.isWeixin()){
            setTimeout(()=>{
                eventHub.$emit('share', location.href);
            }, 1000)
        }
    }
}
</script>

<style lang="less-loader">

.compo-tongzhishu{
  position: relative;

  img{
    width: 100%;
  }

  .name{
    position: absolute;
    top: 3.96rem;
    left: 1.3rem;
    color: #000;
    font-weight: bolder;
    font-size: 0.3rem;
  }

  .btn-area{
    position: absolute;
    right: 1.2rem;
    bottom: 1rem;

    .btn{
        width: 2.4rem;
        border:1px solid #444;
        padding: 1px;
        cursor: pointer;

        p{
            border:1px solid #444;
            text-align: center;
            color: #323232;
            font-weight: bolder;
            font-size: 0.3rem;
            padding: 0.1rem;
        }
    }
    .btn-top{
        margin-bottom: 10px;
    }
  }

  .weixin-layer{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: right;
    background-color: rgba(0,0,0, 0.8);

    img{
        width: 94%;
    }
  }

}

</style>

