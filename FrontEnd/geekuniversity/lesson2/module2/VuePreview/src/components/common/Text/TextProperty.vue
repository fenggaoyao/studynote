<template>
    <div class="compo-text-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>
</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
    {
        name: 'text',
        title: '文本',
        type: String,
        default: '文字',
        require: true,
        component: 'InputArea'
    },
    {
        name: 'fontSize',
        title: '大小',
        type: Number,
        default: 12,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'color',
        title: '颜色',
        type: String,
        default: '#000000',
        require: false,
        component: 'InputColor'
    },
    {
        component: 'Split'
    },
    {
        name: 'textAlign',
        title: '对齐',
        type: String,
        default: '',
        require: false,
        component: 'InputGroup',
        props: {
            items: [
                {name: '左', value: 'left'},
                {name: '中', value: 'center'},
                {name: '右', value: 'right'}
            ]
        }
    },
    {
        name: 'fontWeight',
        title: '加粗',
        type: String,
        default: 'normal',
        require: false,
        component: 'InputGroup',
        props: {
            items: [
                {name: '正常', value: 'normal'},
                {name: '粗体', value: 'bold'},
                {name: '加粗', value: 'bolder'}
            ]
        }
    },
    {
        name: 'fontStyle',
        title: '样式',
        type: String,
        default: 'normal',
        require: false,
        component: 'InputGroup',
        props: {
            items: [
                {name: '正常', value: 'normal'},
                {name: '斜体', value: 'italic'},
            ]
        }
    },
    {
        name: 'lineHeight',
        title: '行高',
        type: Number,
        default: 1.5,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'Split'
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
        name: 'background',
        title: '背景',
        type: String,
        require: false,
        component: 'InputBackground'
    },
    {
        name: 'textShadow',
        title: '文字阴影',
        type: String,
        default: 'none',
        require: false,
        component: 'InputShadow'
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
        name: 'animation',
        title: '动画',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    }
];

export default {
    name: 'xp-text-property',
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
