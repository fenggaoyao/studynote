<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <el-slider class="item-slide" v-model="val" :min="min" :max="max" :step="step"
                   @input="inputChange"></el-slider>
    </div>
</template>

<script>
  import {Slider} from 'element-ui'
  export default {
    name: 'xp-input-slider',
    components: {
        'el-slider': Slider
    },
    props: {
      title: {
        type: String,
        default: '',
        required: false
      },
      name: {
        type: String,
        required: true
      },
      component: {
        type: String,
        default: 'text',
        required: false
      },
      value: {
        type: Number,
        required: false
      },
      valueChange: {
        type: Function,
        require: false
      },
      validate: {
        type: String,
        default: () => '',
        required: false
      },
      min: {
        type: Number,
        default: 0,
        required: false
      },
      max: {
        type: Number,
        default: 1,
        required: false
      },
      step: {
        type: Number,
        default: 0.1,
        required: false
      },
    },
    data(){
      return {
        val: this.value
      }
    },
    methods: {
      inputChange(e) {
        if (this.val != '') {
          this.valueChange && this.valueChange(this.name, parseInt(this.val), 'InputSlider');
        }
      },
    },

    created(){
      eventHub.$on('xp-reset', () => {
        this.val = '';
        this.valueChange && this.valueChange(this.name, 0, 'InputSlider');
      })
    }
  }
</script>

<style lang="less-loader">
</style>