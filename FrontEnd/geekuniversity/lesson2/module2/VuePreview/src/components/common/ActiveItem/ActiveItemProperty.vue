<template>
    <div class="compo-active-item-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>
</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
    {
        name: 'showImage',
        title: '显示图片',
        type: Boolean,
        default: true,
        require: false,
        component: 'InputSwitch'
    },
    {
        name: 'src',
        title: '图片地址',
        type: String,
        default: '',
        require: false,
        component: 'InputUpload'
    },
    {
        name: 'activeSrc',
        title: '激活图片',
        type: String,
        default: '',
        require: false,
        component: 'InputUpload'
    },
    {
        component: 'Split'
    },
    {
        name: 'showText',
        title: '显示文字',
        type: Boolean,
        default: true,
        require: false,
        component: 'InputSwitch'
    },
    {
        name: 'text',
        title: '文字',
        type: String,
        default: '文字',
        require: false,
        component: 'InputText'
    },
    {
        name: 'fontSize',
        title: '大小',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'color',
        title: '颜色',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    },
    {
        name: 'activeColor',
        title: '激活颜色',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    },
    {
        name: 'background',
        title: '背景颜色',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    },
    {
        name: 'activeBackground',
        title: '激活背景',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    },
    {
        component: 'Split'
    },
    {
        name: 'flex',
        title: 'flex',
        type: Number,
        default: 1,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'height',
        title: '高度',
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'lineHeight',
        title: '行高',
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'Split'
    },
    {
        name: 'textAlign',
        title: '对齐',
        type: String,
        default: 'left',
        require: false,
        component: 'InputAlign'
    },
    {
        name: 'padding',
        title: '内边距',
        type: String,
        default: '0px 0px 0px 0px',
        require: false,
        component: 'InputLRTB'
    },
    {
        name: 'margin',
        title: '外边距',
        type: String,
        default: '0px 0px 0px 0px',
        require: false,
        component: 'InputLRTB'
    },
    {
        component: 'Split'
    },
    {
        name: 'border',
        title: '边框',
        type: String,
        default: '1px #cccccc solid',
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
        component: 'Split'
    },
    {
        name: 'rotate',
        title: '旋转',
        type: Number,
        default: 0,
        require: false,
        component: 'InputSlide?min=0&max=360&step=1'
    },
    {
        name: 'opacity',
        title: '透明度',
        type: Number,
        default: 1,
        require: false,
        component: 'InputSlide?min=0&max=1&step=0.1'
    },
    {
        component: 'Split'
    },
    {
        name: 'boxShadow',
        title: '阴影',
        type: String,
        default: 'none',
        require: false,
        component: 'InputShadow'
    }
];

export default {
    name: 'xp-active-item-property',
    components: {
        'xp-form': Form,
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
