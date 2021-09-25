<template>
    <div class="compo-block-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>

</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
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
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'lineHeight',
        title: '行距',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'background',
        title: '背景',
        type: String,
        default: '',
        require: false,
        component: 'StyleBackground'
    },
    {
        component: 'split'
    },
    {
        name: 'textAlign',
        title: '对齐',
        type: String,
        default: '',
        require: false,
        component: 'InputAlign'
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
        name: 'margin',
        title: '外边距',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
    },
    {
        name: 'padding',
        title: '内边距',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
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
        component: 'split'
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
        component: 'split'
    },
    {
        name: 'boxShadow',
        title: '阴影',
        type: String,
        default: 'none',
        require: false,
        component: 'InputShadow'
    },
]

export default {
    name: 'xp-block-property',
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
    .compo-block-property .line-item{
        padding: 6px 0;
    }
    .compo-block-property .line-item .label{
        display: inline-block;
        padding-right: 5px;
        width: 70px;
        text-align: right;
        font-size: 14px;
        vertical-align: middle;
        color: #222;
    }
    .compo-block-property .input-item{
        display: inline-block;
        padding: 3px 10px;
        box-sizing: border-box;
        color: #1f2d3d;
        height: 34px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        outline: 0;
        line-height: normal;
        vertical-align: middle;
    }
    .compo-block-property .input-item.textarea{
        width: 200px;
        height: 50px;
    }
    .compo-block-property .input-item:hover {
        border-color: #8492A6;
    }
    .compo-block-property .input-item:focus {
        outline: 0;
        border-color: #20a0ff;
    }
    .item-slide{
        width: 60%;
        padding: 0 10px;
        display: inline-block;
        vertical-align: middle;
    }
    .mini{
        width: 60px;
        margin-right: 5px;
    }
    .item-radiogroup{
        vertical-align: middle;
    }
</style>
