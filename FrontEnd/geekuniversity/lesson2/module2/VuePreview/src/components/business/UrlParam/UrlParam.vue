<template>
    <div class="compo-urlParam" :style="cssText">
      {{text}}
    </div>
</template>

<script>
import Utils from 'utils'

const config = [
    {
        name: 'paramName',
        title: '参数名称',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
    {
        name: 'fontSize',
        title: '字体',
        type: Number,
        default: 14,
        require: true,
        component: 'InputNumber'
    },
    {
        name: 'color',
        title: '颜色',
        type: String,
        default: '#444444',
        require: true,
        component: 'InputColor'
    },
];

export default {
    name: 'xp-urlParam',
    components: {
    },
    props: Utils.toProps(config),
    data() {
      return {
        text: Utils.getQueryString(this.paramName)
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
    }
}
</script>
<style lang="less-loader">
</style>

