<template>
    <div class="compo-image-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>

</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
    {
        name: 'src',
        title: '图片地址',
        type: String,
        default: '/public/images/no-image-icon.png',
        require: false,
        component: 'InputUpload'
    },
    {
        component: 'split'
    },
    {
       name: 'width',
       title: '宽度',
       type: Number,
       default: 0,
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
        component: 'split'
    },
    {
        name: 'display',
        title: '定位',
        type: Boolean,
        default: false,
        require: false,
        component: 'InputSwitch'
    },
    {
        name: 'position',
        title: '位置',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
    },
    {
        component: 'split'
    },
    {
        name: 'link',
        title: '链接',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    },
    {
        component: 'split'
    },
    {
        name: 'margin',
        title: '外边距',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
    },
    {
        component: 'split'
    },
    {
        name: 'rotate',
        title: '旋转',
        type: Number,
        default: 0,
        require: false,
        component: 'InputSlider?min=0&max=360&step=1'
    },
    {
        name: 'opacity',
        title: '透明度',
        type: Number,
        default: 1,
        require: false,
        component: 'InputSlider?min=0&max=1&step=0.1'
      },
    {
        name: 'zIndex',
        title: 'zIndex',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'split'
    },
    {
        name: 'border',
        title: '边框',
        type: String,
        default: '0px #cccccc solid',
        require: false,
        component: 'InputBorder'
    },
    {
        name: 'borderRadius',
        title: '圆角',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'boxShadow',
        title: '阴影',
        type: String,
        default: 'none',
        require: false,
        component: 'InputShadow'
    },
    {
        component: 'split'
    },
    {
        name: 'tongji',
        title: '埋点key',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    },
    {
        name: 'lazyImageRatio',
        title: '高宽比',
        type: String,
        default: '75%',
        require: false,
        component: 'InputText'
    }
];

export default {
    name: 'xp-image-property',
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
