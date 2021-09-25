<template>
    <span v-if="link">
        <a :href="link"><span :style="cssText" class="compo-text">{{text}}</span></a>
    </span>
    <span v-else>
        <span :style="cssText" class="compo-text">{{text}}</span>
    </span>
</template>

<script>
import Utils from 'utils';

const config = [
    {
        name: 'text',
        title: '文本',
        type: String,
        default: '文字',
        require: true,
        component: 'InputArea',
        configurable: true
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
        component: 'split'
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
        component: 'split'
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
        component: 'InputSlide'
    },
    {
        name: 'opacity',
        title: '透明度',
        type: Number,
        default: 1,
        require: false,
        component: 'InputSlide'
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
    name: 'xp-text',
    props: Utils.toProps(config),
    computed: {
        cssText(){
            return Utils.toCSS(this);
        }
    },
    updated(){
    }
}
</script>

<style>
    .compo-text{
        display: inline-block;
        vertical-align: middle;
    }
</style>
