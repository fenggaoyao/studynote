<template>
    <div class="compo-xp-share-button-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>
</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

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
  name: 'xp-share-button-property',
  components: {
    'xp-form': Form
  },
  props: Utils.toProps(config),
  data() {
    return {
        fields: Utils.toData(config, this)
    }
  },
  methods: {
    valueChange(data){
        this.dispatchPropertyChange(data);
    }
  }
}
</script>

<style>
</style>
